// ==========================================
// 🚀 0. Online / Offline Detection 🚀
// ==========================================
// النظام سيكتشف تلقائياً إذا كان يعمل على سيرفر محلي (أوفلاين) أو على الإنترنت (أونلاين)
const isOnlineMode = window.location.hostname !== 'localhost' && !window.location.hostname.startsWith('192.168.') && window.location.hostname !== '127.0.0.1';

// ==========================================
// 🚀 1. Global AR & Touch Logic
// ==========================================
document.addEventListener('touchmove', function(e) {
    if(document.body.classList.contains('ar-active')) {
        if(!e.target.closest('.ar-panel-desc') && 
           !e.target.closest('button') && 
           !e.target.closest('.ar-top-bar') && 
           !e.target.closest('.ar-floating-btn') &&
           !e.target.closest('model-viewer')) {
            e.preventDefault();
        }
    }
}, { passive: false });

let arInitialDistance = 0, arInitialScale = 0, arIsDragging = false, arPreviousPosition = { x: 0, y: 0 };

window.addEventListener('touchstart', (e) => {
    if (!document.body.classList.contains('ar-active') || window.isPinnedAR || e.target.closest('#ar-bottom-panel') || e.target.closest('.ar-floating-btn')) return;
    const model = document.querySelector('.active-ar-model'); if (!model) return;
    
    if (e.touches.length === 1) { 
        arIsDragging = true; arPreviousPosition = { x: e.touches[0].pageX, y: e.touches[0].pageY }; 
    }
    if (e.touches.length === 2) { 
        arInitialDistance = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY); 
        let scaleObj = model.getAttribute('scale') || {x: 0.05};
        arInitialScale = parseFloat(scaleObj.x) || 0.05; 
    }
}, { passive: false });

window.addEventListener('touchmove', (e) => {
    if (!document.body.classList.contains('ar-active') || window.isPinnedAR || e.target.closest('#ar-bottom-panel') || e.target.closest('.ar-floating-btn')) return;
    const model = document.querySelector('.active-ar-model'); if (!model) return;
    
    if (e.touches.length === 1 && arIsDragging) {
        let deltaX = e.touches[0].pageX - arPreviousPosition.x;
        let rot = model.getAttribute('rotation') || {x: 0, y: 0, z: 0};
        model.setAttribute('rotation', `${rot.x || 0} ${(rot.y || 0) + (deltaX * 0.6)} ${rot.z || 0}`);
        arPreviousPosition = { x: e.touches[0].pageX, y: e.touches[0].pageY }; 
    }
    if (e.touches.length === 2 && arInitialDistance > 0) {
        const ratio = Math.hypot(e.touches[0].pageX - e.touches[1].pageX, e.touches[0].pageY - e.touches[1].pageY) / arInitialDistance; 
        const newScale = arInitialScale * ratio;
        model.setAttribute('scale', `${newScale} ${newScale} ${newScale}`);
    }
}, { passive: false });

window.addEventListener('touchend', (e) => { 
    if (e.touches.length < 2) arInitialDistance = 0; 
    if (e.touches.length < 1) arIsDragging = false; 
});

// ==========================================
// 🚀 2. App State & Sockets
// ==========================================
let monumentsDB = {}, currentView = 'view-welcome', currentCity = null, currentLandmark = null;
let isSpeechSpeaking = false, currentSpeechId = 0, availableVoices = []; 
let currentLang = 'en', windowIsPinnedAR = false, activeLocationId = null, activeSearchTag = 'all'; 

let hasStartedApp = false;

// Socket.io يعمل فقط في وضع الأوفلاين
let clientSocket = null;
if (!isOnlineMode) {
    try { 
        clientSocket = io(); 
        clientSocket.on('sos_reply', (data) => {
            const msg = currentLang === 'ar' ? data.message_ar : data.message_en;
            alert("🟢 " + msg);
            showToast(msg);
        });

        clientSocket.on('esp_update', (data) => {
            if (data.locationId && activeLocationId !== data.locationId) {
                activeLocationId = data.locationId;
                const locIndex = aetheriaData.findIndex(c => c.id === activeLocationId);
                if (locIndex > -1) {
                    const [locCity] = aetheriaData.splice(locIndex, 1);
                    aetheriaData.unshift(locCity); 
                }
                if (currentView === 'view-cities') {
                    const searchInput = document.getElementById('search-input');
                    if((!searchInput || searchInput.value.trim() === '') && activeSearchTag === 'all') renderCitiesGrid();
                }
            }
        });
    } catch(e) { 
        console.log("Socket offline"); 
    }
}

window.onload = () => { 
    if (hasStartedApp) return;

    let hash = window.location.hash;
    if(hash && hash.startsWith('#') && !isOnlineMode) activeLocationId = hash.substring(1); 
    else activeLocationId = null;

    if (activeLocationId) {
        const locIndex = aetheriaData.findIndex(c => c.id === activeLocationId);
        if (locIndex > -1) {
            const [locCity] = aetheriaData.splice(locIndex, 1);
            aetheriaData.unshift(locCity); 
        }
    }
    switchView('view-welcome'); 
};

// ==========================================
// 🚀 3. Core UI Functions
// ==========================================
function setText(id, text) { const el = document.getElementById(id); if (el) el.innerText = text; }
function getUiText() { return uiText[currentLang]; }
function showToast(message) { const toast = document.getElementById('toast-notification'); toast.innerText = message; toast.style.opacity = '1'; setTimeout(() => toast.style.opacity = '0', 3000); }

function selectLanguageAndStart(lang) {
    hasStartedApp = true; 
    
    currentLang = lang; 
    document.documentElement.lang = currentLang; 
    document.documentElement.dir = currentLang === 'en' ? 'ltr' : 'rtl';
    
    currentCity = null; currentLandmark = null; currentActiveIndex = null; activeSearchTag = 'all'; 
    
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = ''; 

    updatePageTexts(); 
    renderTagsList(); 
    renderCities();
}

function updatePageTexts() {
    const txt = getUiText();
    setText('header-title', txt.mainTitle); setText('lbl-welcome-sub', txt.welcomeSub); setText('lbl-cities-title', txt.citiesTitle); setText('lbl-cities-sub', txt.citiesSub); setText('lbl-landmarks-sub', txt.landmarksSub); setText('txt-start-ar', txt.startAR); setText('ar-btn-txt', txt.scanAR); setText('txt-swipe-tutorial', txt.swipeTut); setText('custom-scan-text', txt.scanTxt); setText('txt-ar-box-title', txt.arBoxTitle); setText('txt-ar-box-desc', txt.arBoxDesc);
    const searchInput = document.getElementById('search-input'); if (searchInput) searchInput.placeholder = txt.searchPlaceholder;
    if (currentView === 'view-cities') setText('nav-back-btn', txt.citiesBack); else if (currentView === 'view-landmarks') setText('nav-back-btn', txt.backToCities); else if (currentView === 'view-details') setText('nav-back-btn', txt.backToLandmarks); else setText('nav-back-btn', txt.backBtn);
    setText('txt-listen', isDetailsPlaying ? txt.pauseGuide : txt.listenBtn);
    if(!window.isPinnedAR) setText('ar-top-pin-btn', txt.detachModel); 
    
    updateVoiceAssistantButton(isSpeechSpeaking); 
    updateSOSButtons(); 
    renderCitiesGrid();

    if (currentCity) { setText('lbl-landmarks-title', currentCity['name_' + currentLang]); renderLandmarksGrid(); }
    if (currentLandmark) { 
        setText('dtl-title', currentLandmark['name_' + currentLang]); 
        setText('dtl-rank', `${txt.rank} ${currentLandmark.rank}`); 
        setText('dtl-desc', currentLandmark['full_desc_' + currentLang]); 
        
        // تحديث رسالة صندوق الـ AR إذا كان أونلاين
        if(isOnlineMode && currentLandmark.hasAR) {
            setText('txt-ar-box-title', currentLang === 'en' ? "AR Experience Available On-Site" : "الواقع المعزز متوفر في الموقع");
            setText('txt-ar-box-desc', currentLang === 'en' ? "Visit this site in person to bring history to life using WebAR!" : "قم بزيارة هذا المعلم شخصياً لتجربة الواقع المعزز وإحياء التاريخ!");
        } else {
            setText('txt-ar-box-title', txt.arBoxTitle);
            setText('txt-ar-box-desc', txt.arBoxDesc);
        }
    }
    if (currentActiveIndex !== null && monumentsDB[currentActiveIndex]) { 
        const db = monumentsDB[currentActiveIndex]; setText('ar-monument-title', db['name_' + currentLang]); setText('ar-monument-desc', db['desc_' + currentLang]); 
        const googleViewerContainer = document.getElementById('google-viewer-container');
        if (googleViewerContainer.style.display === 'block') {
            const tooltips = googleViewerContainer.querySelectorAll('.ar-hotspot-tooltip');
            tooltips.forEach((tt, index) => { if(db.hotspots && db.hotspots[index]) { tt.innerText = db.hotspots[index]['name_' + currentLang]; tt.dir = currentLang === 'ar' ? 'rtl' : 'ltr'; } });
        }
    }
}

// ==========================================
// 🚀 4. Navigation & Grids
// ==========================================
function switchView(viewId) {
    document.querySelectorAll('.page-view').forEach(el => el.classList.remove('active-view'));
    const targetEl = document.getElementById(viewId); if(targetEl) targetEl.classList.add('active-view');
    currentView = viewId; window.scrollTo(0,0);
    const appPages = document.getElementById('app-pages'); if(appPages) appPages.scrollTop = 0;
    if (document.activeElement) document.activeElement.blur();
    
    if(viewId === 'view-welcome') {
        document.getElementById('floating-voice-btn').style.display = 'none';
        document.getElementById('sos-btn').style.display = 'none';
    } else {
        document.getElementById('floating-voice-btn').style.display = 'flex';
        // إظهار زر الاستغاثة فقط في وضع الأوفلاين
        if(!isOnlineMode) {
            document.getElementById('sos-btn').style.display = 'block';
        } else {
            document.getElementById('sos-btn').style.display = 'none';
        }
    }

    if (isSpeechSpeaking || isDetailsPlaying) { 
        window.speechSynthesis.cancel(); isDetailsPlaying = false;
        const dtlBtn = document.getElementById('dtl-audio-btn');
        if(dtlBtn) dtlBtn.innerHTML = `<span>🎧</span> <span>${getUiText().listenBtn}</span>`;
        setTimeout(() => { if (isSpeechSpeaking) speakCurrentViewText(); }, 100); 
    }
}

function navigateBack() {
    if (currentView === 'view-details' && currentCity) openCity(currentCity.id); 
    else if (currentView === 'view-landmarks') renderCities(); 
    else if (currentView === 'view-cities') {
        currentCity = null; currentLandmark = null; currentActiveIndex = null; 
        switchView('view-welcome');
        document.getElementById('nav-back-btn').style.display = 'none'; document.getElementById('floating-ar-btn').style.display = 'none';
    }
}

function renderCities() {
    switchView('view-cities'); 
    document.getElementById('nav-back-btn').style.display = 'block'; document.getElementById('nav-back-btn').innerText = getUiText().citiesBack;
    document.getElementById('floating-ar-btn').style.display = 'none'; 
    
    const searchInput = document.getElementById('search-input');
    const query = searchInput ? searchInput.value.trim() : '';

    if (query === '' && activeSearchTag === 'all') {
        const resultsContainer = document.getElementById('search-results-grid');
        const defaultCitiesGrid = document.getElementById('cities-grid');
        if (resultsContainer) resultsContainer.style.display = 'none';
        if (defaultCitiesGrid) defaultCitiesGrid.style.display = 'grid';
        renderCitiesGrid();
    } else {
        handleSearchInput(query);
    }
}

function renderCitiesGrid() {
    const txt = getUiText(); const grid = document.getElementById('cities-grid'); if (!grid) return; grid.innerHTML = '';
    aetheriaData.forEach(city => {
        const count = city.landmarks ? city.landmarks.length : 0;
        const isCurrentLoc = (city.id === activeLocationId && !isOnlineMode);
        const locationBadge = isCurrentLoc ? `<div style="margin-top: 4px;"><span class="badge-location">📍 ${txt.youAreHere}</span></div>` : '';

        grid.innerHTML += `
            <div class="card" onclick="openCity('${city.id}')">
                <div class="card-img-wrapper">
                    <img src="${city.img}" loading="lazy" onerror="this.onerror=null; this.src=fallbackImg;">
                    <span class="badge-rank">${count} ${txt.count}</span>
                </div>
                <div class="card-content">
                    <div class="card-title">${city['name_'+currentLang]}</div>
                    ${locationBadge}
                </div>
            </div>`;
    });
}

function openCity(cityId) {
    currentCity = aetheriaData.find(c => c.id === cityId); if(!currentCity) return;
    switchView('view-landmarks'); 
    document.getElementById('lbl-landmarks-title').innerText = currentCity['name_'+currentLang];
    document.getElementById('nav-back-btn').style.display = 'block'; document.getElementById('nav-back-btn').innerText = getUiText().backToCities;
    
    // زر الكاميرا العائم في شاشة المعالم لا يظهر في الأونلاين
    document.getElementById('floating-ar-btn').style.display = isOnlineMode ? 'none' : 'flex'; 
    renderLandmarksGrid();
}

function renderLandmarksGrid() {
    const txt = getUiText(); const grid = document.getElementById('landmarks-grid'); if (!grid) return; grid.innerHTML = '';
    const sortedLms = currentCity.landmarks.sort((a, b) => a.rank - b.rank);
    if(sortedLms.length === 0) { grid.innerHTML = `<p style="text-align:center; width:100%; grid-column:1/-1;">${txt.emptyCity}</p>`; return; }
    
    sortedLms.forEach(lm => {
        grid.innerHTML += `
            <div class="card" onclick="openLandmark('${lm.id}')">
                <div class="card-img-wrapper"><img src="${lm.img}" loading="lazy"><span class="badge-rank">#${lm.rank}</span></div>
                <div class="card-content"><div class="card-title">${lm['name_'+currentLang]}</div><div class="card-desc">${lm['desc_'+currentLang]}</div></div>
            </div>`;
    });
}

const hideSwipeTutorial = () => { const tut = document.getElementById('swipe-tutorial'); if (tut && tut.style.display === 'flex') { tut.style.opacity = '0'; setTimeout(() => tut.style.display = 'none', 500); } };
document.addEventListener('DOMContentLoaded', () => { const slider = document.getElementById('dtl-image-slider'); if (slider) { slider.addEventListener('touchstart', hideSwipeTutorial, { passive: true }); slider.addEventListener('mousedown', hideSwipeTutorial, { passive: true }); } });

function openLandmark(lmId) {
    const txt = getUiText(); if(!currentCity || !currentCity.landmarks) return;
    currentLandmark = currentCity.landmarks.find(l => l.id === lmId); if(!currentLandmark) return;
    
    switchView('view-details'); 
    document.getElementById('nav-back-btn').innerText = txt.backToLandmarks; 
    document.getElementById('floating-ar-btn').style.display = 'none'; 
    
    const btnAR = document.getElementById('btn-open-ar'); 
    const arInfoBox = document.getElementById('ar-info-box');
    
    if (currentLandmark.hasAR) { 
        arInfoBox.style.display = 'flex';
        // إخفاء زر فتح الـ AR وتغيير النص في وضع الأونلاين
        if(isOnlineMode) {
            btnAR.style.display = 'none';
            document.getElementById('txt-ar-box-title').innerText = currentLang === 'en' ? "AR Experience Available On-Site" : "الواقع المعزز متوفر في الموقع";
            document.getElementById('txt-ar-box-desc').innerText = currentLang === 'en' ? "Visit this site in person to bring history to life using WebAR!" : "قم بزيارة هذا المعلم شخصياً لتجربة الواقع المعزز وإحياء التاريخ!";
        } else {
            btnAR.style.display = 'flex'; 
            document.getElementById('txt-ar-box-title').innerText = txt.arBoxTitle;
            document.getElementById('txt-ar-box-desc').innerText = txt.arBoxDesc;
        }
    } else { 
        btnAR.style.display = 'none'; 
        arInfoBox.style.display = 'none'; 
    }

    const slider = document.getElementById('dtl-image-slider'); const tutorial = document.getElementById('swipe-tutorial');
    slider.innerHTML = ''; tutorial.style.display = 'none'; tutorial.style.opacity = '1';
    
    const baseImgUrl = currentLandmark.img; const validImages = [baseImgUrl]; const dotIndex = baseImgUrl.lastIndexOf('.'); const basePath = baseImgUrl.substring(0, dotIndex); const ext = baseImgUrl.substring(dotIndex); let imgIndex = 1;
    function loadNextImage() { const nextImgUrl = `${basePath}${imgIndex}${ext}`; const testImg = new Image(); testImg.onload = function() { validImages.push(nextImgUrl); imgIndex++; loadNextImage(); }; testImg.onerror = function() { buildVirtualInfiniteCarousel(validImages); }; testImg.src = nextImgUrl; }
    function buildVirtualInfiniteCarousel(imgUrls) {
        if (imgUrls.length === 1) { const img = document.createElement('img'); img.src = imgUrls[0]; slider.appendChild(img); return; }
        tutorial.style.display = 'flex'; const MULTIPLIER = 50; let totalHTML = '';
        for(let i=0; i<MULTIPLIER; i++) { imgUrls.forEach(url => { totalHTML += `<img src="${url}">`; }); }
        slider.innerHTML = totalHTML; const isRTL = document.documentElement.dir === 'rtl';
        requestAnimationFrame(() => { const singleSetWidth = slider.clientWidth * imgUrls.length; const middlePosition = singleSetWidth * (MULTIPLIER / 2); slider.scrollLeft = isRTL ? -middlePosition : middlePosition; });
    }
    loadNextImage(); 
    
    setText('dtl-title', currentLandmark['name_'+currentLang]); setText('dtl-rank', `${txt.rank} ${currentLandmark.rank}`); setText('dtl-desc', currentLandmark['full_desc_'+currentLang]);
    if(isDetailsPlaying) { window.speechSynthesis.cancel(); isDetailsPlaying = false; document.getElementById('dtl-audio-btn').innerHTML = `<span>🎧</span> <span>${txt.listenBtn}</span>`; }
}

// ==========================================
// 🚀 5. Search & Tags
// ==========================================
function renderTagsList() {
    const container = document.getElementById('tagsList'); if(!container) return; container.innerHTML = '';
    appTags.forEach(t => { const isActive = activeSearchTag === t.id ? 'active' : ''; container.innerHTML += `<div class="tag-pill ${isActive}" onclick="setSearchTag('${t.id}')">${t[currentLang]}</div>`; });
}

function setSearchTag(tagId) { activeSearchTag = tagId; renderTagsList(); handleSearchInput(document.getElementById('search-input').value); }

function handleSearchInput(query) {
    const txt = getUiText(); query = query.trim().toLowerCase();
    const resultsContainer = document.getElementById('search-results-grid'); const defaultCitiesGrid = document.getElementById('cities-grid');
    
    if (!query && activeSearchTag === 'all') { if (resultsContainer) resultsContainer.style.display = 'none'; if (defaultCitiesGrid) defaultCitiesGrid.style.display = 'grid'; return; }
    if (defaultCitiesGrid) defaultCitiesGrid.style.display = 'none'; if (resultsContainer) { resultsContainer.style.display = 'grid'; resultsContainer.innerHTML = ''; }

    let cityMatches = []; let landmarkMatches = [];
    aetheriaData.forEach(city => {
        const cityNameEn = (city.name_en || '').toLowerCase(); const cityNameAr = (city.name_ar || '').toLowerCase(); const isCurrentLoc = (city.id === activeLocationId);
        if (activeSearchTag === 'all' && (cityNameEn.includes(query) || cityNameAr.includes(query))) { cityMatches.push({ type: 'city', id: city.id, title: city['name_' + currentLang], subtitle: currentLang === 'en' ? "Destination Governorate" : "محافظة / وجهة", img: city.img, badge: `${city.landmarks ? city.landmarks.length : 0} ${txt.count}`, isCurrentLoc: isCurrentLoc }); }
        if (city.landmarks) {
            city.landmarks.forEach(lm => {
                const lmNameEn = (lm.name_en || '').toLowerCase(); const lmNameAr = (lm.name_ar || '').toLowerCase(); const descEn = (lm.desc_en || '').toLowerCase(); const descAr = (lm.desc_ar || '').toLowerCase();
                let matchesQuery = (lmNameEn.includes(query) || lmNameAr.includes(query) || descEn.includes(query) || descAr.includes(query)); let matchesTag = (activeSearchTag === 'all') || (lm.tags && lm.tags.includes(activeSearchTag));
                if (matchesQuery && matchesTag) landmarkMatches.push({ type: 'landmark', cityId: city.id, landmarkId: lm.id, title: lm['name_' + currentLang], subtitle: (currentLang === 'en' ? "Governorate: " : "المحافظة: ") + city['name_' + currentLang], img: lm.img, badge: `#${lm.rank}`, originalRank: lm.rank, isCurrentLoc: false });
            });
        }
    });

    landmarkMatches.sort((a, b) => a.originalRank - b.originalRank);
    if (activeSearchTag !== 'all' || query !== '') landmarkMatches.forEach((item, index) => { item.badge = `#${index + 1}`; });
    let matches = [...cityMatches, ...landmarkMatches];

    if (matches.length === 0) { resultsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 25px;">${currentLang === 'en' ? 'No results found.' : 'لم يتم العثور على نتائج.'}</p>`; return; }
    
    matches.forEach(item => {
        const locationBadge = (item.isCurrentLoc && !isOnlineMode) ? `<div style="margin-top: 4px;"><span class="badge-location">📍 ${txt.youAreHere}</span></div>` : '';
        if (item.type === 'city') {
            resultsContainer.innerHTML += `<div class="card" onclick="openCity('${item.id}')"><div class="card-img-wrapper"><img src="${item.img}"><span class="badge-rank">${item.badge}</span></div><div class="card-content"><div class="card-title">${item.title}</div>${locationBadge}<div class="card-desc" style="${item.isCurrentLoc ? 'display:none;' : ''}">${item.subtitle}</div></div></div>`;
        } else {
            resultsContainer.innerHTML += `<div class="card" onclick="openCityAndLandmark('${item.cityId}', '${item.landmarkId}')"><div class="card-img-wrapper"><img src="${item.img}"><span class="badge-rank">${item.badge}</span></div><div class="card-content"><div class="card-title">${item.title}</div><div class="card-desc" style="color: var(--accent-gold); font-size: 0.78rem; font-weight: 700;">📍 ${item.subtitle}</div></div></div>`;
        }
    });
}
function openCityAndLandmark(cityId, lmId) { currentCity = aetheriaData.find(c => c.id === cityId); if(!currentCity) return; openLandmark(lmId); }

// ==========================================
// 🚀 6. Voice Assistant 
// ==========================================
function loadVoices() { availableVoices = window.speechSynthesis.getVoices(); }
if ('speechSynthesis' in window) { loadVoices(); window.speechSynthesis.onvoiceschanged = loadVoices; }

function speakCurrentViewText() {
    const txt = getUiText(); let textToRead = "";
    if (document.body.classList.contains('ar-active')) textToRead = txt.tutAR;
    else if (currentView === 'view-details') textToRead = txt.tutDetails;
    else if (currentView === 'view-landmarks') textToRead = txt.tutLandmarks;
    else if (currentView === 'view-cities') textToRead = txt.tutCities;
    else if (currentView === 'view-welcome') textToRead = txt.tutWelcome;
    if (textToRead) speakText(textToRead);
}

function toggleARVoiceTutorial() {
    if (isArVoiceSpeaking) stopARVoice();
    if (isSpeechSpeaking) { isSpeechSpeaking = false; window.speechSynthesis.cancel(); updateVoiceAssistantButton(false); showToast(currentLang === 'en' ? "Guide Stopped" : "تم إيقاف المرشد"); } 
    else { isSpeechSpeaking = true; updateVoiceAssistantButton(true); speakCurrentViewText(); }
}

function toggleGlobalVoiceAssistant() {
    if (isDetailsPlaying) { isDetailsPlaying = false; const dtlBtn = document.getElementById('dtl-audio-btn'); if(dtlBtn) dtlBtn.innerHTML = `<span>🎧</span> <span>${getUiText().listenBtn}</span>`; }
    if (isArVoiceSpeaking) stopARVoice();
    if (isSpeechSpeaking) { isSpeechSpeaking = false; window.speechSynthesis.cancel(); updateVoiceAssistantButton(false); showToast(currentLang === 'en' ? "Guide Stopped" : "تم إيقاف المرشد"); } 
    else { isSpeechSpeaking = true; speakCurrentViewText(); }
}

function speakText(text, callback = null) {
    if (!('speechSynthesis' in window)) { showToast(getUiText().noAudio); if(callback) callback(); return; }
    window.speechSynthesis.cancel(); currentSpeechId++; const mySpeechId = currentSpeechId; let cleanText = text;
    if (currentLang === 'ar') { cleanText = cleanText.replace(/AETHERIA/gi, '').replace(/Duke's Diwan/gi, 'ديوان الدوق').replace(/Cardo Maximus/gi, 'شارع الأعمدة الرئيسي').replace(/UNESCO/gi, 'اليونسكو').replace(/Ad-Deir/gi, 'الدير').replace(/Al-Khazneh/gi, 'الخزنة').replace(/(\d+)\s*AD/gi, 'عام $1 ميلادي').replace(/(\d+),(\d+)/g, '$1$2').replace(/[a-zA-Z]/g, '').replace(/["'«»()]/g, ' ').replace(/\s+/g, ' ').trim(); } 
    else { cleanText = cleanText.replace(/["'«»]/g, ' ').replace(/\s+/g, ' ').trim(); }
    if (!cleanText) { if(callback) callback(); return; }
    
    const sentences = cleanText.match( /[^.،!؟]+[.،!؟]+/g ) || [cleanText]; 
    if (availableVoices.length === 0) { setTimeout(() => speakText(text, callback), 250); return; }

    let voiceToUse = null;
    if (currentLang === 'ar') { for (const name of ['Maged', 'Tarik', 'Laila', 'Hamed', 'Zayd', 'Microsoft Zira', 'Google']) { voiceToUse = availableVoices.find(v => v.lang.startsWith('ar') && v.name.includes(name)); if (voiceToUse) break; } if (!voiceToUse) voiceToUse = availableVoices.find(v => v.lang.startsWith('ar')); } 
    else { for (const name of ['Google US English', 'Microsoft Zira', 'Microsoft David', 'Alex', 'Samantha', 'Daniel']) { voiceToUse = availableVoices.find(v => v.lang.startsWith('en-') && v.name.includes(name)); if (voiceToUse) break; } if (!voiceToUse) voiceToUse = availableVoices.find(v => v.lang.startsWith('en-') && v.default); if (!voiceToUse) voiceToUse = availableVoices.find(v => v.lang.startsWith('en-')); }

    if(!callback) { isSpeechSpeaking = true; updateVoiceAssistantButton(true); }
    
    let sentenceIndex = 0;
    function speakNextSentence() {
        if (mySpeechId !== currentSpeechId) return;
        if (sentenceIndex >= sentences.length) { if(!callback) { isSpeechSpeaking = false; updateVoiceAssistantButton(false); } else { callback(); } return; }
        if(callback && !isArVoiceSpeaking && !isDetailsPlaying) return; if(!callback && !isSpeechSpeaking) return;
        
        const utterance = new SpeechSynthesisUtterance(sentences[sentenceIndex]);
        utterance.lang = currentLang === 'en' ? 'en-US' : 'ar-SA'; utterance.rate = currentLang === 'ar' ? 0.9 : 0.95; utterance.pitch = 1.0; 
        if (voiceToUse) utterance.voice = voiceToUse;
        utterance.onend = () => { sentenceIndex++; speakNextSentence(); };
        utterance.onerror = (event) => { if (event.error !== 'interrupted' && event.error !== 'canceled') { if(!callback) { isSpeechSpeaking = false; updateVoiceAssistantButton(false); } else { callback(); } } };
        window.speechSynthesis.speak(utterance);
    }
    speakNextSentence();
}

function updateVoiceAssistantButton(isSpeaking) {
    const txt = getUiText(); const btn = document.getElementById('floating-voice-btn'); const txtEl = document.getElementById('txt-voice-btn'); const arBtn = document.getElementById('ar-top-guide-btn');
    if (btn && txtEl) { if (isSpeaking) { btn.classList.add('playing'); txtEl.innerText = txt.voiceStop; } else { btn.classList.remove('playing'); txtEl.innerText = txt.voiceBtn; } }
    if (arBtn) { if (isSpeaking) arBtn.classList.add('playing'); else arBtn.classList.remove('playing'); }
}

let isDetailsPlaying = false;
function toggleDetailsAudio() { 
    const txt = getUiText(); const btn = document.getElementById('dtl-audio-btn'); 
    if (isDetailsPlaying) { window.speechSynthesis.cancel(); isDetailsPlaying = false; if(btn) btn.innerHTML = `<span>🎧</span> <span>${txt.listenBtn}</span>`; } 
    else { 
        if(!currentLandmark) return; const textToRead = currentLandmark['full_desc_' + currentLang];
        if(textToRead) { if (isSpeechSpeaking) { isSpeechSpeaking = false; updateVoiceAssistantButton(false); } isDetailsPlaying = true; if(btn) btn.innerHTML = `<span>⏸️</span> <span>${txt.pauseGuide}</span>`; speakText(textToRead, () => { isDetailsPlaying = false; if(btn) btn.innerHTML = `<span>🎧</span> <span>${txt.listenBtn}</span>`; }); } else { showToast(txt.noAudio); } 
    } 
}

// ==========================================
// 🚀 7. AR ENGINE
// ==========================================
let arSystemStarted = false; let isArEngineBuilt = false; let isArVoiceSpeaking = false; 
let touchStartY = 0; const bottomPanel = document.getElementById('ar-bottom-panel'); const panelDragArea = document.getElementById('ar-panel-drag-area');

if(panelDragArea) { panelDragArea.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, {passive: true}); panelDragArea.addEventListener('touchmove', e => { let touchCurrentY = e.touches[0].clientY; if(touchCurrentY - touchStartY > 30) { hideBottomPanel(); } }, {passive: true}); }

function showBottomPanel() { if(bottomPanel) bottomPanel.classList.remove('hidden-by-user'); const infoToggle = document.getElementById('ar-info-toggle'); if(infoToggle) infoToggle.style.display = 'none'; }
function hideBottomPanel() { if(bottomPanel) bottomPanel.classList.add('hidden-by-user'); const infoToggle = document.getElementById('ar-info-toggle'); if(infoToggle) infoToggle.style.display = 'flex'; }

function toggleARVoiceStory() {
    const btn = document.getElementById('ar-audio-btn');
    if (isArVoiceSpeaking) { isArVoiceSpeaking = false; window.speechSynthesis.cancel(); if(btn) { btn.innerHTML = "🔊"; btn.classList.remove('playing'); } } 
    else {
        const descEl = document.getElementById('ar-monument-desc'); if(!descEl) return;
        const desc = descEl.innerText;
        if(desc && desc !== 'Description') { if (isSpeechSpeaking) { isSpeechSpeaking = false; updateVoiceAssistantButton(false); } isArVoiceSpeaking = true; if(btn) { btn.innerHTML = "⏸️"; btn.classList.add('playing'); } speakText(desc, () => { isArVoiceSpeaking = false; if(btn) { btn.innerHTML = "🔊"; btn.classList.remove('playing'); } }); }
    }
}

function stopARVoice() { if (isArVoiceSpeaking) { isArVoiceSpeaking = false; window.speechSynthesis.cancel(); const btn = document.getElementById('ar-audio-btn'); if(btn) { btn.innerHTML = "🔊"; btn.classList.remove('playing'); } } }
function resetARCamera() { const googleViewer = document.getElementById('google-3d-model'); if (googleViewer) { googleViewer.cameraTarget = 'auto auto auto'; googleViewer.cameraOrbit = 'auto auto auto'; googleViewer.fieldOfView = 'auto'; } }

function buildAndStartAR() {
    if (!isArEngineBuilt) {
        const container = document.getElementById('ar-engine-container'); container.innerHTML = '';
        let sceneHTML = `<a-scene mindar-image="imageTargetSrc: assets/markers/target.mind; autoStart: false; maxTrack: 1; uiLoading: no; uiScanning: no;" gltf-model="dracoDecoderPath: libs/draco/;" color-space="sRGB" renderer="colorManagement: true, physicallyCorrectLights" vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false"><a-light type="ambient" color="#ffffff" intensity="0.6"></a-light><a-light type="directional" color="#ffffff" intensity="1.2" position="1 2 1"></a-light><a-camera position="0 0 0" look-controls="enabled: false"></a-camera>`;                
        aetheriaData.forEach(city => {
            city.landmarks.forEach(lm => {
                if(!lm.hasAR) return; 
                let customScale = lm.scale || "0.05 0.05 0.05"; let customPos = lm.position || "0 0 0";
                monumentsDB[lm.target_index] = { name_en: lm.name_en, name_ar: lm.name_ar, desc_en: lm.full_desc_en, desc_ar: lm.full_desc_ar, src: lm.model, hotspots: lm.hotspots || [] };
                sceneHTML += `<a-entity mindar-image-target="targetIndex: ${lm.target_index}" class="monument-target" data-index="${lm.target_index}"><a-gltf-model id="ar-model-${lm.target_index}" data-src="${lm.model}" rotation="0 0 0" position="${customPos}" scale="${customScale}" visible="false"></a-gltf-model></a-entity>`;
            });
        });
        sceneHTML += `</a-scene>`; container.innerHTML = sceneHTML; setupAREvents(); isArEngineBuilt = true;
    }
    setTimeout(() => { const sceneEl = document.querySelector('a-scene'); try { if(sceneEl && sceneEl.systems["mindar-image-system"]) { sceneEl.systems["mindar-image-system"].start(); arSystemStarted = true; } } catch(e) {} }, 100);
}

function openARExperience() {
    if(isDetailsPlaying) { isDetailsPlaying = false; const btn = document.getElementById('dtl-audio-btn'); if(btn) btn.innerHTML = `<span>🎧</span> <span>${getUiText().listenBtn}</span>`; }
    window.isPinnedAR = false; document.body.classList.add('ar-active');
    if(isSpeechSpeaking) { window.speechSynthesis.cancel(); isSpeechSpeaking = false; updateVoiceAssistantButton(false); }
    document.getElementById('app-pages').style.display = 'none'; document.querySelector('header').style.display = 'none'; document.getElementById('floating-ar-btn').style.display = 'none'; document.getElementById('floating-voice-btn').style.display = 'none'; 
    document.getElementById('ar-engine-container').style.display = 'block'; document.getElementById('ar-ui-layer').style.display = 'block'; document.getElementById('ar-sos-btn').style.display = 'flex'; 
    document.body.classList.remove('marker-found'); const scanner = document.getElementById('sci-fi-scanner'); if(scanner) scanner.style.display = 'block'; buildAndStartAR();
}

function closeARExperience() {
    stopARVoice(); window.speechSynthesis.cancel(); isSpeechSpeaking = false; document.body.classList.remove('ar-active'); 
    if (window.isPinnedAR) { document.getElementById('google-viewer-container').style.display = 'none'; document.getElementById('ar-top-pin-btn').style.display = 'none'; document.getElementById('ar-reset-camera-btn').style.display = 'none'; window.isPinnedAR = false; }
    if (currentActiveIndex !== null) { const currentModel = document.getElementById(`ar-model-${currentActiveIndex}`); if (currentModel) { currentModel.setAttribute('visible', 'false'); currentModel.classList.remove('active-ar-model'); } }
    const sceneEl = document.querySelector('a-scene'); if(sceneEl && sceneEl.systems["mindar-image-system"]) { sceneEl.systems["mindar-image-system"].stop(); }
    document.getElementById('ar-engine-container').style.display = 'none'; document.getElementById('ar-ui-layer').style.display = 'none'; document.getElementById('ar-sos-btn').style.display = 'none';
    const scanner = document.getElementById('sci-fi-scanner'); if(scanner) scanner.style.display = 'none';
    document.body.classList.remove('marker-found'); hideBottomPanel(); const infoToggle = document.getElementById('ar-info-toggle'); if(infoToggle) infoToggle.style.display = 'none';
    currentActiveIndex = null;
    document.getElementById('app-pages').style.display = 'block'; document.querySelector('header').style.display = 'flex';
    if(currentView !== 'view-welcome') { document.getElementById('floating-voice-btn').style.display = 'flex'; }
    if(currentView === 'view-landmarks') { document.getElementById('floating-ar-btn').style.display = 'flex'; } else { document.getElementById('floating-ar-btn').style.display = 'none'; }
}

function setupAREvents() {
    const targets = document.querySelectorAll('.monument-target'); const titleEl = document.getElementById('ar-monument-title'); const descEl = document.getElementById('ar-monument-desc'); const panel = document.getElementById('ar-bottom-panel'); const pinBtn = document.getElementById('ar-top-pin-btn'); const googleViewer = document.getElementById('google-3d-model');
    targets.forEach(target => {
        target.addEventListener('targetFound', event => {
            document.body.classList.add('marker-found'); currentActiveIndex = target.getAttribute('data-index'); const db = monumentsDB[currentActiveIndex];
            if(db) { if(titleEl) titleEl.innerText = db['name_'+currentLang]; if(descEl) descEl.innerText = db['desc_'+currentLang]; if (googleViewer.src !== db.src) googleViewer.src = db.src; }
            const currentModel = document.getElementById(`ar-model-${currentActiveIndex}`); if(currentModel) { const actualSrc = currentModel.getAttribute('data-src'); if (!currentModel.getAttribute('src') && actualSrc) { currentModel.setAttribute('src', actualSrc); } currentModel.setAttribute('visible', 'true'); currentModel.classList.add('active-ar-model'); }
            if(panel) { panel.classList.remove('hidden-by-user'); panel.classList.add('active'); } const infoToggle = document.getElementById('ar-info-toggle'); if(infoToggle) infoToggle.style.display = 'none'; if(pinBtn) pinBtn.style.display = 'flex'; 
        });
        target.addEventListener('targetLost', event => {
            if(!window.isPinnedAR && document.body.classList.contains('ar-active')) { document.body.classList.remove('marker-found'); const index = target.getAttribute('data-index'); const currentModel = document.getElementById(`ar-model-${index}`); if(currentModel) { currentModel.setAttribute('visible', 'false'); currentModel.classList.remove('active-ar-model'); } stopARVoice(); if(panel) panel.classList.remove('active'); const infoToggle = document.getElementById('ar-info-toggle'); if(infoToggle) infoToggle.style.display = 'none'; if(pinBtn) pinBtn.style.display = 'none'; }
        });
    });
}

function togglePinDetach() {
    const txt = getUiText(); if (currentActiveIndex === null) return;
    const activeArModel = document.getElementById(`ar-model-${currentActiveIndex}`); const googleViewerContainer = document.getElementById('google-viewer-container'); const googleViewer = document.getElementById('google-3d-model'); const pinBtn = document.getElementById('ar-top-pin-btn'); const sceneEl = document.querySelector('a-scene');
    if (!window.isPinnedAR) {
        if(sceneEl && sceneEl.systems["mindar-image-system"]) { sceneEl.systems["mindar-image-system"].stop(); } if(activeArModel) activeArModel.setAttribute('visible', 'false'); if(pinBtn) { pinBtn.style.display = 'none'; } window.isPinnedAR = true;
        setTimeout(() => {
            if(googleViewerContainer) googleViewerContainer.style.display = 'block'; const resetBtn = document.getElementById('ar-reset-camera-btn'); if(resetBtn) resetBtn.style.display = 'flex'; if(googleViewer) { googleViewer.cameraTarget = 'auto auto auto'; googleViewer.cameraOrbit = 'auto auto auto'; googleViewer.fieldOfView = 'auto'; }
            const db = monumentsDB[currentActiveIndex]; if(googleViewerContainer) { googleViewerContainer.querySelectorAll('.ar-hotspot').forEach(el => el.remove()); }
            if (db && db.hotspots && db.hotspots.length > 0 && googleViewerContainer) {
                db.hotspots.forEach((hs, index) => { const btn = document.createElement('button'); btn.className = 'ar-hotspot'; btn.slot = `hotspot-${index}`; btn.dataset.position = hs.position; btn.dataset.normal = "0 1 0"; const tooltip = document.createElement('div'); tooltip.className = 'ar-hotspot-tooltip'; tooltip.innerText = hs['name_' + currentLang]; tooltip.dir = currentLang === 'ar' ? 'rtl' : 'ltr'; btn.appendChild(tooltip); btn.addEventListener('click', () => { if(googleViewer) { googleViewer.cameraTarget = hs.target; googleViewer.cameraOrbit = hs.orbit; if(hs.fov) googleViewer.fieldOfView = hs.fov; } }); if(googleViewer) googleViewer.appendChild(btn); });
            }
        }, 50);
    } else {
        if(googleViewerContainer) googleViewerContainer.style.display = 'none'; if(activeArModel) activeArModel.setAttribute('visible', 'false'); if(pinBtn) { pinBtn.style.display = 'none'; } const resetBtn = document.getElementById('ar-reset-camera-btn'); if(resetBtn) resetBtn.style.display = 'none'; document.body.classList.remove('marker-found'); hideBottomPanel(); const infoToggle = document.getElementById('ar-info-toggle'); if(infoToggle) infoToggle.style.display = 'none'; stopARVoice(); if(sceneEl && sceneEl.systems["mindar-image-system"]) { sceneEl.systems["mindar-image-system"].start(); } currentActiveIndex = null; window.isPinnedAR = false;
    }
}

// ==========================================
// 🚨 8. SOS Emergency System 🚨
// ==========================================
let isSosActive = false;
let sosTimeout = null;

function triggerSOS() {
    const url = window.location.origin + (isSosActive ? '/api/sos/cancel' : '/api/sos');
    const msg = isSosActive ? 
        (currentLang === 'en' ? "Cancel SOS Alert?" : "هل تريد إلغاء نداء الاستغاثة والخطر؟") : 
        (currentLang === 'en' ? "Send Emergency SOS?" : "إرسال نداء استغاثة طارئ لغرفة العمليات؟");
    
    if (confirm(msg)) {
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                clientId: clientSocket ? clientSocket.id : null,
                time: new Date().toLocaleTimeString(),
                location: currentCity ? currentCity['name_'+currentLang] : (activeLocationId || "Unknown Area")
            })
        })
        .then(response => {
            if (response.ok) {
                if (isSosActive) {
                    isSosActive = false;
                    if(sosTimeout) clearTimeout(sosTimeout);
                    showToast(currentLang === 'en' ? "❌ SOS Canceled." : "❌ تم إلغاء نداء الاستغاثة.");
                } else {
                    isSosActive = true;
                    showToast(currentLang === 'en' ? "🚨 SOS Alert Sent!" : "🚨 تم إرسال الاستغاثة بنجاح!");
                    
                    if(sosTimeout) clearTimeout(sosTimeout);
                    sosTimeout = setTimeout(() => {
                        isSosActive = false;
                        updateSOSButtons();
                    }, 60000);
                }
                updateSOSButtons();
            } else {
                showToast(currentLang === 'en' ? "⚠️ Error sending SOS." : "⚠️ فشل الإرسال.");
            }
        })
        .catch(err => {
            showToast(currentLang === 'en' ? "⚠️ Network error! Turn off Mobile Data (4G)." : "⚠️ خطأ في الشبكة! يرجى إطفاء بيانات الهاتف (4G/5G).");
        });
    }
}

function updateSOSButtons() {
    const b1 = document.getElementById('sos-btn');
    const b2 = document.getElementById('ar-sos-btn');
    const txtCancel = currentLang === 'en' ? "❌ Cancel" : "❌ إلغاء";
    const txtSOS = "🚨 SOS";

    if(b1) { 
        b1.innerText = isSosActive ? txtCancel : txtSOS; 
        if (isSosActive) b1.classList.add('sos-active-state');
        else b1.classList.remove('sos-active-state');
    }
    
    if(b2) { 
        b2.innerText = isSosActive ? "❌" : "🚨"; 
        if (isSosActive) b2.classList.add('sos-active-state');
        else b2.classList.remove('sos-active-state');
    }
}