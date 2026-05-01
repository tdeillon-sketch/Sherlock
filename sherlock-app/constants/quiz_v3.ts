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
export type AgeBand = '5-8' | '9-12' | '13-17' | 'adulte';
export type QuizSubject = 'enfant' | 'self';

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
  { id:'s1d_ad', t:1, e:'😤', txt:'Quand c\'est mal fait ou injuste, ça me pèse physiquement', txtEn:'When something is poorly done or unfair, it weighs on me physically', dim:'body' },
  { id:'s1e_ad', t:1, e:'⚖️', txt:'J\'ai un sens aigu de ce qui devrait être — la réalité me déçoit souvent', txtEn:'I have a sharp sense of how things should be — reality often disappoints me', dim:'belief' },
  { id:'s1f_ad', t:1, e:'✅', txt:'J\'ai du mal à lâcher prise sur les détails — je vérifie, je retouche', txtEn:'I have trouble letting go of details — I check, retouch, redo', dim:'behavior' },
  // T2
  { id:'s2a_ad', t:2, e:'💞', txt:'Je sens immédiatement quand quelqu\'un va mal, avant même qu\'il ne parle', txtEn:'I sense immediately when someone is hurting, before they even speak', dim:'attunement' },
  { id:'s2b_ad', t:2, e:'🤲', txt:'J\'anticipe les besoins des autres avant les miens', txtEn:'I anticipate other people\'s needs before my own', dim:'behavior' },
  { id:'s2c_ad', t:2, e:'🚫', txt:'J\'ai du mal à dire non sans me sentir coupable', txtEn:'I have a hard time saying no without feeling guilty', dim:'shadow' },
  { id:'s2d_ad', t:2, e:'😞', txt:'Ça me blesse qu\'on ne reconnaisse pas tout ce que je fais pour les autres', txtEn:'It hurts me when others don\'t recognize all I do for them', dim:'shadow' },
  { id:'s2e_ad', t:2, e:'🔗', txt:'Je cherche à me rendre indispensable à certaines personnes', txtEn:'I try to make myself indispensable to certain people', dim:'compul' },
  { id:'s2f_ad', t:2, e:'🧭', txt:'Je sais parfois mieux ce dont les autres ont besoin qu\'eux-mêmes', txtEn:'I sometimes know what others need better than they do themselves', dim:'belief' },
  // T3
  { id:'s3a_ad', t:3, e:'🎯', txt:'Je m\'adapte à ce qu\'on attend de moi pour performer et briller', txtEn:'I adapt to what\'s expected of me — to perform and shine', dim:'compul' },
  { id:'s3b_ad', t:3, e:'📉', txt:'L\'échec visible me terrifie plus que l\'échec privé', txtEn:'Public failure terrifies me far more than private failure', dim:'fear' },
  { id:'s3c_ad', t:3, e:'🎭', txt:'Je suis très conscient de l\'image que je projette', txtEn:'I\'m very aware of the image I project', dim:'behavior' },
  { id:'s3d_ad', t:3, e:'⏭️', txt:'Je mets mes émotions en pause pour avancer efficacement', txtEn:'I put my emotions on pause to keep moving forward efficiently', dim:'shadow' },
  { id:'s3e_ad', t:3, e:'🏅', txt:'Ma valeur personnelle est liée à mes accomplissements visibles', txtEn:'My self-worth is tied to my visible accomplishments', dim:'belief' },
  { id:'s3f_ad', t:3, e:'⚙️', txt:'Je peux fonctionner en mode pilote automatique productif même épuisé', txtEn:'I can run on productive autopilot even when exhausted', dim:'stress' },
  // T4
  { id:'s4a_ad', t:4, e:'🫥', txt:'Je me sens souvent différent, à part — étranger au monde ordinaire', txtEn:'I often feel different, set apart — a stranger to the ordinary world', dim:'identity' },
  { id:'s4b_ad', t:4, e:'🌫️', txt:'Il me manque quelque chose d\'essentiel que les autres semblent avoir', txtEn:'Something essential is missing in me that others seem to have', dim:'fear' },
  { id:'s4c_ad', t:4, e:'🎨', txt:'Mon monde émotionnel intérieur est intense, coloré, parfois excessif', txtEn:'My inner emotional world is intense, vivid, sometimes excessive', dim:'emotion' },
  { id:'s4d_ad', t:4, e:'🌙', txt:'Je suis attiré par ce qui est beau, rare, mélancolique, authentique', txtEn:'I\'m drawn to what\'s beautiful, rare, melancholic, authentic', dim:'aesthetic' },
  { id:'s4e_ad', t:4, e:'🌑', txt:'Le banal, la routine, le quotidien me pèsent profondément', txtEn:'The banal, the routine, the everyday weighs on me deeply', dim:'shadow' },
  { id:'s4f_ad', t:4, e:'🎭', txt:'Je cultive mes états d\'âme — ils font partie de ma richesse', txtEn:'I cultivate my moods — they\'re part of my richness', dim:'compul' },
  // T5
  { id:'s5a_ad', t:5, e:'🔋', txt:'J\'ai besoin de beaucoup plus de solitude que la plupart des gens pour me recharger', txtEn:'I need much more solitude than most people to recharge', dim:'behavior' },
  { id:'s5b_ad', t:5, e:'🔬', txt:'Je préfère observer et comprendre avant de m\'engager dans l\'action', txtEn:'I prefer to observe and understand before committing to action', dim:'behavior' },
  { id:'s5c_ad', t:5, e:'🏰', txt:'Je protège mon temps et mon énergie comme des ressources rares', txtEn:'I protect my time and energy as scarce resources', dim:'compul' },
  { id:'s5d_ad', t:5, e:'🧠', txt:'Je me coupe émotionnellement pour protéger mon énergie — je reste dans ma tête', txtEn:'I cut off emotionally to protect my energy — I stay in my head', dim:'shadow' },
  { id:'s5e_ad', t:5, e:'📚', txt:'Je peux rester des heures dans mes idées sans m\'ennuyer, seul', txtEn:'I can spend hours alone with my own ideas without getting bored', dim:'behavior' },
  { id:'s5f_ad', t:5, e:'📡', txt:'Les demandes émotionnelles intenses des autres m\'épuisent vite', txtEn:'Other people\'s intense emotional demands wear me out quickly', dim:'stress' },
  // T6
  { id:'s6a_ad', t:6, e:'⚠️', txt:'J\'imagine spontanément ce qui pourrait mal tourner dans une situation', txtEn:'I spontaneously imagine what could go wrong in a situation', dim:'voice' },
  { id:'s6b_ad', t:6, e:'📋', txt:'Je vérifie, re-vérifie, par précaution — je veux être préparé', txtEn:'I check, double-check, just to be sure — I want to be prepared', dim:'behavior' },
  { id:'s6c_ad', t:6, e:'❓', txt:'Je doute souvent de mes propres décisions, je cherche l\'avis des autres', txtEn:'I often doubt my own decisions and seek others\' opinions', dim:'shadow' },
  { id:'s6d_ad', t:6, e:'🛡️', txt:'J\'ai besoin d\'un cadre, de règles, de gens fiables autour de moi', txtEn:'I need a framework, rules, reliable people around me', dim:'motive' },
  { id:'s6e_ad', t:6, e:'🔎', txt:'Je teste les gens avant de leur faire pleinement confiance', txtEn:'I test people before fully trusting them', dim:'behavior' },
  { id:'s6f_ad', t:6, e:'🤝', txt:'Je suis loyal : une fois engagé, je reste au long cours', txtEn:'I\'m loyal — once I commit, I stay for the long haul', dim:'motive' },
  // T7
  { id:'s7a_ad', t:7, e:'✨', txt:'Mes envies se multiplient vite — je passe d\'une idée excitante à une autre', txtEn:'My desires multiply quickly — I jump from one exciting idea to another', dim:'behavior' },
  { id:'s7b_ad', t:7, e:'😊', txt:'J\'évite instinctivement la douleur et l\'inconfort', txtEn:'I instinctively avoid pain and discomfort', dim:'compul' },
  { id:'s7c_ad', t:7, e:'🎪', txt:'J\'ai souvent plusieurs plans en parallèle — je jongle', txtEn:'I usually have several plans running at once — I juggle', dim:'behavior' },
  { id:'s7d_ad', t:7, e:'☀️', txt:'Je transforme les obstacles en opportunités, les problèmes en possibilités', txtEn:'I turn obstacles into opportunities, problems into possibilities', dim:'belief' },
  { id:'s7e_ad', t:7, e:'🔗', txt:'L\'ennui et la routine me sont insupportables', txtEn:'Boredom and routine are unbearable to me', dim:'fear' },
  { id:'s7f_ad', t:7, e:'🥂', txt:'Je suis optimiste — je vois le verre à moitié plein par défaut', txtEn:'I\'m an optimist — I see the glass half full by default', dim:'belief' },
  // T8
  { id:'s8a_ad', t:8, e:'⚡', txt:'Je prends spontanément les rênes quand personne ne décide', txtEn:'I spontaneously take charge when no one else decides', dim:'behavior' },
  { id:'s8b_ad', t:8, e:'💬', txt:'Je dis les choses franchement, sans filtre', txtEn:'I say things straight — no filter', dim:'behavior' },
  { id:'s8c_ad', t:8, e:'👁️', txt:'Je sens d\'instinct les rapports de force dans une pièce', txtEn:'I instinctively sense the power dynamics in any room', dim:'attunement' },
  { id:'s8d_ad', t:8, e:'🦁', txt:'Je protège férocement les miens — personne ne touche à eux sans moi', txtEn:'I fiercely protect those who matter to me — no one touches them without me', dim:'motive' },
  { id:'s8e_ad', t:8, e:'⛓️', txt:'Être dirigé, contrôlé, limité me donne physiquement envie de résister', txtEn:'Being ordered around or limited gives me a physical urge to resist', dim:'fear' },
  { id:'s8f_ad', t:8, e:'👑', txt:'Quand je me sens bien et en confiance, j\'agis avec force — naturellement', txtEn:'When I feel good and confident, I act with force — naturally', dim:'integ' },
  // T9
  { id:'s9a_ad', t:9, e:'🕊️', txt:'Je cherche l\'harmonie, même au prix de mes propres désirs', txtEn:'I seek harmony, even at the cost of my own desires', dim:'compul' },
  { id:'s9b_ad', t:9, e:'💤', txt:'Je procrastine sur ce qui compte vraiment pour moi', txtEn:'I procrastinate on what truly matters to me', dim:'shadow' },
  { id:'s9c_ad', t:9, e:'🌊', txt:'Je me fonds facilement dans l\'environnement, je m\'adapte aux autres', txtEn:'I blend easily into my environment, adapting to others', dim:'behavior' },
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
  { id:'s1c_58', t:1, e:'🔒', txt:'Il/elle se discipline spontanément : range sans qu\'on le dise, respecte les règles', txtEn:'They discipline themselves: tidying without being asked, following rules', dim:'compul' },
  { id:'s1d_58', t:1, e:'😤', txt:'Il/elle s\'énerve visiblement face à une tricherie, même mineure', txtEn:'They visibly get upset when faced with cheating, even something minor', dim:'body' },
  { id:'s1e_58', t:1, e:'⚖️', txt:'Il/elle a déjà ses propres règles morales ("on fait pas ça", "c\'est pas bien")', txtEn:'They already have their own moral rules ("we don\'t do that", "that\'s wrong")', dim:'belief' },
  { id:'s1f_58', t:1, e:'✅', txt:'Il/elle prend très à cœur une réprimande, peut pleurer longtemps', txtEn:'They take a scolding very seriously, can cry for a long time', dim:'behavior' },
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
  { id:'s3c_58', t:3, e:'🎭', txt:'Il/elle adapte son comportement selon les adultes, pour plaire à chacun', txtEn:'They adjust their behavior with each adult, to please each one', dim:'behavior' },
  { id:'s3d_58', t:3, e:'⏭️', txt:'Il/elle aime montrer ce qu\'il/elle sait faire (spectacle, démo)', txtEn:'They love showing what they can do (a show, a demonstration)', dim:'shadow' },
  { id:'s3e_58', t:3, e:'🏅', txt:'Les médailles, bons points, étoiles le/la motivent énormément', txtEn:'Stickers, gold stars, rewards motivate them enormously', dim:'belief' },
  { id:'s3f_58', t:3, e:'⚙️', txt:'Il/elle est rapide, efficace, veut toujours finir avant les autres', txtEn:'They\'re fast, efficient, always want to finish before the others', dim:'stress' },
  // T4
  { id:'s4a_58', t:4, e:'🫥', txt:'Il/elle se sent souvent "pas comme les autres" dans le groupe', txtEn:'They often feel "not like the others" in the group', dim:'identity' },
  { id:'s4b_58', t:4, e:'🌫️', txt:'Il/elle a des moments de tristesse sans cause apparente', txtEn:'They have moments of sadness with no obvious cause', dim:'fear' },
  { id:'s4c_58', t:4, e:'🎨', txt:'Ses émotions sont fortes, il/elle passe vite du rire aux larmes', txtEn:'Their emotions are strong — they switch quickly from laughter to tears', dim:'emotion' },
  { id:'s4d_58', t:4, e:'🌙', txt:'Il/elle a un monde imaginaire très développé (personnages, histoires, rituels)', txtEn:'They have a richly developed imaginary world (characters, stories, rituals)', dim:'aesthetic' },
  { id:'s4e_58', t:4, e:'🌑', txt:'Il/elle peut bouder longtemps, se replier dans sa chambre', txtEn:'They can sulk for a long time, withdrawing into their room', dim:'shadow' },
  { id:'s4f_58', t:4, e:'🎭', txt:'Il/elle dramatise les petites contrariétés, théâtralise ses sentiments', txtEn:'They dramatize small upsets, theatricalize their feelings', dim:'compul' },
  // T5
  { id:'s5a_58', t:5, e:'🔋', txt:'Il/elle aime jouer seul·e longtemps, a besoin de temps calme pour ne pas s\'épuiser', txtEn:'They love playing alone for long stretches, need quiet time so as not to feel drained', dim:'behavior' },
  { id:'s5b_58', t:5, e:'🔬', txt:'Il/elle observe longuement avant de participer à un nouveau jeu', txtEn:'They watch carefully before joining a new game', dim:'behavior' },
  { id:'s5c_58', t:5, e:'🏰', txt:'Il/elle protège ses jouets, son espace : "c\'est à moi, n\'y touche pas"', txtEn:'They protect their toys, their space: "it\'s mine, don\'t touch"', dim:'compul' },
  { id:'s5d_58', t:5, e:'🧠', txt:'Il/elle n\'aime pas les gros câlins prolongés, préfère la distance physique', txtEn:'They don\'t like long cuddles, prefer some physical distance', dim:'shadow' },
  { id:'s5e_58', t:5, e:'📚', txt:'Il/elle pose des questions précises sur "comment ça marche"', txtEn:'They ask precise questions about "how things work"', dim:'behavior' },
  { id:'s5f_58', t:5, e:'📡', txt:'Les groupes bruyants, les fêtes, l\'école l\'épuisent vite', txtEn:'Loud groups, parties, school all wear them out fast', dim:'stress' },
  // T6
  { id:'s6a_58', t:6, e:'⚠️', txt:'Il/elle pose beaucoup de questions "et si…" (et si on perd, et si ça arrive)', txtEn:'They ask many "what if…" questions (what if we lose, what if it happens)', dim:'voice' },
  { id:'s6b_58', t:6, e:'📋', txt:'Il/elle a besoin de rituels rassurants (histoire du soir, doudou, ordre des choses)', txtEn:'They need reassuring rituals (bedtime story, a comfort object, an order of things)', dim:'behavior' },
  { id:'s6c_58', t:6, e:'❓', txt:'Il/elle hésite, redemande, cherche confirmation avant de décider', txtEn:'They hesitate, ask again, want confirmation before deciding', dim:'shadow' },
  { id:'s6d_58', t:6, e:'🛡️', txt:'Il/elle aime les règles claires, sait qui fait quoi dans la famille', txtEn:'They like clear rules, know who does what in the family', dim:'motive' },
  { id:'s6e_58', t:6, e:'🔎', txt:'Il/elle observe longuement les nouvelles personnes avant de leur parler', txtEn:'They watch new people for a while before talking to them', dim:'behavior' },
  { id:'s6f_58', t:6, e:'🤝', txt:'Il/elle est très attaché·e à ses meilleurs amis, à sa famille, à ses repères', txtEn:'They\'re strongly attached to their close friends, their family, their reference points', dim:'motive' },
  // T7
  { id:'s7a_58', t:7, e:'✨', txt:'Il/elle passe très vite d\'une activité à une autre, commence tout sans finir', txtEn:'They jump very quickly from one activity to another, start everything without finishing', dim:'behavior' },
  { id:'s7b_58', t:7, e:'😊', txt:'Il/elle veut tout faire, déteste attendre, s\'ennuie vite', txtEn:'They want to do everything, hate waiting, get bored quickly', dim:'compul' },
  { id:'s7c_58', t:7, e:'🎪', txt:'Il/elle a toujours plein d\'idées, raconte des histoires farfelues', txtEn:'They always have plenty of ideas, tell tall tales', dim:'behavior' },
  { id:'s7d_58', t:7, e:'☀️', txt:'Il/elle rebondit vite après une contrariété, oublie le problème', txtEn:'They bounce back quickly after an upset, forget the problem', dim:'belief' },
  { id:'s7e_58', t:7, e:'🔗', txt:'Les punitions longues, les corvées, les attentes lui pèsent énormément', txtEn:'Long timeouts, chores, waiting weigh on them enormously', dim:'fear' },
  { id:'s7f_58', t:7, e:'🥂', txt:'C\'est un·e enfant enthousiaste, rieur·se, toujours en mouvement', txtEn:'They\'re an enthusiastic, laughing child, always in motion', dim:'belief' },
  // T8
  { id:'s8a_58', t:8, e:'⚡', txt:'Il/elle prend la tête dans les jeux de groupe, organise les autres', txtEn:'They take the lead in group games, organize the others', dim:'behavior' },
  { id:'s8b_58', t:8, e:'💬', txt:'Il/elle dit "non" haut et fort, ne se laisse pas intimider', txtEn:'They say "no" loud and clear, won\'t be intimidated', dim:'behavior' },
  { id:'s8c_58', t:8, e:'👁️', txt:'Il/elle défie l\'autorité adulte quand il/elle juge que c\'est injuste', txtEn:'They challenge adult authority when they think it\'s unfair', dim:'attunement' },
  { id:'s8d_58', t:8, e:'🦁', txt:'Il/elle défend ses copains plus faibles, s\'interpose dans les bagarres', txtEn:'They defend weaker friends, step into fights', dim:'motive' },
  { id:'s8e_58', t:8, e:'⛓️', txt:'Il/elle déteste être commandé·e, réagit fort aux ordres directs', txtEn:'They hate being given orders, react strongly to direct commands', dim:'fear' },
  { id:'s8f_58', t:8, e:'👑', txt:'Il/elle a une présence physique forte, une énergie marquée', txtEn:'They have a strong physical presence, marked energy', dim:'integ' },
  // T9
  { id:'s9a_58', t:9, e:'🕊️', txt:'Il/elle est facile, accommodant·e, suit ce que le groupe propose', txtEn:'They\'re easy-going, accommodating, follow what the group suggests', dim:'compul' },
  { id:'s9b_58', t:9, e:'💤', txt:'Il/elle traîne pour se mettre à une activité, met du temps à démarrer', txtEn:'They drag their feet starting an activity, take time to get going', dim:'shadow' },
  { id:'s9c_58', t:9, e:'🌊', txt:'Il/elle s\'adapte à ce qu\'on lui propose, rarement opposant·e', txtEn:'They go along with what\'s offered, rarely contrary', dim:'behavior' },
  { id:'s9d_58', t:9, e:'☮️', txt:'Il/elle fuit les disputes, pleure ou se met à l\'écart quand ça crie', txtEn:'They avoid disputes, cry or step aside when there\'s shouting', dim:'compul' },
  { id:'s9e_58', t:9, e:'🤷', txt:'Quand on lui demande ce qu\'il/elle veut, il/elle dit "je sais pas"', txtEn:'When asked what they want, they say "I don\'t know"', dim:'shadow' },
  { id:'s9f_58', t:9, e:'☁️', txt:'Il/elle peut rester longtemps devant un écran, comme "absent·e"', txtEn:'They can stay for a long time in front of a screen, somewhat "absent"', dim:'stress' },
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
  { id:'s2c_912', t:2, e:'🚫', txt:'Il/elle a du mal à dire non à un ami, quitte à s\'oublier', txtEn:'They have trouble saying no to a friend, even at the cost of themselves', dim:'shadow' },
  { id:'s2d_912', t:2, e:'😞', txt:'Il/elle est blessé·e si on oublie de le/la remercier', txtEn:'They\'re hurt if you forget to thank them', dim:'shadow' },
  { id:'s2e_912', t:2, e:'🔗', txt:'Il/elle cherche à être "le/la préféré·e" d\'un prof, d\'un adulte', txtEn:'They try to be the "favorite" of a teacher or another adult', dim:'compul' },
  { id:'s2f_912', t:2, e:'🧭', txt:'Il/elle propose spontanément son aide avant qu\'on lui demande', txtEn:'They spontaneously offer help before being asked', dim:'belief' },
  // T3
  { id:'s3a_912', t:3, e:'🎯', txt:'Il/elle change de style, d\'attitude selon le groupe où il/elle est', txtEn:'They change their style, attitude depending on the group', dim:'compul' },
  { id:'s3b_912', t:3, e:'📉', txt:'Il/elle a très peur de rater publiquement (exposé, compétition)', txtEn:'They\'re very afraid of failing publicly (an oral, a competition)', dim:'fear' },
  { id:'s3c_912', t:3, e:'🎭', txt:'Il/elle fait attention à son image — coiffure, vêtements, photos', txtEn:'They pay attention to their image — hairstyle, clothes, photos', dim:'behavior' },
  { id:'s3d_912', t:3, e:'⏭️', txt:'Il/elle minimise ses difficultés pour "rester dans la course"', txtEn:'They downplay their difficulties to "stay in the race"', dim:'shadow' },
  { id:'s3e_912', t:3, e:'🏅', txt:'Les notes, les classements, les médailles comptent énormément', txtEn:'Grades, rankings, medals matter enormously', dim:'belief' },
  { id:'s3f_912', t:3, e:'⚙️', txt:'Il/elle mène plusieurs activités / compétitions de front', txtEn:'They juggle several activities or competitions at once', dim:'stress' },
  // T4
  { id:'s4a_912', t:4, e:'🫥', txt:'Il/elle se sent décalé·e, souvent incompris·e par les autres enfants', txtEn:'They feel out of step, often misunderstood by the other kids', dim:'identity' },
  { id:'s4b_912', t:4, e:'🌫️', txt:'Il/elle a des moments mélancoliques sans cause évidente', txtEn:'They have melancholy moments without obvious cause', dim:'fear' },
  { id:'s4c_912', t:4, e:'🎨', txt:'Ses émotions sont intenses — il/elle les exprime par l\'art, l\'écriture', txtEn:'Their emotions are intense — they express them through art, writing', dim:'emotion' },
  { id:'s4d_912', t:4, e:'🌙', txt:'Il/elle est attiré·e par ce qui est original, rare, un peu hors norme', txtEn:'They\'re drawn to what\'s original, underground, a bit off-norm', dim:'aesthetic' },
  { id:'s4e_912', t:4, e:'🌑', txt:'Il/elle supporte mal la banalité, cherche l\'intensité dans ses relations', txtEn:'They struggle with banality, seek intensity in their relationships', dim:'shadow' },
  { id:'s4f_912', t:4, e:'🎭', txt:'Il/elle a quelques amis très proches plutôt qu\'une grande bande', txtEn:'They have a few very close friends rather than a large group', dim:'compul' },
  // T5
  { id:'s5a_912', t:5, e:'🔋', txt:'Il/elle passe beaucoup de temps seul·e dans sa chambre, c\'est son besoin', txtEn:'They spend a lot of time alone in their room — that\'s their need', dim:'behavior' },
  { id:'s5b_912', t:5, e:'🔬', txt:'Il/elle observe avant de parler, rarement le/la premier·ère à réagir', txtEn:'They watch before speaking, rarely the first to react', dim:'behavior' },
  { id:'s5c_912', t:5, e:'🏰', txt:'Il/elle protège son espace, ses objets — n\'aime pas qu\'on y touche', txtEn:'They protect their space, their objects — don\'t like anyone touching them', dim:'compul' },
  { id:'s5d_912', t:5, e:'🧠', txt:'Il/elle exprime peu ses émotions, reste discret·e sur son intériorité', txtEn:'They share emotions sparingly, stay private about their inner life', dim:'shadow' },
  { id:'s5e_912', t:5, e:'📚', txt:'Il/elle a une passion qu\'il/elle approfondit énormément (livres, jeu, thème)', txtEn:'They have a passion they go very deep into (books, a game, a topic)', dim:'behavior' },
  { id:'s5f_912', t:5, e:'📡', txt:'Les sollicitations sociales denses l\'épuisent visiblement', txtEn:'Heavy social demands wear them out visibly', dim:'stress' },
  // T6
  { id:'s6a_912', t:6, e:'⚠️', txt:'Il/elle imagine les scénarios qui peuvent mal tourner, prépare des plans B', txtEn:'They imagine scenarios that might go wrong, prepare backup plans', dim:'voice' },
  { id:'s6b_912', t:6, e:'📋', txt:'Il/elle vérifie plusieurs fois (sa sacoche, ses devoirs, la porte fermée)', txtEn:'They check several times (their bag, their homework, the locked door)', dim:'behavior' },
  { id:'s6c_912', t:6, e:'❓', txt:'Il/elle doute de ses choix, demande confirmation à un adulte', txtEn:'They doubt their choices, ask an adult for confirmation', dim:'shadow' },
  { id:'s6d_912', t:6, e:'🛡️', txt:'Il/elle a besoin de règles claires, d\'adultes fiables, d\'un cadre stable', txtEn:'They need clear rules, reliable adults, a stable framework', dim:'motive' },
  { id:'s6e_912', t:6, e:'🔎', txt:'Il/elle teste ses amis avant de leur confier quelque chose d\'important', txtEn:'They test friends before sharing anything important', dim:'behavior' },
  { id:'s6f_912', t:6, e:'🤝', txt:'Il/elle est très loyal·e — reste avec ses vrais amis, même contre le groupe', txtEn:'They\'re very loyal — they stick with their real friends, even against the group', dim:'motive' },
  // T7
  { id:'s7a_912', t:7, e:'✨', txt:'Il/elle s\'enthousiasme pour mille choses, papillonne d\'un intérêt à l\'autre', txtEn:'They get excited about a thousand things, flit from one interest to another', dim:'behavior' },
  { id:'s7b_912', t:7, e:'😊', txt:'Il/elle fuit l\'ennui à tout prix, supporte mal les moments calmes', txtEn:'They flee boredom at all costs, struggle with calm moments', dim:'compul' },
  { id:'s7c_912', t:7, e:'🎪', txt:'Il/elle a plusieurs projets / passions en parallèle', txtEn:'They have several projects / passions running in parallel', dim:'behavior' },
  { id:'s7d_912', t:7, e:'☀️', txt:'Il/elle transforme les contrariétés en opportunités, rebondit vite', txtEn:'They turn upsets into opportunities, bounce back fast', dim:'belief' },
  { id:'s7e_912', t:7, e:'🔗', txt:'Les longues contraintes, les corvées le/la font fuir mentalement', txtEn:'Long obligations, chores make them flee mentally', dim:'fear' },
  { id:'s7f_912', t:7, e:'🥂', txt:'Il/elle a un humour qui détend, un optimisme naturel', txtEn:'They have humor that defuses, a natural optimism', dim:'belief' },
  // T8
  { id:'s8a_912', t:8, e:'⚡', txt:'Il/elle prend le lead dans son groupe, tranche dans les désaccords', txtEn:'They take the lead in their group, settle disagreements', dim:'behavior' },
  { id:'s8b_912', t:8, e:'💬', txt:'Il/elle dit ce qu\'il/elle pense franchement, sans filtre', txtEn:'They say what they think frankly, without filter', dim:'behavior' },
  { id:'s8c_912', t:8, e:'👁️', txt:'Il/elle teste l\'autorité des adultes, remet en question les règles', txtEn:'They test adults\' authority, question rules', dim:'attunement' },
  { id:'s8d_912', t:8, e:'🦁', txt:'Il/elle défend farouchement son territoire, ses amis, sa fratrie', txtEn:'They fiercely defend their territory, friends, siblings', dim:'motive' },
  { id:'s8e_912', t:8, e:'⛓️', txt:'Il/elle résiste frontalement aux ordres directs', txtEn:'They resist direct orders head-on', dim:'fear' },
  { id:'s8f_912', t:8, e:'👑', txt:'Il/elle a une énergie qui impressionne ses camarades', txtEn:'They have an energy that impresses their peers', dim:'integ' },
  // T9
  { id:'s9a_912', t:9, e:'🕊️', txt:'Il/elle recherche la paix, évite les prises de position conflictuelles', txtEn:'They seek peace, avoid taking sides in conflicts', dim:'compul' },
  { id:'s9b_912', t:9, e:'💤', txt:'Il/elle procrastine les devoirs, attend la dernière minute', txtEn:'They procrastinate on homework, wait until the last minute', dim:'shadow' },
  { id:'s9c_912', t:9, e:'🌊', txt:'Il/elle s\'adapte au groupe, suit plus qu\'il/elle n\'initie', txtEn:'They go along with the group, follow more than they initiate', dim:'behavior' },
  { id:'s9d_912', t:9, e:'☮️', txt:'Il/elle fuit les disputes, se met en retrait ou fait l\'arbitre', txtEn:'They avoid disputes, withdraw or play arbiter', dim:'compul' },
  { id:'s9e_912', t:9, e:'🤷', txt:'Il/elle a du mal à exprimer ses envies propres — "ça dépend"', txtEn:'They struggle to express what they actually want — "it depends"', dim:'shadow' },
  { id:'s9f_912', t:9, e:'☁️', txt:'Il/elle s\'isole dans ses écrans, sa musique, quand c\'est tendu', txtEn:'They retreat into screens, music, when things get tense', dim:'stress' },
];

const STATEMENTS_13_17: Statement[] = [
  // T1
  { id:'s1a_1317', t:1, e:'🔍', txt:'Il/elle est engagé·e sur des causes qui lui tiennent à cœur (justice, écologie)', txtEn:'They\'re engaged in causes that matter to them (justice, climate)', dim:'behavior' },
  { id:'s1b_1317', t:1, e:'📏', txt:'Il/elle est très exigeant·e avec lui-même/elle-même, peu satisfait·e de ce qu\'il/elle rend', txtEn:'They\'re very demanding of themselves, rarely satisfied with what they turn in', dim:'voice' },
  { id:'s1c_1317', t:1, e:'🔒', txt:'Il/elle contient ses émotions, les exprime par des remarques pointues', txtEn:'They contain their emotions, expressing them through pointed remarks', dim:'compul' },
  { id:'s1d_1317', t:1, e:'😤', txt:'Il/elle critique les incohérences des adultes, remet en cause les autorités injustes', txtEn:'They criticize adults\' inconsistencies, push back on unfair authority', dim:'body' },
  { id:'s1e_1317', t:1, e:'⚖️', txt:'Il/elle a un idéal moral strict, voit le monde en "bien / mal"', txtEn:'They have a strict moral ideal, see the world in "right / wrong"', dim:'belief' },
  { id:'s1f_1317', t:1, e:'✅', txt:'Il/elle supporte mal d\'être pris·e en défaut, de montrer une faiblesse', txtEn:'They don\'t handle being caught at fault or showing weakness', dim:'behavior' },
  // T2
  { id:'s2a_1317', t:2, e:'💞', txt:'Il/elle est "la personne confidente" — les autres se confient à lui/elle', txtEn:'They\'re the "confidante" — others come to them with their problems', dim:'attunement' },
  { id:'s2b_1317', t:2, e:'🤲', txt:'Il/elle s\'investit dans l\'associatif, le bénévolat, l\'humanitaire', txtEn:'They\'re involved in volunteering, humanitarian work, mutual aid', dim:'behavior' },
  { id:'s2c_1317', t:2, e:'🚫', txt:'Il/elle a du mal à poser des limites — se fait parfois exploiter', txtEn:'They struggle to set limits — sometimes get taken advantage of', dim:'shadow' },
  { id:'s2d_1317', t:2, e:'😞', txt:'Il/elle peut être rancunier·ère si on minimise son engagement pour les autres', txtEn:'They can hold a grudge if their efforts for others go unrecognized', dim:'shadow' },
  { id:'s2e_1317', t:2, e:'🔗', txt:'Il/elle s\'accroche à certaines amitiés de façon exclusive', txtEn:'They cling to certain friendships exclusively', dim:'compul' },
  { id:'s2f_1317', t:2, e:'🧭', txt:'Il/elle anticipe activement les besoins de ses proches', txtEn:'They actively anticipate the needs of those close to them', dim:'belief' },
  // T3
  { id:'s3a_1317', t:3, e:'🎯', txt:'Il/elle soigne son image publique, son profil sur les réseaux sociaux', txtEn:'They curate their public image, their social media profile', dim:'compul' },
  { id:'s3b_1317', t:3, e:'📉', txt:'Échouer à un examen, en public, le/la hante plus que tout', txtEn:'Failing at an exam in public haunts them more than anything', dim:'fear' },
  { id:'s3c_1317', t:3, e:'🎭', txt:'Il/elle s\'adapte à chaque groupe social pour y avoir sa place', txtEn:'They adapt to each social group to find their place', dim:'behavior' },
  { id:'s3d_1317', t:3, e:'⏭️', txt:'Il/elle met ses difficultés émotionnelles en pause pour avancer', txtEn:'They put their emotional difficulties on pause to keep going', dim:'shadow' },
  { id:'s3e_1317', t:3, e:'🏅', txt:'Sa valeur est liée à ses résultats scolaires, sportifs ou sociaux', txtEn:'Their worth is tied to their grades, sports, or social wins', dim:'belief' },
  { id:'s3f_1317', t:3, e:'⚙️', txt:'Il/elle enchaîne projets, jobs, compétitions sans vraiment s\'arrêter', txtEn:'They line up projects, jobs, competitions without really stopping', dim:'stress' },
  // T4
  { id:'s4a_1317', t:4, e:'🫥', txt:'Il/elle se sent profondément différent·e, à part', txtEn:'They feel deeply different, set apart', dim:'identity' },
  { id:'s4b_1317', t:4, e:'🌫️', txt:'Il/elle traverse des phases existentielles, se questionne sur le sens', txtEn:'They go through existential phases, question meaning', dim:'fear' },
  { id:'s4c_1317', t:4, e:'🎨', txt:'Ses émotions sont centrales, il/elle vit par elles, les assume pleinement', txtEn:'Their emotions are central — they live by them, fully claim them', dim:'emotion' },
  { id:'s4d_1317', t:4, e:'🌙', txt:'Il/elle cultive un style personnel marqué (musique, vêtements, esthétique)', txtEn:'They cultivate a marked personal style (music, clothes, aesthetic)', dim:'aesthetic' },
  { id:'s4e_1317', t:4, e:'🌑', txt:'Il/elle supporte mal la routine, a besoin d\'intensité, de beau, de sens', txtEn:'They can\'t bear routine — they need intensity, beauty, meaning', dim:'shadow' },
  { id:'s4f_1317', t:4, e:'🎭', txt:'Il/elle s\'exprime par l\'art, la musique, l\'écriture — sensibilité revendiquée', txtEn:'They express themselves through art, music, writing — sensitivity claimed', dim:'compul' },
  // T5
  { id:'s5a_1317', t:5, e:'🔋', txt:'Il/elle a besoin de beaucoup plus de solitude que ses pairs', txtEn:'They need much more solitude than their peers', dim:'behavior' },
  { id:'s5b_1317', t:5, e:'🔬', txt:'Il/elle observe, analyse avant de s\'engager — peu impulsif·ve', txtEn:'They observe, analyze before committing — not impulsive', dim:'behavior' },
  { id:'s5c_1317', t:5, e:'🏰', txt:'Il/elle protège farouchement sa vie privée, ses secrets', txtEn:'They fiercely protect their privacy, their secrets', dim:'compul' },
  { id:'s5d_1317', t:5, e:'🧠', txt:'Il/elle reste dans sa tête, semble parfois distant·e émotionnellement', txtEn:'They stay in their head, sometimes seem emotionally distant', dim:'shadow' },
  { id:'s5e_1317', t:5, e:'📚', txt:'Il/elle approfondit ses centres d\'intérêt à un niveau quasi-expert', txtEn:'They go expert-deep in their interests', dim:'behavior' },
  { id:'s5f_1317', t:5, e:'📡', txt:'Les situations socialement denses l\'épuisent, il/elle s\'en retire', txtEn:'Dense social situations exhaust them — they pull back', dim:'stress' },
  // T6
  { id:'s6a_1317', t:6, e:'⚠️', txt:'Il/elle anticipe les problèmes, envisage les pires scénarios', txtEn:'They anticipate problems, envision worst-case scenarios', dim:'voice' },
  { id:'s6b_1317', t:6, e:'📋', txt:'Il/elle se prépare à fond pour les examens, les événements importants', txtEn:'They prepare hard for exams and important events', dim:'behavior' },
  { id:'s6c_1317', t:6, e:'❓', txt:'Il/elle doute de ses décisions, sollicite l\'avis de sa bande', txtEn:'They doubt their decisions, seek their friend group\'s opinion', dim:'shadow' },
  { id:'s6d_1317', t:6, e:'🛡️', txt:'Il/elle rejette les autorités incohérentes, cherche des figures solides', txtEn:'They reject inconsistent authority, look for solid figures', dim:'motive' },
  { id:'s6e_1317', t:6, e:'🔎', txt:'Il/elle teste longuement les gens avant de leur faire confiance', txtEn:'They test people for a long time before trusting them', dim:'behavior' },
  { id:'s6f_1317', t:6, e:'🤝', txt:'Il/elle est farouchement loyal·e à son groupe d\'amis proches', txtEn:'They\'re fiercely loyal to their close friend group', dim:'motive' },
  // T7
  { id:'s7a_1317', t:7, e:'✨', txt:'Il/elle enchaîne les projets, les passions, les envies', txtEn:'They line up projects, passions, desires', dim:'behavior' },
  { id:'s7b_1317', t:7, e:'😊', txt:'Il/elle évite les sujets difficiles, pivote vers le positif', txtEn:'They avoid difficult subjects, pivot toward the positive', dim:'compul' },
  { id:'s7c_1317', t:7, e:'🎪', txt:'Il/elle mène plusieurs choses de front — études, amis, loisirs', txtEn:'They juggle several things at once — studies, friends, hobbies', dim:'behavior' },
  { id:'s7d_1317', t:7, e:'☀️', txt:'Il/elle reframe les galères en aventures, optimiste naturel', txtEn:'They reframe setbacks into adventures — a natural optimist', dim:'belief' },
  { id:'s7e_1317', t:7, e:'🔗', txt:'L\'ennui, la routine, les contraintes longues l\'étouffent vite', txtEn:'Boredom, routine, long obligations stifle them quickly', dim:'fear' },
  { id:'s7f_1317', t:7, e:'🥂', txt:'C\'est un·e ado sociable, joyeux·se, avec un réseau large', txtEn:'They\'re a sociable, joyful teen with a wide network', dim:'belief' },
  // T8
  { id:'s8a_1317', t:8, e:'⚡', txt:'Il/elle est un·e leader naturel·le dans son groupe, influence les décisions', txtEn:'They\'re a natural leader in their group, influence decisions', dim:'behavior' },
  { id:'s8b_1317', t:8, e:'💬', txt:'Il/elle assume ses désaccords, dit les choses cash', txtEn:'They own their disagreements, say things bluntly', dim:'behavior' },
  { id:'s8c_1317', t:8, e:'👁️', txt:'Il/elle défie les figures d\'autorité qu\'il/elle juge illégitimes', txtEn:'They challenge authority figures they consider illegitimate', dim:'attunement' },
  { id:'s8d_1317', t:8, e:'🦁', txt:'Il/elle défend férocement ses proches, ne laisse rien passer', txtEn:'They fiercely defend their close ones, let nothing slide', dim:'motive' },
  { id:'s8e_1317', t:8, e:'⛓️', txt:'Il/elle supporte très mal d\'être dirigé·e, encadré·e', txtEn:'They really don\'t handle being directed, framed', dim:'fear' },
  { id:'s8f_1317', t:8, e:'👑', txt:'Il/elle a une présence charismatique, une force physique assumée', txtEn:'They have charisma, an assumed physical strength', dim:'integ' },
  // T9
  { id:'s9a_1317', t:9, e:'🕊️', txt:'Il/elle cherche l\'harmonie, évite les positions tranchées', txtEn:'They seek harmony, avoid hard positions', dim:'compul' },
  { id:'s9b_1317', t:9, e:'💤', txt:'Il/elle procrastine ses travaux, ses choix d\'orientation', txtEn:'They procrastinate on schoolwork, life choices', dim:'shadow' },
  { id:'s9c_1317', t:9, e:'🌊', txt:'Il/elle s\'adapte aux différents groupes, se fond facilement', txtEn:'They adapt to different groups, blend easily', dim:'behavior' },
  { id:'s9d_1317', t:9, e:'☮️', txt:'Il/elle fuit les conflits ouverts, se mure dans le silence', txtEn:'They avoid open conflicts, retreat into silence', dim:'compul' },
  { id:'s9e_1317', t:9, e:'🤷', txt:'Il/elle a du mal à savoir ce qu\'il/elle veut vraiment pour son avenir', txtEn:'They struggle to know what they really want for their future', dim:'shadow' },
  { id:'s9f_1317', t:9, e:'☁️', txt:'Il/elle se noie dans les écrans, les séries, pour oublier les tensions', txtEn:'They drown in screens, series, to escape tensions', dim:'stress' },
];

export const STATEMENTS_BY_AGE: Record<AgeBand, Statement[]> = {
  '5-8': STATEMENTS_5_8,
  '9-12': STATEMENTS_9_12,
  '13-17': STATEMENTS_13_17,
  'adulte': STATEMENTS_ADULTE,
};

// ────────────────────────────────────────────────────────────────
//  WING STATEMENTS (par tranche d'âge)
// ────────────────────────────────────────────────────────────────

const WING_ADULTE: WingStatement[] = [
  { id:'w1_9_ad', wingOf:1, wingType:9, e:'🌙', txt:'Mon exigence s\'exprime plus dans la contemplation calme que dans l\'expression verbale', txtEn:'My standards express themselves more in quiet contemplation than in spoken words' },
  { id:'w1_2_ad', wingOf:1, wingType:2, e:'🤲', txt:'Mon exigence s\'exprime à travers le soin que je porte aux autres', txtEn:'My standards extend through the care I bring to others' },
  { id:'w2_1_ad', wingOf:2, wingType:1, e:'⚖️', txt:'J\'aide par devoir moral — c\'est juste de le faire, je peux être critique sinon', txtEn:'I help out of moral duty — it\'s the right thing to do, and I can be critical when it isn\'t' },
  { id:'w2_3_ad', wingOf:2, wingType:3, e:'✨', txt:'J\'aime l\'image de quelqu\'un qui aide, qui est socialement visible', txtEn:'I like the image of being someone who helps, who\'s socially visible' },
  { id:'w3_2_ad', wingOf:3, wingType:2, e:'❤️', txt:'Mon succès inclut d\'être aimé et apprécié, pas seulement admiré', txtEn:'My success includes being loved and appreciated, not just admired' },
  { id:'w3_4_ad', wingOf:3, wingType:4, e:'🎭', txt:'Derrière ma performance, j\'ai un côté introspectif, parfois mélancolique', txtEn:'Behind my performance, I have an introspective, sometimes melancholic side' },
  { id:'w4_3_ad', wingOf:4, wingType:3, e:'🏆', txt:'Mon unicité s\'exprime AUSSI par des accomplissements visibles', txtEn:'My uniqueness ALSO expresses itself through visible accomplishments' },
  { id:'w4_5_ad', wingOf:4, wingType:5, e:'🏰', txt:'Ma singularité est surtout intérieure — je préfère la solitude pour la cultiver', txtEn:'My singularity is mostly inward — I prefer solitude to cultivate it' },
  { id:'w5_4_ad', wingOf:5, wingType:4, e:'🌌', txt:'Mon monde intellectuel a une dimension esthétique, imaginative', txtEn:'My intellectual world has an aesthetic, imaginative dimension' },
  { id:'w5_6_ad', wingOf:5, wingType:6, e:'🔎', txt:'Je teste les gens avant de leur faire confiance — mon analyse a une teinte de méfiance', txtEn:'I test people before trusting them — my analysis carries a wary edge' },
  { id:'w6_5_ad', wingOf:6, wingType:5, e:'📚', txt:'Mes inquiétudes passent par beaucoup d\'analyse et de réflexion', txtEn:'My worries run through extensive analysis and reflection' },
  { id:'w6_7_ad', wingOf:6, wingType:7, e:'🎉', txt:'Je décharge mes anxiétés dans l\'activité sociale, le mouvement', txtEn:'I release my anxieties through social activity, movement' },
  { id:'w7_6_ad', wingOf:7, wingType:6, e:'🤝', txt:'Mon goût pour la nouveauté coexiste avec de la loyauté, de la responsabilité', txtEn:'My taste for novelty coexists with loyalty and responsibility' },
  { id:'w7_8_ad', wingOf:7, wingType:8, e:'⚡', txt:'Mon énergie est assertive — je veux faire, construire, prendre les choses en main', txtEn:'My energy is assertive — I want to do, build, take charge' },
  { id:'w8_7_ad', wingOf:8, wingType:7, e:'🎢', txt:'Mon énergie de chef est doublée d\'un appétit pour le nouveau, l\'aventure', txtEn:'My leadership energy is paired with appetite for novelty, adventure' },
  { id:'w8_9_ad', wingOf:8, wingType:9, e:'🌾', txt:'Je prends les rênes avec calme — force tranquille plutôt qu\'agressive', txtEn:'I take charge calmly — quiet strength rather than aggression' },
  { id:'w9_8_ad', wingOf:9, wingType:8, e:'🦁', txt:'Mon calme est ancré dans une présence physique solide', txtEn:'My calm is anchored in a solid physical presence' },
  { id:'w9_1_ad', wingOf:9, wingType:1, e:'📏', txt:'Mon besoin de paix s\'accompagne d\'un sens du devoir, de l\'ordre', txtEn:'My need for peace comes with a sense of duty and order' },
];

// 5-8 : phrases courtes, comportements très concrets
const WING_5_8: WingStatement[] = [
  { id:'w1_9_58', wingOf:1, wingType:9, e:'🌙', txt:'Il/elle est exigeant·e mais discret·ète, surveille sans faire de bruit', txtEn:'They\'re demanding but quiet — they watch without making noise' },
  { id:'w1_2_58', wingOf:1, wingType:2, e:'🤲', txt:'Son exigence est chaleureuse : il/elle aide les copains à bien faire', txtEn:'Their demanding side is warm — they help classmates do well' },
  { id:'w2_1_58', wingOf:2, wingType:1, e:'⚖️', txt:'Il/elle aide par principe et reproche quand c\'est "mal fait"', txtEn:'They help on principle and call out what\'s "not right"' },
  { id:'w2_3_58', wingOf:2, wingType:3, e:'✨', txt:'Il/elle aime être vu·e comme serviable, être le/la "chouchou" de la maîtresse', txtEn:'They love being seen as helpful, the teacher\'s "favorite"' },
  { id:'w3_2_58', wingOf:3, wingType:2, e:'❤️', txt:'Sa réussite inclut d\'être aimé·e et pas juste admiré·e', txtEn:'Their success includes being loved, not just admired' },
  { id:'w3_4_58', wingOf:3, wingType:4, e:'🎭', txt:'Derrière l\'éclat, il/elle a un côté rêveur·se, parfois mélancolique', txtEn:'Behind the shine, they have a dreamy, sometimes melancholic side' },
  { id:'w4_3_58', wingOf:4, wingType:3, e:'🏆', txt:'Il/elle veut qu\'on voie sa singularité — ses créations, ses dessins', txtEn:'They want their singularity to be seen — their creations, drawings' },
  { id:'w4_5_58', wingOf:4, wingType:5, e:'🏰', txt:'Sa sensibilité est surtout intérieure, cultivée seul·e dans sa chambre', txtEn:'Their sensitivity is mostly inward, cultivated alone in their room' },
  { id:'w5_4_58', wingOf:5, wingType:4, e:'🌌', txt:'Son monde intérieur a un côté imaginaire, artistique, poétique', txtEn:'Their inner world has an imaginative, artistic, poetic side' },
  { id:'w5_6_58', wingOf:5, wingType:6, e:'🔎', txt:'Il/elle observe longuement les nouveaux avant d\'aller vers eux', txtEn:'They watch newcomers carefully before approaching them' },
  { id:'w6_5_58', wingOf:6, wingType:5, e:'📚', txt:'Ses inquiétudes passent par beaucoup de questions et d\'observations', txtEn:'Their worries run through many questions and observations' },
  { id:'w6_7_58', wingOf:6, wingType:7, e:'🎉', txt:'Ses anxiétés se calment dans le jeu, l\'activité avec les autres', txtEn:'Their anxieties calm down in play, in activity with others' },
  { id:'w7_6_58', wingOf:7, wingType:6, e:'🤝', txt:'Son enthousiasme est doublé d\'un fort attachement à ses copains', txtEn:'Their enthusiasm pairs with strong attachment to friends' },
  { id:'w7_8_58', wingOf:7, wingType:8, e:'⚡', txt:'Son énergie est forte, il/elle prend les choses en main dans le jeu', txtEn:'Their energy is strong — they take charge in play' },
  { id:'w8_7_58', wingOf:8, wingType:7, e:'🎢', txt:'Son leadership cherche toujours de nouveaux jeux, de l\'aventure', txtEn:'Their leadership always seeks new games, adventure' },
  { id:'w8_9_58', wingOf:8, wingType:9, e:'🌾', txt:'Il/elle prend la place mais avec un calme tranquille', txtEn:'They take the lead but with quiet calm' },
  { id:'w9_8_58', wingOf:9, wingType:8, e:'🦁', txt:'Son calme est ancré physiquement, il/elle tient le sol', txtEn:'Their calm is anchored physically — they hold the ground' },
  { id:'w9_1_58', wingOf:9, wingType:1, e:'📏', txt:'Son besoin de paix est doublé d\'un sens des règles', txtEn:'Their need for peace is paired with a sense of rules' },
];

// 9-12 : vocabulaire un peu plus nuancé, contexte scolaire/groupe
const WING_9_12: WingStatement[] = [
  { id:'w1_9_912', wingOf:1, wingType:9, e:'🌙', txt:'Son exigence s\'exprime plus par l\'observation silencieuse que par la parole', txtEn:'Their standards express themselves more through silent observation than speech' },
  { id:'w1_2_912', wingOf:1, wingType:2, e:'🤲', txt:'Son exigence inclut de veiller sur les autres, de les pousser vers le mieux', txtEn:'Their standards include watching over others, pushing them to do better' },
  { id:'w2_1_912', wingOf:2, wingType:1, e:'⚖️', txt:'Il/elle aide par devoir — et peut faire remarquer ce qui ne va pas', txtEn:'They help out of duty — and can point out what\'s not done right' },
  { id:'w2_3_912', wingOf:2, wingType:3, e:'✨', txt:'Il/elle aime l\'image de quelqu\'un de populaire et de serviable', txtEn:'They love the image of being popular and helpful' },
  { id:'w3_2_912', wingOf:3, wingType:2, e:'❤️', txt:'Sa performance inclut d\'être aimé·e — pas seulement admiré·e', txtEn:'Their performance includes being loved — not only admired' },
  { id:'w3_4_912', wingOf:3, wingType:4, e:'🎭', txt:'Derrière la performance, il/elle a un côté introspectif, parfois triste', txtEn:'Behind the performance, they have an introspective, sometimes sad side' },
  { id:'w4_3_912', wingOf:4, wingType:3, e:'🏆', txt:'Il/elle veut être reconnu·e pour sa singularité, ses créations', txtEn:'They want to be recognized for their singularity, their creations' },
  { id:'w4_5_912', wingOf:4, wingType:5, e:'🏰', txt:'Sa sensibilité est surtout intérieure, il/elle garde sa bulle', txtEn:'Their sensitivity is mostly inward — they keep their bubble' },
  { id:'w5_4_912', wingOf:5, wingType:4, e:'🌌', txt:'Son monde intellectuel a un côté imaginatif, artistique, esthétique', txtEn:'Their intellectual world has an imaginative, artistic, aesthetic side' },
  { id:'w5_6_912', wingOf:5, wingType:6, e:'🔎', txt:'Il/elle teste longuement avant de faire confiance, reste méfiant·e', txtEn:'They test for a long time before trusting, stay wary' },
  { id:'w6_5_912', wingOf:6, wingType:5, e:'📚', txt:'Il/elle gère ses inquiétudes par l\'analyse, la réflexion', txtEn:'They process worries through analysis, reflection' },
  { id:'w6_7_912', wingOf:6, wingType:7, e:'🎉', txt:'Il/elle décharge ses anxiétés dans l\'activité sociale, le mouvement', txtEn:'They release their anxieties through social activity, movement' },
  { id:'w7_6_912', wingOf:7, wingType:6, e:'🤝', txt:'Son enthousiasme s\'accompagne de loyauté envers ses proches', txtEn:'Their enthusiasm comes with loyalty toward their close ones' },
  { id:'w7_8_912', wingOf:7, wingType:8, e:'⚡', txt:'Son énergie est assertive, il/elle prend les choses en main', txtEn:'Their energy is assertive, they take charge' },
  { id:'w8_7_912', wingOf:8, wingType:7, e:'🎢', txt:'Son leadership est doublé d\'un goût pour le nouveau, l\'aventure', txtEn:'Their leadership pairs with a taste for novelty, adventure' },
  { id:'w8_9_912', wingOf:8, wingType:9, e:'🌾', txt:'Il/elle prend les rênes avec calme, pas avec agressivité', txtEn:'They take charge calmly, not aggressively' },
  { id:'w9_8_912', wingOf:9, wingType:8, e:'🦁', txt:'Son calme est ancré dans une présence physique solide', txtEn:'Their calm is anchored in a solid physical presence' },
  { id:'w9_1_912', wingOf:9, wingType:1, e:'📏', txt:'Son besoin de paix s\'accompagne d\'un sens du devoir silencieux', txtEn:'Their need for peace comes with a quiet sense of duty' },
];

// 13-17
const WING_13_17: WingStatement[] = [
  { id:'w1_9_1317', wingOf:1, wingType:9, e:'🌙', txt:'Son exigence s\'exprime dans la contemplation plutôt que dans la parole', txtEn:'Their exigence expresses itself in contemplation rather than speech' },
  { id:'w1_2_1317', wingOf:1, wingType:2, e:'🤲', txt:'Son exigence s\'exprime via le soin porté aux autres, pour les faire grandir', txtEn:'Their exigence comes through care for others, helping them grow' },
  { id:'w2_1_1317', wingOf:2, wingType:1, e:'⚖️', txt:'Il/elle aide par devoir moral, peut être critique si ça ne l\'est pas', txtEn:'They help out of moral duty, can be critical when standards aren\'t met' },
  { id:'w2_3_1317', wingOf:2, wingType:3, e:'✨', txt:'Il/elle aime l\'image de quelqu\'un qui aide, socialement visible et apprécié·e', txtEn:'They love the image of being someone who helps, socially visible and appreciated' },
  { id:'w3_2_1317', wingOf:3, wingType:2, e:'❤️', txt:'Son succès inclut d\'être aimé·e et apprécié·e, pas seulement admiré·e de loin', txtEn:'Their success includes being loved and appreciated, not only admired from afar' },
  { id:'w3_4_1317', wingOf:3, wingType:4, e:'🎭', txt:'Derrière sa performance, il/elle a un côté introspectif, en quête de sens unique', txtEn:'Behind their performance, they have an introspective side, in search of unique meaning' },
  { id:'w4_3_1317', wingOf:4, wingType:3, e:'🏆', txt:'Il/elle veut être reconnu·e pour sa singularité — pas ignoré·e', txtEn:'They want to be recognized for their singularity — not ignored' },
  { id:'w4_5_1317', wingOf:4, wingType:5, e:'🏰', txt:'Sa singularité est surtout intérieure, cultivée dans la solitude', txtEn:'Their singularity is mostly inward, cultivated in solitude' },
  { id:'w5_4_1317', wingOf:5, wingType:4, e:'🌌', txt:'Son monde intellectuel a une dimension esthétique, ses obsessions sont singulières', txtEn:'Their intellectual world has an aesthetic dimension — their obsessions are singular' },
  { id:'w5_6_1317', wingOf:5, wingType:6, e:'🔎', txt:'Il/elle teste les gens avant de leur faire confiance, analyse avec méfiance', txtEn:'They test people before trusting them, analyze with wariness' },
  { id:'w6_5_1317', wingOf:6, wingType:5, e:'📚', txt:'Ses inquiétudes passent par beaucoup d\'analyse, il/elle approfondit avant d\'agir', txtEn:'Their worries run through extensive analysis — they go deep before acting' },
  { id:'w6_7_1317', wingOf:6, wingType:7, e:'🎉', txt:'Il/elle décharge ses anxiétés dans l\'activité sociale, a besoin des autres autour', txtEn:'They discharge their anxieties through social activity, need others around' },
  { id:'w7_6_1317', wingOf:7, wingType:6, e:'🤝', txt:'Son goût pour la nouveauté coexiste avec de la loyauté et de la responsabilité', txtEn:'Their taste for novelty coexists with loyalty and responsibility' },
  { id:'w7_8_1317', wingOf:7, wingType:8, e:'⚡', txt:'Son énergie est assertive — il/elle veut faire, construire, obtenir', txtEn:'Their energy is assertive — they want to do, build, get things done' },
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
