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
// Question pools: 'enfant' = one child test (10 years and over; younger
// children can take it, with a warning), 'adulte' = oneself, 'adulte-obs' =
// a loved one described by the user.
export type AgeBand = 'enfant' | 'adulte' | 'adulte-obs';
/** A child's age range (profile pages show age-specific texts). */
export type ChildAgeBand = '5-8' | '9-12' | '13-17';
export type QuizSubject = 'enfant' | 'self' | 'proche-self' | 'proche-obs';

/** Tranche d'âge d'un enfant à partir de son âge (fiches profils) */
export function ageToBand(age: number): ChildAgeBand {
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
  { id:'s3a_ad', t:3, e:'🎯', txt:'Je m\'adapte vite à ce qu\'on attend de moi, pour réussir et me faire admirer', txtEn:'I quickly adapt to what\'s expected of me, to succeed and be admired', dim:'compul' },
  { id:'s3b_ad', t:3, e:'📉', txt:'Passer pour quelqu\'un qui a échoué fait partie de mes plus grandes peurs', txtEn:'Being seen as someone who has failed is one of my biggest fears', dim:'fear' },
  { id:'s3c_ad', t:3, e:'🎭', txt:'J\'ai une conscience aiguë de l\'image que je projette', txtEn:'I\'m very aware of the image I project', dim:'behavior' },
  { id:'s3d_ad', t:3, e:'⏭️', txt:'Je mets mes émotions en pause pour avancer efficacement', txtEn:'I put my emotions on pause to keep moving forward efficiently', dim:'shadow' },
  { id:'s3e_ad', t:3, e:'🏅', txt:'L\'estime que j\'ai de moi dépend beaucoup de la reconnaissance de mes réussites', txtEn:'My self-esteem depends a lot on my achievements being recognized', dim:'belief' },
  { id:'s3f_ad', t:3, e:'⚙️', txt:'Même à bout de forces, je continue à donner l\'image de quelqu\'un qui réussit', txtEn:'Even when I\'m exhausted, I keep up the image of someone who\'s succeeding', dim:'stress' },
  // T4
  { id:'s4a_ad', t:4, e:'🫥', txt:'Je me sens à part, pas comme les autres, et je tiens à cette différence', txtEn:'I feel set apart, different from others, and I\'m attached to that difference', dim:'identity' },
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
  { id:'s5f_ad', t:5, e:'📡', txt:'Une visite à l\'improviste, même amicale, me donne l\'impression qu\'on envahit mon espace', txtEn:'An unannounced visit, even a friendly one, makes me feel intruded upon', dim:'stress' },
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

// ────────────────────────────────────────────────────────────────
//  POOL ADULTE — OBSERVÉ (3e personne — un proche décrit un adulte)
//  Sert à : « typer un proche » (mode observation) + le « second avis ».
//  Ancré sur la motivation cachée (« non pas X, mais Y »), pas le
//  comportement de surface — généré puis vérifié pour la discriminance.
// ────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────
//  Enfant (un seul test, pensé pour 10 ans et plus ; le parent répond)
// ────────────────────────────────────────────────────────────────

const STATEMENTS_ENFANT: Statement[] = [
  { id:'s1a_enf', t:1, e:'🔍', txt:'Reprend les autres, adultes compris, sur des détails qui ne sont pas faits « comme il faut »', txtEn:'Corrects others, adults included, over details that are not done "the right way"', dim:'behavior' },
  { id:'s1b_enf', t:1, e:'📏', txt:'Soigne ce que personne ne vérifiera (un exercice non noté, une corvée) : il faut que ce soit bien fait', txtEn:'Takes care over things nobody will check (an ungraded exercise, a chore): it has to be done right', dim:'voice' },
  { id:'s1c_enf', t:1, e:'🧊', txt:'Crie rarement quand quelque chose l\'énerve : sa colère sort froidement, en reproches sur ce qui a été mal fait', txtEn:'Rarely shouts when angry: their anger comes out coldly, as complaints about what was done wrong', dim:'compul' },
  { id:'s1d_enf', t:1, e:'⚖️', txt:'Proteste quand quelqu\'un triche au jeu, même si c\'est en sa faveur', txtEn:'Protests when someone cheats at a game, even if it is in their favor', dim:'belief' },
  { id:'s1e_enf', t:1, e:'😣', txt:'S\'en veut longtemps d\'une petite erreur, comme d\'une faute, même si vous lui dites que ce n\'est rien', txtEn:'Blames themselves for a long time over a small mistake, as if it were a wrongdoing, even if you tell them it is nothing', dim:'shadow' },
  { id:'s1f_enf', t:1, e:'✅', txt:'A une façon précise de faire les choses (ranger, plier le linge) et s\'y tient, même quand le temps presse', txtEn:'Has a precise way of doing things (tidying, folding laundry) and sticks to it, even when time is short', dim:'behavior' },
  { id:'s2a_enf', t:2, e:'💞', txt:'Devine ce dont un proche a besoin (un verre d\'eau, un coup de main) et le propose sans attendre', txtEn:'Senses what someone close needs (a glass of water, a helping hand) and offers it without waiting to be asked', dim:'attunement' },
  { id:'s2b_enf', t:2, e:'🎁', txt:'A souvent de petites attentions pour vous (un mot, un service, un message) et guette votre réaction', txtEn:'Often does little things for you (a note, a favor, a message) and watches for your reaction', dim:'behavior' },
  { id:'s2c_enf', t:2, e:'🚫', txt:'Prend mal qu\'on refuse son aide, comme si c\'était un rejet', txtEn:'Takes it badly when someone turns down their help, as if it were a rejection', dim:'shadow' },
  { id:'s2d_enf', t:2, e:'🫂', txt:'Aime être la personne à qui l\'on se confie, et se sent à l\'écart quand c\'est à quelqu\'un d\'autre', txtEn:'Likes being the person others confide in, and feels left out when it is someone else', dim:'motive' },
  { id:'s2e_enf', t:2, e:'💔', txt:'Donne beaucoup sans rien demander, puis se vexe quand on ne lui rend pas la pareille', txtEn:'Gives a lot without asking for anything, then feels hurt when it is not returned', dim:'shadow' },
  { id:'s2f_enf', t:2, e:'🤗', txt:'Insiste pour vous consoler quand quelque chose vous contrarie, même si vous préférez être tranquille', txtEn:'Insists on comforting you when something upsets you, even if you would rather be left alone', dim:'belief' },
  { id:'s3a_enf', t:3, e:'🏅', txt:'Parle de ses réussites (notes, matchs, prix) à tout le monde, pas seulement à vous', txtEn:'Tells everyone about their successes (grades, matches, awards), not just you', dim:'behavior' },
  { id:'s3b_enf', t:3, e:'📉', txt:'Perd l\'envie de continuer une activité dès que d\'autres y font mieux', txtEn:'Loses interest in an activity as soon as others do better at it', dim:'fear' },
  { id:'s3c_enf', t:3, e:'🎭', txt:'Ajuste son attitude et sa façon de parler selon la personne à impressionner', txtEn:'Adjusts how they act and talk to suit whoever they want to impress', dim:'compul' },
  { id:'s3d_enf', t:3, e:'🎯', txt:'Après un échec, parle peu de sa déception et se fixe aussitôt un nouvel objectif', txtEn:'After a setback, says little about their disappointment and sets a new goal right away', dim:'shadow' },
  { id:'s3e_enf', t:3, e:'🏆', txt:'Même pour un loisir, veut un résultat à la clé (compétition, médaille, ceinture)', txtEn:'Even for a hobby, wants something to show for it (a competition, a medal, a belt)', dim:'belief' },
  { id:'s3f_enf', t:3, e:'🔦', txt:'Quand ça rate, met en avant ce qui a quand même réussi (« mais j\'ai marqué deux buts »)', txtEn:'When something fails, highlights what still went well ("but I scored two goals")', dim:'stress' },
  { id:'s4a_enf', t:4, e:'🦄', txt:'Abandonne un goût (musique, vêtements, série) dès que ça devient à la mode dans son entourage', txtEn:'Drops a taste (music, clothes, a series) as soon as it becomes popular around them', dim:'identity' },
  { id:'s4b_enf', t:4, e:'🌫️', txt:'Dit souvent se sentir à part, comme si quelque chose lui manquait', txtEn:'Often talks about feeling different from others, as if something were missing', dim:'fear' },
  { id:'s4c_enf', t:4, e:'👂', txt:'Quand quelque chose lui fait de la peine, s\'agace d\'un « ça va passer » : veut qu\'on comprenne son ressenti', txtEn:'When something makes them sad, gets annoyed by "it\'ll pass": wants you to understand how they feel', dim:'emotion' },
  { id:'s4d_enf', t:4, e:'🕰️', txt:'Idéalise ce qui est perdu ou passé (une ancienne maison, un ami parti) plus que ce qui est là', txtEn:'Idealizes what is lost or past (a former home, a friend who left) more than what they have', dim:'compul' },
  { id:'s4e_enf', t:4, e:'🌑', txt:'Se plonge dans sa tristesse (musique mélancolique, films sombres) plutôt que de s\'en distraire', txtEn:'Sinks into their sadness (melancholy music, dark films) rather than distracting themselves from it', dim:'shadow' },
  { id:'s4f_enf', t:4, e:'✍️', txt:'Met ses émotions dans des dessins, de la musique ou des textes', txtEn:'Pours their feelings into drawings, music or writing', dim:'aesthetic' },
  { id:'s5a_enf', t:5, e:'📚', txt:'Se passionne pour un sujet (espace, histoire, technique) et le creuse à fond, bien au-delà de l\'école', txtEn:'Digs deep into a subject they love (space, history, technology), far beyond what school covers', dim:'behavior' },
  { id:'s5b_enf', t:5, e:'🧭', txt:'Face à un choix, se renseigne de son côté et se fait son avis sans demander celui des autres', txtEn:'Facing a choice, looks into it on their own and makes up their mind without asking others', dim:'behavior' },
  { id:'s5c_enf', t:5, e:'🧠', txt:'Après une dispute familiale, explique calmement qui a dit quoi, comme si ça ne concernait que les autres', txtEn:'After a family row, calmly explains who said what, as if it only concerned other people', dim:'shadow' },
  { id:'s5d_enf', t:5, e:'⏳', txt:'Avant une fête ou une sortie, fixe une limite (« je reste une heure ») et s\'y tient', txtEn:'Before a party or an outing, sets a limit ("I\'ll stay an hour") and sticks to it', dim:'stress' },
  { id:'s5e_enf', t:5, e:'⚙️', txt:'Cherche plus à comprendre comment les choses marchent qu\'à s\'en servir tout de suite', txtEn:'Cares more about understanding how things work than about using them straight away', dim:'motive' },
  { id:'s5f_enf', t:5, e:'🏰', txt:'S\'agace d\'une visite ou d\'une sortie imprévue : c\'était du temps gardé pour soi', txtEn:'Gets annoyed by an unplanned visit or outing: that time was meant to be their own', dim:'compul' },
  { id:'s6a_enf', t:6, e:'🎒', txt:'Prend spontanément ses précautions « au cas où » (un pull, un chargeur, un numéro à appeler)', txtEn:'Takes precautions "just in case" without being asked (a sweater, a charger, a number to call)', dim:'behavior' },
  { id:'s6b_enf', t:6, e:'❓', txt:'Vous demande souvent : « Tu ferais quoi, toi ? », puis doute encore après votre réponse', txtEn:'Often asks you: "What would you do?", then still has doubts after your answer', dim:'shadow' },
  { id:'s6c_enf', t:6, e:'🪂', txt:'A visiblement peur, et fonce justement pour ça, comme pour se prouver le contraire', txtEn:'Is visibly scared, and charges ahead for exactly that reason, as if to prove otherwise', dim:'fear' },
  { id:'s6d_enf', t:6, e:'😬', txt:'Vous tient tête avec force, puis s\'inquiète vite d\'avoir dépassé les bornes', txtEn:'Stands up to you forcefully, then soon worries about having gone too far', dim:'motive' },
  { id:'s6e_enf', t:6, e:'🔎', txt:'Devant une promesse ou une offre trop belle, cherche tout de suite le piège', txtEn:'Faced with a promise or an offer that sounds too good, looks for the catch right away', dim:'belief' },
  { id:'s6f_enf', t:6, e:'📞', txt:'Quand un proche tarde ou ne répond pas au téléphone, imagine vite qu\'il lui est arrivé quelque chose', txtEn:'When someone close is late or does not answer the phone, quickly imagines something has happened to them', dim:'voice' },
  { id:'s7a_enf', t:7, e:'✨', txt:'Se lance dans une passion avec enthousiasme, puis en change dès que la nouveauté s\'estompe', txtEn:'Throws themselves into a passion with enthusiasm, then switches to another once the novelty wears off', dim:'behavior' },
  { id:'s7b_enf', t:7, e:'😄', txt:'Quand une discussion devient lourde, change de sujet avec une blague ou une idée de sortie', txtEn:'When a conversation gets heavy, changes the subject with a joke or an idea for an outing', dim:'compul' },
  { id:'s7c_enf', t:7, e:'📅', txt:'Évite de s\'engager trop tôt pour le week-end, au cas où une idée plus amusante se présenterait', txtEn:'Avoids committing to weekend plans too early, in case something more fun comes along', dim:'motive' },
  { id:'s7d_enf', t:7, e:'☀️', txt:'Raconte ses galères comme des aventures drôles', txtEn:'Describes their mishaps as funny adventures', dim:'belief' },
  { id:'s7e_enf', t:7, e:'⏩', txt:'Même en pleine sortie, parle déjà de la prochaine chose à faire', txtEn:'Even in the middle of an outing, already talks about the next thing to do', dim:'compul' },
  { id:'s7f_enf', t:7, e:'🔄', txt:'Quand on lui refuse un plaisir, trouve aussitôt autre chose d\'amusant à faire', txtEn:'When denied something enjoyable, immediately finds something else fun to do', dim:'stress' },
  { id:'s8a_enf', t:8, e:'⚡', txt:'Explose de colère, fort et d\'un coup, puis se calme vite : ne garde pas rancune', txtEn:'Blows up in anger, loudly and suddenly, then calms down quickly: holds no grudge', dim:'body' },
  { id:'s8b_enf', t:8, e:'🦁', txt:'A une présence forte : même des adultes hésitent à aller contre son avis', txtEn:'Has a strong presence: even adults think twice before contradicting them', dim:'voice' },
  { id:'s8c_enf', t:8, e:'👑', txt:'Tranche quand un groupe hésite (fratrie, cousins, amis), quitte à imposer sa volonté', txtEn:'Makes the call when a group hesitates (siblings, cousins, friends), even if it means imposing their will', dim:'behavior' },
  { id:'s8d_enf', t:8, e:'🎖️', txt:'Cherche à se faire respecter plutôt qu\'à se faire aimer', txtEn:'Seeks to be respected rather than liked', dim:'motive' },
  { id:'s8e_enf', t:8, e:'⛓️', txt:'Depuis son plus jeune âge, ne supporte pas qu\'on décide à sa place, même en étant d\'accord', txtEn:'Ever since early childhood, can\'t stand having decisions made for them, even when they agree', dim:'fear' },
  { id:'s8f_enf', t:8, e:'🪨', txt:'Quand quelque chose lui fait mal ou de la peine, refuse le réconfort, comme si c\'était une faiblesse', txtEn:'When hurt or upset, refuses to be comforted, as if it were a weakness', dim:'shadow' },
  { id:'s9a_enf', t:9, e:'🕊️', txt:'Quand on lui demande de choisir, même pour son anniversaire, répond « comme vous voulez »', txtEn:'When asked to choose, even for their own birthday, answers "whatever you want"', dim:'compul' },
  { id:'s9b_enf', t:9, e:'🐢', txt:'Vous contredit rarement en face : dit « d\'accord », puis fait à son rythme', txtEn:'Rarely contradicts you to your face: says "okay", then does it at their own pace', dim:'shadow' },
  { id:'s9c_enf', t:9, e:'💤', txt:'A ses envies, mais laisse souvent passer le moment de s\'y mettre (une inscription, un projet)', txtEn:'Has wishes of their own, but often lets the moment to act on them slip by (signing up, a project)', dim:'identity' },
  { id:'s9d_enf', t:9, e:'🏳️', txt:'Dans une dispute, cède vite pour que ça s\'arrête, même en ayant raison', txtEn:'In an argument, gives in quickly to make it stop, even when in the right', dim:'compul' },
  { id:'s9e_enf', t:9, e:'🤷', txt:'Quand deux proches se disputent, dit que chacun a un peu raison, même quand l\'un a clairement tort', txtEn:'When two people close to them argue, says each has a point, even when one is clearly in the wrong', dim:'attunement' },
  { id:'s9f_enf', t:9, e:'☁️', txt:'Se fâche rarement, même quand on emprunte ses affaires sans demander ou qu\'on l\'interrompt', txtEn:'Rarely gets angry, even when someone borrows their things without asking or interrupts them', dim:'behavior' },
];


const STATEMENTS_ADULTE_OBS: Statement[] = [
  // T1
  { id:'s1a_adobs', t:1, e:'📏', txt:'Fait les choses correctement même quand personne ne regarde : bâcler serait une faute à ses yeux', txtEn:'Does things properly even when no one is watching: cutting corners would be wrong in their eyes', dim:'behavior' },
  { id:'s1b_adobs', t:1, e:'😤', txt:'Laisse paraître son agacement sur son visage et dans son ton, même en assurant ne pas être en colère', txtEn:'Lets irritation show on their face and in their tone, even while claiming not to be angry', dim:'body' },
  { id:'s1c_adobs', t:1, e:'⚖️', txt:'Repère tout de suite le détail qui cloche et ressent le besoin de le corriger, même chez les autres', txtEn:'Spots the detail that\'s off right away and feels the need to correct it, even when it\'s someone else\'s', dim:'behavior' },
  { id:'s1d_adobs', t:1, e:'🔒', txt:'Préfère finir en retard plutôt que de rendre un travail imparfait', txtEn:'Would rather finish late than hand in imperfect work', dim:'compul' },
  { id:'s1e_adobs', t:1, e:'🌍', txt:'Croit qu\'il y a une bonne et une mauvaise façon de faire, et s\'irrite de la négligence des autres', txtEn:'Believes there\'s a right and a wrong way to do things, and gets irritated by other people\'s carelessness', dim:'belief' },
  { id:'s1f_adobs', t:1, e:'😣', txt:'A du mal à s\'accorder un plaisir tant que tout n\'est pas en ordre, comme s\'il fallait d\'abord le mériter', txtEn:'Finds it hard to allow themselves a treat until everything is in order, as if it had to be earned first', dim:'shadow' },
  // T2
  { id:'s2a_adobs', t:2, e:'💞', txt:'Se sent à l\'écart quand un proche se confie à quelqu\'un d\'autre', txtEn:'Feels left out when someone close confides in another person', dim:'attunement' },
  { id:'s2b_adobs', t:2, e:'🤲', txt:'Vit le refus de son aide comme un rejet', txtEn:'Takes it as a rejection when their offer of help is turned down', dim:'behavior' },
  { id:'s2c_adobs', t:2, e:'😞', txt:'Souffre quand ses attentions passent inaperçues, même en disant que ce n\'était pas pour ça', txtEn:'Is hurt when what they give goes unnoticed, even while saying that wasn\'t the point', dim:'shadow' },
  { id:'s2d_adobs', t:2, e:'🔗', txt:'Aime se sentir indispensable à ses proches : trouve rassurant d\'être irremplaçable', txtEn:'Likes feeling indispensable to the people close to them: finds being irreplaceable reassuring', dim:'compul' },
  { id:'s2e_adobs', t:2, e:'🚫', txt:'Culpabilise après avoir dit non à un proche et se rattrape vite, de peur qu\'on l\'aime moins', txtEn:'Feels guilty after saying no to someone close and quickly makes up for it, for fear of being loved less', dim:'shadow' },
  { id:'s2f_adobs', t:2, e:'🧭', txt:'Exprime rarement ses propres besoins, mais espère que ses proches les devineront', txtEn:'Rarely voices their own needs, but hopes the people close to them will guess them', dim:'belief' },
  // T3
  { id:'s3a_adobs', t:3, e:'🦎', txt:'Adapte son style selon les personnes rencontrées, pour faire la meilleure impression', txtEn:'Adjusts their style depending on who they\'re meeting, to make the best impression', dim:'compul' },
  { id:'s3b_adobs', t:3, e:'📸', txt:'Sait mettre ses réussites en valeur et se présenter sous son meilleur jour', txtEn:'Knows how to showcase their achievements and present themselves in the best light', dim:'behavior' },
  { id:'s3c_adobs', t:3, e:'🚪', txt:'Parle peu de ses échecs, même à ses proches, comme si rater remettait en cause sa valeur', txtEn:'Says little about their failures, even to those close to them, as if failing called their worth into question', dim:'fear' },
  { id:'s3d_adobs', t:3, e:'⏸️', txt:'Met de côté les émotions difficiles qui surgissent, pour garder le cap sur ses objectifs', txtEn:'Sets aside difficult emotions that come up, to stay focused on their goals', dim:'shadow' },
  { id:'s3e_adobs', t:3, e:'🏅', txt:'Accorde très peu de valeur à une réussite que personne ne remarque', txtEn:'Places very little value on a success that nobody notices', dim:'motive' },
  { id:'s3f_adobs', t:3, e:'🎬', txt:'Continue de donner l\'image de quelqu\'un qui assure, même à bout de forces', txtEn:'Keeps up the image of someone who\'s on top of everything, even when exhausted', dim:'stress' },
  // T4
  { id:'s4a_adobs', t:4, e:'🫥', txt:'Cultive ce qui fait sa différence : ses goûts, son style, ses choix doivent lui ressembler', txtEn:'Cultivates what sets them apart: their tastes, their style and their choices have to feel true to who they are', dim:'identity' },
  { id:'s4b_adobs', t:4, e:'🌫️', txt:'Devant le bonheur simple des autres, pense souvent à ce qui lui manque', txtEn:'Often thinks of what\'s missing in their own life when seeing other people\'s simple happiness', dim:'fear' },
  { id:'s4c_adobs', t:4, e:'🎨', txt:'Se plonge dans une émotion forte au lieu de la calmer, comme si ressentir intensément était la preuve d\'être en vie', txtEn:'Dives into a strong feeling rather than calming it, as if feeling intensely were proof of being alive', dim:'emotion' },
  { id:'s4d_adobs', t:4, e:'🌙', txt:'S\'émeut davantage d\'une musique, d\'un film ou d\'un lieu mélancolique que de la gaieté facile : s\'y reconnaît', txtEn:'Is moved more by a melancholy song, film or place than by easy cheerfulness: recognizes themselves in it', dim:'aesthetic' },
  { id:'s4e_adobs', t:4, e:'🌑', txt:'Trouve souvent ce qui est perdu ou hors d\'atteinte plus beau que ce qui est acquis', txtEn:'Often finds what is lost or out of reach more beautiful than what they already have', dim:'shadow' },
  { id:'s4f_adobs', t:4, e:'🎭', txt:'Vit un réconfort trop rapide comme de l\'incompréhension : a besoin qu\'on reconnaisse la profondeur de sa peine', txtEn:'Feels misunderstood when comforted too quickly: needs the depth of their pain to be acknowledged', dim:'stress' },
  // T5
  { id:'s5a_adobs', t:5, e:'🔋', txt:'Même après une soirée agréable, a besoin de s\'isoler pour récupérer, comme si sa réserve d\'énergie était vide', txtEn:'Needs time alone to recover even after a pleasant evening out, as if their energy reserve had run dry', dim:'stress' },
  { id:'s5b_adobs', t:5, e:'🏰', txt:'Protège son temps comme un budget serré : se met sur la défensive face à une visite imprévue', txtEn:'Guards their time like a tight budget: gets defensive when someone drops by unannounced', dim:'compul' },
  { id:'s5c_adobs', t:5, e:'🔬', txt:'Veut tout comprendre avant de se lancer, car le sentiment d\'incompétence lui est insupportable', txtEn:'Wants to understand everything before getting started, because feeling incompetent is unbearable to them', dim:'motive' },
  { id:'s5d_adobs', t:5, e:'🧠', txt:'Analyse ses émotions plutôt que de les vivre, comme en les observant de l\'extérieur', txtEn:'Analyzes their feelings rather than living them, as if watching them from the outside', dim:'shadow' },
  { id:'s5e_adobs', t:5, e:'📚', txt:'Peut disparaître des heures dans un sujet pointu : se rassure plus en accumulant du savoir qu\'en compagnie des gens', txtEn:'Can vanish for hours into a narrow subject: finds more reassurance in building up knowledge than in people\'s company', dim:'behavior' },
  { id:'s5f_adobs', t:5, e:'🧊', txt:'Parle peu de soi : préfère garder l\'énergie que lui coûterait le fait de se dévoiler', txtEn:'Says little about themselves: would rather save the energy that opening up would cost', dim:'compul' },
  // T6
  { id:'s6a_adobs', t:6, e:'⚠️', txt:'Même quand tout va bien, guette déjà ce qui pourrait mal tourner', txtEn:'Is already on the lookout for what could go wrong, even when everything is going well', dim:'voice' },
  { id:'s6b_adobs', t:6, e:'📞', txt:'Avant une décision qui l\'inquiète, consulte plusieurs proches : son propre avis ne lui suffit pas', txtEn:'Consults several people close to them before a decision that worries them: their own judgment isn\'t enough', dim:'shadow' },
  { id:'s6c_adobs', t:6, e:'🛡️', txt:'S\'apaise surtout en sachant sur qui compter si les choses tournent mal', txtEn:'Is soothed most by knowing who to count on if things go wrong', dim:'motive' },
  { id:'s6d_adobs', t:6, e:'🔎', txt:'A besoin de pouvoir se fier à ceux qui décident, mais les met longtemps à l\'épreuve avant de leur faire confiance', txtEn:'Needs to be able to rely on those in charge, but puts them to the test for a long time before trusting them', dim:'belief' },
  { id:'s6e_adobs', t:6, e:'🤝', txt:'S\'inquiète vite d\'un changement de dernière minute : se demande ce qui se cache derrière', txtEn:'Quickly gets worried by a last-minute change: wonders what\'s behind it', dim:'fear' },
  { id:'s6f_adobs', t:6, e:'😰', txt:'Avant un voyage ou un projet, imagine les pires scénarios et prépare un plan B, au cas où', txtEn:'Pictures the worst-case scenarios before a trip or a project and prepares a plan B, just in case', dim:'stress' },
  // T7
  { id:'s7a_adobs', t:7, e:'✨', txt:'Garde plusieurs options ouvertes, car choisir une seule chose reviendrait à renoncer aux autres', txtEn:'Keeps several options open, because choosing just one thing would mean giving up the others', dim:'behavior' },
  { id:'s7b_adobs', t:7, e:'🙈', txt:'Face à la peine d\'un proche, a du mal à rester dans la tristesse et cherche vite le bon côté ou une blague', txtEn:'Finds it hard to stay with the sadness when a loved one is hurting, and quickly looks for the bright side or a joke', dim:'attunement' },
  { id:'s7c_adobs', t:7, e:'🎠', txt:'Déborde d\'idées et de projets, bien plus que ce qui est réalisable', txtEn:'Overflows with ideas and plans, far more than can actually be carried out', dim:'behavior' },
  { id:'s7d_adobs', t:7, e:'🎈', txt:'Se lance dans un projet avec enthousiasme, puis décroche quand la routine s\'installe', txtEn:'Throws themselves into a project with enthusiasm, then loses interest once routine sets in', dim:'compul' },
  { id:'s7e_adobs', t:7, e:'🥀', txt:'S\'agite quand une contrainte ou une période pénible se prolonge, et cherche vite une échappatoire plus agréable', txtEn:'Gets restless when a constraint or a hard stretch drags on, and quickly looks for a more pleasant way out', dim:'stress' },
  { id:'s7f_adobs', t:7, e:'🌈', txt:'Au milieu d\'une bonne sortie, parle déjà de la prochaine', txtEn:'Is already talking about the next outing in the middle of a good one', dim:'compul' },
  // T8
  { id:'s8a_adobs', t:8, e:'🪨', txt:'Se braque quand on veut l\'entourer de soins : se laisser prendre en charge, c\'est perdre le contrôle', txtEn:'Bristles when someone tries to look after them: being taken care of means losing control', dim:'shadow' },
  { id:'s8b_adobs', t:8, e:'⚔️', txt:'Aborde les conflits de front, sans crainte, et s\'en sert pour tester la solidité de l\'autre', txtEn:'Faces conflict head-on, without fear, and uses it to test how solid the other person is', dim:'behavior' },
  { id:'s8c_adobs', t:8, e:'🚧', txt:'S\'insurge quand on décide à sa place, même en étant d\'accord sur le fond', txtEn:'Flares up when others decide for them, even when agreeing with the decision itself', dim:'fear' },
  { id:'s8d_adobs', t:8, e:'🦁', txt:'Tient plus à se faire respecter qu\'à se faire apprécier', txtEn:'Cares more about being respected than about being liked', dim:'motive' },
  { id:'s8e_adobs', t:8, e:'🥊', txt:'Quand quelque chose lui fait mal, réagit par la colère plutôt que par la tristesse : montrer sa fragilité lui semble dangereux', txtEn:'Reacts with anger rather than sadness when hurt: showing fragility feels dangerous to them', dim:'compul' },
  { id:'s8f_adobs', t:8, e:'📡', txt:'Sent d\'instinct qui a le vrai pouvoir dans un groupe et se laisse peu impressionner par les titres', txtEn:'Instinctively senses who holds the real power in a group, and isn\'t much impressed by titles', dim:'attunement' },
  // T9
  { id:'s9a_adobs', t:9, e:'🕊️', txt:'Adopte facilement l\'avis des personnes présentes, comme si avoir sa propre position importait peu', txtEn:'Easily takes on the views of whoever is around, as if having a position of their own mattered little', dim:'compul' },
  { id:'s9b_adobs', t:9, e:'🤐', txt:'Face à une contrariété, minimise : « ce n\'est pas si grave »', txtEn:'Plays down what upsets them: "it\'s not that bad"', dim:'behavior' },
  { id:'s9c_adobs', t:9, e:'💤', txt:'S\'occupe de petites tâches faciles et repousse ce qui lui importe vraiment', txtEn:'Keeps busy with small, easy tasks and puts off what really matters to them', dim:'shadow' },
  { id:'s9d_adobs', t:9, e:'😶', txt:'Quand on lui demande ce qui lui ferait vraiment plaisir, reste sincèrement sans réponse, comme si l\'envie dormait', txtEn:'Sincerely draws a blank when asked what would really please them, as if the wanting itself were asleep', dim:'fear' },
  { id:'s9e_adobs', t:9, e:'☁️', txt:'Quand on insiste, dit oui pour avoir la paix, puis traîne ou laisse filer', txtEn:'Says yes to keep the peace when pushed, then drags their feet or lets it slide', dim:'stress' },
  { id:'s9f_adobs', t:9, e:'🌱', txt:'Dans un désaccord entre proches, comprend chaque camp et a du mal à prendre parti', txtEn:'Sees each side\'s point in a disagreement between people close to them, and finds it hard to pick one', dim:'behavior' },
];

export const STATEMENTS_BY_AGE: Record<AgeBand, Statement[]> = {
  'enfant': STATEMENTS_ENFANT,
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
  { id:'w9_8_ad', wingOf:9, wingType:8, e:'🦁', txt:'J\'ai un caractère plutôt conciliant, mais quand on me pousse à bout, je sais taper du poing sur la table', txtEn:'I\'m fairly easygoing, but when pushed too far, I can put my foot down' },
  { id:'w9_1_ad', wingOf:9, wingType:1, e:'📏', txt:'J\'ai un caractère plutôt conciliant, et j\'aime que tout soit en ordre et bien fait autour de moi', txtEn:'I\'m fairly easygoing, and I like everything around me to be orderly and done right' },
];

// ────────────────────────────────────────────────────────────────
//  Ailes, mode observé (un proche décrit l'adulte, 3e personne)
// ────────────────────────────────────────────────────────────────
const WING_ENFANT: WingStatement[] = [
  { id:'w1_2_enf', wingOf:1, wingType:2, e:'🤲', txt:'Met son souci de bien faire au service des autres : aime les aider et leur donner des conseils', txtEn:'Turns their care for doing things right toward others: likes helping them and giving them advice' },
  { id:'w1_9_enf', wingOf:1, wingType:9, e:'🌙', txt:'Vit son souci de bien faire avec calme : montre l\'exemple plutôt que de faire la leçon', txtEn:'Has a calm way of caring about doing things right: sets an example rather than lecturing' },
  { id:'w2_1_enf', wingOf:2, wingType:1, e:'⚖️', txt:'A une générosité discrète : rend service sans bruit et tient à ce que ce soit bien fait', txtEn:'Has a low-key generosity: helps out quietly and wants it done properly' },
  { id:'w2_3_enf', wingOf:2, wingType:3, e:'✨', txt:'A une générosité qui se voit : aide avec entrain et aime que ça se remarque', txtEn:'Has a generosity that shows: helps with gusto and likes it to be noticed' },
  { id:'w3_2_enf', wingOf:3, wingType:2, e:'❤️', txt:'Pour réussir, mise sur les relations : sait se rendre sympathique auprès de ceux qui comptent', txtEn:'To succeed, relies on relationships: knows how to win over the people who matter' },
  { id:'w3_4_enf', wingOf:3, wingType:4, e:'🎭', txt:'Pour réussir, mise sur ce qui fait sa différence : veut que ses réalisations lui ressemblent', txtEn:'To succeed, relies on what sets them apart: wants their achievements to reflect who they are' },
  { id:'w4_3_enf', wingOf:4, wingType:3, e:'🏆', txt:'A une sensibilité qui se montre : aime partager ses créations et voir son originalité remarquée', txtEn:'Has a sensitivity that shows: likes sharing their creations and being noticed for their originality' },
  { id:'w4_5_enf', wingOf:4, wingType:5, e:'🏰', txt:'A une sensibilité qui reste intérieure : crée et réfléchit surtout en solitaire, la tête dans ses idées', txtEn:'Has a sensitivity that stays inward: creates and reflects mostly alone, absorbed in their own ideas' },
  { id:'w5_4_enf', wingOf:5, wingType:4, e:'🌌', txt:'A une curiosité plutôt artistique : explore des sujets insolites et se perd dans son imaginaire', txtEn:'Has a curiosity with an artistic side: explores unusual subjects and gets lost in their imagination' },
  { id:'w5_6_enf', wingOf:5, wingType:6, e:'🔎', txt:'A une curiosité pratique et méthodique : vérifie tout deux fois et aime ce qui est fiable', txtEn:'Has a practical, methodical curiosity: double-checks everything and likes what is reliable' },
  { id:'w6_5_enf', wingOf:6, wingType:5, e:'📚', txt:'Quand quelque chose l\'inquiète, se renseigne à fond et réfléchit dans son coin avant d\'agir', txtEn:'When worried, looks into things thoroughly and thinks it through alone before acting' },
  { id:'w6_7_enf', wingOf:6, wingType:7, e:'🎉', txt:'Quand quelque chose l\'inquiète, bouge, s\'occupe ou voit du monde pour se changer les idées', txtEn:'When worried, gets moving, keeps busy or sees people to take their mind off it' },
  { id:'w7_6_enf', wingOf:7, wingType:6, e:'🤝', txt:'A un enthousiasme qui a besoin des autres : se lance plus volontiers en bonne compagnie qu\'en solitaire', txtEn:'Has an enthusiasm that needs other people: takes the plunge more readily in good company than alone' },
  { id:'w7_8_enf', wingOf:7, wingType:8, e:'⚡', txt:'A un enthousiasme fonceur : décide vite et entraîne les autres, quitte à les bousculer', txtEn:'Has a bold enthusiasm: decides fast and pulls others along, even if it means pushing them' },
  { id:'w8_7_enf', wingOf:8, wingType:7, e:'🎢', txt:'A une force pleine d\'élan : aime l\'action et les défis, et a du mal à tenir en place', txtEn:'Has a strength full of drive: loves action and challenges, and finds it hard to sit still' },
  { id:'w8_9_enf', wingOf:8, wingType:9, e:'🌾', txt:'A une force tranquille : s\'impose posément et cède rarement', txtEn:'Has a quiet strength: asserts themselves calmly and rarely gives in' },
  { id:'w9_1_enf', wingOf:9, wingType:1, e:'📏', txt:'Arrondit plutôt les angles, mais peut devenir inflexible sur ce qui lui semble juste', txtEn:'Usually smooths things over, but can become unbending about what seems right to them' },
  { id:'w9_8_enf', wingOf:9, wingType:8, e:'🦁', txt:'Arrondit plutôt les angles, mais peut dire non sèchement quand on empiète sur son terrain', txtEn:'Usually smooths things over, but can say no curtly when someone oversteps into their space' },
];


const WING_ADULTE_OBS: WingStatement[] = [
  { id:'w1_2_adobs', wingOf:1, wingType:2, e:'🤲', txt:'A un sens chaleureux du travail bien fait : aide volontiers les autres à progresser et à bien faire', txtEn:'Has a warm sense of a job well done: gladly helps others improve and get things right' },
  { id:'w1_9_adobs', wingOf:1, wingType:9, e:'🌙', txt:'A un sens calme et discret du travail bien fait : prêche par l\'exemple plus que par des remarques', txtEn:'Has a calm, quiet sense of a job well done: leads by example more than by making remarks' },
  { id:'w2_1_adobs', wingOf:2, wingType:1, e:'⚖️', txt:'A une générosité sérieuse et fiable : rend service avec soin et tient à ce que ce soit bien fait', txtEn:'Has a serious, dependable generosity: helps out carefully and wants it done properly' },
  { id:'w2_3_adobs', wingOf:2, wingType:3, e:'✨', txt:'A une générosité rayonnante : à l\'aise en société, aime rassembler les gens et les charmer', txtEn:'Has a radiant generosity: at ease in company, loves bringing people together and charming them' },
  { id:'w3_2_adobs', wingOf:3, wingType:2, e:'❤️', txt:'A une ambition qui passe par les relations : réussit en motivant son entourage et en se rendant utile', txtEn:'Has an ambition that works through relationships: succeeds by motivating the people around them and making themselves useful' },
  { id:'w3_4_adobs', wingOf:3, wingType:4, e:'🎭', txt:'Donne à son ambition une touche personnelle : veut réussir d\'une manière originale, qui lui ressemble', txtEn:'Gives their ambition a personal touch: wants to succeed in an original way that\'s true to who they are' },
  { id:'w4_3_adobs', wingOf:4, wingType:3, e:'🏆', txt:'Montre sa sensibilité : aime partager ses créations et voir son travail reconnu', txtEn:'Shows their sensitivity: loves sharing their creations and seeing their work recognized' },
  { id:'w4_5_adobs', wingOf:4, wingType:5, e:'🏰', txt:'Garde sa sensibilité pour soi : se retire volontiers pour lire, écrire ou réfléchir, loin des regards', txtEn:'Keeps their sensitivity inward: gladly withdraws to read, write or reflect, away from other people\'s eyes' },
  { id:'w5_4_adobs', wingOf:5, wingType:4, e:'🌌', txt:'A une curiosité à la fibre artistique : explore des sujets originaux avec beaucoup d\'imagination', txtEn:'Has a curiosity with an artistic side: explores unusual subjects with a lot of imagination' },
  { id:'w5_6_adobs', wingOf:5, wingType:6, e:'🔎', txt:'A une curiosité méthodique : analyse, vérifie et aime les systèmes fiables et concrets', txtEn:'Has a methodical curiosity: analyzes, double-checks and likes reliable, concrete systems' },
  { id:'w6_5_adobs', wingOf:6, wingType:5, e:'📚', txt:'Répond à ses inquiétudes par la réflexion : se documente et analyse de son côté avant d\'agir', txtEn:'Deals with worries by thinking them through: reads up and analyzes things on their own before acting' },
  { id:'w6_7_adobs', wingOf:6, wingType:7, e:'🎉', txt:'Répond à ses inquiétudes en se tournant vers les autres : se change les idées en sortant, en bougeant, en riant', txtEn:'Deals with worries by turning to other people: takes their mind off things by going out, keeping busy and laughing' },
  { id:'w7_6_adobs', wingOf:7, wingType:6, e:'🤝', txt:'A un enthousiasme chaleureux : aime partager ses projets et ses sorties avec sa bande d\'amis', txtEn:'Has a warm enthusiasm: loves sharing plans and outings with their group of friends' },
  { id:'w7_8_adobs', wingOf:7, wingType:8, e:'⚡', txt:'A un enthousiasme fonceur : décide vite et entraîne les autres pour concrétiser ses envies', txtEn:'Has a bold enthusiasm: decides fast and pulls others along to make their wishes happen' },
  { id:'w8_7_adobs', wingOf:8, wingType:7, e:'🎢', txt:'A une force pleine d\'élan : aime l\'aventure et les défis, et vit tout avec intensité', txtEn:'Has a strength full of momentum: loves adventure and challenges, and lives everything intensely' },
  { id:'w8_9_adobs', wingOf:8, wingType:9, e:'🌾', txt:'A une force tranquille : agit posément, avec patience, et tient bon sans s\'agiter', txtEn:'Has a quiet strength: acts steadily and patiently, and holds firm without fuss' },
  { id:'w9_1_adobs', wingOf:9, wingType:1, e:'📏', txt:'A un calme ordonné : d\'un naturel conciliant, aime que les choses soient bien faites et à leur place', txtEn:'Has an orderly calm: easygoing by nature, likes things done properly and kept in their place' },
  { id:'w9_8_adobs', wingOf:9, wingType:8, e:'🦁', txt:'A du caractère sous son calme : d\'un naturel conciliant, peut hausser le ton et tenir tête quand on dépasse les bornes', txtEn:'Has backbone beneath the calm: easygoing by nature, can raise their voice and stand their ground when someone crosses the line' },
];

export const WING_STATEMENTS_BY_AGE: Record<AgeBand, WingStatement[]> = {
  'enfant': WING_ENFANT,
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
  'enfant': {
    subtitle: 'Placez le point là où vous reconnaissez le mieux votre enfant : son caractère, pas ses humeurs du moment',
    subtitleEn: 'Place the point where your child fits best: their character, not their passing moods',
    xTitle: 'Avec les autres (famille, amis), votre enfant…', xTitleEn: 'With others (family, friends), your child…',
    x: ['prend les devants, s\'affirme', 'veut bien faire, respecte les règles', 'reste en retrait, observe d\'abord'],
    xEn: ['takes the lead, asserts themselves', 'wants to do things right, follows the rules', 'hangs back, watches first'],
    yTitle: 'Face à un souci, votre enfant…', yTitleEn: 'Faced with a problem, your child…',
    y: ['relativise, voit le bon côté', 'garde la tête froide et cherche une solution', 'réagit fort, a besoin qu\'on l\'écoute'],
    yEn: ['puts it in perspective, looks on the bright side', 'keeps a cool head and looks for a solution', 'reacts strongly, needs to be heard'],
  },
  'adulte': {
    subtitle: 'Placez le point là où vous vous reconnaissez le mieux',
    subtitleEn: 'Place the point where you recognise yourself best',
    xTitle: 'Avec les autres, j\'ai tendance à…', xTitleEn: 'With other people, I tend to…',
    x: ['prendre les devants', 'm\'ajuster à ce qu\'on attend de moi', 'prendre du recul'],
    xEn: ['take the lead', 'adjust to what is expected of me', 'step back'],
    yTitle: 'Quand ça va mal, je…', yTitleEn: 'When things go wrong, I…',
    y: ['vois le bon côté', 'mets mes émotions de côté pour régler le problème', 'réagis fort, j\'ai besoin que ça sorte'],
    yEn: ['look on the bright side', 'put my feelings aside to solve the problem', 'react strongly, I need to let it out'],
  },
  'adulte-obs': {
    subtitle: 'Placez le point là où votre proche se reconnaît le mieux',
    subtitleEn: 'Place the point where your loved one fits best',
    xTitle: 'Avec les autres, votre proche a tendance à…', xTitleEn: 'With other people, your loved one tends to…',
    x: ['prendre les devants', 's\'ajuster à ce qu\'on attend de sa part', 'prendre du recul'],
    xEn: ['take the lead', 'adjust to what is expected of them', 'step back'],
    yTitle: 'Quand ça va mal, votre proche…', yTitleEn: 'When things go wrong, your loved one…',
    y: ['voit le bon côté', 'met ses émotions de côté pour régler le problème', 'réagit fort, a besoin que ça sorte'],
    yEn: ['looks on the bright side', 'puts their feelings aside to solve the problem', 'reacts strongly, needs to let it out'],
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
