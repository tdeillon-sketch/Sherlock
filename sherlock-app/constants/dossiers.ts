// ═══════════════════════════════════════════════════════════════
//  Les Dossiers Sherlock — Données de gamification Enneagramme
// ═══════════════════════════════════════════════════════════════

export const RANKS = [
  { id: 0, title: 'Stagiaire',       emoji: '🔎', xpRequired: 0    },
  { id: 1, title: 'Inspecteur',      emoji: '🕵️', xpRequired: 200  },
  { id: 2, title: 'Détective',       emoji: '🎩', xpRequired: 600  },
  { id: 3, title: 'Grand Détective', emoji: '🧩', xpRequired: 1500 },
  { id: 4, title: 'Sherlock',        emoji: '🦅', xpRequired: 3000 },
];

export const TYPE_NAMES: Record<number, string> = {
  1: 'Le Perfectionniste',
  2: "L'Altruiste",
  3: 'Le Battant',
  4: 'Le Romantique',
  5: "L'Investigateur",
  6: 'Le Loyaliste',
  7: "L'Épicurien",
  8: 'Le Chef',
  9: 'Le Médiateur',
};

export const TYPE_COLORS: Record<number, string> = {
  1: '#6b8f71', 2: '#c0713a', 3: '#d4a437', 4: '#7b68b5',
  5: '#4a90d9', 6: '#5b9e8f', 7: '#e07b54', 8: '#c0443a', 9: '#8fa68f',
};

// ── Types ──────────────────────────────────────────────────────

export type CaseFormat = 'enquete' | 'citation' | 'faux_amis' | 'detail';

export interface Fiche {
  id: string;
  name: string;
  type: number;
  category: string;
  quote: string;
  quoteSource: string;
  coreFear: string;
  coreDesire: string;
  whyThisType: string;
}

export interface EnqueteCase {
  id: string;
  format: 'enquete';
  ficheId: string;
  answer: number; // type 1-9
  indices: string[]; // 4 indices du plus vague au plus précis
  xpValues: [number, number, number, number];
  explanation: string;
}

export interface CitationCase {
  id: string;
  format: 'citation';
  ficheId: string;
  quote: string;
  author: string;
  answer: number;
  wrongOptions: number[]; // 2 types pièges
  explanation: string;
}

export interface FauxAmisCase {
  id: string;
  format: 'faux_amis';
  typeA: number;
  typeB: number;
  descA: string;
  descB: string;
  keyDiff: string; // la nuance qui les distingue
  xp: number;
}

export interface DetailCase {
  id: string;
  format: 'detail';
  ficheId?: string;
  scene: string;
  keyDetail: string;
  answer: number;
  explanation: string;
  xp: number;
}

export type DossierCase = EnqueteCase | CitationCase | FauxAmisCase | DetailCase;

export interface Dossier {
  id: string;
  title: string;
  emoji: string;
  desc: string;
  color: string;
  cases: DossierCase[];
}

// ── 45 Fiches personnages (5 par type) ────────────────────────

export const FICHES: Fiche[] = [
  // TYPE 1 — Le Perfectionniste
  {
    id: 'mandela', name: 'Nelson Mandela', type: 1, category: 'leaders',
    quote: "Je ne perds jamais. Soit je gagne, soit j'apprends.",
    quoteSource: 'Long Walk to Freedom',
    coreFear: "Être corrompu, mauvais ou imparfait",
    coreDesire: "Être bon, vertueux et juste",
    whyThisType: "Mandela a consacré sa vie à un idéal moral absolu. Sa discipline intérieure, sa capacité à transformer la prison en école de sagesse et son refus de compromettre ses valeurs sont l'essence du Type 1.",
  },
  {
    id: 'gandhi', name: 'Gandhi', type: 1, category: 'leaders',
    quote: "Sois le changement que tu veux voir dans le monde.",
    quoteSource: 'Attributed',
    coreFear: "Être impur, hypocrite ou irresponsable",
    coreDesire: "Vivre en accord parfait avec ses valeurs",
    whyThisType: "Gandhi incarnait la rigueur éthique poussée à l'extrême. Son ascétisme, ses jeûnes de protestation et son obsession de la vérité (satyagraha) sont des marqueurs classiques du Type 1.",
  },
  {
    id: 'obama_michelle', name: 'Michelle Obama', type: 1, category: 'leaders',
    quote: "When they go low, we go high.",
    quoteSource: 'Democratic National Convention, 2016',
    coreFear: "Être critiquée ou considérée comme immorale",
    coreDesire: "Être un modèle intègre pour les autres",
    whyThisType: "Michelle Obama manifeste le Type 1 dans sa discipline personnelle, ses standards élevés, son sens aigu du devoir et sa capacité à canaliser la colère en élan constructif.",
  },
  {
    id: 'marie_curie', name: 'Marie Curie', type: 1, category: 'visionnaires',
    quote: "Rien dans la vie n'est à craindre, tout est à comprendre.",
    quoteSource: 'Discours à Varsovie',
    coreFear: "Faire un travail imparfait ou bâclé",
    coreDesire: "Atteindre l'excellence absolue dans son travail",
    whyThisType: "Marie Curie travaillait dans des conditions dangereuses par pur idéal scientifique. Sa rigueur méthodologique obsessionnelle, son refus de breveter ses découvertes par principe éthique et son auto-exigence sont des traits Type 1.",
  },
  {
    id: 'confucius', name: 'Confucius', type: 1, category: 'visionnaires',
    quote: "La perfection est accessible à celui qui ne se lasse pas de s'améliorer.",
    quoteSource: 'Les Entretiens',
    coreFear: "Le désordre moral et l'injustice",
    coreDesire: "Créer une société ordonnée et vertueuse",
    whyThisType: "Confucius a bâti toute sa philosophie sur le perfectionnement moral de soi et de la société. Son insistance sur les rites, l'auto-discipline et la rectitude en font l'archétype du Type 1.",
  },

  // TYPE 2 — L'Altruiste
  {
    id: 'diana', name: 'Princesse Diana', type: 2, category: 'icones',
    quote: "Je veux être la reine des cœurs des gens.",
    quoteSource: 'Interview BBC Panorama, 1995',
    coreFear: "N'être pas aimée, être rejetée",
    coreDesire: "Se sentir aimée en aidant les autres",
    whyThisType: "Diana cherchait l'amour à travers le don de soi. Son travail humanitaire, son besoin intense de connexion émotionnelle et sa souffrance face au rejet royal sont des expressions profondes du Type 2.",
  },
  {
    id: 'teresa', name: 'Mère Teresa', type: 2, category: 'leaders',
    quote: "Si tu juges les gens, tu n'as plus le temps de les aimer.",
    quoteSource: 'Come Be My Light',
    coreFear: "Être inutile, ne servir à rien",
    coreDesire: "Être indispensable par l'amour qu'elle donne",
    whyThisType: "Mère Teresa représente le Type 2 dans sa dimension la plus sainte. Sa vie entière au service des autres, son besoin d'être nécessaire et ses doutes intérieurs sur sa propre valeur révèlent le cœur du Type 2.",
  },
  {
    id: 'oprah', name: 'Oprah Winfrey', type: 2, category: 'icones',
    quote: "Tu reçois une voiture ! Tu reçois une voiture ! Tout le monde reçoit une voiture !",
    quoteSource: 'The Oprah Winfrey Show',
    coreFear: "Ne pas être aimée malgré sa générosité",
    coreDesire: "Être aimée et admirer par tous",
    whyThisType: "Oprah incarne le Type 2 sain : elle donne généreusement, crée des liens émotionnels puissants et cherche à transformer la vie des gens. Son empathie hors norme et son besoin de connexion sont caractéristiques.",
  },
  {
    id: 'elvis', name: 'Elvis Presley', type: 2, category: 'icones',
    quote: "Je ne me souviens pas de vous avoir demandé votre avis.",
    quoteSource: 'Attributed',
    coreFear: "Ne pas être apprécié à sa juste valeur",
    coreDesire: "Être adoré et aimé inconditionnellement",
    whyThisType: "Elvis avait un besoin intense d'approbation qui le poussait à donner sans compter à ses proches. Sa générosité excessive, sa sensibilité aux critiques et sa dépendance affective révèlent un Type 2 non intégré.",
  },
  {
    id: 'pope_francis', name: 'Pape François', type: 2, category: 'leaders',
    quote: "Qui suis-je pour juger ?",
    quoteSource: 'Conférence de presse, 2013',
    coreFear: "Être perçu comme indifférent ou sans cœur",
    coreDesire: "Servir et être au plus près de la souffrance humaine",
    whyThisType: "Le Pape François a révolutionné le Vatican par son refus du faste et sa proximité avec les pauvres. Son humilité, son rejet du jugement et sa priorité donnée aux marginaux sont des expressions du Type 2.",
  },

  // TYPE 3 — Le Battant
  {
    id: 'obama_barack', name: 'Barack Obama', type: 3, category: 'leaders',
    quote: "Yes, we can.",
    quoteSource: 'Discours New Hampshire, 2008',
    coreFear: "Être perçu comme un échec, être sans valeur",
    coreDesire: "Réussir et être admiré pour ses accomplissements",
    whyThisType: "Obama est le Type 3 dans sa version la plus épanouie. Son sens inné du personal branding, sa capacité à adapter son image selon son audience et sa drive de réussite sont des marqueurs Type 3.",
  },
  {
    id: 'madonna', name: 'Madonna', type: 3, category: 'icones',
    quote: "Je suis mon propre expérience.",
    quoteSource: 'Rolling Stone Interview',
    coreFear: "Être ordinaire, passer inaperçue",
    coreDesire: "Être la numéro 1, la référence absolue",
    whyThisType: "Madonna est l'exemple parfait du Type 3 : reinvention permanente de l'image, drive compulsif vers le succès, adaptabilité au marché et identité construite autour de ses accomplissements.",
  },
  {
    id: 'taylor_swift', name: 'Taylor Swift', type: 3, category: 'icones',
    quote: "Long story short, I survived.",
    quoteSource: 'Long Story Short (Album Evermore)',
    coreFear: "L'échec public, être oubliée",
    coreDesire: "Être reconnue comme la meilleure dans son domaine",
    whyThisType: "Taylor Swift manifeste le Type 3 : contrôle total de son image, réinventions stratégiques à chaque album, résilience face aux échecs et transformation de chaque épreuve en succès commercial.",
  },
  {
    id: 'federer', name: 'Roger Federer', type: 3, category: 'icones',
    quote: "Je joue pour gagner. C'est tout.",
    quoteSource: 'Wimbledon Press Conference',
    coreFear: "Perdre son statut de champion",
    coreDesire: "L'excellence et la reconnaissance universelle",
    whyThisType: "Federer incarne l'élégance du Type 3 : efficacité maximale, image soignée, adaptabilité tactique et besoin profond de rester au sommet. Sa gestion parfaite de sa marque personnelle est caractéristique.",
  },
  {
    id: 'elon', name: 'Elon Musk', type: 3, category: 'leaders',
    quote: "When something is important enough, you do it even if the odds are not in your favor.",
    quoteSource: 'Interview Aeon',
    coreFear: "L'échec, être dépassé par les autres",
    coreDesire: "Changer le monde ET être reconnu pour l'avoir fait",
    whyThisType: "Musk est un Type 3 en stress : success-driven à l'extrême, besoin constant de validation, tendance à s'identifier à ses projets et à effacer les frontières entre lui-même et ses entreprises.",
  },

  // TYPE 4 — Le Romantique
  {
    id: 'frida', name: 'Frida Kahlo', type: 4, category: 'artistes',
    quote: "Je ne peins pas mes rêves. Je peins ma propre réalité.",
    quoteSource: 'Diary de Frida Kahlo',
    coreFear: "N'avoir aucune identité propre, être ordinaire",
    coreDesire: "Trouver sa signification unique, être authentique",
    whyThisType: "Frida Kahlo est l'archétype du Type 4. Sa transformation de la douleur en art, son esthétique radicalement personnelle, sa quête d'identité et sa capacité à sublimer la souffrance sont quintessentiel du Romantique.",
  },
  {
    id: 'mj', name: 'Michael Jackson', type: 4, category: 'artistes',
    quote: "Je suis commençant à croire que le génie est une enfance retrouvée à volonté.",
    quoteSource: 'Moonwalk (autobiographie)',
    coreFear: "Être ordinaire, sans signification",
    coreDesire: "Être unique, incomparable",
    whyThisType: "Michael Jackson est un Type 4 complexe : son sentiment d'être radicalement différent depuis l'enfance, sa transformation corporelle comme quête identitaire, sa mélancolie chronique et son art profondément personnel en témoignent.",
  },
  {
    id: 'dylan', name: 'Bob Dylan', type: 4, category: 'artistes',
    quote: "Je suis un artiste, pas une industrie.",
    quoteSource: 'Interview Rolling Stone, 1985',
    coreFear: "Perdre son authenticité, être récupéré",
    coreDesire: "Exprimer une vérité intérieure unique",
    whyThisType: "Dylan incarne le Type 4 dans sa dimension artistique : refus catégorique de se conformer aux attentes, reinventions constantes pour rester authentique et mélancolie poétique qui traverse toute son œuvre.",
  },
  {
    id: 'adele', name: 'Adèle', type: 4, category: 'artistes',
    quote: "Je chante pour les gens qui ressentent les choses profondément.",
    quoteSource: 'Interview Vogue, 2021',
    coreFear: "Que sa douleur ne soit pas reconnue",
    coreDesire: "Transformer ses émotions en quelque chose d'universel",
    whyThisType: "Adèle est un Type 4 épanoui : elle transforme ses chagrins personnels en art universel. Son rapport intense aux émotions, sa quête de profondeur et sa capacité à habiter pleinement la mélancolie sont des traits classiques.",
  },
  {
    id: 'virginia', name: 'Virginia Woolf', type: 4, category: 'artistes',
    quote: "On ne peut pas trouver la paix en évitant la vie.",
    quoteSource: 'Mrs Dalloway',
    coreFear: "Être vide intérieurement, sans profondeur",
    coreDesire: "Capturer la réalité subjective dans toute sa complexité",
    whyThisType: "Virginia Woolf est le Type 4 littéraire par excellence. Son flux de conscience, sa mélancolie constitutive, sa quête d'identité féminine et sa sensibilité extrême aux ambiances et aux émotions en font une Type 4 emblématique.",
  },

  // TYPE 5 — L'Investigateur
  {
    id: 'einstein', name: 'Albert Einstein', type: 5, category: 'visionnaires',
    quote: "L'imagination est plus importante que la connaissance.",
    quoteSource: 'Interview du Saturday Evening Post, 1929',
    coreFear: "Être incompétent, incapable de comprendre",
    coreDesire: "Tout comprendre, posséder la connaissance",
    whyThisType: "Einstein est l'archétype du Type 5. Son retrait du monde social pour se plonger dans la pensée abstraite, son économie d'énergie sociale, sa façon de vivre en observateur du monde et non participant en sont les signes.",
  },
  {
    id: 'hawking', name: 'Stephen Hawking', type: 5, category: 'visionnaires',
    quote: "L'intelligence, c'est la capacité de s'adapter au changement.",
    quoteSource: 'A Brief History of Time',
    coreFear: "Que son cerveau cesse de fonctionner",
    coreDesire: "Comprendre les lois fondamentales de l'univers",
    whyThisType: "Hawking incarnait la resilience du Type 5 : face à la maladie qui lui retirait son corps, il s'est réfugié encore plus profondément dans l'intellect. Sa vie entière dans sa tête est le symbole du Type 5.",
  },
  {
    id: 'tesla', name: 'Nikola Tesla', type: 5, category: 'visionnaires',
    quote: "Si vous voulez trouver les secrets de l'univers, pensez en termes d'énergie, de fréquence et de vibration.",
    quoteSource: 'Attributed',
    coreFear: "L'incompréhension, le manque de ressources intellectuelles",
    coreDesire: "Percer les mystères de la nature",
    whyThisType: "Tesla était un Type 5 en surcharge : il vivait presque entièrement dans sa tête, visualisait ses inventions complètes avant de les construire, évitait les relations sociales et accumulait les connaissances comme protection.",
  },
  {
    id: 'gates', name: 'Bill Gates', type: 5, category: 'visionnaires',
    quote: "Je choisis un homme paresseux pour faire un travail difficile, car un homme paresseux trouvera un moyen facile de le faire.",
    quoteSource: 'Attributed',
    coreFear: "Être dépassé, manquer d'information",
    coreDesire: "Maîtriser les systèmes complexes",
    whyThisType: "Gates est un Type 5 intégré : sa passion pour les systèmes, son approche analytique de la philanthropie, sa tendance à lire massivement pour accumuler des connaissances et son introversion sont des marqueurs clairs.",
  },
  {
    id: 'sherlock_h', name: 'Sherlock Holmes', type: 5, category: 'fictifs',
    quote: "Quand on a éliminé l'impossible, ce qui reste, si improbable soit-il, est nécessairement la vérité.",
    quoteSource: 'Le Signe des Quatre — Conan Doyle',
    coreFear: "Se tromper, manquer un détail",
    coreDesire: "Voir ce que les autres ne voient pas",
    whyThisType: "Sherlock Holmes est le Type 5 fictif par excellence : intelligence comme armure, détachement émotionnel, accumulation de connaissances encyclopédiques, retrait social et observation distante du monde humain.",
  },

  // TYPE 6 — Le Loyaliste
  {
    id: 'freud', name: 'Sigmund Freud', type: 6, category: 'visionnaires',
    quote: "L'angoisse est la réponse naturelle à l'inconnu.",
    quoteSource: 'Introduction à la Psychanalyse',
    coreFear: "Manquer de sécurité, être trahi",
    coreDesire: "Avoir un soutien fiable, des certitudes",
    whyThisType: "Freud a construit sa théorie autour de l'anxiété — ce n'est pas un hasard pour un Type 6. Sa paranoïa des dissidences (Jung, Adler), son besoin de contrôler son entourage et sa vision du monde comme fondamentalement menaçant sont caractéristiques.",
  },
  {
    id: 'tom_hanks', name: 'Tom Hanks', type: 6, category: 'icones',
    quote: "J'ai un côté qui doute toujours. Je ne suis jamais sûr d'avoir fait du bon travail.",
    quoteSource: 'Interview NYT',
    coreFear: "L'abandon, ne pas être à la hauteur",
    coreDesire: "Être fiable et faire confiance à ses proches",
    whyThisType: "Tom Hanks incarne le Type 6 positif : loyal, engagé, doutant perpétuellement de lui-même malgré le succès et cherchant dans ses rôles des personnages qui trouvent du sens dans la communauté et la loyauté.",
  },
  {
    id: 'jennifer', name: 'Jennifer Aniston', type: 6, category: 'icones',
    quote: "Le vrai luxe, c'est d'être entouré de gens en qui j'ai confiance.",
    quoteSource: 'Interview InStyle',
    coreFear: "La trahison, les relations instables",
    coreDesire: "Des amitiés solides et durables",
    whyThisType: "Jennifer Aniston incarne le Type 6 dans sa vie personnelle : ses amitiés durables (sa bande de Friends), sa méfiance des nouvelles relations, sa résistance aux changements et son besoin de fidélité en font une Type 6 claire.",
  },
  {
    id: 'katniss', name: 'Katniss Everdeen', type: 6, category: 'fictifs',
    quote: "Je ne peux pas les laisser briser quelqu'un dont j'ai besoin.",
    quoteSource: 'Hunger Games — Suzanne Collins',
    coreFear: "Perdre ceux qu'elle protège",
    coreDesire: "Protéger sa famille coûte que coûte",
    whyThisType: "Katniss est un Type 6 contre-phobique : elle fonce vers le danger pour protéger les siens. Sa loyauté absolue, son scepticisme envers le pouvoir, son courage face à la peur et son questionnement permanent des autorités sont des traits Type 6.",
  },
  {
    id: 'twain', name: 'Mark Twain', type: 6, category: 'artistes',
    quote: "Ils ne savaient pas que c'était impossible, alors ils l'ont fait.",
    quoteSource: 'Attributed',
    coreFear: "L'hypocrisie et la trahison sociale",
    coreDesire: "Un monde plus honnête et juste",
    whyThisType: "Twain était un Type 6 sceptique et contre-phobique. Son humour servait à dénoncer les hypocrisies de la société américaine. Sa méfiance du conformisme, son antiautoritarisme et ses angoisses financières sont des marqueurs Type 6.",
  },

  // TYPE 7 — L'Épicurien
  {
    id: 'robin', name: 'Robin Williams', type: 7, category: 'icones',
    quote: "Vous êtes seulement donné une petite étincelle de folie. Vous ne devez pas la perdre.",
    quoteSource: "It's Not Your Fault",
    coreFear: "La souffrance, la douleur, être piégé",
    coreDesire: "Être heureux, libre et stimulé",
    whyThisType: "Robin Williams est le Type 7 dans sa dimension tragique : l'humour comme fuite de la douleur intérieure. Son énergie débordante, son incapacité à s'asseoir, sa créativité frénétique et sa dépression cachée sont le portrait du Type 7.",
  },
  {
    id: 'mozart', name: 'Mozart', type: 7, category: 'artistes',
    quote: "Je ne me souviens pas avoir appris l'alphabet. J'ai toujours su jouer de la musique.",
    quoteSource: 'Correspondance de Mozart',
    coreFear: "L'ennui, la limitation créative",
    coreDesire: "Une stimulation constante, la joie pure",
    whyThisType: "Mozart est un Type 7 génial : son énergie créatrice inépuisable, son incapacité à finir un seul projet avant d'en commencer plusieurs autres, son humour potache, sa légèreté face au sérieux de la vie sont des traits emblématiques.",
  },
  {
    id: 'branson', name: 'Richard Branson', type: 7, category: 'leaders',
    quote: "Le business doit être amusant. Si ce n'est pas le cas, changez-le.",
    quoteSource: 'Losing My Virginity',
    coreFear: "L'ennui, la routine",
    coreDesire: "Vivre mille aventures et entreprises",
    whyThisType: "Branson est un Type 7 entrepreneurial : incapacité à se fixer sur un seul projet, besoin de nouveauté permanente, optimisme contagieux et façon de transformer chaque échec en nouvelle aventure.",
  },
  {
    id: 'jim', name: 'Jim Carrey', type: 7, category: 'icones',
    quote: "Mon humeur ne dépend pas de ce qui m'arrive, mais de ce que je décide de ressentir.",
    quoteSource: 'Commencement Speech MIU, 2014',
    coreFear: "La souffrance, l'insignifiance",
    coreDesire: "La liberté totale, la joie de vivre",
    whyThisType: "Jim Carrey est un Type 7 qui a cherché la libération : son humour hyperactif comme bouclier contre la douleur, son enfance dans la pauvreté qui a nourri son désir de légèreté et sa spiritualité tardive comme intégration du 7.",
  },
  {
    id: 'tony_stark', name: 'Tony Stark', type: 7, category: 'fictifs',
    quote: "Je suis Iron Man.",
    quoteSource: 'Avengers: Endgame (Marvel)',
    coreFear: "Perdre le contrôle, être vulnérable",
    coreDesire: "Tout avoir — le génie, la fête, la gloire",
    whyThisType: "Tony Stark est un Type 7 classique : fuite en avant, blagues pour éviter les conversations profondes, multiples projets en simultané et transformation de la peur (la mort) en armure littérale. Son intégration vers le 5 lui donne aussi la profondeur.",
  },

  // TYPE 8 — Le Chef
  {
    id: 'churchill', name: 'Winston Churchill', type: 8, category: 'leaders',
    quote: "Le succès, c'est aller d'échec en échec sans perdre son enthousiasme.",
    quoteSource: 'Attributed',
    coreFear: "Être contrôlé ou trahi",
    coreDesire: "Protéger ce qui lui appartient, dominer son destin",
    whyThisType: "Churchill est un Type 8 pur : son refus catégorique de se soumettre à Hitler, sa brutalité dans ses décisions, sa vitalité et son énergie indomptable, et sa façon de transformer la peur des autres en force collective.",
  },
  {
    id: 'mlk', name: 'Martin Luther King', type: 8, category: 'leaders',
    quote: "L'injustice quelque part est une menace pour la justice partout.",
    quoteSource: 'Letter from Birmingham Jail, 1963',
    coreFear: "Que l'injustice gagne",
    coreDesire: "Protéger les vulnérables, rendre justice",
    whyThisType: "MLK est un Type 8 épanoui. Sa puissance de conviction, son courage face à la menace de mort, sa façon de prendre physiquement position et sa passion pour protéger le faible contre le fort sont des expressions du Type 8 intégré.",
  },
  {
    id: 'steve_jobs', name: 'Steve Jobs', type: 8, category: 'leaders',
    quote: "Les gens qui sont assez fous pour penser qu'ils peuvent changer le monde sont ceux qui le font.",
    quoteSource: 'Campagne Think Different, Apple',
    coreFear: "La médiocrité, la perte de contrôle",
    coreDesire: "Imposer sa vision au monde",
    whyThisType: "Steve Jobs est un Type 8 intense : son champ de distorsion de la réalité (reality distortion field), sa brutalité envers les équipes, son refus absolu du compromis et sa façon de dominer par la force de sa volonté.",
  },
  {
    id: 'serena', name: 'Serena Williams', type: 8, category: 'icones',
    quote: "Je pense vraiment qu'un champion est défini non pas par ses victoires mais par comment il peut se remettre quand il tombe.",
    quoteSource: 'Interview Time Magazine',
    coreFear: "Être perçue comme faible",
    coreDesire: "Dominer, être invincible",
    whyThisType: "Serena est un Type 8 dans l'arène sportive : son intensité au combat, son refus de céder sous pression, sa confrontation directe des arbitres et sa capacité à transformer la colère en puissance physique.",
  },
  {
    id: 'darth_vader', name: 'Dark Vador', type: 8, category: 'fictifs',
    quote: "Je suis ton père.",
    quoteSource: "Star Wars : L'Empire contre-attaque",
    coreFear: "La vulnérabilité, aimer et perdre",
    coreDesire: "Contrôler, ne jamais être blessé à nouveau",
    whyThisType: "Dark Vador est le Type 8 dans sa désintégration vers le 5 : la peur de perdre Padmé l'a poussé à tout contrôler. Son masque (littéral et symbolique), sa brutalité et sa rédemption finale par l'amour de son fils sont une métaphore parfaite.",
  },

  // TYPE 9 — Le Médiateur
  {
    id: 'dalai', name: 'Dalaï-Lama', type: 9, category: 'leaders',
    quote: "Si tu veux que les autres soient heureux, pratique la compassion. Si tu veux être heureux, pratique la compassion.",
    quoteSource: 'The Art of Happiness',
    coreFear: "Le conflit, la fragmentation",
    coreDesire: "La paix intérieure et extérieure",
    whyThisType: "Le Dalaï-Lama est le Type 9 dans sa dimension spirituelle : sa vision de l'interconnexion de toutes choses, son refus de la confrontation, sa sérénité face aux provocations chinoises et son message universel d'harmonie.",
  },
  {
    id: 'audrey', name: 'Audrey Hepburn', type: 9, category: 'icones',
    quote: "Rien n'est impossible. Le mot lui-même dit 'Je suis possible'.",
    quoteSource: 'Attributed',
    coreFear: "Le conflit et la discorde",
    coreDesire: "L'harmonie, être aimée de tous",
    whyThisType: "Audrey Hepburn était un Type 9 : sa douceur légendaire, son travail humanitaire discret pour l'UNICEF, son aversion pour le scandale hollywoodien et sa façon de pacifier les tensions sur les plateaux en sont les signes.",
  },
  {
    id: 'morgan', name: 'Morgan Freeman', type: 9, category: 'icones',
    quote: "Comment est-ce qu'on se débarrasse du racisme ? On arrête d'en parler.",
    quoteSource: 'Interview 60 Minutes',
    coreFear: "La division et le chaos",
    coreDesire: "L'unité et la compréhension mutuelle",
    whyThisType: "Morgan Freeman incarne le Type 9 : sa voix apaisante, ses rôles de personnages sages et unificateurs (Dieu, Nelson Mandela, Lucius Fox), son refus du sensationnalisme et sa présence calme et contenante.",
  },
  {
    id: 'lincoln', name: 'Abraham Lincoln', type: 9, category: 'leaders',
    quote: "Je ne détruirai pas mon ennemi en en faisant mon ami.",
    quoteSource: 'Attributed',
    coreFear: "La guerre civile permanente, la division",
    coreDesire: "Réunifier, pacifier",
    whyThisType: "Lincoln est un Type 9 remarquable. Sa politique du 'Team of Rivals' (nommer ses ennemis à son cabinet), sa tolérance envers les opposants et sa recherche constante d'un compromis préservant l'union nationale sont du Type 9 pur.",
  },
  {
    id: 'walt', name: 'Walt Disney', type: 9, category: 'visionnaires',
    quote: "Tout commence par un rêve.",
    quoteSource: 'Attributed',
    coreFear: "Un monde hostile et sans magie",
    coreDesire: "Créer un espace de paix et d'émerveillement pour tous",
    whyThisType: "Walt Disney est un Type 9 créatif : sa vision d'un monde idéal et harmonieux, sa capacité à rassembler des gens très différents autour d'un rêve collectif et sa création d'espaces physiques dédiés à la fuite du monde réel.",
  },
];

// ── Helper ────────────────────────────────────────────────────

export function getFiche(id: string): Fiche | undefined {
  return FICHES.find(f => f.id === id);
}

export function getFichesByType(type: number): Fiche[] {
  return FICHES.filter(f => f.type === type);
}

// ── 5 Dossiers ────────────────────────────────────────────────

export const DOSSIERS: Dossier[] = [
  // ══════════════════════════════════════════════
  //  DOSSIER 1 — Les Visionnaires
  // ══════════════════════════════════════════════
  {
    id: 'visionnaires',
    title: 'Les Visionnaires',
    emoji: '🔬',
    desc: 'Scientifiques, philosophes & inventeurs',
    color: '#4a90d9',
    cases: [
      {
        id: 'v1', format: 'enquete', ficheId: 'einstein', answer: 5,
        indices: [
          "Cette personne préfère passer une soirée seule avec ses pensées plutôt qu'à une fête.",
          "Elle a développé des théories révolutionnaires en faisant des expériences de pensée imaginaires.",
          "Ses collègues la décrivaient comme absente, toujours dans sa tête, oubliant souvent de manger.",
          "Il a reformulé notre compréhension du temps et de l'espace avec E=mc².",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Einstein est l'archétype du Type 5. Son détachement du monde physique au profit de l'abstraction intellectuelle, son économie d'énergie sociale et sa façon de tout observer sans participer sont des marqueurs du Investigateur.",
      },
      {
        id: 'v2', format: 'citation', ficheId: 'tesla', quote: "Si vous voulez trouver les secrets de l'univers, pensez en termes d'énergie, de fréquence et de vibration.", author: 'Nikola Tesla', answer: 5,
        wrongOptions: [1, 3],
        explanation: "Tesla vivait entièrement dans son intellect. Cette citation révèle l'obsession du Type 5 : percer les mystères du réel par la seule force de la pensée.",
      },
      {
        id: 'v3', format: 'enquete', ficheId: 'gandhi', answer: 1,
        indices: [
          "Cette personne a renoncé à tout confort matériel par conviction morale.",
          "Elle a élaboré un code éthique strict qu'elle s'imposait avant de l'enseigner aux autres.",
          "Ses jeûnes n'étaient pas de la faiblesse mais des armes politiques basées sur des principes.",
          "Il a mené l'Inde vers l'indépendance par la non-violence absolue.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Gandhi est le Type 1 par excellence. Ses principes moraux guidaient chaque décision et il attendait de lui-même la même rigueur qu'il demandait aux autres — la définition du Perfectionniste.",
      },
      {
        id: 'v4', format: 'detail',
        scene: "Chaque matin, il refaisait ses calculs de la veille depuis le début — pas parce qu'il doutait du résultat, mais pour être sûr que la méthode était irréprochable. Ses cahiers ne contenaient aucune rature. Les erreurs étaient réécrites sur une nouvelle page.",
        keyDetail: "Recommencer les calculs pour la méthode, pas le résultat — aucune rature, perfection de forme.",
        answer: 1,
        explanation: "Le rejet de la rature et la vérification de la méthode plutôt que du résultat révèlent un Type 1 : ce n'est pas juste le bon résultat qui compte, c'est le processus parfait.",
        xp: 300,
      },
      {
        id: 'v5', format: 'faux_amis', typeA: 5, typeB: 4,
        descA: "Se retire du monde pour accumuler des connaissances. Ressent le besoin de tout comprendre avant d'agir. Détachement émotionnel apparent.",
        descB: "Se retire du monde car il se sent incompris. Cherche à exprimer ce qu'il ressent. L'intensité émotionnelle est au cœur de sa vision.",
        keyDiff: "Le 5 fuit vers l'intellect pour se protéger. Le 4 fuit vers l'émotion pour se trouver.",
        xp: 400,
      },
      {
        id: 'v6', format: 'enquete', ficheId: 'marie_curie', answer: 1,
        indices: [
          "Cette personne travaillait dans des conditions dangereuses et refusait de prendre des précautions pour elle-même.",
          "Elle a refusé de breveter ses découvertes estimant que la science devait appartenir à tous.",
          "Son laboratoire était rangé au millimètre. Ses protocoles expérimentaux étaient irréprochables.",
          "Première femme à obtenir un Prix Nobel, elle en a décroché deux dans des disciplines différentes.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Marie Curie incarne le Type 1 dans sa version la plus héroïque : l'idéal moral (la science pour tous) prime sur la survie personnelle. Son refus du brevet et sa rigueur absolue sont sa signature.",
      },
      {
        id: 'v7', format: 'citation', ficheId: 'confucius', quote: "La perfection est accessible à celui qui ne se lasse pas de s'améliorer.", author: 'Confucius', answer: 1,
        wrongOptions: [6, 3],
        explanation: "Cette citation révèle le cœur du Type 1 : l'amélioration constante de soi comme chemin vers l'idéal moral. Confucius a construit toute sa philosophie autour de ce principe.",
      },
      {
        id: 'v8', format: 'enquete', ficheId: 'freud', answer: 6,
        indices: [
          "Cette personne était obsédée par l'idée que ses proches pourraient le trahir ou le décevoir.",
          "Il avait besoin de disciples loyaux mais rompait violemment avec eux à la moindre divergence.",
          "Il voyait le monde comme fondamentalement hostile, régi par des forces cachées incontrôlables.",
          "Il a fondé la psychanalyse en explorant les angoisses et les mécanismes de défense.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Freud est un Type 6 fascinant : il a construit une théorie entière autour de l'anxiété — le sujet central du Type 6. Sa paranoïa des dissidences (Jung, Adler) et sa vision du monde comme fondamentalement menaçant en témoignent.",
      },
    ],
  },

  // ══════════════════════════════════════════════
  //  DOSSIER 2 — Les Artistes
  // ══════════════════════════════════════════════
  {
    id: 'artistes',
    title: 'Les Artistes',
    emoji: '🎨',
    desc: 'Musiciens, peintres & écrivains',
    color: '#7b68b5',
    cases: [
      {
        id: 'a1', format: 'enquete', ficheId: 'frida', answer: 4,
        indices: [
          "Cette artiste a transformé ses souffrances physiques intenses en œuvres d'art.",
          "Elle portait des vêtements traditionnels mexicains comme affirmation d'une identité radicalement personnelle.",
          "Sa douleur chronique était, selon elle, le matériau premier de son art.",
          "Ses autoportraits représentent sa quête de signification après un accident de bus qui a brisé sa colonne.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Frida Kahlo est l'archétype du Type 4. La transformation de la souffrance en beauté, la quête d'une identité unique et l'authenticité totale dans l'expression de soi en font la Romantique par excellence.",
      },
      {
        id: 'a2', format: 'citation', ficheId: 'dylan', quote: "Je suis un artiste, pas une industrie.", author: 'Bob Dylan', answer: 4,
        wrongOptions: [3, 8],
        explanation: "Cette citation révèle le rejet Type 4 de toute récupération commerciale. Pour Dylan, trahir son authenticité serait perdre son identité — la peur centrale du Romantique.",
      },
      {
        id: 'a3', format: 'enquete', ficheId: 'robin', answer: 7,
        indices: [
          "Cette personne utilisait l'humour comme bouclier pour cacher une profonde souffrance intérieure.",
          "Son énergie sur scène était débordante — il était incapable de rester assis ou de finir une seule idée.",
          "Ses proches décrivaient une personne adorable mais impossible à vraiment saisir.",
          "Comédien légendaire, il souffrait en secret d'une dépression intense et d'addictions.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Robin Williams est le visage le plus poignant du Type 7 : l'humour frénétique comme fuite d'une douleur intérieure. Le Type 7 cherche la joie non pas par légèreté, mais pour échapper à la souffrance.",
      },
      {
        id: 'a4', format: 'faux_amis', typeA: 4, typeB: 2,
        descA: "Donne beaucoup d'elle-même dans son art. Se sent incomprise. Cherche une connexion profonde. Sa souffrance lui semble unique.",
        descB: "Donne beaucoup d'elle-même aux autres. Se sent nécessaire. Cherche à être aimée en retour. Sa générosité n'est jamais totalement désintéressée.",
        keyDiff: "Le 4 donne pour s'exprimer. Le 2 donne pour être aimé. L'un cherche à être vu, l'autre à être nécessaire.",
        xp: 400,
      },
      {
        id: 'a5', format: 'enquete', ficheId: 'mozart', answer: 7,
        indices: [
          "Enfant prodige, cette personne n'était jamais aussi heureuse que lorsqu'elle créait.",
          "Son humour était enfantin et souvent déplacé — il faisait des blagues scatologiques à la cour de l'Impératrice.",
          "Il composait plusieurs œuvres en même temps, incapable de se fixer sur une seule.",
          "Prodige viennois, il composa plus de 600 œuvres avant de mourir à 35 ans.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Mozart est le Type 7 musicien par excellence. Son incapacité à s'ennuyer, son humour potache, son énergie créatrice multiple et sa joie de vivre irréductible même dans la misère sont des marqueurs classiques.",
      },
      {
        id: 'a6', format: 'detail',
        scene: "Elle refusait de quitter son appartement pendant des jours. Elle remplissait des carnets entiers, pas pour les publier, mais pour capturer quelque chose d'insaisissable. Ses amis la trouvaient parfois pleurant devant un coucher de soleil — trop beau pour ne pas faire mal.",
        keyDetail: "Pleurer devant un coucher de soleil — la beauté fait souffrir parce qu'elle révèle ce qui manque.",
        answer: 4,
        explanation: "Ce trait est quintessentiel du Type 4 : la beauté intensifie le sentiment de manque plutôt que de le combler. Le Romantique ressent les choses avec une intensité qui peut se retourner contre lui.",
        xp: 300,
      },
      {
        id: 'a7', format: 'citation', ficheId: 'adele', quote: "Je chante pour les gens qui ressentent les choses profondément.", author: 'Adèle', answer: 4,
        wrongOptions: [2, 9],
        explanation: "Cette citation révèle l'essence du Type 4 : la profondeur émotionnelle comme valeur centrale. Adèle ne chante pas pour divertir — elle chante pour être reconnue dans sa souffrance.",
      },
      {
        id: 'a8', format: 'enquete', ficheId: 'virginia', answer: 4,
        indices: [
          "Cette écrivaine décrivait la conscience humaine comme un flux impossible à interrompre.",
          "Elle souffrait d'épisodes dépressifs intenses qu'elle transformait en matériau littéraire.",
          "Ses romans ne racontent pas une histoire — ils capturent l'espace entre les mots.",
          "Auteure de Mrs Dalloway et de La Promenade au phare, figure du modernisme littéraire.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Virginia Woolf est un Type 4 littéraire. Son flux de conscience, sa mélancolie constitutive et sa tentative de capturer la réalité subjective intérieure sont des expressions profondes du Romantique.",
      },
    ],
  },

  // ══════════════════════════════════════════════
  //  DOSSIER 3 — Les Leaders
  // ══════════════════════════════════════════════
  {
    id: 'leaders',
    title: 'Les Leaders',
    emoji: '👑',
    desc: 'Politiques, entrepreneurs & activistes',
    color: '#d4a437',
    cases: [
      {
        id: 'l1', format: 'enquete', ficheId: 'churchill', answer: 8,
        indices: [
          "Cette personne refusait catégoriquement de négocier sous la menace.",
          "Il dormait peu, buvait beaucoup et travaillait avec une vitalité que ses collaborateurs trouvaient épuisante.",
          "Ses discours transformaient la peur collective en énergie combative.",
          "Il a dirigé la résistance britannique face à l'Allemagne nazie pendant la Seconde Guerre Mondiale.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Churchill est un Type 8 classique. Son refus de plier face à la menace, sa vitalité indomptable et sa capacité à transformer sa propre force en protection pour les autres sont la définition du Chef.",
      },
      {
        id: 'l2', format: 'citation', ficheId: 'mlk', quote: "L'injustice quelque part est une menace pour la justice partout.", author: 'Martin Luther King', answer: 8,
        wrongOptions: [1, 2],
        explanation: "Cette citation révèle le Type 8 dans sa version lumineuse : la défense du faible contre l'oppresseur. MLK n'avait pas peur de nommer l'ennemi et d'appeler à l'affrontement direct.",
      },
      {
        id: 'l3', format: 'enquete', ficheId: 'obama_barack', answer: 3,
        indices: [
          "Cette personne adaptait naturellement son langage et son style selon son audience.",
          "Ses discours étaient méticuleusement travaillés pour produire un effet précis.",
          "Il était fasciné par l'image qu'il projetait et travaillait son personal branding avec soin.",
          "Premier président américain afro-américain, il a remporté le Prix Nobel de la Paix en 2009.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Obama est le Type 3 dans sa version la plus épanouie. Son sens inné du personal branding, sa capacité à s'adapter à n'importe quelle audience et sa drive vers les accomplissements historiques sont des marqueurs forts.",
      },
      {
        id: 'l4', format: 'faux_amis', typeA: 8, typeB: 3,
        descA: "Veut contrôler l'environnement pour se protéger. Confronte directement. Sa force vient de l'intérieur. Il protège les faibles.",
        descB: "Veut atteindre ses objectifs pour être admiré. Adapte son image. Sa force vient du regard des autres. Il veut gagner.",
        keyDiff: "Le 8 est orienté pouvoir et protection. Le 3 est orienté succès et image. L'un veut contrôler, l'autre veut briller.",
        xp: 400,
      },
      {
        id: 'l5', format: 'enquete', ficheId: 'mandela', answer: 1,
        indices: [
          "Cette personne a passé 27 ans en prison sans abandonner ses principes.",
          "En sortant, il a refusé la vengeance et choisi la réconciliation — par principe, pas par faiblesse.",
          "Ses proches décrivaient une discipline intérieure d'une rigueur effrayante.",
          "Père de la nation arc-en-ciel, il a mis fin à l'apartheid en Afrique du Sud.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Mandela est le Type 1 dans sa dimension la plus héroïque : l'idéal moral prime sur tout, même la liberté personnelle. Sa réconciliation post-apartheid est le Type 1 intégré vers le 7 — la joie dans la justice accomplie.",
      },
      {
        id: 'l6', format: 'detail',
        ficheId: 'steve_jobs',
        scene: "Lors d'une réunion, il a regardé une présentation pendant 10 minutes en silence. Puis il a dit : 'C'est de la merde.' Il n'a donné aucune autre explication. L'équipe a refait le travail entièrement. La version suivante a été acceptée en 30 secondes.",
        keyDetail: "Verdict sans explication, pouvoir absolu, aucun compromis — et l'équipe refait tout sans question.",
        answer: 8,
        explanation: "Ce comportement est caractéristique du Type 8 en position d'autorité : décision immédiate, économie de justification et attente implicite que sa volonté soit exécutée. La force s'impose d'elle-même.",
        xp: 300,
      },
      {
        id: 'l7', format: 'citation', ficheId: 'elon', quote: "When something is important enough, you do it even if the odds are not in your favor.", author: 'Elon Musk', answer: 3,
        wrongOptions: [8, 1],
        explanation: "Musk révèle le Type 3 dans cette citation : l'importance d'un objectif se mesure à son impact potentiel sur sa réputation et son héritage. Le Type 3 prend des risques non par courage mais par ambition.",
      },
      {
        id: 'l8', format: 'enquete', ficheId: 'lincoln', answer: 9,
        indices: [
          "Ce dirigeant nommait délibérément ses ennemis politiques à son cabinet pour les garder proches.",
          "Il supportait les critiques acerbes de tous côtés sans jamais contre-attaquer directement.",
          "Son objectif unique était de préserver l'unité nationale, même au prix de compromis douloureux.",
          "Président américain pendant la Guerre de Sécession, il a aboli l'esclavage.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Lincoln est un Type 9 remarquable. Sa 'Team of Rivals', sa patience face aux attaques et son obsession de l'unité nationale au détriment de sa propre image sont des expressions du Médiateur en action.",
      },
    ],
  },

  // ══════════════════════════════════════════════
  //  DOSSIER 4 — Les Icônes
  // ══════════════════════════════════════════════
  {
    id: 'icones',
    title: 'Les Icônes',
    emoji: '⭐',
    desc: 'Acteurs, sportifs & figures pop',
    color: '#c0713a',
    cases: [
      {
        id: 'i1', format: 'enquete', ficheId: 'madonna', answer: 3,
        indices: [
          "Cette personne a changé d'image radicalement à chaque décennie pour rester au sommet.",
          "Elle étudiait les marchés, les tendances et les critiques pour anticiper son prochain mouvement.",
          "Son travail sur scène était moins de l'expression que de la construction d'une marque.",
          "Reine de la pop, icône des années 80-2000, elle a vendu plus de 300 millions d'albums.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Madonna est le manuel du Type 3 : reinvention permanente non par désir d'authenticité (ce serait le 4) mais par calcul de ce qui marche. Son identité EST sa marque — elle ne sait pas vraiment qui elle est sans succès.",
      },
      {
        id: 'i2', format: 'citation', ficheId: 'diana', quote: "Je veux être la reine des cœurs des gens.", author: 'Princesse Diana', answer: 2,
        wrongOptions: [3, 9],
        explanation: "Cette citation révèle le Type 2 dans toute sa complexité : le besoin d'être aimée se déguise en désir de donner. Diana cherchait l'amour à travers le service — la dynamique centrale du Altruiste.",
      },
      {
        id: 'i3', format: 'enquete', ficheId: 'robin', answer: 7,
        indices: [
          "Cette personnalité était décrite comme impossible à suivre en conversation — il passait d'une idée à l'autre à la vitesse de l'éclair.",
          "Ses proches disaient qu'il était toujours 'on' — comme si s'arrêter l'aurait détruit.",
          "Il utilisait l'humour pour dévier toute conversation qui se rapprochait de sa vraie douleur.",
          "Comédien légendaire de Good Will Hunting et Good Morning Vietnam, il cachait une profonde dépression.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Robin Williams est la face sombre du Type 7 : l'humour comme armure contre la douleur. Son incapacité à se poser, son énergie compulsive et sa souffrance cachée sont le portrait d'un 7 non intégré.",
      },
      {
        id: 'i4', format: 'faux_amis', typeA: 3, typeB: 7,
        descA: "Cherche la réussite pour être admiré. Travaille intensément. S'adapte à son audience. La peur de l'échec le drive.",
        descB: "Cherche l'aventure pour fuir la douleur. Saute d'un projet à l'autre. Emporte les autres dans son élan. La peur de la souffrance le drive.",
        keyDiff: "Le 3 court vers le succès. Le 7 fuit la souffrance. L'un veut être vu, l'autre veut être libre.",
        xp: 400,
      },
      {
        id: 'i5', format: 'enquete', ficheId: 'serena', answer: 8,
        indices: [
          "Cette sportive a contesté publiquement des décisions d'arbitrage qu'elle jugeait injustes, même au risque de perdre le match.",
          "Elle revenait plus forte à chaque blessure ou défaite — comme si l'obstacle l'énergisait.",
          "Son regard sur l'adversaire n'était pas hostile, c'était un signal : 'je ne reculerai pas'.",
          "Plus grande joueuse de tennis de l'histoire, 23 titres du Grand Chelem.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Serena Williams est un Type 8 dans l'arène sportive. Sa confrontation des arbitres, sa transformation de la colère en puissance et son refus absolu de la faiblesse sont des expressions directes du Chef.",
      },
      {
        id: 'i6', format: 'detail',
        ficheId: 'tom_hanks',
        scene: "Dans une interview, on lui demande s'il pense être un grand acteur. Il hésite longuement. 'Je ne sais pas vraiment. Chaque film, j'ai peur de ne pas être à la hauteur.' Il a remporté deux Oscars consécutifs la même semaine.",
        keyDetail: "Deux Oscars et encore hanté par le doute — la réussite ne calme pas l'anxiété.",
        answer: 6,
        explanation: "Tom Hanks illustre parfaitement le Type 6 : l'anxiété ne diminue pas avec le succès. Le Loyaliste cherche la sécurité — mais même au sommet, le doute persiste.",
        xp: 300,
      },
      {
        id: 'i7', format: 'citation', ficheId: 'jim', quote: "Mon humeur ne dépend pas de ce qui m'arrive, mais de ce que je décide de ressentir.", author: 'Jim Carrey', answer: 7,
        wrongOptions: [9, 4],
        explanation: "Cette citation révèle le Type 7 intégré : la liberté intérieure comme réponse à la douleur. Jim Carrey a travaillé toute sa vie à choisir la joie plutôt que de la subir.",
      },
      {
        id: 'i8', format: 'enquete', ficheId: 'audrey', answer: 9,
        indices: [
          "Cette star d'Hollywood fuyait les conflits et les scandales avec une constance remarquable.",
          "Son travail humanitaire pour l'UNICEF était discret, sans caméras, sans conférences de presse.",
          "Ses collègues parlaient d'une présence apaisante qui désamorçait les tensions sur les plateaux.",
          "Icône du cinéma classique, star de Breakfast at Tiffany's et Roman Holiday.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Audrey Hepburn incarne le Type 9 dans le monde du glamour. Sa douceur légendaire, son aversion du conflit et son travail humanitaire discret sont les signes d'une Médiatrice qui fuyait les projecteurs malgré sa célébrité.",
      },
    ],
  },

  // ══════════════════════════════════════════════
  //  DOSSIER 5 — Les Héros Fictifs
  // ══════════════════════════════════════════════
  {
    id: 'fictifs',
    title: 'Les Héros Fictifs',
    emoji: '🎭',
    desc: 'Films, séries & littérature',
    color: '#6b8f71',
    cases: [
      {
        id: 'f1', format: 'enquete', ficheId: 'sherlock_h', answer: 5,
        indices: [
          "Ce personnage préfère observer les gens depuis sa fenêtre plutôt que de les fréquenter.",
          "Il accumule des connaissances dans des domaines précis et parfaitement inutiles — le type de boue selon les quartiers de Londres.",
          "Les émotions lui semblent des 'données parasites' qui brouillent l'analyse.",
          "Détective au 221B Baker Street, il résout les affaires que Scotland Yard ne comprend pas.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Sherlock Holmes est le Type 5 fictif par excellence. Son détachement émotionnel, son intellect comme seule armure, son observation distante du monde humain et sa collection encyclopédique de savoirs inutiles sont la définition de l'Investigateur.",
      },
      {
        id: 'f2', format: 'citation', ficheId: 'darth_vader', quote: "Je suis ton père.", author: 'Dark Vador — Star Wars', answer: 8,
        wrongOptions: [1, 6],
        explanation: "Cette citation est la révélation du Type 8 sous le masque. Toute la tragédie de Vador vient d'un Type 8 qui a laissé la peur le corrompre : la peur de la vulnérabilité (perdre Padmé) l'a transformé en tyran.",
      },
      {
        id: 'f3', format: 'enquete', ficheId: 'katniss', answer: 6,
        indices: [
          "Ce personnage fait tout pour protéger sa famille, même se sacrifier.",
          "Elle n'est pas naturellement courageuse — elle est terrifiée, mais elle agit quand même.",
          "Sa méfiance des autorités et des institutions est totale et justifiée.",
          "Héroïne des Hunger Games, elle devient le symbole de la rébellion malgré elle.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Katniss est un Type 6 contre-phobique : elle fonce vers le danger pour protéger les siens. Sa loyauté absolue, son scepticisme envers le pouvoir (Capitol) et son courage malgré la peur sont des traits Type 6 classiques.",
      },
      {
        id: 'f4', format: 'faux_amis', typeA: 9, typeB: 6,
        descA: "Cherche la paix et l'harmonie. S'efface pour éviter le conflit. Difficile à mobiliser. Mais puissant quand il est éveillé.",
        descB: "Cherche la sécurité et la loyauté. Anticipe les menaces. Peut paniquer. Mais courageux quand acculé.",
        keyDiff: "Le 9 évite le conflit par amour de la paix. Le 6 anticipe le conflit par peur de la menace. L'un rêve d'harmonie, l'autre craint la trahison.",
        xp: 400,
      },
      {
        id: 'f5', format: 'enquete', ficheId: 'tony_stark', answer: 7,
        indices: [
          "Ce personnage utilise l'humour sarcastique pour éviter toute conversation sincère.",
          "Il lance plusieurs projets simultanément, incapable de s'ennuyer une seule seconde.",
          "Sous l'arrogance se cache une peur profonde : celle de ne pas avoir de valeur sans ses inventions.",
          "Génie milliardaire, playboy philanthrope — Iron Man.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Tony Stark est un Type 7 classique. Sa fuite en avant, son humour comme armure, ses projets multiples et compulsifs et sa transformation de la peur de la mort en armure littérale sont les marqueurs du Épicurien.",
      },
      {
        id: 'f6', format: 'detail',
        scene: "Il vivait seul depuis des années. Son appartement était rempli de livres sur des sujets sans rapport apparent. Quand on lui demandait comment il allait, il répondait avec des faits. Quand quelqu'un pleurait devant lui, il quittait discrètement la pièce — non par cruauté, mais parce qu'il ne savait pas quoi faire des émotions.",
        keyDetail: "Partir quand quelqu'un pleure — pas de cruauté, juste une incompétence émotionnelle sincère.",
        answer: 5,
        explanation: "Le retrait face aux émotions est un trait Type 5 fondamental. L'Investigateur ne fuit pas par malveillance — les émotions sont simplement un domaine où il ne dispose pas des ressources pour répondre.",
        xp: 300,
      },
      {
        id: 'f7', format: 'citation', ficheId: 'sherlock_h', quote: "Quand on a éliminé l'impossible, ce qui reste, si improbable soit-il, est nécessairement la vérité.", author: 'Sherlock Holmes', answer: 5,
        wrongOptions: [1, 3],
        explanation: "Cette citation illustre la pensée pure du Type 5 : la réalité se déduit par la logique, pas par l'intuition ou l'expérience. La vérité est une équation à résoudre.",
      },
      {
        id: 'f8', format: 'enquete', ficheId: 'walt', answer: 9,
        indices: [
          "Ce visionnaire voulait créer un espace où adultes et enfants pourraient coexister en paix.",
          "Il rassemblait autour de lui des créatifs très différents et savait créer une harmonie durable.",
          "Sa vision était toujours unificatrice : un monde où tous les conflits s'effacent devant la magie.",
          "Il a créé Mickey Mouse et le premier parc d'attractions thématique au monde.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Walt Disney est un Type 9 créatif. Sa vision d'un monde harmonieux, sa capacité à rassembler des gens très différents et sa création d'espaces dédiés à la fuite du monde réel sont des expressions profondes du Médiateur.",
      },
    ],
  },

  // ══════════════════════════════════════════════
  //  DOSSIER 6 — Les Stars
  // ══════════════════════════════════════════════
  {
    id: 'stars',
    title: 'Les Stars',
    emoji: '⭐',
    desc: 'Célébrités du grand écran, de la musique et du sport',
    color: '#e07b54',
    cases: [
      {
        id: 's1', format: 'enquete', ficheId: 'oprah', answer: 2,
        indices: [
          "Cette personne se sent vraiment elle-même quand elle peut transformer la vie des autres.",
          "Elle pleure régulièrement à l'écran avec ses invités — son empathie semble physique.",
          "Un jour, elle a offert une voiture à chaque personne dans son public, parce qu'elle « voulait qu'elles vivent leur meilleure vie ».",
          "Première femme afro-américaine milliardaire grâce à son talk-show empathique de plus de 25 ans.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Oprah incarne le Type 2 : générosité spectaculaire, lecture émotionnelle hors-norme et besoin profond d'être un catalyseur de transformation pour les autres. L'Altruiste se nourrit de connexion.",
      },
      {
        id: 's2', format: 'enquete', ficheId: 'elvis', answer: 2,
        indices: [
          "Cette personne avait un besoin compulsif d'être aimée — chaque applaudissement la nourrissait comme une drogue.",
          "Elle achetait des voitures, des maisons et des bijoux à des inconnus rencontrés dans la rue.",
          "Sa mère était la personne la plus importante de sa vie — il a fait peindre sa maison en rose pour elle.",
          "Le « King » du rock 'n' roll, mort à 42 ans dans sa résidence de Graceland.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Elvis est un Type 2 dans sa version dépendante : besoin permanent d'amour et de validation, générosité compulsive envers ses proches (la 'Memphis Mafia') et incapacité à survivre quand l'adoration faiblit.",
      },
      {
        id: 's3', format: 'citation', ficheId: 'taylor_swift', quote: "Long story short, I survived.", author: 'Taylor Swift', answer: 3,
        wrongOptions: [4, 6],
        explanation: "Cette phrase courte révèle le Type 3 : transformer chaque épreuve en récit de victoire. Pour le Battant, l'échec n'existe pas — il n'y a que des chapitres préparatoires au triomphe.",
      },
      {
        id: 's4', format: 'citation', ficheId: 'federer', quote: "Je joue pour gagner. C'est tout.", author: 'Roger Federer', answer: 3,
        wrongOptions: [8, 1],
        explanation: "Cette phrase épurée illustre le Type 3 dans sa version la plus élégante. Federer a maintenu son statut au sommet pendant deux décennies par cette focalisation totale sur le résultat — sans drame, sans excuse.",
      },
      {
        id: 's5', format: 'enquete', ficheId: 'jennifer', answer: 6,
        indices: [
          "Cette actrice est restée fidèle des années à la même coupe de cheveux et à la même bande d'amis.",
          "Elle parle souvent de sa peur d'être abandonnée et de sa difficulté à faire confiance à de nouvelles personnes.",
          "Sa carrière entière s'est construite autour du même groupe d'amis acteurs des années 90.",
          "Star de la sitcom Friends, devenue icône mondiale dans le rôle de Rachel Green.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Jennifer Aniston incarne le Type 6 : loyauté absolue envers son cercle proche, méfiance des changements et besoin de repères stables. Le Loyaliste préfère un terrain connu, même imparfait, à l'aventure.",
      },
      {
        id: 's6', format: 'detail', ficheId: 'morgan',
        scene: "Quand on lui demande son avis sur les sujets brûlants, il répond souvent par une phrase qui désamorce le conflit. À la question « Comment se débarrasser du racisme ? », sa réponse a fait scandale par sa simplicité : arrêtons d'en parler. Sur les plateaux, sa présence calme et sa voix grave apaisent toute tension. Il accepte des rôles très divers — Dieu, un président, un évadé de prison — sans jamais se laisser enfermer dans une image.",
        keyDetail: "Désamorcer le conflit par la simplicité plutôt que d'en débattre — préserver l'harmonie avant la victoire d'un argument.",
        answer: 9,
        explanation: "Morgan Freeman incarne le Type 9 : éviter les divisions inutiles, chercher l'unité plutôt que la confrontation et incarner une présence apaisante. Le Médiateur préserve la paix avant de trancher.",
        xp: 300,
      },
      {
        id: 's7', format: 'enquete', ficheId: 'mj', answer: 4,
        indices: [
          "Cette personne disait se sentir « la plus seule quand elle était sur scène devant des millions ».",
          "Elle a transformé son corps de façon radicale au fil des années, comme une quête identitaire physique.",
          "Sa musique parle constamment de douleur, d'enfance perdue et d'altérité absolue.",
          "Le « roi de la pop », auteur de Thriller, l'album le plus vendu de l'histoire.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Michael Jackson est un Type 4 archétypal : sentiment d'être radicalement différent depuis l'enfance, transformations corporelles comme quêtes identitaires et art profondément personnel teinté de mélancolie. Le Romantique vit la solitude au cœur de l'adulation.",
      },
      {
        id: 's8', format: 'enquete', ficheId: 'twain', answer: 6,
        indices: [
          "Cet écrivain a passé sa vie à anticiper des catastrophes qui ne sont jamais arrivées — et l'a écrit lui-même.",
          "Son humour mordant servait à dénoncer les hypocrisies des autorités et des institutions.",
          "Il a perdu et reconstruit sa fortune plusieurs fois — l'argent était une obsession anxieuse.",
          "Auteur américain des Aventures de Tom Sawyer et de Huckleberry Finn.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Mark Twain est un Type 6 contre-phobique : son ironie mordante était une arme contre l'anxiété sociale, sa méfiance des autorités est typique du Loyaliste, et son humour permettait de dire les vérités gênantes sans s'exposer directement.",
      },
    ],
  },

  // ══════════════════════════════════════════════
  //  DOSSIER 7 — Les Maîtres
  // ══════════════════════════════════════════════
  {
    id: 'maitres',
    title: 'Les Maîtres',
    emoji: '🎯',
    desc: 'Stratèges, scientifiques & guides spirituels',
    color: '#5b9e8f',
    cases: [
      {
        id: 'm1', format: 'enquete', ficheId: 'obama_michelle', answer: 1,
        indices: [
          "Cette personne relit ses discours dix fois avant de les prononcer — la perfection du message est un devoir.",
          "Sa philosophie publique se résume à une formule : « Quand ils descendent, nous montons. »",
          "Elle a mené un projet national contre l'obésité infantile par discipline et conviction morale.",
          "Première dame des États-Unis de 2009 à 2017, ex-avocate diplômée de Princeton et Harvard.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Michelle Obama est un Type 1 : auto-discipline rigoureuse, sens aigu du devoir, capacité à canaliser la colère en énergie constructive (« we go high »). Le Perfectionniste se mesure d'abord à ses propres standards.",
      },
      {
        id: 'm2', format: 'citation', ficheId: 'teresa', quote: "Si tu juges les gens, tu n'as plus le temps de les aimer.", author: 'Mère Teresa', answer: 2,
        wrongOptions: [9, 1],
        explanation: "Cette citation révèle l'essence du Type 2 : choisir l'amour comme posture première, refuser la distance critique. Mère Teresa a fait de cette phrase une règle de vie — typique d'un 2 qui écarte le jugement comme obstacle au don.",
      },
      {
        id: 'm3', format: 'enquete', ficheId: 'pope_francis', answer: 2,
        indices: [
          "Ce chef religieux a refusé d'habiter le palais traditionnel pour rester dans une chambre d'hôte modeste.",
          "Chaque Jeudi Saint, il lave et embrasse les pieds de prisonniers — y compris des femmes et des musulmans.",
          "Sa réponse célèbre à une question sur l'homosexualité dans l'Église : « Qui suis-je pour juger ? »",
          "Premier pape jésuite et premier pape latino-américain, élu en 2013.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Le Pape François incarne le Type 2 : refus du faste, proximité physique avec les pauvres et rejet du jugement comme barrière au don. L'Altruiste se définit par le service — pas par la position hiérarchique.",
      },
      {
        id: 'm4', format: 'faux_amis', typeA: 1, typeB: 2,
        descA: "Vit selon des principes moraux stricts. Cherche à améliorer le monde par la rigueur. Donne par devoir, pas par besoin d'être aimé.",
        descB: "Donne aux autres avec une chaleur immédiate. Cherche à être aimé en retour, même si cela reste inconscient. Le don est aussi une stratégie d'attachement.",
        keyDiff: "Le 1 donne par principe — il ferait la même chose même seul. Le 2 donne pour créer un lien — il a besoin que cela soit reçu.",
        xp: 400,
      },
      {
        id: 'm5', format: 'enquete', ficheId: 'branson', answer: 7,
        indices: [
          "Cette personne a lancé des dizaines d'entreprises sans aucun lien entre elles — musique, avion, train, espace, mobile.",
          "Sa philosophie est simple : « Le business doit être amusant. Sinon, change-le. »",
          "Il a fait de chaque échec une nouvelle aventure médiatique — voler en montgolfière, en bateau, en fusée.",
          "Fondateur du groupe Virgin, milliardaire britannique connu pour ses cascades publicitaires.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Richard Branson est un Type 7 entrepreneurial pur : besoin de nouveauté permanente, optimisme inébranlable, rejet de l'ennui et capacité à transformer chaque échec en aventure stimulante. L'Épicurien se nourrit d'options multiples.",
      },
      {
        id: 'm6', format: 'citation', ficheId: 'dalai', quote: "Si tu veux que les autres soient heureux, pratique la compassion. Si tu veux être heureux, pratique la compassion.", author: 'Dalaï-Lama', answer: 9,
        wrongOptions: [2, 4],
        explanation: "Cette citation révèle le Type 9 dans sa dimension spirituelle : voir l'unité fondamentale entre soi et les autres. Pour le Médiateur, il n'y a pas de paix individuelle séparée de la paix collective.",
      },
      {
        id: 'm7', format: 'enquete', ficheId: 'hawking', answer: 5,
        indices: [
          "Cette personne a vu son corps disparaître progressivement à cause d'une maladie incurable.",
          "Plus son corps se figeait, plus il s'est réfugié dans la pensée pure et l'astrophysique.",
          "Il a écrit son livre le plus célèbre en se forçant à n'utiliser qu'une seule équation, par souci d'élégance.",
          "Astrophysicien britannique atteint de SLA, auteur d'Une brève histoire du temps.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Stephen Hawking incarnait la résilience du Type 5 : face à la disparition de son corps, il a doublé son investissement dans l'intellect. Pour l'Investigateur, la pensée est le territoire le plus sûr — et parfois le dernier qui reste.",
      },
      {
        id: 'm8', format: 'enquete', ficheId: 'gates', answer: 5,
        indices: [
          "Cette personne s'isole deux fois par an dans une cabane pour lire pendant une semaine, sans interruption.",
          "Sa stratégie philanthropique est purement analytique : il optimise les vies sauvées par dollar dépensé.",
          "Jeune, il avait pour habitude de lire l'encyclopédie entière par curiosité personnelle.",
          "Cofondateur de Microsoft et de la fondation philanthropique la plus active au monde.",
        ],
        xpValues: [500, 350, 200, 50],
        explanation: "Bill Gates est un Type 5 intégré : besoin de retrait pour penser (ses fameuses Think Weeks), accumulation systématique de connaissances et approche analytique appliquée même à la générosité. L'Investigateur applique la rigueur intellectuelle à tous les domaines.",
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════
//  FUN FACTS — "Le saviez-vous ?" pour chaque fiche
//  Une anecdote courte qui illustre le type Ennéagramme
// ═══════════════════════════════════════════════════════════════

export const FUN_FACTS: Record<string, string> = {
  // ── Type 1 — Le Perfectionniste ──
  mandela:        "En prison, Nelson Mandela apprenait l'afrikaans pour pouvoir mieux argumenter avec ses geôliers — typique d'un Type 1 qui pense que la justice se gagne par la rigueur, pas par la rancœur.",
  gandhi:         "Gandhi se pesait chaque jour et notait scrupuleusement ce qu'il mangeait. Cette discipline morale poussée à l'extrême — appliquée d'abord à soi-même — est la marque du Type 1.",
  obama_michelle: "Michelle Obama relisait ses discours dix fois avant de les prononcer. Cette quête du « bien faire » — sans jamais se reposer sur ses acquis — est très révélatrice du Type 1.",
  marie_curie:    "Marie Curie a refusé toute sa vie de breveter ses découvertes, estimant que la science devait appartenir à tous. Une intégrité morale absolue, signature du Type 1.",
  confucius:      "Confucius répétait qu'à 70 ans, il pouvait enfin « suivre les désirs de son cœur sans transgresser les règles » — comme si toute sa vie n'avait été qu'un long entraînement à devenir juste.",

  // ── Type 2 — L'Altruiste ──
  diana:          "Lady Diana serrait les mains des malades du sida à une époque où on les évitait. Sa capacité à se rapprocher de la souffrance des autres — au mépris du protocole — est l'essence du Type 2.",
  teresa:         "Mère Teresa rappelait que « personne ne peut faire de grandes choses, seulement des petites choses avec un grand amour ». Cette focalisation sur l'attention donnée plutôt que sur l'impact mesuré est typique du Type 2.",
  oprah:          "Oprah Winfrey a offert des voitures à toute son audience un jour — non pas comme coup de pub, mais parce qu'elle « voulait qu'elles vivent leur meilleure vie ». Générosité spectaculaire, marque du Type 2.",
  elvis:          "Elvis Presley achetait des Cadillac à des inconnus rencontrés dans la rue. Son besoin compulsif de donner — pour être aimé en retour — est une expression intense du Type 2.",
  pope_francis:   "Le Pape François lave et embrasse les pieds de prisonniers chaque Jeudi Saint, y compris des femmes et des musulmans. Ce geste de service envers les marginaux est très Type 2.",

  // ── Type 3 — Le Battant ──
  obama_barack:   "Barack Obama a passé deux ans à perfectionner son discours d'investiture, conscient qu'il devait être « historique ». Cette mise en scène de soi tout en restant authentique est l'art du Type 3.",
  madonna:        "Madonna se réinvente tous les 5 ans (look, son, époque) — non pas par manque d'identité, mais parce que rester vivant socialement demande de toujours surprendre. Très Type 3.",
  taylor_swift:   "Taylor Swift a tout réenregistré ses anciens albums pour récupérer le contrôle de ses masters. Cette capacité à transformer un échec public en victoire stratégique est typique du Type 3.",
  federer:        "Roger Federer a perdu la finale de Wimbledon en 2008 contre Nadal — et a pleuré devant la caméra. Sa capacité à montrer sa fragilité tout en restant l'image de l'élégance est rare chez un Type 3.",
  elon:           "Elon Musk dort souvent dans ses usines pendant les périodes critiques. Cette obsession de la performance visible — au mépris de tout équilibre personnel — est une expression intense du Type 3.",

  // ── Type 4 — L'Artiste ──
  frida:          "Frida Kahlo a peint plus d'autoportraits que la quasi-totalité des artistes de son siècle. « Je me peins moi-même parce que je suis le sujet que je connais le mieux. » Pure essence du Type 4.",
  mj:             "Michael Jackson disait qu'il se sentait « le plus seul quand il était sur scène devant des millions ». Ce paradoxe — être adulé et incompris — est l'expérience profonde du Type 4.",
  dylan:          "Bob Dylan a refusé d'aller chercher son Prix Nobel pendant des semaines. Cette posture d'artiste qui ne joue pas le jeu — par authenticité plus que par snobisme — est très Type 4.",
  adele:          "Adèle a annulé sa tournée mondiale parce qu'elle « ne se sentait pas vraiment elle-même ». Mettre la fidélité à soi avant la machine commerciale est typique du Type 4.",
  virginia:       "Virginia Woolf écrivait debout, à un pupitre, comme sa sœur peintre travaillait à un chevalet. Faire de chaque détail du quotidien une expression de soi : signature du Type 4.",

  // ── Type 5 — L'Investigateur ──
  einstein:       "Einstein possédait plusieurs costumes identiques pour ne pas avoir à décider quoi porter. Préserver l'énergie mentale pour ce qui compte vraiment : très Type 5.",
  hawking:        "Stephen Hawking a écrit « Une brève histoire du temps » en se forçant à n'utiliser qu'une seule équation (E=mc²). Cette quête d'élégance dans la transmission du savoir est purement Type 5.",
  tesla:          "Nikola Tesla pouvait visualiser ses inventions entièrement dans sa tête, les faire « tourner » mentalement pendant des semaines avant de construire un seul prototype. Vision intérieure pure, marque du Type 5.",
  gates:          "Bill Gates s'isolait deux fois par an dans une cabane pour lire pendant une semaine sans interruption — son fameux « Think Week ». Le besoin de retrait pour penser est central chez le Type 5.",
  sherlock_h:     "Sherlock Holmes ignorait que la Terre tournait autour du Soleil — il refusait de stocker des informations qu'il ne jugeait pas utiles à son travail. Cette rationalisation extrême du savoir est l'archétype du Type 5.",

  // ── Type 6 — Le Loyaliste ──
  freud:          "Sigmund Freud refusait de se déplacer sans son fauteuil personnel. Ce besoin de repères familiers — même dans la grande aventure intellectuelle — est typique du Type 6.",
  tom_hanks:      "Tom Hanks est marié à la même femme depuis 1988 et a refusé pendant des années les rôles de « méchants ». Cette loyauté envers ses choix et son image est très Type 6.",
  jennifer:       "Jennifer Aniston est restée fidèle à la coupe « Rachel » et à ses amis de Friends pendant toute sa carrière. Son besoin de repères stables est une marque du Type 6.",
  katniss:        "Katniss Everdeen se porte volontaire à la place de sa sœur — pas par héroïsme, mais par loyauté absolue envers les siens. Action courageuse motivée par la protection : essence du Type 6.",
  twain:          "Mark Twain écrivait dans son journal qu'il avait « passé sa vie à anticiper des catastrophes qui ne sont jamais arrivées ». Cette ironie sur sa propre anxiété est très Type 6.",

  // ── Type 7 — L'Épicurien ──
  robin:          "Robin Williams improvisait pendant des heures, transformant chaque interview en spectacle. Cette capacité à fuir le silence par la créativité débordante est typique du Type 7.",
  mozart:         "Mozart composait souvent en jouant aux dés ou en faisant le clown. Mélanger plaisir et génie — sans hiérarchie entre les deux — est très Type 7.",
  branson:        "Richard Branson a lancé Virgin Galactic, Virgin Records, Virgin Atlantic, Virgin Mobile… sans aucun lien entre ces business. Le Type 7 ne choisit pas — il essaie tout.",
  jim:            "Jim Carrey s'est écrit un chèque de 10 millions de dollars en 1985 pour « services rendus en tant qu'acteur », daté de 1995. L'optimisme délirant et fertile du Type 7.",
  tony_stark:     "Tony Stark construit son armure dans une grotte pour s'évader d'un kidnapping — et en sort en plaisantant. Transformer la souffrance en aventure : pur Type 7.",

  // ── Type 8 — Le Chef ──
  churchill:      "Churchill recevait ses ministres dans son bain. Cette absence totale de gêne, ce refus du protocole quand il bloque l'action : très Type 8.",
  mlk:            "Martin Luther King a continué à marcher après avoir été poignardé en 1958 — la lame ayant frôlé l'aorte. Ne pas reculer face à la violence physique : essence du Type 8.",
  steve_jobs:     "Steve Jobs faisait pleurer ses ingénieurs dans les réunions, puis leur disait quelques jours plus tard qu'ils avaient produit « le meilleur travail de leur vie ». Brutalité et reconnaissance : duo classique du Type 8.",
  serena:         "Serena Williams a gagné l'Open d'Australie 2017 enceinte de 8 semaines. Refuser que son corps lui dicte ses limites — c'est le Type 8 à l'état pur.",
  darth_vader:    "Dark Vador étrangle un officier qui le contredit, sans même le toucher. Le Type 8 sous stress — quand le pouvoir devient le seul langage — atteint cette caricature.",

  // ── Type 9 — Le Médiateur ──
  dalai:          "Le Dalaï-Lama rit à pleins éclats même en parlant de l'invasion de son pays. Cette capacité à tenir la souffrance sans s'y dissoudre est l'expression spirituelle du Type 9.",
  audrey:         "Audrey Hepburn refusait de regarder ses propres films. « Je ne me trouve pas si intéressante. » Cet effacement de soi sans complexe est très Type 9.",
  morgan:         "Morgan Freeman a une voix si apaisante qu'elle est utilisée pour les méditations guidées, les documentaires et même Dieu (dans Bruce tout-puissant). La présence calme du Type 9 incarnée dans une voix.",
  lincoln:        "Lincoln gardait dans sa poche les lettres de ses adversaires politiques — pas pour se venger, mais pour mieux les comprendre. Cette empathie radicale envers tous les camps : signature du Type 9.",
  walt:           "Walt Disney imaginait Disneyland comme « un endroit où parents et enfants peuvent s'amuser ensemble ». Créer un monde où tout le monde s'entend — l'utopie du Type 9.",
};
