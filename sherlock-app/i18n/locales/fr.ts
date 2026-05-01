// ═══════════════════════════════════════════════════════════════
//  Locale FR — toutes les chaînes UI
// ═══════════════════════════════════════════════════════════════

export const fr = {
  // Common
  common: {
    next: 'Suivant',
    previous: 'Précédent',
    validate: 'Valider',
    cancel: 'Annuler',
    save: 'Sauvegarder',
    back: 'Retour',
    close: 'Fermer',
    ok: 'OK',
    yes: 'Oui',
    no: 'Non',
    skip: 'Passer',
    seeProfile: 'Voir le profil complet →',
    restart: 'Recommencer',
    loading: 'Chargement…',
  },

  // Tabs
  tabs: {
    home: 'Accueil',
    quiz: 'Quiz',
    profiles: 'Profils',
    celebrities: 'Testez-vous',
    duo: 'Duo',
  },

  // Home screen
  home: {
    eyebrow: 'Le compagnon de lecture',
    heroTitle: "On a tous besoin\nde quelqu'un d'autre",
    heroSubtitle: 'Le voyage intérieur de deux parents imparfaits',
    introHello: 'Bonjour,',
    introP1: "Je m'appelle Thomas. Je suis père de deux enfants, et comme vous, j'ai longtemps eu le sentiment de ne pas comprendre ce qui se passait dans la tête de mes enfants — pourquoi l'un se braque quand je le cadre, pourquoi l'autre se replie quand je crois bien faire.",
    introP2Pre: "Et moi c'est Solène, leur mère. J'ai d'abord cru que mon amour suffirait à les comprendre. Puis j'ai accepté cette évidence si difficile : ",
    introP2Italic: 'nos enfants ne sont pas nous',
    introP2Post: ". Ils ne ressentent pas le monde comme nous, ne sont pas nourris par les mêmes choses, ne souffrent pas pour les mêmes raisons.",
    introP3: "Nous avons écrit ce livre — qui sort bientôt — et conçu cette application pour partager un outil qui nous a beaucoup aidés : l'Ennéagramme. Ce n'est pas l'unique manière de comprendre nos enfants, et il a ses défauts. Mais il ouvre une porte.",
    introP4: "Les quatre outils ci-dessous ne sont pas des tests à valider, ni des étiquettes à coller. Ce sont des invitations — à observer votre enfant autrement, à interroger vos propres réflexes, à entamer le dialogue. Prenez ce qui vous parle, laissez le reste. Et surtout, n'oubliez jamais qu'aucun livre, aucune app, ne remplacera votre regard d'amour sur lui.",
    introSignature: '— Thomas & Solène',
    toolsLabel: 'Les outils',
    chaptersTitle: 'Chapitres du livre',
    chaptersOpen: 'Ouvrir la table des matières',
    chaptersClose: 'Fermer la table des matières',
  },

  // Tool cards (home screen)
  tools: {
    quizTitle: 'Quiz',
    quizDesc: 'Découvrez votre profil — ou celui de votre enfant — en quelques minutes.',
    profilesTitle: 'Profils',
    profilesDesc: "Explorez les 9 types de l'Ennéagramme et leurs nuances (ailes incluses).",
    celebritiesTitle: 'Testez-vous',
    celebritiesDesc: "Les Dossiers Sherlock : apprenez à reconnaître les profils en jouant.",
    duoTitle: 'Duo',
    duoDesc: 'Découvrez la dynamique entre deux profils, dans tous les contextes.',
  },

  // Quiz: subject selection
  subject: {
    title: 'Quel test souhaitez-vous faire ?',
    subtitle: "Le quiz s'adapte au fur et à mesure de vos réponses pour identifier le profil le plus probable.",
    childTitle: 'Mon enfant',
    childDesc: 'Vous répondez pour votre enfant ou votre ado',
    selfTitle: 'Moi-même',
    selfDesc: 'Auto-évaluation pour adulte',
    history: 'Voir l\'historique',
  },

  // Quiz: age picker
  age: {
    title: 'Quel âge a votre enfant ?',
    subtitle: "Les questions et le langage seront adaptés à sa tranche d'âge.",
    band58: '5 - 8 ans',
    band58Desc: "Petite enfance / début d'école élémentaire",
    band912: '9 - 12 ans',
    band912Desc: "Fin d'élémentaire / début de collège",
    band1317: '13 - 17 ans',
    band1317Desc: 'Adolescence',
  },

  // Quiz: pages
  quiz: {
    likertPhase: 'SCAN LIBRE',
    budgetPhase: 'HIÉRARCHIE',
    finalPhase: 'DÉPARTAGE',
    wingPhase: 'AILE',
    likertSubtitle1: 'Pour chaque affirmation, à quel point ça vous ressemble ?',
    likertSubtitleN: 'On continue — glissez chaque curseur selon votre perception.',
    likertHint: 'Curseur au centre = sans avis. À droite si ça vous ressemble, à gauche si non.',
    budgetSubtitle: 'Répartissez 10 points sur ces affirmations',
    budgetHint: "Vous pouvez aller en négatif (jusqu'à −3) pour retirer du signal. Chaque point consomme du budget.",
    finalSubtitle: 'Départagez vos finalistes',
    finalHint: 'Chaque affirmation représente un des types en tête. 6 points pour trancher.',
    wingTitle: 'Type {{topType}} — quelle teinte ?',
    wingHint: 'Deux ailes possibles pour le {{topType}} : aile {{w1}} ou aile {{w2}}. Celle qui vous parle le plus l\'emporte.',
    wingPhaseLabel: 'DERNIÈRE ÉTAPE · AILE',
    nextPage: 'Page suivante →',
    seeProfile: 'Voir mon profil →',
    budgetUsed: 'Budget à distribuer',
    confidence: 'Confiance',
    confidenceResult: 'Confiance du résultat',
  },

  // Result
  result: {
    profileLabel: 'VOTRE PROFIL',
    subjectChild: 'Profil de votre enfant',
    subjectAdult: 'Votre profil',
    subjectAdo: 'Ton profil',
    type: 'Type',
    typeProb: 'Probablement Type {{n}}',
    confidenceVal: '{{pct}}%',
    confidence: 'de correspondance',
    insightLabel: '💡 Notre lecture',
    topThree: 'Les 3 types les plus marqués',
    typeOverview: '{{name}} — aperçu',
    fearLabel: 'Peur racine :',
    motiveLabel: 'Motivation :',
    compulLabel: 'Compulsion :',
    chipWings: 'Ailes : {{a}} & {{b}}',
    chipStress: 'Sous stress → {{t}}',
    chipInteg: 'En intégration → {{t}}',
    actionsViewProfile: 'Voir le profil complet →',
    actionsSave: '💾 Sauvegarder le profil de cet enfant',
    actionsNew: '👨‍👩‍👧 Faire le quiz pour un autre enfant',
    actionsReset: 'Refaire le quiz',
    confidenceVeryHigh: 'Très confiant',
    confidenceHigh: 'Confiant',
    confidenceMid: 'Plutôt confiant',
    confidenceLow: 'À préciser',
    confidenceLabel: 'Confiance du résultat',
    wingDetected: 'Aile détectée',
    wingTagShort: 'aile',
    wingDescription: 'Combinaison {{top}} avec une teinte forte de {{wing}}. Voir l\'aile dans la section Profils pour le détail complet.',
    wingIndeterminate: 'Aile indéterminée',
  },

  // Save profile screen
  saveProfile: {
    title: 'Pour qui était ce quiz ?',
    subtitle: "Sauvegarder le profil vous permettra de suivre l'évolution dans le temps.",
    addToExisting: 'Ajouter à un profil existant',
    createNew: 'Ou créer un nouveau profil',
    namePlaceholder: 'Prénom',
    agePlaceholder: 'Âge (optionnel)',
    save: 'Sauvegarder',
  },

  // History
  history: {
    title: 'Historique des profils',
    empty: "Aucun profil sauvegardé pour l'instant.",
    nbTests: '{{n}} tests',
    nbTest: '{{n}} test',
    last: 'dernier : Type {{t}}',
    stable: '✓ Profil stable sur {{n}} test(s)',
    evolution: '⚡ Évolution observée : Type {{from}} → Type {{to}}',
  },

  // Account / settings
  account: {
    title: 'Mon compte',
    languageSection: 'Langue',
    languageAuto: 'Automatique (langue du téléphone)',
    languageFr: 'Français',
    languageEn: 'English',
  },

  // Profiles list page
  profilesList: {
    title: "Les 9 profils de l'Ennéagramme",
    subtitle: 'Découvrez chaque type pour mieux comprendre votre enfant',
  },

  // Profile detail page
  profile: {
    notFound: 'Profil introuvable.',
    pageTitle: 'Profil',
    portraitTitle: 'Portrait',
    mechanicsTitle: 'La mécanique intérieure',
    beliefLabel: 'SA CROYANCE RACINE',
    identityLabel: 'Son identité :',
    compulsionLabel: 'SA COMPULSION',
    virtueLabel: 'SA VERTU',
    pathToFreedom: '↓ chemin de libération ↓',
    liberatedTitle: 'Quand il se libère',
    arrowsTitle: 'Intégration & Désintégration',
    integrationToward: 'Intégration vers le type {{n}}',
    disintegrationToward: 'Désintégration vers le type {{n}}',
    keysTitle: 'Trois clés pour accompagner votre enfant',
    age58: 'De 5 à 8 ans',
    age812: 'De 8 à 12 ans',
    age1316: 'De 13 à 16 ans',
  },

  // Banner for sections only available in French (Profiles content, Duo, Case files)
  enComingSoon: {
    label: 'EN CONTENU EN ANGLAIS À VENIR',
    text: 'Cette section est encore disponible uniquement en français. La traduction anglaise est en cours.',
  },
};

export type LocaleKeys = typeof fr;
