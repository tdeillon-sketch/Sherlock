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
       compul: 'Le ressentiment et la rigidité morale : un juge intérieur qui note tout.',
       compulEn: 'Resentment and moral rigidity: an inner judge that grades everything.',
       wing: [9, 2], stress: 4, integ: 7 },
  2: { name: 'L\'Altruiste', nameEn: 'The Helper',
       nick: 'Le Généreux', nickEn: 'The Giver',
       color: '#d49155',
       fear: 'Être indigne d\'amour, ne pas être désiré.',
       fearEn: 'Being unworthy of love, not being wanted.',
       motive: 'Aimer et être aimé.',
       motiveEn: 'Loving and being loved.',
       compul: 'L\'orgueil caché sous l\'aide : donner pour devenir indispensable.',
       compulEn: 'Pride hidden under helpfulness: giving to become indispensable.',
       wing: [1, 3], stress: 8, integ: 4 },
  3: { name: 'Le Battant', nameEn: 'The Achiever',
       nick: 'Le Gagneur', nickEn: 'The Performer',
       color: '#d4a24a',
       fear: 'Être sans valeur, un échec.',
       fearEn: 'Being worthless, a failure.',
       motive: 'Réussir, être admiré.',
       motiveEn: 'Succeeding, being admired.',
       compul: 'La tromperie de soi : vivre derrière un masque de réussite.',
       compulEn: 'Self-deception: living behind a mask of success.',
       wing: [2, 4], stress: 9, integ: 6 },
  4: { name: 'Le Romantique', nameEn: 'The Individualist',
       nick: 'L\'Individualiste', nickEn: 'The Romantic',
       color: '#9b8cb8',
       fear: 'Être insignifiant, ordinaire, sans identité propre.',
       fearEn: 'Being insignificant, ordinary, with no identity of one\'s own.',
       motive: 'Trouver et exprimer sa vérité unique.',
       motiveEn: 'Finding and expressing one\'s unique truth.',
       compul: 'L\'envie du manque : la mélancolie comme preuve de profondeur.',
       compulEn: 'Envy of what\'s missing: melancholy as proof of depth.',
       wing: [3, 5], stress: 2, integ: 1 },
  5: { name: 'L\'Observateur', nameEn: 'The Investigator',
       nick: 'L\'Investigateur', nickEn: 'The Observer',
       color: '#5b8db8',
       fear: 'Être submergé, vidé de ses ressources internes.',
       fearEn: 'Being overwhelmed, drained of inner resources.',
       motive: 'Comprendre, être compétent.',
       motiveEn: 'Understanding, being competent.',
       compul: 'L\'avarice de soi : retenir temps, énergie, émotions.',
       compulEn: 'Self-stinginess: withholding time, energy, emotions.',
       wing: [4, 6], stress: 7, integ: 8 },
  6: { name: 'Le Loyaliste', nameEn: 'The Loyalist',
       nick: 'Le Prudent', nickEn: 'The Loyal Skeptic',
       color: '#6b8ec4',
       fear: 'Être sans soutien, sans orientation.',
       fearEn: 'Being without support, without guidance.',
       motive: 'Se sentir en sécurité et soutenu.',
       motiveEn: 'Feeling safe and supported.',
       compul: 'La peur et le doute permanent : anticiper tous les scénarios.',
       compulEn: 'Constant fear and doubt: anticipating every scenario.',
       wing: [5, 7], stress: 3, integ: 9 },
  7: { name: 'L\'Épicurien', nameEn: 'The Enthusiast',
       nick: 'L\'Enthousiaste', nickEn: 'The Adventurer',
       color: '#7abf8e',
       fear: 'Être piégé dans la souffrance ou la privation.',
       fearEn: 'Being trapped in pain or deprivation.',
       motive: 'Vivre pleinement, multiplier les découvertes.',
       motiveEn: 'Living fully, multiplying discoveries.',
       compul: 'La gourmandise : fuir la douleur dans la multiplication des options.',
       compulEn: 'Gluttony: escaping pain by multiplying options.',
       wing: [6, 8], stress: 1, integ: 5 },
  8: { name: 'Le Chef', nameEn: 'The Challenger',
       nick: 'Le Challenger', nickEn: 'The Protector',
       color: '#d66a5c',
       fear: 'Être contrôlé, dominé, blessé.',
       fearEn: 'Being controlled, dominated, harmed.',
       motive: 'Rester maître de sa vie et de son destin.',
       motiveEn: 'Staying in charge of one\'s life and destiny.',
       compul: 'La luxure de contrôle : la force pour masquer la vulnérabilité.',
       compulEn: 'Lust for control: strength as a mask for vulnerability.',
       wing: [7, 9], stress: 5, integ: 2 },
  9: { name: 'Le Médiateur', nameEn: 'The Peacemaker',
       nick: 'Le Pacificateur', nickEn: 'The Mediator',
       color: '#b8a48a',
       fear: 'Être en conflit, perdre la paix intérieure.',
       fearEn: 'Being in conflict, losing inner peace.',
       motive: 'Vivre en paix, en harmonie avec tous.',
       motiveEn: 'Living in peace, in harmony with everyone.',
       compul: 'La paresse de soi : s\'endormir à ses propres désirs pour maintenir l\'harmonie.',
       compulEn: 'Self-forgetting: falling asleep to one\'s own desires to keep the peace.',
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
  { id:'s1b_ad', t:1, e:'📏', txt:'Quand je me trompe, même un peu, je me le reproche comme une faute', txtEn:'When I make even a small mistake, I blame myself as if I\'d done something wrong', dim:'voice' },
  { id:'s1c_ad', t:1, e:'🔒', txt:'Je ravale mon agacement, car m\'emporter me semblerait incorrect', txtEn:'I swallow my irritation, because losing my temper would feel improper', dim:'compul' },
  { id:'s1d_ad', t:1, e:'😤', txt:'Quand c\'est mal fait, bâclé ou pas comme ça devrait être, ça me pèse physiquement', txtEn:'When something is poorly done, sloppy, or not as it should be, it weighs on me physically', dim:'body' },
  { id:'s1e_ad', t:1, e:'⚖️', txt:'Ça m\'irrite de voir les autres faire les choses à moitié alors que je me donne du mal pour bien faire', txtEn:'It irritates me to see others do half a job when I take such pains to do things right', dim:'belief' },
  { id:'s1f_ad', t:1, e:'✅', txt:'Je peaufine ce que je fais jusqu\'à ce que ce soit comme il faut, même si personne ne verra la différence', txtEn:'I keep refining what I do until it\'s just right, even if no one will see the difference', dim:'behavior' },
  // T2
  { id:'s2a_ad', t:2, e:'💞', txt:'Quand quelqu\'un autour de moi va mal, je ne suis tranquille qu\'après avoir fait quelque chose pour l\'aider', txtEn:'When someone around me is struggling, I can\'t settle until I\'ve done something to help', dim:'attunement' },
  { id:'s2b_ad', t:2, e:'🤲', txt:'Je propose spontanément mon aide, souvent avant qu\'on me la demande', txtEn:'I offer my help spontaneously, often before anyone asks for it', dim:'behavior' },
  { id:'s2c_ad', t:2, e:'🚫', txt:'J\'ai du mal à dire non aux gens à qui je tiens : j\'ai peur de les décevoir et de compter moins pour eux', txtEn:'I find it hard to say no to people I care about: I\'m afraid of disappointing them and mattering less to them', dim:'shadow' },
  { id:'s2d_ad', t:2, e:'😞', txt:'Ça me blesse qu\'on ne reconnaisse pas tout ce que je fais pour les autres', txtEn:'It hurts me when others don\'t recognize all I do for them', dim:'shadow' },
  { id:'s2e_ad', t:2, e:'🔗', txt:'Je cherche à me rendre indispensable à certaines personnes', txtEn:'I try to make myself indispensable to certain people', dim:'compul' },
  { id:'s2f_ad', t:2, e:'🧭', txt:'Je sais parfois mieux ce dont les autres ont besoin qu\'eux-mêmes', txtEn:'I sometimes know what others need better than they do themselves', dim:'belief' },
  // T3
  { id:'s3a_ad', t:3, e:'🎯', txt:'Je m\'adapte vite à ce qu\'on attend de moi, pour réussir et être admiré·e', txtEn:'I quickly adapt to what\'s expected of me, to succeed and be admired', dim:'compul' },
  { id:'s3b_ad', t:3, e:'📉', txt:'Passer pour quelqu\'un qui a échoué fait partie de mes plus grandes peurs', txtEn:'Being seen as someone who has failed is one of my biggest fears', dim:'fear' },
  { id:'s3c_ad', t:3, e:'🎭', txt:'Je suis très conscient·e de l\'image que je projette', txtEn:'I\'m very aware of the image I project', dim:'behavior' },
  { id:'s3d_ad', t:3, e:'⏭️', txt:'Je mets mes émotions en pause pour avancer efficacement', txtEn:'I put my emotions on pause to keep moving forward efficiently', dim:'shadow' },
  { id:'s3e_ad', t:3, e:'🏅', txt:'L\'estime que j\'ai de moi dépend beaucoup de la reconnaissance de mes réussites', txtEn:'My self-esteem depends a lot on my achievements being recognized', dim:'belief' },
  { id:'s3f_ad', t:3, e:'⚙️', txt:'Même épuisé·e, je continue à donner l\'image de quelqu\'un qui réussit', txtEn:'Even when I\'m exhausted, I keep up the image of someone who\'s succeeding', dim:'stress' },
  // T4
  { id:'s4a_ad', t:4, e:'🫥', txt:'Je me sens à part, différent·e des autres, et je tiens à cette différence', txtEn:'I feel set apart, different from others, and I\'m attached to that difference', dim:'identity' },
  { id:'s4b_ad', t:4, e:'🌫️', txt:'Il me manque quelque chose d\'essentiel que les autres semblent avoir', txtEn:'Something essential is missing in me that others seem to have', dim:'fear' },
  { id:'s4c_ad', t:4, e:'🎨', txt:'Mon monde émotionnel intérieur est intense, coloré, parfois excessif', txtEn:'My inner emotional world is intense, vivid, sometimes excessive', dim:'emotion' },
  { id:'s4d_ad', t:4, e:'🌙', txt:'Une douce mélancolie me touche plus que la gaieté ordinaire', txtEn:'A gentle melancholy moves me more than ordinary cheerfulness', dim:'aesthetic' },
  { id:'s4e_ad', t:4, e:'🌑', txt:'Le quotidien ordinaire me pèse : j\'ai le sentiment de passer à côté d\'une vie plus profonde et plus vraie', txtEn:'Ordinary daily life weighs on me: I feel I\'m missing out on a deeper, truer life', dim:'shadow' },
  { id:'s4f_ad', t:4, e:'🎭', txt:'J\'entretiens mes états d\'âme, même tristes : ils font partie de qui je suis', txtEn:'I nurture my moods, even the sad ones: they\'re part of who I am', dim:'compul' },
  // T5
  { id:'s5a_ad', t:5, e:'🔋', txt:'J\'ai besoin de beaucoup plus de solitude que la plupart des gens pour me recharger', txtEn:'I need much more solitude than most people to recharge', dim:'behavior' },
  { id:'s5b_ad', t:5, e:'🔬', txt:'J\'aime comprendre à fond comment une chose fonctionne, même quand ça ne me sert à rien', txtEn:'I like to understand in depth how something works, even when it\'s of no use to me', dim:'behavior' },
  { id:'s5c_ad', t:5, e:'🏰', txt:'Je protège mon temps et mon énergie comme des ressources rares', txtEn:'I protect my time and energy as scarce resources', dim:'compul' },
  { id:'s5d_ad', t:5, e:'🧠', txt:'Face à une émotion forte, j\'analyse ce qui m\'arrive plutôt que de le vivre', txtEn:'Faced with a strong emotion, I analyze what\'s happening to me rather than feel it', dim:'shadow' },
  { id:'s5e_ad', t:5, e:'📚', txt:'Je me contente de peu pour ne dépendre de personne', txtEn:'I make do with little so that I don\'t have to depend on anyone', dim:'behavior' },
  { id:'s5f_ad', t:5, e:'📡', txt:'Une visite à l\'improviste, même amicale, me donne l\'impression d\'être envahi·e', txtEn:'An unannounced visit, even a friendly one, makes me feel intruded upon', dim:'stress' },
  // T6
  { id:'s6a_ad', t:6, e:'⚠️', txt:'J\'imagine spontanément ce qui pourrait mal tourner dans une situation', txtEn:'I spontaneously imagine what could go wrong in a situation', dim:'voice' },
  { id:'s6b_ad', t:6, e:'📋', txt:'Je prévois souvent un plan B, voire un plan C, au cas où les choses tourneraient mal', txtEn:'I often have a plan B, or even a plan C, ready in case things go wrong', dim:'behavior' },
  { id:'s6c_ad', t:6, e:'❓', txt:'Même après avoir pris une décision, je me demande encore si c\'était la bonne', txtEn:'Even after making a decision, I keep wondering whether it was the right one', dim:'shadow' },
  { id:'s6d_ad', t:6, e:'🛡️', txt:'Quand je m\'inquiète, j\'ai besoin qu\'une personne de confiance me rassure', txtEn:'When I\'m worried, I need someone I trust to reassure me', dim:'motive' },
  { id:'s6e_ad', t:6, e:'🔎', txt:'Il m\'arrive de foncer droit sur ce qui m\'effraie, juste pour en finir avec la peur', txtEn:'Sometimes I charge straight at what frightens me, just to be done with the fear', dim:'behavior' },
  { id:'s6f_ad', t:6, e:'🤝', txt:'L\'idée de me retrouver sans soutien en cas de coup dur m\'angoisse', txtEn:'The thought of being left without support when things go wrong makes me anxious', dim:'motive' },
  // T7
  { id:'s7a_ad', t:7, e:'✨', txt:'Mes envies se multiplient vite : je passe d\'une idée excitante à une autre', txtEn:'My desires multiply quickly: I jump from one exciting idea to another', dim:'behavior' },
  { id:'s7b_ad', t:7, e:'😊', txt:'Plutôt que de rester avec une émotion pénible, je passe vite à quelque chose de plus gai', txtEn:'Rather than sit with a painful feeling, I quickly move on to something more cheerful', dim:'compul' },
  { id:'s7c_ad', t:7, e:'🎪', txt:'Je mène souvent plusieurs plans de front : n\'en choisir qu\'un me donne l\'impression de rater tous les autres', txtEn:'I usually run several plans at once: picking just one feels like missing out on all the rest', dim:'behavior' },
  { id:'s7d_ad', t:7, e:'☀️', txt:'Préparer un voyage m\'excite souvent plus que le voyage lui-même', txtEn:'Planning a trip often excites me more than the trip itself', dim:'belief' },
  { id:'s7e_ad', t:7, e:'🔗', txt:'L\'ennui et la routine me sont insupportables', txtEn:'Boredom and routine are unbearable to me', dim:'fear' },
  { id:'s7f_ad', t:7, e:'🥂', txt:'Quand quelque chose me fait envie, j\'ai du mal à attendre ou à m\'en priver', txtEn:'When I want something, I find it hard to wait or to go without', dim:'compul' },
  // T8
  { id:'s8a_ad', t:8, e:'⚡', txt:'Quand personne ne décide, je prends les rênes, quitte à déplaire', txtEn:'When no one decides, I take charge, even if it means displeasing people', dim:'behavior' },
  { id:'s8b_ad', t:8, e:'💬', txt:'Je dis les choses franchement, sans filtre', txtEn:'I say things straight, no filter', dim:'behavior' },
  { id:'s8c_ad', t:8, e:'👁️', txt:'Je sens d\'instinct les rapports de force dans une pièce', txtEn:'I instinctively sense the power dynamics in any room', dim:'attunement' },
  { id:'s8d_ad', t:8, e:'🦁', txt:'Quand je suis en colère, ça se voit et ça s\'entend tout de suite', txtEn:'When I\'m angry, people see it and hear it right away', dim:'motive' },
  { id:'s8e_ad', t:8, e:'⛓️', txt:'Quand on essaie de me contrôler, j\'ai physiquement envie de résister', txtEn:'When someone tries to control me, I feel a physical urge to resist', dim:'fear' },
  { id:'s8f_ad', t:8, e:'👑', txt:'Montrer ma vulnérabilité me met plus mal à l\'aise qu\'un affrontement', txtEn:'Showing my vulnerability makes me more uncomfortable than a confrontation', dim:'integ' },
  // T9
  { id:'s9a_ad', t:9, e:'🕊️', txt:'Il m\'arrive de dire oui pour avoir la paix, puis de laisser traîner les choses', txtEn:'Sometimes I say yes just to keep the peace, then drag my feet', dim:'compul' },
  { id:'s9b_ad', t:9, e:'💤', txt:'Je m\'occupe de mille petites choses faciles et je repousse celle qui compte vraiment pour moi', txtEn:'I busy myself with lots of easy little things and put off the one that truly matters to me', dim:'shadow' },
  { id:'s9c_ad', t:9, e:'🌊', txt:'Je me fonds dans l\'ambiance d\'un groupe au point d\'en oublier ma propre position', txtEn:'I blend into a group\'s mood so completely that I lose track of my own stance', dim:'behavior' },
  { id:'s9d_ad', t:9, e:'☮️', txt:'Quand quelque chose me contrarie, je minimise pour ne pas faire de vagues', txtEn:'When something upsets me, I play it down so as not to make waves', dim:'compul' },
  { id:'s9e_ad', t:9, e:'🤷', txt:'Quand on me demande ce qui me ferait plaisir, j\'ai souvent un blanc', txtEn:'When someone asks me what I\'d like, my mind often goes blank', dim:'shadow' },
  { id:'s9f_ad', t:9, e:'☁️', txt:'Quand la tension monte, je me réfugie dans une routine confortable pour ne plus y penser', txtEn:'When tension builds, I retreat into a comfortable routine so I don\'t have to think about it', dim:'stress' },
];

// ────────────────────────────────────────────────────────────────
//  POOLS ENFANTS (3e personne — parent observe l'enfant)
//  Draft initial — à affiner. Phrases courtes, comportements observables.
// ────────────────────────────────────────────────────────────────

const STATEMENTS_5_8: Statement[] = [
  // T1
  { id:'s1a_58', t:1, e:'🔍', txt:'Il/elle remarque vite ce qui n\'est pas « bien fait » (un coloriage qui dépasse, une table mal mise)', txtEn:'They quickly notice what isn\'t "done right" (coloring outside the lines, a badly set table)', dim:'behavior' },
  { id:'s1b_58', t:1, e:'📏', txt:'Il/elle recommence un dessin raté, même quand c\'est juste pour lui/elle', txtEn:'They redo a drawing that went wrong, even when it\'s just for themselves', dim:'voice' },
  { id:'s1c_58', t:1, e:'🔒', txt:'Il/elle range ses jouets avec méthode, sans qu\'on le lui demande', txtEn:'They tidy their toys methodically, without being asked', dim:'compul' },
  { id:'s1d_58', t:1, e:'😤', txt:'Sa colère est rentrée : il/elle se raidit et rumine longtemps ce qui n\'était « pas juste »', txtEn:'Their anger stays bottled up: they stiffen and brood for a long time over what "wasn\'t fair"', dim:'body' },
  { id:'s1e_58', t:1, e:'⚖️', txt:'Il/elle vous signale vos incohérences : « Tu avais dit pas de télé à table ! »', txtEn:'They point out your inconsistencies: "You said no TV at the table!"', dim:'belief' },
  { id:'s1f_58', t:1, e:'✅', txt:'Il/elle se fâche contre lui/elle-même à la moindre erreur', txtEn:'They get angry at themselves over the slightest mistake', dim:'shadow' },
  // T2
  { id:'s2a_58', t:2, e:'💞', txt:'Il/elle devine ce dont vous avez besoin et vous l\'apporte avant que vous le demandiez', txtEn:'They sense what you need and bring it to you before you ask', dim:'attunement' },
  { id:'s2b_58', t:2, e:'🤲', txt:'Il/elle adore s\'occuper des plus petits de la famille et les chouchouter', txtEn:'They love looking after the youngest ones in the family and fussing over them', dim:'behavior' },
  { id:'s2c_58', t:2, e:'🚫', txt:'Il/elle vous offre très souvent des dessins ou de petits cadeaux et guette votre réaction', txtEn:'They very often give you drawings or little gifts and watch for your reaction', dim:'behavior' },
  { id:'s2d_58', t:2, e:'😞', txt:'Il/elle boude si on ne remarque pas ce qu\'il/elle a fait pour vous', txtEn:'They sulk if you don\'t notice what they did for you', dim:'shadow' },
  { id:'s2e_58', t:2, e:'🔗', txt:'Il/elle tient à être votre « aide préféré·e » à la maison', txtEn:'They are keen to be your "favorite helper" at home', dim:'compul' },
  { id:'s2f_58', t:2, e:'🧭', txt:'Quand vous êtes triste, il/elle insiste pour vous consoler, même si vous préférez être tranquille', txtEn:'When you\'re sad, they insist on comforting you, even if you\'d rather be left alone', dim:'belief' },
  // T3
  { id:'s3a_58', t:3, e:'🎯', txt:'Un « bravo » compte plus pour lui/elle qu\'un câlin', txtEn:'A "well done" means more to them than a cuddle', dim:'compul' },
  { id:'s3b_58', t:3, e:'📉', txt:'Quand il/elle perd, il/elle trouve vite une excuse pour sauver la face', txtEn:'When they lose, they quickly find an excuse to save face', dim:'fear' },
  { id:'s3c_58', t:3, e:'🎭', txt:'Il/elle change d\'attitude selon l\'adulte en face, pour faire bonne impression à chacun', txtEn:'They shift their manner depending on which adult they\'re with, to make a good impression on each one', dim:'behavior' },
  { id:'s3d_58', t:3, e:'⏭️', txt:'Il/elle s\'applique surtout quand on le/la regarde, puis vérifie que vous avez bien vu', txtEn:'They try hardest when someone is watching, then check that you really saw', dim:'shadow' },
  { id:'s3e_58', t:3, e:'🏅', txt:'Il/elle choisit les activités où il/elle brille et délaisse celles où il/elle est moyen·ne', txtEn:'They pick the activities where they shine and drop the ones where they\'re only average', dim:'belief' },
  { id:'s3f_58', t:3, e:'⚙️', txt:'Il/elle veut finir le/la premier·ère, quitte à bâcler un peu', txtEn:'They want to finish first, even if it means cutting a few corners', dim:'stress' },
  // T4
  { id:'s4a_58', t:4, e:'🫥', txt:'Il/elle dit que personne ne le/la comprend vraiment', txtEn:'They say that nobody really understands them', dim:'identity' },
  { id:'s4b_58', t:4, e:'🌫️', txt:'Il/elle a des moments de tristesse sans cause apparente', txtEn:'They have moments of sadness with no obvious cause', dim:'fear' },
  { id:'s4c_58', t:4, e:'🎨', txt:'Il/elle aime les histoires tristes et redemande celles qui le/la font pleurer', txtEn:'They love sad stories and ask again for the ones that make them cry', dim:'emotion' },
  { id:'s4d_58', t:4, e:'🌙', txt:'Quand il/elle a de la peine, il/elle se réfugie dans un monde imaginaire', txtEn:'When they\'re hurt, they retreat into an imaginary world', dim:'aesthetic' },
  { id:'s4e_58', t:4, e:'🌑', txt:'Il/elle dit souvent que les autres ont plus de chance que lui/elle', txtEn:'They often say that other people are luckier than they are', dim:'shadow' },
  { id:'s4f_58', t:4, e:'🎭', txt:'Il/elle tient à se distinguer : des habits, une coiffure ou des objets que les autres n\'ont pas', txtEn:'They insist on standing out: clothes, a hairstyle or things the others don\'t have', dim:'compul' },
  // T5
  { id:'s5a_58', t:5, e:'🔋', txt:'Il/elle se passionne pour un sujet précis (volcans, planètes) et en sait vite plus que vous', txtEn:'They get absorbed in one specific subject (volcanoes, planets) and soon know more about it than you do', dim:'behavior' },
  { id:'s5b_58', t:5, e:'🔬', txt:'Devant un nouveau jeu, il/elle préfère comprendre seul·e comment il marche avant d\'essayer', txtEn:'With a new game, they prefer to work out on their own how it works before trying it', dim:'behavior' },
  { id:'s5c_58', t:5, e:'🏰', txt:'Il/elle a besoin d\'un coin à lui/elle où on le/la laisse tranquille, sans être dérangé·e', txtEn:'They need a corner of their own where they\'re left alone, undisturbed', dim:'compul' },
  { id:'s5d_58', t:5, e:'🔋', txt:'Il/elle garde ses émotions pour lui/elle et en parle peu, même à vous', txtEn:'They keep their feelings to themselves and rarely talk about them, even to you', dim:'behavior' },
  { id:'s5e_58', t:5, e:'📚', txt:'Il/elle peut observer longtemps un insecte ou une machine pour comprendre comment ça marche', txtEn:'They can watch an insect or a machine for a long time to understand how it works', dim:'behavior' },
  { id:'s5f_58', t:5, e:'📡', txt:'Les fêtes avec beaucoup d\'enfants et de bruit l\'épuisent vite', txtEn:'Parties with lots of children and noise wear them out fast', dim:'stress' },
  // T6
  { id:'s6a_58', t:6, e:'⚠️', txt:'Il/elle pose beaucoup de questions « et si… » (et si on se perd, et si l\'avion tombe)', txtEn:'They ask lots of "what if…" questions (what if we get lost, what if the plane crashes)', dim:'voice' },
  { id:'s6b_58', t:6, e:'📋', txt:'Quand vous êtes en retard, il/elle s\'inquiète et imagine qu\'il vous est arrivé quelque chose', txtEn:'When you\'re late, they worry and imagine that something has happened to you', dim:'behavior' },
  { id:'s6c_58', t:6, e:'❓', txt:'Il/elle hésite, redemande, cherche confirmation avant de décider', txtEn:'They hesitate, ask again, want confirmation before deciding', dim:'shadow' },
  { id:'s6d_58', t:6, e:'🛡️', txt:'Quand quelque chose lui fait visiblement peur, il/elle s\'y lance exprès, comme pour défier sa peur', txtEn:'When something visibly scares them, they deliberately throw themselves into it, as if to defy their fear', dim:'motive' },
  { id:'s6e_58', t:6, e:'🔎', txt:'Avec une nouvelle baby-sitter, il/elle reste méfiant·e jusqu\'à être sûr·e de pouvoir lui faire confiance', txtEn:'With a new babysitter, they stay wary until they\'re sure they can trust that person', dim:'behavior' },
  { id:'s6f_58', t:6, e:'🤝', txt:'Il/elle s\'oppose à une consigne, puis revient vérifier que vous n\'êtes pas fâché·e', txtEn:'They push back against an instruction, then come back to check that you\'re not angry', dim:'motive' },
  // T7
  { id:'s7a_58', t:7, e:'✨', txt:'Il/elle passe très vite d\'une activité à une autre, commence tout sans finir', txtEn:'They jump very quickly from one activity to another, start everything without finishing', dim:'behavior' },
  { id:'s7b_58', t:7, e:'😊', txt:'Il/elle supporte mal de ne rien faire et réclame vite une nouvelle activité', txtEn:'They can\'t stand having nothing to do and quickly ask for a new activity', dim:'compul' },
  { id:'s7c_58', t:7, e:'🎪', txt:'Il/elle déborde d\'idées de jeux et de projets', txtEn:'They\'re bursting with ideas for games and projects', dim:'behavior' },
  { id:'s7d_58', t:7, e:'☀️', txt:'Après une déception, il/elle rebondit aussitôt sur un nouveau projet amusant', txtEn:'After a disappointment, they bounce straight on to a new, enjoyable plan', dim:'belief' },
  { id:'s7e_58', t:7, e:'🔗', txt:'Quand la conversation devient triste, il/elle la détourne vite avec une blague', txtEn:'When the conversation turns sad, they quickly steer it away with a joke', dim:'fear' },
  { id:'s7f_58', t:7, e:'🥂', txt:'Pendant une sortie, il/elle parle déjà de la prochaine', txtEn:'During an outing, they\'re already talking about the next one', dim:'belief' },
  // T8
  { id:'s8a_58', t:8, e:'⚡', txt:'Dans les jeux, il/elle impose sa façon de faire, quitte à se disputer avec les autres', txtEn:'In games, they impose their way of doing things, even if it means arguing with the others', dim:'behavior' },
  { id:'s8b_58', t:8, e:'💬', txt:'Il/elle vous dit « non » en face, même quand vous haussez le ton', txtEn:'They tell you "no" to your face, even when you raise your voice', dim:'behavior' },
  { id:'s8c_58', t:8, e:'👑', txt:'Ses colères sont spectaculaires, puis retombent vite, sans rancune', txtEn:'Their fits of anger are spectacular, then blow over quickly, with no grudge', dim:'behavior' },
  { id:'s8d_58', t:8, e:'🦁', txt:'Il/elle prend la défense d\'un frère, d\'une sœur ou d\'un plus petit, même face à un adulte', txtEn:'They stand up for a brother, a sister or a younger child, even against an adult', dim:'motive' },
  { id:'s8e_58', t:8, e:'⛓️', txt:'Il/elle exige une explication avant d\'obéir à une règle', txtEn:'They demand an explanation before obeying a rule', dim:'fear' },
  { id:'s8f_58', t:8, e:'👑', txt:'Quand il/elle a mal ou de la peine, il/elle cache ses larmes pour ne pas paraître faible', txtEn:'When they\'re hurt or sad, they hide their tears so as not to look weak', dim:'integ' },
  // T9
  { id:'s9a_58', t:9, e:'🕊️', txt:'Il/elle s\'adapte si bien aux autres qu\'on oublie parfois de lui demander son avis', txtEn:'They adapt so well to others that people sometimes forget to ask their opinion', dim:'compul' },
  { id:'s9b_58', t:9, e:'💤', txt:'Il/elle peut passer un long moment à ne rien faire de précis, tout à fait content·e', txtEn:'They can spend a long while doing nothing in particular, perfectly content', dim:'shadow' },
  { id:'s9c_58', t:9, e:'🌊', txt:'Il/elle cède sa préférence sans protester pour ne pas contrarier les autres (« comme tu veux »)', txtEn:'They give up their own preference without protest so as not to upset others ("whatever you want")', dim:'behavior' },
  { id:'s9d_58', t:9, e:'☮️', txt:'Quand d\'autres se disputent devant lui/elle, il/elle évite de prendre parti', txtEn:'When others argue in front of them, they avoid taking sides', dim:'compul' },
  { id:'s9e_58', t:9, e:'🤷', txt:'Quand on lui demande ce qu\'il/elle veut, il/elle répond souvent « ça m\'est égal »', txtEn:'When asked what they want, they often answer "I don\'t mind"', dim:'shadow' },
  { id:'s9f_58', t:9, e:'☁️', txt:'Plutôt que de dire non, il/elle dit « oui, oui » et fait traîner les choses', txtEn:'Rather than saying no, they say "yes, yes" and drag things out', dim:'stress' },
];

const STATEMENTS_9_12: Statement[] = [
  // T1
  { id:'s1a_912', t:1, e:'🔍', txt:'Il/elle repère les erreurs, corrige volontiers les adultes quand ils se trompent', txtEn:'They spot mistakes, willingly correct adults when they get something wrong', dim:'behavior' },
  { id:'s1b_912', t:1, e:'📏', txt:'Il/elle recopie toute une page pour une seule rature, même sur un brouillon', txtEn:'They rewrite a whole page because of a single crossing-out, even on a rough draft', dim:'voice' },
  { id:'s1c_912', t:1, e:'🔒', txt:'Quand quelque chose est mal fait, il/elle s\'agace mais se retient d\'exploser', txtEn:'When something is done badly, they get irritated but hold back from exploding', dim:'compul' },
  { id:'s1d_912', t:1, e:'😤', txt:'Il/elle proteste quand quelqu\'un triche au jeu, même si c\'est en sa faveur', txtEn:'They protest when someone cheats at a game, even if it\'s in their favor', dim:'body' },
  { id:'s1e_912', t:1, e:'⚖️', txt:'Il/elle a un avis tranché sur ce qui est juste à l\'école, à la maison', txtEn:'They have firm opinions on what\'s fair at school, at home', dim:'belief' },
  { id:'s1f_912', t:1, e:'✅', txt:'Il/elle s\'en veut longtemps d\'une petite erreur que personne d\'autre n\'a remarquée', txtEn:'They beat themselves up for a long time over a small mistake nobody else noticed', dim:'shadow' },
  // T2
  { id:'s2a_912', t:2, e:'💞', txt:'Il/elle est attentionné·e avec ses copains, écoute leurs soucis', txtEn:'They\'re attentive to their friends, listen to their concerns', dim:'attunement' },
  { id:'s2b_912', t:2, e:'🤲', txt:'Il/elle aime s\'occuper des plus petits (fratrie, cousins) et se sentir indispensable', txtEn:'They love looking after younger kids (siblings, cousins) and feeling indispensable', dim:'behavior' },
  { id:'s2c_912', t:2, e:'🚫', txt:'Il/elle cède aux demandes de ses amis pour rester celui/celle sur qui ils comptent', txtEn:'They give in to their friends\' requests to stay the one their friends count on', dim:'shadow' },
  { id:'s2d_912', t:2, e:'😞', txt:'Il/elle est blessé·e si on oublie de le/la remercier', txtEn:'They\'re hurt if you forget to thank them', dim:'shadow' },
  { id:'s2e_912', t:2, e:'🔗', txt:'Il/elle cherche à devenir le/la préféré·e d\'un adulte proche, un grand-parent par exemple', txtEn:'They try to become the favorite of a close adult, a grandparent for example', dim:'compul' },
  { id:'s2f_912', t:2, e:'🧭', txt:'Il/elle propose spontanément son aide avant qu\'on lui demande', txtEn:'They spontaneously offer help before being asked', dim:'belief' },
  // T3
  { id:'s3a_912', t:3, e:'🎯', txt:'Il/elle change de style et d\'attitude selon le groupe, pour y faire bonne impression', txtEn:'They change their style and attitude depending on the group, to make a good impression', dim:'compul' },
  { id:'s3b_912', t:3, e:'📉', txt:'Il/elle évite les activités où il/elle risque d\'avoir l\'air moins bon·ne que les autres', txtEn:'They avoid activities where they might look worse than the others', dim:'fear' },
  { id:'s3c_912', t:3, e:'🎭', txt:'Devant la famille ou des invités, il/elle met volontiers en avant ses réussites', txtEn:'In front of family or guests, they readily highlight their achievements', dim:'behavior' },
  { id:'s3d_912', t:3, e:'⏭️', txt:'Il/elle minimise ses difficultés pour « rester dans la course »', txtEn:'They downplay their difficulties to "stay in the race"', dim:'shadow' },
  { id:'s3e_912', t:3, e:'🏅', txt:'Il/elle veut connaître les notes des autres pour savoir où il/elle se classe', txtEn:'They want to know other kids\' grades to see where they rank', dim:'belief' },
  { id:'s3f_912', t:3, e:'⚙️', txt:'Il/elle se pousse à fond, redouble d\'efforts pour rester en tête, ne pas se faire dépasser', txtEn:'They push themselves hard, redouble their efforts to stay ahead, not be overtaken', dim:'stress' },
  // T4
  { id:'s4a_912', t:4, e:'🫥', txt:'Il/elle dit souvent que personne ne le/la comprend vraiment', txtEn:'They often say that nobody really understands them', dim:'identity' },
  { id:'s4b_912', t:4, e:'🌫️', txt:'Il/elle a des moments mélancoliques sans cause évidente', txtEn:'They have melancholy moments without obvious cause', dim:'fear' },
  { id:'s4c_912', t:4, e:'🎨', txt:'Quand il/elle a du chagrin, il/elle s\'y plonge (musique triste, écriture) plutôt que de s\'en distraire', txtEn:'When they\'re sad, they sink into it (sad music, writing) rather than distract themselves', dim:'emotion' },
  { id:'s4d_912', t:4, e:'🌙', txt:'Il/elle regarde souvent les autres enfants avec envie, comme s\'il lui manquait quelque chose', txtEn:'They often look at other kids with envy, as if they were missing something', dim:'belief' },
  { id:'s4e_912', t:4, e:'🌑', txt:'Il/elle recherche des liens profonds et sincères, et se lasse vite des relations qui restent en surface', txtEn:'They seek deep, sincere bonds and quickly tire of relationships that stay on the surface', dim:'shadow' },
  { id:'s4f_912', t:4, e:'🎭', txt:'Il/elle se démarque volontairement : goûts, look ou idées à contre-courant de ce que les autres aiment', txtEn:'They set themselves apart on purpose: tastes, look, or ideas that cut against what the others like', dim:'compul' },
  // T5
  { id:'s5a_912', t:5, e:'🔋', txt:'Il/elle refuse sans regret une sortie ou une invitation pour garder du temps à lui/elle', txtEn:'They turn down an outing or an invitation without regret, to keep time for themselves', dim:'behavior' },
  { id:'s5b_912', t:5, e:'🔬', txt:'Il/elle préfère chercher seul·e une réponse (livres, internet) plutôt que de la demander à un adulte', txtEn:'They\'d rather look up an answer on their own (books, the internet) than ask an adult', dim:'behavior' },
  { id:'s5c_912', t:5, e:'🏰', txt:'Il/elle protège son espace personnel et son temps de récupération : se retire si on empiète dessus', txtEn:'They protect their personal space and recharge time: they withdraw if someone encroaches on it', dim:'compul' },
  { id:'s5d_912', t:5, e:'🧠', txt:'Quand l\'émotion monte en famille, il/elle observe et analyse plutôt que de se laisser emporter', txtEn:'When emotions run high in the family, they watch and analyze rather than get carried away', dim:'shadow' },
  { id:'s5e_912', t:5, e:'📚', txt:'Il/elle a une passion qu\'il/elle approfondit énormément (livres, jeu, thème)', txtEn:'They have a passion they go very deep into (books, a game, a topic)', dim:'behavior' },
  { id:'s5f_912', t:5, e:'📡', txt:'Après une fête ou une réunion de famille, il/elle a besoin de s\'isoler longtemps pour récupérer', txtEn:'After a party or a family gathering, they need a long time alone to recover', dim:'stress' },
  // T6
  { id:'s6a_912', t:6, e:'⚠️', txt:'Il/elle imagine les scénarios qui peuvent mal tourner, prépare des plans B', txtEn:'They imagine scenarios that might go wrong, prepare backup plans', dim:'voice' },
  { id:'s6b_912', t:6, e:'📋', txt:'On voit qu\'il/elle a peur, puis il/elle se force à foncer, comme pour défier sa peur', txtEn:'You can see they\'re scared, then they force themselves to charge ahead, as if to defy their fear', dim:'behavior' },
  { id:'s6c_912', t:6, e:'❓', txt:'Il/elle doute de ses choix, demande confirmation à un adulte', txtEn:'They doubt their choices, ask an adult for confirmation', dim:'shadow' },
  { id:'s6d_912', t:6, e:'🛡️', txt:'Il/elle se calme vite quand un adulte de confiance lui explique clairement ce qui va se passer', txtEn:'They settle down quickly once a trusted adult clearly explains what is going to happen', dim:'motive' },
  { id:'s6e_912', t:6, e:'🔎', txt:'Devant une promesse ou une offre trop belle, il/elle cherche tout de suite le piège', txtEn:'Faced with a promise or an offer that sounds too good, they look for the catch right away', dim:'behavior' },
  { id:'s6f_912', t:6, e:'🤝', txt:'Il/elle tient beaucoup à sa bande ou à son équipe : y avoir sa place le/la rassure', txtEn:'Their group of friends or their team matters a lot to them: having a place there reassures them', dim:'motive' },
  // T7
  { id:'s7a_912', t:7, e:'✨', txt:'Il/elle s\'enthousiasme pour mille choses, papillonne d\'un intérêt à l\'autre', txtEn:'They get excited about a thousand things, flit from one interest to another', dim:'behavior' },
  { id:'s7b_912', t:7, e:'😊', txt:'Quand une conversation devient triste, il/elle change de sujet ou lance une blague', txtEn:'When a conversation turns sad, they change the subject or crack a joke', dim:'compul' },
  { id:'s7c_912', t:7, e:'🎪', txt:'Il/elle supporte mal de rater une fête ou une sortie, de peur de manquer quelque chose', txtEn:'They hate skipping a party or an outing, for fear of missing out on something', dim:'fear' },
  { id:'s7d_912', t:7, e:'☀️', txt:'Il/elle transforme les contrariétés en opportunités, rebondit vite', txtEn:'They turn upsets into opportunities, bounce back fast', dim:'belief' },
  { id:'s7e_912', t:7, e:'🔗', txt:'La routine le/la lasse vite : il/elle réclame de la nouveauté', txtEn:'Routine quickly bores them: they keep asking for something new', dim:'fear' },
  { id:'s7f_912', t:7, e:'🥂', txt:'À peine une sortie terminée, il/elle parle déjà de la prochaine', txtEn:'An outing has barely ended and they\'re already talking about the next one', dim:'belief' },
  // T8
  { id:'s8a_912', t:8, e:'⚡', txt:'Sa colère éclate d\'un coup, bruyante et directe, puis retombe vite', txtEn:'Their anger bursts out all at once, loud and direct, then quickly dies down', dim:'body' },
  { id:'s8b_912', t:8, e:'💬', txt:'Il/elle dit ce qu\'il/elle pense franchement, sans filtre', txtEn:'They say what they think frankly, without filter', dim:'behavior' },
  { id:'s8c_912', t:8, e:'👑', txt:'Il/elle prend naturellement le contrôle d\'un groupe et impose sa volonté', txtEn:'They naturally take control of a group and impose their will', dim:'behavior' },
  { id:'s8d_912', t:8, e:'🦁', txt:'Il/elle défend farouchement son territoire, ses amis, sa fratrie', txtEn:'They fiercely defend their territory, friends, siblings', dim:'motive' },
  { id:'s8e_912', t:8, e:'⛓️', txt:'Il/elle résiste frontalement aux ordres directs', txtEn:'They resist direct orders head-on', dim:'fear' },
  { id:'s8f_912', t:8, e:'👑', txt:'Il/elle déteste montrer sa peine ou sa peur : pour lui/elle, ce serait paraître faible', txtEn:'They hate showing hurt or fear: to them, that would mean looking weak', dim:'shadow' },
  // T9
  { id:'s9a_912', t:9, e:'🕊️', txt:'Quand deux personnes se disputent, il/elle trouve que chacun a un peu raison', txtEn:'When two people argue, they feel that each side is partly right', dim:'compul' },
  { id:'s9b_912', t:9, e:'💤', txt:'Plutôt que de dire non, il/elle dit « d\'accord », puis traîne pour s\'y mettre', txtEn:'Rather than say no, they say "okay", then drag their feet getting started', dim:'shadow' },
  { id:'s9c_912', t:9, e:'🌊', txt:'Il/elle s\'adapte au groupe, suit plus qu\'il/elle n\'initie', txtEn:'They go along with the group, follow more than they initiate', dim:'behavior' },
  { id:'s9d_912', t:9, e:'☮️', txt:'Même quand on lui prend son tour ou ses affaires, il/elle se fâche rarement', txtEn:'Even when someone takes their turn or their things, they rarely get angry', dim:'compul' },
  { id:'s9e_912', t:9, e:'🤷', txt:'Quand on lui demande ce qu\'il/elle veut, il/elle répond souvent « je ne sais pas » ou « ça dépend »', txtEn:'When asked what they want, they often answer "I don\'t know" or "it depends"', dim:'shadow' },
  { id:'s9f_912', t:9, e:'☁️', txt:'Quand l\'ambiance est tendue, il/elle « décroche » : présent·e, mais la tête ailleurs', txtEn:'When the atmosphere is tense, they "check out": present, but with their mind elsewhere', dim:'stress' },
];

const STATEMENTS_13_17: Statement[] = [
  // T1
  { id:'s1a_1317', t:1, e:'🔍', txt:'Il/elle reprend les autres quand quelque chose est bâclé, pour que ce soit fait « comme il faut »', txtEn:'They correct others when something is done sloppily, so it gets done the way it should be', dim:'behavior' },
  { id:'s1b_1317', t:1, e:'📏', txt:'Il/elle soigne autant un devoir non noté qu\'un contrôle : il faut que ce soit bien fait', txtEn:'They put as much care into ungraded homework as into a test: it has to be done right', dim:'voice' },
  { id:'s1c_1317', t:1, e:'🔒', txt:'En colère, il/elle hausse rarement le ton : ça ressort en remarques sèches ou en critiques', txtEn:'When angry, they rarely raise their voice: it comes out as curt remarks or criticism', dim:'compul' },
  { id:'s1d_1317', t:1, e:'😤', txt:'Il/elle a une façon précise de faire les choses (ranger, réviser, cuisiner) et pense que c\'est la bonne', txtEn:'They have a precise way of doing things (tidying, studying, cooking) and think it is the right one', dim:'behavior' },
  { id:'s1e_1317', t:1, e:'⚖️', txt:'Il/elle a un sens moral strict : pour lui/elle, les choses sont soit bien, soit mal', txtEn:'They have a strict moral sense: to them, things are either right or wrong', dim:'belief' },
  { id:'s1f_1317', t:1, e:'✅', txt:'Il/elle s\'en veut longtemps après une erreur, même petite, comme si c\'était une faute', txtEn:'They blame themselves for a long time after a mistake, even a small one, as if it were a moral failing', dim:'behavior' },
  // T2
  { id:'s2a_1317', t:2, e:'💞', txt:'Il/elle aime être la personne vers qui ses ami·e·s se tournent quand ça va mal', txtEn:'They like being the person their friends turn to when things go wrong', dim:'attunement' },
  { id:'s2b_1317', t:2, e:'🤲', txt:'Il/elle se met en quatre pour quelqu\'un qu\'il/elle apprécie (un·e ami·e, un·e prof, un·e voisin·e)', txtEn:'They go out of their way for someone they like (a friend, a teacher, a neighbor)', dim:'behavior' },
  { id:'s2c_1317', t:2, e:'🚫', txt:'Si on refuse son aide, il/elle le prend mal, comme si on le/la rejetait', txtEn:'If someone turns down their help, they take it badly, as if they were being rejected', dim:'shadow' },
  { id:'s2d_1317', t:2, e:'😞', txt:'Quand ce qu\'il/elle fait pour les autres passe inaperçu, il/elle le fait sentir (soupirs, allusions)', txtEn:'When what they do for others goes unnoticed, they let it show (sighs, hints)', dim:'shadow' },
  { id:'s2e_1317', t:2, e:'🔗', txt:'Il/elle retient les anniversaires, les goûts et les soucis de chacun, et y pense au bon moment', txtEn:'They remember everyone\'s birthdays, tastes and worries, and think of them at the right moment', dim:'compul' },
  { id:'s2f_1317', t:2, e:'🧭', txt:'Il/elle devine ce dont un proche a besoin (un verre d\'eau, un coup de main) et le propose sans attendre', txtEn:'They sense what someone close needs (a glass of water, a hand) and offer it without waiting to be asked', dim:'belief' },
  // T3
  { id:'s3a_1317', t:3, e:'🎯', txt:'Il/elle raconte volontiers ses réussites (notes, matchs, prix) et veille à ce qu\'on les remarque', txtEn:'They readily talk about their successes (grades, matches, awards) and make sure people notice them', dim:'compul' },
  { id:'s3b_1317', t:3, e:'📉', txt:'Face à un échec, il/elle s\'inquiète surtout de ce que les autres vont en penser', txtEn:'When they fail, what worries them most is what others will think', dim:'fear' },
  { id:'s3c_1317', t:3, e:'🎭', txt:'Il/elle change de style ou de façon de parler selon les personnes qu\'il/elle veut impressionner', txtEn:'They change their style or way of talking depending on who they want to impress', dim:'behavior' },
  { id:'s3d_1317', t:3, e:'⏭️', txt:'Quand ça va mal, il/elle se jette dans le travail ou le sport plutôt que d\'en parler', txtEn:'When things go wrong, they throw themselves into work or sport rather than talk about it', dim:'shadow' },
  { id:'s3e_1317', t:3, e:'🏅', txt:'Il/elle déteste perdre son temps : ses activités doivent mener à quelque chose', txtEn:'They hate wasting time: their activities have to get them somewhere', dim:'belief' },
  { id:'s3f_1317', t:3, e:'⚙️', txt:'Il/elle se pousse à faire mieux que les autres, pour être parmi les meilleur·e·s', txtEn:'They push themselves to do better than others, to be among the best', dim:'stress' },
  // T4
  { id:'s4a_1317', t:4, e:'🫥', txt:'Il/elle préfère se démarquer, quitte à être à part, plutôt que de faire comme tout le monde', txtEn:'They would rather stand out, even if it sets them apart, than do what everyone else does', dim:'identity' },
  { id:'s4b_1317', t:4, e:'🌫️', txt:'Il/elle traverse des phases de mélancolie, comme si quelque chose d\'essentiel lui manquait au fond', txtEn:'They go through phases of melancholy, as if something essential were missing deep inside', dim:'fear' },
  { id:'s4c_1317', t:4, e:'🎨', txt:'Quand il/elle est triste, il/elle veut être compris·e plutôt que rassuré·e', txtEn:'When they are sad, they want to be understood rather than reassured', dim:'emotion' },
  { id:'s4d_1317', t:4, e:'🌙', txt:'Il/elle cultive un style personnel marqué (musique, vêtements, esthétique)', txtEn:'They cultivate a marked personal style (music, clothes, aesthetic)', dim:'aesthetic' },
  { id:'s4e_1317', t:4, e:'🌑', txt:'Il/elle préfère les films, chansons ou livres tristes et intenses aux divertissements légers', txtEn:'They prefer sad, intense films, songs or books to light entertainment', dim:'shadow' },
  { id:'s4f_1317', t:4, e:'🎭', txt:'Il/elle met ce qu\'il/elle ressent dans un journal, des dessins, de la musique ou des textes', txtEn:'They pour what they feel into a journal, drawings, music or writing', dim:'compul' },
  // T5
  { id:'s5a_1317', t:5, e:'🔋', txt:'Il/elle a besoin de beaucoup plus de solitude que ses pairs', txtEn:'They need much more solitude than their peers', dim:'behavior' },
  { id:'s5b_1317', t:5, e:'🔬', txt:'Face à une décision, il/elle s\'informe seul·e et se forge son avis sans demander celui des autres', txtEn:'Facing a decision, they look into it on their own and make up their mind without asking others', dim:'behavior' },
  { id:'s5c_1317', t:5, e:'🏰', txt:'Il/elle parle peu d\'un sujet tant qu\'il/elle ne le maîtrise pas bien', txtEn:'They say little about a topic until they know it well', dim:'fear' },
  { id:'s5d_1317', t:5, e:'🧠', txt:'Il/elle reste dans sa tête, semble parfois distant·e émotionnellement', txtEn:'They stay in their head, sometimes seem emotionally distant', dim:'shadow' },
  { id:'s5e_1317', t:5, e:'📚', txt:'Il/elle approfondit ses centres d\'intérêt à un niveau quasi expert', txtEn:'They dig into their interests to an almost expert level', dim:'behavior' },
  { id:'s5f_1317', t:5, e:'📡', txt:'Il/elle défend fermement son temps seul·e, même face aux projets de la famille', txtEn:'They firmly protect their time alone, even against family plans', dim:'stress' },
  // T6
  { id:'s6a_1317', t:6, e:'⚠️', txt:'Avant une sortie ou un voyage, il/elle pense à tout ce qui pourrait mal tourner', txtEn:'Before an outing or a trip, they think of everything that could go wrong', dim:'voice' },
  { id:'s6b_1317', t:6, e:'📋', txt:'Il/elle prévoit un plan B au cas où (batterie de secours, un peu d\'argent, un numéro à appeler)', txtEn:'They plan a backup just in case (a spare battery, some money, a number to call)', dim:'behavior' },
  { id:'s6c_1317', t:6, e:'❓', txt:'Il/elle a du mal à trancher seul·e et demande souvent : « Tu ferais quoi, toi ? »', txtEn:'They find it hard to decide alone and often ask: "What would you do?"', dim:'shadow' },
  { id:'s6d_1317', t:6, e:'🛡️', txt:'Quand quelque chose lui fait peur, il/elle fonce dedans pour se prouver qu\'il/elle n\'a pas peur', txtEn:'When something scares them, they charge right into it to prove to themselves they are not afraid', dim:'fear' },
  { id:'s6e_1317', t:6, e:'🔎', txt:'Il/elle conteste les règles des adultes, tout en ayant besoin qu\'ils posent un cadre clair', txtEn:'They challenge adults\' rules, while still needing them to set clear limits', dim:'motive' },
  { id:'s6f_1317', t:6, e:'🤝', txt:'Son groupe d\'ami·e·s est son point d\'appui : il/elle lui reste fidèle quoi qu\'il arrive', txtEn:'Their group of friends is their anchor: they stay loyal to it through thick and thin', dim:'motive' },
  // T7
  { id:'s7a_1317', t:7, e:'✨', txt:'Il/elle se lance dans une nouvelle passion avec enthousiasme, puis passe vite à une autre', txtEn:'They throw themselves into a new passion with enthusiasm, then quickly move on to another', dim:'behavior' },
  { id:'s7b_1317', t:7, e:'😊', txt:'Quand une discussion devient lourde, il/elle la détourne avec une blague ou une idée de sortie', txtEn:'When a conversation gets heavy, they steer away from it with a joke or an idea for an outing', dim:'compul' },
  { id:'s7c_1317', t:7, e:'🎪', txt:'Il/elle s\'ennuie vite quand il ne se passe rien et cherche aussitôt quelque chose d\'amusant à faire', txtEn:'They get bored quickly when nothing is happening and immediately look for something fun to do', dim:'behavior' },
  { id:'s7d_1317', t:7, e:'☀️', txt:'Il/elle raconte ses galères comme des aventures drôles', txtEn:'They talk about their mishaps as if they were funny adventures', dim:'belief' },
  { id:'s7e_1317', t:7, e:'🔗', txt:'Il/elle pense souvent déjà à la suite : prochaine sortie, prochaine fête, prochain voyage', txtEn:'They are often already thinking about what comes next: the next outing, the next party, the next trip', dim:'compul' },
  { id:'s7f_1317', t:7, e:'🥂', txt:'Il/elle évite de s\'engager trop tôt dans un plan, au cas où une meilleure option se présenterait', txtEn:'They avoid committing to a plan too early, in case a better option comes along', dim:'belief' },
  // T8
  { id:'s8a_1317', t:8, e:'⚡', txt:'Quand un groupe hésite, il/elle tranche et prend la direction, quitte à imposer sa volonté', txtEn:'When a group hesitates, they decide and take charge, even if it means imposing their will', dim:'behavior' },
  { id:'s8b_1317', t:8, e:'💬', txt:'Il/elle dit franchement ce qu\'il/elle pense, même quand ça froisse', txtEn:'They say frankly what they think, even when it ruffles feathers', dim:'behavior' },
  { id:'s8c_1317', t:8, e:'👑', txt:'Sa colère éclate fort et d\'un coup, puis retombe vite', txtEn:'Their anger bursts out loudly and suddenly, then passes quickly', dim:'emotion' },
  { id:'s8d_1317', t:8, e:'🦁', txt:'Si quelqu\'un s\'en prend à un proche ou à quelqu\'un de plus faible, il/elle intervient aussitôt', txtEn:'If someone picks on a person close to them or someone weaker, they step in right away', dim:'motive' },
  { id:'s8e_1317', t:8, e:'⛓️', txt:'Il/elle montre rarement sa peine ou sa peur : il/elle préfère paraître fort·e', txtEn:'They rarely show sadness or fear: they prefer to look strong', dim:'shadow' },
  { id:'s8f_1317', t:8, e:'👑', txt:'Il/elle prend de la place et s\'impose, sans chercher à plaire', txtEn:'They take up space and assert themselves, without trying to please', dim:'integ' },
  // T9
  { id:'s9a_1317', t:9, e:'🕊️', txt:'Quand on lui demande ce qu\'il/elle préfère, il/elle répond souvent « comme vous voulez »', txtEn:'When asked what they would prefer, they often answer "whatever you want"', dim:'compul' },
  { id:'s9b_1317', t:9, e:'💤', txt:'Il/elle dit oui pour éviter la discussion, puis ne le fait pas', txtEn:'They say yes to avoid an argument, then don\'t do it', dim:'shadow' },
  { id:'s9c_1317', t:9, e:'🌊', txt:'Il/elle suit facilement les projets des autres, même quand ça ne l\'intéresse pas vraiment', txtEn:'They easily go along with other people\'s plans, even when they are not really interested', dim:'behavior' },
  { id:'s9d_1317', t:9, e:'☮️', txt:'Quand ça se tend à la maison, il/elle minimise : « c\'est pas si grave »', txtEn:'When things get tense at home, they play it down: "it\'s not that bad"', dim:'compul' },
  { id:'s9e_1317', t:9, e:'🤷', txt:'Quand deux proches se disputent, il/elle voit les raisons de chacun et ne prend pas parti', txtEn:'When two people close to them argue, they see each side\'s reasons and don\'t take sides', dim:'attunement' },
  { id:'s9f_1317', t:9, e:'☁️', txt:'Il/elle parle d\'un projet personnel pendant des mois sans vraiment s\'y mettre', txtEn:'They talk about a personal project for months without really getting started', dim:'shadow' },
];

// ────────────────────────────────────────────────────────────────
//  POOL ADULTE — OBSERVÉ (3e personne — un proche décrit un adulte)
//  Sert à : « typer un proche » (mode observation) + le « second avis ».
//  Ancré sur la motivation cachée (« non pas X, mais Y »), pas le
//  comportement de surface — généré puis vérifié pour la discriminance.
// ────────────────────────────────────────────────────────────────

const STATEMENTS_ADULTE_OBS: Statement[] = [
  // T1
  { id:'s1a_adobs', t:1, e:'📏', txt:'Même quand personne ne regarde, il/elle fait les choses correctement : bâcler serait une faute à ses yeux', txtEn:'Even when no one is watching, they do things properly: in their eyes, cutting corners would be wrong', dim:'behavior' },
  { id:'s1b_adobs', t:1, e:'😤', txt:'Son agacement se lit sur son visage et dans son ton, même quand il/elle assure ne pas être fâché·e', txtEn:'Their irritation shows on their face and in their tone, even while they insist they\'re not angry', dim:'body' },
  { id:'s1c_adobs', t:1, e:'⚖️', txt:'Il/elle repère tout de suite le détail qui cloche et ressent le besoin de le corriger, même chez les autres', txtEn:'They spot the detail that\'s off right away and feel the need to correct it, even when it\'s someone else\'s', dim:'behavior' },
  { id:'s1d_adobs', t:1, e:'🔒', txt:'Il/elle préfère finir en retard plutôt que de rendre un travail imparfait', txtEn:'They\'d rather finish late than hand in imperfect work', dim:'compul' },
  { id:'s1e_adobs', t:1, e:'🌍', txt:'Pour lui/elle, il y a une bonne et une mauvaise façon de faire, et la négligence des autres l\'irrite', txtEn:'To them, there\'s a right and a wrong way to do things, and other people\'s carelessness irritates them', dim:'belief' },
  { id:'s1f_adobs', t:1, e:'😣', txt:'Il/elle a du mal à s\'accorder un plaisir tant que tout n\'est pas en ordre, comme s\'il fallait d\'abord le mériter', txtEn:'They find it hard to allow themselves a treat until everything is in order, as if it had to be earned first', dim:'shadow' },
  // T2
  { id:'s2a_adobs', t:2, e:'💞', txt:'Si un proche se confie à quelqu\'un d\'autre qu\'à lui/elle, il/elle se sent mis·e à l\'écart', txtEn:'If someone close to them confides in another person rather than in them, they feel left out', dim:'attunement' },
  { id:'s2b_adobs', t:2, e:'🤲', txt:'Quand il/elle propose son aide et qu\'on la refuse, il/elle le vit comme un rejet', txtEn:'When they offer help and it\'s turned down, they take it as a rejection', dim:'behavior' },
  { id:'s2c_adobs', t:2, e:'😞', txt:'Quand ce qu\'il/elle donne passe inaperçu, il/elle en est blessé·e, même en disant que ce n\'était pas pour ça', txtEn:'When what they give goes unnoticed, they\'re hurt by it, even while saying that wasn\'t the point', dim:'shadow' },
  { id:'s2d_adobs', t:2, e:'🔗', txt:'Il/elle aime se sentir indispensable à ses proches : être irremplaçable le/la rassure', txtEn:'They like feeling indispensable to the people close to them: being irreplaceable reassures them', dim:'compul' },
  { id:'s2e_adobs', t:2, e:'🚫', txt:'Après avoir dit non à un proche, il/elle culpabilise et se rattrape vite, de peur d\'être moins aimé·e', txtEn:'After saying no to someone close, they feel guilty and quickly make up for it, for fear of being loved less', dim:'shadow' },
  { id:'s2f_adobs', t:2, e:'🧭', txt:'Il/elle exprime rarement ses propres besoins, mais espère que ses proches les devineront', txtEn:'They rarely voice their own needs, but hope the people close to them will guess them', dim:'belief' },
  // T3
  { id:'s3a_adobs', t:3, e:'🦎', txt:'Selon les gens qu\'il/elle rencontre, il/elle adapte son style pour faire la meilleure impression', txtEn:'Depending on who they\'re meeting, they adjust their style to make the best impression', dim:'compul' },
  { id:'s3b_adobs', t:3, e:'📸', txt:'Il/elle sait mettre ses réussites en valeur et se présenter sous son meilleur jour', txtEn:'They know how to showcase their achievements and present themselves in the best light', dim:'behavior' },
  { id:'s3c_adobs', t:3, e:'🚪', txt:'Il/elle parle peu de ses échecs, même à ses proches, comme si rater remettait en cause sa valeur', txtEn:'They say little about their failures, even to those close to them, as if failing called their worth into question', dim:'fear' },
  { id:'s3d_adobs', t:3, e:'⏸️', txt:'Quand une émotion difficile surgit, il/elle la met de côté pour rester concentré·e sur ses objectifs', txtEn:'When a difficult emotion comes up, they set it aside to stay focused on their goals', dim:'shadow' },
  { id:'s3e_adobs', t:3, e:'🏅', txt:'Une réussite que personne ne remarque compte à peine pour lui/elle', txtEn:'A success that nobody notices barely counts for them', dim:'motive' },
  { id:'s3f_adobs', t:3, e:'🎬', txt:'Même épuisé·e, il/elle continue de donner l\'image de quelqu\'un qui assure', txtEn:'Even when exhausted, they keep up the image of someone who\'s on top of everything', dim:'stress' },
  // T4
  { id:'s4a_adobs', t:4, e:'🫥', txt:'Il/elle cultive ce qui le/la distingue : ses goûts, son style, ses choix doivent lui ressembler', txtEn:'They cultivate what sets them apart: their tastes, their style and their choices have to feel true to who they are', dim:'identity' },
  { id:'s4b_adobs', t:4, e:'🌫️', txt:'Le bonheur simple des autres lui rappelle souvent ce qui lui manque', txtEn:'Other people\'s simple happiness often reminds them of what they\'re missing', dim:'fear' },
  { id:'s4c_adobs', t:4, e:'🎨', txt:'Plutôt que de calmer une émotion forte, il/elle s\'y plonge, comme si ressentir intensément prouvait qu\'il/elle est vivant·e', txtEn:'Rather than calming a strong feeling, they dive into it, as if feeling intensely proved they\'re alive', dim:'emotion' },
  { id:'s4d_adobs', t:4, e:'🌙', txt:'Une musique, un film ou un lieu mélancolique le/la touche davantage que la gaieté facile : il/elle s\'y reconnaît', txtEn:'A melancholy song, film or place moves them more than easy cheerfulness: they recognize themselves in it', dim:'aesthetic' },
  { id:'s4e_adobs', t:4, e:'🌑', txt:'Ce qui est perdu ou hors d\'atteinte lui semble souvent plus beau que ce qu\'il/elle a', txtEn:'What is lost or out of reach often seems more beautiful to them than what they have', dim:'shadow' },
  { id:'s4f_adobs', t:4, e:'🎭', txt:'Quand on le/la console trop vite, il/elle se sent incompris·e : il/elle a besoin qu\'on reconnaisse la profondeur de sa peine', txtEn:'When someone comforts them too quickly, they feel misunderstood: they need the depth of their pain to be acknowledged', dim:'stress' },
  // T5
  { id:'s5a_adobs', t:5, e:'🔋', txt:'Même après une soirée agréable, il/elle a besoin de s\'isoler pour récupérer, comme si sa réserve d\'énergie était vide', txtEn:'Even after a pleasant evening out, they need time alone to recover, as if their energy reserve had run dry', dim:'stress' },
  { id:'s5b_adobs', t:5, e:'🏰', txt:'Il/elle protège son temps comme un budget serré : une visite imprévue le/la met sur la défensive', txtEn:'They guard their time like a tight budget: an unexpected visit puts them on the defensive', dim:'compul' },
  { id:'s5c_adobs', t:5, e:'🔬', txt:'Il/elle veut tout comprendre avant de se lancer, car se sentir incompétent·e lui est insupportable', txtEn:'They want to understand everything before getting started, because feeling incompetent is unbearable to them', dim:'motive' },
  { id:'s5d_adobs', t:5, e:'🧠', txt:'Face à une émotion, il/elle l\'analyse plutôt que de la vivre, comme s\'il/elle l\'observait de l\'extérieur', txtEn:'Faced with a feeling, they analyze it rather than live it, as if watching it from the outside', dim:'shadow' },
  { id:'s5e_adobs', t:5, e:'📚', txt:'Il/elle peut disparaître des heures dans un sujet pointu : accumuler du savoir le/la rassure plus que la compagnie des gens', txtEn:'They can vanish for hours into a narrow subject: building up knowledge reassures them more than people\'s company', dim:'behavior' },
  { id:'s5f_adobs', t:5, e:'🧊', txt:'Il/elle parle peu de lui/elle : se dévoiler lui coûte une énergie qu\'il/elle préfère garder', txtEn:'They say little about themselves: opening up costs them energy they\'d rather keep', dim:'compul' },
  // T6
  { id:'s6a_adobs', t:6, e:'⚠️', txt:'Même quand tout va bien, son esprit cherche déjà ce qui pourrait mal tourner', txtEn:'Even when everything is going well, their mind is already looking for what could go wrong', dim:'voice' },
  { id:'s6b_adobs', t:6, e:'📞', txt:'Avant une décision qui l\'inquiète, il/elle consulte plusieurs proches : son propre avis ne lui suffit pas', txtEn:'Before a decision that worries them, they consult several people close to them: their own judgment isn\'t enough', dim:'shadow' },
  { id:'s6c_adobs', t:6, e:'🛡️', txt:'Ce qui l\'apaise le plus, c\'est de savoir sur qui il/elle pourra compter si les choses tournent mal', txtEn:'What settles them most is knowing who they can count on if things go wrong', dim:'motive' },
  { id:'s6d_adobs', t:6, e:'🔎', txt:'Il/elle a besoin de pouvoir se fier à ceux qui décident, mais les met longtemps à l\'épreuve avant de leur faire confiance', txtEn:'They need to be able to rely on those in charge, but put them to the test for a long time before trusting them', dim:'belief' },
  { id:'s6e_adobs', t:6, e:'🤝', txt:'Un changement de dernière minute l\'inquiète vite : il/elle se demande ce qui se cache derrière', txtEn:'A last-minute change quickly worries them: they wonder what\'s behind it', dim:'fear' },
  { id:'s6f_adobs', t:6, e:'😰', txt:'Avant un voyage ou un projet, il/elle imagine les pires scénarios et prépare un plan B, au cas où', txtEn:'Before a trip or a project, they picture the worst-case scenarios and prepare a plan B, just in case', dim:'stress' },
  // T7
  { id:'s7a_adobs', t:7, e:'✨', txt:'Il/elle garde plusieurs options ouvertes, car choisir une seule chose reviendrait à renoncer aux autres', txtEn:'They keep several options open, because choosing just one thing would mean giving up the others', dim:'behavior' },
  { id:'s7b_adobs', t:7, e:'🙈', txt:'Face à la peine d\'un proche, il/elle a du mal à rester dans la tristesse et cherche vite le bon côté ou une blague', txtEn:'Faced with a loved one\'s pain, they find it hard to stay with the sadness and quickly look for the bright side or a joke', dim:'attunement' },
  { id:'s7c_adobs', t:7, e:'🎠', txt:'Il/elle déborde d\'idées et de projets, bien plus qu\'il/elle ne peut en réaliser', txtEn:'They overflow with ideas and plans, far more than they can actually carry out', dim:'behavior' },
  { id:'s7d_adobs', t:7, e:'🎈', txt:'Il/elle se lance dans un projet avec enthousiasme, puis décroche quand la routine s\'installe', txtEn:'They throw themselves into a project with enthusiasm, then lose interest once routine sets in', dim:'compul' },
  { id:'s7e_adobs', t:7, e:'🥀', txt:'Quand une contrainte ou une période pénible dure, il/elle s\'agite et cherche vite une échappatoire plus agréable', txtEn:'When a constraint or a hard stretch drags on, they get restless and quickly look for a more pleasant way out', dim:'stress' },
  { id:'s7f_adobs', t:7, e:'🌈', txt:'Au milieu d\'une bonne sortie, il/elle parle déjà de la prochaine', txtEn:'In the middle of a good outing, they\'re already talking about the next one', dim:'compul' },
  // T8
  { id:'s8a_adobs', t:8, e:'🪨', txt:'Quand on veut prendre soin de lui/elle, il/elle se braque : être pris·e en charge, c\'est perdre le contrôle', txtEn:'When someone tries to look after them, they bristle: being taken care of means losing control', dim:'shadow' },
  { id:'s8b_adobs', t:8, e:'⚔️', txt:'Il/elle aborde les conflits de front, sans crainte, et s\'en sert pour tester la solidité de l\'autre', txtEn:'They face conflict head-on, without fear, and use it to test how solid the other person is', dim:'behavior' },
  { id:'s8c_adobs', t:8, e:'🚧', txt:'Qu\'on décide à sa place le/la fait bondir, même quand il/elle aurait été d\'accord sur le fond', txtEn:'Having others decide for them sets them off, even when they would have agreed anyway', dim:'fear' },
  { id:'s8d_adobs', t:8, e:'🦁', txt:'Être respecté·e compte plus pour lui/elle qu\'être apprécié·e', txtEn:'Being respected matters more to them than being liked', dim:'motive' },
  { id:'s8e_adobs', t:8, e:'🥊', txt:'Blessé·e, il/elle réagit par la colère plutôt que par la tristesse : montrer sa fragilité lui semble dangereux', txtEn:'When hurt, they react with anger rather than sadness: showing fragility feels dangerous to them', dim:'compul' },
  { id:'s8f_adobs', t:8, e:'📡', txt:'Il/elle sent d\'instinct qui a le vrai pouvoir dans un groupe, et les titres l\'impressionnent peu', txtEn:'They instinctively sense who holds the real power in a group, and titles don\'t impress them much', dim:'attunement' },
  // T9
  { id:'s9a_adobs', t:9, e:'🕊️', txt:'Il/elle adopte facilement l\'avis des gens avec qui il/elle se trouve, comme si avoir sa propre position importait peu', txtEn:'They easily take on the views of whoever they\'re with, as if having a position of their own mattered little', dim:'compul' },
  { id:'s9b_adobs', t:9, e:'🤐', txt:'Quand quelque chose le/la contrarie, il/elle minimise : « ce n\'est pas si grave »', txtEn:'When something upsets them, they play it down: "it\'s not that bad"', dim:'behavior' },
  { id:'s9c_adobs', t:9, e:'💤', txt:'Il/elle s\'occupe de petites tâches faciles et repousse ce qui compte vraiment pour lui/elle', txtEn:'They keep busy with small, easy tasks and put off what really matters to them', dim:'shadow' },
  { id:'s9d_adobs', t:9, e:'😶', txt:'Quand on lui demande ce qui lui ferait vraiment plaisir, il/elle reste sincèrement sans réponse, comme si l\'envie dormait', txtEn:'When asked what would really please them, they sincerely draw a blank, as if the wanting itself were asleep', dim:'fear' },
  { id:'s9e_adobs', t:9, e:'☁️', txt:'Quand on le/la pousse, il/elle dit oui pour avoir la paix, puis traîne ou laisse filer', txtEn:'When pushed, they say yes to keep the peace, then drag their feet or let it slide', dim:'stress' },
  { id:'s9f_adobs', t:9, e:'🌱', txt:'Dans un désaccord entre proches, il/elle comprend chaque camp et a du mal à prendre parti', txtEn:'In a disagreement between people close to them, they see each side\'s point and find it hard to pick one', dim:'behavior' },
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
  { id:'w1_9_ad', wingOf:1, wingType:9, e:'🌙', txt:'Quand je vois ce qui pourrait être mieux fait, je m\'en occupe moi-même, calmement et sans bruit', txtEn:'When I see what could be done better, I take care of it myself, calmly and quietly' },
  { id:'w1_2_ad', wingOf:1, wingType:2, e:'🤲', txt:'Quand je vois ce qui pourrait être mieux fait, j\'aide volontiers les autres à progresser', txtEn:'When I see what could be done better, I\'m happy to help others improve' },
  { id:'w2_1_ad', wingOf:2, wingType:1, e:'⚖️', txt:'J\'aide plutôt en coulisses, avec soin et le souci de bien faire', txtEn:'I tend to help behind the scenes, carefully, making sure it\'s done right' },
  { id:'w2_3_ad', wingOf:2, wingType:3, e:'✨', txt:'J\'aide plutôt sur le devant de la scène, avec entrain et bonne humeur', txtEn:'I tend to help front and center, with energy and good cheer' },
  { id:'w3_2_ad', wingOf:3, wingType:2, e:'❤️', txt:'Pour réussir, je mise sur les relations : je sais me rendre sympathique et utile', txtEn:'To succeed, I rely on relationships: I know how to be likable and helpful' },
  { id:'w3_4_ad', wingOf:3, wingType:4, e:'🎭', txt:'Pour réussir, je mise sur ce qui me distingue : je veux que mon travail me ressemble', txtEn:'To succeed, I rely on what sets me apart: I want my work to reflect who I am' },
  { id:'w4_3_ad', wingOf:4, wingType:3, e:'🏆', txt:'J\'aime que ma créativité se voie et soit reconnue par les autres', txtEn:'I like my creativity to be seen and recognized by others' },
  { id:'w4_5_ad', wingOf:4, wingType:5, e:'🏰', txt:'Je vis ma créativité surtout en privé, loin du regard des autres', txtEn:'I mostly live out my creativity in private, away from others\' eyes' },
  { id:'w5_4_ad', wingOf:5, wingType:4, e:'🌌', txt:'Mes centres d\'intérêt penchent vers l\'imaginaire, l\'art et les idées originales', txtEn:'My interests lean toward imagination, art and original ideas' },
  { id:'w5_6_ad', wingOf:5, wingType:6, e:'🔎', txt:'Mes centres d\'intérêt penchent vers le concret : systèmes, méthodes, solutions fiables', txtEn:'My interests lean toward the practical: systems, methods, reliable solutions' },
  { id:'w6_5_ad', wingOf:6, wingType:5, e:'📚', txt:'Quand je m\'inquiète, je me replie pour analyser la situation en détail', txtEn:'When I worry, I withdraw to analyze the situation in detail' },
  { id:'w6_7_ad', wingOf:6, wingType:7, e:'🎉', txt:'Quand je m\'inquiète, je me change les idées en voyant du monde ou en bougeant', txtEn:'When I worry, I take my mind off it by seeing people or staying on the move' },
  { id:'w7_6_ad', wingOf:7, wingType:6, e:'🤝', txt:'Pour vivre mes envies, j\'aime m\'entourer de gens de confiance', txtEn:'To follow what excites me, I like to surround myself with people I trust' },
  { id:'w7_8_ad', wingOf:7, wingType:8, e:'⚡', txt:'Pour vivre mes envies, je fonce et je bouscule ce qui me freine', txtEn:'To follow what excites me, I charge ahead and push past whatever holds me back' },
  { id:'w8_7_ad', wingOf:8, wingType:7, e:'🎢', txt:'Mon énergie est expansive : je fonce, je bouge, j\'aime l\'aventure', txtEn:'My energy is expansive: I charge ahead, keep moving and love adventure' },
  { id:'w8_9_ad', wingOf:8, wingType:9, e:'🌾', txt:'Mon énergie est posée : je reste calme et solide, difficile à ébranler', txtEn:'My energy is steady: I stay calm and solid, hard to shake' },
  { id:'w9_8_ad', wingOf:9, wingType:8, e:'🦁', txt:'Je suis plutôt conciliant·e, mais poussé·e à bout, je sais taper du poing sur la table', txtEn:'I\'m fairly easygoing, but when pushed too far, I can put my foot down' },
  { id:'w9_1_ad', wingOf:9, wingType:1, e:'📏', txt:'Je suis plutôt conciliant·e, et j\'aime que tout soit en ordre et bien fait autour de moi', txtEn:'I\'m fairly easygoing, and I like everything around me to be orderly and done right' },
];

// 5-8 : phrases courtes, comportements très concrets
const WING_5_8: WingStatement[] = [
  { id:'w1_9_58', wingOf:1, wingType:9, e:'🌙', txt:'Son sérieux est calme et discret : il/elle s\'applique dans son coin', txtEn:'Their seriousness is calm and quiet: they apply themselves in their own corner' },
  { id:'w1_2_58', wingOf:1, wingType:2, e:'🤲', txt:'Il/elle aime aider les autres à bien faire, avec gentillesse', txtEn:'They like helping others do things right, kindly' },
  { id:'w2_1_58', wingOf:2, wingType:1, e:'⚖️', txt:'Quand il/elle aide, il/elle tient à ce que ce soit bien fait', txtEn:'When they help, they insist that it be done properly' },
  { id:'w2_3_58', wingOf:2, wingType:3, e:'✨', txt:'Il/elle aide avec entrain et aime être remarqué·e pour ça', txtEn:'They help eagerly and like to be noticed for it' },
  { id:'w3_2_58', wingOf:3, wingType:2, e:'❤️', txt:'Pour briller, il/elle mise sur son charme et sa gentillesse', txtEn:'To shine, they count on their charm and kindness' },
  { id:'w3_4_58', wingOf:3, wingType:4, e:'🎭', txt:'Pour briller, il/elle mise sur ses idées originales et ses créations', txtEn:'To shine, they count on their original ideas and creations' },
  { id:'w4_3_58', wingOf:4, wingType:3, e:'🏆', txt:'Il/elle montre volontiers ses créations et aime qu\'on les trouve originales', txtEn:'They readily show their creations and love it when people find them original' },
  { id:'w4_5_58', wingOf:4, wingType:5, e:'🏰', txt:'Il/elle crée et rêve surtout seul·e, et montre peu ce qu\'il/elle fait', txtEn:'They create and daydream mostly alone, and show little of what they make' },
  { id:'w5_4_58', wingOf:5, wingType:4, e:'🌌', txt:'Il/elle explore seul·e ses sujets favoris, avec une imagination très personnelle, poétique', txtEn:'They explore their favorite topics alone, with a very personal, poetic imagination' },
  { id:'w5_6_58', wingOf:5, wingType:6, e:'🔎', txt:'Il/elle préfère les documentaires (animaux, machines) aux histoires inventées', txtEn:'They prefer documentaries (animals, machines) to made-up stories' },
  { id:'w6_5_58', wingOf:6, wingType:5, e:'📚', txt:'Ses inquiétudes passent par beaucoup de questions et d\'observations', txtEn:'Their worries run through many questions and observations' },
  { id:'w6_7_58', wingOf:6, wingType:7, e:'🎉', txt:'Ses anxiétés se calment dans le jeu, l\'activité avec les autres', txtEn:'Their anxieties calm down in play, in activity with others' },
  { id:'w7_6_58', wingOf:7, wingType:6, e:'🤝', txt:'Il/elle aime la nouveauté, mais préfère la vivre entouré·e de ses proches', txtEn:'They love new things, but prefer to experience them with their close ones around' },
  { id:'w7_8_58', wingOf:7, wingType:8, e:'⚡', txt:'Il/elle lance plein de nouveaux jeux avec une énergie débordante et entraîne les autres dedans', txtEn:'They launch lots of new games with bursting energy and pull the others in' },
  { id:'w8_7_58', wingOf:8, wingType:7, e:'🎢', txt:'Sa force est joyeuse : il/elle mène le jeu et entraîne tout le monde dans l\'aventure', txtEn:'Their strength is playful: they lead the game and pull everyone into the adventure' },
  { id:'w8_9_58', wingOf:8, wingType:9, e:'🌾', txt:'Sa force est calme : il/elle s\'impose sans crier, par sa seule présence', txtEn:'Their strength is calm: they assert themselves without shouting, by their presence alone' },
  { id:'w9_8_58', wingOf:9, wingType:8, e:'🦁', txt:'Il/elle est paisible, mais sait tenir bon quand on le/la pousse trop', txtEn:'They\'re peaceful, but can stand their ground when pushed too far' },
  { id:'w9_1_58', wingOf:9, wingType:1, e:'📏', txt:'Il/elle est paisible et aime que chaque chose soit à sa place', txtEn:'They\'re peaceful and like everything to be in its place' },
];

// 9-12 : vocabulaire un peu plus nuancé, contexte scolaire/groupe
const WING_9_12: WingStatement[] = [
  { id:'w1_9_912', wingOf:1, wingType:9, e:'🌙', txt:'Il/elle remarque ce qui ne va pas, mais le garde souvent pour lui/elle', txtEn:'They notice what\'s wrong but often keep it to themselves' },
  { id:'w1_2_912', wingOf:1, wingType:2, e:'🤲', txt:'Il/elle aide volontiers les autres à bien faire, quitte à leur faire la leçon', txtEn:'They readily help others do things right, even if it means lecturing them' },
  { id:'w2_1_912', wingOf:2, wingType:1, e:'⚖️', txt:'Il/elle aide avec sérieux et tient à ce que les choses soient bien faites', txtEn:'They help conscientiously and care about things being done properly' },
  { id:'w2_3_912', wingOf:2, wingType:3, e:'✨', txt:'Il/elle aime être entouré·e et populaire, et rassemble volontiers les autres autour de lui/elle', txtEn:'They love being popular and surrounded by people, and readily gather others around them' },
  { id:'w3_2_912', wingOf:3, wingType:2, e:'❤️', txt:'Il/elle réussit en se faisant apprécier : serviable, souriant·e, entouré·e d\'amis', txtEn:'They succeed by being well liked: helpful, smiling, surrounded by friends' },
  { id:'w3_4_912', wingOf:3, wingType:4, e:'🎭', txt:'Derrière ses réussites, il/elle a un côté plus secret, parfois mélancolique', txtEn:'Behind their successes, they have a more private, sometimes melancholy side' },
  { id:'w4_3_912', wingOf:4, wingType:3, e:'🏆', txt:'Il/elle aime montrer ses créations (dessin, musique, théâtre) et être reconnu·e pour son originalité', txtEn:'They like showing their creations (drawing, music, theater) and being recognized for their originality' },
  { id:'w4_5_912', wingOf:4, wingType:5, e:'🏰', txt:'Il/elle crée plutôt seul·e dans sa chambre et partage peu son univers intérieur', txtEn:'They mostly create alone in their room and share little of their inner world' },
  { id:'w5_4_912', wingOf:5, wingType:4, e:'🌌', txt:'Il/elle se passionne pour des sujets originaux et y mêle beaucoup d\'imagination', txtEn:'They get passionate about unusual subjects and bring a lot of imagination to them' },
  { id:'w5_6_912', wingOf:5, wingType:6, e:'🔎', txt:'Il/elle se prépare avec méthode et aime prévoir ce qui pourrait poser problème', txtEn:'They prepare methodically and like to foresee what could go wrong' },
  { id:'w6_5_912', wingOf:6, wingType:5, e:'📚', txt:'Quand il/elle s\'inquiète, il/elle se renseigne et cherche à tout comprendre pour se rassurer', txtEn:'When worried, they look things up and try to understand everything to feel reassured' },
  { id:'w6_7_912', wingOf:6, wingType:7, e:'🎉', txt:'Quand il/elle s\'inquiète, il/elle bouge, s\'occupe ou voit des amis pour se changer les idées', txtEn:'When worried, they get moving, keep busy or see friends to take their mind off it' },
  { id:'w7_6_912', wingOf:7, wingType:6, e:'🤝', txt:'Il/elle est très attaché·e à sa bande et supporte mal d\'en être mis·e à l\'écart', txtEn:'They\'re very attached to their group of friends and take it hard when left out' },
  { id:'w7_8_912', wingOf:7, wingType:8, e:'⚡', txt:'Il/elle monte des projets, convainc les autres et obtient souvent ce qu\'il/elle veut', txtEn:'They set up projects, win others over and often get what they want' },
  { id:'w8_7_912', wingOf:8, wingType:7, e:'🎢', txt:'Il/elle entraîne sa bande dans des aventures et défie les règles avec panache', txtEn:'They lead their group into adventures and defy the rules with flair' },
  { id:'w8_9_912', wingOf:8, wingType:9, e:'🌾', txt:'Il/elle a une force tranquille : on le/la suit sans qu\'il/elle ait besoin de hausser le ton', txtEn:'They have a quiet strength: others follow them without them having to raise their voice' },
  { id:'w9_8_912', wingOf:9, wingType:8, e:'🦁', txt:'Il/elle est patient·e, mais si on insiste trop, il/elle peut se fâcher très fort', txtEn:'They\'re patient, but if pushed too far, they can get very angry' },
  { id:'w9_1_912', wingOf:9, wingType:1, e:'📏', txt:'Il/elle tient à bien faire et se reproche en silence ses erreurs', txtEn:'They care about doing things right and quietly blame themselves for their mistakes' },
];

// 13-17
const WING_13_17: WingStatement[] = [
  { id:'w1_9_1317', wingOf:1, wingType:9, e:'🌙', txt:'Il/elle garde ses critiques pour lui/elle et reste calme et réservé·e', txtEn:'They keep their criticism to themselves and stay calm and reserved' },
  { id:'w1_2_1317', wingOf:1, wingType:2, e:'🤲', txt:'Il/elle aide volontiers les autres à mieux faire en leur donnant des conseils', txtEn:'They readily help others do better by giving them advice' },
  { id:'w2_1_1317', wingOf:2, wingType:1, e:'⚖️', txt:'Il/elle aide de façon sérieuse et discrète, avec le souci de bien faire', txtEn:'They help in a serious, low-key way, keen to do things right' },
  { id:'w2_3_1317', wingOf:2, wingType:3, e:'✨', txt:'Il/elle aide de façon chaleureuse et visible, et aime être entouré·e', txtEn:'They help in a warm, visible way and like having people around' },
  { id:'w3_2_1317', wingOf:3, wingType:2, e:'❤️', txt:'Il/elle réussit en créant des liens et en se faisant apprécier', txtEn:'They succeed by building connections and getting people to like them' },
  { id:'w3_4_1317', wingOf:3, wingType:4, e:'🎭', txt:'Il/elle veut réussir à sa manière, dans un domaine qui lui ressemble', txtEn:'They want to succeed in their own way, in a field that suits who they are' },
  { id:'w4_3_1317', wingOf:4, wingType:3, e:'🏆', txt:'Il/elle montre volontiers ses créations et aime qu\'on remarque son originalité', txtEn:'They readily show their creations and like having their originality noticed' },
  { id:'w4_5_1317', wingOf:4, wingType:5, e:'🏰', txt:'Il/elle vit sa différence surtout en privé, dans ses pensées et ses carnets', txtEn:'They live out their difference mostly in private, in their thoughts and notebooks' },
  { id:'w5_4_1317', wingOf:5, wingType:4, e:'🌌', txt:'Ses passions sont originales, avec un côté artistique ou imaginaire', txtEn:'Their passions are unusual, with an artistic or imaginative side' },
  { id:'w5_6_1317', wingOf:5, wingType:6, e:'🔎', txt:'Il/elle est prudent·e : il/elle vérifie les choses et les gens avant de s\'y fier', txtEn:'They are cautious: they check things and people out before relying on them' },
  { id:'w6_5_1317', wingOf:6, wingType:5, e:'📚', txt:'Quand il/elle s\'inquiète, il/elle se renseigne à fond avant d\'agir', txtEn:'When they worry, they research thoroughly before acting' },
  { id:'w6_7_1317', wingOf:6, wingType:7, e:'🎉', txt:'Quand il/elle s\'inquiète, il/elle cherche la compagnie des autres pour se changer les idées', txtEn:'When they worry, they seek out other people\'s company to take their mind off it' },
  { id:'w7_6_1317', wingOf:7, wingType:6, e:'🤝', txt:'Il/elle aime la nouveauté, mais préfère la vivre avec ses ami·e·s proches', txtEn:'They love new things but prefer to try them with their close friends' },
  { id:'w7_8_1317', wingOf:7, wingType:8, e:'⚡', txt:'Il/elle fonce vers ce qui lui plaît, sans attendre la permission de personne', txtEn:'They go straight for what they like, without waiting for anyone\'s permission' },
  { id:'w8_7_1317', wingOf:8, wingType:7, e:'🎢', txt:'Il/elle a de l\'énergie à revendre et aime l\'action, le mouvement, les défis', txtEn:'They have energy to spare and love action, movement and challenges' },
  { id:'w8_9_1317', wingOf:8, wingType:9, e:'🌾', txt:'Il/elle est plutôt posé·e et s\'impose calmement', txtEn:'They are fairly calm and assert themselves quietly' },
  { id:'w9_8_1317', wingOf:9, wingType:8, e:'🦁', txt:'Il/elle est calme, mais peut devenir très têtu·e quand on le/la pousse à bout', txtEn:'They are easygoing, but can become very stubborn when pushed too far' },
  { id:'w9_1_1317', wingOf:9, wingType:1, e:'📏', txt:'Il/elle est calme, mais peut devenir intransigeant·e sur ce qu\'il/elle trouve juste', txtEn:'They are easygoing, but can become unbending about what they think is right' },
];

// ────────────────────────────────────────────────────────────────
//  Ailes, mode observé (un proche décrit l'adulte, 3e personne)
// ────────────────────────────────────────────────────────────────

const WING_ADULTE_OBS: WingStatement[] = [
  { id:'w1_2_adobs', wingOf:1, wingType:2, e:'🤲', txt:'Son sens du travail bien fait est chaleureux : il/elle aide volontiers les autres à progresser et à bien faire', txtEn:'Their sense of a job well done is warm: they gladly help others improve and get things right' },
  { id:'w1_9_adobs', wingOf:1, wingType:9, e:'🌙', txt:'Son sens du travail bien fait est calme et discret : il/elle montre l\'exemple plus qu\'il/elle ne fait de remarques', txtEn:'Their sense of a job well done is calm and quiet: they lead by example more than they make remarks' },
  { id:'w2_1_adobs', wingOf:2, wingType:1, e:'⚖️', txt:'Sa générosité est sérieuse et fiable : il/elle rend service avec soin et tient à ce que ce soit bien fait', txtEn:'Their generosity is serious and dependable: they help out carefully and want it done properly' },
  { id:'w2_3_adobs', wingOf:2, wingType:3, e:'✨', txt:'Sa générosité est rayonnante : à l\'aise en société, il/elle aime rassembler les gens et les charmer', txtEn:'Their generosity is radiant: at ease in company, they love bringing people together and charming them' },
  { id:'w3_2_adobs', wingOf:3, wingType:2, e:'❤️', txt:'Son ambition passe par les relations : il/elle réussit en motivant son entourage et en se rendant utile', txtEn:'Their ambition works through relationships: they succeed by motivating the people around them and making themselves useful' },
  { id:'w3_4_adobs', wingOf:3, wingType:4, e:'🎭', txt:'Son ambition a une touche personnelle : il/elle veut réussir d\'une manière originale, qui lui ressemble', txtEn:'Their ambition has a personal touch: they want to succeed in an original way that\'s true to who they are' },
  { id:'w4_3_adobs', wingOf:4, wingType:3, e:'🏆', txt:'Sa sensibilité se montre : il/elle aime partager ce qu\'il/elle crée et voir son travail reconnu', txtEn:'Their sensitivity shows: they love sharing what they create and seeing their work recognized' },
  { id:'w4_5_adobs', wingOf:4, wingType:5, e:'🏰', txt:'Sa sensibilité reste intérieure : il/elle se retire volontiers pour lire, écrire ou réfléchir, loin des regards', txtEn:'Their sensitivity stays inward: they gladly withdraw to read, write or reflect, away from other people\'s eyes' },
  { id:'w5_4_adobs', wingOf:5, wingType:4, e:'🌌', txt:'Sa curiosité a un côté artistique : il/elle explore des sujets originaux avec beaucoup d\'imagination', txtEn:'Their curiosity has an artistic side: they explore unusual subjects with a lot of imagination' },
  { id:'w5_6_adobs', wingOf:5, wingType:6, e:'🔎', txt:'Sa curiosité est méthodique : il/elle analyse, vérifie et aime les systèmes fiables et concrets', txtEn:'Their curiosity is methodical: they analyze, double-check and like reliable, concrete systems' },
  { id:'w6_5_adobs', wingOf:6, wingType:5, e:'📚', txt:'Ses inquiétudes le/la poussent à réfléchir : il/elle se documente et analyse seul·e avant d\'agir', txtEn:'Their worries push them to think: they read up and analyze things on their own before acting' },
  { id:'w6_7_adobs', wingOf:6, wingType:7, e:'🎉', txt:'Ses inquiétudes le/la poussent vers les autres : il/elle se change les idées en sortant, en bougeant, en riant', txtEn:'Their worries push them toward other people: they take their mind off things by going out, keeping busy and laughing' },
  { id:'w7_6_adobs', wingOf:7, wingType:6, e:'🤝', txt:'Son enthousiasme est chaleureux : il/elle aime partager ses projets et ses sorties avec sa bande d\'amis', txtEn:'Their enthusiasm is warm: they love sharing their plans and outings with their group of friends' },
  { id:'w7_8_adobs', wingOf:7, wingType:8, e:'⚡', txt:'Son enthousiasme est fonceur : il/elle décide vite et entraîne les autres pour concrétiser ses envies', txtEn:'Their enthusiasm is bold: they decide fast and pull others along to make what they want happen' },
  { id:'w8_7_adobs', wingOf:8, wingType:7, e:'🎢', txt:'Sa force a de l\'élan : il/elle aime l\'aventure et les défis, et vit tout avec intensité', txtEn:'Their strength has momentum: they love adventure and challenges, and live everything intensely' },
  { id:'w8_9_adobs', wingOf:8, wingType:9, e:'🌾', txt:'Sa force est tranquille : il/elle agit posément, avec patience, et tient bon sans s\'agiter', txtEn:'Their strength is quiet: they act steadily and patiently, and hold firm without fuss' },
  { id:'w9_1_adobs', wingOf:9, wingType:1, e:'📏', txt:'Son calme est ordonné : conciliant·e d\'habitude, il/elle aime que les choses soient bien faites et à leur place', txtEn:'Their calm is orderly: usually easygoing, they like things done properly and kept in their place' },
  { id:'w9_8_adobs', wingOf:9, wingType:8, e:'🦁', txt:'Son calme a du caractère : conciliant·e d\'habitude, il/elle peut hausser le ton et tenir tête quand on dépasse les bornes', txtEn:'Their calm has backbone: usually easygoing, they can raise their voice and stand their ground when someone crosses the line' },
];

export const WING_STATEMENTS_BY_AGE: Record<AgeBand, WingStatement[]> = {
  '5-8': WING_5_8,
  '9-12': WING_9_12,
  '13-17': WING_13_17,
  'adulte': WING_ADULTE,
  'adulte-obs': WING_ADULTE_OBS,
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

// ═══════════════════════════════════════════════════════════════
//  GRILLE 2D ("boussole") — une page où l'on place un point.
//  Deux axes classiques de l'Ennéagramme, à 3 positions chacun :
//   - horizontal (groupes de Horney), face aux autres :
//       prendre les devants (3, 7, 8) / s'ajuster (1, 2, 6) / prendre du recul (4, 5, 9)
//   - vertical (groupes harmoniques), face à une difficulté :
//       voir le bon côté (2, 7, 9) / régler le problème (1, 3, 5) / réagir fort (4, 6, 8)
//  Leur croisement désigne exactement un type par case. Aucun numéro de type
//  n'est affiché : on se situe, on ne "vise" pas un type.
// ═══════════════════════════════════════════════════════════════

/** GRID_CELLS[row][col]: row = vertical axis (top → bottom), col = horizontal (left → right). */
export const GRID_CELLS: EnneaType[][] = [
  [7, 2, 9],
  [3, 1, 5],
  [8, 6, 4],
];

export interface GridLabels {
  subtitle: string; subtitleEn: string;
  xTitle: string; xTitleEn: string;
  x: [string, string, string]; xEn: [string, string, string];
  yTitle: string; yTitleEn: string;
  y: [string, string, string]; yEn: [string, string, string];
}

export const GRID_LABELS: Record<AgeBand, GridLabels> = {
  'adulte': {
    subtitle: 'Placez le point là où vous vous reconnaissez le mieux.',
    subtitleEn: 'Place the point where you recognise yourself best.',
    xTitle: "Avec les autres, j'ai tendance à…", xTitleEn: 'With other people, I tend to…',
    x: ['prendre les devants', "m'ajuster à ce qu'on attend de moi", 'prendre du recul'],
    xEn: ['take the lead', 'adjust to what is expected of me', 'step back'],
    yTitle: 'Quand ça va mal, je…', yTitleEn: 'When things go wrong, I…',
    y: ['vois le bon côté', 'mets mes émotions de côté pour régler le problème', "réagis fort, j'ai besoin que ça sorte"],
    yEn: ['look on the bright side', 'put my feelings aside to solve the problem', 'react strongly, I need to let it out'],
  },
  'adulte-obs': {
    subtitle: 'Placez le point là où votre proche se reconnaît le mieux.',
    subtitleEn: 'Place the point where your loved one fits best.',
    xTitle: 'Avec les autres, il/elle a tendance à…', xTitleEn: 'With other people, they tend to…',
    x: ['prendre les devants', "s'ajuster à ce qu'on attend de lui/d'elle", 'prendre du recul'],
    xEn: ['take the lead', 'adjust to what is expected of them', 'step back'],
    yTitle: 'Quand ça va mal, il/elle…', yTitleEn: 'When things go wrong, they…',
    y: ['voit le bon côté', 'met ses émotions de côté pour régler le problème', 'réagit fort, a besoin que ça sorte'],
    yEn: ['look on the bright side', 'put their feelings aside to solve the problem', 'react strongly, need to let it out'],
  },
  '13-17': {
    subtitle: 'Placez le point là où votre ado se reconnaît le mieux.',
    subtitleEn: 'Place the point where your teenager fits best.',
    xTitle: 'Avec les autres (amis, famille), il/elle…', xTitleEn: 'With others (friends, family), they…',
    x: ["s'affirme, prend de la place", "s'adapte à ce qu'on attend de lui/d'elle", 'se met en retrait, dans sa bulle'],
    xEn: ['assert themselves, take up space', 'adapt to what is expected of them', 'withdraw into their own bubble'],
    yTitle: 'Face à un souci, il/elle…', yTitleEn: 'Faced with a problem, they…',
    y: ['relativise, reste positif·ve', 'garde la tête froide et cherche une solution', "réagit fort, a besoin d'être entendu·e"],
    yEn: ['put it in perspective, stay positive', 'keep a cool head and look for a solution', 'react strongly, need to be heard'],
  },
  '9-12': {
    subtitle: 'Placez le point là où votre enfant se reconnaît le mieux.',
    subtitleEn: 'Place the point where your child fits best.',
    xTitle: 'Dans un groupe, il/elle…', xTitleEn: 'In a group, they…',
    x: ['prend les commandes', "fait ce qu'on attend de lui/d'elle", 'reste en retrait, observe'],
    xEn: ['take charge', 'do what is expected of them', 'hang back and watch'],
    yTitle: 'Quand quelque chose ne va pas, il/elle…', yTitleEn: 'When something goes wrong, they…',
    y: ['garde sa bonne humeur, passe à autre chose', 'reste calme et cherche une solution', "réagit fort, a besoin qu'on l'écoute"],
    yEn: ['stay cheerful and move on', 'stay calm and look for a solution', 'react strongly, need to be listened to'],
  },
  '5-8': {
    subtitle: 'Placez le point là où votre enfant se reconnaît le mieux.',
    subtitleEn: 'Place the point where your child fits best.',
    xTitle: 'Avec les autres enfants, il/elle…', xTitleEn: 'With other children, they…',
    x: ['mène le jeu', 'suit les règles, veut faire plaisir', 'joue dans son coin, observe'],
    xEn: ['lead the game', 'follow the rules, want to please', 'play on their own and watch'],
    yTitle: 'Quand quelque chose ne va pas, il/elle…', yTitleEn: 'When something goes wrong, they…',
    y: ['oublie vite, retrouve le sourire', 'essaie de réparer tout·e seul·e', "pleure ou se fâche fort, a besoin qu'on l'écoute"],
    yEn: ['forget quickly and smile again', 'try to fix it on their own', 'cry or get very angry, need to be listened to'],
  },
};

/** Soft weights of a point (x, y in 0..1) over the 9 types: bilinear between
 *  the cell centres (1/6, 1/2, 5/6), plus a small share for the point's row
 *  and column (credit when only one axis is right). Weights sum to 1. */
export function gridTypeWeights(x: number, y: number): Record<EnneaType, number> {
  const axis = (p: number): [number, number, number] => {
    const u = Math.max(0, Math.min(2, (p - 1 / 6) * 3));
    const i = Math.min(1, Math.floor(u));
    const f = u - i;
    const w: [number, number, number] = [0, 0, 0];
    w[i] += 1 - f;
    w[i + 1] += f;
    return w;
  };
  const hx = axis(x);
  const vy = axis(y);
  const out = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 } as Record<EnneaType, number>;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      out[GRID_CELLS[r][c]] += 0.6 * hx[c] * vy[r] + 0.4 * (hx[c] + vy[r]) / 6;
    }
  }
  return out;
}
