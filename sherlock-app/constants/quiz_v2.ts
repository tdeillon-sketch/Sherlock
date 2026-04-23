// ═══════════════════════════════════════════════════════════════
//  QUIZ V2 — ADAPTIVE ENGINE
//  4 banques (5-8, 9-12, 13-17, adulte) × ~25 questions
//  3 phases: positioning → adaptive → validation
// ═══════════════════════════════════════════════════════════════
//
//  Architecture rappel :
//   - 2 modes utilisateurs : 'enfant' (parent répond pour son enfant)
//                            et 'self' (auto-évaluation adulte)
//   - 'enfant' demande l'âge → route vers la bonne tranche
//   - Les questions de positionnement (4 fixes) ouvrent le jeu en
//     identifiant rapidement centre + style social
//   - Les questions adaptatives sont sélectionnées par entropie sur
//     les 4 types candidats restants (cf. useAdaptiveQuiz.ts)
//   - Une question de validation finale teste le type leader
// ═══════════════════════════════════════════════════════════════

export type EnneaType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type TypeWeights = Partial<Record<EnneaType, number>>;

export type AgeBand = '5-8' | '9-12' | '13-17' | 'adulte';
export type QuizSubject = 'enfant' | 'self';

export type AdaptivePhase = 'positioning' | 'adaptive' | 'validation';

export type QuestionFormat =
  | 'choice'              // MCQ classique 2-4 options
  | 'forced_choice'       // Choix forcé entre 2 options toutes deux séduisantes
  | 'slider'              // Échelle -2..+2 entre deux pôles
  | 'scenario_complete'   // Compléter une phrase dans une scène
  | 'memory'              // « Pensez à un moment où… »
  | 'validation';         // « Cette description vous parle ? » sur un type donné

export interface AdaptiveOption {
  text: string;
  emoji?: string;
  scores: TypeWeights;
}

export interface AdaptiveQuestion {
  id: string;
  ageBand: AgeBand;
  phase: AdaptivePhase;
  format: QuestionFormat;
  category: string;
  /** Texte d'ambiance affiché en italique au-dessus de la question */
  setup?: string;
  /** La question elle-même */
  prompt: string;
  /** Emoji décoratif pour la scène */
  icon?: string;

  /** Pour choice / forced_choice / scenario_complete */
  options?: AdaptiveOption[];

  /** Pour slider */
  sliderLeft?: string;
  sliderRight?: string;
  sliderScores?: {
    low: TypeWeights;       // Réponse à -2
    mid?: TypeWeights;      // Réponse à 0 (optionnelle)
    high: TypeWeights;      // Réponse à +2
  };

  /** Pour validation : type testé + description */
  validationType?: EnneaType;
  validationText?: string;

  /** Types que cette question discrimine bien (utilisé par le moteur) */
  discriminates: EnneaType[];
}

// ═══════════════════════════════════════════════════════════════
//  HELPERS DE CONSTRUCTION
// ═══════════════════════════════════════════════════════════════

const w = (...pairs: [EnneaType, number][]): TypeWeights => {
  const r: TypeWeights = {};
  pairs.forEach(([t, v]) => { r[t] = v; });
  return r;
};

// ═══════════════════════════════════════════════════════════════
//  VALIDATION QUESTIONS — descriptions par type
//  Format : « Cette description vous parle ? »
//  Réponses : Oui (+5 sur le type) / À peu près (+2) / Non (-3)
//  ⚠️  Doit être déclaré AVANT les banques qui appellent
//      buildValidationsForChild / buildValidationsForAdulte
// ═══════════════════════════════════════════════════════════════

interface ValidationDescription {
  type: EnneaType;
  text: string;
}

const VALIDATIONS_CHILD: Record<AgeBand, ValidationDescription[]> = {
  '5-8': [
    { type: 1, text: "C'est un petit juge : il remarque les injustices, il aime quand c'est fait « bien », il a déjà des règles à lui sur ce qui se fait ou pas." },
    { type: 2, text: "C'est un petit cœur : il vous fait des cadeaux, il console les copains, il sent quand vous êtes triste et insiste pour vous aider." },
    { type: 3, text: "C'est un petit champion : il aime briller, montrer ce qu'il sait faire, et il est très sensible aux compliments comme aux comparaisons." },
    { type: 4, text: "C'est un petit poète : il a un monde imaginaire très riche, des sentiments intenses, et il se sent souvent un peu différent des autres." },
    { type: 5, text: "C'est un petit savant : il s'occupe seul, il observe en silence, il pose des questions précises sur comment marchent les choses." },
    { type: 6, text: "C'est un petit prudent : il a beaucoup de questions « et si… », il a besoin de rituels rassurants, il vérifie souvent que vous êtes là." },
    { type: 7, text: "C'est un petit aventurier : toujours en mouvement, plein d'idées, il enchaîne les activités et déteste s'ennuyer ou rester en place." },
    { type: 8, text: "C'est un petit chef : il sait ce qu'il veut, il défend les plus faibles, il dit non haut et fort et n'a pas peur de l'autorité." },
    { type: 9, text: "C'est un petit sage : il est facile, accommodant, il évite les conflits, il s'adapte au groupe et a parfois du mal à choisir." },
  ],
  '9-12': [
    { type: 1, text: "Il a un fort sens du juste et de l'injuste, il s'applique beaucoup en classe, il peut être dur avec lui-même quand il rate quelque chose." },
    { type: 2, text: "Il est attentif aux autres, généreux, il aime aider et plaire — mais il peut aussi en vouloir quand on ne reconnaît pas son aide." },
    { type: 3, text: "Il aime réussir, briller, être valorisé. Il sait s'adapter à différents groupes pour y trouver sa place et soigne son image." },
    { type: 4, text: "Il a un monde intérieur très riche, des émotions intenses, il se sent souvent décalé et a quelques amis très proches plutôt qu'une bande." },
    { type: 5, text: "Il est plutôt solitaire, observateur, il a une passion qu'il approfondit beaucoup et n'aime pas qu'on entre dans sa bulle." },
    { type: 6, text: "Il est loyal et inquiet : il pose beaucoup de questions « et si », il a besoin d'être rassuré et de comprendre les règles." },
    { type: 7, text: "Il est enthousiaste, drôle, plein d'idées et de projets, mais il a du mal à finir et peut éviter ce qui le contrarie." },
    { type: 8, text: "Il a un fort caractère, il assume son désaccord, il défend son territoire et peut prendre la place du chef dans son groupe." },
    { type: 9, text: "Il est doux, conciliant, il évite les conflits et s'adapte au groupe — parfois au point d'oublier ce qu'il veut vraiment." },
  ],
  '13-17': [
    { type: 1, text: "Il a un sens aigu du devoir et de la justice. Il peut être très dur avec lui-même, militant, et critique envers les incohérences des adultes." },
    { type: 2, text: "Il est tourné vers les autres, généreux, sensible aux relations. Il peut s'oublier pour aider et en vouloir secrètement quand on ne le reconnaît pas." },
    { type: 3, text: "Il vise haut, sait s'adapter, soigne son image. Sa valeur passe par la performance ; il cache ses fragilités et déteste l'échec." },
    { type: 4, text: "Il vit ses émotions de manière très intense, se sent profond et différent. Il oscille entre éclats créatifs et phases sombres / mélancoliques." },
    { type: 5, text: "Il est cérébral, indépendant, observateur. Il protège sa bulle, ses passions, son énergie ; les contacts sociaux le fatiguent vite." },
    { type: 6, text: "Il est loyal, prudent, parfois angoissé. Il analyse les risques, doute, cherche des figures de référence ou peut au contraire les contester." },
    { type: 7, text: "Il est dynamique, plein de projets et d'envies. Il fuit l'ennui et la douleur en multipliant les options et a du mal à se poser." },
    { type: 8, text: "Il est fort, frontal, autonome. Il défend les siens, n'a pas peur du conflit et peut être autoritaire ou intimidant sans s'en rendre compte." },
    { type: 9, text: "Il est calme, accommodant, il évite les conflits. Il peut s'effacer, procrastiner, être présent corporellement mais absent émotionnellement." },
  ],
  'adulte': [], // Non utilisé — adulte a sa propre fonction
};

const VALIDATIONS_ADULTE: ValidationDescription[] = [
  { type: 1, text: "Vous avez une exigence forte d'intégrité et de justesse. Une voix critique intérieure scrute ce qui n'est pas droit en vous et autour. Vous pouvez vivre votre colère sous forme de tension contenue plutôt que d'éclat." },
  { type: 2, text: "Vous êtes attentif aux besoins des autres, vous donnez naturellement, vous vous sentez utile dans la relation. Mais vous pouvez vous oublier — et en vouloir secrètement quand on ne reconnaît pas ce que vous donnez." },
  { type: 3, text: "Vous êtes orienté résultats, vous savez vous adapter à différents publics, vous soignez l'image que vous renvoyez. Vous accédez plus facilement à la performance qu'à vos émotions profondes." },
  { type: 4, text: "Vous vivez intensément, vous vous sentez différent, sensible, profond. Vous oscillez entre élans créatifs et mélancolie ; vous cherchez l'authentique et fuyez le superficiel." },
  { type: 5, text: "Vous êtes cérébral, observateur, économe de votre énergie. Vous protégez votre intimité, vous accumulez des connaissances, vous préférez observer avant d'agir." },
  { type: 6, text: "Vous êtes loyal, vigilant, parfois anxieux. Vous anticipez ce qui pourrait mal tourner, vous cherchez des points d'ancrage (cadre, autorité, équipe) — ou au contraire vous contestez ces autorités par méfiance." },
  { type: 7, text: "Vous êtes enthousiaste, multi-tâches, en quête d'expériences. Vous fuyez l'ennui et la douleur en gardant des options ouvertes ; vous avez du mal à vous engager dans la durée." },
  { type: 8, text: "Vous êtes direct, énergique, autonome. Vous protégez les vôtres, vous n'avez pas peur du conflit, vous prenez naturellement les commandes — parfois trop." },
  { type: 9, text: "Vous êtes calme, conciliant, vous cherchez l'harmonie. Vous évitez les conflits, vous vous adaptez aux autres, parfois au point d'oublier ou de ne plus savoir ce que VOUS voulez vraiment." },
];

function buildValidationsForChild(ageBand: AgeBand): AdaptiveQuestion[] {
  return VALIDATIONS_CHILD[ageBand].map((v): AdaptiveQuestion => ({
    id: `v_${ageBand}_t${v.type}`,
    ageBand,
    phase: 'validation',
    format: 'validation',
    category: 'Validation',
    prompt: 'Cette description vous parle pour votre enfant ?',
    setup: undefined,
    icon: '🔍',
    validationType: v.type,
    validationText: v.text,
    discriminates: [v.type],
  }));
}

function buildValidationsForAdulte(): AdaptiveQuestion[] {
  return VALIDATIONS_ADULTE.map((v): AdaptiveQuestion => ({
    id: `v_adulte_t${v.type}`,
    ageBand: 'adulte',
    phase: 'validation',
    format: 'validation',
    category: 'Validation',
    prompt: 'Cette description vous parle ?',
    setup: undefined,
    icon: '🔍',
    validationType: v.type,
    validationText: v.text,
    discriminates: [v.type],
  }));
}

// ═══════════════════════════════════════════════════════════════
//  BANQUE 5-8 ANS (parent répond pour l'enfant)
// ═══════════════════════════════════════════════════════════════

export const BANK_5_8: AdaptiveQuestion[] = [
  // ── POSITIONING (4) ──────────────────────────────────────────
  {
    id: 'p58_center',
    ageBand: '5-8', phase: 'positioning', format: 'choice',
    category: 'Comment il réagit au monde',
    setup: "Quand votre enfant découvre une situation nouvelle (un nouveau lieu, des inconnus, une consigne)…",
    prompt: 'Quelle est sa première réaction, le plus souvent ?',
    icon: '🌍',
    options: [
      { text: 'Il observe en silence avant de bouger', emoji: '👀', scores: w([5, 3], [4, 2], [9, 1]) },
      { text: 'Il cherche votre regard ou celui d\'un adulte', emoji: '🤝', scores: w([2, 2], [6, 3], [3, 1]) },
      { text: 'Il y va, prend de la place, teste', emoji: '⚡', scores: w([7, 2], [8, 3], [3, 1]) },
    ],
    discriminates: [3, 5, 7, 8, 9],
  },
  {
    id: 'p58_social',
    ageBand: '5-8', phase: 'positioning', format: 'forced_choice',
    category: 'Style social',
    setup: "À l'anniversaire d'un copain, beaucoup d'enfants, beaucoup de bruit…",
    prompt: 'Vous le voyez plutôt :',
    icon: '🎂',
    options: [
      { text: 'Au centre, à organiser un jeu ou faire rire', emoji: '🎤', scores: w([3, 2], [7, 2], [8, 2]) },
      { text: 'En retrait, près d\'un adulte ou d\'un seul ami', emoji: '🪑', scores: w([4, 2], [5, 2], [9, 2]) },
    ],
    discriminates: [3, 4, 5, 7, 8, 9],
  },
  {
    id: 'p58_emotion',
    ageBand: '5-8', phase: 'positioning', format: 'choice',
    category: 'Émotions',
    setup: "Quand quelque chose le contrarie vraiment…",
    prompt: 'Comment ça se voit, la plupart du temps ?',
    icon: '😤',
    options: [
      { text: 'Il explose : il crie, claque, s\'oppose frontalement', emoji: '🔥', scores: w([8, 3], [6, 1]) },
      { text: 'Il se tait, se replie, on doit aller le chercher', emoji: '🐚', scores: w([4, 2], [5, 2], [9, 3]) },
      { text: 'Il pleure beaucoup, il a besoin d\'être consolé', emoji: '💧', scores: w([2, 2], [4, 2], [6, 1]) },
      { text: 'Il « fait comme si de rien n\'était » et change de sujet', emoji: '🎭', scores: w([3, 2], [7, 3]) },
    ],
    discriminates: [2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'p58_rules',
    ageBand: '5-8', phase: 'positioning', format: 'slider',
    category: 'Rapport aux règles',
    setup: "Sur les règles de la maison (ranger, dire bonjour, l'heure du coucher)…",
    prompt: 'Plutôt :',
    icon: '📏',
    sliderLeft: 'Très scrupuleux, il rappelle même les règles aux autres',
    sliderRight: 'Plutôt rebelle, il négocie ou contourne dès qu\'il peut',
    sliderScores: {
      low: w([1, 3], [6, 2]),
      high: w([7, 2], [8, 3], [4, 1]),
    },
    discriminates: [1, 4, 6, 7, 8],
  },

  // ── ADAPTIVE (12) ────────────────────────────────────────────
  {
    id: 'a58_jouet',
    ageBand: '5-8', phase: 'adaptive', format: 'scenario_complete',
    category: 'Quotidien',
    setup: "Vous lui offrez un jouet qu'il ne connaissait pas. Première chose qu'il fait :",
    prompt: 'Il…',
    icon: '🎁',
    options: [
      { text: '…remercie chaleureusement et vient vous montrer comment il joue', emoji: '🤗', scores: w([2, 3], [3, 1]) },
      { text: '…s\'isole pour le démonter et comprendre comment ça marche', emoji: '🔍', scores: w([5, 3], [1, 1]) },
      { text: '…demande tout de suite si on peut jouer ensemble', emoji: '👫', scores: w([6, 2], [9, 2]) },
      { text: '…l\'utilise d\'une manière inattendue, à sa façon', emoji: '🎨', scores: w([4, 2], [7, 2]) },
    ],
    discriminates: [2, 3, 4, 5, 6, 7, 9],
  },
  {
    id: 'a58_perte',
    ageBand: '5-8', phase: 'adaptive', format: 'choice',
    category: 'Frustration',
    setup: "Il perd à un jeu de société en famille…",
    prompt: 'Sa réaction typique :',
    icon: '🎲',
    options: [
      { text: 'Il en veut à lui-même : « j\'ai été nul »', scores: w([1, 3], [4, 1]) },
      { text: 'Il en veut aux autres ou triche un peu', scores: w([8, 2], [3, 1]) },
      { text: 'Il rit, propose une revanche tout de suite', scores: w([7, 3], [9, 1]) },
      { text: 'Il s\'éloigne, fait la moue longtemps', scores: w([4, 3], [5, 1]) },
    ],
    discriminates: [1, 3, 4, 5, 7, 8, 9],
  },
  {
    id: 'a58_help',
    ageBand: '5-8', phase: 'adaptive', format: 'forced_choice',
    category: 'Avec les autres',
    setup: "Un copain pleure dans la cour…",
    prompt: 'Plus probablement :',
    icon: '😢',
    options: [
      { text: 'Il va le consoler tout de suite, même s\'il ne le connaît pas bien', emoji: '🫂', scores: w([2, 3], [6, 1]) },
      { text: 'Il regarde mais reste à distance, attend de voir', emoji: '👁️', scores: w([5, 2], [9, 2], [4, 1]) },
    ],
    discriminates: [2, 4, 5, 6, 9],
  },
  {
    id: 'a58_imagi',
    ageBand: '5-8', phase: 'adaptive', format: 'slider',
    category: 'Monde intérieur',
    setup: "Sur son monde imaginaire (jeux symboliques, doudous, scénarios inventés)…",
    prompt: 'Plutôt :',
    icon: '🦄',
    sliderLeft: 'Très ancré dans le réel, peu d\'imaginaire',
    sliderRight: 'Vit beaucoup dans son monde, riches scénarios',
    sliderScores: {
      low: w([1, 1], [3, 2], [8, 2]),
      high: w([4, 3], [5, 2], [7, 1]),
    },
    discriminates: [1, 3, 4, 5, 7, 8],
  },
  {
    id: 'a58_attention',
    ageBand: '5-8', phase: 'adaptive', format: 'choice',
    category: 'Besoin de vous',
    setup: "Quand vous êtes occupé(e) (téléphone, autre enfant, cuisine)…",
    prompt: 'Comment réclame-t-il votre attention ?',
    icon: '📞',
    options: [
      { text: 'Il vous apporte quelque chose ou vous propose son aide', scores: w([2, 3]) },
      { text: 'Il fait une bêtise ou monte le son pour exister', scores: w([8, 2], [7, 1], [3, 1]) },
      { text: 'Il s\'occupe seul, sans rien demander', scores: w([5, 3], [9, 2]) },
      { text: 'Il pose des questions répétées sur ce que vous faites', scores: w([6, 2], [5, 1]) },
    ],
    discriminates: [2, 3, 5, 6, 7, 8, 9],
  },
  {
    id: 'a58_classe',
    ageBand: '5-8', phase: 'adaptive', format: 'choice',
    category: 'À l\'école',
    setup: "La maîtresse / le maître vous décrit votre enfant en classe…",
    prompt: 'Le mot qui revient le plus :',
    icon: '🏫',
    options: [
      { text: 'Sérieux, appliqué, soucieux de bien faire', scores: w([1, 3], [3, 1]) },
      { text: 'Sociable, drôle, énergique', scores: w([7, 3], [2, 1], [3, 1]) },
      { text: 'Discret, rêveur, dans sa bulle', scores: w([4, 2], [5, 2], [9, 2]) },
      { text: 'Leader, parfois impatient avec les autres', scores: w([8, 3], [3, 2]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 7, 8, 9],
  },
  {
    id: 'a58_choix',
    ageBand: '5-8', phase: 'adaptive', format: 'forced_choice',
    category: 'Décisions',
    setup: "Au glacier, deux parfums, il faut choisir vite…",
    prompt: 'Plutôt :',
    icon: '🍦',
    options: [
      { text: 'Il sait tout de suite ce qu\'il veut, sans hésiter', emoji: '⚡', scores: w([3, 1], [7, 2], [8, 3]) },
      { text: 'Il hésite, demande votre avis ou celui de la file', emoji: '🤷', scores: w([6, 3], [9, 2], [2, 1]) },
    ],
    discriminates: [2, 3, 6, 7, 8, 9],
  },
  {
    id: 'a58_peur',
    ageBand: '5-8', phase: 'adaptive', format: 'choice',
    category: 'Peur du noir',
    setup: "Il a peur la nuit (monstres, bruits, cauchemars)…",
    prompt: 'Le scénario le plus typique chez lui :',
    icon: '🌙',
    options: [
      { text: 'Il vient dans votre lit ou appelle plusieurs fois', scores: w([6, 3], [2, 1]) },
      { text: 'Il a inventé un rituel précis pour se rassurer (lampe, peluche, ordre exact)', scores: w([1, 2], [6, 2], [5, 1]) },
      { text: 'Il en parle peu, mais on voit qu\'il est tendu au coucher', scores: w([5, 3], [9, 2], [4, 1]) },
      { text: 'Il a peu de peurs visibles, il s\'endort vite', scores: w([7, 2], [8, 3], [9, 1]) },
    ],
    discriminates: [1, 2, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'a58_compli',
    ageBand: '5-8', phase: 'adaptive', format: 'choice',
    category: 'Compliments',
    setup: "Vous le complimentez sur quelque chose qu'il a fait…",
    prompt: 'Sa réaction la plus fréquente :',
    icon: '⭐',
    options: [
      { text: 'Il rayonne, en redemande, vous montre encore', scores: w([3, 3], [7, 1]) },
      { text: 'Il minimise, dit que ce n\'était pas si bien', scores: w([4, 2], [6, 1], [9, 2]) },
      { text: 'Il vous fait un câlin et vous dit merci', scores: w([2, 3]) },
      { text: 'Il hausse les épaules, semble à peine entendre', scores: w([5, 2], [8, 2]) },
    ],
    discriminates: [2, 3, 4, 5, 7, 8, 9],
  },
  {
    id: 'a58_ordre',
    ageBand: '5-8', phase: 'adaptive', format: 'slider',
    category: 'Sa chambre',
    setup: "L'état naturel de sa chambre / son coin :",
    prompt: 'Plutôt :',
    icon: '🧸',
    sliderLeft: 'Très rangé, il sait où est chaque chose',
    sliderRight: 'Joyeux désordre permanent, ça lui va bien',
    sliderScores: {
      low: w([1, 3], [5, 1], [3, 1]),
      high: w([4, 1], [7, 3], [9, 1]),
    },
    discriminates: [1, 3, 4, 5, 7, 9],
  },
  {
    id: 'a58_partage',
    ageBand: '5-8', phase: 'adaptive', format: 'choice',
    category: 'Partage',
    setup: "Un autre enfant veut son jouet préféré…",
    prompt: 'Le plus probablement :',
    icon: '🤲',
    options: [
      { text: 'Il refuse net, défend son territoire', scores: w([8, 3], [5, 1]) },
      { text: 'Il accepte pour ne pas faire d\'histoires, même à contrecœur', scores: w([9, 3], [6, 1], [2, 1]) },
      { text: 'Il prête volontiers, content de faire plaisir', scores: w([2, 3], [7, 1]) },
      { text: 'Il propose un autre jouet ou une règle d\'échange', scores: w([3, 2], [1, 2], [6, 1]) },
    ],
    discriminates: [1, 2, 5, 6, 7, 8, 9],
  },
  {
    id: 'a58_questions',
    ageBand: '5-8', phase: 'adaptive', format: 'choice',
    category: 'Curiosité',
    setup: "Il pose des questions toute la journée. Le type de question qui revient le plus :",
    prompt: 'Plutôt :',
    icon: '❓',
    options: [
      { text: '« Comment ça marche ? Pourquoi c\'est comme ça ? »', scores: w([5, 3]) },
      { text: '« Et si jamais… ? Et si ça se passait mal ? »', scores: w([6, 3]) },
      { text: '« On fait quoi après ? Et après ? Et après ? »', scores: w([7, 3]) },
      { text: '« C\'est juste, ça ? Pourquoi lui il a le droit ? »', scores: w([1, 3], [8, 1]) },
    ],
    discriminates: [1, 5, 6, 7, 8],
  },

  // ── VALIDATION (9) ───────────────────────────────────────────
  // Une question par type. Le moteur en pioche UNE seule, sur le type leader.
  ...buildValidationsForChild('5-8'),
];

// ═══════════════════════════════════════════════════════════════
//  BANQUE 9-12 ANS (parent répond pour l'enfant)
// ═══════════════════════════════════════════════════════════════

export const BANK_9_12: AdaptiveQuestion[] = [
  // ── POSITIONING (4) ──────────────────────────────────────────
  {
    // See note on pad_center — we now target the spontaneous *emotional
    // reaction* rather than the conscious decision style.
    id: 'p912_center',
    ageBand: '9-12', phase: 'positioning', format: 'choice',
    category: 'Centre dominant',
    setup: "Quand quelque chose contrarie votre enfant (un conflit, une frustration, une déception)…",
    prompt: 'Quelle est sa première réaction, avant même qu\'il y réfléchisse ?',
    icon: '🧭',
    options: [
      { text: 'Il s\'inquiète, imagine le pire, pose plein de questions', emoji: '😰', scores: w([5, 3], [6, 3], [7, 2]) },
      { text: 'Il est blessé, se referme, se sent incompris', emoji: '💔', scores: w([2, 3], [3, 2], [4, 3]) },
      { text: 'Il s\'agace, râle, veut que ça change tout de suite', emoji: '😤', scores: w([1, 2], [8, 3], [9, 2]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'p912_social',
    ageBand: '9-12', phase: 'positioning', format: 'forced_choice',
    category: 'Style social',
    setup: "Dans son groupe d'amis…",
    prompt: 'Quelle place prend-il, la plupart du temps ?',
    icon: '👥',
    options: [
      { text: 'Plutôt moteur : il propose, anime, entraîne', emoji: '🚀', scores: w([3, 3], [7, 2], [8, 3]) },
      { text: 'Plutôt en retrait : il suit, s\'adapte, observe', emoji: '🌿', scores: w([4, 2], [5, 3], [9, 3]) },
    ],
    discriminates: [3, 4, 5, 7, 8, 9],
  },
  {
    id: 'p912_stress',
    ageBand: '9-12', phase: 'positioning', format: 'choice',
    category: 'Sous pression',
    setup: "Quand il est sous pression (contrôle, dispute, deadline)…",
    prompt: 'Comment ça se manifeste le plus souvent ?',
    icon: '🌪️',
    options: [
      { text: 'Il devient rigide, contrôlant, critique envers lui ou les autres', scores: w([1, 3], [6, 1]) },
      { text: 'Il se déconnecte, rêvasse, traîne des pieds', scores: w([9, 3], [5, 2]) },
      { text: 'Il se replie, devient sombre, ressasse', scores: w([4, 3], [5, 1]) },
      { text: 'Il s\'agite, fuit dans une autre activité, plaisante', scores: w([7, 3], [3, 1]) },
      { text: 'Il devient cassant, hausse le ton, prend les commandes', scores: w([8, 3], [3, 2]) },
    ],
    discriminates: [1, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'p912_rules',
    ageBand: '9-12', phase: 'positioning', format: 'slider',
    category: 'Rapport à l\'autorité',
    setup: "Face aux consignes des adultes (parents, prof, coach)…",
    prompt: 'Plutôt :',
    icon: '⚖️',
    sliderLeft: 'Très conforme, il fait ce qu\'on lui dit',
    sliderRight: 'Très rebelle, il conteste systématiquement',
    sliderScores: {
      low: w([1, 2], [2, 2], [6, 3], [9, 1]),
      high: w([4, 1], [7, 1], [8, 3]),
    },
    discriminates: [1, 4, 6, 7, 8, 9],
  },

  // ── ADAPTIVE (13) ────────────────────────────────────────────
  {
    id: 'a912_devoirs',
    ageBand: '9-12', phase: 'adaptive', format: 'choice',
    category: 'Devoirs',
    setup: "Le rapport aux devoirs / au travail scolaire :",
    prompt: 'Le plus juste pour lui :',
    icon: '📚',
    options: [
      { text: 'Méticuleux, refait jusqu\'à ce que ce soit parfait', scores: w([1, 3]) },
      { text: 'Rapide et efficace, vise la bonne note avec le moins d\'effort', scores: w([3, 3], [7, 1]) },
      { text: 'Approfondit ce qui le passionne, néglige le reste', scores: w([5, 3], [4, 1]) },
      { text: 'Procrastine, puis bâcle, puis stresse', scores: w([7, 2], [9, 3]) },
      { text: 'A besoin qu\'on s\'asseye à côté pour s\'y mettre', scores: w([6, 2], [2, 1], [9, 1]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 7, 9],
  },
  {
    id: 'a912_amis',
    ageBand: '9-12', phase: 'adaptive', format: 'choice',
    category: 'Amitié',
    setup: "Sur le rapport à l'amitié :",
    prompt: 'Plutôt :',
    icon: '🫂',
    options: [
      { text: 'Quelques amis très proches, fidèles, exclusifs', scores: w([4, 2], [5, 2], [6, 3]) },
      { text: 'Beaucoup de copains, change vite de bande', scores: w([3, 2], [7, 3], [9, 1]) },
      { text: 'Un meilleur ami, un binôme presque fusionnel', scores: w([2, 3], [4, 2], [6, 1]) },
      { text: 'Plutôt seul, préfère ses activités à la fréquentation', scores: w([5, 3], [4, 1]) },
      { text: 'Leader d\'une petite bande qu\'il influence', scores: w([3, 2], [8, 3]) },
    ],
    discriminates: [2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'a912_conflit',
    ageBand: '9-12', phase: 'adaptive', format: 'choice',
    category: 'Conflit',
    setup: "Un copain le déçoit ou le trahit (mensonge, exclusion)…",
    prompt: 'Sa réponse typique :',
    icon: '⚔️',
    options: [
      { text: 'Il rumine, en parle pendant des semaines, garde rancune', scores: w([4, 3], [6, 2]) },
      { text: 'Il l\'affronte directement, parfois physiquement', scores: w([8, 3]) },
      { text: 'Il fait comme si de rien n\'était, évite la confrontation', scores: w([9, 3], [7, 1]) },
      { text: 'Il moralise : « Ça ne se fait pas, c\'est injuste »', scores: w([1, 3], [6, 1]) },
      { text: 'Il en parle à un adulte ou cherche des alliés', scores: w([6, 3], [2, 1]) },
    ],
    discriminates: [1, 2, 4, 6, 7, 8, 9],
  },
  {
    id: 'a912_argent',
    ageBand: '9-12', phase: 'adaptive', format: 'forced_choice',
    category: 'Argent de poche',
    setup: "Avec son argent de poche…",
    prompt: 'Plutôt :',
    icon: '💰',
    options: [
      { text: 'Il économise consciencieusement pour un projet précis', emoji: '🐷', scores: w([1, 2], [3, 2], [5, 2], [6, 2]) },
      { text: 'Il dépense vite, parfois pour offrir aux autres', emoji: '🎁', scores: w([2, 2], [4, 1], [7, 3], [8, 1]) },
    ],
    discriminates: [1, 2, 3, 5, 6, 7, 8],
  },
  {
    id: 'a912_corps',
    ageBand: '9-12', phase: 'adaptive', format: 'slider',
    category: 'Énergie corporelle',
    setup: "Son rapport à l'activité physique / au sport :",
    prompt: 'Plutôt :',
    icon: '⚽',
    sliderLeft: 'Pas très intéressé, plutôt cérébral / artistique',
    sliderRight: 'Toujours en mouvement, sport incontournable',
    sliderScores: {
      low: w([4, 2], [5, 3]),
      high: w([3, 2], [7, 2], [8, 3]),
    },
    discriminates: [3, 4, 5, 7, 8],
  },
  {
    id: 'a912_creatif',
    ageBand: '9-12', phase: 'adaptive', format: 'choice',
    category: 'Création',
    setup: "Sur la créativité (dessin, écriture, musique, jeux) :",
    prompt: 'Le plus juste :',
    icon: '🎨',
    options: [
      { text: 'Crée beaucoup, des univers très personnels et émotionnels', scores: w([4, 3], [7, 1]) },
      { text: 'Préfère reproduire / copier ce qui existe avec précision', scores: w([1, 2], [5, 2], [6, 1]) },
      { text: 'N\'aime pas trop, préfère le concret et l\'action', scores: w([3, 1], [8, 2], [9, 1]) },
      { text: 'Crée des spectacles, veut être vu, applaudi', scores: w([3, 3], [7, 2]) },
    ],
    discriminates: [1, 3, 4, 5, 7, 8, 9],
  },
  {
    id: 'a912_ecran',
    ageBand: '9-12', phase: 'adaptive', format: 'choice',
    category: 'Écrans',
    setup: "Devant un écran (tablette, télé, jeux vidéo) :",
    prompt: 'Plutôt :',
    icon: '📱',
    options: [
      { text: 'S\'absorbe complètement, difficile à décrocher', scores: w([5, 3], [9, 2], [7, 1]) },
      { text: 'Joue à plusieurs en ligne, parle fort dans le casque', scores: w([3, 1], [7, 3], [8, 2]) },
      { text: 'Suit les règles d\'écran sans drame', scores: w([1, 3], [6, 2], [9, 1]) },
      { text: 'Passe vite d\'une chose à l\'autre, zappe', scores: w([7, 3], [3, 1]) },
    ],
    discriminates: [1, 3, 5, 6, 7, 8, 9],
  },
  {
    id: 'a912_secret',
    ageBand: '9-12', phase: 'adaptive', format: 'choice',
    category: 'Communication',
    setup: "Sur ce qu'il vous dit de sa vie (école, copains, sentiments) :",
    prompt: 'Plutôt :',
    icon: '💬',
    options: [
      { text: 'Il raconte tout en détails, parfois trop', scores: w([2, 2], [7, 3]) },
      { text: 'Il ne dit presque rien spontanément, il faut tirer les vers du nez', scores: w([5, 3], [9, 2]) },
      { text: 'Il filtre : il dit ce qui le valorise, cache ce qui rate', scores: w([3, 3]) },
      { text: 'Il dit ce qui ne va pas, très expressivement', scores: w([4, 3], [2, 1]) },
      { text: 'Il a un copain ou un journal pour ça, pas vous', scores: w([4, 2], [5, 2]) },
    ],
    discriminates: [2, 3, 4, 5, 7, 9],
  },
  {
    id: 'a912_apparence',
    ageBand: '9-12', phase: 'adaptive', format: 'forced_choice',
    category: 'Apparence',
    setup: "Sur l'apparence (vêtements, coiffure, ce qu'on voit de lui) :",
    prompt: 'Plutôt :',
    icon: '👕',
    options: [
      { text: 'Très soigneux de l\'image qu\'il renvoie, attentif aux marques / au style', emoji: '✨', scores: w([3, 3], [4, 2]) },
      { text: 'S\'en fiche, met ce qui traîne, peu d\'intérêt pour le look', emoji: '🤷', scores: w([5, 3], [9, 2], [1, 1]) },
    ],
    discriminates: [1, 3, 4, 5, 9],
  },
  {
    id: 'a912_changement',
    ageBand: '9-12', phase: 'adaptive', format: 'choice',
    category: 'Imprévu',
    setup: "Vous changez les plans à la dernière minute (sortie annulée, nouveau programme)…",
    prompt: 'Sa réaction :',
    icon: '🔄',
    options: [
      { text: 'Ça le met en colère, il insiste pour qu\'on tienne le plan', scores: w([1, 2], [8, 3]) },
      { text: 'Il est anxieux : « Mais alors on fait quoi ? Et si… »', scores: w([6, 3], [5, 1]) },
      { text: 'Il s\'adapte tout de suite, voit la nouvelle option positivement', scores: w([7, 3], [9, 2], [2, 1]) },
      { text: 'Il est déçu, le montre longuement', scores: w([4, 3]) },
    ],
    discriminates: [1, 2, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'a912_compete',
    ageBand: '9-12', phase: 'adaptive', format: 'slider',
    category: 'Compétition',
    setup: "Son rapport à la compétition (jeux, sport, école) :",
    prompt: 'Plutôt :',
    icon: '🏆',
    sliderLeft: 'N\'aime pas, préfère coopérer ou ne pas jouer',
    sliderRight: 'Adore, vise la première place',
    sliderScores: {
      low: w([2, 2], [4, 1], [9, 3]),
      high: w([3, 3], [7, 1], [8, 2]),
    },
    discriminates: [2, 3, 4, 7, 8, 9],
  },
  {
    id: 'a912_aide',
    ageBand: '9-12', phase: 'adaptive', format: 'choice',
    category: 'À la maison',
    setup: "Sur les tâches à la maison (mettre la table, ranger) :",
    prompt: 'Plutôt :',
    icon: '🏠',
    options: [
      { text: 'Il propose spontanément, content d\'aider', scores: w([2, 3], [6, 1]) },
      { text: 'Il fait quand on demande, sans rechigner mais sans entrain', scores: w([9, 3], [1, 1]) },
      { text: 'Il rechigne, négocie, il faut insister chaque fois', scores: w([4, 1], [7, 2], [8, 2]) },
      { text: 'Il fait à sa manière, avec sa méthode (souvent meilleure)', scores: w([1, 2], [5, 2], [3, 1]) },
    ],
    discriminates: [1, 2, 3, 5, 6, 7, 8, 9],
  },
  {
    id: 'a912_punition',
    ageBand: '9-12', phase: 'adaptive', format: 'choice',
    category: 'Limites',
    setup: "Quand on doit le réprimander pour quelque chose…",
    prompt: 'Sa réaction la plus typique :',
    icon: '🛑',
    options: [
      { text: 'Il s\'effondre, se sent nul, s\'auto-flagelle', scores: w([1, 2], [4, 3]) },
      { text: 'Il argumente, conteste, ne lâche rien', scores: w([8, 3], [6, 1]) },
      { text: 'Il s\'excuse vite, veut réparer, vous re-séduire', scores: w([2, 3], [3, 2]) },
      { text: 'Il fait le mort, attend que ça passe', scores: w([5, 2], [9, 3]) },
      { text: 'Il fait diversion, plaisante, change de sujet', scores: w([7, 3]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },

  // ── VALIDATION (9) ───────────────────────────────────────────
  ...buildValidationsForChild('9-12'),
];

// ═══════════════════════════════════════════════════════════════
//  BANQUE 13-17 ANS (parent répond pour son ado)
// ═══════════════════════════════════════════════════════════════

export const BANK_13_17: AdaptiveQuestion[] = [
  // ── POSITIONING (4) ──────────────────────────────────────────
  {
    // See note on pad_center — same shift: emotional reaction, not decision style.
    id: 'p1317_center',
    ageBand: '13-17', phase: 'positioning', format: 'choice',
    category: 'Centre dominant',
    setup: "Quand quelque chose contrarie votre ado (un conflit, une injustice, une déception)…",
    prompt: 'Quelle est sa première réaction, avant la réflexion ?',
    icon: '🧭',
    options: [
      { text: "L'inquiétude, l'anticipation : « et si ça tournait mal ? »", emoji: '😰', scores: w([5, 3], [6, 3], [7, 1]) },
      { text: 'Une blessure, un repli : « pourquoi moi, personne ne comprend »', emoji: '💔', scores: w([2, 3], [3, 1], [4, 3]) },
      { text: "L'agacement, la colère : « c'est pas normal, faut que ça bouge »", emoji: '😤', scores: w([1, 2], [8, 3], [9, 2]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'p1317_social',
    ageBand: '13-17', phase: 'positioning', format: 'choice',
    category: 'Style social',
    setup: "Dans la dynamique de son groupe d'amis :",
    prompt: 'Quelle place occupe-t-il habituellement ?',
    icon: '👥',
    options: [
      { text: 'Une figure visible : leader, drôle, charismatique', scores: w([3, 3], [7, 3], [8, 2]) },
      { text: 'Un satellite : présent mais discret, parfois en marge', scores: w([4, 3], [5, 3], [9, 2]) },
      { text: 'Un pilier : on compte sur lui, il fait le lien', scores: w([1, 2], [2, 3], [6, 3]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'p1317_emotion',
    ageBand: '13-17', phase: 'positioning', format: 'choice',
    category: 'Émotions',
    setup: "Quand il est blessé / en colère / déçu (vie sociale, famille, amour)…",
    prompt: 'Comment ça s\'exprime le plus souvent ?',
    icon: '🌊',
    options: [
      { text: 'Explosivement : claque, hausse le ton, casse', scores: w([8, 3], [6, 1]) },
      { text: 'Silencieusement : se mure, monte dans sa chambre, ne parle plus', scores: w([4, 2], [5, 3], [9, 3]) },
      { text: 'Émotionnellement : pleure, écrit, se confie longuement', scores: w([2, 2], [4, 3]) },
      { text: 'Discrètement : reste poli en surface, garde tout pour lui', scores: w([1, 2], [3, 3], [5, 1]) },
      { text: 'Rapidement : s\'agite, fuit en sortie ou en humour', scores: w([7, 3], [3, 1]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'p1317_autonomy',
    ageBand: '13-17', phase: 'positioning', format: 'slider',
    category: 'Autonomie',
    setup: "Son rapport à l'autorité familiale en ce moment :",
    prompt: 'Plutôt :',
    icon: '🚪',
    sliderLeft: 'Encore très en demande, vous consulte beaucoup',
    sliderRight: 'Très autonome / opposant, claque les portes',
    sliderScores: {
      low: w([2, 2], [6, 3], [9, 1]),
      high: w([4, 2], [7, 1], [8, 3]),
    },
    discriminates: [2, 4, 6, 7, 8, 9],
  },

  // ── ADAPTIVE (13) ────────────────────────────────────────────
  {
    id: 'a1317_avenir',
    ageBand: '13-17', phase: 'adaptive', format: 'choice',
    category: 'Projet de vie',
    setup: "Quand on parle d'orientation ou de futur métier :",
    prompt: 'Plutôt :',
    icon: '🎯',
    options: [
      { text: 'Il a un plan précis et ambitieux, il vise haut', scores: w([3, 3], [1, 1]) },
      { text: 'Il rêve d\'un truc original, artistique ou hors-norme', scores: w([4, 3], [7, 1]) },
      { text: 'Il ne sait pas et ça l\'angoisse, il accumule les options', scores: w([6, 3], [9, 2]) },
      { text: 'Il veut une cause, aider, changer le monde', scores: w([1, 2], [2, 3], [6, 1]) },
      { text: 'Il s\'en fout pour l\'instant, vit l\'instant', scores: w([7, 3], [9, 2]) },
      { text: 'Il veut son indépendance, gagner sa vie tôt', scores: w([5, 1], [8, 3]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'a1317_chambre',
    ageBand: '13-17', phase: 'adaptive', format: 'choice',
    category: 'Sa chambre',
    setup: "L'état de sa chambre / son antre :",
    prompt: 'Plutôt :',
    icon: '🛏️',
    options: [
      { text: 'Impeccable, organisée, esthétique', scores: w([1, 3], [3, 1]) },
      { text: 'Chaos absolu, on ne voit plus le sol', scores: w([4, 1], [7, 3], [9, 1]) },
      { text: 'Personnelle, très décorée (posters, photos, objets symboliques)', scores: w([4, 3], [2, 1]) },
      { text: 'Fonctionnelle, peu décorée, son monde est dans son ordi', scores: w([5, 3]) },
      { text: 'Vous n\'avez pas le droit d\'y entrer, jamais', scores: w([4, 2], [5, 2], [8, 2]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 7, 8, 9],
  },
  {
    id: 'a1317_amour',
    ageBand: '13-17', phase: 'adaptive', format: 'choice',
    category: 'Sentiment amoureux',
    setup: "Sur ses premières histoires de cœur (ou son rapport au sentiment amoureux) :",
    prompt: 'Plutôt :',
    icon: '💞',
    options: [
      { text: 'Très intense, fusionnel, dramatique parfois', scores: w([4, 3], [2, 2]) },
      { text: 'Plutôt cérébral, distant, n\'ose pas trop', scores: w([5, 3], [6, 2]) },
      { text: 'Léger, plusieurs flirts, peu attaché', scores: w([7, 3], [3, 2]) },
      { text: 'Vous n\'en savez rien, sujet tabou', scores: w([1, 2], [5, 2], [9, 2]) },
      { text: 'Il ramène très vite la personne à la maison, veut votre validation', scores: w([2, 3], [6, 2]) },
      { text: 'Il prend le pouvoir dans la relation, parfois trop', scores: w([3, 1], [8, 3]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'a1317_estime',
    ageBand: '13-17', phase: 'adaptive', format: 'slider',
    category: 'Estime de soi',
    setup: "Sur sa façon de parler de lui-même :",
    prompt: 'Plutôt :',
    icon: '🪞',
    sliderLeft: 'Très dur avec lui-même, se trouve nul / décevant',
    sliderRight: 'Très assuré, parfois trop, sait qu\'il est bon',
    sliderScores: {
      low: w([1, 2], [4, 3], [6, 2], [9, 1]),
      high: w([3, 3], [7, 1], [8, 3]),
    },
    discriminates: [1, 3, 4, 6, 7, 8, 9],
  },
  {
    id: 'a1317_engage',
    ageBand: '13-17', phase: 'adaptive', format: 'choice',
    category: 'Engagement',
    setup: "Sur les causes / l'engagement (écologie, droits, politique, asso) :",
    prompt: 'Plutôt :',
    icon: '🌍',
    options: [
      { text: 'Très engagé, militant, parfois moralisateur', scores: w([1, 3], [6, 2]) },
      { text: 'Engagé pour aider concrètement les gens autour', scores: w([2, 3]) },
      { text: 'Pas vraiment, plus tourné vers ses passions ou son intérieur', scores: w([4, 2], [5, 2], [9, 1]) },
      { text: 'Engagé en surface si c\'est valorisant socialement', scores: w([3, 2], [7, 1]) },
      { text: 'Anti-système, contestataire, refus de l\'autorité', scores: w([4, 1], [8, 3]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 8, 9],
  },
  {
    id: 'a1317_anxiete',
    ageBand: '13-17', phase: 'adaptive', format: 'choice',
    category: 'Anxiété',
    setup: "Avant un évènement important (contrôle, oral, voyage, fête) :",
    prompt: 'Plutôt :',
    icon: '😰',
    options: [
      { text: 'Très anxieux, fait des scénarios catastrophe', scores: w([6, 3], [5, 1]) },
      { text: 'Stressé mais sur-prépare jusqu\'au bout', scores: w([1, 3], [3, 2], [6, 1]) },
      { text: 'Cool en apparence, mais ne ferme pas l\'œil de la nuit', scores: w([3, 2], [9, 2]) },
      { text: 'Excité, impatient, ne veut pas y penser à l\'avance', scores: w([7, 3]) },
      { text: 'Il évite, repousse, fait diversion', scores: w([7, 2], [9, 3]) },
    ],
    discriminates: [1, 3, 5, 6, 7, 9],
  },
  {
    id: 'a1317_reseaux',
    ageBand: '13-17', phase: 'adaptive', format: 'choice',
    category: 'Réseaux sociaux',
    setup: "Son rapport aux réseaux sociaux :",
    prompt: 'Plutôt :',
    icon: '📱',
    options: [
      { text: 'Très actif, soigne son image, vit pour les likes', scores: w([3, 3]) },
      { text: 'Actif mais second degré, pour faire rire ses potes', scores: w([7, 2], [8, 1]) },
      { text: 'Lecteur silencieux, scrolle sans poster', scores: w([5, 3], [9, 2], [4, 1]) },
      { text: 'En a fait un espace de création / d\'art / d\'opinion', scores: w([4, 3], [1, 1]) },
      { text: 'Méfiant, en a peu, voit le danger', scores: w([1, 2], [6, 3]) },
    ],
    discriminates: [1, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'a1317_corps',
    ageBand: '13-17', phase: 'adaptive', format: 'forced_choice',
    category: 'Rapport au corps',
    setup: "Sur la manière dont il habite son corps :",
    prompt: 'Plutôt :',
    icon: '🏃',
    options: [
      { text: 'Très conscient et soigneux : sport, alim, look, performance', emoji: '💪', scores: w([1, 2], [3, 3], [8, 2]) },
      { text: 'Plutôt déconnecté ou complexé, mal à l\'aise dans son corps', emoji: '🌫️', scores: w([4, 3], [5, 3], [6, 1], [9, 1]) },
    ],
    discriminates: [1, 3, 4, 5, 6, 8, 9],
  },
  {
    id: 'a1317_secret',
    ageBand: '13-17', phase: 'adaptive', format: 'choice',
    category: 'Confidences',
    setup: "Quand il vit quelque chose de difficile, à qui se confie-t-il en premier ?",
    prompt: 'Le plus probablement :',
    icon: '🔒',
    options: [
      { text: 'À vous (ou un autre adulte de confiance)', scores: w([2, 2], [6, 3], [9, 1]) },
      { text: 'À son meilleur ami / sa meilleure amie', scores: w([2, 3], [4, 2]) },
      { text: 'À personne, il digère seul', scores: w([4, 2], [5, 3], [8, 2]) },
      { text: 'À tout le monde, il extériorise vite', scores: w([3, 1], [7, 3]) },
      { text: 'À son journal / sa musique / son art', scores: w([4, 3], [5, 1]) },
    ],
    discriminates: [2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'a1317_desac',
    ageBand: '13-17', phase: 'adaptive', format: 'choice',
    category: 'Désaccord',
    setup: "Quand vous lui dites « non » sur un sujet important pour lui (sortie, écran, choix)…",
    prompt: 'Plutôt :',
    icon: '🚫',
    options: [
      { text: 'Il claque la porte, hurle, vous traite d\'injuste', scores: w([8, 3], [4, 1]) },
      { text: 'Il argumente méthodiquement, refuse de lâcher la conversation', scores: w([1, 2], [5, 1], [6, 2]) },
      { text: 'Il sourit, dit OK, puis le fait quand même en cachette', scores: w([3, 3], [7, 2]) },
      { text: 'Il boude longuement, vous fait sentir coupable', scores: w([2, 2], [4, 3]) },
      { text: 'Il accepte mollement, sans énergie', scores: w([9, 3]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'a1317_routine',
    ageBand: '13-17', phase: 'adaptive', format: 'slider',
    category: 'Quotidien',
    setup: "Sur ses habitudes / sa routine de vie :",
    prompt: 'Plutôt :',
    icon: '⏰',
    sliderLeft: 'Très ritualisé, mêmes horaires, mêmes habitudes',
    sliderRight: 'Très chaotique, change tout le temps',
    sliderScores: {
      low: w([1, 3], [5, 2], [6, 2], [9, 1]),
      high: w([4, 1], [7, 3], [8, 1]),
    },
    discriminates: [1, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'a1317_sens',
    ageBand: '13-17', phase: 'adaptive', format: 'choice',
    category: 'Quête de sens',
    setup: "Quand il parle de la vie, du sens, de ce qui compte :",
    prompt: 'Plutôt :',
    icon: '✨',
    options: [
      { text: 'Idéaliste : valeurs, intégrité, monde meilleur', scores: w([1, 3], [2, 1]) },
      { text: 'Existentialiste : qui suis-je, à quoi bon, ressenti profond', scores: w([4, 3], [5, 1]) },
      { text: 'Pragmatique : faut réussir, avancer, pas perdre de temps', scores: w([3, 3], [8, 2]) },
      { text: 'Hédoniste : profiter, vivre, l\'expérience compte', scores: w([7, 3]) },
      { text: 'Évite le sujet, change vite ou plaisante', scores: w([7, 1], [9, 2]) },
      { text: 'Sécurité : faut un cadre, un système qui marche', scores: w([6, 3], [9, 1]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'a1317_aide',
    ageBand: '13-17', phase: 'adaptive', format: 'choice',
    category: 'Demande d\'aide',
    setup: "Quand il est dépassé (devoirs, problème personnel)…",
    prompt: 'Plutôt :',
    icon: '🆘',
    options: [
      { text: 'Il vous demande directement, en confiance', scores: w([2, 2], [6, 3]) },
      { text: 'Il craque d\'abord, puis demande à travers une crise', scores: w([4, 3], [2, 1]) },
      { text: 'Il ne demande jamais, se débrouille seul à tout prix', scores: w([5, 3], [8, 3]) },
      { text: 'Il fait diversion, reporte, fuit', scores: w([7, 2], [9, 3]) },
      { text: 'Il refuse l\'aide proposée puis vous reproche de ne pas l\'avoir aidé', scores: w([4, 2], [6, 2], [8, 1]) },
    ],
    discriminates: [2, 4, 5, 6, 7, 8, 9],
  },

  // ── VALIDATION (9) ───────────────────────────────────────────
  ...buildValidationsForChild('13-17'),
];

// ═══════════════════════════════════════════════════════════════
//  BANQUE ADULTE (auto-évaluation)
// ═══════════════════════════════════════════════════════════════

export const BANK_ADULTE: AdaptiveQuestion[] = [
  // ── POSITIONING (4) ──────────────────────────────────────────
  {
    // NOTE: previously this question asked "what do you rely on to decide"
    // which was self-image driven — most people (including 5/6/7s who do
    // analyse internally) self-identified as "ressenti" because it sounds
    // warmer. We now target the *spontaneous emotional reaction* which is
    // much less filtered by self-image and maps cleanly to the 3 centers
    // (fear→head, shame→heart, anger→gut).
    id: 'pad_center',
    ageBand: 'adulte', phase: 'positioning', format: 'choice',
    category: 'Centre dominant',
    setup: "Quand quelque chose ne va pas (un problème, un conflit, une contrariété)…",
    prompt: 'Quelle émotion monte en vous spontanément, avant même d\'y réfléchir ?',
    icon: '🧭',
    options: [
      { text: "L'inquiétude : « et si ça empirait ? qu'est-ce qui pourrait mal tourner ? »", emoji: '😰', scores: w([5, 3], [6, 3], [7, 2]) },
      { text: "Une blessure intime : « pourquoi moi ? qu'est-ce que ça dit de moi ? »", emoji: '💔', scores: w([2, 3], [3, 1], [4, 3]) },
      { text: "L'agacement : « ce n'est pas normal, il faut que ça bouge »", emoji: '😤', scores: w([1, 2], [8, 3], [9, 2]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'pad_social',
    ageBand: 'adulte', phase: 'positioning', format: 'choice',
    category: 'Style social',
    setup: "Dans un groupe (au travail, avec des amis, en réunion) :",
    prompt: 'Quelle place prenez-vous le plus naturellement ?',
    icon: '👥',
    options: [
      { text: 'Visible : je propose, j\'anime, je porte les idées', scores: w([3, 3], [7, 3], [8, 3]) },
      { text: 'En appui : j\'observe, je laisse de la place, je facilite', scores: w([4, 1], [5, 2], [9, 3]) },
      { text: 'En soutien : je veille à ce que tout le monde aille bien', scores: w([1, 1], [2, 3], [6, 3]) },
      { text: 'Au cœur de moi : j\'écoute mais je reste fidèle à mon ressenti', scores: w([4, 3], [5, 2]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'pad_stress',
    ageBand: 'adulte', phase: 'positioning', format: 'choice',
    category: 'Sous pression',
    setup: "Sous stress fort (deadline, conflit, surcharge), votre travers le plus typique :",
    prompt: 'Plutôt :',
    icon: '🌪️',
    options: [
      { text: 'Je deviens rigide, perfectionniste, critique', scores: w([1, 3]) },
      { text: 'Je me donne aux autres encore plus, j\'oublie mes besoins', scores: w([2, 3]) },
      { text: 'Je carbure aux résultats, je deviens froid et efficace', scores: w([3, 3]) },
      { text: 'Je m\'effondre, je rumine, je me sens incompris', scores: w([4, 3]) },
      { text: 'Je m\'isole, je me retire dans ma tête / mes recherches', scores: w([5, 3]) },
      { text: 'Je catastrophise, je doute, je cherche des garanties', scores: w([6, 3]) },
      { text: 'Je m\'évade dans plein de projets ou de plaisirs', scores: w([7, 3]) },
      { text: 'Je prends le contrôle, je hausse le ton, j\'impose', scores: w([8, 3]) },
      { text: 'Je m\'efface, je traîne, je « disparais »', scores: w([9, 3]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'pad_attention',
    ageBand: 'adulte', phase: 'positioning', format: 'slider',
    category: 'Attention',
    setup: "Votre attention va spontanément vers :",
    prompt: 'Plutôt :',
    icon: '🔭',
    sliderLeft: 'Ce qui ne va pas, ce qui manque, ce qui pourrait foirer',
    sliderRight: 'Ce qui est possible, excitant, à découvrir',
    sliderScores: {
      low: w([1, 3], [4, 2], [5, 1], [6, 3]),
      high: w([2, 1], [3, 2], [7, 3], [8, 1]),
    },
    discriminates: [1, 4, 5, 6, 7, 8],
  },

  // ── ADAPTIVE (16) ────────────────────────────────────────────
  {
    id: 'aad_motivation',
    ageBand: 'adulte', phase: 'adaptive', format: 'choice',
    category: 'Moteur intérieur',
    setup: "Ce qui vous fait vraiment vous lever le matin :",
    prompt: 'Le plus juste :',
    icon: '🌅',
    options: [
      { text: 'Faire les choses correctement, intègre, à ma juste valeur', scores: w([1, 3]) },
      { text: 'Être utile aux gens que j\'aime, qu\'ils me sentent là', scores: w([2, 3]) },
      { text: 'Avancer, accomplir, voir les résultats de mon travail', scores: w([3, 3]) },
      { text: 'Vivre quelque chose d\'authentique, de profond, de vrai', scores: w([4, 3]) },
      { text: 'Comprendre, apprendre, maîtriser un sujet', scores: w([5, 3]) },
      { text: 'Honorer mes engagements, ma loyauté envers mes proches', scores: w([6, 3]) },
      { text: 'Goûter, explorer, ne pas passer à côté', scores: w([7, 3]) },
      { text: 'Protéger les miens, agir, ne pas subir', scores: w([8, 3]) },
      { text: 'L\'harmonie, que tout le monde aille bien autour de moi', scores: w([9, 3]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'aad_critique',
    ageBand: 'adulte', phase: 'adaptive', format: 'forced_choice',
    category: 'Critique intérieure',
    setup: "Quand vous faites une erreur (au travail, en couple, avec vos enfants) :",
    prompt: 'Le plus juste pour vous :',
    icon: '🎯',
    options: [
      { text: 'Je m\'auto-flagelle longtemps, je « rejoue » la scène en boucle', emoji: '🔁', scores: w([1, 3], [4, 2], [5, 1], [6, 2]) },
      { text: 'Je rebondis vite, je rationalise, je passe à autre chose', emoji: '➡️', scores: w([3, 3], [7, 3], [8, 2], [9, 2]) },
    ],
    discriminates: [1, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'aad_couple',
    ageBand: 'adulte', phase: 'adaptive', format: 'choice',
    category: 'En couple',
    setup: "En couple, votre travers récurrent (selon votre partenaire ou selon vous) :",
    prompt: 'Plutôt :',
    icon: '💑',
    options: [
      { text: 'Je deviens critique, je remarque ce qui n\'est pas droit', scores: w([1, 3]) },
      { text: 'Je donne trop, j\'attends en retour et je le reproche', scores: w([2, 3]) },
      { text: 'Je suis trop pris par mon travail / mes objectifs', scores: w([3, 3]) },
      { text: 'Je suis intense, lunatique, jamais satisfait·e', scores: w([4, 3]) },
      { text: 'Je me retire, je me coupe émotionnellement', scores: w([5, 3]) },
      { text: 'Je doute du couple, je teste, je cherche des garanties', scores: w([6, 3]) },
      { text: 'Je fuis l\'intimité difficile, je distrais ou m\'évade', scores: w([7, 3]) },
      { text: 'Je prends le contrôle, je hausse le ton', scores: w([8, 3]) },
      { text: 'Je m\'efface, j\'évite le conflit, je ne dis pas mes besoins', scores: w([9, 3]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'aad_argent',
    ageBand: 'adulte', phase: 'adaptive', format: 'choice',
    category: 'Argent',
    setup: "Votre rapport à l'argent :",
    prompt: 'Le plus juste :',
    icon: '💰',
    options: [
      { text: 'Strict, contrôlé, équitable — je n\'aime pas devoir', scores: w([1, 3], [5, 1]) },
      { text: 'Je dépense pour les autres facilement, moins pour moi', scores: w([2, 3]) },
      { text: 'Marqueur de réussite, j\'aime en gagner et en montrer', scores: w([3, 3]) },
      { text: 'Sujet douloureux, je ne sais pas vraiment où j\'en suis', scores: w([4, 3], [9, 1]) },
      { text: 'Économe, plutôt minimaliste, sécurité avant tout', scores: w([5, 3], [6, 2]) },
      { text: 'Anxiogène, je projette beaucoup, je sécurise', scores: w([6, 3]) },
      { text: 'Léger, je dépense vite, je verrai bien', scores: w([7, 3]) },
      { text: 'Outil de pouvoir et d\'autonomie, je veux maîtriser', scores: w([8, 3]) },
      { text: 'J\'évite d\'y penser, je délègue volontiers', scores: w([9, 3]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'aad_solitude',
    ageBand: 'adulte', phase: 'adaptive', format: 'slider',
    category: 'Solitude',
    setup: "Votre rapport à la solitude :",
    prompt: 'Plutôt :',
    icon: '🪟',
    sliderLeft: 'Je la fuis, j\'ai besoin de monde autour de moi',
    sliderRight: 'J\'en raffole, j\'en ai besoin pour respirer',
    sliderScores: {
      low: w([2, 3], [3, 1], [6, 2], [7, 2]),
      high: w([4, 1], [5, 3], [9, 1]),
    },
    discriminates: [2, 3, 4, 5, 6, 7, 9],
  },
  {
    id: 'aad_corps',
    ageBand: 'adulte', phase: 'adaptive', format: 'choice',
    category: 'Rapport au corps',
    setup: "Votre rapport à votre corps / santé :",
    prompt: 'Le plus juste :',
    icon: '🫀',
    options: [
      { text: 'Discipliné, sport régulier, hygiène stricte', scores: w([1, 3], [3, 2]) },
      { text: 'Je le néglige souvent, j\'oublie de manger / dormir', scores: w([5, 3], [9, 2]) },
      { text: 'Source d\'angoisse, j\'écoute beaucoup les symptômes', scores: w([4, 1], [6, 3]) },
      { text: 'Outil de plaisir : bien manger, bien voyager, bien sentir', scores: w([7, 3]) },
      { text: 'Outil de puissance : j\'aime sentir ma force, repousser mes limites', scores: w([8, 3]) },
      { text: 'Vitrine sociale : forme, look, performance', scores: w([3, 3]) },
      { text: 'Lieu d\'expression : sensible, créatif, parfois douloureux', scores: w([4, 3]) },
    ],
    discriminates: [1, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'aad_doute',
    ageBand: 'adulte', phase: 'adaptive', format: 'choice',
    category: 'Doute',
    setup: "Devant un projet engageant (changement de job, déménagement, achat majeur) :",
    prompt: 'Plutôt :',
    icon: '🚪',
    options: [
      { text: 'J\'analyse les pour/contre des heures, j\'établis un plan B et C', scores: w([5, 2], [6, 3]) },
      { text: 'Je le sens et j\'y vais, peu de tergiversation', scores: w([7, 2], [8, 3]) },
      { text: 'Je veux que ce soit parfait, je peaufine au point de ne jamais lancer', scores: w([1, 3]) },
      { text: 'Je me demande ce que les gens vont en penser', scores: w([2, 2], [3, 3]) },
      { text: 'Je me projette émotionnellement, je veux que ça « me ressemble »', scores: w([4, 3]) },
      { text: 'J\'évite, je laisse traîner, je me dis qu\'on verra plus tard', scores: w([9, 3]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'aad_aider',
    ageBand: 'adulte', phase: 'adaptive', format: 'forced_choice',
    category: 'Aide',
    setup: "Demander de l'aide :",
    prompt: 'Plutôt :',
    icon: '🤝',
    options: [
      { text: 'Très facile, je demande naturellement', emoji: '🙋', scores: w([2, 2], [6, 2], [7, 1], [9, 1]) },
      { text: 'Très difficile, je préfère me débrouiller seul·e', emoji: '🛡️', scores: w([1, 2], [3, 2], [5, 3], [8, 3]) },
    ],
    discriminates: [1, 2, 3, 5, 6, 7, 8, 9],
  },
  {
    id: 'aad_colere',
    ageBand: 'adulte', phase: 'adaptive', format: 'choice',
    category: 'Colère',
    setup: "Votre rapport à la colère :",
    prompt: 'Plutôt :',
    icon: '🔥',
    options: [
      { text: 'Je la nie, ou je la transforme en critique « rationnelle »', scores: w([1, 3]) },
      { text: 'J\'ai du mal à l\'admettre, je la transforme en tristesse', scores: w([2, 3], [9, 2]) },
      { text: 'Je la sens vite, elle sort fort, je l\'assume', scores: w([8, 3]) },
      { text: 'Je l\'intériorise, elle me ronge', scores: w([4, 2], [5, 2], [9, 3]) },
      { text: 'Je l\'évite, je préfère la fête et l\'évasion', scores: w([7, 3]) },
      { text: 'Elle me fait peur, je veux apaiser tout de suite', scores: w([2, 1], [6, 3], [9, 2]) },
    ],
    discriminates: [1, 2, 4, 5, 6, 7, 8, 9],
  },
  {
    id: 'aad_apparence',
    ageBand: 'adulte', phase: 'adaptive', format: 'slider',
    category: 'Image',
    setup: "L'importance de l'image que vous renvoyez :",
    prompt: 'Plutôt :',
    icon: '🪞',
    sliderLeft: 'Je m\'en moque, je suis comme je suis',
    sliderRight: 'Je la soigne, c\'est important pour moi',
    sliderScores: {
      low: w([4, 1], [5, 3], [8, 2], [9, 2]),
      high: w([1, 1], [2, 1], [3, 3]),
    },
    discriminates: [3, 4, 5, 8, 9],
  },
  {
    id: 'aad_loyaute',
    ageBand: 'adulte', phase: 'adaptive', format: 'choice',
    category: 'Loyauté',
    setup: "Votre rapport à la loyauté :",
    prompt: 'Le plus juste :',
    icon: '⚓',
    options: [
      { text: 'Très loyal·e, je tiens mes engagements, ça me définit', scores: w([1, 2], [6, 3]) },
      { text: 'Loyal·e à mes proches, je me bats pour eux', scores: w([2, 2], [8, 3]) },
      { text: 'Loyal·e si on m\'est loyal en retour', scores: w([3, 2], [8, 1]) },
      { text: 'J\'ai besoin de garder ma liberté, la loyauté m\'enferme parfois', scores: w([4, 2], [7, 3]) },
      { text: 'J\'ai du mal à m\'engager fortement, j\'observe d\'abord', scores: w([5, 3]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 'aad_temps',
    ageBand: 'adulte', phase: 'adaptive', format: 'choice',
    category: 'Rapport au temps',
    setup: "Votre rapport au temps libre :",
    prompt: 'Plutôt :',
    icon: '⏳',
    options: [
      { text: 'Je l\'optimise, j\'ai du mal à « ne rien faire »', scores: w([1, 2], [3, 3]) },
      { text: 'Je le donne aux autres, à ma famille, à mes proches', scores: w([2, 3], [6, 1]) },
      { text: 'Je le passe à créer, à explorer mon monde intérieur', scores: w([4, 3], [5, 2]) },
      { text: 'Je le passe à apprendre, à approfondir, à lire', scores: w([5, 3]) },
      { text: 'Je multiplie les expériences, voyages, sorties', scores: w([7, 3]) },
      { text: 'Je le laisse passer, je traîne, je suis bien comme ça', scores: w([9, 3]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 7, 9],
  },
  {
    id: 'aad_changer',
    ageBand: 'adulte', phase: 'adaptive', format: 'choice',
    category: 'Changement',
    setup: "Quand quelqu'un vous fait du feedback critique :",
    prompt: 'Plutôt :',
    icon: '💬',
    options: [
      { text: 'Je le prends très à cœur, je le ressasse', scores: w([1, 2], [4, 3], [6, 1]) },
      { text: 'Je le minimise mais le note pour m\'améliorer', scores: w([1, 2], [3, 3]) },
      { text: 'Je me défends, je l\'attaque parfois en retour', scores: w([8, 3]) },
      { text: 'Je l\'écoute, j\'analyse à froid si c\'est fondé', scores: w([5, 3]) },
      { text: 'Je suis blessé·e, je m\'en veux d\'avoir déçu', scores: w([2, 3]) },
      { text: 'Je le balaie, je passe à autre chose', scores: w([7, 3], [9, 2]) },
      { text: 'Je doute beaucoup : « Suis-je vraiment comme ça ? »', scores: w([6, 3]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },

  // Question « peur fondamentale » : la peur centrale de chaque type est
  // l'un des signaux les plus fiables, mais on ne peut pas la demander
  // frontalement (filtre d'auto-image). Le contournement : passer par le
  // moment où l'esprit vagabonde, désamorcé.
  {
    id: 'aad_peur',
    ageBand: 'adulte', phase: 'adaptive', format: 'choice',
    category: 'La nuit',
    setup: "La nuit, quand votre esprit vagabonde vers ce qui vous inquiète vraiment au fond…",
    prompt: 'Ce qui revient le plus souvent :',
    icon: '🌙',
    options: [
      { text: 'Avoir mal fait, ne pas avoir été à la hauteur de mes valeurs', emoji: '⚖️', scores: w([1, 3]) },
      { text: 'Être seul·e, ne pas être vraiment aimé·e', emoji: '💔', scores: w([2, 3]) },
      { text: 'Échouer publiquement, perdre ma crédibilité', emoji: '📉', scores: w([3, 3]) },
      { text: 'Passer à côté de qui je suis vraiment, vivre une vie pas la mienne', emoji: '🎭', scores: w([4, 3]) },
      { text: 'Être submergé·e, ne plus savoir gérer ce qui arrive', emoji: '🌊', scores: w([5, 3]) },
      { text: 'Me retrouver sans repère, sans appui, en danger', emoji: '🌫️', scores: w([6, 3]) },
      { text: 'Être coincé·e, manquer une occasion importante', emoji: '🚪', scores: w([7, 3]) },
      { text: 'Être trahi·e, dominé·e, exposé·e à plus fort que moi', emoji: '🛡️', scores: w([8, 3]) },
      { text: "Le conflit, la rupture, perdre l'harmonie avec mes proches", emoji: '⚡', scores: w([9, 3]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  // Question « comportement de bout-de-rouleau » : capte la flèche de
  // désintégration (chaque type bascule sur les traits non-sains d'un
  // autre type quand il est vraiment à bout). Très complémentaire de
  // pad_stress (positioning) qui capte l'amplification, alors que celui-
  // ci capte le « shadow type ». Mappings : 1→4, 2→8, 3→9, 4→2, 5→7,
  // 6→3, 7→1, 8→5, 9→6.
  {
    id: 'aad_ombre',
    ageBand: 'adulte', phase: 'adaptive', format: 'choice',
    category: 'Quand vous craquez',
    setup: "Pas votre stress habituel — quand vous êtes vraiment épuisé·e depuis longtemps, une autre version de vous prend le relais.",
    prompt: 'Vous devenez plutôt :',
    icon: '🕳️',
    options: [
      { text: 'Mélancolique, replié·e, tout me semble vain', emoji: '🌧️', scores: w([1, 3]) },
      { text: "Dur·e, contrôlant·e, je hausse le ton avec ceux que j'aime", emoji: '🥊', scores: w([2, 3]) },
      { text: 'Apathique, désengagé·e, je « débranche » tout', emoji: '🛌', scores: w([3, 3]) },
      { text: "Dans le besoin compulsif de plaire, je m'oublie pour l'autre", emoji: '🙇', scores: w([4, 3]) },
      { text: 'Hyperactif·ve, dispersé·e, je papillonne pour ne rien sentir', emoji: '🦋', scores: w([5, 3]) },
      { text: "Dans la performance d'image, je veux paraître au top à tout prix", emoji: '🎬', scores: w([6, 3]) },
      { text: 'Critique, rigide, moralisateur·trice avec mon entourage', emoji: '📐', scores: w([7, 3]) },
      { text: 'Soupçonneux·se, isolé·e, je coupe les ponts mentalement', emoji: '🐺', scores: w([8, 3]) },
      { text: "Anxieux·se, je m'agite sans vraiment agir, je doute de tout", emoji: '🌪️', scores: w([9, 3]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },

  // Question rétrospective d'enfance : le type cristallise tôt et reste
  // très stable. Comme elle discrimine les 9 types (overlap maximal sur
  // les top-4 candidats), elle sera sélectionnée tôt par l'entropie ;
  // c'est un signal de très haute fiabilité.
  {
    id: 'aad_enfance',
    ageBand: 'adulte', phase: 'adaptive', format: 'choice',
    category: 'Vous, enfant',
    setup: "Souvenez-vous de vous à 7-9 ans. Pas de qui vous auriez voulu être — de ce qu'on disait de vous à l'époque.",
    prompt: "Vous étiez plutôt l'enfant :",
    icon: '👧',
    options: [
      { text: 'Très sage, sérieux·se, qui voulait bien faire et respecter les règles', emoji: '📏', scores: w([1, 3]) },
      { text: 'Toujours à aider, à donner, à plaire aux adultes', emoji: '🌹', scores: w([2, 3]) },
      { text: 'Qui voulait briller, gagner, être remarqué·e', emoji: '🏆', scores: w([3, 3]) },
      { text: 'Sensible, à part, dans son monde intérieur', emoji: '🌙', scores: w([4, 3]) },
      { text: 'Solitaire, dans ses livres, posant des « pourquoi »', emoji: '📚', scores: w([5, 3]) },
      { text: 'Inquiet·ète, posant beaucoup de questions, accroché·e à ses adultes', emoji: '🫂', scores: w([6, 3]) },
      { text: "Hyperactif·ve, plein·e d'idées, débordant·e d'énergie", emoji: '🎈', scores: w([7, 3]) },
      { text: 'Avec du caractère, qui défendait son territoire et les copains', emoji: '🦁', scores: w([8, 3]) },
      { text: 'Doux·ce, accommodant·e, qui ne faisait jamais de vagues', emoji: '🌱', scores: w([9, 3]) },
    ],
    discriminates: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  // Descriptions par type — réponse Oui (+5) / À peu près (+2) / Non (-3)
  ...buildValidationsForAdulte(),
];

// ═══════════════════════════════════════════════════════════════
//  PUBLIC API
// ═══════════════════════════════════════════════════════════════

export const BANKS: Record<AgeBand, AdaptiveQuestion[]> = {
  '5-8': BANK_5_8,
  '9-12': BANK_9_12,
  '13-17': BANK_13_17,
  'adulte': BANK_ADULTE,
};

export function getBank(ageBand: AgeBand): AdaptiveQuestion[] {
  return BANKS[ageBand];
}

/** Détermine la tranche d'âge à partir d'un âge entier. */
export function ageToBand(age: number): AgeBand {
  if (age <= 8) return '5-8';
  if (age <= 12) return '9-12';
  return '13-17';
}
