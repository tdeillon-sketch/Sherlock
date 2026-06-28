// ═══════════════════════════════════════════════════════════════
//  QUIZ V3 — Page-based adaptive engine
//
//  Remplace le système v2 (1 question à la fois, phases positioning/
//  adaptive/validation) par un flow par pages :
//    1. Page Likert 1 (5 sliders, types 1/3/5/7/9)
//    2. Page Likert 2 (5 sliders, types 2/4/6/8 + deeper)
//    3. Page Budget 3+ (5 steppers, 10 pts absolus, adaptatif sur top 3)
//    4. Page Finale (3 steppers, 6 pts) si top1/top2 proches
//    5. Page Wing (2 sliders) — détermine l'aile du type dominant
//
//  Pools par tranche d'âge :
//    - adulte : 54 statements en 1re personne (auto-évaluation)
//    - 5-8 / 9-12 / 13-17 : statements en 3e personne (parent observe
//      l'enfant). Plus courts, plus observables.
//
//  Wings : 18 statements par tranche (2 par aile × 9 types)
// ═══════════════════════════════════════════════════════════════

export type EnneaType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type TypeWeights = Partial<Record<EnneaType, number>>;
export type AgeBand = '5-8' | '9-12' | '13-17' | 'adulte' | 'adulte-obs';
export type QuizSubject = 'enfant' | 'self' | 'proche-self' | 'proche-obs';

/** Determine l'age band à partir d'un age entier */
export function ageToBand(age: number): AgeBand {
  if (age <= 8) return '5-8';
  if (age <= 12) return '9-12';
  return '13-17';
}

// ═══════════════════════════════════════════════════════════════
//  TYPE DESCRIPTIONS (identiques au web)
// ═══════════════════════════════════════════════════════════════

export interface TypeInfo {
  name: string;
  nameEn?: string;
  nick: string;
  nickEn?: string;
  color: string;
  fear: string;
  fearEn?: string;
  motive: string;
  motiveEn?: string;
  compul: string;
  compulEn?: string;
  wing: [EnneaType, EnneaType];
  stress: EnneaType;
  integ: EnneaType;
}

export const TYPES: Record<EnneaType, TypeInfo> = {
  1: { name: 'Le Perfectionniste', nameEn: 'The Reformer',
       nick: 'Perfectionniste', nickEn: 'The Perfectionist',
       color: '#c0713a',
       fear: 'Être mauvais, corrompu, défectueux.',
       fearEn: 'Being bad, corrupt, defective.',
       motive: 'Agir avec intégrité, améliorer le monde.',
       motiveEn: 'Acting with integrity, improving the world.',
       compul: 'Le ressentiment et la rigidité morale — un juge intérieur qui note tout.',
       compulEn: 'Resentment and moral rigidity — an inner judge that grades everything.',
       wing: [9, 2], stress: 4, integ: 7 },
  2: { name: 'L\'Altruiste', nameEn: 'The Helper',
       nick: 'Le Généreux', nickEn: 'The Giver',
       color: '#d49155',
       fear: 'Être indigne d\'amour, ne pas être désiré.',
       fearEn: 'Being unworthy of love, not being wanted.',
       motive: 'Aimer et être aimé.',
       motiveEn: 'Loving and being loved.',
       compul: 'L\'orgueil caché sous l\'aide — donner pour devenir indispensable.',
       compulEn: 'Pride hidden under helpfulness — giving to become indispensable.',
       wing: [1, 3], stress: 8, integ: 4 },
  3: { name: 'Le Battant', nameEn: 'The Achiever',
       nick: 'Le Gagneur', nickEn: 'The Performer',
       color: '#d4a24a',
       fear: 'Être sans valeur, un échec.',
       fearEn: 'Being worthless, a failure.',
       motive: 'Réussir, être admiré.',
       motiveEn: 'Succeeding, being admired.',
       compul: 'La tromperie de soi — vivre derrière un masque de réussite.',
       compulEn: 'Self-deception — living behind a mask of success.',
       wing: [2, 4], stress: 9, integ: 6 },
  4: { name: 'Le Romantique', nameEn: 'The Individualist',
       nick: 'L\'Individualiste', nickEn: 'The Romantic',
       color: '#9b8cb8',
       fear: 'Être insignifiant, ordinaire, sans identité propre.',
       fearEn: 'Being insignificant, ordinary, with no identity of one\'s own.',
       motive: 'Trouver et exprimer sa vérité unique.',
       motiveEn: 'Finding and expressing one\'s unique truth.',
       compul: 'L\'envie du manque — la mélancolie comme preuve de profondeur.',
       compulEn: 'Envy of what\'s missing — melancholy as proof of depth.',
       wing: [3, 5], stress: 2, integ: 1 },
  5: { name: 'L\'Observateur', nameEn: 'The Investigator',
       nick: 'L\'Investigateur', nickEn: 'The Observer',
       color: '#5b8db8',
       fear: 'Être submergé, vidé de ses ressources internes.',
       fearEn: 'Being overwhelmed, drained of inner resources.',
       motive: 'Comprendre, être compétent.',
       motiveEn: 'Understanding, being competent.',
       compul: 'L\'avarice de soi — retenir temps, énergie, émotions.',
       compulEn: 'Self-stinginess — withholding time, energy, emotions.',
       wing: [4, 6], stress: 7, integ: 8 },
  6: { name: 'Le Loyaliste', nameEn: 'The Loyalist',
       nick: 'Le Prudent', nickEn: 'The Loyal Skeptic',
       color: '#6b8ec4',
       fear: 'Être sans soutien, sans orientation.',
       fearEn: 'Being without support, without guidance.',
       motive: 'Se sentir en sécurité et soutenu.',
       motiveEn: 'Feeling safe and supported.',
       compul: 'La peur et le doute permanent — anticiper tous les scénarios.',
       compulEn: 'Constant fear and doubt — anticipating every scenario.',
       wing: [5, 7], stress: 3, integ: 9 },
  7: { name: 'L\'Épicurien', nameEn: 'The Enthusiast',
       nick: 'L\'Enthousiaste', nickEn: 'The Adventurer',
       color: '#7abf8e',
       fear: 'Être piégé dans la souffrance ou la privation.',
       fearEn: 'Being trapped in pain or deprivation.',
       motive: 'Vivre pleinement, multiplier les découvertes.',
       motiveEn: 'Living fully, multiplying discoveries.',
       compul: 'La gourmandise — fuir la douleur dans la multiplication des options.',
       compulEn: 'Gluttony — escaping pain by multiplying options.',
       wing: [6, 8], stress: 1, integ: 5 },
  8: { name: 'Le Chef', nameEn: 'The Challenger',
       nick: 'Le Challenger', nickEn: 'The Protector',
       color: '#d66a5c',
       fear: 'Être contrôlé, dominé, blessé.',
       fearEn: 'Being controlled, dominated, harmed.',
       motive: 'Rester maître de sa vie et de son destin.',
       motiveEn: 'Staying in charge of one\'s life and destiny.',
       compul: 'La luxure de contrôle — la force pour masquer la vulnérabilité.',
       compulEn: 'Lust for control — strength as a mask for vulnerability.',
       wing: [7, 9], stress: 5, integ: 2 },
  9: { name: 'Le Médiateur', nameEn: 'The Peacemaker',
       nick: 'Le Pacificateur', nickEn: 'The Mediator',
       color: '#b8a48a',
       fear: 'Être en conflit, perdre la paix intérieure.',
       fearEn: 'Being in conflict, losing inner peace.',
       motive: 'Vivre en paix, en harmonie avec tous.',
       motiveEn: 'Living in peace, in harmony with everyone.',
       compul: 'La paresse de soi — s\'endormir à ses propres désirs pour maintenir l\'harmonie.',
       compulEn: 'Self-forgetting — falling asleep to one\'s own desires to keep the peace.',
       wing: [8, 1], stress: 6, integ: 3 },
};

// ═══════════════════════════════════════════════════════════════
//  STATEMENTS
// ═══════════════════════════════════════════════════════════════

export type StmtDimension =
  | 'voice'     // voix intérieure
  | 'behavior'  // comportement observable
  | 'compul'    // compulsion / automatisme
  | 'body'      // ressenti corporel
  | 'belief'    // croyance sur le monde
  | 'emotion'   // vie émotionnelle
  | 'shadow'    // zone d'ombre
  | 'identity'  // sens de soi
  | 'attunement'// attention aux autres
  | 'aesthetic' // sensibilité esthétique
  | 'motive'    // motivation
  | 'fear'      // peur racine
  | 'stress'    // comportement sous stress
  | 'integ';    // flèche d'intégration

export interface Statement {
  id: string;
  t: EnneaType;
  e: string;        // emoji
  txt: string;      // phrase FR
  txtEn?: string;   // phrase EN
  dim: StmtDimension;
}

export interface WingStatement {
  id: string;
  wingOf: EnneaType;
  wingType: EnneaType;
  e: string;
  txt: string;      // FR
  txtEn?: string;   // EN
}

// ────────────────────────────────────────────────────────────────
//  POOL ADULTE (1re personne — auto-évaluation)
// ────────────────────────────────────────────────────────────────

const STATEMENTS_ADULTE: Statement[] = [
  // T1
  { id:'s1a_ad', t:1, e:'🔍', txt:'Je remarque automatiquement ce qui pourrait être mieux fait autour de moi', txtEn:'I automatically notice what could be done better around me', dim:'behavior' },
  { id:'s1b_ad', t:1, e:'📏', txt:'J\'ai une petite voix intérieure qui critique beaucoup ce que je fais', txtEn:'I have a quiet inner voice that critiques much of what I do', dim:'voice' },
  { id:'s1c_ad', t:1, e:'🔒', txt:'Je réprime mes pulsions — je me discipline, je me contrôle', txtEn:'I hold back my impulses — I discipline and control myself', dim:'compul' },
  { id:'s1d_ad', t:1, e:'😤', txt:'Quand c\'est mal fait, bâclé ou pas comme ça devrait être, ça me pèse physiquement', txtEn:'When something is poorly done, sloppy, or not as it should be, it weighs on me physically', dim:'body' },
  { id:'s1e_ad', t:1, e:'⚖️', txt:'J\'ai un sens aigu de ce qui devrait être — la réalité me déçoit souvent', txtEn:'I have a sharp sense of how things should be — reality often disappoints me', dim:'belief' },
  { id:'s1f_ad', t:1, e:'✅', txt:'J\'ai du mal à lâcher prise sur les détails — je retouche, je recommence jusqu\'à ce que ce soit bien', txtEn:'I have trouble letting go of details — I retouch and redo until it\'s right', dim:'behavior' },
  // T2
  { id:'s2a_ad', t:2, e:'💞', txt:'Je sens quand quelqu\'un va mal avant qu\'il ne parle — et je ne tiens pas en place tant que je ne l\'ai pas réconforté', txtEn:'I sense when someone is hurting before they speak — and I can\'t rest until I\'ve comforted them', dim:'attunement' },
  { id:'s2b_ad', t:2, e:'🤲', txt:'J\'anticipe les besoins des autres avant les miens', txtEn:'I anticipate other people\'s needs before my own', dim:'behavior' },
  { id:'s2c_ad', t:2, e:'🚫', txt:'J\'ai du mal à dire non aux gens à qui je tiens — j\'ai peur de les décevoir et de compter moins pour eux', txtEn:'I find it hard to say no to people I care about — I\'m afraid of disappointing them and mattering less to them', dim:'shadow' },
  { id:'s2d_ad', t:2, e:'😞', txt:'Ça me blesse qu\'on ne reconnaisse pas tout ce que je fais pour les autres', txtEn:'It hurts me when others don\'t recognize all I do for them', dim:'shadow' },
  { id:'s2e_ad', t:2, e:'🔗', txt:'Je cherche à me rendre indispensable à certaines personnes', txtEn:'I try to make myself indispensable to certain people', dim:'compul' },
  { id:'s2f_ad', t:2, e:'🧭', txt:'Je sais parfois mieux ce dont les autres ont besoin qu\'eux-mêmes', txtEn:'I sometimes know what others need better than they do themselves', dim:'belief' },
  // T3
  { id:'s3a_ad', t:3, e:'🎯', txt:'Je m\'adapte à ce qu\'on attend de moi pour performer et briller', txtEn:'I adapt to what\'s expected of me — to perform and shine', dim:'compul' },
  { id:'s3b_ad', t:3, e:'📉', txt:'L\'échec visible me terrifie plus que l\'échec privé', txtEn:'Public failure terrifies me far more than private failure', dim:'fear' },
  { id:'s3c_ad', t:3, e:'🎭', txt:'Je suis très conscient de l\'image que je projette', txtEn:'I\'m very aware of the image I project', dim:'behavior' },
  { id:'s3d_ad', t:3, e:'⏭️', txt:'Je mets mes émotions en pause pour avancer efficacement', txtEn:'I put my emotions on pause to keep moving forward efficiently', dim:'shadow' },
  { id:'s3e_ad', t:3, e:'🏅', txt:'Ma valeur personnelle est liée à mes accomplissements visibles', txtEn:'My self-worth is tied to my visible accomplishments', dim:'belief' },
  { id:'s3f_ad', t:3, e:'⚙️', txt:'Même épuisé, je continue à produire pour que personne ne voie ma performance faiblir', txtEn:'Even exhausted, I keep producing so no one sees my performance slip', dim:'stress' },
  // T4
  { id:'s4a_ad', t:4, e:'🫥', txt:'Je me sens souvent différent, à part — étranger au monde ordinaire', txtEn:'I often feel different, set apart — a stranger to the ordinary world', dim:'identity' },
  { id:'s4b_ad', t:4, e:'🌫️', txt:'Il me manque quelque chose d\'essentiel que les autres semblent avoir', txtEn:'Something essential is missing in me that others seem to have', dim:'fear' },
  { id:'s4c_ad', t:4, e:'🎨', txt:'Mon monde émotionnel intérieur est intense, coloré, parfois excessif', txtEn:'My inner emotional world is intense, vivid, sometimes excessive', dim:'emotion' },
  { id:'s4d_ad', t:4, e:'🌙', txt:'Je suis attiré par ce qui est beau et mélancolique — une douce nostalgie me touche plus que la gaieté ordinaire', txtEn:'I\'m drawn to what\'s beautiful and melancholic — a gentle wistfulness moves me more than ordinary cheer', dim:'aesthetic' },
  { id:'s4e_ad', t:4, e:'🌑', txt:'Le quotidien ordinaire me pèse : j\'ai le sentiment de passer à côté d\'une vie plus profonde et plus vraie', txtEn:'Ordinary daily life weighs on me: I feel I\'m missing out on a deeper, truer life', dim:'shadow' },
  { id:'s4f_ad', t:4, e:'🎭', txt:'Je cultive mes états d\'âme — ils font partie de ma richesse', txtEn:'I cultivate my moods — they\'re part of my richness', dim:'compul' },
  // T5
  { id:'s5a_ad', t:5, e:'🔋', txt:'J\'ai besoin de beaucoup plus de solitude que la plupart des gens pour me recharger', txtEn:'I need much more solitude than most people to recharge', dim:'behavior' },
  { id:'s5b_ad', t:5, e:'🔬', txt:'Avant d\'agir, j\'ai besoin de comprendre comment une chose fonctionne en entier — par curiosité, pas par prudence', txtEn:'Before acting, I need to understand how a thing fully works — out of curiosity, not caution', dim:'behavior' },
  { id:'s5c_ad', t:5, e:'🏰', txt:'Je protège mon temps et mon énergie comme des ressources rares', txtEn:'I protect my time and energy as scarce resources', dim:'compul' },
  { id:'s5d_ad', t:5, e:'🧠', txt:'Je me coupe émotionnellement pour protéger mon énergie — je reste dans ma tête', txtEn:'I cut off emotionally to protect my energy — I stay in my head', dim:'shadow' },
  { id:'s5e_ad', t:5, e:'📚', txt:'Je peux rester des heures dans mes idées sans m\'ennuyer, seul', txtEn:'I can spend hours alone with my own ideas without getting bored', dim:'behavior' },
  { id:'s5f_ad', t:5, e:'📡', txt:'Les demandes émotionnelles intenses des autres m\'épuisent vite', txtEn:'Other people\'s intense emotional demands wear me out quickly', dim:'stress' },
  // T6
  { id:'s6a_ad', t:6, e:'⚠️', txt:'J\'imagine spontanément ce qui pourrait mal tourner dans une situation', txtEn:'I spontaneously imagine what could go wrong in a situation', dim:'voice' },
  { id:'s6b_ad', t:6, e:'📋', txt:'Je revérifie tout avant : comme ça, rien ne peut me prendre au dépourvu', txtEn:'I go back over everything beforehand — that way nothing can catch me off guard', dim:'behavior' },
  { id:'s6c_ad', t:6, e:'❓', txt:'Je doute souvent de mes propres décisions, je cherche l\'avis des autres', txtEn:'I often doubt my own decisions and seek others\' opinions', dim:'shadow' },
  { id:'s6d_ad', t:6, e:'🛡️', txt:'J\'ai besoin de gens fiables autour de moi, de savoir sur quoi je peux compter pour me sentir en sécurité', txtEn:'I need reliable people around me, to know what I can count on to feel safe', dim:'motive' },
  { id:'s6e_ad', t:6, e:'🔎', txt:'Je teste les gens pour repérer ceux qui seront fiables et me soutiendront en cas de coup dur', txtEn:'I test people to spot the ones who\'ll be dependable and have my back when things go wrong', dim:'behavior' },
  { id:'s6f_ad', t:6, e:'🤝', txt:'Je reste loyal envers ceux qui ont gagné ma confiance — surtout quand les autres se mettent à douter d\'eux', txtEn:'I stay loyal to those who\'ve earned my trust — especially when others start to doubt them', dim:'motive' },
  // T7
  { id:'s7a_ad', t:7, e:'✨', txt:'Mes envies se multiplient vite — je passe d\'une idée excitante à une autre', txtEn:'My desires multiply quickly — I jump from one exciting idea to another', dim:'behavior' },
  { id:'s7b_ad', t:7, e:'😊', txt:'Plutôt que de rester avec une émotion pénible, je détourne vite mon attention vers du positif ou de plus réjouissant', txtEn:'Rather than sit with a painful feeling, I quickly redirect my attention toward the positive or something more upbeat', dim:'compul' },
  { id:'s7c_ad', t:7, e:'🎪', txt:'Je mène souvent plusieurs plans de front — n\'en choisir qu\'un me donne l\'impression de rater tous les autres', txtEn:'I usually run several plans at once — picking just one feels like missing out on all the rest', dim:'behavior' },
  { id:'s7d_ad', t:7, e:'☀️', txt:'Face à un problème, je vois surtout le bon côté et les possibilités, plutôt que ce qui ne va pas', txtEn:'Faced with a problem, I mostly see the bright side and the possibilities, rather than what\'s wrong', dim:'belief' },
  { id:'s7e_ad', t:7, e:'🔗', txt:'L\'ennui et la routine me sont insupportables', txtEn:'Boredom and routine are unbearable to me', dim:'fear' },
  { id:'s7f_ad', t:7, e:'🥂', txt:'Quand une émotion désagréable monte, je file vite vers quelque chose de plus stimulant', txtEn:'When an unpleasant feeling rises, I quickly chase something more stimulating', dim:'compul' },
  // T8
  { id:'s8a_ad', t:8, e:'⚡', txt:'Je prends spontanément les rênes quand personne ne décide — diriger et assumer le conflit ne me pèse pas', txtEn:'I spontaneously take charge when no one else decides — being in command and facing conflict doesn\'t weigh on me', dim:'behavior' },
  { id:'s8b_ad', t:8, e:'💬', txt:'Je dis les choses franchement, sans filtre', txtEn:'I say things straight — no filter', dim:'behavior' },
  { id:'s8c_ad', t:8, e:'👁️', txt:'Je sens d\'instinct les rapports de force dans une pièce', txtEn:'I instinctively sense the power dynamics in any room', dim:'attunement' },
  { id:'s8d_ad', t:8, e:'🦁', txt:'Je protège férocement les miens — personne ne touche à eux sans moi', txtEn:'I fiercely protect those who matter to me — no one touches them without me', dim:'motive' },
  { id:'s8e_ad', t:8, e:'⛓️', txt:'Être dirigé, contrôlé, limité me donne physiquement envie de résister', txtEn:'Being ordered around or limited gives me a physical urge to resist', dim:'fear' },
  { id:'s8f_ad', t:8, e:'👑', txt:'Quand je suis en confiance, je mets ma force au service de ceux que je protège — sans avoir besoin de dominer', txtEn:'When I feel secure, I put my strength behind the people I protect — without needing to dominate', dim:'integ' },
  // T9
  { id:'s9a_ad', t:9, e:'🕊️', txt:'Je cherche l\'harmonie, même au prix de mes propres désirs', txtEn:'I seek harmony, even at the cost of my own desires', dim:'compul' },
  { id:'s9b_ad', t:9, e:'💤', txt:'Je procrastine sur ce qui compte vraiment pour moi', txtEn:'I procrastinate on what truly matters to me', dim:'shadow' },
  { id:'s9c_ad', t:9, e:'🌊', txt:'Je me fonds dans l\'ambiance d\'un groupe au point d\'en oublier ma propre position', txtEn:'I blend into a group\'s mood so completely that I lose track of my own stance', dim:'behavior' },
  { id:'s9d_ad', t:9, e:'☮️', txt:'J\'évite les conflits ouverts autant que possible', txtEn:'I avoid open conflict whenever possible', dim:'compul' },
  { id:'s9e_ad', t:9, e:'🤷', txt:'Je mets du temps à savoir ce que MOI je veux vraiment', txtEn:'It takes me time to know what I really want for myself', dim:'shadow' },
  { id:'s9f_ad', t:9, e:'☁️', txt:'Je m\'anesthésie parfois dans la routine — je me désinvestis de moi', txtEn:'I sometimes numb myself in routine — I disengage from myself', dim:'stress' },
];

// ────────────────────────────────────────────────────────────────
//  POOLS ENFANTS (3e personne — parent observe l'enfant)
//  Draft initial — à affiner. Phrases courtes, comportements observables.
// ────────────────────────────────────────────────────────────────

const STATEMENTS_5_8: Statement[] = [
  // T1
  { id:'s1a_58', t:1, e:'🔍', txt:'Il/elle remarque quand un dessin, un rangement, une tâche n\'est pas "bien faite"', txtEn:'They notice when a drawing, a tidy-up, or a task isn\'t "done right"', dim:'behavior' },
  { id:'s1b_58', t:1, e:'📏', txt:'Il/elle recommence une activité jusqu\'à ce qu\'elle soit parfaite (ou abandonne, frustré·e)', txtEn:'They redo an activity until it\'s perfect (or give up, frustrated)', dim:'voice' },
  { id:'s1c_58', t:1, e:'🔒', txt:'Il/elle se discipline spontanément : range sans qu\'on le dise, veut que tout soit fait « comme il faut »', txtEn:'They discipline themselves: tidying without being asked, wanting everything done \\"the right way\\"', dim:'compul' },
  { id:'s1d_58', t:1, e:'😤', txt:'Il/elle s\'énerve visiblement face à une tricherie, même mineure', txtEn:'They visibly get upset when faced with cheating, even something minor', dim:'body' },
  { id:'s1e_58', t:1, e:'⚖️', txt:'Il/elle a déjà ses propres règles morales ("on fait pas ça", "c\'est pas bien")', txtEn:'They already have their own moral rules ("we don\'t do that", "that\'s wrong")', dim:'belief' },
  { id:'s1f_58', t:1, e:'✅', txt:'Il/elle est plus dur·e avec lui/elle-même qu\'avec les autres ; se fâche contre soi en cas d\'erreur', txtEn:'They are harder on themselves than on others; they get angry at themselves over a mistake', dim:'shadow' },
  // T2
  { id:'s2a_58', t:2, e:'💞', txt:'Il/elle console spontanément un camarade qui pleure', txtEn:'They spontaneously console a classmate who is crying', dim:'attunement' },
  { id:'s2b_58', t:2, e:'🤲', txt:'Il/elle offre ses jouets, partage son goûter, aime faire plaisir', txtEn:'They share their toys, their snack, love to please', dim:'behavior' },
  { id:'s2c_58', t:2, e:'🚫', txt:'Il/elle fait des dessins et des cadeaux pour les gens qu\'il/elle aime', txtEn:'They draw and make gifts for the people they love', dim:'shadow' },
  { id:'s2d_58', t:2, e:'😞', txt:'Il/elle boude si on ne remarque pas ce qu\'il/elle a fait pour vous', txtEn:'They sulk if you don\'t notice what they did for you', dim:'shadow' },
  { id:'s2e_58', t:2, e:'🔗', txt:'Il/elle veut être votre "meilleur·e ami·e" ou votre "aide préféré·e"', txtEn:'They want to be your "best friend" or your "favorite helper"', dim:'compul' },
  { id:'s2f_58', t:2, e:'🧭', txt:'Il/elle repère quand vous êtes fatigué·e ou triste, vient vous câliner', txtEn:'They notice when you\'re tired or sad, and come to cuddle you', dim:'belief' },
  // T3
  { id:'s3a_58', t:3, e:'🎯', txt:'Il/elle adore être félicité·e, applaudi·e, mis·e en avant', txtEn:'They love being praised, applauded, put in the spotlight', dim:'compul' },
  { id:'s3b_58', t:3, e:'📉', txt:'Il/elle a très peur de perdre, de rater, d\'être mal classé·e', txtEn:'They\'re very afraid of losing, failing, being unfavorably ranked', dim:'fear' },
  { id:'s3c_58', t:3, e:'🎭', txt:'Il/elle change d\'attitude selon l\'adulte en face, pour faire bonne impression à chacun', txtEn:'They shift their manner depending on which adult they\'re with, to make a good impression on each one', dim:'behavior' },
  { id:'s3d_58', t:3, e:'⏭️', txt:'Il/elle performe surtout quand on le/la regarde, puis guette si on a été impressionné·e', txtEn:'They perform mainly when watched, then check whether they impressed everyone', dim:'shadow' },
  { id:'s3e_58', t:3, e:'🏅', txt:'Les médailles, bons points, étoiles le/la motivent énormément', txtEn:'Stickers, gold stars, rewards motivate them enormously', dim:'belief' },
  { id:'s3f_58', t:3, e:'⚙️', txt:'Il/elle veut finir vite et bien pour qu\'on le/la trouve le/la meilleur·e', txtEn:'They want to finish fast and well so people see them as the best', dim:'stress' },
  // T4
  { id:'s4a_58', t:4, e:'🫥', txt:'Il/elle se sent souvent "pas comme les autres" dans le groupe', txtEn:'They often feel "not like the others" in the group', dim:'identity' },
  { id:'s4b_58', t:4, e:'🌫️', txt:'Il/elle a des moments de tristesse sans cause apparente', txtEn:'They have moments of sadness with no obvious cause', dim:'fear' },
  { id:'s4c_58', t:4, e:'🎨', txt:'Ses émotions sont fortes, il/elle passe vite du rire aux larmes', txtEn:'Their emotions are strong — they switch quickly from laughter to tears', dim:'emotion' },
  { id:'s4d_58', t:4, e:'🌙', txt:'Il/elle crée beaucoup (dessins, histoires, mises en scène) pour exprimer ce qu\'il/elle ressent à l\'intérieur', txtEn:'They create a lot (drawings, stories, little plays) to express what they feel inside', dim:'aesthetic' },
  { id:'s4e_58', t:4, e:'🌑', txt:'Quand il/elle est blessé·e, il/elle reste longtemps dans sa bouderie et ne s\'apaise que si on vient le/la chercher', txtEn:'When hurt, they stay in their sulk for a long time and only settle once someone comes to seek them out', dim:'shadow' },
  { id:'s4f_58', t:4, e:'🎭', txt:'Il/elle dramatise les petites contrariétés, théâtralise ses sentiments', txtEn:'They dramatize small upsets, theatricalize their feelings', dim:'compul' },
  // T5
  { id:'s5a_58', t:5, e:'🔋', txt:'Il/elle aime jouer seul·e longtemps, a besoin de temps calme pour ne pas s\'épuiser', txtEn:'They love playing alone for long stretches, need quiet time so as not to feel drained', dim:'behavior' },
  { id:'s5b_58', t:5, e:'🔬', txt:'Avant de jouer, il/elle observe pour comprendre les règles et le fonctionnement, puis se lance', txtEn:'Before playing, they watch to understand the rules and how it works, then jump in', dim:'behavior' },
  { id:'s5c_58', t:5, e:'🏰', txt:'Il/elle a besoin d\'un coin à lui/elle où on le/la laisse tranquille, sans être dérangé·e', txtEn:'They need a corner of their own where they\'re left alone, undisturbed', dim:'compul' },
  { id:'s5d_58', t:5, e:'🔋', txt:'Après une journée chargée, il/elle a besoin de s\'isoler pour « refaire le plein » d\'énergie', txtEn:'After a busy day, they need to withdraw alone to "recharge"', dim:'behavior' },
  { id:'s5e_58', t:5, e:'📚', txt:'Il/elle pose des questions précises sur "comment ça marche"', txtEn:'They ask precise questions about "how things work"', dim:'behavior' },
  { id:'s5f_58', t:5, e:'📡', txt:'Quand on lui demande beaucoup et qu\'il y a du monde autour, il/elle se vide vite et a besoin de se retirer', txtEn:'When a lot is asked of them and people are around, they run flat fast and need to pull away', dim:'stress' },
  // T6
  { id:'s6a_58', t:6, e:'⚠️', txt:'Il/elle pose beaucoup de questions "et si…" (et si on perd, et si ça arrive)', txtEn:'They ask many "what if…" questions (what if we lose, what if it happens)', dim:'voice' },
  { id:'s6b_58', t:6, e:'📋', txt:'Il/elle a besoin de savoir à l\'avance ce qui va se passer et s\'inquiète quand le programme change à l\'improviste', txtEn:'They need to know in advance what\'s going to happen and get anxious when the plan changes unexpectedly', dim:'behavior' },
  { id:'s6c_58', t:6, e:'❓', txt:'Il/elle hésite, redemande, cherche confirmation avant de décider', txtEn:'They hesitate, ask again, want confirmation before deciding', dim:'shadow' },
  { id:'s6d_58', t:6, e:'🛡️', txt:'Il/elle est plus calme quand les choses sont prévisibles : il/elle aime savoir d\'avance ce qui va se passer et qui fait quoi', txtEn:'They\'re calmer when things are predictable: they like to know in advance what will happen and who does what', dim:'motive' },
  { id:'s6e_58', t:6, e:'🔎', txt:'Face à une personne nouvelle, il/elle reste sur ses gardes, vérifie si on peut lui faire confiance avant de s\'approcher', txtEn:'With someone new, they stay on guard, checking whether the person can be trusted before getting closer', dim:'behavior' },
  { id:'s6f_58', t:6, e:'🤝', txt:'Il/elle ne se fie qu\'à un petit cercle de proches éprouvés et reste sur ses gardes avec les autres', txtEn:'They trust only a small circle of proven, familiar people and stay guarded with everyone else', dim:'motive' },
  // T7
  { id:'s7a_58', t:7, e:'✨', txt:'Il/elle passe très vite d\'une activité à une autre, commence tout sans finir', txtEn:'They jump very quickly from one activity to another, start everything without finishing', dim:'behavior' },
  { id:'s7b_58', t:7, e:'😊', txt:'Il/elle veut tout faire, déteste attendre, s\'ennuie vite', txtEn:'They want to do everything, hate waiting, get bored quickly', dim:'compul' },
  { id:'s7c_58', t:7, e:'🎪', txt:'Il/elle a toujours plein d\'idées, raconte des histoires farfelues', txtEn:'They always have plenty of ideas, tell tall tales', dim:'behavior' },
  { id:'s7d_58', t:7, e:'☀️', txt:'Il/elle rebondit vite après une contrariété, oublie le problème', txtEn:'They bounce back quickly after an upset, forget the problem', dim:'belief' },
  { id:'s7e_58', t:7, e:'🔗', txt:'Les punitions longues, les corvées, les attentes lui pèsent énormément', txtEn:'Long timeouts, chores, waiting weigh on them enormously', dim:'fear' },
  { id:'s7f_58', t:7, e:'🥂', txt:'Il/elle s\'enthousiasme pour tout ce qui est nouveau et excitant, et adore prévoir la prochaine sortie ou activité amusante', txtEn:'They light up at anything new and exciting, and love planning the next outing or fun activity', dim:'belief' },
  // T8
  { id:'s8a_58', t:8, e:'⚡', txt:'Il/elle prend la tête dans les jeux de groupe, organise les autres', txtEn:'They take the lead in group games, organize the others', dim:'behavior' },
  { id:'s8b_58', t:8, e:'💬', txt:'Il/elle dit "non" haut et fort, ne se laisse pas intimider', txtEn:'They say "no" loud and clear, won\'t be intimidated', dim:'behavior' },
  { id:'s8c_58', t:8, e:'👑', txt:'Il/elle veut commander le jeu et que les autres suivent ses règles', txtEn:'They want to run the game and have the others follow their rules', dim:'behavior' },
  { id:'s8d_58', t:8, e:'🦁', txt:'Il/elle défend ses copains plus faibles, s\'interpose dans les bagarres', txtEn:'They defend weaker friends, step into fights', dim:'motive' },
  { id:'s8e_58', t:8, e:'⛓️', txt:'Il/elle déteste être commandé·e, réagit fort aux ordres directs', txtEn:'They hate being given orders, react strongly to direct commands', dim:'fear' },
  { id:'s8f_58', t:8, e:'👑', txt:'Il/elle a une présence physique forte, une énergie marquée', txtEn:'They have a strong physical presence, marked energy', dim:'integ' },
  // T9
  { id:'s9a_58', t:9, e:'🕊️', txt:'Il/elle est facile, accommodant·e, suit ce que le groupe propose', txtEn:'They\'re easy-going, accommodating, follow what the group suggests', dim:'compul' },
  { id:'s9b_58', t:9, e:'💤', txt:'Il/elle traîne pour se mettre à une activité, met du temps à démarrer', txtEn:'They drag their feet starting an activity, take time to get going', dim:'shadow' },
  { id:'s9c_58', t:9, e:'🌊', txt:'Il/elle cède sa préférence sans protester pour ne pas contrarier les autres ("comme tu veux")', txtEn:'They give up their own preference without protest so as not to upset others ("whatever you want")', dim:'behavior' },
  { id:'s9d_58', t:9, e:'☮️', txt:'Il/elle fuit les disputes, pleure ou se met à l\'écart quand ça crie', txtEn:'They avoid disputes, cry or step aside when there\'s shouting', dim:'compul' },
  { id:'s9e_58', t:9, e:'🤷', txt:'Quand on lui demande ce qu\'il/elle veut, il/elle dit "je sais pas"', txtEn:'When asked what they want, they say "I don\'t know"', dim:'shadow' },
  { id:'s9f_58', t:9, e:'☁️', txt:'Quand on lui demande de faire quelque chose ou qu\'il y a de la tension, il/elle se réfugie devant un écran, comme « absent·e »', txtEn:'When asked to do something, or when there\'s tension, they take refuge in front of a screen, oddly "checked out"', dim:'stress' },
];

const STATEMENTS_9_12: Statement[] = [
  // T1
  { id:'s1a_912', t:1, e:'🔍', txt:'Il/elle repère les erreurs, corrige volontiers les adultes quand ils se trompent', txtEn:'They spot mistakes, willingly correct adults when they get something wrong', dim:'behavior' },
  { id:'s1b_912', t:1, e:'📏', txt:'Il/elle est perfectionniste sur ses devoirs : efface, refait, soigne', txtEn:'They\'re perfectionist about homework: erasing, redoing, taking pains', dim:'voice' },
  { id:'s1c_912', t:1, e:'🔒', txt:'Il/elle s\'en veut beaucoup quand il/elle rate une évaluation', txtEn:'They beat themselves up when they fail at a test', dim:'compul' },
  { id:'s1d_912', t:1, e:'😤', txt:'Les tricheurs, les menteurs le/la révoltent particulièrement', txtEn:'Cheaters and liars particularly upset them', dim:'body' },
  { id:'s1e_912', t:1, e:'⚖️', txt:'Il/elle a un avis tranché sur ce qui est juste à l\'école, à la maison', txtEn:'They have firm opinions on what\'s fair at school, at home', dim:'belief' },
  { id:'s1f_912', t:1, e:'✅', txt:'Il/elle supporte mal qu\'on lui fasse des reproches — se justifie longuement', txtEn:'They don\'t handle criticism well — they justify themselves at length', dim:'behavior' },
  // T2
  { id:'s2a_912', t:2, e:'💞', txt:'Il/elle est attentionné·e avec ses copains, écoute leurs soucis', txtEn:'They\'re attentive to their friends, listen to their concerns', dim:'attunement' },
  { id:'s2b_912', t:2, e:'🤲', txt:'Il/elle aime rendre service à l\'école (ramasser les cahiers, aider)', txtEn:'They love being useful at school (collecting notebooks, helping out)', dim:'behavior' },
  { id:'s2c_912', t:2, e:'🚫', txt:'Il/elle cède aux demandes de ses amis pour rester celui/celle sur qui ils comptent', txtEn:'They give in to their friends\' requests to stay the one their friends count on', dim:'shadow' },
  { id:'s2d_912', t:2, e:'😞', txt:'Il/elle est blessé·e si on oublie de le/la remercier', txtEn:'They\'re hurt if you forget to thank them', dim:'shadow' },
  { id:'s2e_912', t:2, e:'🔗', txt:'Il/elle cherche à être "le/la préféré·e" d\'un prof, d\'un adulte', txtEn:'They try to be the "favorite" of a teacher or another adult', dim:'compul' },
  { id:'s2f_912', t:2, e:'🧭', txt:'Il/elle propose spontanément son aide avant qu\'on lui demande', txtEn:'They spontaneously offer help before being asked', dim:'belief' },
  // T3
  { id:'s3a_912', t:3, e:'🎯', txt:'Il/elle change de style, d\'attitude selon le groupe où il/elle est', txtEn:'They change their style, attitude depending on the group', dim:'compul' },
  { id:'s3b_912', t:3, e:'📉', txt:'Il/elle a très peur de rater publiquement (exposé, compétition)', txtEn:'They\'re very afraid of failing publicly (an oral, a competition)', dim:'fear' },
  { id:'s3c_912', t:3, e:'🎭', txt:'Il/elle fait attention à son image — coiffure, vêtements, photos', txtEn:'They pay attention to their image — hairstyle, clothes, photos', dim:'behavior' },
  { id:'s3d_912', t:3, e:'⏭️', txt:'Il/elle minimise ses difficultés pour "rester dans la course"', txtEn:'They downplay their difficulties to "stay in the race"', dim:'shadow' },
  { id:'s3e_912', t:3, e:'🏅', txt:'Les notes, les classements, les médailles comptent énormément', txtEn:'Grades, rankings, medals matter enormously', dim:'belief' },
  { id:'s3f_912', t:3, e:'⚙️', txt:'Il/elle se pousse à fond, redouble d\'efforts pour rester en tête, ne pas se faire dépasser', txtEn:'They push themselves hard, redouble their efforts to stay ahead, not be overtaken', dim:'stress' },
  // T4
  { id:'s4a_912', t:4, e:'🫥', txt:'Il/elle se sent décalé·e, souvent incompris·e par les autres enfants', txtEn:'They feel out of step, often misunderstood by the other kids', dim:'identity' },
  { id:'s4b_912', t:4, e:'🌫️', txt:'Il/elle a des moments mélancoliques sans cause évidente', txtEn:'They have melancholy moments without obvious cause', dim:'fear' },
  { id:'s4c_912', t:4, e:'🎨', txt:'Ses émotions sont intenses — il/elle les exprime par l\'art, l\'écriture', txtEn:'Their emotions are intense — they express them through art, writing', dim:'emotion' },
  { id:'s4d_912', t:4, e:'🌙', txt:'Il/elle tient à ce qui est original, rare — et le revendique comme une façon de ne pas être comme les autres', txtEn:'They prize what\'s original and rare — and play it up as a way of not being like everyone else', dim:'aesthetic' },
  { id:'s4e_912', t:4, e:'🌑', txt:'Il/elle recherche des liens profonds et sincères, et se lasse vite des relations qui restent en surface', txtEn:'They seek deep, sincere bonds and quickly tire of relationships that stay on the surface', dim:'shadow' },
  { id:'s4f_912', t:4, e:'🎭', txt:'Il/elle se démarque volontairement — goûts, look ou idées à contre-courant de ce que les autres aiment', txtEn:'They set themselves apart on purpose — tastes, look, or ideas that cut against what the others like', dim:'compul' },
  // T5
  { id:'s5a_912', t:5, e:'🔋', txt:'Il/elle passe beaucoup de temps seul·e dans sa chambre, c\'est son besoin', txtEn:'They spend a lot of time alone in their room — that\'s their need', dim:'behavior' },
  { id:'s5b_912', t:5, e:'🔬', txt:'Il/elle préfère écouter et bien comprendre un sujet avant d\'y prendre part, puis y participe', txtEn:'They prefer to listen and grasp a subject well before joining in, then take part', dim:'behavior' },
  { id:'s5c_912', t:5, e:'🏰', txt:'Il/elle protège son espace personnel et son temps de récupération — se retire si on empiète dessus', txtEn:'They protect their personal space and recharge time — they withdraw if someone encroaches on it', dim:'compul' },
  { id:'s5d_912', t:5, e:'🧠', txt:'Il/elle exprime peu ses émotions, reste discret·e sur son intériorité', txtEn:'They share emotions sparingly, stay private about their inner life', dim:'shadow' },
  { id:'s5e_912', t:5, e:'📚', txt:'Il/elle a une passion qu\'il/elle approfondit énormément (livres, jeu, thème)', txtEn:'They have a passion they go very deep into (books, a game, a topic)', dim:'behavior' },
  { id:'s5f_912', t:5, e:'📡', txt:'Les sollicitations sociales denses l\'épuisent visiblement', txtEn:'Heavy social demands wear them out visibly', dim:'stress' },
  // T6
  { id:'s6a_912', t:6, e:'⚠️', txt:'Il/elle imagine les scénarios qui peuvent mal tourner, prépare des plans B', txtEn:'They imagine scenarios that might go wrong, prepare backup plans', dim:'voice' },
  { id:'s6b_912', t:6, e:'📋', txt:'Il/elle vérifie plusieurs fois (sa sacoche, ses devoirs, la porte fermée)', txtEn:'They check several times (their bag, their homework, the locked door)', dim:'behavior' },
  { id:'s6c_912', t:6, e:'❓', txt:'Il/elle doute de ses choix, demande confirmation à un adulte', txtEn:'They doubt their choices, ask an adult for confirmation', dim:'shadow' },
  { id:'s6d_912', t:6, e:'🛡️', txt:'Il/elle a besoin d\'adultes fiables et rassurants sur qui s\'appuyer, et d\'un quotidien prévisible pour se sentir en sécurité', txtEn:'They need dependable, reassuring adults to lean on, and a predictable routine to feel safe', dim:'motive' },
  { id:'s6e_912', t:6, e:'🔎', txt:'Il/elle teste ses amis avant de leur confier quelque chose d\'important', txtEn:'They test friends before sharing anything important', dim:'behavior' },
  { id:'s6f_912', t:6, e:'🤝', txt:'Il/elle ne lâche pas un ami sous la pression du groupe, même si ça lui coûte sa place', txtEn:'They won\'t drop a friend under group pressure, even if it costs them their standing', dim:'motive' },
  // T7
  { id:'s7a_912', t:7, e:'✨', txt:'Il/elle s\'enthousiasme pour mille choses, papillonne d\'un intérêt à l\'autre', txtEn:'They get excited about a thousand things, flit from one interest to another', dim:'behavior' },
  { id:'s7b_912', t:7, e:'😊', txt:'Il/elle fuit l\'ennui à tout prix, supporte mal les moments calmes', txtEn:'They flee boredom at all costs, struggle with calm moments', dim:'compul' },
  { id:'s7c_912', t:7, e:'🎪', txt:'Il/elle se passionne pour une nouveauté, puis la laisse tomber inachevée dès qu\'une autre, plus excitante, surgit', txtEn:'They throw themselves into something new, then drop it unfinished the moment a more exciting one comes along', dim:'behavior' },
  { id:'s7d_912', t:7, e:'☀️', txt:'Il/elle transforme les contrariétés en opportunités, rebondit vite', txtEn:'They turn upsets into opportunities, bounce back fast', dim:'belief' },
  { id:'s7e_912', t:7, e:'🔗', txt:'Les longues contraintes, les corvées le/la font fuir mentalement', txtEn:'Long obligations, chores make them flee mentally', dim:'fear' },
  { id:'s7f_912', t:7, e:'🥂', txt:'Quand ça tourne mal, il/elle pense déjà au prochain truc sympa à faire et passe vite à autre chose', txtEn:'When things go wrong, they\'re already thinking of the next fun thing to do and quickly move on', dim:'belief' },
  // T8
  { id:'s8a_912', t:8, e:'⚡', txt:'Il/elle prend le lead dans son groupe, tranche dans les désaccords', txtEn:'They take the lead in their group, settle disagreements', dim:'behavior' },
  { id:'s8b_912', t:8, e:'💬', txt:'Il/elle dit ce qu\'il/elle pense franchement, sans filtre', txtEn:'They say what they think frankly, without filter', dim:'behavior' },
  { id:'s8c_912', t:8, e:'👑', txt:'Il/elle prend naturellement le contrôle d\'un groupe et impose sa volonté', txtEn:'They naturally take control of a group and impose their will', dim:'behavior' },
  { id:'s8d_912', t:8, e:'🦁', txt:'Il/elle défend farouchement son territoire, ses amis, sa fratrie', txtEn:'They fiercely defend their territory, friends, siblings', dim:'motive' },
  { id:'s8e_912', t:8, e:'⛓️', txt:'Il/elle résiste frontalement aux ordres directs', txtEn:'They resist direct orders head-on', dim:'fear' },
  { id:'s8f_912', t:8, e:'👑', txt:'Il/elle dégage une force tranquille — les autres se sentent en sécurité, protégés près de lui/d\'elle', txtEn:'They give off a calm strength — others feel safe and protected around them', dim:'integ' },
  // T9
  { id:'s9a_912', t:9, e:'🕊️', txt:'Il/elle recherche la paix, évite les prises de position conflictuelles', txtEn:'They seek peace, avoid taking sides in conflicts', dim:'compul' },
  { id:'s9b_912', t:9, e:'💤', txt:'Il/elle a beaucoup de mal à se lancer dans ses devoirs ; il/elle s\'occupe d\'abord de choses faciles et remet l\'essentiel à plus tard', txtEn:'They find it very hard to get started on homework; they drift to easy things first and put off what matters', dim:'shadow' },
  { id:'s9c_912', t:9, e:'🌊', txt:'Il/elle s\'adapte au groupe, suit plus qu\'il/elle n\'initie', txtEn:'They go along with the group, follow more than they initiate', dim:'behavior' },
  { id:'s9d_912', t:9, e:'☮️', txt:'Il/elle fuit les disputes, se met en retrait ou fait l\'arbitre', txtEn:'They avoid disputes, withdraw or play arbiter', dim:'compul' },
  { id:'s9e_912', t:9, e:'🤷', txt:'Il/elle a du mal à exprimer ses envies propres — "ça dépend"', txtEn:'They struggle to express what they actually want — "it depends"', dim:'shadow' },
  { id:'s9f_912', t:9, e:'☁️', txt:'Il/elle s\'isole dans ses écrans, sa musique, quand c\'est tendu', txtEn:'They retreat into screens, music, when things get tense', dim:'stress' },
];

const STATEMENTS_13_17: Statement[] = [
  // T1
  { id:'s1a_1317', t:1, e:'🔍', txt:'Quand quelque chose est mal fait, il/elle veut le corriger : il/elle s\'engage pour que les choses soient faites « comme il faut »', txtEn:'When something is done wrong, they want to fix it: they get involved so things are done the way they should be', dim:'behavior' },
  { id:'s1b_1317', t:1, e:'📏', txt:'Il/elle est très exigeant·e avec lui-même/elle-même, peu satisfait·e de ce qu\'il/elle rend', txtEn:'They\'re very demanding of themselves, rarely satisfied with what they turn in', dim:'voice' },
  { id:'s1c_1317', t:1, e:'🔒', txt:'Il/elle contient ses émotions, les exprime par des remarques pointues', txtEn:'They contain their emotions, expressing them through pointed remarks', dim:'compul' },
  { id:'s1d_1317', t:1, e:'😤', txt:'Il/elle relève l\'hypocrisie des adultes : ça l\'agace qu\'un adulte impose une règle qu\'il ne s\'applique pas à lui-même', txtEn:'They call out adults\' hypocrisy: it irritates them when an adult enforces a rule they don\'t follow themselves', dim:'body' },
  { id:'s1e_1317', t:1, e:'⚖️', txt:'Il/elle a un idéal moral strict, voit le monde en "bien / mal"', txtEn:'They have a strict moral ideal, see the world in "right / wrong"', dim:'belief' },
  { id:'s1f_1317', t:1, e:'✅', txt:'Il/elle supporte mal d\'avoir tort ou d\'avoir mal fait : se justifie, se défend, peine à le reconnaître', txtEn:'They can\'t stand being wrong or having done something badly: they justify, defend themselves, struggle to admit it', dim:'behavior' },
  // T2
  { id:'s2a_1317', t:2, e:'💞', txt:'Il/elle est "la personne confidente" — les autres se confient à lui/elle', txtEn:'They\'re the "confidante" — others come to them with their problems', dim:'attunement' },
  { id:'s2b_1317', t:2, e:'🤲', txt:'Il/elle se met spontanément en quatre pour rendre service à quelqu\'un en particulier (un·e ami·e, un·e prof, un·e voisin·e)', txtEn:'They spontaneously go out of their way to help one specific person (a friend, a teacher, a neighbor)', dim:'behavior' },
  { id:'s2c_1317', t:2, e:'🚫', txt:'Il/elle se rend toujours disponible, quitte à s\'épuiser — pour rester celui/celle dont on a besoin', txtEn:'They\'re always available, even at their own expense — to stay the one who\'s needed', dim:'shadow' },
  { id:'s2d_1317', t:2, e:'😞', txt:'Il/elle peut être rancunier·ère si on minimise son engagement pour les autres', txtEn:'They can hold a grudge if their efforts for others go unrecognized', dim:'shadow' },
  { id:'s2e_1317', t:2, e:'🔗', txt:'Il/elle se rend indispensable à ses ami·e·s — toujours là, celui/celle qui donne le plus', txtEn:'They make themselves indispensable to their friends — always there, the one who gives the most', dim:'compul' },
  { id:'s2f_1317', t:2, e:'🧭', txt:'Il/elle anticipe activement les besoins de ses proches', txtEn:'They actively anticipate the needs of those close to them', dim:'belief' },
  // T3
  { id:'s3a_1317', t:3, e:'🎯', txt:'Il/elle soigne son image publique, son profil sur les réseaux sociaux', txtEn:'They curate their public image, their social media profile', dim:'compul' },
  { id:'s3b_1317', t:3, e:'📉', txt:'Échouer à un examen, en public, le/la hante plus que tout', txtEn:'Failing at an exam in public haunts them more than anything', dim:'fear' },
  { id:'s3c_1317', t:3, e:'🎭', txt:'Il/elle s\'adapte à chaque groupe social pour y avoir sa place', txtEn:'They adapt to each social group to find their place', dim:'behavior' },
  { id:'s3d_1317', t:3, e:'⏭️', txt:'Il/elle met ses difficultés émotionnelles en pause pour avancer', txtEn:'They put their emotional difficulties on pause to keep going', dim:'shadow' },
  { id:'s3e_1317', t:3, e:'🏅', txt:'Sa valeur est liée à ses résultats scolaires, sportifs ou sociaux', txtEn:'Their worth is tied to their grades, sports, or social wins', dim:'belief' },
  { id:'s3f_1317', t:3, e:'⚙️', txt:'Il/elle se pousse à toujours faire mieux que les autres, à être le/la meilleur·e', txtEn:'They push themselves to always outdo others, to be the best', dim:'stress' },
  // T4
  { id:'s4a_1317', t:4, e:'🫥', txt:'Il/elle se sent profondément différent·e, à part', txtEn:'They feel deeply different, set apart', dim:'identity' },
  { id:'s4b_1317', t:4, e:'🌫️', txt:'Il/elle traverse des phases de mélancolie, comme si quelque chose d\'essentiel lui manquait au fond', txtEn:'They go through phases of melancholy, as if something essential were missing deep inside', dim:'fear' },
  { id:'s4c_1317', t:4, e:'🎨', txt:'Ses émotions sont centrales, il/elle vit par elles, les assume pleinement', txtEn:'Their emotions are central — they live by them, fully claim them', dim:'emotion' },
  { id:'s4d_1317', t:4, e:'🌙', txt:'Il/elle cultive un style personnel marqué (musique, vêtements, esthétique)', txtEn:'They cultivate a marked personal style (music, clothes, aesthetic)', dim:'aesthetic' },
  { id:'s4e_1317', t:4, e:'🌑', txt:'La banalité l\'attriste — il/elle est en quête de beauté, de profondeur, pour se sentir vraiment vivant·e', txtEn:'Banality saddens them — they seek beauty and depth to feel truly alive', dim:'shadow' },
  { id:'s4f_1317', t:4, e:'🎭', txt:'Il/elle s\'exprime par l\'art, la musique, l\'écriture — sensibilité revendiquée', txtEn:'They express themselves through art, music, writing — sensitivity claimed', dim:'compul' },
  // T5
  { id:'s5a_1317', t:5, e:'🔋', txt:'Il/elle a besoin de beaucoup plus de solitude que ses pairs', txtEn:'They need much more solitude than their peers', dim:'behavior' },
  { id:'s5b_1317', t:5, e:'🔬', txt:'Il/elle décide seul·e, à partir de sa propre analyse — il/elle veut d\'abord tout comprendre', txtEn:'They decide on their own, from their own analysis — they want to understand everything first', dim:'behavior' },
  { id:'s5c_1317', t:5, e:'🏰', txt:'Il/elle garde sa vie privée pour lui/elle, ne partage que ce qu\'il/elle veut bien', txtEn:'They keep their private life to themselves, share only what they choose to', dim:'compul' },
  { id:'s5d_1317', t:5, e:'🧠', txt:'Il/elle reste dans sa tête, semble parfois distant·e émotionnellement', txtEn:'They stay in their head, sometimes seem emotionally distant', dim:'shadow' },
  { id:'s5e_1317', t:5, e:'📚', txt:'Il/elle approfondit ses centres d\'intérêt à un niveau quasi-expert', txtEn:'They go expert-deep in their interests', dim:'behavior' },
  { id:'s5f_1317', t:5, e:'📡', txt:'Les situations socialement denses l\'épuisent, il/elle s\'en retire', txtEn:'Dense social situations exhaust them — they pull back', dim:'stress' },
  // T6
  { id:'s6a_1317', t:6, e:'⚠️', txt:'Il/elle anticipe les problèmes, envisage les pires scénarios', txtEn:'They anticipate problems, envision worst-case scenarios', dim:'voice' },
  { id:'s6b_1317', t:6, e:'📋', txt:'Il/elle se sur-prépare pour les examens et événements importants, avec un plan B pour tout ce qui pourrait déraper', txtEn:'They over-prepare for exams and big events, with a backup plan for anything that could go wrong', dim:'behavior' },
  { id:'s6c_1317', t:6, e:'❓', txt:'Il/elle doute de ses décisions, sollicite l\'avis de sa bande', txtEn:'They doubt their decisions, seek their friend group\'s opinion', dim:'shadow' },
  { id:'s6d_1317', t:6, e:'🛡️', txt:'Il/elle cherche une figure d\'autorité fiable sur qui s\'appuyer, mais la teste avant de lui faire confiance', txtEn:'They look for a reliable authority figure to lean on, but test it before giving their trust', dim:'motive' },
  { id:'s6e_1317', t:6, e:'🔎', txt:'Il/elle teste longuement les gens avant de leur faire confiance', txtEn:'They test people for a long time before trusting them', dim:'behavior' },
  { id:'s6f_1317', t:6, e:'🤝', txt:'Il/elle reste solidaire de ses amis de confiance même quand les soutenir est risqué ou que les autres les lâchent', txtEn:'They stand by their trusted friends even when backing them is risky or everyone else turns away', dim:'motive' },
  // T7
  { id:'s7a_1317', t:7, e:'✨', txt:'Il/elle enchaîne les projets, les passions, les envies', txtEn:'They line up projects, passions, desires', dim:'behavior' },
  { id:'s7b_1317', t:7, e:'😊', txt:'Dès qu\'un sujet devient lourd, il/elle l\'écarte en lançant une idée plus fun ou un nouveau plan', txtEn:'As soon as a topic gets heavy, they brush it aside by tossing out a more fun idea or a new plan', dim:'compul' },
  { id:'s7c_1317', t:7, e:'🎪', txt:'Il/elle mène plusieurs choses de front — études, amis, loisirs', txtEn:'They juggle several things at once — studies, friends, hobbies', dim:'behavior' },
  { id:'s7d_1317', t:7, e:'☀️', txt:'Il/elle reframe les galères en aventures, optimiste naturel', txtEn:'They reframe setbacks into adventures — a natural optimist', dim:'belief' },
  { id:'s7e_1317', t:7, e:'🔗', txt:'L\'ennui, la routine, les contraintes longues l\'étouffent vite', txtEn:'Boredom, routine, long obligations stifle them quickly', dim:'fear' },
  { id:'s7f_1317', t:7, e:'🥂', txt:'Toujours partant·e pour une sortie, une fête, une nouvelle expérience — il/elle déteste s\'ennuyer', txtEn:'Always up for an outing, a party, a new experience — they hate being bored', dim:'belief' },
  // T8
  { id:'s8a_1317', t:8, e:'⚡', txt:'Quand un groupe hésite, il/elle tranche et prend la direction — quitte à imposer sa volonté', txtEn:'When a group hesitates, they decide and take charge — even if it means imposing their will', dim:'behavior' },
  { id:'s8b_1317', t:8, e:'💬', txt:'Il/elle assume ses désaccords, dit les choses cash', txtEn:'They own their disagreements, say things bluntly', dim:'behavior' },
  { id:'s8c_1317', t:8, e:'👑', txt:'Il/elle ne se laisse jamais dominer ; il/elle veut rester maître de sa vie', txtEn:'They never let themselves be dominated; they want to stay in control of their life', dim:'fear' },
  { id:'s8d_1317', t:8, e:'🦁', txt:'Il/elle défend férocement ses proches, ne laisse rien passer', txtEn:'They fiercely defend their close ones, let nothing slide', dim:'motive' },
  { id:'s8e_1317', t:8, e:'⛓️', txt:'Il/elle supporte très mal d\'être dirigé·e, encadré·e', txtEn:'They really don\'t handle being directed, framed', dim:'fear' },
  { id:'s8f_1317', t:8, e:'👑', txt:'Il/elle impose sa présence physique, occupe l\'espace — sans chercher à plaire ni à séduire', txtEn:'They impose their physical presence, take up space — without trying to please or charm', dim:'integ' },
  // T9
  { id:'s9a_1317', t:9, e:'🕊️', txt:'Il/elle cherche l\'harmonie, évite les positions tranchées', txtEn:'They seek harmony, avoid hard positions', dim:'compul' },
  { id:'s9b_1317', t:9, e:'💤', txt:'Il/elle procrastine ses travaux, ses choix d\'orientation', txtEn:'They procrastinate on schoolwork, life choices', dim:'shadow' },
  { id:'s9c_1317', t:9, e:'🌊', txt:'Il/elle ne fait jamais de vagues : dans chaque groupe, il/elle se range à l\'avis général plutôt que d\'imposer le sien', txtEn:'They never make waves: in any group, they go along with the general view rather than push their own', dim:'behavior' },
  { id:'s9d_1317', t:9, e:'☮️', txt:'Il/elle fuit les conflits ouverts, se mure dans le silence', txtEn:'They avoid open conflicts, retreat into silence', dim:'compul' },
  { id:'s9e_1317', t:9, e:'🤷', txt:'Il/elle a du mal à savoir ce qu\'il/elle veut vraiment pour son avenir', txtEn:'They struggle to know what they really want for their future', dim:'shadow' },
  { id:'s9f_1317', t:9, e:'☁️', txt:'Il/elle se noie dans les écrans, les séries, pour oublier les tensions', txtEn:'They drown in screens, series, to escape tensions', dim:'stress' },
];

// ────────────────────────────────────────────────────────────────
//  POOL ADULTE — OBSERVÉ (3e personne — un proche décrit un adulte)
//  Sert à : « typer un proche » (mode observation) + le « second avis ».
//  Ancré sur la motivation cachée (« non pas X, mais Y »), pas le
//  comportement de surface — généré puis vérifié pour la discriminance.
// ────────────────────────────────────────────────────────────────

const STATEMENTS_ADULTE_OBS: Statement[] = [
  // T1
  { id:'s1a_adobs', t:1, e:'📏', txt:'Il/elle fait bien les choses même sans témoin — non pour impressionner, mais parce que bâcler lui semblerait incorrect', txtEn:'They do things properly even with no one watching — not to impress, but because cutting corners would feel improper to them', dim:'behavior' },
  { id:'s1b_adobs', t:1, e:'😤', txt:'Il/elle ravale son agacement non par souci de paix, mais parce que la colère lui semble une faute', txtEn:'They swallow their irritation not to keep the peace, but because anger itself feels to them like a fault', dim:'body' },
  { id:'s1c_adobs', t:1, e:'⚖️', txt:'Pas la peur de se tromper, mais le verdict de ne jamais être assez bien le/la ronge', txtEn:'Not the fear of getting it wrong, but the verdict of never being good enough eats at them', dim:'voice' },
  { id:'s1d_adobs', t:1, e:'🔒', txt:'Aucune détente avant le devoir accompli — comme s\'il fallait d\'abord mériter le droit de se faire plaisir', txtEn:'No relaxing until the duty is done — as if one first had to earn the right to enjoy oneself', dim:'compul' },
  { id:'s1e_adobs', t:1, e:'🌍', txt:'Il/elle sait comment les choses devraient être — et le monde le/la déçoit sans cesse de ne pas l\'être', txtEn:'They know how things ought to be — and the world endlessly disappoints them for not being that way', dim:'belief' },
  { id:'s1f_adobs', t:1, e:'😣', txt:'Il/elle refait en douce ce que d\'autres ont bâclé, puis culpabilise — comme si la colère était une faute', txtEn:'They quietly redo what others botched, then blame themselves — as if the anger itself were a wrong', dim:'shadow' },
  // T2
  { id:'s2a_adobs', t:2, e:'💞', txt:'Il/elle devine qu\'un proche va mal avant tout mot — et se sent rejeté·e si l\'autre se confie à un autre.', txtEn:'They sense a loved one is struggling before a word — and feel rejected if that person confides in someone else.', dim:'attunement' },
  { id:'s2b_adobs', t:2, e:'🤲', txt:'Il/elle se rapproche en devinant et comblant les besoins des autres — non par pur altruisme, mais pour être aimé·e en retour.', txtEn:'They get close by sensing and meeting others\' needs — not from pure altruism, but to be loved in return.', dim:'behavior' },
  { id:'s2c_adobs', t:2, e:'😞', txt:'Il/elle est secrètement blessé·e quand on ne remarque pas ce qu\'il/elle donne — même s\'il/elle jure que ce n\'était pas pour ça.', txtEn:'They\'re secretly hurt when no one notices what they give — even while insisting that wasn\'t the point.', dim:'shadow' },
  { id:'s2d_adobs', t:2, e:'🔗', txt:'Il/elle se rend indispensable aux siens — non par dévouement pur, mais parce qu\'être irremplaçable le/la rassure.', txtEn:'They make themselves indispensable to loved ones — not from pure devotion, but because being irreplaceable reassures them.', dim:'compul' },
  { id:'s2e_adobs', t:2, e:'🚫', txt:'S\'il/elle dit non à un proche, il/elle culpabilise et se rattrape vite — comme si refuser pouvait lui coûter l\'amour de l\'autre.', txtEn:'If they say no to a loved one, they feel guilty and quickly make up for it — as if refusing could cost them that person\'s love.', dim:'shadow' },
  { id:'s2f_adobs', t:2, e:'🧭', txt:'Il/elle décide de ce qui est bon pour l\'autre et le lui impose sans qu\'on demande — persuadé·e d\'agir par amour.', txtEn:'They decide what\'s good for the other and impose it unasked — convinced they\'re acting out of love.', dim:'belief' },
  // T3
  { id:'s3a_adobs', t:3, e:'🦎', txt:'Il/elle ajuste sa manière d\'être selon le public, se moulant dans la version admirable qu\'on attend de lui/elle.', txtEn:'They tune how they come across to each audience, molding into the admirable version those people expect of them.', dim:'compul' },
  { id:'s3b_adobs', t:3, e:'📸', txt:'L\'image qu\'on garde de lui/elle compte plus que ce qu\'il/elle a vécu — il/elle la soigne jusqu\'à y croire.', txtEn:'The image people keep of them matters more than what they lived — they polish it until they believe it.', dim:'behavior' },
  { id:'s3c_adobs', t:3, e:'🚪', txt:'En public, toujours celui/celle qui réussit ; en privé seulement, il/elle se demande s\'il/elle vaudrait quelque chose sans ses succès.', txtEn:'In public, always the one who\'s winning; only in private do they wonder if they\'d be worth anything without the wins.', dim:'fear' },
  { id:'s3d_adobs', t:3, e:'⏸️', txt:'Une émotion difficile monte ? Il/elle la range et reste sur l\'objectif — non par calme, mais parce qu\'elle menacerait sa réussite.', txtEn:'A hard emotion rises? They file it away and stay on the goal — not for peace, but because it would threaten their success.', dim:'shadow' },
  { id:'s3e_adobs', t:3, e:'🏅', txt:'Un compliment sur ses accomplissements l\'illumine ; mais une réussite que personne n\'a vue le/la laisse vide, comme inexistante.', txtEn:'Praise for their achievements lights them up; yet a success no one saw leaves them empty, as if it never happened.', dim:'motive' },
  { id:'s3f_adobs', t:3, e:'🎬', txt:'Au bord de l\'épuisement, il/elle tient la façade — non pour bien faire, mais pour que personne ne le/la voie flancher.', txtEn:'On the edge of burnout, they hold the front — not to do it well, but so no one sees them falter.', dim:'stress' },
  // T4
  { id:'s4a_adobs', t:4, e:'🫥', txt:'Il/elle se vit fondamentalement à part et y tient : ni mieux ni moins bien, mais d\'une autre étoffe.', txtEn:'They feel fundamentally set apart and cling to it: not better, not worse, but made of different stuff.', dim:'identity' },
  { id:'s4b_adobs', t:4, e:'🌫️', txt:'Devant le bonheur tranquille des autres, sa première réaction n\'est pas la joie, mais l\'envie d\'une plénitude qu\'on lui aurait refusée.', txtEn:'Faced with others\' quiet happiness, their first reaction isn\'t joy but envy of a wholeness denied to them.', dim:'fear' },
  { id:'s4c_adobs', t:4, e:'🎨', txt:'Quand une émotion monte, il/elle ne se calme pas mais s\'y enfonce — comme si ressentir fort prouvait qu\'il/elle est vraiment vivant·e.', txtEn:'When a feeling rises, they don\'t settle down but sink into it — as if feeling intensely proved they\'re truly alive.', dim:'emotion' },
  { id:'s4d_adobs', t:4, e:'🌙', txt:'La mélancolie le/la touche plus que la gaieté facile — non pour se faire du mal, mais parce qu\'il/elle s\'y reconnaît enfin.', txtEn:'Melancholy moves them more than easy cheer — not to wallow, but because in it they finally recognize themselves.', dim:'aesthetic' },
  { id:'s4e_adobs', t:4, e:'🌑', txt:'L\'ordinaire l\'éteint, mais ce qui lui manque n\'est pas l\'aventure : c\'est un absolu jamais atteint, dont le manque même le/la nourrit.', txtEn:'The ordinary dulls them, but what they miss isn\'t adventure: it\'s an unreachable absolute whose very absence feeds them.', dim:'shadow' },
  { id:'s4f_adobs', t:4, e:'🎭', txt:'Blessé·e, il/elle amplifie sa douleur : être consolé·e ne suffit pas, il faut reconnaître que personne ne ressent comme lui/elle.', txtEn:'When wounded, they amplify their pain: being comforted isn\'t enough, one must acknowledge that no one feels as they do.', dim:'stress' },
  // T5
  { id:'s5a_adobs', t:5, e:'🔋', txt:'Après une longue exposition aux autres, il/elle ressort à plat — ni bouderie ni conflit à digérer, mais une réserve interne vidée.', txtEn:'After a long stretch around people, they come out flat — not sulking, not a conflict to digest, but an inner reserve run dry.', dim:'stress' },
  { id:'s5b_adobs', t:5, e:'🏰', txt:'Il/elle calcule l\'énergie que chaque chose coûtera, comme un budget — qu\'on lui prenne ce temps, c\'est un prélèvement, pas une gêne.', txtEn:'They reckon the energy each thing will cost, like a budget — time taken from them is a withdrawal, not a mere annoyance.', dim:'compul' },
  { id:'s5c_adobs', t:5, e:'🔬', txt:'Il/elle refuse de se lancer avant d\'avoir tout compris — non par prudence, mais parce que se sentir incompétent·e lui est insupportable.', txtEn:'They refuse to start before grasping it fully — not out of caution, but because feeling incompetent is unbearable to them.', dim:'motive' },
  { id:'s5d_adobs', t:5, e:'🧠', txt:'Dès qu\'une émotion monte, il/elle l\'analyse au lieu de la vivre — il/elle l\'explique clairement tout en restant coupé·e de la sensation.', txtEn:'As a feeling rises, they analyze it instead of living it — explaining it clearly while staying cut off from the sensation.', dim:'shadow' },
  { id:'s5e_adobs', t:5, e:'📚', txt:'Il/elle disparaît des heures dans un sujet pointu — accumuler du savoir le/la rassure plus que la présence des gens.', txtEn:'They vanish for hours into a narrow subject — amassing knowledge reassures them more than people\'s company.', dim:'behavior' },
  { id:'s5f_adobs', t:5, e:'🧊', txt:'Il/elle ne livre presque rien de lui/elle — non par méfiance, mais parce que se dévoiler coûte une énergie qu\'il/elle préfère garder.', txtEn:'They reveal almost nothing of themselves — not from distrust, but because opening up costs energy they\'d rather keep.', dim:'compul' },
  // T6
  { id:'s6a_adobs', t:6, e:'⚠️', txt:'Même quand tout va bien, il/elle ne se détend pas vraiment : son esprit cherche déjà ce qui pourrait tout faire s\'effondrer.', txtEn:'Even when all is well, they don\'t truly relax: their mind is already scanning for what could make it all collapse.', dim:'voice' },
  { id:'s6b_adobs', t:6, e:'📞', txt:'Avant une décision qui l\'inquiète, il/elle consulte deux ou trois proches de confiance — son propre avis ne lui suffit pas.', txtEn:'Before a worrying decision, they consult two or three trusted people — their own judgment isn\'t enough for them.', dim:'shadow' },
  { id:'s6c_adobs', t:6, e:'🛡️', txt:'Ce qui l\'apaise n\'est pas le confort, mais de savoir qu\'il/elle a des appuis solides si tout s\'écroule.', txtEn:'What settles them isn\'t comfort, but knowing they have solid people to lean on if everything falls apart.', dim:'motive' },
  { id:'s6d_adobs', t:6, e:'🔎', txt:'Face à une autorité ou une promesse, il/elle reste sur ses gardes tant qu\'on n\'a pas prouvé qu\'on tiendra dans la durée.', txtEn:'Toward an authority or a promise, they stay guarded until you\'ve proven you\'ll come through over time.', dim:'belief' },
  { id:'s6e_adobs', t:6, e:'🤝', txt:'Il/elle reste présent·e quand vous devenez un poids — non par devoir, mais parce qu\'abandonner quelqu\'un alors lui ferait horreur.', txtEn:'They stay present when you become a burden — not from duty, but because abandoning someone then would horrify them.', dim:'motive' },
  { id:'s6f_adobs', t:6, e:'😰', txt:'Sous pression, son imagination fonce vers le pire et il/elle sur-prépare tout — non pour bien faire, mais pour n\'être jamais pris·e au dépourvu.', txtEn:'Under pressure, their mind races to the worst and they over-prepare — not to do well, but to never be caught off guard.', dim:'stress' },
  // T7
  { id:'s7a_adobs', t:7, e:'✨', txt:'Il/elle garde toujours plusieurs portes ouvertes — non par indécision, mais parce que choisir une chose revient à se priver des autres', txtEn:'They always keep several doors open — not from indecision, but because choosing one thing means going without all the others', dim:'behavior' },
  { id:'s7b_adobs', t:7, e:'🙈', txt:'Face à la peine d\'un proche, il/elle ne reste pas dans la tristesse : il/elle relativise, plaisante ou propose vite un plan', txtEn:'Faced with a loved one\'s pain, they won\'t stay in the sadness: they reframe it, joke, or quickly suggest a plan', dim:'attunement' },
  { id:'s7c_adobs', t:7, e:'🎠', txt:'S\'engager pour de bon le/la met mal à l\'aise — non par légèreté, mais par peur d\'un quotidien sans échappatoire', txtEn:'Committing for good makes them uneasy — not from flightiness, but from fear of a daily life with no way out', dim:'fear' },
  { id:'s7d_adobs', t:7, e:'🎈', txt:'Il/elle déserte dès que ça devient répétitif — non par paresse, car le creux de l\'effort lui pèse plus que l\'échec', txtEn:'They desert the moment it turns repetitive — not from laziness, since the dull stretch of effort weighs on them more than failure', dim:'compul' },
  { id:'s7e_adobs', t:7, e:'🥀', txt:'Devant une contrainte qui dure, il/elle s\'agite et cherche une issue plus agréable plutôt que de supporter le manque', txtEn:'Faced with a constraint that drags on, they get restless and hunt a pleasanter way out rather than tolerating the lack', dim:'stress' },
  { id:'s7f_adobs', t:7, e:'🌈', txt:'Il/elle imagine sans cesse mieux ailleurs — non par fantaisie, mais faute de pouvoir se contenter de ce qui est là', txtEn:'They endlessly picture something better elsewhere — not from whimsy, but for want of being able to settle for what\'s here', dim:'motive' },
  // T8
  { id:'s8a_adobs', t:8, e:'🪨', txt:'Si on le/la materne, il/elle se braque — pas par fierté, mais parce qu\'être pris·e en charge lui retire le contrôle.', txtEn:'If you coddle them, they bristle — not from pride, but because being taken care of strips away their control.', dim:'shadow' },
  { id:'s8b_adobs', t:8, e:'⚔️', txt:'Là où d\'autres cèdent pour la paix, il/elle pousse l\'affrontement — pas par anxiété, mais pour voir qui tient.', txtEn:'Where others give in for peace, they push the confrontation — not from anxiety, but to see who holds firm.', dim:'behavior' },
  { id:'s8c_adobs', t:8, e:'🚧', txt:'Une règle imposée sans justification le/la braque, même quand il/elle est d\'accord : l\'intolérable, c\'est qu\'on décide à sa place.', txtEn:'A rule imposed without reason makes them bristle, even when they agree: the intolerable part is being decided for.', dim:'fear' },
  { id:'s8d_adobs', t:8, e:'🦁', txt:'Qu\'on s\'en prenne à l\'un des siens et il/elle se dresse aussitôt — non par calcul, mais comme si l\'attaque le/la visait.', txtEn:'Let someone go after one of their own and they rise up at once — not by calculation, but as if the attack targeted them.', dim:'motive' },
  { id:'s8e_adobs', t:8, e:'🥊', txt:'Touché·e, il/elle réplique par la colère ou l\'action — non pour blesser, mais parce que montrer sa vulnérabilité, c\'est se livrer.', txtEn:'When hurt, they hit back with anger or action — not to wound, but because showing vulnerability means surrendering.', dim:'compul' },
  { id:'s8f_adobs', t:8, e:'📡', txt:'Il/elle repère d\'instinct qui détient vraiment le pouvoir et qui bluffe — les titres ne l\'impressionnent pas une seconde.', txtEn:'They instinctively spot who really holds power and who\'s bluffing — titles don\'t impress them for a second.', dim:'attunement' },
  // T9
  { id:'s9a_adobs', t:9, e:'🕊️', txt:'Il/elle adopte l\'avis des autres sans effort — comme si le calme comptait plus qu\'une position à soi.', txtEn:'They take on others\' views effortlessly — as if calm mattered more than having a stance of their own.', dim:'compul' },
  { id:'s9b_adobs', t:9, e:'🤐', txt:'Quand quelque chose le/la contrarie, sa contrariété s\'évapore d\'elle-même : il/elle minimise pour ne pas troubler le calme.', txtEn:'When something upsets them, the upset just evaporates: they play it down so nothing disturbs the calm.', dim:'behavior' },
  { id:'s9c_adobs', t:9, e:'💤', txt:'Il/elle s\'enlise dans de petites tâches faciles et n\'attaque jamais l\'essentiel qui compte pour lui/elle.', txtEn:'They sink into small easy tasks and never tackle the essential thing that matters to them.', dim:'shadow' },
  { id:'s9d_adobs', t:9, e:'😶', txt:'Interrogé·e sur ce qui lui ferait vraiment plaisir, il/elle reste sincèrement sans réponse — l\'envie elle-même semble endormie.', txtEn:'Asked what would genuinely please them, they draw a sincere blank — the wanting itself seems asleep.', dim:'fear' },
  { id:'s9e_adobs', t:9, e:'☁️', txt:'Poussé·e au conflit, il/elle ne s\'oppose jamais de front : il/elle ralentit, devient évasif/évasive et résiste sans bruit.', txtEn:'Pushed toward conflict, they never oppose head-on: they slow down, go vague, and resist without a sound.', dim:'stress' },
  { id:'s9f_adobs', t:9, e:'🌱', txt:'En sécurité, il/elle se réveille enfin : il/elle nomme ses désirs, prend parti et s\'engage, au lieu de s\'effacer.', txtEn:'When safe, they finally wake up: they name their wants, take a side and commit, instead of fading.', dim:'integ' },
];

export const STATEMENTS_BY_AGE: Record<AgeBand, Statement[]> = {
  '5-8': STATEMENTS_5_8,
  '9-12': STATEMENTS_9_12,
  '13-17': STATEMENTS_13_17,
  'adulte': STATEMENTS_ADULTE,
  'adulte-obs': STATEMENTS_ADULTE_OBS,
};

// ────────────────────────────────────────────────────────────────
//  WING STATEMENTS (par tranche d'âge)
// ────────────────────────────────────────────────────────────────

const WING_ADULTE: WingStatement[] = [
  { id:'w1_9_ad', wingOf:1, wingType:9, e:'🌙', txt:'Mon exigence s\'exprime plus dans la contemplation calme que dans l\'expression verbale', txtEn:'My standards express themselves more in quiet contemplation than in spoken words' },
  { id:'w1_2_ad', wingOf:1, wingType:2, e:'🤲', txt:'Mon exigence s\'exprime à travers le soin que je porte aux autres', txtEn:'My standards extend through the care I bring to others' },
  { id:'w2_1_ad', wingOf:2, wingType:1, e:'⚖️', txt:'J\'aime me rendre utile et faire plaisir, mais je tiens aussi à bien faire les choses — un service bâclé ne me ressemble pas', txtEn:'I love making myself useful and pleasing others, but I also care about doing things well — a sloppy favor isn\'t like me' },
  { id:'w2_3_ad', wingOf:2, wingType:3, e:'✨', txt:'J\'aime aider et qu\'on m\'apprécie pour ça — qu\'on remarque tout ce que j\'apporte aux autres', txtEn:'I love helping and being appreciated for it — people noticing all that I bring to others' },
  { id:'w3_2_ad', wingOf:3, wingType:2, e:'❤️', txt:'Mon succès inclut d\'être aimé et apprécié, pas seulement admiré', txtEn:'My success includes being loved and appreciated, not just admired' },
  { id:'w3_4_ad', wingOf:3, wingType:4, e:'🎭', txt:'Derrière ma performance, j\'ai un côté introspectif, parfois mélancolique', txtEn:'Behind my performance, I have an introspective, sometimes melancholic side' },
  { id:'w4_3_ad', wingOf:4, wingType:3, e:'🏆', txt:'Mon unicité s\'exprime AUSSI par des accomplissements visibles', txtEn:'My uniqueness ALSO expresses itself through visible accomplishments' },
  { id:'w4_5_ad', wingOf:4, wingType:5, e:'🏰', txt:'Ma singularité est surtout intérieure — je préfère la solitude pour la cultiver', txtEn:'My singularity is mostly inward — I prefer solitude to cultivate it' },
  { id:'w5_4_ad', wingOf:5, wingType:4, e:'🌌', txt:'Mon monde intellectuel a une dimension esthétique, imaginative', txtEn:'My intellectual world has an aesthetic, imaginative dimension' },
  { id:'w5_6_ad', wingOf:5, wingType:6, e:'🔎', txt:'J\'analyse les gens à distance, en retrait — avec, en plus, une vigilance prudente avant d\'accorder ma confiance', txtEn:'I analyze people from a distance, holding back — with, on top of that, a cautious wariness before I extend my trust' },
  { id:'w6_5_ad', wingOf:6, wingType:5, e:'📚', txt:'Mes inquiétudes passent par beaucoup d\'analyse et de réflexion', txtEn:'My worries run through extensive analysis and reflection' },
  { id:'w6_7_ad', wingOf:6, wingType:7, e:'🎉', txt:'Je décharge mes anxiétés dans l\'activité sociale, le mouvement', txtEn:'I release my anxieties through social activity, movement' },
  { id:'w7_6_ad', wingOf:7, wingType:6, e:'🤝', txt:'Mon goût pour la nouveauté coexiste avec de la loyauté, de la responsabilité', txtEn:'My taste for novelty coexists with loyalty and responsibility' },
  { id:'w7_8_ad', wingOf:7, wingType:8, e:'⚡', txt:'Mon appétit pour la nouveauté est musclé : je fonce sur ce qui m\'excite et je prends les choses en main pour le faire arriver', txtEn:'My appetite for novelty is muscular — I charge at whatever excites me and take the reins to make it happen' },
  { id:'w8_7_ad', wingOf:8, wingType:7, e:'🎢', txt:'Mon énergie de chef est doublée d\'un appétit pour le nouveau, l\'aventure', txtEn:'My leadership energy is paired with appetite for novelty, adventure' },
  { id:'w8_9_ad', wingOf:8, wingType:9, e:'🌾', txt:'Je prends les rênes avec calme — force tranquille plutôt qu\'agressive', txtEn:'I take charge calmly — quiet strength rather than aggression' },
  { id:'w9_8_ad', wingOf:9, wingType:8, e:'🦁', txt:'Mon calme est ancré dans une présence physique solide', txtEn:'My calm is anchored in a solid physical presence' },
  { id:'w9_1_ad', wingOf:9, wingType:1, e:'📏', txt:'Mon besoin de paix s\'accompagne d\'un sens du devoir, de l\'ordre', txtEn:'My need for peace comes with a sense of duty and order' },
];

// 5-8 : phrases courtes, comportements très concrets
const WING_5_8: WingStatement[] = [
  { id:'w1_9_58', wingOf:1, wingType:9, e:'🌙', txt:'Il/elle est exigeant·e mais discret·ète, surveille sans faire de bruit', txtEn:'They\'re demanding but quiet — they watch without making noise' },
  { id:'w1_2_58', wingOf:1, wingType:2, e:'🤲', txt:'Son exigence est chaleureuse : il/elle aide les copains à bien faire', txtEn:'Their demanding side is warm — they help classmates do well' },
  { id:'w2_1_58', wingOf:2, wingType:1, e:'⚖️', txt:'Il/elle adore aider ses copains et aimerait que tout soit bien fait, parfait', txtEn:'They love helping their friends and wish everything were done well, perfectly' },
  { id:'w2_3_58', wingOf:2, wingType:3, e:'✨', txt:'Il/elle aime être vu·e comme serviable, être le/la "chouchou" de la maîtresse', txtEn:'They love being seen as helpful, the teacher\'s "favorite"' },
  { id:'w3_2_58', wingOf:3, wingType:2, e:'❤️', txt:'Sa réussite inclut d\'être aimé·e et pas juste admiré·e', txtEn:'Their success includes being loved, not just admired' },
  { id:'w3_4_58', wingOf:3, wingType:4, e:'🎭', txt:'Derrière l\'éclat, il/elle a un côté rêveur·se, parfois mélancolique', txtEn:'Behind the shine, they have a dreamy, sometimes melancholic side' },
  { id:'w4_3_58', wingOf:4, wingType:3, e:'🏆', txt:'Il/elle veut qu\'on voie sa singularité — ses créations, ses dessins', txtEn:'They want their singularity to be seen — their creations, drawings' },
  { id:'w4_5_58', wingOf:4, wingType:5, e:'🏰', txt:'Sa sensibilité est surtout intérieure, cultivée seul·e dans sa chambre', txtEn:'Their sensitivity is mostly inward, cultivated alone in their room' },
  { id:'w5_4_58', wingOf:5, wingType:4, e:'🌌', txt:'Il/elle explore seul·e ses sujets favoris, avec une imagination très personnelle, poétique', txtEn:'They explore their favorite topics alone, with a very personal, poetic imagination' },
  { id:'w5_6_58', wingOf:5, wingType:6, e:'🔎', txt:'Il/elle observe et analyse longuement un nouveau venu avant de l\'approcher, en restant sur ses gardes', txtEn:'They watch and size up a newcomer at length before approaching, staying on their guard' },
  { id:'w6_5_58', wingOf:6, wingType:5, e:'📚', txt:'Ses inquiétudes passent par beaucoup de questions et d\'observations', txtEn:'Their worries run through many questions and observations' },
  { id:'w6_7_58', wingOf:6, wingType:7, e:'🎉', txt:'Ses anxiétés se calment dans le jeu, l\'activité avec les autres', txtEn:'Their anxieties calm down in play, in activity with others' },
  { id:'w7_6_58', wingOf:7, wingType:6, e:'🤝', txt:'Son enthousiasme est doublé d\'un fort attachement à ses copains', txtEn:'Their enthusiasm pairs with strong attachment to friends' },
  { id:'w7_8_58', wingOf:7, wingType:8, e:'⚡', txt:'Il/elle lance plein de nouveaux jeux avec une énergie débordante et entraîne les autres dedans', txtEn:'They launch lots of new games with bursting energy and pull the others in' },
  { id:'w8_7_58', wingOf:8, wingType:7, e:'🎢', txt:'Il/elle mène le jeu et entraîne tout le monde vers de nouvelles aventures', txtEn:'They lead the game and pull everyone into new adventures' },
  { id:'w8_9_58', wingOf:8, wingType:9, e:'🌾', txt:'Il/elle prend la place mais avec un calme tranquille', txtEn:'They take the lead but with quiet calm' },
  { id:'w9_8_58', wingOf:9, wingType:8, e:'🦁', txt:'Son calme est ancré physiquement, il/elle tient le sol', txtEn:'Their calm is anchored physically — they hold the ground' },
  { id:'w9_1_58', wingOf:9, wingType:1, e:'📏', txt:'Son besoin de paix est doublé d\'un sens des règles', txtEn:'Their need for peace is paired with a sense of rules' },
];

// 9-12 : vocabulaire un peu plus nuancé, contexte scolaire/groupe
const WING_9_12: WingStatement[] = [
  { id:'w1_9_912', wingOf:1, wingType:9, e:'🌙', txt:'Son exigence s\'exprime plus par l\'observation silencieuse que par la parole', txtEn:'Their standards express themselves more through silent observation than speech' },
  { id:'w1_2_912', wingOf:1, wingType:2, e:'🤲', txt:'Son exigence inclut de veiller sur les autres, de les pousser vers le mieux', txtEn:'Their standards include watching over others, pushing them to do better' },
  { id:'w2_1_912', wingOf:2, wingType:1, e:'⚖️', txt:'Il/elle adore aider ses amis et se sentir utile — même s\'il/elle leur fait parfois remarquer ce qui n\'est pas bien fait', txtEn:'They love helping their friends and feeling useful — even if they sometimes point out what isn\'t done right' },
  { id:'w2_3_912', wingOf:2, wingType:3, e:'✨', txt:'Il/elle adore aider — et aime qu\'on le voie et qu\'on l\'apprécie pour ça', txtEn:'They love helping — and love being seen and appreciated for it' },
  { id:'w3_2_912', wingOf:3, wingType:2, e:'❤️', txt:'Sa performance inclut d\'être aimé·e — pas seulement admiré·e', txtEn:'Their performance includes being loved — not only admired' },
  { id:'w3_4_912', wingOf:3, wingType:4, e:'🎭', txt:'Derrière la performance, il/elle a un côté introspectif, parfois triste', txtEn:'Behind the performance, they have an introspective, sometimes sad side' },
  { id:'w4_3_912', wingOf:4, wingType:3, e:'🏆', txt:'Il/elle veut être reconnu·e pour sa singularité, ses créations', txtEn:'They want to be recognized for their singularity, their creations' },
  { id:'w4_5_912', wingOf:4, wingType:5, e:'🏰', txt:'On devine chez lui/elle un monde intérieur singulier et profond, qu\'il/elle ne livre que par bribes et garde surtout pour lui/elle', txtEn:'You sense a singular, deep inner world in them, which they reveal only in glimpses and mostly keep to themselves' },
  { id:'w5_4_912', wingOf:5, wingType:4, e:'🌌', txt:'Son monde intellectuel a un côté imaginatif, artistique, esthétique', txtEn:'Their intellectual world has an imaginative, artistic, aesthetic side' },
  { id:'w5_6_912', wingOf:5, wingType:6, e:'🔎', txt:'Il/elle observe et analyse longtemps les gens pour les comprendre avant de leur accorder sa confiance — avec une teinte de méfiance', txtEn:'They observe and analyze people for a long time to understand them before granting trust — with a wary edge' },
  { id:'w6_5_912', wingOf:6, wingType:5, e:'📚', txt:'Il/elle gère ses inquiétudes par l\'analyse, la réflexion', txtEn:'They process worries through analysis, reflection' },
  { id:'w6_7_912', wingOf:6, wingType:7, e:'🎉', txt:'Il/elle décharge ses anxiétés dans l\'activité sociale, le mouvement', txtEn:'They release their anxieties through social activity, movement' },
  { id:'w7_6_912', wingOf:7, wingType:6, e:'🤝', txt:'Son enthousiasme s\'accompagne de loyauté envers ses proches', txtEn:'Their enthusiasm comes with loyalty toward their close ones' },
  { id:'w7_8_912', wingOf:7, wingType:8, e:'⚡', txt:'Son enthousiasme est fonceur : il/elle se lance dans de nouveaux projets sans hésiter et embarque les autres', txtEn:'Their enthusiasm is bold — they dive into new projects without hesitating and pull others along' },
  { id:'w8_7_912', wingOf:8, wingType:7, e:'🎢', txt:'Son leadership est doublé d\'un goût pour le nouveau, l\'aventure', txtEn:'Their leadership pairs with a taste for novelty, adventure' },
  { id:'w8_9_912', wingOf:8, wingType:9, e:'🌾', txt:'Il/elle prend les rênes avec calme, pas avec agressivité', txtEn:'They take charge calmly, not aggressively' },
  { id:'w9_8_912', wingOf:9, wingType:8, e:'🦁', txt:'Son calme est ancré dans une présence physique solide', txtEn:'Their calm is anchored in a solid physical presence' },
  { id:'w9_1_912', wingOf:9, wingType:1, e:'📏', txt:'Son besoin de paix s\'accompagne d\'un sens du devoir silencieux', txtEn:'Their need for peace comes with a quiet sense of duty' },
];

// 13-17
const WING_13_17: WingStatement[] = [
  { id:'w1_9_1317', wingOf:1, wingType:9, e:'🌙', txt:'Son exigence s\'exprime dans la contemplation plutôt que dans la parole', txtEn:'Their exigence expresses itself in contemplation rather than speech' },
  { id:'w1_2_1317', wingOf:1, wingType:2, e:'🤲', txt:'Son exigence s\'exprime via le soin porté aux autres, pour les faire grandir', txtEn:'Their exigence comes through care for others, helping them grow' },
  { id:'w2_1_1317', wingOf:2, wingType:1, e:'⚖️', txt:'Il/elle s\'investit chaleureusement pour les autres, mais avec de hautes exigences — et se montre critique si ce n\'est pas à la hauteur', txtEn:'They throw themselves warmly into helping others, but with high standards — and turn critical when things don\'t measure up' },
  { id:'w2_3_1317', wingOf:2, wingType:3, e:'✨', txt:'Il/elle aime aider et être apprécié·e pour ça — qu\'on voie et reconnaisse ce qu\'il/elle apporte aux autres', txtEn:'They love helping and being appreciated for it — wanting what they give to others to be seen and recognized' },
  { id:'w3_2_1317', wingOf:3, wingType:2, e:'❤️', txt:'Son succès inclut d\'être aimé·e et apprécié·e, pas seulement admiré·e de loin', txtEn:'Their success includes being loved and appreciated, not only admired from afar' },
  { id:'w3_4_1317', wingOf:3, wingType:4, e:'🎭', txt:'Derrière sa performance, il/elle a un côté introspectif, en quête de sens unique', txtEn:'Behind their performance, they have an introspective side, in search of unique meaning' },
  { id:'w4_3_1317', wingOf:4, wingType:3, e:'🏆', txt:'Il/elle veut être reconnu·e pour sa singularité — pas ignoré·e', txtEn:'They want to be recognized for their singularity — not ignored' },
  { id:'w4_5_1317', wingOf:4, wingType:5, e:'🏰', txt:'Sa singularité est surtout intérieure, cultivée dans la solitude', txtEn:'Their singularity is mostly inward, cultivated in solitude' },
  { id:'w5_4_1317', wingOf:5, wingType:4, e:'🌌', txt:'Son monde intellectuel a une dimension esthétique, ses obsessions sont singulières', txtEn:'Their intellectual world has an aesthetic dimension — their obsessions are singular' },
  { id:'w5_6_1317', wingOf:5, wingType:6, e:'🔎', txt:'Il/elle garde ses distances et analyse les gens en profondeur avant d\'accorder sa confiance — avec une pointe de méfiance', txtEn:'They keep their distance and analyze people deeply before granting trust — with a wary edge' },
  { id:'w6_5_1317', wingOf:6, wingType:5, e:'📚', txt:'Ses inquiétudes passent par beaucoup d\'analyse, il/elle approfondit avant d\'agir', txtEn:'Their worries run through extensive analysis — they go deep before acting' },
  { id:'w6_7_1317', wingOf:6, wingType:7, e:'🎉', txt:'Il/elle décharge ses anxiétés dans l\'activité sociale, a besoin des autres autour', txtEn:'They discharge their anxieties through social activity, need others around' },
  { id:'w7_6_1317', wingOf:7, wingType:6, e:'🤝', txt:'Son goût pour la nouveauté coexiste avec de la loyauté et de la responsabilité', txtEn:'Their taste for novelty coexists with loyalty and responsibility' },
  { id:'w7_8_1317', wingOf:7, wingType:8, e:'⚡', txt:'Son enthousiasme est fonceur — il/elle se jette dans les nouvelles expériences et n\'attend la permission de personne', txtEn:'Their enthusiasm is bold — they throw themselves into new experiences and don\'t wait for anyone\'s permission' },
  { id:'w8_7_1317', wingOf:8, wingType:7, e:'🎢', txt:'Son leadership est doublé d\'un appétit pour le nouveau, le stimulant', txtEn:'Their leadership pairs with appetite for novelty, stimulation' },
  { id:'w8_9_1317', wingOf:8, wingType:9, e:'🌾', txt:'Il/elle prend les rênes avec un calme intérieur, force tranquille', txtEn:'They take charge with inner calm — quiet strength' },
  { id:'w9_8_1317', wingOf:9, wingType:8, e:'🦁', txt:'Son calme est ancré dans une présence physique solide, peut basculer en force', txtEn:'Their calm is anchored in solid physical presence, can shift to firmness' },
  { id:'w9_1_1317', wingOf:9, wingType:1, e:'📏', txt:'Son besoin de paix s\'accompagne d\'exigences morales silencieuses', txtEn:'Their need for peace comes with quiet moral expectations' },
];

export const WING_STATEMENTS_BY_AGE: Record<AgeBand, WingStatement[]> = {
  '5-8': WING_5_8,
  '9-12': WING_9_12,
  '13-17': WING_13_17,
  'adulte': WING_ADULTE,
  // Mode "observé" : pas d'étape aile (le builder skippe le wing si le pool est vide)
  'adulte-obs': [],
};

// ═══════════════════════════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════════════════════════

export function getStatements(ageBand: AgeBand): Statement[] {
  return STATEMENTS_BY_AGE[ageBand];
}

export function getWings(ageBand: AgeBand): WingStatement[] {
  return WING_STATEMENTS_BY_AGE[ageBand];
}

export function statementsByType(t: EnneaType, ageBand: AgeBand): Statement[] {
  return getStatements(ageBand).filter(s => s.t === t);
}

export function findStmt(id: string, ageBand: AgeBand): Statement | WingStatement | undefined {
  return getStatements(ageBand).find(s => s.id === id)
      || getWings(ageBand).find(w => w.id === id);
}

export function pickStatement(
  t: EnneaType,
  ageBand: AgeBand,
  excludeIds: string[] = []
): string | null {
  const pool = statementsByType(t, ageBand).filter(s => !excludeIds.includes(s.id));
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)].id;
}
