export type MadhhabId = 'maliki' | 'hanafi' | 'shafii' | 'hanbali' | 'consensus';

export type EnergyMode = 'spark_30s' | 'light_2m' | 'depth_5m';

export type EpistemicStatus = 'SAKINA' | 'IJMA' | 'JUMHUR' | 'IKHTILAF' | 'REDLINE_SAVANT';

export interface MadhhabOption {
  id: MadhhabId;
  label: string;
  shortLabel: string;
  regionHint: string;
  description: string;
}

export const MADHHAB_OPTIONS: MadhhabOption[] = [
  {
    id: 'maliki',
    label: 'École Malékite',
    shortLabel: 'Malékite',
    regionHint: 'Maghreb, Afrique de l’Ouest, France / Europe',
    description: 'Fondée par l’Imam Mâlik ibn Anas à Médine (VIIIe s.), reconnue pour son ancrage vivant et son attention à l’intérêt général (Maslahah).',
  },
  {
    id: 'hanafi',
    label: 'École Hanafite',
    shortLabel: 'Hanafite',
    regionHint: 'Turquie, Balkans, Asie centrale & du Sud',
    description: 'Fondée par l’Imam Abû Hanîfah (VIIIe s.), la plus ancienne et la plus suivie numériquement dans le monde musulman.',
  },
  {
    id: 'shafii',
    label: 'École Chaféite',
    shortLabel: 'Chaféite',
    regionHint: 'Comores, Océan Indien, Égypte, Levant, Asie du Sud-Est',
    description: 'Fondée par l’Imam Ash-Shâfi‘î, célèbre pour avoir codifié avec rigueur la méthodologie des sources (Usûl al-Fiqh).',
  },
  {
    id: 'hanbali',
    label: 'École Hanbalite',
    shortLabel: 'Hanbalite',
    regionHint: 'Péninsule arabique & Levant',
    description: 'Fondée par l’Imam Ahmad ibn Hanbal, attachée de près aux textes transmis et large dans la liberté contractuelle.',
  },
  {
    id: 'consensus',
    label: 'Avis majoritaire (Sans école précise)',
    shortLabel: 'Majorité (Jumhûr)',
    regionHint: 'Approche transversale apaisée',
    description: 'Présente en priorité le consensus (Ijmâ‘) ou la position de la majorité des savants reconnus, expliquée sans jargon.',
  },
];

export interface CanonicalSource {
  id: string;
  type: 'Coran' | 'Hadith' | 'Fiqh & Maximes' | 'Tafsîr';
  title: string;
  reference: string;
  arabicText: string;
  phonetic: string;
  frenchTranslation: string;
  gradeBadge: string;
  gradeTone: 'emerald' | 'blue' | 'amber';
  scholarInfo: string;
  methodologyNote: string;
  dhikrTargetCount?: number;
  keywords: string[];
}

export const CANONICAL_SOURCES: Record<string, CanonicalSource> = {
  quran_94_5_6: {
    id: 'quran_94_5_6',
    type: 'Coran',
    title: 'Sourate Ash-Sharh (L’Ouverture)',
    reference: 'Coran 94 : 5–6 • Mushaf de Médine (Rasm ‘Uthmânî)',
    arabicText: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    phonetic: 'Fa-inna ma‘a al-‘usri yusrâ • Inna ma‘a al-‘usri yusrâ',
    frenchTranslation: '« Certes, avec la difficulté il y a une facilité. Certes, avec la difficulté il y a une facilité. »',
    gradeBadge: 'Texte Coranique Certifié (Qat‘î ath-Thubût)',
    gradeTone: 'emerald',
    scholarInfo: 'Exégèse de référence : Al-Mukhtasar fî at-Tafsîr (Comité de 40 savants) & Taysîr al-Karîm ar-Rahmân de l’Imam As-Sa‘dî.',
    methodologyNote: 'Injection déterministe depuis la base Tanzil/Complexe du Roi Fahd : le modèle IA n’a généré aucune lettre arabe.',
    dhikrTargetCount: 3,
    keywords: ['difficulte', 'epreuve', 'facilite', 'patience', 'espoir', 'stress', 'crise'],
  },
  quran_13_28: {
    id: 'quran_13_28',
    type: 'Coran',
    title: 'Sourate Ar-Ra‘d (Le Tonnerre)',
    reference: 'Coran 13 : 28 • Mushaf de Médine',
    arabicText: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    phonetic: 'Alâ bi-dhikri Allâhi tatma’innu al-qulûb',
    frenchTranslation: '« N’est-ce point par l’évocation d’Allah que s’apaisent les cœurs ? »',
    gradeBadge: 'Texte Coranique Certifié (Qat‘î ath-Thubût)',
    gradeTone: 'emerald',
    scholarInfo: 'Commenté par l’Imam Ibn ‘Âshûr dans At-Tahrîr wa at-Tanwîr : la Sakînah naît du lien confiant avec Dieu, non de l’absence d’épreuves.',
    methodologyNote: 'Texte Uthmânî scellé en lecture seule.',
    dhikrTargetCount: 3,
    keywords: ['anxiete', 'angoisse', 'coeur', 'paix', 'apaisement', 'dhikr', 'sakinah', 'stress'],
  },
  quran_65_2_3: {
    id: 'quran_65_2_3',
    type: 'Coran',
    title: 'Sourate At-Talâq',
    reference: 'Coran 65 : 2–3 • Mushaf de Médine',
    arabicText: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا ۝ وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ۚ وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
    phonetic: 'Wa man yattaqi Allâha yaj‘al lahu makhrajan, wa yarzuqhu min haythu lâ yahtasib, wa man yatawakkal ‘alâ Allâhi fa-huwa hasbuh',
    frenchTranslation: '« Et quiconque craint pieusement Allah, Il lui donnera une issue favorable, et lui accordera Ses dons par des moyens sur lesquels il ne comptait pas. Et quiconque place sa confiance en Allah, Il lui suffit. »',
    gradeBadge: 'Texte Coranique Certifié (Qat‘î ath-Thubût)',
    gradeTone: 'emerald',
    scholarInfo: 'Exégèse : Al-Misbâh al-Munîr (Ibn Kathîr authentifié) & Tafsîr As-Sa‘dî — le Tawakkul accompagne l’action concrète sans angoisse du résultat.',
    methodologyNote: 'Texte Uthmânî scellé en lecture seule.',
    keywords: ['travail', 'argent', 'rizq', 'subsistance', 'confiance', 'tawakkul', 'issue', 'blocage', 'famille'],
  },
  quran_2_286: {
    id: 'quran_2_286',
    type: 'Coran',
    title: 'Sourate Al-Baqarah (La Vache)',
    reference: 'Coran 2 : 286 • Mushaf de Médine',
    arabicText: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
    phonetic: 'Lâ yukallifu Allâhu nafsan illâ wus‘ahâ',
    frenchTranslation: '« Allah n’impose à aucune âme une charge supérieure à sa capacité. »',
    gradeBadge: 'Texte Coranique Certifié (Qat‘î ath-Thubût)',
    gradeTone: 'emerald',
    scholarInfo: 'Fondement coranique majeur du principe de facilitation (Taysîr) et de levée de la gêne excessive (Raf‘ al-Haraj) dans les 4 écoles.',
    methodologyNote: 'Texte Uthmânî scellé en lecture seule.',
    keywords: ['capacite', 'fatigue', 'burnout', 'epuisement', 'maladie', 'facilite'],
  },
  quran_39_53: {
    id: 'quran_39_53',
    type: 'Coran',
    title: 'Sourate Az-Zumar (Les Groupes)',
    reference: 'Coran 39 : 53 • Mushaf de Médine',
    arabicText: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا',
    phonetic: 'Qul yâ ‘ibâdiya alladhîna asrafû ‘alâ anfusihim lâ taqnatû min rahmati Allâh, inna Allâha yaghfiru adh-dhunûba jamî‘â',
    frenchTranslation: '« Dis : "Ô Mes serviteurs qui avez commis des excès à votre propre détriment, ne désespérez pas de la miséricorde d’Allah ! Car Allah pardonne tous les péchés." »',
    gradeBadge: 'Texte Coranique Certifié (Qat‘î ath-Thubût)',
    gradeTone: 'emerald',
    scholarInfo: 'Qualifié par Ibn ‘Abbâs et les commentateurs de « verset le plus porteur d’espérance de tout le Coran » : Allah appelle « Mes serviteurs » même ceux qui se sont éloignés.',
    methodologyNote: 'Texte Uthmânî scellé en lecture seule.',
    dhikrTargetCount: 3,
    keywords: ['peche', 'culpabilite', 'pardon', 'repentir', 'tawbah', 'honte', 'desespoir', 'foi'],
  },
  quran_3_173: {
    id: 'quran_3_173',
    type: 'Coran',
    title: 'Sourate Âl ‘Imrân (La Famille d’Imran)',
    reference: 'Coran 3 : 173 & Sahîh al-Bukhârî n° 4563',
    arabicText: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    phonetic: 'Hasbunâ Allâhu wa ni‘ma al-Wakîl',
    frenchTranslation: '« Allah nous suffit ; Il est notre meilleur Garant. »',
    gradeBadge: 'Texte Coranique & Sunnah (Bukhârî 4563)',
    gradeTone: 'emerald',
    scholarInfo: 'Ibn ‘Abbâs rapporte que cette parole fut prononcée par Ibrâhîm face au feu et par le Prophète ﷺ lorsque les gens cherchaient à l’effrayer.',
    methodologyNote: 'Texte Uthmânî scellé en lecture seule.',
    dhikrTargetCount: 7,
    keywords: ['peur', 'insomnie', 'nuit', 'injustice', 'protection', 'garant', 'wakil'],
  },
  bukhari_6464: {
    id: 'bukhari_6464',
    type: 'Hadith',
    title: 'La constance des petites œuvres',
    reference: 'Sahîh al-Bukhârî n° 6464 & Sahîh Muslim n° 782 (d’après ‘Â’ishah)',
    arabicText: 'أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ',
    phonetic: 'Ahabbu al-a‘mâli ilâ Allâhi adwamuhâ wa in qalla',
    frenchTranslation: '« Les œuvres les plus aimées d’Allah sont les plus régulières, même si elles sont peu nombreuses. »',
    gradeBadge: 'Muttafaq ‘Alayh — Plus haut degré d’authenticité',
    gradeTone: 'emerald',
    scholarInfo: 'Commentaire de l’Imam An-Nawawî (Sharh Sahîh Muslim) : peu d’œuvres accomplies avec constance nourrissent le cœur bien mieux qu’un excès ponctuel suivi d’abandon.',
    methodologyNote: 'Chaîne authentifiée à l’unanimité par Al-Bukhârî et Muslim.',
    keywords: ['flemme', 'constance', 'habitude', 'petit', 'regulier', 'motivation', 'futur'],
  },
  bukhari_6369: {
    id: 'bukhari_6369',
    type: 'Hadith',
    title: 'Invocation prophétique contre l’anxiété et la flemme',
    reference: 'Sahîh al-Bukhârî n° 6369 (d’après Anas ibn Mâlik)',
    arabicText: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ',
    phonetic: 'Allâhumma innî a‘ûdhu bika min al-hammi wa al-hazan, wa al-‘ajzi wa al-kasal',
    frenchTranslation: '« Ô Allah, je cherche refuge auprès de Toi contre le souci (l’anxiété face au futur) et la tristesse (face au passé), contre l’incapacité et la paresse (la flemme). »',
    gradeBadge: 'Sahîh — Authentique (Al-Bukhârî)',
    gradeTone: 'emerald',
    scholarInfo: 'Ibn al-Qayyim (Zâd al-Ma‘âd) souligne la finesse psychologique prophétique : al-hamm ronge l’avenir, al-hazan pèse sur le passé, et al-kasal paralyse l’élan présent.',
    methodologyNote: 'Extrait vérifié de Sahîh al-Bukhârî & Hisn al-Muslim.',
    dhikrTargetCount: 3,
    keywords: ['anxiete', 'tristesse', 'flemme', 'paresse', 'deprime', 'souci', 'dua', 'invocation'],
  },
  bukhari_69: {
    id: 'bukhari_69',
    type: 'Hadith',
    title: 'L’éthique de la facilitation et de la douceur',
    reference: 'Sahîh al-Bukhârî n° 69 & Sahîh Muslim n° 1734 (d’après Anas ibn Mâlik)',
    arabicText: 'يَسِّرُوا وَلَا تُعَسِّرُوا، وَبَشِّرُوا وَلَا تُنَفِّرُوا',
    phonetic: 'Yassirû wa lâ tu‘assirû, wa bashshirû wa lâ tunaffirû',
    frenchTranslation: '« Facilitez et ne rendez pas les choses difficiles ; annoncez la bonne nouvelle et ne faites pas fuir. »',
    gradeBadge: 'Muttafaq ‘Alayh — Unanimement authentifié',
    gradeTone: 'emerald',
    scholarInfo: 'Ibn Hajar al-‘Asqalânî (Fath al-Bârî) : règle d’or pour tout enseignant ou accompagnateur spirituel, surtout envers celui qui débute ou traverse une fatigue.',
    methodologyNote: 'Charte fondatrice du moteur pédagogique de Nur.',
    keywords: ['facilite', 'douceur', 'debutant', 'bienveillance', 'famille', 'education'],
  },
  bukhari_6115: {
    id: 'bukhari_6115',
    type: 'Hadith',
    title: 'Apaiser immédiatement la colère qui monte',
    reference: 'Sahîh al-Bukhârî n° 6115, Sahîh Muslim n° 2610 & Abû Dâwûd n° 4782',
    arabicText: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
    phonetic: 'A‘ûdhu billâhi min ash-shaytân ir-rajîm',
    frenchTranslation: '« Je cherche refuge auprès d’Allah contre Satan le banni. »',
    gradeBadge: 'Muttafaq ‘Alayh — Unanimement authentifié',
    gradeTone: 'emerald',
    scholarInfo: 'Le Prophète ﷺ enseigna cette parole pour éteindre le feu de la colère, complétée par le geste corporel authentifié (Abû Dâwûd 4782) : s’asseoir si l’on est debout, et garder le silence (Ahmad 2136).',
    methodologyNote: 'Couplage parole + posture physiologique prophétique.',
    dhikrTargetCount: 3,
    keywords: ['colere', 'dispute', 'enervement', 'conflit', 'couple', 'nerfs', 'calme'],
  },
  bukhari_1162: {
    id: 'bukhari_1162',
    type: 'Hadith',
    title: 'La consultation confiante d’Allah (Al-Istikhârah)',
    reference: 'Sahîh al-Bukhârî n° 1162 (d’après Jâbir ibn ‘Abdillâh)',
    arabicText: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ',
    phonetic: 'Allâhumma innî astakhîruka bi-‘ilmika, wa astaqdiruka bi-qudratika, wa as’aluka min fadlika al-‘azîm',
    frenchTranslation: '« Ô Allah, je Te consulte par Ta science, je Te demande de m’accorder la capacité par Ta puissance, et je Te demande de Ton immense générosité. »',
    gradeBadge: 'Sahîh — Authentique (Al-Bukhârî)',
    gradeTone: 'emerald',
    scholarInfo: 'Précision essentielle de l’Imam An-Nawawî et des 4 écoles : l’Istikhârah n’exige PAS de voir un rêve la nuit ! Après avoir prié 2 unités et récité l’invocation, on avance sereinement en observant ce qu’Allah facilite ou éloigne.',
    methodologyNote: 'Dissipe l’idée reçue populaire sur l’attente obligatoire d’un rêve.',
    dhikrTargetCount: 1,
    keywords: ['choix', 'decision', 'istikhara', 'mariage', 'emploi', 'hesitation', 'doute'],
  },
  bukhari_597: {
    id: 'bukhari_597',
    type: 'Hadith',
    title: 'Rattraper sereinement une prière oubliée ou manquée par sommeil',
    reference: 'Sahîh al-Bukhârî n° 597 & Sahîh Muslim n° 684 (d’après Anas ibn Mâlik)',
    arabicText: 'مَنْ نَسِيَ صَلَاةً فَلْيُصَلِّ إِذَا ذَكَرَهَا، لَا كَفَّارَةَ لَهَا إِلَّا ذَلِكَ',
    phonetic: 'Man nasiya salâtan falyusalli idhâ dhakarahâ, lâ kaffârata lahâ illâ dhâlik',
    frenchTranslation: '« Celui qui oublie une prière [ou dort], qu’il l’accomplisse dès qu’il s’en souvient ; elle n’a pas d’autre expiation que cela. »',
    gradeBadge: 'Muttafaq ‘Alayh — Consensus des 4 écoles',
    gradeTone: 'emerald',
    scholarInfo: 'Les 4 écoles (Malékite, Hanafite, Chaféite, Hanbalite) s’accordent sur le rattrapage immédiat et paisible (Qadâ’) dès le réveil ou le souvenir, sans panique.',
    methodologyNote: 'Vérifié dans Sahîh al-Bukhârî, Muslim et Al-Mawsû‘ah al-Fiqhiyyah.',
    keywords: ['priere', 'rattrapage', 'oublie', 'reveil', 'fajr', 'retard', 'qada', 'sommeil'],
  },
  qaida_yaqin: {
    id: 'qaida_yaqin',
    type: 'Fiqh & Maximes',
    title: 'Règle d’or contre le doute obsessionnel (Waswâs)',
    reference: 'Al-Qawâ‘id al-Fiqhiyyah • Fondée sur Sahîh al-Bukhârî n° 137 & Muslim n° 361',
    arabicText: 'الْيَقِينُ لَا يَزُولُ بِالشَّكِّ',
    phonetic: 'Al-yaqînu lâ yazûlu bish-shakk',
    frenchTranslation: '« La certitude n’est pas annulée par le doute. »',
    gradeBadge: 'Ijmâ‘ — Consensus unanime des 4 écoles',
    gradeTone: 'emerald',
    scholarInfo: 'L’une des 5 grandes maximes universelles du droit islamique (As-Suyûtî, Ibn Nujaym, Al-Qarâfî). Les savants interdisent à la personne sujette au Waswâs de recommencer ses ablutions sur simple soupçon.',
    methodologyNote: 'Couplage Hadith + Synthèse juridique unanime.',
    keywords: ['waswas', 'doute', 'ablutions', 'wudu', 'toc', 'obsession', 'certitude'],
  },
  mawsuah_lams: {
    id: 'mawsuah_lams',
    type: 'Fiqh & Maximes',
    title: 'Le contact physique entre époux et les ablutions',
    reference: 'Al-Mawsû‘ah al-Fiqhiyyah al-Kuwaytiyyah (Encyclopédie du Fiqh, vol. 43, Wudû’)',
    arabicText: 'اخْتَلَفَ الْفُقَهَاءُ فِي نَقْضِ الْوُضُوءِ بِلَمْسِ الْمَرْأَةِ عَلَى أَقْوَالٍ مُعْتَبَرَةٍ',
    phonetic: 'Ikhtalafa al-fuqahâ’u fî naqdi al-wudû’i bi-lamsi al-mar’ati ‘alâ aqwâlin mu‘tabarah',
    frenchTranslation: '« Les juristes des quatre écoles ont divergé de manière légitime et reconnue sur l’annulation des ablutions par le simple toucher de l’épouse, en croisant le verset 4:43 et les hadiths authentiques de ‘Â’ishah. »',
    gradeBadge: 'Synthèse Académique Neutre des 4 Écoles',
    gradeTone: 'blue',
    scholarInfo: 'Ministère des Awqâf du Koweït (45 volumes rédigés par plus de 200 juristes contemporains) : référence internationale impartiale de droit musulman comparé.',
    methodologyNote: 'Aucune école n’est dénigrée ; l’utilisateur voit d’abord son école puis la richesse des autres avis.',
    keywords: ['toucher', 'conjoint', 'epouse', 'mari', 'embrasser', 'main', 'ablutions'],
  },
  mawsuah_safar: {
    id: 'mawsuah_safar',
    type: 'Fiqh & Maximes',
    title: 'La prière du voyageur (Qasr & Jam‘)',
    reference: 'Coran 4:101 • Sahîh Muslim n° 686 • Al-Mawsû‘ah al-Fiqhiyyah (vol. 27)',
    arabicText: 'صَدَقَةٌ تَصَدَّقَ اللَّهُ بِهَا عَلَيْكُمْ فَاقْبَلُوا صَدَقَتَهُ',
    phonetic: 'Sadaqatun tasaddaqa Allâhu bihâ ‘alaykum fa-qbalû sadaqatah',
    frenchTranslation: '« [Le raccourcissement en voyage] est une aumône qu’Allah vous a accordée : acceptez donc Son aumône. » (Sahîh Muslim 686)',
    gradeBadge: 'Sahîh Muslim & Fiqh Comparé des 4 Écoles',
    gradeTone: 'emerald',
    scholarInfo: 'Accord des 4 écoles sur la légitimité du raccourcissement (Qasr) à partir d’env. 80–85 km ; facilité de regroupement (Jam‘) reconnue par la majorité (Malékite, Chaféite, Hanbalite).',
    methodologyNote: 'Distinction claire entre le consensus sur le Qasr et la nuance hanafite sur le Jam‘.',
    keywords: ['voyage', 'deplacement', 'train', 'avion', 'raccourcir', 'regrouper', 'safar'],
  },
  muslim_2699: {
    id: 'muslim_2699',
    type: 'Hadith',
    title: 'La facilité promise à celui qui cherche à apprendre',
    reference: 'Sahîh Muslim n° 2699 (d’après Abû Hurayrah)',
    arabicText: 'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا، سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ',
    phonetic: 'Man salaka tarîqan yaltamisu fîhi ‘ilman, sahhala Allâhu lahu bihi tarîqan ilâ al-jannah',
    frenchTranslation: '« Celui qui emprunte un chemin à la recherche d’une science, Allah lui facilite par cela un chemin vers le Paradis. »',
    gradeBadge: 'Sahîh — Authentique (Muslim)',
    gradeTone: 'emerald',
    scholarInfo: 'Riyâd as-Sâlihîn (Imam An-Nawawî, Livre de la Science) : même quelques minutes sincères chaque jour inscrivent le croyant sur ce chemin.',
    methodologyNote: 'Alternative 100 % authentique proposée par le module Fact-Checker.',
    keywords: ['science', 'apprendre', 'etude', 'savoir', 'paradis'],
  },
  tirmidhi_1956: {
    id: 'tirmidhi_1956',
    type: 'Hadith',
    title: 'Le sourire bienveillant comme aumône',
    reference: 'Jâmi‘ at-Tirmidhî n° 1956 (d’après Abû Dharr)',
    arabicText: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ',
    phonetic: 'Tabassumuka fî wajhi akhîka laka sadaqah',
    frenchTranslation: '« Ton sourire face à ton frère est pour toi une aumône (sadaqah). »',
    gradeBadge: 'Hasan Sahîh — Authentifié (At-Tirmidhî)',
    gradeTone: 'emerald',
    scholarInfo: 'Authentifié par l’Imam At-Tirmidhî, Ibn Hibbân (n° 474) et les vérificateurs contemporains : l’adoration en Islam embrasse la douceur relationnelle du quotidien.',
    methodologyNote: 'Vérifié dans la base canonique des Sunan.',
    keywords: ['sourire', 'aumone', 'bonte', 'collegue', 'comportement', 'adab'],
  },
  nasai_3104: {
    id: 'nasai_3104',
    type: 'Hadith',
    title: 'La place de la mère et le Paradis',
    reference: 'Sunan an-Nasâ’î n° 3104 & Ibn Mâjah n° 2781 (d’après Mu‘âwiyah ibn Jâhimah)',
    arabicText: 'فَالْزَمْهَا فَإِنَّ الْجَنَّةَ تَحْتَ رِجْلَيْهَا',
    phonetic: 'Falzamhâ fa-inna al-jannata tahta rijlayhâ',
    frenchTranslation: '« Reste attaché à son service [ta mère], car le Paradis se trouve auprès de ses pieds. »',
    gradeBadge: 'Hasan Sahîh — Authentifié (Al-Hâkim, Adh-Dhahabî, Al-Albânî)',
    gradeTone: 'emerald',
    scholarInfo: 'Formulation prophétique authentifiée qui remplace avantageusement la variante populaire faible dans sa chaîne (« sous les pieds des mères »).',
    methodologyNote: 'Précision académique du Takhrîj sans rigorisme inutile.',
    keywords: ['mere', 'parents', 'famille', 'paradis', 'bienfaisance'],
  },
};

export interface SosProtocol {
  id: string;
  label: string;
  emoji: string;
  subtitle: string;
  breathingGuide: string;
  reassuranceText: string;
  sourceId: string;
  immediateGesture: string;
}

export const SOS_PROTOCOLS: SosProtocol[] = [
  {
    id: 'sos_anxiety',
    label: 'Angoisse / Oppression',
    emoji: '🌊',
    subtitle: 'Mon cœur bat vite, tout s’accumule',
    breathingGuide: 'Inspire lentement 4s • Garde 3s • Expire longuement 6s',
    reassuranceText:
      'Tu es en sécurité dans cet instant précis. Tu n’as pas besoin de porter demain dès maintenant : Allah connaît le poids exact de ta poitrine.',
    sourceId: 'bukhari_6369',
    immediateGesture: 'Relâche ta mâchoire, pose une main sur ta poitrine et récite 3 fois doucement.',
  },
  {
    id: 'sos_anger',
    label: 'Colère qui monte',
    emoji: '🔥',
    subtitle: 'Avant de dire un mot que je regretterai',
    breathingGuide: 'Pause de silence immédiate • Expire lentement par la bouche',
    reassuranceText:
      'La force véritable n’est pas d’écraser l’autre dans la dispute, mais de protéger ton cœur pendant les 30 premières secondes de l’orage.',
    sourceId: 'bukhari_6115',
    immediateGesture: 'Sunnah physique immédiate (Abû Dâwûd 4782) : si tu es debout, assieds-toi ; bois une gorgée d’eau et diffère ta réponse de 10 minutes.',
  },
  {
    id: 'sos_insomnia',
    label: 'Insomnie / Nuit agitée',
    emoji: '🌙',
    subtitle: 'Impossible de dormir, pensées en boucle',
    breathingGuide: 'Éteins la course mentale • Dépose tes dossiers jusqu’à l’aube',
    reassuranceText:
      'Pendant que tu dors, Celui qui ne somnole ni ne dort (Al-Hayy Al-Qayyûm) veille sur tes affaires bien mieux que tes ruminations nocturnes.',
    sourceId: 'quran_3_173',
    immediateGesture: 'Pose l’écran en mode Nuit après ces 7 récitations murmures et laisse ton corps s’alourdir.',
  },
  {
    id: 'sos_guilt',
    label: 'Culpabilité / Loin d’Allah',
    emoji: '🕊️',
    subtitle: 'J’ai honte de mes manquements ou de ma flemme',
    breathingGuide: 'Inspire la miséricorde • Laisse tomber l’auto-condamnation',
    reassuranceText:
      'Le fait même que ton cœur s’inquiète de son lien avec Allah est la preuve vivante qu’Il ne t’a pas abandonné. Sa porte est plus large que toutes tes chutes.',
    sourceId: 'quran_39_53',
    immediateGesture: 'Ne regarde pas en arrière avec désespoir : fais juste un pas minuscule vers Lui maintenant.',
  },
  {
    id: 'sos_decision',
    label: 'Hésitation / Choix difficile',
    emoji: '🧭',
    subtitle: 'Peur de me tromper (Travail, Mariage, Projet)',
    breathingGuide: 'Consulte les gens sages • Puis remets le choix à Celui qui sait tout',
    reassuranceText:
      'Rappel précieux des savants : l’Istikhârah ne nécessite PAS d’attendre un rêve mystérieux ! Tu pries 2 unités quand tu le peux, tu récites cette demande, puis tu avances sereinement.',
    sourceId: 'bukhari_1162',
    immediateGesture: 'Demande à Allah de te faciliter ce qui est bon pour toi et d’éloigner sans regret ce qui te nuirait.',
  },
];

export interface GuidedTrackStep {
  day: number;
  title: string;
  summary: string;
  sourceId: string;
  microAction: string;
}

export interface GuidedTrack {
  id: string;
  title: string;
  subtitle: string;
  durationBadge: string;
  steps: GuidedTrackStep[];
}

export const GUIDED_TRACKS: GuidedTrack[] = [
  {
    id: 'track_serenity',
    title: 'Apaiser son cœur en 5 étapes',
    subtitle: 'Traverser le stress moderne avec la psychologie coranique et prophétique.',
    durationBadge: '5 × 2 min',
    steps: [
      {
        day: 1,
        title: 'Accepter sa limite humaine sans honte',
        summary: 'Comprendre pourquoi Allah n’exige jamais l’impossible ni l’épuisement (Coran 2:286).',
        sourceId: 'quran_2_286',
        microAction: 'Raye une tâche non essentielle de ta liste d’aujourd’hui sans culpabiliser.',
      },
      {
        day: 2,
        title: 'Distinguer le souci futur de la réalité présente',
        summary: 'Guérir al-hamm (l’anxiété d’anticipation) avec le remède de Sahîh al-Bukhârî.',
        sourceId: 'bukhari_6369',
        microAction: 'Récite 3 fois l’invocation prophétique avant d’ouvrir tes messages du matin.',
      },
      {
        day: 3,
        title: 'Trouver les deux facilités dans l’épreuve',
        summary: 'Méditation sur Sourate Ash-Sharh : le secours accompagne l’effort.',
        sourceId: 'quran_94_5_6',
        microAction: 'Note une aide discrète reçue cette semaine que tu n’avais pas remarquée.',
      },
      {
        day: 4,
        title: 'Lâcher le contrôle obsessionnel du résultat',
        summary: 'Vivre le vrai Tawakkul au travail et en famille (Sourate At-Talâq).',
        sourceId: 'quran_65_2_3',
        microAction: 'Fais de ton mieux sur un dossier, puis confie explicitement l’issue à Allah.',
      },
      {
        day: 5,
        title: 'Installer sa bruine spirituelle durable',
        summary: 'Ancrer le principe prophétique de la petite œuvre constante.',
        sourceId: 'bukhari_6464',
        microAction: 'Choisis ton créneau fixe de 2 minutes pour la semaine prochaine.',
      },
    ],
  },
  {
    id: 'track_prayer_gentle',
    title: 'La Prière retrouvée sans pression',
    subtitle: 'Reprendre, rattraper ou alléger ses prières avec les facilités authentiques des écoles.',
    durationBadge: '4 × 2 min',
    steps: [
      {
        day: 1,
        title: 'Revenir après une pause sans désespérer',
        summary: 'Comment la Miséricorde divine accueille celui qui reprend sa prière (Coran 39:53).',
        sourceId: 'quran_39_53',
        microAction: 'Accomplis la prochaine prière du moment sans ruminer le passé.',
      },
      {
        day: 2,
        title: 'Prière oubliée ou réveil tardif : la simplicité',
        summary: 'Ce qu’enseigne le Prophète ﷺ lorsqu’on rate un horaire par sommeil ou oubli.',
        sourceId: 'bukhari_597',
        microAction: 'Prie sereinement dès que tu t’en souviens, sans auto-flagellation.',
      },
      {
        day: 3,
        title: 'Se libérer définitivement du doute (Waswâs)',
        summary: 'Appliquer la règle unanime des 4 écoles sur la certitude des ablutions.',
        sourceId: 'qaida_yaqin',
        microAction: 'Ne refais plus jamais tes ablutions sur un simple « peut-être ».',
      },
      {
        day: 4,
        title: 'Voyager et travailler en paix (Qasr & Jam‘)',
        summary: 'Accepter les facilités offertes par Allah lors de tes déplacements.',
        sourceId: 'mawsuah_safar',
        microAction: 'Anticipe ton prochain trajet avec les règles souples de ton école.',
      },
    ],
  },
];

export interface DailyLesson {
  id: string;
  dayLabel: string;
  isCatchUp?: boolean;
  themeTag: string;
  title: string;
  primarySourceId: string;
  secondarySourceId: string;
  audioDurationLabel: string;
  modes: {
    spark_30s: {
      heartAnchor: string;
      microNiyyah: string;
    };
    light_2m: {
      hook: string;
      contextAndMeaning: string;
      dailyBridge: string;
      microNiyyah: string;
    };
    depth_5m: {
      linguisticGem: string;
      scholarlyWisdom: string;
      reflectionPrompt: string;
      suggestedFollowupQuestionId: string;
      suggestedFollowupLabel: string;
    };
  };
}

export const DAILY_LESSONS: DailyLesson[] = [
  {
    id: 'lesson_sharh',
    dayLabel: 'Aujourd’hui',
    themeTag: 'Apaiser l’inquiétude',
    title: 'Une seule épreuve, deux issues lumineuses',
    primarySourceId: 'quran_94_5_6',
    secondarySourceId: 'bukhari_6369',
    audioDurationLabel: '1 min 45',
    modes: {
      spark_30s: {
        heartAnchor:
          'Allah ne dit pas « après » la difficulté viendra la facilité, mais « AVEC » (ma‘a) la difficulté : au cœur même de ce qui te pèse aujourd’hui, le secours est déjà en route.',
        microNiyyah:
          'Ferme les yeux 10 secondes, relâche tes épaules et nomme intérieurement UNE seule inquiétude que tu remets entre les mains d’Allah pour les prochaines heures.',
      },
      light_2m: {
        hook: 'Quand les responsabilités s’accumulent — travail, famille, fatigue mentale — on attend souvent que tout soit réglé pour enfin respirer.',
        contextAndMeaning:
          'Révélée à un moment de forte pression à La Mecque, Sourate Ash-Sharh ne nie pas la lourdeur du fardeau : elle commence par reconnaître celui qui « pesait lourdement sur ton dos ». Mais la préposition arabe « ma‘a » (avec) change tout : la facilité n’est pas un horizon lointain, c’est une grâce intérieure (patience, clarté, soutien inattendu) donnée pendant la traversée.',
        dailyBridge:
          'Aujourd’hui, ne cherche pas à résoudre toute ta semaine d’un coup. Avance uniquement sur le pas qui est devant toi en sachant que tu n’es pas seul à le porter.',
        microNiyyah:
          'Avant d’ouvrir ta prochaine tâche difficile, murmure doucement : « Bismillâh, Allah met une facilité dans cet instant. »',
      },
      depth_5m: {
        linguisticGem:
          'Subtilité arabe célèbre relevée par Ibn ‘Abbâs, Al-Farrâ’ et l’Imam Ibn ‘Âshûr : le mot « al-‘usr » (la difficulté) porte l’article défini « al- » dans les deux versets — en grammaire arabe, il désigne donc UNE SEULE et même épreuve. À l’inverse, « yusran » (une facilité) est indéfini à chaque fois : il désigne DEUX facilités distinctes. D’où la parole prophétique : « Jamais une seule difficulté ne vaincra deux facilités. »',
        scholarlyWisdom:
          'Dans Taysîr al-Karîm ar-Rahmân, l’Imam As-Sa‘dî explique que l’indéfini de « yusran » exprime aussi l’immensité : quelle que soit la nature de ton blocage (émotionnel, matériel, spirituel), la facilité divine prendra exactement la forme dont ton cœur a besoin. Et lorsque la fatigue s’y mêle, le Prophète ﷺ conjuguait cette confiance avec l’invocation authentique contre le souci (al-hamm) et la flemme (al-kasal).',
        reflectionPrompt:
          'En repensant à une épreuve passée qui te semblait insurmontable, quelle « facilité cachée » y avais-tu finalement découverte ?',
        suggestedFollowupQuestionId: 'q_anxiety',
        suggestedFollowupLabel: 'Je me sens submergé au travail, quelle invocation réciter ?',
      },
    },
  },
  {
    id: 'lesson_consistency',
    dayLabel: 'Hier • Rattrapage 30s',
    isCatchUp: true,
    themeTag: 'Mode Sans Flemme',
    title: 'Pourquoi 2 minutes sincères valent mieux que 2 heures abandonnées',
    primarySourceId: 'bukhari_6464',
    secondarySourceId: 'bukhari_69',
    audioDurationLabel: '1 min 30',
    modes: {
      spark_30s: {
        heartAnchor:
          'Avoir des baisses d’élan (al-futûr) est humain : Allah n’attend pas de toi une performance héroïque épuisante, mais un fil de lumière doux qui ne se rompt pas.',
        microNiyyah:
          'Remercie intérieurement Allah d’être là pendant ces 30 secondes au lieu de te reprocher ce que tu n’as pas fait hier.',
      },
      light_2m: {
        hook: 'Le piège du « tout ou rien » nous fait croire que si l’on n’a pas 30 minutes de concentration parfaite, cela ne vaut même pas la peine d’ouvrir un rappel.',
        contextAndMeaning:
          'Interrogée sur la façon dont vivait le Prophète ﷺ au quotidien, ‘Â’ishah (qu’Allah l’agrée) utilisa un mot magnifique : « Son œuvre était une bruine régulière (dîmah) ». Pas un orage violent qui inonde le sol puis le laisse sec six mois, mais une pluie fine qui pénètre doucement la terre et la garde vivante.',
        dailyBridge:
          'Si ta journée est saturée, ne vise pas la perfection : vise la fidélité minuscule. Un verset médité dans les transports ou un pardon sincère suffit à illuminer ta journée.',
        microNiyyah:
          'Choisis aujourd’hui une micro-habitude spirituelle si facile qu’il est presque impossible de la rater (même les jours de grande fatigue).',
      },
      depth_5m: {
        linguisticGem:
          'Le terme « adwamuhâ » vient de la racine D-W-M qui évoque ce qui perdure paisiblement, suivi de « wa in qalla » (« même si c’est peu ») : la petitesse de l’acte n’est jamais méprisée auprès d’Allah.',
        scholarlyWisdom:
          'Dans son commentaire de Sahîh Muslim, l’Imam An-Nawawî explique un secret spirituel profond : l’œuvre petite mais constante maintient le cœur connecté tous les jours à son Créateur, tandis que l’excès de zèle provoque la lassitude (al-malal) et la culpabilité qui éloignent durablement.',
        reflectionPrompt:
          'Quelle exigence trop lourde t’es-tu imposée récemment au point de te décourager, et comment pourrais-tu la réduire à un format doux de 2 minutes ?',
        suggestedFollowupQuestionId: 'q_waswas',
        suggestedFollowupLabel: 'Comment retrouver la sérénité quand je culpabilise sans cesse ?',
      },
    },
  },
  {
    id: 'lesson_tawakkul',
    dayLabel: 'Avant-hier • Rattrapage',
    isCatchUp: true,
    themeTag: 'Travail & Confiance',
    title: 'L’issue que ton esprit n’avait pas calculée',
    primarySourceId: 'quran_65_2_3',
    secondarySourceId: 'quran_2_286',
    audioDurationLabel: '2 min 05',
    modes: {
      spark_30s: {
        heartAnchor:
          'Ton cerveau ne voit que les portes qui existent déjà ; Allah est Celui qui crée une sortie là où tu ne voyais qu’un mur (« min haythu lâ yahtasib »).',
        microNiyyah:
          'Dans une décision pro ou familiale aujourd’hui, fais ta part honnêtement puis dis : « Hasbiya Allâh — Allah me suffit pour la suite. »',
      },
      light_2m: {
        hook: 'L’anxiété naît souvent quand nous essayons de contrôler à la fois notre effort ET le résultat futur qui ne dépend pas de nous.',
        contextAndMeaning:
          'Ce verset de Sourate At-Talâq a été révélé dans un contexte très concret de difficultés familiales et financières. Il relie deux réalités : l’intégrité éthique au présent (at-taqwâ : rester juste, droit, honnête même sous pression) et l’ouverture d’une issue imprévisible (makhraj).',
        dailyBridge:
          'En islam, le Tawakkul (confiance active) consiste à attacher son chameau avec soin, puis à libérer son cœur de l’angoisse du lendemain.',
        microNiyyah:
          'Identifie une chose hors de ton contrôle aujourd’hui et décide consciemment d’arrêter de la vérifier toutes les 10 minutes.',
      },
      depth_5m: {
        linguisticGem:
          'Le mot « makhraj » désigne littéralement un passage de sortie étroit mais sûr au milieu d’un encerclement : pas besoin que tout le paysage change d’un coup, il suffit d’un passage juste à ta mesure.',
        scholarlyWisdom:
          'Les compagnons rapportent que lorsque le Prophète ﷺ récita ce verset à Abû Dharr, il lui fit sentir que si les cieux et la terre se refermaient sur un croyant intègre, Allah lui ouvrirait quand même une brèche entre eux (cité dans Tafsîr Ibn Kathîr authentifié).',
        reflectionPrompt:
          'Quelle est aujourd’hui la part qui dépend vraiment de ton effort (à faire calmement) et la part qui n’appartient qu’à Allah ?',
        suggestedFollowupQuestionId: 'q_travel',
        suggestedFollowupLabel: 'Comment concilier mes déplacements pros et mes prières simplement ?',
      },
    },
  },
];

export interface SchoolPosition {
  madhhab: Exclude<MadhhabId, 'consensus'>;
  schoolName: string;
  verdictSummary: string;
  explanation: string;
}

export interface ChatScenario {
  id: string;
  chipLabel: string;
  userQuestion: string;
  epistemicStatus: EpistemicStatus;
  epistemicBadgeLabel: string;
  epistemicDescription: string;
  empathyOpening: string;
  leadByMadhhab: Record<MadhhabId, string>;
  bodyParagraphs: string[];
  citedSourceIds: string[];
  schoolComparison?: SchoolPosition[];
  microStep15s: string;
  redlineImamSheet?: {
    topic: string;
    contextQuestionsToPrepare: string[];
    generalEducationalNote: string;
  };
}

export const CHAT_SCENARIOS: ChatScenario[] = [
  {
    id: 'q_anxiety',
    chipLabel: 'Anxiété & surcharge au travail',
    userQuestion: 'Je me sens submergé par l’anxiété au travail et la fatigue mentale, comment retrouver la paix sans culpabiliser ?',
    epistemicStatus: 'SAKINA',
    epistemicBadgeLabel: '✨ Rappel & Sakînah (Apaisement du cœur)',
    epistemicDescription: 'Accompagnement spirituel fondé sur le Coran et la médecine prophétique du cœur.',
    empathyOpening:
      'Respire doucement : ressentir de l’anxiété ou de l’épuisement ne veut absolument pas dire que ta foi est faible. Même les meilleurs des croyants ont connu le poids du souci, et le Prophète ﷺ lui-même avait formulé une invocation dédiée à cet état.',
    leadByMadhhab: {
      maliki: 'En islam, prendre soin de ton équilibre mental et alléger ta charge fait partie de la préservation de la vie (Hifz an-Nafs), l’un des cinq grands objectifs de la Loi mis en avant par la tradition malékite.',
      hanafi: 'La tradition islamique et l’école hanafite rappellent qu’Allah n’impose jamais au-delà de la capacité réelle et que ménager ses forces pour durer est un devoir envers soi-même.',
      shafii: 'Comme le souligne l’Imam An-Nawawî, apaiser son cœur par de courts rappels authentiques tout en prenant les moyens humains de repos est la voie prophétique équilibrée.',
      hanbali: 'Comme l’explique Ibn al-Qayyim, le souci du futur (al-hamm) et la fatigue qui coupe l’élan (al-kasal) se soignent à la fois par le repos légitime et le refuge confiant auprès d’Allah.',
      consensus: 'L’ensemble des savants de l’Islam s’accorde sur le fait que l’épuisement mental n’est pas un défaut de foi, et que conjuguer repos humain et évocation douce apaise durablement le cœur.',
    },
    bodyParagraphs: [
      'Le Coran pose une boussole très douce : l’apaisement profond (at-tuma’nînah) ne vient pas quand tous les dossiers du travail disparaissent, mais quand ton cœur retrouve un point d’ancrage plus grand que l’urgence du moment.',
      'Dans Sahîh al-Bukhârî, Anas ibn Mâlik rapporte que l’invocation que le Prophète ﷺ répétait le plus souvent réunissait précisément les deux choses que tu décris : le souci anxieux face à l’avenir (al-hamm) et le manque d’énergie qui paralyse (al-kasal).',
    ],
    citedSourceIds: ['quran_13_28', 'bukhari_6369', 'quran_2_286'],
    microStep15s:
      'Pose ton téléphone 15 secondes, inspire lentement et dis une fois avec le cœur : « Allâhumma innî a‘ûdhu bika min al-hammi wal-hazan » (Ô Allah, protège mon cœur du souci qui m’envahit).',
  },
  {
    id: 'q_waswas',
    chipLabel: 'Doute constant sur mes ablutions (Waswâs)',
    userQuestion: 'J’ai tout le temps un doute d’avoir annulé mes ablutions sans en être sûr, du coup je les refais plusieurs fois et ça m’épuise…',
    epistemicStatus: 'IJMA',
    epistemicBadgeLabel: '🟢 Consensus unanime (Ijmâ‘) • Protocole Anti-Waswâs',
    epistemicDescription: 'Règle universelle des quatre écoles fondée sur un hadith authentique explicite.',
    empathyOpening:
      'Merci d’en parler franchement : ce que tu décris porte un nom très connu des savants bienveillants — le Waswâs (le doute scrupuleux anxieux). La bonne nouvelle va te soulager immédiatement : tu n’as PAS à refaire tes ablutions.',
    leadByMadhhab: {
      maliki: 'Dans l’école malékite (Al-Qarâfî, Khalil, Ibn ‘Âshir), à celui qui est sujet aux doutes fréquents comme toi, il est même déconseillé — voire interdit si cela nourrit l’obsession — de recommencer ses ablutions sans certitude absolue.',
      hanafi: 'Dans l’école hanafite (Ibn Nujaym dans Al-Ashbâh wan-Nazâ’ir), tant que tu as la certitude d’avoir fait tes ablutions, aucun simple doute n’a le pouvoir juridique de les annuler.',
      shafii: 'Dans l’école chaféite (As-Suyûtî, Ibn Hajar al-Haytamî), tes ablutions restent 100 % valides : ignorer le doute récurrent est le seul remède prescrit par les juristes.',
      hanbali: 'Dans l’école hanbalite (Ibn Qudâmah), tu restes en état de pureté tant que tu n’as pas une certitude claire du contraire : ne recommence pas tes ablutions.',
      consensus: 'Les quatre écoles juridiques sont unanimes : tes ablutions restent parfaitement valides tant que tu n’as pas une certitude à 100 % de les avoir annulées. Ignore ce doute en toute sérénité.',
    },
    bodyParagraphs: [
      'Un homme vint un jour se plaindre exactement de cette impression auprès du Prophète ﷺ pendant la prière. Le Prophète ﷺ le libéra d’un seul principe libérateur : ne jamais quitter sa prière ni refaire ses ablutions sur une impression ou un doute, tant qu’il n’y a pas une preuve certaine (Bukhârî 137, Muslim 361).',
      'De ce hadith, tous les juristes de l’Islam ont tiré l’une des 5 règles d’or universelles du Fiqh : « La certitude n’est pas annulée par le doute » (Al-yaqîn lâ yazûlu bish-shakk). Tu étais certain d’avoir fait tes ablutions ; un simple « et si… ? » n’a aucune valeur.',
    ],
    citedSourceIds: ['qaida_yaqin', 'bukhari_69'],
    microStep15s:
      'La prochaine fois que ce « et si ? » surgit, souris intérieurement, ne retourne pas au lavabo et dis-toi : « Je suis en règle avec l’enseignement authentique du Prophète ﷺ. »',
  },
  {
    id: 'q_wudu_touch',
    chipLabel: 'Toucher son conjoint & ablutions (4 écoles)',
    userQuestion: 'Est-ce qu’embrasser son conjoint ou lui tenir la main avant de sortir annule mes ablutions ?',
    epistemicStatus: 'IKHTILAF',
    epistemicBadgeLabel: '🟡 Divergence reconnue & légitime (Ikhtilâf Mu‘tabar)',
    epistemicDescription: 'Question classique où les 4 écoles sunnites ont chacune une lecture fondée sur des preuves solides.',
    empathyOpening:
      'Excellente question du quotidien conjugal ! C’est l’exemple parfait d’une divergence saine entre les grands imams, qu’il est précieux de comprendre pour vivre sa pratique avec sérénité et respect mutuel.',
    leadByMadhhab: {
      maliki: 'Selon ton repère Malékite : tenir la main ou embrasser par simple affection/tendresse habituelle (pour dire au revoir, par compassion) SANS intention de désir sensuel ni ressenti de plaisir charnel N’ANNULE PAS les ablutions. En revanche, si c’est accompagné de désir ou de plaisir sensuel, elles sont à renouveler.',
      hanafi: 'Selon ton repère Hanafite : toucher la main de ton conjoint ou l’embrasser N’ANNULE PAS les ablutions (tant qu’aucune impureté physique effective n’est émise), sur la base du hadith authentique de ‘Â’ishah.',
      shafii: 'Selon ton repère Chaféite : tout contact direct peau contre peau entre mari et femme (sans vêtement intermédiaire) annule les ablutions, qu’il y ait désir ou simple geste affectueux.',
      hanbali: 'Selon ton repère Hanbalite : un contact ordinaire d’affection ou de politesse SANS désir sensuel (shahwah) N’ANNULE PAS les ablutions ; seul le toucher accompagné de désir les annule.',
      consensus: 'La majorité des écoles (Hanafite, Malékite et Hanbalite) considère qu’un geste ordinaire de tendresse ou un contact de la main sans désir sensuel N’ANNULE PAS les ablutions, tandis que l’école Chaféite retient l’annulation dès le contact direct de la peau.',
    },
    bodyParagraphs: [
      'Pourquoi des savants tous scrupuleux et amoureux du Coran ont-ils abouti à ces nuances ? Parce qu’ils ont concilié deux textes authentiques : le verset de Sourate An-Nisâ’ (4:43) qui évoque le terme « lâmas-tum an-nisâ’ » (interprété comme le rapport intime par Ibn ‘Abbâs, ou le toucher par Ibn Mas‘ûd) et les récits authentiques où le Prophète ﷺ touchait ou embrassait son épouse ‘Â’ishah avant d’aller prier sans refaire ses ablutions.',
      'Règle d’éthique fraternelle (Adab al-Ikhtilâf) : suis paisiblement l’école de référence qui structure ta pratique sans bricolage opportuniste, et respecte pleinement un proche qui applique avec sincérité une autre des quatre écoles reconnues.',
    ],
    citedSourceIds: ['mawsuah_lams', 'bukhari_69'],
    schoolComparison: [
      {
        madhhab: 'maliki',
        schoolName: 'École Malékite',
        verdictSummary: 'Dépend de l’intention / du plaisir',
        explanation: 'Un geste de tendresse quotidien sans recherche ni ressenti de plaisir sensuel n’annule pas les ablutions ; avec désir/plaisir, il les annule.',
      },
      {
        madhhab: 'hanafi',
        schoolName: 'École Hanafite',
        verdictSummary: 'N’annule pas les ablutions',
        explanation: 'Le contact physique ou le baiser n’annule pas les ablutions tant qu’aucune émission d’impureté (madhiy) ne se produit.',
      },
      {
        madhhab: 'shafii',
        schoolName: 'École Chaféite',
        verdictSummary: 'Annule si contact peau contre peau',
        explanation: 'Le contact direct de l’épiderme entre les deux époux annule les ablutions, même sans intention sensuelle.',
      },
      {
        madhhab: 'hanbali',
        schoolName: 'École Hanbalite',
        verdictSummary: 'Annule uniquement avec désir (Shahwah)',
        explanation: 'Tenir la main ou toucher sans désir charnel n’annule pas les ablutions ; le contact avec désir les annule.',
      },
    ],
    microStep15s:
      'Clique sur l’accordéon des 4 écoles ci-dessous : voir comment la tradition islamique accueille la nuance apaise immédiatement la peur de « mal faire ».',
  },
  {
    id: 'q_missed_prayer',
    chipLabel: 'Réveil en retard pour Fajr / Prière oubliée',
    userQuestion: 'Mon réveil n’a pas sonné ce matin et j’ai raté l’heure de Fajr avant d’aller au travail : que dois-je faire sans paniquer ?',
    epistemicStatus: 'IJMA',
    epistemicBadgeLabel: '🟢 Consensus unanime (Ijmâ‘) • Rattrapage apaisé',
    epistemicDescription: 'Règle prophétique directe authentifiée dans Bukhârî & Muslim.',
    empathyOpening:
      'Sois totalement apaisé : manquer une prière involontairement à cause du sommeil ou d’un oubli sincère n’est PAS un péché en Islam (le calame est levé sur celui qui dort jusqu’à son réveil).',
    leadByMadhhab: {
      maliki: 'Selon l’école Malékite (comme les 3 autres écoles) : fais tes ablutions calmement dès ton réveil et accomplis tes 2 unités du Fajr immédiatement (ainsi que les 2 unités surérogatoires du Fajr juste avant, fortement recommandées chez les Malékites même en rattrapage matinal).',
      hanafi: 'Selon l’école Hanafite : accomplis tes 2 unités obligatoires du Fajr dès que tu te réveilles (hors des quelques minutes exactes du lever du soleil à l’horizon), accompagnées de sa Sunnah si tu la rattrapes dans la matinée.',
      shafii: 'Selon l’école Chaféite : dès ton réveil et tes ablutions, prie immédiatement tes 2 unités du Fajr (ainsi que sa Sunnah rattrapée avec douceur). Aucune faute n’est inscrite contre celui qui dormait.',
      hanbali: 'Selon l’école Hanbalite : accomplis immédiatement ta prière dès ton réveil (avec ses 2 unités Sunnah avant elle), exactement comme le fit le Prophète ﷺ avec ses compagnons lors d’un voyage où la fatigue les avait retenus.',
      consensus: 'Les 4 écoles sont unanimes : pas de péché pour un réveil involontaire, et l’unique démarche demandée est d’accomplir ta prière sereinement dès que tu te réveilles.',
    },
    bodyParagraphs: [
      'Même le Prophète ﷺ et ses compagnons connurent une matinée de voyage épuisant où personne ne se réveilla avant que la chaleur du soleil ne les touche. Loin de les accabler de reproches, il leur montra avec calme comment faire leurs ablutions et accomplir Fajr avec la même dignité et présence du cœur.',
    ],
    citedSourceIds: ['bukhari_597', 'quran_2_286'],
    microStep15s:
      'Si cela t’arrive un matin pressé : prends 3 minutes calmes pour tes ablutions et tes 2 unités avant de partir, sans traîner de culpabilité toute la journée.',
  },
  {
    id: 'q_travel',
    chipLabel: 'Prière en déplacement pro / train',
    userQuestion: 'Je pars en déplacement professionnel à 250 km toute la journée : comment alléger ou regrouper mes prières validement ?',
    epistemicStatus: 'JUMHUR',
    epistemicBadgeLabel: '🔵 Consensus sur le raccourcissement • Majorité (Jumhûr) sur le regroupement',
    epistemicDescription: 'Facilité prophétique établie pour lever la gêne du voyageur.',
    empathyOpening:
      'Bonne route pour ton déplacement ! L’Islam a prévu des facilités très concrètes pour le voyageur — le Prophète ﷺ les a même qualifiées de « cadeau d’Allah qu’il convient d’accepter avec joie ».',
    leadByMadhhab: {
      maliki: 'Selon l’école Malékite : pour un trajet licite dépassant env. 80 km, il est fortement recommandé (Sunnah Mu’akkadah) de raccourcir Dhuhr, ‘Asr et ‘Ishâ’ à 2 unités (Qasr), et tu peux regrouper (Jam‘) Dhuhr avec ‘Asr, ou Maghrib avec ‘Ishâ’ lorsque ton trajet est chargé.',
      hanafi: 'Selon l’école Hanafite : à partir d’env. 80–85 km, raccourcir les prières de 4 unités à 2 unités est requis (Wâjib). Pour le regroupement, l’école hanafite privilégie de prier la première vers la toute fin de son créneau et la seconde dès l’entrée du sien (Jam‘ Sûrî), tout en reconnaissant la facilité des autres écoles en cas de contrainte forte en transport.',
      shafii: 'Selon l’école Chaféite : au-delà d’env. 81 km, tu bénéficies pleinement de la permission de raccourcir les prières de 4 unités à 2 (Qasr) ET de regrouper (Jam‘ Taqdîm ou Ta’khîr) Dhuhr/‘Asr ainsi que Maghrib/‘Ishâ’.',
      hanbali: 'Selon l’école Hanbalite : dès ~80 km de déplacement, il est recommandé de raccourcir à 2 unités (Qasr) et pleinement permis de regrouper Dhuhr avec ‘Asr (ou Maghrib avec ‘Ishâ’) pour faciliter ton voyage.',
      consensus: 'Les 4 écoles s’accordent à partir de 250 km (bien au-delà du seuil d’env. 80–85 km) pour raccourcir Dhuhr, ‘Asr et ‘Ishâ’ à 2 unités. Et la majorité des écoles (Malékite, Chaféite, Hanbalite) t’autorise à regrouper Dhuhr+‘Asr ou Maghrib+‘Ishâ’.',
    },
    bodyParagraphs: [
      'Le raccourcissement (Qasr) consiste à accomplir 2 unités (rak‘ât) au lieu de 4 pour Dhuhr, ‘Asr et ‘Ishâ’ (Fajr reste à 2 et Maghrib à 3), dès que tu as quitté les limites urbaines de ta ville de résidence.',
      'Le regroupement (Jam‘), permis par la majorité des savants (Jumhûr), te permet par exemple de prier Dhuhr (2 unités) immédiatement suivie de ‘Asr (2 unités) soit sur le temps de la première, soit sur le temps de la seconde, évitant de manquer une prière entre deux trains ou réunions.',
    ],
    citedSourceIds: ['mawsuah_safar', 'quran_2_286'],
    microStep15s:
      'Repère 10 minutes calmes avant ta réunion ou à l’arrivée en gare : 2 + 2 unités raccourcies prennent à peine 4 minutes en pleine paix.',
  },
  {
    id: 'q_divorce_redline',
    chipLabel: '🔴 Cas délicat : Divorce prononcé sous colère',
    userQuestion: 'Mon mari a prononcé le mot « divorce » hier soir lors d’une dispute violente et d’une colère extrême, sommes-nous divorcés religieusement ?',
    epistemicStatus: 'REDLINE_SAVANT',
    epistemicBadgeLabel: '🔴 Savant / Imam requis • Ligne Rouge Éthique (Pas de Fatwa IA)',
    epistemicDescription: 'Verrouillage de protection Nur : un statut familial réel ne doit jamais être tranché par une intelligence artificielle.',
    empathyOpening:
      'Tout d’abord, plein de douceur et de courage pour ce moment éprouvant que traverse votre foyer. Respire : par responsabilité morale et fidélité à l’éthique islamique, Nur refuse strictement de prononcer un verdict sur la validité d’une parole de divorce.',
    leadByMadhhab: {
      maliki: 'Dans l’école malékite comme dans toutes les écoles, juger d’un divorce prononcé sous colère (Talâq al-Ghadbân) exige un savant ou un imam qualifié qui interroge directement l’époux sur son degré exact de discernement et entend les deux conjoints.',
      hanafi: 'Dans la tradition hanafite comme chez l’ensemble des muftis contemporains, aucune application ni lecture solitaire ne peut statuer sur un lien conjugal : un savant humain doit qualifier précisément le degré de colère (al-ghadab) et les termes exacts.',
      shafii: 'Dans la tradition chaféite et auprès des conseils religieux compétents, l’examen individuel par un savant/imam qui écoute les circonstances réelles des deux époux est une obligation absolue avant toute conclusion.',
      hanbali: 'Dans la tradition hanbalite (qui distingue finement plusieurs degrés de colère aveuglante ou consciente), seul un savant humain échangeant de vive voix avec les époux est habilité à rendre cet avis (Iftâ’).',
      consensus: 'Unanimité déontologique : une IA ne peut ni valider ni annuler un divorce. En islam, la protection de la famille exige qu’un savant ou imam compétent écoute de vive voix le contexte exact des deux époux.',
    },
    bodyParagraphs: [
      'Pourquoi cette limite protège-t-elle ton couple ? Parce qu’en droit musulman (Iftâ’ & Qadâ’), les juristes distinguent plusieurs niveaux de colère (d’une simple irritation jusqu’à l’état d’aveuglement où la personne ne maîtrise plus ce qu’elle dit), examinent l’intention, la formulation exacte dans la langue parlée et l’historique du couple.',
      'Trancher à l’aveugle par écran interposé risquerait soit de briser injustement un mariage valide, soit de banaliser une limite sacrée. Pour t’aider concrètement sans te laisser seule, Nur peut préparer ci-dessous une fiche confidentielle structurée pour ta consultation avec un imam reconnu.',
    ],
    citedSourceIds: ['quran_65_2_3', 'bukhari_69'],
    microStep15s:
      'Ne prenez aucune décision précipitée sous le choc émotionnel ce soir ; utilisez le bouton ci-dessous pour préparer sereinement votre rendez-vous auprès d’un imam ou centre de médiation qualifié.',
    redlineImamSheet: {
      topic: 'Consultation confidentielle — Parole prononcée en état de forte colère',
      contextQuestionsToPrepare: [
        'Les mots exacts prononcés (et dans quelle langue) ainsi que l’intention au moment précis.',
        'L’état émotionnel et cognitif exact (conscience claire des paroles ou perte momentanée de maîtrise sous le choc).',
        'S’agit-il de la toute première fois qu’une telle parole est prononcée depuis le mariage ?',
        'La situation du foyer au moment des faits (pour permettre à l’imam d’écouter équitablement les deux époux).',
      ],
      generalEducationalNote:
        'Fiche générée par Nur (Mode Tawaqquf — Zéro Verdict IA) afin de faciliter l’accueil par un imam ou conseiller conjugal qualifié.',
    },
  },
];

export interface FactCheckItem {
  id: string;
  shortLabel: string;
  viralClaim: string;
  status: 'AUTHENTIC' | 'NUANCED' | 'UNAUTHENTIC';
  statusBadge: string;
  muhaddithVerdict: string;
  gentleExplanation: string;
  authenticAlternativeSourceId: string;
  shareableCardText: string;
}

export const FACT_CHECK_ITEMS: FactCheckItem[] = [
  {
    id: 'fc_china',
    shortLabel: '« Cherchez la science même en Chine »',
    viralClaim: 'Cherchez la science, fût-ce jusqu’en Chine',
    status: 'UNAUTHENTIC',
    statusBadge: '🔴 Non authentifié (Da‘îf Jiddan / Mawdû‘)',
    muhaddithVerdict: 'Jugé très faible ou forgé par les maîtres du hadith : l’Imam Ahmad, Ibn Hibbân, Ibn al-Jawzî (Al-Mawdû‘ât), Adh-Dhahabî et Al-Albânî.',
    gentleExplanation:
      'Cette phrase est très partagée avec une belle intention ! Si l’Islam encourage puissamment le savoir utile (religieux comme profane), cette formulation précise comporte dans sa chaîne un transmetteur discrédité : par respect pour le Prophète ﷺ, on évite de la lui attribuer. Voici une parole 100 % authentique encore plus belle à partager :',
    authenticAlternativeSourceId: 'muslim_2699',
    shareableCardText:
      '✨ Parole 100 % Authentique (Sahîh Muslim 2699) : « Celui qui emprunte un chemin à la recherche d’une science, Allah lui facilite par cela un chemin vers le Paradis. » — Vérifié avec douceur sur Nur',
  },
  {
    id: 'fc_mothers',
    shortLabel: '« Le Paradis est sous les pieds des mères »',
    viralClaim: 'Le Paradis se trouve sous les pieds des mères',
    status: 'NUANCED',
    statusBadge: '🟡 Sens vrai, mais formulation précise à privilégier',
    muhaddithVerdict: 'La formule populaire exacte (« al-jannatu tahta aqdâm al-ummahât ») a une chaîne faible selon Ibn ‘Adî et Al-Munâwî, MAIS une version très proche est authentique (Hasan Sahîh) dans Sunan an-Nasâ’î (3104) !',
    gentleExplanation:
      'Quel bel exemple de nuance académique ! Le sens est profondément vrai en Islam, mais au lieu de citer la variante faible, les spécialistes recommandent de citer les paroles authentiques prononcées par le Prophète ﷺ à un jeune compagnon à propos de sa mère :',
    authenticAlternativeSourceId: 'nasai_3104',
    shareableCardText:
      '🌿 Parole Authentifiée (Sunan an-Nasâ’î 3104) : « Reste attaché au service de ta mère, car le Paradis se trouve auprès de ses pieds. » — Vérifié sur Nur',
  },
  {
    id: 'fc_smile',
    shortLabel: '« Sourire à son frère est une aumône »',
    viralClaim: 'Ton sourire face à ton frère est une aumône',
    status: 'AUTHENTIC',
    statusBadge: '🟢 Authentique (Hasan Sahîh)',
    muhaddithVerdict: 'Rapporté et authentifié par l’Imam At-Tirmidhî (Jâmi‘ at-Tirmidhî n° 1956) et Ibn Hibbân (n° 474).',
    gentleExplanation:
      'Bonne nouvelle : tu peux partager et vivre ce hadith les yeux fermés ! Il résume toute la beauté d’un Islam quotidien accessible même quand on manque de temps ou de moyens : la chaleur humaine sincère est déjà une adoration récompensée.',
    authenticAlternativeSourceId: 'tirmidhi_1956',
    shareableCardText:
      '☀️ Hadith Authentique (Jâmi‘ at-Tirmidhî 1956) : « Ton sourire face à ton frère est pour toi une aumône. » — Vérifié sur Nur',
  },
  {
    id: 'fc_asr_sleep',
    shortLabel: '« Dormir après le ‘Asr fait perdre la raison »',
    viralClaim: 'Celui qui dort après la prière du ‘Asr et perd la raison ne doit s’en prendre qu’à lui-même',
    status: 'UNAUTHENTIC',
    statusBadge: '🔴 Récit forgé / très faible (Mawdû‘)',
    muhaddithVerdict: 'Classé forgé ou extrêmement faible par Ibn al-Jawzî, Adh-Dhahabî, As-Suyûtî et Al-Albânî (As-Silsilah ad-Da‘îfah n° 39).',
    gentleExplanation:
      'Rassure-toi totalement (et rassure tes proches !) : si tu rentres épuisé du travail ou des cours en fin d’après-midi et que tu as besoin d’une sieste après avoir prié le ‘Asr, il n’y a aucun péché ni danger religieux. L’Imam Al-Layth ibn Sa‘d dormait lui-même après le ‘Asr pendant le Ramadan !',
    authenticAlternativeSourceId: 'bukhari_69',
    shareableCardText:
      '🌿 Rappel rassurant : Aucun hadith authentique n’interdit de se reposer après le ‘Asr. « Facilitez et ne rendez pas les choses difficiles » (Sahîh al-Bukhârî 69). — Vérifié sur Nur',
  },
];

export interface LiveAiDynamicAnswer {
  providerName: string;
  epistemicStatus: EpistemicStatus;
  epistemicBadgeLabel: string;
  epistemicDescription: string;
  empathyOpening: string;
  leadAnswer: string;
  bodyParagraphs: string[];
  citedSourceIds: string[];
  schoolComparison?: SchoolPosition[];
  microStep15s: string;
  redlineImamSheet?: {
    topic: string;
    contextQuestionsToPrepare: string[];
    generalEducationalNote: string;
  };
}

export interface FreeTextRouterResult {
  matchedScenario?: ChatScenario;
  crisisEmergency?: boolean;
  humbleLaAdri?: {
    query: string;
    explanation: string;
    relatedSourceId: string;
  };
}

/**
 * Retrieve top relevant canonical sources for RAG injection (shared client & server logic).
 */
export function retrieveRelevantCanonicalSources(rawQuery: string, limit = 5): CanonicalSource[] {
  const normalized = rawQuery
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const tokens = normalized.split(/[^a-z0-9]+/).filter((t) => t.length > 2);

  const scored = Object.values(CANONICAL_SOURCES).map((src) => {
    let score = 0;
    const haystack = `${src.title} ${src.frenchTranslation} ${src.scholarInfo} ${src.keywords.join(' ')}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    for (const kw of src.keywords) {
      if (normalized.includes(kw)) score += 5;
    }
    for (const tok of tokens) {
      if (haystack.includes(tok)) score += 2;
    }
    return { src, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const top = scored.filter((s) => s.score > 0).slice(0, limit).map((s) => s.src);
  if (top.length > 0) return top;

  // Always provide core foundational sources if query is very general
  return [
    CANONICAL_SOURCES.bukhari_69,
    CANONICAL_SOURCES.quran_2_286,
    CANONICAL_SOURCES.quran_94_5_6,
    CANONICAL_SOURCES.bukhari_6464,
  ];
}

export function routeUserQuestion(rawInput: string): FreeTextRouterResult {
  const q = rawInput.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  if (
    q.includes('suicid') ||
    q.includes('mourir') ||
    q.includes('plus envie de vivre') ||
    q.includes('me faire du mal') ||
    q.includes('en finir')
  ) {
    return { crisisEmergency: true };
  }

  if (
    q.includes('divorc') ||
    q.includes('talaq') ||
    q.includes('khul') ||
    q.includes('heritag') ||
    q.includes('succession') ||
    q.includes('takfir') ||
    q.includes('mecreant') ||
    q.includes('apostas')
  ) {
    return { matchedScenario: CHAT_SCENARIOS.find((s) => s.id === 'q_divorce_redline') };
  }

  if (
    q.includes('doute') ||
    q.includes('waswas') ||
    q.includes('refai') ||
    q.includes('toc') ||
    q.includes('obsess') ||
    (q.includes('ablution') && (q.includes('peur') || q.includes('sur')))
  ) {
    return { matchedScenario: CHAT_SCENARIOS.find((s) => s.id === 'q_waswas') };
  }

  if (
    (q.includes('touch') || q.includes('embrass') || q.includes('main') || q.includes('conjoint') || q.includes('epous') || q.includes('mari') || q.includes('femme')) &&
    (q.includes('ablution') || q.includes('wudu') || q.includes('oudou'))
  ) {
    return { matchedScenario: CHAT_SCENARIOS.find((s) => s.id === 'q_wudu_touch') };
  }

  if (
    q.includes('reveil') ||
    q.includes('fajr') ||
    q.includes('subh') ||
    q.includes('oubli') ||
    q.includes('rattrap') ||
    q.includes('rate')
  ) {
    return { matchedScenario: CHAT_SCENARIOS.find((s) => s.id === 'q_missed_prayer') };
  }

  if (q.includes('voyag') || q.includes('deplac') || q.includes('train') || q.includes('avion') || q.includes('raccourc') || q.includes('regroup')) {
    return { matchedScenario: CHAT_SCENARIOS.find((s) => s.id === 'q_travel') };
  }

  if (
    q.includes('anxie') ||
    q.includes('stress') ||
    q.includes('angoiss') ||
    q.includes('flemme') ||
    q.includes('fatigu') ||
    q.includes('trist') ||
    q.includes('travail') ||
    q.includes('peur') ||
    q.includes('coeur') ||
    q.includes('motivation')
  ) {
    return { matchedScenario: CHAT_SCENARIOS.find((s) => s.id === 'q_anxiety') };
  }

  return {
    humbleLaAdri: {
      query: rawInput,
      explanation:
        'Mode Corpus Local actif : aucune clé API LLM n’étant encore connectée, Nur active sa règle de sécurité « Lâ adrî » (Zéro Invention hors sources certifiées). Dès que tu ajoutes ta clé API (Gemini gratuite, OpenAI, Claude ou Groq) sur Vercel — ou dans le bouton « Connecter IA Live » en haut du Chat — le moteur théologique complet répond en temps réel à toutes les questions !',
      relatedSourceId: 'bukhari_69',
    },
  };
}
