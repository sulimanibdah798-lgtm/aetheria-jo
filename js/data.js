// ==========================================
// 🏷️ Tags System (نظام التصنيفات)
// ==========================================
const appTags = [
    { id: "all", en: "All Sites", ar: "الكل" },
    { id: "roman", en: "🏛️ Roman", ar: "🏛️ روماني" },
    { id: "islamic", en: "🏰 Islamic", ar: "🏰 إسلامي" },
    { id: "nabataean", en: "🏜️ Nabataean", ar: "🏜️ نبطي" },
    { id: "byzantine", en: "⛪ Byzantine", ar: "⛪ بيزنطي" },
    { id: "umayyad", en: "🕌 Umayyad", ar: "🕌 أموي" },
    { id: "natural", en: "🌿 Natural", ar: "🌿 طبيعي" },
    { id: "religious", en: "🕊️ Religious", ar: "🕊️ ديني" }
];

// ==========================================
// 🌍 User Interface Translations (قاموس الترجمة)
// ==========================================
const uiText = {
    en: {
        mainTitle: "AETHERIA", welcomeSub: "Explore Jordan's ancient heritage with WebAR and interactive guides",
        citiesTitle: "Jordan Destinations", citiesSub: "Explore heritage sites offline", 
        landmarksTitle: "Monuments", landmarksSub: "Sorted by historical rank",
        citiesBack: "❮ Lang", backToCities: "❮ Cities", backToLandmarks: "❮ Monuments", backBtn: "❮ Back", 
        listenBtn: "Listen to Story", startAR: "Experience in WebAR", loading: "Loading...", pauseGuide: "Pause Audio", 
        scanTxt: "Scanning for marker...", detachModel: "📌 Detach Model", scanAnother: "📍 Scan Another", noAudio: "⚠️ Audio guide not found.", 
        scanAR: "Scan AR", count: "sites", rank: "Rank: #", emptyCity: "No monuments found in this location.", searchPlaceholder: "Search cities or monuments... 🔍",
        voiceBtn: "Guide", voiceStop: "Stop", swipeTut: "Swipe for more",
        tutWelcome: "Welcome to Aetheria. Choose your preferred language to begin.", tutCities: "Select a city destination to explore its historic monuments.",
        tutLandmarks: "Here are the historical monuments for this city. Select one to view details and hear its story.", tutDetails: "You can read the description, listen to the historic story, or open the Web AR experience.",
        tutAR: "Point your camera at the marker. Once detected, you can pin the 3D model, hide information by swiping down, and listen to the audio guide.",
        youAreHere: "📍 You are here",
        arBoxTitle: "3D AR Experience Available", arBoxDesc: "Visit this site in person and use the scanner to bring history to life!"
    },
    ar: {
        mainTitle: "AETHERIA", welcomeSub: "استكشف معالم الأردن التاريخية بالواقع المعزز وبدون إنترنت",
        citiesTitle: "وجهات الأردن", citiesSub: "استكشف المواقع الأثرية بدون إنترنت", 
        landmarksTitle: "المعالم الأثرية", landmarksSub: "مرتبة حسب الأهمية التاريخية",
        citiesBack: "❮ اللغة", backToCities: "❮ المدن", backToLandmarks: "❮ المعالم", backBtn: "❮ رجوع", 
        listenBtn: "استمع للقصة", startAR: "الواقع المعزز (AR)", loading: "جاري التحميل...", pauseGuide: "إيقاف السرد", 
        scanTxt: "جاري البحث عن اللوحة...", detachModel: "📌 تثبيت المجسم", scanAnother: "📍 مسح معلم آخر", noAudio: "⚠️ الملف الصوتي غير متوفر.", 
        scanAR: "كاميرا AR", count: "معالم", rank: "الترتيب: #", emptyCity: "لا توجد معالم مضافة لهذا الموقع حالياً.", searchPlaceholder: "ابحث عن الأماكن أو المعالم... 🔍",
        voiceBtn: "المرشد", voiceStop: "إيقاف", swipeTut: "اسحب لرؤية المزيد",
        tutWelcome: "مرحباً بك في إيـثـيـريـا. اختر لغتك المفضلة للبدء.",
        tutCities: "اختر إحدى الوجهات لاستكشاف معالمها الأثرية.",
        tutLandmarks: "هذه هي المعالم التاريخية للمدينة. اختر أحدها لعرض التفاصيل.",
        tutDetails: "يمكنك قراءة الوصف، أو الاستماع إلى القصة، أو فتح تجربة الواقع المعزز.",
        tutAR: "وجّه الكاميرا نحو اللوحة. عند ظهور المجسم، يمكنك تثبيته بالأعلى، وإخفاء اللوحة بسحبها من عنوانها للأسفل.",
        youAreHere: "📍 أنت هنا",
        arBoxTitle: "تجربة الواقع المعزز متوفرة", arBoxDesc: "قم بزيارة الموقع شخصياً واستخدم الماسح الضوئي لإحياء التاريخ أمامك!"
    }
};

// ==========================================
// 🏛️ Archaeological Sites Database (قاعدة البيانات الأصلية مدموجة مع الجديدة)
// ==========================================
const aetheriaData = [
    { 
        id: "amman", img: "assets/images/amman.jpg", name_en: "Amman", name_ar: "عمّان", 
        landmarks: [
            // --- معالمك الأصلية بأوصافك الدقيقة ---
            { 
                id: "citadel", rank: 1, target_index: 0, hasAR: true, tags: ["roman", "umayyad", "byzantine"], 
                name_en: "Amman Citadel", name_ar: "جبل القلعة", 
                desc_en: "Historic hill site with Temple of Hercules.", desc_ar: "موقع أثري يضم معبد هرقل والقصر الأموي.", 
                full_desc_en: "Perched on the highest hill in Amman, the Amman Citadel is a breathtaking historic site that offers a journey through time. It boasts incredible ruins from the Roman, Byzantine, and Umayyad periods, most notably the majestic pillars of the Temple of Hercules and the stunning Umayyad Palace. Offering panoramic views of the entire city, it is an essential stop for anyone wanting to experience the deep historical roots and captivating beauty of Jordan's capital.", 
                full_desc_ar: "يتربع جبل القلعة على أعلى تلال عمّان، وهو موقع تاريخي خلاب يأخذك في رحلة مدهشة عبر الزمن. يضم الموقع أطلالاً أثرية تعود للعصور الرومانية والبيزنطية والأموية، أبرزها الأعمدة المهيبة لمعبد هرقل والقصر الأموي الساحر. يوفر جبل القلعة إطلالات بانورامية لا تُنسى على المدينة، مما يجعله وجهة أساسية لكل من يرغب في استكشاف الجذور التاريخية العميقة والجمال الآسر للعاصمة الأردنية.", 
                img: "assets/images/citadel.jpg", model: "assets/models/citadel.glb", audio: "assets/audio/citadel.mp3" 
            },
            { 
                id: "roman-theater", rank: 2, target_index: 1, hasAR: true, tags: ["roman"], 
                name_en: "Roman Theater", name_ar: "المدرج الروماني", 
                desc_en: "6,000-seat 2nd-century Roman theater.", desc_ar: "مدرج روماني يتسع لـ 6000 متفرج.", 
                full_desc_en: "Carved directly into the hillside, the Roman Theater is a magnificent 2nd-century architectural masterpiece that once seated up to 6,000 spectators. Located in the heart of downtown Amman, this remarkably preserved amphitheater reflects the grandeur of the ancient Roman city of Philadelphia. Today, it still stands as a vibrant cultural venue, hosting concerts and events while inviting visitors to marvel at its brilliant acoustic design and historical significance.", 
                full_desc_ar: "يُعد المدرج الروماني، المنحوت مباشرة في سفح التل، تحفة معمارية مذهلة تعود إلى القرن الثاني الميلادي، وكان يتسع لحوالي ستة آلاف متفرج. يقع هذا المدرج المحفوظ بعناية فائقة في قلب منطقة وسط البلد، ويعكس عظمة مدينة فيلادلفيا الرومانية القديمة. ولا يزال حتى اليوم يمثل صرحاً ثقافياً نابضاً بالحياة، حيث يستضيف الحفلات والفعاليات، داعياً زواره للتأمل في تصميمه الصوتي العبقري وأهميته التاريخية البارزة.", 
                img: "assets/images/roman_theater.jpg", model: "assets/models/roman_theater.glb", audio: "assets/audio/roman_theater.mp3" 
            },
            { 
                id: "nymphaeum", rank: 3, target_index: 2, hasAR: true, tags: ["roman"], 
                name_en: "Nymphaeum", name_ar: "سبيل الحوريات", 
                desc_en: "Ancient Roman public fountain.", desc_ar: "نافورة مائية رومانية تاريخية.", 
                full_desc_en: "The Nymphaeum is a fascinating ancient Roman public fountain located near the Roman Theater in downtown Amman. Built in the 2nd century AD, this two-story complex was originally adorned with exquisite mosaics, stone carvings, and a massive pool, serving as a refreshing oasis for the city's residents. Though partially in ruins today, ongoing restoration efforts allow visitors to glimpse the luxury, intricate architecture, and sophisticated urban planning of the ancient Roman era.", 
                full_desc_ar: "يعتبر سبيل الحوريات نافورة عامة رومانية قديمة ومذهلة تقع بالقرب من المدرج الروماني في وسط البلد. بُني هذا المجمع المكون من طابقين في القرن الثاني الميلادي، وكان مزيناً في الأصل بالفسيفساء الرائعة والنقوش الحجرية وبركة ضخمة، ليكون بمثابة واحة منعشة لسكان المدينة. ورغم أنه أصبح أطلالاً اليوم، إلا أن جهود الترميم المستمرة تتيح للزوار تخيل مدى الفخامة، ودقة العمارة، والتخطيط الحضري المتطور الذي ميز العصر الروماني القديم.", 
                img: "assets/images/nymphaeum.jpg", model: "assets/models/nymphaeum.glb", audio: "assets/audio/nymphaeum.mp3" 
            },
            { 
                id: "dukes-design", rank: 4, target_index: 3, hasAR: true, tags: ["islamic"], 
                name_en: "Duke's Diwan", name_ar: "ديوان الدوق", 
                desc_en: "One of the oldest stone buildings in Amman.", desc_ar: "من أقدم المباني الحجرية في عمّان.", 
                full_desc_en: "Known as one of the oldest and best-preserved stone buildings in downtown Amman, Duke's Design (historically known as the Duke's Diwan) is a beautifully restored 1924 townhouse. Originally built as a post office and later serving as a hotel, its historic rooms are now a living museum of early 20th-century Ammani architecture and culture. With its antique furniture and vintage charm, it serves as a nostalgic cultural hub that captures the authentic, old-world soul of the city.", 
                full_desc_ar: "يُعرف ديوان الدوق بأنه واحد من أقدم المباني الحجرية وأفضلها حفظاً في وسط عمّان، وهو مبنى تاريخي يعود لعام 1924 تم ترميمه بعناية فائقة. استُخدم المبنى في الأصل كمكتب بريد ثم كفندق، وتحولت غرفه التاريخية اليوم إلى متحف حي يبرز العمارة والثقافة العمّانية في اوائل القرن العشرين. بأثاثه العتيق وسحره الكلاسيكي، يمثل هذا المكان مركزاً ثقافياً يعبق بالحنين ويجسد الروح الأصيلة لمدينة عمّان القديمة.", 
                img: "assets/images/duke.jpg", model: "assets/models/duke.glb", audio: "assets/audio/duke.mp3" 
            },
            // --- المعالم الجديدة المضافة ---
            { 
                id: "qasr_al_abd", rank: 5, target_index: 33, hasAR: true, tags: ["roman"], 
                name_en: "Qasr Al-Abd", name_ar: "قصر العبد", 
                desc_en: "Hellenistic era palace built from massive megalithic stones.", desc_ar: "قصر أثري نادر من العصر الهلنستي.", 
                full_desc_en: "Located in the lush valley of Iraq Al-Amir near Amman, Qasr Al-Abd is one of the very few surviving examples of Hellenistic architecture in Jordan. Built in the 2nd century BC by Hyrcanus of the powerful Tobiad family, this two-story palace is constructed from some of the largest stone blocks in the Middle East. It is famous for its intricate animal carvings, particularly the imposing lions and panthers that decorate its grand exterior.", 
                full_desc_ar: "يقع 'قصر العبد' في الوادي الأخضر الخلاب لمنطقة عراق الأمير بالقرب من عمان، وهو من الأمثلة النادرة جداً المتبقية للعمارة الهلنستية في الأردن. بُني في القرن الثاني قبل الميلاد على يد 'هيركانوس' من عائلة طوبيا القوية. يتكون القصر من طابقين ومبني من كتل حجرية تُعد من الأضخم في الشرق الأوسط. يشتهر بنقوشه الحيوانية البارزة، وخاصة الأسود والفهود المهيبة التي تزين واجهاته الخارجية.", 
                img: "assets/images/qasr_al_abd.jpg", model: "assets/models/qasr_al_abd.glb", audio: "assets/audio/qasr_al_abd.mp3" 
            },
            { 
                id: "qasr_mushatta", rank: 6, target_index: 34, hasAR: true, tags: ["umayyad", "islamic"], 
                name_en: "Qasr Al-Mushatta", name_ar: "قصر المشتى", 
                desc_en: "The largest of the Umayyad winter palaces.", desc_ar: "أضخم القصور الشتوية الأموية.", 
                full_desc_en: "Located near Queen Alia International Airport, Qasr Al-Mushatta is the largest and most ambitious of the Umayyad desert castles. Believed to have been commissioned by Caliph Al-Walid II in 744 AD, the sprawling palace was left unfinished after his assassination. It is globally famed for its incredibly intricate and delicate stone carvings.", 
                full_desc_ar: "يقع قصر المشتى بالقرب من مطار الملكة علياء الدولي، وهو أضخم وأكثر القصور الصحراوية الأموية طموحاً. يُعتقد أن الخليفة الوليد الثاني أمر ببنائه عام 744م كقصر شتوي، لكنه تُرك غير مكتمل بعد اغتياله. يشتهر القصر عالمياً بنقوشه الحجرية البالغة الدقة والتعقيد. ومن المثير للاهتمام أن السلطان العثماني أهدى جزءاً كبيراً من واجهته المزخرفة المذهلة إلى الإمبراطور الألماني عام 1903.", 
                img: "assets/images/mushatta.jpg", model: "assets/models/mushatta.glb", audio: "assets/audio/mushatta.mp3" 
            },
            { 
                id: "qasr_tuba", rank: 7, target_index: 35, hasAR: true, tags: ["umayyad", "islamic"], 
                name_en: "Qasr Tuba", name_ar: "قصر الطوبة", 
                desc_en: "One of the most remote and monumental Umayyad desert castles.", desc_ar: "أحد أبعد القصور الأموية الصحراوية وأضخمها.", 
                full_desc_en: "Situated deep in the eastern desert, Qasr Tuba is one of the most remote and expansive of the Umayyad desert castles. Commissioned by Caliph Al-Walid II in 743 AD, the palace was never completed. Its architecture is unique in Jordan, combining massive limestone blocks for the lower courses with baked mud-bricks for the upper sections and vaulted roofs.", 
                full_desc_ar: "يقع قصر الطوبة في عمق الصحراء الشرقية، وهو من أبعد القصور الأموية وأوسعها. أمر ببنائه الخليفة الوليد الثاني عام 743م، لكنه لم يُكتمل قط. يتميز بعمارة فريدة في الأردن؛ حيث تم استخدام كتل ضخمة من الحجر الجيري في الأساسات السفلية، بينما استُخدم الطوب الطيني المشوي (الآجر) في الأجزاء العلوية والأسقف المقببة.", 
                img: "assets/images/tuba.jpg", model: "assets/models/tuba.glb", audio: "assets/audio/tuba.mp3" 
            },
            { 
                id: "cave_of_seven_sleepers", rank: 8, target_index: -1, hasAR: false, tags: ["religious", "islamic", "byzantine"], 
                name_en: "Cave of Seven Sleepers", name_ar: "أهل الكهف (الرقيم)", 
                desc_en: "The resting place of the pious youths mentioned in the Quran.", desc_ar: "مرقد الفتية المؤمنين المذكورين في القرآن الكريم.", 
                full_desc_en: "Located in the village of Al-Raqeem south of Amman, the Cave of the Seven Sleepers (Ahl Al-Kahf) is a site of immense religious significance for both Muslims and Christians. According to tradition and the Holy Quran, a group of devout young men fled religious persecution and slept miraculously in this cave for over 300 years.", 
                full_desc_ar: "يقع 'كهف أهل الكهف' في قرية الرقيم جنوب العاصمة عمان، وهو موقع ذو أهمية دينية عميقة للمسلمين والمسيحيين على حد سواء. وفقاً للروايات والقرآن الكريم (سورة الكهف)، لجأت مجموعة من الفتية المؤمنين إلى هذا الكهف هرباً من الاضطهاد الديني لإمبراطور روماني، وناموا فيه معجزةً لأكثر من 300 عام.", 
                img: "assets/images/sleepers.jpg", model: "", audio: "assets/audio/sleepers.mp3" 
            },
            { 
                id: "umm_ar_rasas", rank: 9, target_index: -1, hasAR: false, tags: ["byzantine", "islamic"], 
                name_en: "Umm ar-Rasas", name_ar: "أم الرصاص", 
                desc_en: "UNESCO site housing magnificent Byzantine mosaics.", desc_ar: "موقع تراث عالمي يحتضن أروع الفسيفساء البيزنطية.", 
                full_desc_en: "Umm ar-Rasas originated as a Roman military camp before evolving into a prosperous Byzantine and early Islamic town. It is now a UNESCO World Heritage site. Its most spectacular attraction is the perfectly preserved mosaic floor of the Church of Saint Stephen. Created in 785 AD, the massive mosaic intricately depicts maps of prominent cities in the Holy Land and Egypt.", 
                full_desc_ar: "بدأت 'أم الرصاص' كمعسكر حامية عسكرية رومانية قبل أن تتطور إلى بلدة بيزنطية وإسلامية مزدهرة، وهي اليوم موقع مدرج باليونسكو. أبرز كنوزها هي الأرضية الفسيفسائية المذهلة في كنيسة القديس إسطفان، والتي صُنعت عام 785م وتصور بدقة خرائط لمدن مهمة في الأراضي المقدسة ومصر. يقف بالقرب من الآثار برج حجري بارتفاع 15 متراً للرهبان العموديين.", 
                img: "assets/images/umarrasas.jpg", model: "", audio: "assets/audio/umarrasas.mp3" 
            }
        ]
    },
    { 
        id: "jerash", img: "assets/images/jerash.jpg", name_en: "Jerash", name_ar: "جرش", 
        landmarks: [
            // --- معالمك الأصلية ---
            { 
                id: "south-theater", rank: 1, target_index: 4, hasAR: true, tags: ["roman"], 
                name_en: "South Theater", name_ar: "المسرح الجنوبي", 
                desc_en: "Massive Roman theater with acoustic acoustics.", desc_ar: "أضخم مسارح جرش الرومانية المميزة بدقة الصوت.", 
                full_desc_en: "Built during the reign of Emperor Domitian, the South Theater in Jerash is a spectacular Roman amphitheater that can accommodate over 3,000 spectators. Known for its remarkable acoustics, a speaker at the center of the orchestra floor can be heard clearly throughout the entire auditorium. Today, it remains a lively venue, famously hosting performances during the annual Jerash Festival of Culture and Arts.", 
                full_desc_ar: "بُني المدرج الجنوبي في جرش خلال عهد الإمبراطور دوميتيان، وهو مدرج روماني مذهل يتسع لأكثر من 3000 متفرج. يشتهر المدرج بخصائصه الصوتية الاستثنائية، حيث يمكن سماع المتحدث في وسط ساحة الأوركسترا بوضوح في جميع أنحاء المدرجات. لا يزال المدرج حتى اليوم ينبض بالحياة، حيث يشتهر باستضافة العروض والفعاليات خلال مهرجان جرش للثقافة والفنون السنوي.", 
                img: "assets/images/south_theater.jpg", model: "assets/models/south_theater.glb", audio: "assets/audio/south_theater.mp3" 
            },
            { 
                id: "hadrian-arch", rank: 2, target_index: 5, hasAR: true, tags: ["roman"], 
                name_en: "Hadrian's Arch", name_ar: "قوس هادريان", 
                desc_en: "Triumphant Roman gate built in 129 AD.", desc_ar: "بوابة النصر الرومانية الفاخرة البنية عام 129م.", 
                full_desc_en: "Standing as a monumental gateway to the ancient city of Jerash, Hadrian's Arch was built in 129 AD to honor the visit of the Roman Emperor Hadrian. This towering triumph arch features intricate carvings and impressive architectural details that reflect the grandeur of the Roman Empire. It serves as the perfect starting point for visitors stepping back in time to explore the remarkably preserved ruins of Jerash.", 
                full_desc_ar: "يقف قوس هادريان كبوابة تذكارية مهيبة لمدينة جرش القديمة، وقد بُني في عام 129 ميلادي تكريماً لزيارة الإمبراطور الروماني هادريان. يتميز هذا القوس الانتصاري الشاهق بنقوشه الدقيقة وتفاصيله المعمارية المذهلة التي تعكس عظمة الإمبراطورية الرومانية. ويُعد نقطة الانطلاق المثالية للزوار في رحلتهم عبر الزمن لاستكشاف آثار جرش المحفوظة بشكل مدهش.", 
                img: "assets/images/hadrian.jpg", model: "assets/models/hadrian.glb", audio: "assets/audio/hadrian.mp3" 
            },
            { 
                id: "artemis-temple", rank: 3, target_index: 6, hasAR: true, tags: ["roman"], 
                name_en: "Temple of Artemis", name_ar: "معبد أرتميس", 
                desc_en: "Majestic patron goddess temple.", desc_ar: "المعبد الرئيسي المخصص لآلهة حماية جرش.", 
                full_desc_en: "The Temple of Artemis is the most magnificent and prominent monument in ancient Jerash, dedicated to the patron goddess of the city. Approached by a grand staircase, the temple's imposing Corinthian columns dominate the skyline, some still standing tall despite centuries of earthquakes. The sheer scale and beauty of the ruins provide a profound glimpse into the religious and architectural significance of the city during its golden age.", 
                full_desc_ar: "يُعد معبد أرتيميس الأثر الأعظم والأكثر بروزاً في مدينة جرش القديمة، وقد كُرس لآلهة المدينة الحامية. يمكن الوصول إلى المعبد عبر درج ضخم، وتبرز أعمدته الكورنثية المهيبة في الأفق، والتي لا يزال بعضها صامداً رغم قرون من الزلازل. يمنح حجم الأطلال وجمالها لمحة عميقة عن الأهمية الدينية والمعمارية للمدينة خلال عصرها الذهبي.", 
                img: "assets/images/artemis.jpg", model: "assets/models/artemis.glb", audio: "assets/audio/artemis.mp3" 
            },
            { 
                id: "oval-plaza", rank: 4, target_index: 7, hasAR: true, tags: ["roman"], 
                name_en: "Oval Plaza", name_ar: "الساحة البيضاوية", 
                desc_en: "Unique oval forum surrounded by Ionic columns.", desc_ar: "ساحة بيضاوية فريدة محاطة بالأعمدة الأيونية.", 
                full_desc_en: "The Oval Plaza is a uniquely shaped, expansive forum in Jerash, renowned for its distinctive asymmetrical design which seamlessly connects the main colonnaded street (Cardo Maximus) to the Temple of Zeus. Paved with beautifully arranged limestone slabs and surrounded by a sweeping colonnade of Ionic pillars, it served as the bustling heart of the ancient city's social and public life.", 
                full_desc_ar: "الساحة البيضاوية هي ساحة واسعة ذات شكل فريد في جرش، تشتهر بتصميمها غير المتماثل الذي يربط بسلاسة بين شارع الأعمدة الرئيسي الكاردو ومعبد زيوس. رُصفت الساحة بألواح حجرية جيرية مرتبة بجمال، وتحيط بها أعمدة أيونية أنيقة، وكانت تمثل القلب النابض للحياة الاجتماعية والعامة في المدينة القديمة.", 
                img: "assets/images/oval.jpg", model: "assets/models/oval.glb", audio: "assets/audio/oval.mp3" 
            },
            { 
                id: "north-theater", rank: 5, target_index: 8, hasAR: true, tags: ["roman"], 
                name_en: "North Theater", name_ar: "المدرج الشمالي", 
                desc_en: "Intimate Roman council chamber & theater.", desc_ar: "المسرح الروماني الصغير وقاعة المجلس القديمة.", 
                full_desc_en: "Smaller and more intimate than its southern counterpart, the North Theater of Jerash was originally built as a council chamber (odeion) in 165 AD before being expanded for theatrical performances. It features beautifully carved seats inscribed with the names of the city's tribes and officials. This elegant structure offers a closer, more detailed look at Roman civic architecture and provides a peaceful atmosphere for visitors.", 
                full_desc_ar: "يُعد المدرج الشمالي في جرش أصغر حجماً وأكثر حميمية من نظيره الجنوبي، وقد بُني في الأصل كقاعة مجلس أوديون عام 165 ميلادي قبل توسعته للعروض المسرحية. يتميز بمقاعده المنحوتة بجمال والتي نُقشت عليها أسماء قبائل ومسؤولي المدينة. يقدم هذا المبنى الأنيق نظرة أقرب وأكثر تفصيلاً على العمارة المدنية الرومانية ويوفر أجواء هادئة للزوار.", 
                img: "assets/images/north_theater.jpg", model: "assets/models/north_theater.glb", audio: "assets/audio/north_theater.mp3" 
            }
        ]
    },
    { 
        id: "maan", img: "assets/images/maan.jpg", name_en: "Ma'an", name_ar: "معان", 
        landmarks: [
            // --- معالمك الأصلية ---
            { 
                id: "khazneh", rank: 1, target_index: 9, hasAR: true, tags: ["nabataean", "roman"], 
                name_en: "The Treasury (Petra)", name_ar: "الخزنة (البتراء)", 
                desc_en: "Famous rock-cut facade in Petra.", desc_ar: "أشهر معالم الأنباط المنحوتة في صخر البتراء.", 
                full_desc_en: "The Treasury, or Al-Khazneh, is the crown jewel of Petra and one of the most famous rock-cut facades in the world. Carved intricately into the rose-red sandstone cliff face by the Nabataeans, this towering masterpiece greets visitors at the end of the Siq with breathtaking awe. Originally believed to be a royal tomb, its magnificent Hellenistic architecture and enigmatic aura make it an unforgettable symbol of ancient brilliance.", 
                full_desc_ar: "تعتبر الخزنة جوهرة البتراء التاجية وواحدة من أشهر الواجهات الصخرية المنحوتة في العالم. نُحتت هذه التحفة الفنية الشاهقة ببراعة في المنحدرات الرملية الوردية على يد الأنباط، لتستقبل الزوار في نهاية السيق بمشهد يحبس الأنفاس. يُعتقد أنها كانت في الأصل ضريحاً ملكياً، وتجعلها عمارتها الهلنستية المذهلة وهالتها الغامضة رمزاً لا يُنسى للعبقرية القديمة.", 
                img: "assets/images/khazneh.jpg", model: "assets/models/khazneh.glb", scale: "0.02 0.02 0.02", position: "0 -0.2 0", audio: "assets/audio/khazneh.mp3",
                hotspots: [
                    { name_en: "Inner Chamber", name_ar: "الغرفة الداخلية", position: "15.85 7.5 -3.23", target: "15.85m 7.5m -3.23m", orbit: "0deg 90deg 0m", fov: "100deg" }
                ]
            },
            { 
                id: "ad-deir", rank: 2, target_index: 10, hasAR: true, tags: ["nabataean"], 
                name_en: "The Monastery (Petra)", name_ar: "الدير (البتراء)", 
                desc_en: "Monumental Nabataean rock facade.", desc_ar: "أضخم واجهة منحوتة في جبال البتراء.", 
                full_desc_en: "Tucked high in the mountains of Petra and accessible only via a challenging climb of over 800 rock-cut steps, The Monastery (Ad-Deir) is a colossal and awe-inspiring Nabataean monument. Larger and broader than the Treasury, its monumental facade is beautifully carved and offers a profound sense of isolation and grandeur. The incredible panoramic views of the surrounding valleys from the top make the journey incredibly rewarding.", 
                full_desc_ar: "يختبئ الدير عالياً في جبال البتراء ولا يمكن الوصول إليه إلا عبر تسلق شاق لأكثر من 800 درجة صخرية، وهو نصب نبطي ضخم يبعث على الرهبة. واجهته التذكارية أكبر وأعرض من الخزنة، وهي منحوتة بجمال وتوفر إحساساً عميقاً بالعزلة والعظمة. الإطلالات البانورامية المذهلة على الوديان المحيطة من الأعلى تجعل هذه الرحلة تستحق كل الجهد.", 
                img: "assets/images/deir.jpg", model: "assets/models/deir.glb", audio: "assets/audio/deir.mp3" 
            },
            { 
                id: "siq", rank: 3, target_index: 11, hasAR: true, tags: ["natural", "nabataean"], 
                name_en: "The Siq", name_ar: "السيق", 
                desc_en: "Narrow gorge leading to Petra.", desc_ar: "الممر الصخري الضيق المؤدي للمدينة الورديّة.", 
                full_desc_en: "The Siq is the dramatic and narrow natural gorge that serves as the main entrance to the ancient city of Petra. Winding for over a kilometer between towering, colorful sandstone cliffs, walking through this mystical passageway is an experience in itself. The walls, which rise up to 80 meters high, reveal ancient water channels, sacred niches, and ultimately build anticipation until the majestic Treasury is finally revealed.", 
                full_desc_ar: "السيق هو ممر طبيعي ضيق ودراماتيكي يمثل المدخل الرئيسي لمدينة البتراء القديمة. يمتد لأكثر من كيلومتر بين منحدرات رملية شاهقة وملونة، ويعد المشي عبر هذا الممر الساحر تجربة فريدة بحد ذاتها. تكشف الجدران، التي يصل ارتفاعها إلى 80 متراً، عن قنوات مياه قديمة ومحاريب مقدسة، وتزيد من ترقب الزائر حتى تتجلى واجهة الخزنة المهيبة في نهايته.", 
                img: "assets/images/siq.jpg", model: "assets/models/siq.glb", audio: "assets/audio/siq.mp3" 
            },
            { 
                id: "royal-tombs", rank: 4, target_index: 12, hasAR: true, tags: ["nabataean"], 
                name_en: "Royal Tombs", name_ar: "المقابر الملكية", 
                desc_en: "Grand Nabataean royal facades.", desc_ar: "واجهات ملوك الأنباط العظيمة.", 
                full_desc_en: "The Royal Tombs consist of a series of grand, intricately carved mausoleums set against a massive rock massif overlooking the center of Petra. These include the Urn Tomb, Silk Tomb, Corinthian Tomb, and Palace Tomb, each showcasing a unique blend of Nabataean, Greek, and Roman architectural styles. The vivid colors of the sandstone, especially striking at sunset, enhance the majestic beauty of these final resting places of ancient kings.", 
                full_desc_ar: "تتكون المقابر الملكية من سلسلة من الأضرحة الكبيرة والمنحوتة بدقة، وتقع على كتلة صخرية ضخمة تطل على وسط البتراء. وتشمل قبر الجرة، وقبر الحرير، والقبر الكورنثي، وقبر القصر، حيث يعرض كل منها مزيجاً فريداً من الأساليب المعمارية النبطية واليونانية والرومانية. الألوان الزاهية للحجر الرملي، والتي تكون مذهلة بشكل خاص عند غروب الشمس، تعزز الجمال المهيب لمثوى الملوك القدامى.", 
                img: "assets/images/royal_tombs.jpg", model: "assets/models/royal_tombs.glb", audio: "assets/audio/royal_tombs.mp3" 
            },
            // --- المعالم الجديدة المضافة ---
            { 
                id: "shobak_castle", rank: 5, target_index: 36, hasAR: true, tags: ["islamic", "byzantine"], 
                name_en: "Shobak Castle", name_ar: "قلعة الشوبك", 
                desc_en: "Rugged Crusader fortress perched on a conical mountain.", desc_ar: "حصن صليبي مبكر ووعر يتربع بشموخ على قمة جبل.", 
                full_desc_en: "Built in 1115 AD by King Baldwin I of Jerusalem, Shobak Castle was the first in a chain of Crusader strongholds protecting the route between Egypt and Syria. Perched atop an isolated, cone-shaped mountain, it appears as a formidable extension of the rock itself. Today, its rugged ruins and secret subterranean spring passages offer a true sense of medieval warfare.", 
                full_desc_ar: "بُنيت قلعة الشوبك عام 1115 م على يد الملك بلدوين الأول ملك القدس، لتكون أول سلسلة القلاع الصليبية التي تحمي طريق التجارة بين مصر وسوريا. تتربع القلعة على قمة جبل مخروطي منعزل لتبدو وكأنها امتداد طبيعي للصخر. صمدت أمام حصارات عديدة قبل أن تسقط بيد صلاح الدين الأيوبي عام 1189م. تتيح أطلالها الوعرة وممراتها السرية عيش أجواء الحروب في العصور الوسطى.", 
                img: "assets/images/shobak.jpg", model: "assets/models/shobak.glb", audio: "assets/audio/shobak.mp3" 
            },
            { 
                id: "little_petra", rank: 6, target_index: -1, hasAR: false, tags: ["nabataean"], 
                name_en: "Little Petra", name_ar: "البتراء الصغيرة", 
                desc_en: "A captivating 'suburb' of Petra with painted frescoes.", desc_ar: "ضاحية تجارية ساحرة للبتراء تتميز بجدارياتها الملونة.", 
                full_desc_en: "Known locally as Siq al-Barid, Little Petra is located north of Petra. It is believed to have been a major agricultural center and a resupply post for camel caravans. Its most remarkable feature is the Painted Biclinium, containing rare surviving Hellenistic-style Nabataean ceiling frescoes.", 
                full_desc_ar: "يُعرف الموقع محلياً باسم 'السيق البارد'، وهو موقع أثري يقع شمال البتراء. يُعتقد أنه كان مركزاً زراعياً وضاحية تجارية ومحطة إمداد لقوافل الجمال. يزخر الوادي بالمعابد المنحوتة، وقاعات الطعام. من أبرز معالمه 'غرفة الطعام الملونة'، والتي تحتوي على واحدة من الجداريات النبطية القليلة المتبقية في العالم.", 
                img: "assets/images/littlepetra.jpg", model: "", audio: "assets/audio/littlepetra.mp3" 
            },
            { 
                id: "petra_sacrifice", rank: 7, target_index: -1, hasAR: false, tags: ["nabataean"], 
                name_en: "High Place of Sacrifice", name_ar: "المذبح (البتراء)", 
                desc_en: "Ancient Nabataean altar carved into a mountain peak.", desc_ar: "مذبح ديني نبطي منحوت في قمة جبل.", 
                full_desc_en: "Reached by climbing a steep, ancient staircase cut into the mountain, this site was used by the Nabataeans for important religious ceremonies and animal sacrifices to their gods. It offers hikers breathtaking, bird's-eye views over the entire ancient city.", 
                full_desc_ar: "للوصول إليه، يصعد الزوار درجات حجرية قديمة وشاهقة الانحدار نُحتت في الجبل. استخدم الأنباط هذا الموقع لإقامة الاحتفالات الدينية وتقديم القرابين. تضم المنصة مذبحاً منحوتاً، وتكافئ المتسلقين بمشهد بانورامي لا يُنسى لكامل المدينة الوردية.", 
                img: "assets/images/sacrifice.jpg", model: "", audio: "assets/audio/sacrifice.mp3" 
            }
        ]
    },
    { 
        id: "madaba", img: "assets/images/madaba.jpg", name_en: "Madaba", name_ar: "مادبا", 
        landmarks: [
            // --- معالمك الأصلية ---
            { 
                id: "nebo", rank: 1, target_index: 13, hasAR: true, tags: ["religious", "byzantine"], 
                name_en: "Mount Nebo", name_ar: "جبل نيبو", 
                desc_en: "Historic mountain overlook.", desc_ar: "مطل تاريخي على الأراضي المقدسة.", 
                full_desc_en: "Mount Nebo is a profoundly significant historical and religious mountain overlook, revered as the site where Moses was granted a view of the Promised Land before his death. The summit offers breathtaking panoramic views of the Jordan Valley, the Dead Sea, and on clear days, Jerusalem. It is also home to a beautifully preserved Byzantine church featuring some of the most intricate and well-preserved mosaic floors in the region.", 
                full_desc_ar: "يُعد جبل نيبو إطلالة جبلية ذات أهمية تاريخية ودينية عميقة، ويُبجل باعتباره المكان الذي أُلقى منه النبي موسى نظرة على الأرض الموعودة قبل وفاته. توفر القمة إطلالات بانورامية خلابة على وادي الأردن، والبحر الميت، ومدينة القدس في الأيام الصافية. كما يضم الجبل كنيسة بيزنطية محفوظة بعناية تحتوي على بعض من أدق الأرضيات الفسيفسائية وأفضلها حفظاً في المنطقة.", 
                img: "assets/images/nebo.jpg", model: "assets/models/nebo.glb", audio: "assets/audio/nebo.mp3" 
            },
            { 
                id: "mosaic-map", rank: 2, target_index: 14, hasAR: true, tags: ["byzantine", "religious"], 
                name_en: "Mosaic Map", name_ar: "خارطة الفسيفساء", 
                desc_en: "Oldest original map of the Holy Land.", desc_ar: "أقدم خارطة فسيفسائية للأرض المقدسة.", 
                full_desc_en: "Housed on the floor of the Greek Orthodox Church of St. George in Madaba, the Mosaic Map is the oldest surviving original cartographic depiction of the Holy Land, dating back to the 6th century AD. This extraordinary piece of Byzantine artistry uses millions of colored stones to illustrate ancient cities, rivers, and historical sites from Lebanon to Egypt, providing invaluable insights into biblical geography.", 
                full_desc_ar: "تقع خارطة الفسيفساء على أرضية كنيسة القديس جاورجيوس للروم الأرثوذكس في مادبا، وهي أقدم تصوير خرائطي أصلي باقٍ للأراضي المقدسة، ويعود تاريخها إلى القرن السادس الميلادي. تستخدم هذه التحفة الفنية البيزنطية الاستثنائية ملايين الأحجار الملونة لتصوير المدن القديمة والأنهار والمواقع التاريخية من لبنان إلى مصر، مما يوفر رؤى لا تقدر بثمن حول الجغرافيا التوراتية.", 
                img: "assets/images/madaba_map.jpg", model: "assets/models/madaba_map.glb", audio: "assets/audio/madaba_map.mp3" 
            },
            { 
                id: "machaerus", rank: 3, target_index: 15, hasAR: true, tags: ["religious", "roman"], 
                name_en: "Machaerus", name_ar: "قلعة مكاور", 
                desc_en: "Ancient fortified hilltop palace.", desc_ar: "قلعة تاريخية ومطل جبلي.", 
                full_desc_en: "Perched on a steep, fortified hilltop overlooking the Dead Sea, Machaerus is an ancient palace-fortress steeped in dramatic history. Built by the Hasmonean dynasty and later expanded by Herod the Great, it is most famous in antiquity as the site where John the Baptist was imprisoned and executed. Today, its rugged ruins offer a sense of profound history coupled with stunning, desolate views of the surrounding landscape.", 
                full_desc_ar: "تتربع قلعة مكاور على قمة تل محصن وشديد الانحدار يطل على البحر الميت، وهي قصر وقلعة قديمة غارقة في التاريخ الدراماتيكي. بناها الحشمونيون ووسعها لاحقاً هيرودس الكبير، وتشتهر تاريخياً بكونها الموقع الذي سُجن فيه يوحنا المعمدان يحيى عليه السلام وأُعدم. تقدم أطلالها الوعرة اليوم إحساساً بالتاريخ العميق مقترناً بإطلالات موحشة ومذهلة على المناظر الطبيعية المحيطة.", 
                img: "assets/images/machaerus.jpg", model: "assets/models/machaerus.glb", audio: "assets/audio/machaerus.mp3" 
            },
            // --- المعالم الجديدة المضافة ---
            { 
                id: "main_hot_springs", rank: 4, target_index: -1, hasAR: false, tags: ["natural"], 
                name_en: "Ma'in Hot Springs", name_ar: "حمامات ماعين", 
                desc_en: "Natural thermal waterfalls cascading into a deep gorge.", desc_ar: "شلالات حرارية طبيعية تتدفق عبر وادٍ سحيق.", 
                full_desc_en: "Hammamat Ma'in is a stunning natural oasis located 264 meters below sea level. Thousands of visiting bathers come each year to enjoy the mineral-rich waters of these hyper-thermal waterfalls, which cascade down dramatic cliff faces. The water is naturally heated by underground lava fissures.", 
                full_desc_ar: "حمامات ماعين هي واحة طبيعية مذهلة تقع على عمق 264 متراً تحت مستوى سطح البحر. يتوافد آلاف الزوار سنوياً للاستمتاع بالمياه الغنية بالمعادن لهذه الشلالات شديدة الحرارة. تتشكل هذه المياه من أمطار الشتاء وتُسخن طبيعياً بواسطة شقوق الحمم البركانية الجوفية قبل أن تندفع بقوة إلى الوادي.", 
                img: "assets/images/main.jpg", model: "", audio: "assets/audio/main.mp3" 
            },
            { 
                id: "umm_al_walid", rank: 5, target_index: -1, hasAR: false, tags: ["umayyad", "islamic"], 
                name_en: "Umm Al-Walid", name_ar: "أم الوليد", 
                desc_en: "Significant Umayyad agricultural and residential settlement.", desc_ar: "مستوطنة أموية زراعية وسكنية هامة.", 
                full_desc_en: "Located near Madaba, Umm Al-Walid was a major Umayyad settlement that thrived during the 8th century AD. Excavations have revealed the remains of three large Umayyad palaces built with well-cut masonry, an early Islamic mosque, and complex water storage systems.", 
                full_desc_ar: "تقع 'أم الوليد' بالقرب من مادبا، وكانت مستوطنة أموية كبرى ازدهرت في القرن الثامن الميلادي. كشفت الحفريات عن بقايا ثلاثة قصور أموية كبيرة مبنية بحجارة متقنة القطع، ومسجد إسلامي مبكر، وأنظمة معقدة لتخزين المياه، مما يقدم دليلاً على التطور الزراعي والريفي في العصر الإسلامي المبكر.", 
                img: "assets/images/walid.jpg", model: "", audio: "assets/audio/walid.mp3" 
            }
        ]
    },
    { 
        id: "ajloun", img: "assets/images/ajloun.jpg", name_en: "Ajloun", name_ar: "عجلون", 
        landmarks: [
            // --- معالمك الأصلية ---
            { 
                id: "ajloun-castle", rank: 1, target_index: 16, hasAR: true, tags: ["islamic"], 
                name_en: "Ajloun Castle", name_ar: "قلعة عجلون", 
                desc_en: "12th-century Muslim fortress.", desc_ar: "قلعة إسلامية من القرن 12.", 
                full_desc_en: "Built in the 12th century by one of Saladin's generals, Ajloun Castle is a formidable Muslim fortress constructed to protect against Crusader attacks and control local iron mines. Dominating the green hills of the Ajloun region, this exceptionally preserved military stronghold features a maze of vaulted passages, winding staircases, and massive towers that offer sweeping views of the Jordan Valley.", 
                full_desc_ar: "بُنيت قلعة عجلون في القرن الثاني عشر الميلادي على يد أحد قادة صلاح الدين الأيوبي، وهي حصن إسلامي منيع شُيد للحماية من هجمات الصليبيين والسيطرة على مناجم الحديد المحلية. تهيمن هذه القلعة العسكرية المحفوظة بشكل استثنائي على التلال الخضراء في منطقة عجلون، وتتميز بمتاهة من الممرات المقببة والسلالم المتعرجة والأبراج الضخمة التي توفر إطلالات واسعة على وادي الأردن.", 
                img: "assets/images/ajloun_castle.jpg", model: "assets/models/ajloun_castle.glb", audio: "assets/audio/ajloun_castle.mp3" 
            },
            { 
                id: "mar-elias", rank: 2, target_index: 17, hasAR: true, tags: ["religious", "byzantine"], 
                name_en: "Tell Mar Elias", name_ar: "تل مار إلياس", 
                desc_en: "Birthplace of Prophet Elijah.", desc_ar: "موقع ولادة النبي إيليا.", 
                full_desc_en: "Set amidst the lush, forested landscapes of Ajloun, Tell Mar Elias is revered as the birthplace of the Prophet Elijah (Ilyas). The site features the atmospheric ruins of one of the largest known Byzantine churches in Jordan, complete with beautifully intricate mosaic floors. It remains a tranquil and spiritual pilgrimage destination where visitors often tie ribbons to the surrounding oak trees to make wishes.", 
                full_desc_ar: "يقع تل مار إلياس وسط المناظر الطبيعية الخضراء والغابات في عجلون، ويُوقر باعتباره مسقط رأس النبي إلياس عليه السلام. يضم الموقع أطلالاً ساحرة لواحدة من أكبر الكنائس البيزنطية المعروفة في الأردن، والتي تحتوي على أرضيات فسيفسائية غاية في الدقة والجمال. لا يزال الموقع وجهة حج هادئة وروحانية، حيث يعتاد الزوار على ربط شرائط بأشجار البلوط المحيطة طلباً للأمنيات.", 
                img: "assets/images/mar_elias.jpg", model: "assets/models/mar_elias.glb", audio: "assets/audio/mar_elias.mp3" 
            }
        ]
    },
    { 
        id: "karak", img: "assets/images/karak.jpg", name_en: "Karak", name_ar: "الكرك", 
        landmarks: [
            // --- معالمك الأصلية ---
            { 
                id: "karak-castle", rank: 1, target_index: 18, hasAR: true, tags: ["islamic", "byzantine"], 
                name_en: "Karak Castle", name_ar: "قلعة الكرك", 
                desc_en: "Massive Crusader fortress.", desc_ar: "من أضخم القلاع التاريخية.", 
                full_desc_en: "Karak Castle is a massive, dark-stone Crusader fortress that dominates the skyline of the city of Karak. A prime example of Crusader military architecture mixed with later Mamluk and Ottoman additions, it features an impressive subterranean network of dimly lit galleries, sleeping quarters, and ancient kitchens. Walking through its rugged halls provides a vivid sense of the intense battles fought during the Crusades.", 
                full_desc_ar: "قلعة الكرك هي حصن صليبي ضخم مبني من الحجر الداكن يهيمن على أفق مدينة الكرك. تعتبر القلعة مثالاً بارزاً على العمارة العسكرية الصليبية الممزوجة بإضافات مملوكية وعثمانية لاحقة، وتتميز بشبكة مذهلة تحت الأرض من الأروقة الخافتة الإضاءة ومهاجع النوم والمطابخ القديمة. يوفر التجول في قاعاتها الوعرة إحساساً حياً بالمعارك الطاحنة التي دارت خلال الحروب الصليبية.", 
                img: "assets/images/karak_castle.jpg", model: "assets/models/karak_castle.glb", audio: "assets/audio/karak_castle.mp3" 
            },
            { 
                id: "prophet-nuh", rank: 2, target_index: 19, hasAR: true, tags: ["religious"], 
                name_en: "Prophet Nuh Shrine", name_ar: "مقام النبي نوح", 
                desc_en: "Historic religious shrine.", desc_ar: "مقام ديني تاريخي مهم.", 
                full_desc_en: "Located in the city of Karak, the Prophet Nuh (Noah) Shrine is a historic religious site holding deep spiritual significance. Enclosed within a simple yet revered stone structure, it is traditionally believed to be the tomb of the biblical and Quranic figure, Prophet Noah. It serves as a quiet place of contemplation and a point of religious reverence for locals and pilgrims alike.", 
                full_desc_ar: "يقع مقام النبي نوح في مدينة الكرك، وهو موقع ديني تاريخي يحمل أهمية روحية عميقة. يُحاط المقام بمبنى حجري بسيط ولكنه يحظى بتبجيل كبير، ويُعتقد تقليدياً أنه يضم ضريح النبي نوح المذكور في الكتب السماوية. يمثل المقام مكاناً هادئاً للتأمل ونقطة تبجيل ديني للسكان المحليين والحجاج على حد سواء.", 
                img: "assets/images/nuh.jpg", model: "assets/models/nuh.glb", audio: "assets/audio/nuh.mp3" 
            },
            // --- المعالم الجديدة المضافة ---
            { 
                id: "wadi_mujib", rank: 3, target_index: -1, hasAR: false, tags: ["natural"], 
                name_en: "Wadi Mujib", name_ar: "وادي الموجب", 
                desc_en: "The Grand Canyon of Jordan.", desc_ar: "أخفض محمية طبيعية و'جراند كانيون الأردن'.", 
                full_desc_en: "Often referred to as the 'Grand Canyon of Jordan', Wadi Mujib is an awe-inspiring deep gorge that enters the Dead Sea at 410 meters below sea level. It is famous among adventure seekers for its exhilarating canyoning trails, where visitors wade and swim through rushing river waters flanked by towering sandstone cliffs.", 
                full_desc_ar: "يُطلق على وادي الموجب غالباً لقب 'جراند كانيون الأردن'، وهو مضيق عميق يخطف الأنفاس يصب في البحر الميت. تكتسب المحمية شهرتها بين عشاق المغامرة بفضل مسارات المشي المائية المثيرة، حيث يسبح الزوار عبر مياه النهر المتدفقة بين منحدرات شاهقة من الحجر الرملي الملون.", 
                img: "assets/images/mujib.jpg", model: "", audio: "assets/audio/mujib.mp3" 
            },
            { 
                id: "lot_cave", rank: 4, target_index: -1, hasAR: false, tags: ["religious", "byzantine"], 
                name_en: "Cave of Prophet Lot", name_ar: "كهف النبي لوط", 
                desc_en: "The sacred cave where Prophet Lot sought refuge.", desc_ar: "الكهف المقدس الذي لجأ إليه النبي لوط.", 
                full_desc_en: "Located near Safi, high on a steep hillside overlooking the Dead Sea. According to religious traditions, this is where Lot and his daughters took refuge. Byzantine Christians built a magnificent church around the cave entrance featuring beautiful mosaic floors.", 
                full_desc_ar: "يقع 'كهف النبي لوط' على سفح تلة شديدة الانحدار تطل على البحر الميت. وفقاً للروايات، هذا هو الكهف الذي لجأ إليه النبي لوط بعد دمار سدوم وعمورة. بنى البيزنطيون كنيسة رائعة تحيط بمدخل الكهف تحتوي على أرضيات فسيفسائية جميلة.", 
                img: "assets/images/lotcave.jpg", model: "", audio: "assets/audio/lotcave.mp3" 
            },
            { 
                id: "wadi_bin_hammad", rank: 5, target_index: -1, hasAR: false, tags: ["natural"], 
                name_en: "Wadi Bin Hammad", name_ar: "وادي بن حماد", 
                desc_en: "A lush canyon renowned for warm hot springs.", desc_ar: "وادٍ مذهل يشتهر بمياهه الدافئة وحدائقه المعلقة.", 
                full_desc_en: "One of Jordan's best-kept secrets. Fed by warm, mineral-rich hot springs, the stream flows through a narrow sandstone canyon adorned with lush green ferns and hanging gardens.", 
                full_desc_ar: "أحد أجمل أسرار الأردن الدفينة في الكرك. تتغذى مياهه من ينابيع معدنية دافئة تتدفق عبر الوادي الرملي الضيق المزين بنباتات السرخس الخضراء والحدائق المعلقة، مما يقدم تجربة استوائية فريدة.", 
                img: "assets/images/binhammad.jpg", model: "", audio: "assets/audio/binhammad.mp3" 
            }
        ]
    },
    { 
        id: "salt", img: "assets/images/salt.jpg", name_en: "Al-Balqa", name_ar: "البلقاء", 
        landmarks: [
            // --- معالمك الأصلية ---
            { 
                id: "abu-jaber", rank: 1, target_index: 20, hasAR: true, tags: ["islamic"], 
                name_en: "Abu Jaber Museum", name_ar: "متحف أبو جابر", 
                desc_en: "Traditional heritage house.", desc_ar: "بيت تراثي يعكس العمارة السلطية.", 
                full_desc_en: "Housed in one of the finest late 19th-century traditional heritage mansions in Salt, the Abu Jaber Museum beautifully showcases the city’s golden age. The restored stone building, with its elegant frescoed ceilings and Italian tiles, offers a fascinating look into the lifestyle, trade, and culture of Salt's wealthy merchant families during the Ottoman era.", 
                full_desc_ar: "يقع متحف أبو جابر في واحد من أرقى القصور التراثية التقليدية التي تعود لأواخر القرن التاسع عشر في مدينة السلط، ويعرض بجمال العصر الذهبي للمدينة. يقدم المبنى الحجري المُرمم، بأسقفه الجدارية الأنيقة وبلاطه الإيطالي، نظرة رائعة على أسلوب الحياة والتجارة والثقافة لعائلات التجار الأثرياء في السلط خلال العصر العثماني.", 
                img: "assets/images/abu_jaber.jpg", model: "assets/models/abu_jaber.glb", audio: "assets/audio/abu_jaber.mp3" 
            },
            { 
                id: "hammam-st", rank: 2, target_index: 21, hasAR: true, tags: ["islamic"], 
                name_en: "Al-Hammam Street", name_ar: "شارع الحمام", 
                desc_en: "UNESCO heritage street.", desc_ar: "شارع تراثي عثماني الطراز.", 
                full_desc_en: "Al-Hammam Street is the vibrant, traditional heart of Salt and a recognized UNESCO World Heritage site. This narrow, bustling pedestrian market street is lined with distinct yellow-stone architecture, authentic local shops, and traditional spice stalls. Walking through Al-Hammam Street is like stepping into a living museum of harmony, tradition, and authentic Jordanian hospitality.", 
                full_desc_ar: "شارع الحمام هو القلب النابض والتقليدي لمدينة السلط وأحد المواقع المدرجة على قائمة التراث العالمي لليونسكو. يصطف هذا الشارع التجاري الضيق والمزدحم للمشاة بمبانٍ معمارية مميزة من الحجر الأصفر العسلي، ومتاجر محلية أصيلة، وبسطات التوابل التقليدية. يشبه المشي في شارع الحمام الدخول إلى متحف حي للوئام والتقاليد وحسن الضيافة الأردنية الأصيلة.", 
                img: "assets/images/hammam.jpg", model: "assets/models/hammam.glb", audio: "assets/audio/hammam.mp3" 
            },
            // --- المعالم الجديدة المضافة ---
            { 
                id: "dead_sea", rank: 3, target_index: -1, hasAR: false, tags: ["natural", "religious"], 
                name_en: "The Dead Sea", name_ar: "البحر الميت", 
                desc_en: "The lowest point on Earth, famous for its hyper-saline water.", desc_ar: "أخفض بقعة على وجه الأرض ومياه علاجية شديدة الملوحة.", 
                full_desc_en: "Sitting at more than 430 meters below sea level, the Dead Sea is the lowest point on Earth. Its incredibly high salt concentration makes natural buoyancy possible, allowing visitors to float effortlessly. The mineral-rich mud has been renowned since the days of Cleopatra.", 
                full_desc_ar: "يقع البحر الميت على عمق يزيد عن 430 متراً تحت مستوى سطح البحر. تبلغ نسبة ملوحته عشرة أضعاف المحيطات، مما يمنع الكائنات من العيش فيه ويسمح للزوار بالطفو بسهولة. اشتهرت مياهه وطينه بخصائصها العلاجية والتجميلية منذ أيام كليوباترا.", 
                img: "assets/images/deadsea.jpg", model: "", audio: "assets/audio/deadsea.mp3" 
            },
            { 
                id: "baptism_site", rank: 4, target_index: -1, hasAR: false, tags: ["religious", "roman", "byzantine"], 
                name_en: "Bethany Beyond the Jordan", name_ar: "المغطس (بيت عنيا)", 
                desc_en: "The officially recognized site of the baptism of Jesus.", desc_ar: "الموقع الديني المعترف به عالمياً لتعميد السيد المسيح.", 
                full_desc_en: "Al-Maghtas is a World Heritage site on the east bank of the Jordan River. It is universally recognized as the location where Jesus was baptized by John the Baptist. The site contains Roman and Byzantine remains, including early churches and baptismal pools.", 
                full_desc_ar: "المغطس موقع ديني تراثي يقع على الضفة الشرقية لنهر الأردن. يُعترف به عالمياً بأنه الموقع الأصلي الذي تعمد فيه السيد المسيح على يد يوحنا المعمدان. يضم الموقع آثاراً رومانية وبيزنطية هامة تشمل كنائس وبرك تعميد تاريخية.", 
                img: "assets/images/baptism.jpg", model: "", audio: "assets/audio/baptism.mp3" 
            }
        ]
    },
    { 
        id: "irbid", img: "assets/images/irbid.jpg", name_en: "Irbid", name_ar: "إربد", 
        landmarks: [
            // --- معالمك الأصلية ---
            { 
                id: "umm-qais", rank: 1, target_index: 22, hasAR: true, tags: ["roman", "byzantine"], 
                name_en: "Umm Qais", name_ar: "أم قيس", 
                desc_en: "Greco-Roman basalt ruins.", desc_ar: "مدينة الرومان البازلتية.", 
                full_desc_en: "Known in antiquity as Gadara, Umm Qais is an incredible Greco-Roman city characterized by its striking black basalt ruins. Perched on a hilltop in northern Jordan, it offers some of the most spectacular panoramic views in the country, overlooking the Sea of Galilee, the Golan Heights, and the Yarmouk River gorge. The site boasts a well-preserved theater, ancient colonnaded streets, and a fascinating Ottoman village built directly over the Roman ruins.", 
                full_desc_ar: "تُعرف أم قيس في العصور القديمة باسم جدارا، وهي مدينة يونانية-رومانية مذهلة تتميز بأطلالها البازلتية السوداء اللافتة للنظر. تقع على قمة تل في شمال الأردن، وتوفر بعضاً من أروع الإطلالات البانورامية في البلاد، حيث تطل على بحيرة طبريا وهضبة الجولان ووادي نهر اليرموك. يضم الموقع مدرجاً محفوظاً بعناية، وشوارع قديمة ذات أعمدة، وقرية عثمانية ساحرة بُنيت مباشرة فوق الأنقاض الرومانية.", 
                img: "assets/images/umm_qais.jpg", model: "assets/models/umm_qais.glb", audio: "assets/audio/umm_qais.mp3" 
            },
            { 
                id: "pella", rank: 2, target_index: 23, hasAR: true, tags: ["roman", "byzantine"], 
                name_en: "Pella", name_ar: "طبقة فحل", 
                desc_en: "Ancient Decapolis city.", desc_ar: "من أقدم المواقع المأهولة في الأردن.", 
                full_desc_en: "Pella (Tabaqat Fahl) is an exceptionally rich and ancient Decapolis city nestled in the foothills of the Jordan Valley. With a history of continuous settlement spanning over 6,000 years, the site offers a fascinating layering of ruins from the Chalcolithic, Bronze, Iron, Roman, Byzantine, and Islamic periods. The remains of its grand temples, churches, and thermal baths are surrounded by lush spring landscapes, making it a captivating historical oasis.", 
                full_desc_ar: "تعتبر بيلا طبقة فحل مدينة غنية استثنائياً وعريقة من مدن الديكابولس، وتقع في سفوح وادي الأردن. يمتد تاريخ الاستيطان المستمر فيها لأكثر من 6000 عام، ويقدم الموقع طبقات مذهلة من الآثار التي تعود للعصور النحاسية والبرونزية والحديدية والرومانية والإسلامية. تحيط المناظر الطبيعية الخضراء في فصل الربيع ببقايا معابدها وكنائسها وحماماتها الحرارية الكبيرة، مما يجعلها واحة تاريخية آسرة.", 
                img: "assets/images/pella.jpg", model: "assets/models/pella.glb", audio: "assets/audio/pella.mp3" 
            },
            // --- المعالم الجديدة المضافة ---
            { 
                id: "dar_al_saraya_irbid", rank: 3, target_index: 37, hasAR: true, tags: ["islamic"], 
                name_en: "Dar Al-Saraya", name_ar: "دار السرايا", 
                desc_en: "A striking late 19th-century Ottoman castle serving as a museum.", desc_ar: "قلعة عثمانية بارزة من أواخر القرن التاسع عشر أصبحت متحفاً.", 
                full_desc_en: "Dar Al-Saraya was built in 1886 by the Ottomans to serve as the administrative center and fortress for Irbid. Featuring classic Ottoman architectural elements with dark basalt and white limestone blocks, it now functions as a meticulously restored museum.", 
                full_desc_ar: "بُنيت 'دار السرايا' عام 1886م على يد العثمانيين لتكون المركز الإداري لمدينة إربد. يتميز المبنى بعناصره المعمارية العثمانية الممزوجة بحجر البازلت الأسود والحجر الجيري الأبيض. تم تحويله إلى متحف يضم قطعاً أثرية تروي التاريخ الغني للمنطقة.", 
                img: "assets/images/saraya.jpg", model: "assets/models/saraya.glb", audio: "assets/audio/saraya.mp3" 
            }
        ]
    },
    { 
        id: "aqaba", img: "assets/images/aqaba.jpg", name_en: "Aqaba", name_ar: "العقبة", 
        landmarks: [
            // --- معالمك الأصلية ---
            { 
                id: "aqaba-fort", rank: 1, target_index: 24, hasAR: true, tags: ["islamic"], 
                name_en: "Aqaba Fort", name_ar: "قلعة العقبة", 
                desc_en: "Historic coastal fort.", desc_ar: "قلعة ساحلية عريقة.", 
                full_desc_en: "Situated on the sunny shores of the Red Sea, the Aqaba Fort (Mamluk Castle) is a historic coastal stronghold originally built by the Crusaders and later rebuilt by the Mamluks. It played a pivotal role in the Great Arab Revolt of 1916 when forces led by Auda abu Tayi and T.E. Lawrence captured it from the Ottomans. Today, its sturdy stone walls and classic courtyard stand as a proud monument to Jordan's modern history.", 
                full_desc_ar: "تقع قلعة العقبة قلعة المماليك على شواطئ البحر الأحمر المشمسة، وهي معقل ساحلي تاريخي بناه الصليبيون في الأصل وأعاد المماليك بناءه لاحقاً. لعبت القلعة دوراً محورياً في الثورة العربية الكبرى عام 1916 عندما استولت عليها القوات بقيادة عودة أبو تايه ولورنس العرب من العثمانيين. تقف جدرانها الحجرية المتينة وفنائها الكلاسيكي اليوم كنصب تذكاري فخور يروي جزءاً من تاريخ الأردن الحديث.", 
                img: "assets/images/aqaba_fort.jpg", model: "assets/models/aqaba_fort.glb", audio: "assets/audio/aqaba_fort.mp3" 
            },
            { 
                id: "ayla", rank: 2, target_index: 25, hasAR: true, tags: ["islamic"], 
                name_en: "Ayla Ruins", name_ar: "أطلال أيلة", 
                desc_en: "Early Islamic city.", desc_ar: "أول مدينة إسلامية بنيت خارج الجزيرة.", 
                full_desc_en: "Located right in the modern city center of Aqaba, the Ayla Ruins are the foundational remains of the first Islamic city built outside the Arabian Peninsula. Established in the 7th century AD, visitors can walk through the excavated remnants of city walls, ancient gates, and a congregational mosque. It provides a unique window into early Islamic urban planning and Aqaba’s historical importance as a thriving ancient port.", 
                full_desc_ar: "تقع أطلال أيلة في وسط مدينة العقبة الحديثة، وهي البقايا التأسيسية لأول مدينة إسلامية بُنيت خارج شبه الجزيرة العربية. تأسست المدينة في القرن السابع الميلادي، ويمكن للزوار التجول بين البقايا المكتشفة لأسوار المدينة والبوابات القديمة والمسجد الجامع. توفر الأطلال نافذة فريدة على التخطيط الحضري الإسلامي المبكر والأهمية التاريخية للعقبة كميناء قديم مزدهر.", 
                img: "assets/images/ayla.jpg", model: "assets/models/ayla.glb", audio: "assets/audio/ayla.mp3" 
            },
            // --- المعالم الجديدة المضافة ---
            { 
                id: "wadi_rum", rank: 3, target_index: -1, hasAR: false, tags: ["natural", "nabataean"], 
                name_en: "Wadi Rum", name_ar: "وادي رَم", 
                desc_en: "The majestic Valley of the Moon with towering sandstone mountains.", desc_ar: "وادي القمر المهيب ذو الجبال الرملية الشاهقة.", 
                full_desc_en: "Wadi Rum, known as the 'Valley of the Moon', is a dramatically beautiful desert wilderness in southern Jordan and a UNESCO World Heritage site. Beyond its natural beauty, it is an open-air museum where nomadic tribes and Nabataean traders carved over 25,000 petroglyphs.", 
                full_desc_ar: "وادي رم هو محمية صحراوية ذات جمال درامي استثنائي في جنوب الأردن ومدرج ضمن التراث العالمي لليونسكو. يُعرف بـ 'وادي القمر'. إلى جانب روعته الطبيعية، حفرت القبائل البدوية والأنباط آلاف النقوش الصخرية فيه، ويُعد اليوم وجهة عالمية لتصوير الأفلام.", 
                img: "assets/images/wadirum.jpg", model: "", audio: "assets/audio/wadirum.mp3" 
            }
        ]
    },
    { 
        id: "mafraq", img: "assets/images/mafraq.jpg", name_en: "Mafraq", name_ar: "المفرق", 
        landmarks: [
            // --- معالمك الأصلية ---
            { 
                id: "umm-jimal", rank: 1, target_index: 26, hasAR: true, tags: ["roman", "nabataean", "byzantine"], 
                name_en: "Umm al-Jimal", name_ar: "أم الجمال", 
                desc_en: "Black basalt city.", desc_ar: "المدينة السوداء الأثرية.", 
                full_desc_en: "Dubbed the \"Black Oasis\" of the desert, Umm al-Jimal is an extraordinary ancient town built entirely from dark, volcanic basalt rock. Flourishing during the Byzantine and early Islamic periods, it is renowned for its remarkable dry-stone architecture, multi-story houses, and ancient water reservoirs. Exploring its atmospheric, pitch-black ruins offers a mesmerizing journey into how ancient societies thrived in the harsh eastern desert.", 
                full_desc_ar: "تُلقب أم الجمال بـ الواحة السوداء في الصحراء، وهي بلدة قديمة استثنائية بُنيت بالكامل من صخور البازلت البركانية الداكنة. ازدهرت البلدة خلال الفترتين البيزنطية والإسلامية المبكرة، وتشتهر بعمارتها الرائعة من الحجر الجاف، ومنازلها المكونة من عدة طوابق، وخزانات المياه القديمة. يقدم استكشاف أطلالها السوداء الساحرة رحلة مذهلة للتعرف على كيفية ازدهار المجتمعات القديمة في البادية الشرقية القاسية.", 
                img: "assets/images/umm_jimal.jpg", model: "assets/models/umm_jimal.glb", audio: "assets/audio/umm_jimal.mp3" 
            },
            { 
                id: "jawa", rank: 2, target_index: 27, hasAR: true, tags: ["roman"], 
                name_en: "Jawa", name_ar: "جاوا", 
                desc_en: "Oldest dam in the world.", desc_ar: "أقدم سد مائي في العالم.", 
                full_desc_en: "Hidden deep in the eastern desert of Jordan, Jawa is a remarkably preserved Bronze Age settlement that boasts the oldest known dam in the world, dating back to 3000 BC. Built entirely of raw basalt boulders, this ancient fortress town represents an incredible feat of early human engineering and water management. It is a rugged and remote destination that appeals to true adventurers and history enthusiasts.", 
                full_desc_ar: "تقع منطقة جاوا في عمق البادية الشرقية للأردن، وهي مستوطنة من العصر البرونزي محفوظة بشكل ملحوظ وتضم أقدم سد معروف في العالم، والذي يعود تاريخه إلى عام 3000 قبل الميلاد. بُنيت هذه البلدة المحصنة القديمة بالكامل من صخور البازلت الخام، وتمثل إنجازاً مذهلاً للهندسة البشرية المبكرة وإدارة المياه. إنها وجهة وعرة ونائية تجذب المغامرين الحقيقيين وعشاق التاريخ.", 
                img: "assets/images/jawa.jpg", model: "assets/models/jawa.glb", audio: "assets/audio/jawa.mp3" 
            }
        ]
    },
    { 
        id: "tafilah", img: "assets/images/tafilah.jpg", name_en: "Tafilah", name_ar: "الطفيلة", 
        landmarks: [
            // --- معالمك الأصلية ---
            { 
                id: "dana", rank: 1, target_index: 28, hasAR: true, tags: ["natural", "nabataean"], 
                name_en: "Dana Reserve", name_ar: "محمية ضانا", 
                desc_en: "Ancient stone village.", desc_ar: "قرية حجرية أثرية.", 
                full_desc_en: "Encompassing a stunning array of landscapes from soaring sandstone cliffs to deeply carved wadis, the Dana Biosphere Reserve is Jordan’s largest nature reserve. At its heart lies the ancient stone village of Dana, a beautifully restored 15th-century settlement clinging to the edge of a spectacular gorge. It is a haven for eco-tourism, hiking, and discovering Jordan’s incredibly diverse wildlife and breathtaking natural beauty.", 
                full_desc_ar: "تضم محمية ضانا للمحيط الحيوي مجموعة مذهلة من المناظر الطبيعية بدءاً من المنحدرات الرملية الشاهقة وحتى الوديان العميقة، وهي أكبر محمية طبيعية في الأردن. يقع في قلبها قرية ضانا الحجرية القديمة، وهي مستوطنة تعود للقرن الخامس عشر تم ترميمها بجمال وتتشبث بحافة وادي خلاب. تُعد المحمية ملاذاً للسياحة البيئية والمشي لمسافات طويلة واكتشاف الحياة البرية المتنوعة والجمال الطبيعي الأخاذ في الأردن.", 
                img: "assets/images/dana.jpg", model: "assets/models/dana.glb", audio: "assets/audio/dana.mp3" 
            },
            { 
                id: "dharih", rank: 2, target_index: 29, hasAR: true, tags: ["nabataean"], 
                name_en: "Khirbet Dharih", name_ar: "خربة الذريح", 
                desc_en: "Nabataean temple.", desc_ar: "معبد نبطي متكامل.", 
                full_desc_en: "Khirbet Dharih is a beautifully situated ancient Nabataean settlement and temple complex nestled along the King's Highway in southern Jordan. Less crowded than Petra, it allows visitors to intimately explore its remarkably carved temple ruins, which feature elaborate agricultural and religious iconography. The site provides a peaceful, in-depth look into the spiritual lives and architectural prowess of the Nabataeans outside their capital.", 
                full_desc_ar: "خربة الذريح هي مستوطنة ومجمع معابد نبطي قديم يتمتع بموقع جميل على طول طريق الملوك في جنوب الأردن. لكونها أقل ازدحاماً من البتراء، تتيح للزوار استكشاف أطلال معبدها المنحوتة بشكل ملحوظ عن قرب، والتي تتميز بأيقونات زراعية ودينية متقنة. يوفر الموقع نظرة متعمقة وهادئة على الحياة الروحية والبراعة المعمارية للأنباط خارج عاصمتهم.", 
                img: "assets/images/dharih.jpg", model: "assets/models/dharih.glb", audio: "assets/audio/dharih.mp3" 
            }
        ]
    },
    { 
        id: "zarqa", img: "assets/images/zarqa.jpg", name_en: "Zarqa", name_ar: "الزرقاء", 
        landmarks: [
            // --- معالمك الأصلية ---
            { 
                id: "qasr-amra", rank: 1, target_index: 30, hasAR: true, tags: ["umayyad", "islamic"], 
                name_en: "Qasr Amra", name_ar: "قصر عمرة", 
                desc_en: "Umayyad desert castle and UNESCO site.", desc_ar: "قصر أموي صحراوي وموقع يونسكو عالمي.", 
                full_desc_en: "Qasr Amra is one of the most famous desert castles in eastern Jordan and a designated UNESCO World Heritage site. Built in the early 8th century by the Umayyad caliphs, this exceptionally well-preserved hunting lodge and bathhouse is renowned for its spectacular interior frescoes. The vibrant murals depict hunting scenes, zodiac signs, and historical figures, offering a rare and fascinating glimpse into early Islamic secular art and lifestyle.", 
                full_desc_ar: "يُعد قصر عمرة واحداً من أشهر القصور الصحراوية في شرق الأردن وهو موقع مدرج ضمن قائمة التراث العالمي لليونسكو. بُني هذا النزل الاستجمامي وحمام الصيد المحفوظ بعناية فائقة في أوائل القرن الثامن الميلادي على يد الخلفاء الأمويين، ويشتهر بجدارياته الداخلية المذهلة. تصور هذه اللوحات الجدارية النابضة بالحياة مشاهد صيد، وعلامات فلكية، وشخصيات تاريخية، مما يقدم لمحة نادرة ورائعة عن الفن العلماني وأسلوب الحياة في العصر الإسلامي المبكر.", 
                img: "assets/images/qasr_amra.jpg", model: "assets/models/qasr_amra.glb", audio: "assets/audio/qasr_amra.mp3" 
            },
            { 
                id: "hallabat", rank: 2, target_index: 31, hasAR: true, tags: ["umayyad", "roman"], 
                name_en: "Qasr Hallabat", name_ar: "قصر الحلابات", 
                desc_en: "Roman fortress transformed into Umayyad palace.", desc_ar: "قلعة رومانية تحولت إلى قصر أموي فخم.", 
                full_desc_en: "Originally constructed as a Roman fortress to protect the region from desert tribes, Qasr Hallabat was later transformed into an opulent palatial complex by the Umayyads in the 8th century. Located in Jordan's eastern desert, the site features a fascinating mix of architectural styles, complete with ornate mosaics, carved stucco, and agricultural enclosures. Exploring its sprawling ruins reveals the dynamic history of military defense transitioning into luxurious desert living.", 
                full_desc_ar: "بُني قصر الحلابات في الأصل كقلعة رومانية لحماية المنطقة من القبائل الصحراوية، وتم تحويله لاحقاً إلى مجمع قصور فخم على يد الأمويين في القرن الثامن الميلادي. يقع الموقع في البادية الشرقية للأردن، ويتميز بمزيج رائع من الأساليب المعمارية، حيث يضم فسيفساء مزخرفة، ونقوشاً جصية، ومرافق زراعية. يكشف استكشاف أطلاله المترامية الأطراف عن التاريخ الديناميكي المتمثل في تحول الدفاع العسكري إلى حياة صحراوية فاخرة.", 
                img: "assets/images/hallabat.jpg", model: "assets/models/hallabat.glb", audio: "assets/audio/hallabat.mp3" 
            },
            { 
                id: "shabib", rank: 3, target_index: 32, hasAR: true, tags: ["islamic"], 
                name_en: "Qasr Shabib", name_ar: "قصر شبيب", 
                desc_en: "Historic fortress in central Zarqa.", desc_ar: "قلعة تاريخية بارزة وسط الزرقاء.", 
                full_desc_en: "Situated in the heart of the modern city of Zarqa, Qasr Shabib is a historic square fortress that has stood the test of time through various eras. Believed to have Roman origins with significant Islamic rebuilding, particularly during the Ayyubid and Mamluk periods, it served as a vital garrison and resting stop for pilgrims traveling to Mecca. Today, it stands as a prominent historical and cultural symbol within the bustling urban landscape of Zarqa.", 
                full_desc_ar: "يقع قصر شبيب في قلب مدينة الزرقاء الحديثة، وهو قلعة تاريخية مربعة الشكل صمدت أمام اختبار الزمن عبر عصور مختلفة. يُعتقد أن أصوله تعود للعصر الروماني مع إعادة بناء إسلامية كبيرة، خاصة خلال الفترتين الأيوبية والمملوكية، وقد كان بمثابة حامية عسكرية حيوية ومحطة استراحة للحجاج المسافرين إلى مكة. واليوم، يقف القصر كرمز تاريخي وثقافي بارز وسط المشهد الحضري المزدحم لمدينة الزرقاء.", 
                img: "assets/images/shabib.jpg", model: "assets/models/shabib.glb", audio: "assets/audio/shabib.mp3" 
            },
            // --- المعالم الجديدة المضافة ---
            { 
                id: "azraq_castle", rank: 4, target_index: 38, hasAR: true, tags: ["islamic", "roman"], 
                name_en: "Qasr Al-Azraq", name_ar: "قلعة الأزرق", 
                desc_en: "Stark black basalt desert fort.", desc_ar: "حصن صحراوي أسود مهيب.", 
                full_desc_en: "A stark black basalt desert fort famously used by T.E. Lawrence during the Arab Revolt in 1917.", 
                full_desc_ar: "حصن صحراوي أسود مهيب، اشتهر بكونه مقر قيادة لورانس العرب خلال الثورة العربية الكبرى عام 1917.", 
                img: "assets/images/azraq.jpg", model: "assets/models/azraq.glb", audio: "assets/audio/azraq.mp3" 
            },
            { 
                id: "shawmari_reserve", rank: 5, target_index: -1, hasAR: false, tags: ["natural"], 
                name_en: "Shawmari Wildlife Reserve", name_ar: "محمية الشومري للأحياء البرية", 
                desc_en: "Breeding center established to save the endangered Arabian Oryx.", desc_ar: "مركز إكثار لإنقاذ المها العربي المهدد بالانقراض.", 
                full_desc_en: "Created in 1975 by the Royal Society for the Conservation of Nature to reintroduce locally extinct wildlife. It is most famous for saving the Arabian Oryx from the brink of extinction.", 
                full_desc_ar: "تأسست عام 1975 كمركز إكثار لإعادة توطين الأحياء البرية. اشتهرت المحمية عالمياً بإنقاذ المها العربي من الانقراض وتوفير ملاذ آمن له في بيئته الصحراوية.", 
                img: "assets/images/shawmari.jpg", model: "", audio: "assets/audio/shawmari.mp3" 
            }
        ]
    }
];