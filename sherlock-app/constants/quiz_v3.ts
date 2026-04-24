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
  nick: string;
  color: string;
  fear: string;
  motive: string;
  compul: string;
  wing: [EnneaType, EnneaType];
  stress: EnneaType;
  integ: EnneaType;
}

export const TYPES: Record<EnneaType, TypeInfo> = {
  1: { name: 'Le Perfectionniste', nick: 'Perfectionniste', color: '#c0713a',
       fear: 'Être mauvais, corrompu, défectueux.',
       motive: 'Agir avec intégrité, améliorer le monde.',
       compul: 'Le ressentiment et la rigidité morale — un juge intérieur qui note tout.',
       wing: [9, 2], stress: 4, integ: 7 },
  2: { name: 'L\'Altruiste', nick: 'Le Généreux', color: '#d49155',
       fear: 'Être indigne d\'amour, ne pas être désiré.',
       motive: 'Aimer et être aimé.',
       compul: 'L\'orgueil caché sous l\'aide — donner pour devenir indispensable.',
       wing: [1, 3], stress: 8, integ: 4 },
  3: { name: 'Le Battant', nick: 'Le Gagneur', color: '#d4a24a',
       fear: 'Être sans valeur, un échec.',
       motive: 'Réussir, être admiré.',
       compul: 'La tromperie de soi — vivre derrière un masque de réussite.',
       wing: [2, 4], stress: 9, integ: 6 },
  4: { name: 'Le Romantique', nick: 'L\'Individualiste', color: '#9b8cb8',
       fear: 'Être insignifiant, ordinaire, sans identité propre.',
       motive: 'Trouver et exprimer sa vérité unique.',
       compul: 'L\'envie du manque — la mélancolie comme preuve de profondeur.',
       wing: [3, 5], stress: 2, integ: 1 },
  5: { name: 'L\'Observateur', nick: 'L\'Investigateur', color: '#5b8db8',
       fear: 'Être submergé, vidé de ses ressources internes.',
       motive: 'Comprendre, être compétent.',
       compul: 'L\'avarice de soi — retenir temps, énergie, émotions.',
       wing: [4, 6], stress: 7, integ: 8 },
  6: { name: 'Le Loyaliste', nick: 'Le Prudent', color: '#6b8ec4',
       fear: 'Être sans soutien, sans orientation.',
       motive: 'Se sentir en sécurité et soutenu.',
       compul: 'La peur et le doute permanent — anticiper tous les scénarios.',
       wing: [5, 7], stress: 3, integ: 9 },
  7: { name: 'L\'Épicurien', nick: 'L\'Enthousiaste', color: '#7abf8e',
       fear: 'Être piégé dans la souffrance ou la privation.',
       motive: 'Vivre pleinement, multiplier les découvertes.',
       compul: 'La gourmandise — fuir la douleur dans la multiplication des options.',
       wing: [6, 8], stress: 1, integ: 5 },
  8: { name: 'Le Chef', nick: 'Le Challenger', color: '#d66a5c',
       fear: 'Être contrôlé, dominé, blessé.',
       motive: 'Rester maître de sa vie et de son destin.',
       compul: 'La luxure de contrôle — la force pour masquer la vulnérabilité.',
       wing: [7, 9], stress: 5, integ: 2 },
  9: { name: 'Le Médiateur', nick: 'Le Pacificateur', color: '#b8a48a',
       fear: 'Être en conflit, perdre la paix intérieure.',
       motive: 'Vivre en paix, en harmonie avec tous.',
       compul: 'La paresse de soi — s\'endormir à ses propres désirs pour maintenir l\'harmonie.',
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
  txt: string;      // phrase
  dim: StmtDimension;
}

export interface WingStatement {
  id: string;
  wingOf: EnneaType;  // type dont c'est l'aile
  wingType: EnneaType; // type adjacent testé
  e: string;
  txt: string;
}

// ────────────────────────────────────────────────────────────────
//  POOL ADULTE (1re personne — auto-évaluation)
// ────────────────────────────────────────────────────────────────

const STATEMENTS_ADULTE: Statement[] = [
  // T1
  { id:'s1a_ad', t:1, e:'🔍', txt:'Je remarque automatiquement ce qui pourrait être mieux fait autour de moi', dim:'behavior' },
  { id:'s1b_ad', t:1, e:'📏', txt:'J\'ai une petite voix intérieure qui critique beaucoup ce que je fais', dim:'voice' },
  { id:'s1c_ad', t:1, e:'🔒', txt:'Je réprime mes pulsions — je me discipline, je me contrôle', dim:'compul' },
  { id:'s1d_ad', t:1, e:'😤', txt:'Quand c\'est mal fait ou injuste, ça me pèse physiquement', dim:'body' },
  { id:'s1e_ad', t:1, e:'⚖️', txt:'J\'ai un sens aigu de ce qui devrait être — la réalité me déçoit souvent', dim:'belief' },
  { id:'s1f_ad', t:1, e:'✅', txt:'J\'ai du mal à lâcher prise sur les détails — je vérifie, je retouche', dim:'behavior' },
  // T2
  { id:'s2a_ad', t:2, e:'💞', txt:'Je sens immédiatement quand quelqu\'un va mal, avant même qu\'il ne parle', dim:'attunement' },
  { id:'s2b_ad', t:2, e:'🤲', txt:'J\'anticipe les besoins des autres avant les miens', dim:'behavior' },
  { id:'s2c_ad', t:2, e:'🚫', txt:'J\'ai du mal à dire non sans me sentir coupable', dim:'shadow' },
  { id:'s2d_ad', t:2, e:'😞', txt:'Ça me blesse qu\'on ne reconnaisse pas tout ce que je fais pour les autres', dim:'shadow' },
  { id:'s2e_ad', t:2, e:'🔗', txt:'Je cherche à me rendre indispensable à certaines personnes', dim:'compul' },
  { id:'s2f_ad', t:2, e:'🧭', txt:'Je sais parfois mieux ce dont les autres ont besoin qu\'eux-mêmes', dim:'belief' },
  // T3
  { id:'s3a_ad', t:3, e:'🎯', txt:'Je m\'adapte à ce qu\'on attend de moi pour performer et briller', dim:'compul' },
  { id:'s3b_ad', t:3, e:'📉', txt:'L\'échec visible me terrifie plus que l\'échec privé', dim:'fear' },
  { id:'s3c_ad', t:3, e:'🎭', txt:'Je suis très conscient de l\'image que je projette', dim:'behavior' },
  { id:'s3d_ad', t:3, e:'⏭️', txt:'Je mets mes émotions en pause pour avancer efficacement', dim:'shadow' },
  { id:'s3e_ad', t:3, e:'🏅', txt:'Ma valeur personnelle est liée à mes accomplissements visibles', dim:'belief' },
  { id:'s3f_ad', t:3, e:'⚙️', txt:'Je peux fonctionner en mode pilote automatique productif même épuisé', dim:'stress' },
  // T4
  { id:'s4a_ad', t:4, e:'🫥', txt:'Je me sens souvent différent, à part — étranger au monde ordinaire', dim:'identity' },
  { id:'s4b_ad', t:4, e:'🌫️', txt:'Il me manque quelque chose d\'essentiel que les autres semblent avoir', dim:'fear' },
  { id:'s4c_ad', t:4, e:'🎨', txt:'Mon monde émotionnel intérieur est intense, coloré, parfois excessif', dim:'emotion' },
  { id:'s4d_ad', t:4, e:'🌙', txt:'Je suis attiré par ce qui est beau, rare, mélancolique, authentique', dim:'aesthetic' },
  { id:'s4e_ad', t:4, e:'🌑', txt:'Le banal, la routine, le quotidien me pèsent profondément', dim:'shadow' },
  { id:'s4f_ad', t:4, e:'🎭', txt:'Je cultive mes états d\'âme — ils font partie de ma richesse', dim:'compul' },
  // T5
  { id:'s5a_ad', t:5, e:'🔋', txt:'J\'ai besoin de beaucoup plus de solitude que la plupart des gens pour me recharger', dim:'behavior' },
  { id:'s5b_ad', t:5, e:'🔬', txt:'Je préfère observer et comprendre avant de m\'engager dans l\'action', dim:'behavior' },
  { id:'s5c_ad', t:5, e:'🏰', txt:'Je protège mon temps et mon énergie comme des ressources rares', dim:'compul' },
  { id:'s5d_ad', t:5, e:'🧠', txt:'Je me coupe émotionnellement pour protéger mon énergie — je reste dans ma tête', dim:'shadow' },
  { id:'s5e_ad', t:5, e:'📚', txt:'Je peux rester des heures dans mes idées sans m\'ennuyer, seul', dim:'behavior' },
  { id:'s5f_ad', t:5, e:'📡', txt:'Les demandes émotionnelles intenses des autres m\'épuisent vite', dim:'stress' },
  // T6
  { id:'s6a_ad', t:6, e:'⚠️', txt:'J\'imagine spontanément ce qui pourrait mal tourner dans une situation', dim:'voice' },
  { id:'s6b_ad', t:6, e:'📋', txt:'Je vérifie, re-vérifie, par précaution — je veux être préparé', dim:'behavior' },
  { id:'s6c_ad', t:6, e:'❓', txt:'Je doute souvent de mes propres décisions, je cherche l\'avis des autres', dim:'shadow' },
  { id:'s6d_ad', t:6, e:'🛡️', txt:'J\'ai besoin d\'un cadre, de règles, de gens fiables autour de moi', dim:'motive' },
  { id:'s6e_ad', t:6, e:'🔎', txt:'Je teste les gens avant de leur faire pleinement confiance', dim:'behavior' },
  { id:'s6f_ad', t:6, e:'🤝', txt:'Je suis loyal : une fois engagé, je reste au long cours', dim:'motive' },
  // T7
  { id:'s7a_ad', t:7, e:'✨', txt:'Mes envies se multiplient vite — je passe d\'une idée excitante à une autre', dim:'behavior' },
  { id:'s7b_ad', t:7, e:'😊', txt:'J\'évite instinctivement la douleur et l\'inconfort', dim:'compul' },
  { id:'s7c_ad', t:7, e:'🎪', txt:'J\'ai souvent plusieurs plans en parallèle — je jongle', dim:'behavior' },
  { id:'s7d_ad', t:7, e:'☀️', txt:'Je transforme les obstacles en opportunités, les problèmes en possibilités', dim:'belief' },
  { id:'s7e_ad', t:7, e:'🔗', txt:'L\'ennui et la routine me sont insupportables', dim:'fear' },
  { id:'s7f_ad', t:7, e:'🥂', txt:'Je suis optimiste — je vois le verre à moitié plein par défaut', dim:'belief' },
  // T8
  { id:'s8a_ad', t:8, e:'⚡', txt:'Je prends spontanément les rênes quand personne ne décide', dim:'behavior' },
  { id:'s8b_ad', t:8, e:'💬', txt:'Je dis les choses franchement, sans filtre', dim:'behavior' },
  { id:'s8c_ad', t:8, e:'👁️', txt:'Je sens d\'instinct les rapports de force dans une pièce', dim:'attunement' },
  { id:'s8d_ad', t:8, e:'🦁', txt:'Je protège férocement les miens — personne ne touche à eux sans moi', dim:'motive' },
  { id:'s8e_ad', t:8, e:'⛓️', txt:'Être dirigé, contrôlé, limité me donne physiquement envie de résister', dim:'fear' },
  { id:'s8f_ad', t:8, e:'👑', txt:'Quand je me sens bien et en confiance, j\'agis avec force — naturellement', dim:'integ' },
  // T9
  { id:'s9a_ad', t:9, e:'🕊️', txt:'Je cherche l\'harmonie, même au prix de mes propres désirs', dim:'compul' },
  { id:'s9b_ad', t:9, e:'💤', txt:'Je procrastine sur ce qui compte vraiment pour moi', dim:'shadow' },
  { id:'s9c_ad', t:9, e:'🌊', txt:'Je me fonds facilement dans l\'environnement, je m\'adapte aux autres', dim:'behavior' },
  { id:'s9d_ad', t:9, e:'☮️', txt:'J\'évite les conflits ouverts autant que possible', dim:'compul' },
  { id:'s9e_ad', t:9, e:'🤷', txt:'Je mets du temps à savoir ce que MOI je veux vraiment', dim:'shadow' },
  { id:'s9f_ad', t:9, e:'☁️', txt:'Je m\'anesthésie parfois dans la routine — je me désinvestis de moi', dim:'stress' },
];

// ────────────────────────────────────────────────────────────────
//  POOLS ENFANTS (3e personne — parent observe l'enfant)
//  Draft initial — à affiner. Phrases courtes, comportements observables.
// ────────────────────────────────────────────────────────────────

const STATEMENTS_5_8: Statement[] = [
  // T1 — petit·e juge : exigence, morale, contrôle
  { id:'s1a_58', t:1, e:'🔍', txt:'Il/elle remarque quand un dessin, un rangement, une tâche n\'est pas "bien faite"', dim:'behavior' },
  { id:'s1b_58', t:1, e:'📏', txt:'Il/elle recommence une activité jusqu\'à ce qu\'elle soit parfaite (ou abandonne, frustré·e)', dim:'voice' },
  { id:'s1c_58', t:1, e:'🔒', txt:'Il/elle se discipline spontanément : range sans qu\'on le dise, respecte les règles', dim:'compul' },
  { id:'s1d_58', t:1, e:'😤', txt:'Il/elle s\'énerve visiblement face à une tricherie, même mineure', dim:'body' },
  { id:'s1e_58', t:1, e:'⚖️', txt:'Il/elle a déjà ses propres règles morales ("on fait pas ça", "c\'est pas bien")', dim:'belief' },
  { id:'s1f_58', t:1, e:'✅', txt:'Il/elle prend très à cœur une réprimande, peut pleurer longtemps', dim:'behavior' },
  // T2 — petit cœur : cadeaux, aide, attachement
  { id:'s2a_58', t:2, e:'💞', txt:'Il/elle console spontanément un camarade qui pleure', dim:'attunement' },
  { id:'s2b_58', t:2, e:'🤲', txt:'Il/elle offre ses jouets, partage son goûter, aime faire plaisir', dim:'behavior' },
  { id:'s2c_58', t:2, e:'🚫', txt:'Il/elle fait des dessins et des cadeaux pour les gens qu\'il/elle aime', dim:'shadow' },
  { id:'s2d_58', t:2, e:'😞', txt:'Il/elle boude si on ne remarque pas ce qu\'il/elle a fait pour vous', dim:'shadow' },
  { id:'s2e_58', t:2, e:'🔗', txt:'Il/elle veut être votre "meilleur·e ami·e" ou votre "aide préféré·e"', dim:'compul' },
  { id:'s2f_58', t:2, e:'🧭', txt:'Il/elle repère quand vous êtes fatigué·e ou triste, vient vous câliner', dim:'belief' },
  // T3 — petit champion : performance, reconnaissance
  { id:'s3a_58', t:3, e:'🎯', txt:'Il/elle adore être félicité·e, applaudi·e, mis·e en avant', dim:'compul' },
  { id:'s3b_58', t:3, e:'📉', txt:'Il/elle a très peur de perdre, de rater, d\'être mal classé·e', dim:'fear' },
  { id:'s3c_58', t:3, e:'🎭', txt:'Il/elle adapte son comportement selon les adultes, pour plaire à chacun', dim:'behavior' },
  { id:'s3d_58', t:3, e:'⏭️', txt:'Il/elle aime montrer ce qu\'il/elle sait faire (spectacle, démo)', dim:'shadow' },
  { id:'s3e_58', t:3, e:'🏅', txt:'Les médailles, bons points, étoiles le/la motivent énormément', dim:'belief' },
  { id:'s3f_58', t:3, e:'⚙️', txt:'Il/elle est rapide, efficace, veut toujours finir avant les autres', dim:'stress' },
  // T4 — petit poète : intensité émotionnelle, imaginaire
  { id:'s4a_58', t:4, e:'🫥', txt:'Il/elle se sent souvent "pas comme les autres" dans le groupe', dim:'identity' },
  { id:'s4b_58', t:4, e:'🌫️', txt:'Il/elle a des moments de tristesse sans cause apparente', dim:'fear' },
  { id:'s4c_58', t:4, e:'🎨', txt:'Ses émotions sont fortes, il/elle passe vite du rire aux larmes', dim:'emotion' },
  { id:'s4d_58', t:4, e:'🌙', txt:'Il/elle a un monde imaginaire très développé (personnages, histoires, rituels)', dim:'aesthetic' },
  { id:'s4e_58', t:4, e:'🌑', txt:'Il/elle peut bouder longtemps, se replier dans sa chambre', dim:'shadow' },
  { id:'s4f_58', t:4, e:'🎭', txt:'Il/elle dramatise les petites contrariétés, théâtralise ses sentiments', dim:'compul' },
  // T5 — petit savant : retrait, observation, curiosité intellectuelle
  { id:'s5a_58', t:5, e:'🔋', txt:'Il/elle aime jouer seul·e longtemps, a besoin de temps calme pour ne pas s\'épuiser', dim:'behavior' },
  { id:'s5b_58', t:5, e:'🔬', txt:'Il/elle observe longuement avant de participer à un nouveau jeu', dim:'behavior' },
  { id:'s5c_58', t:5, e:'🏰', txt:'Il/elle protège ses jouets, son espace : "c\'est à moi, n\'y touche pas"', dim:'compul' },
  { id:'s5d_58', t:5, e:'🧠', txt:'Il/elle n\'aime pas les gros câlins prolongés, préfère la distance physique', dim:'shadow' },
  { id:'s5e_58', t:5, e:'📚', txt:'Il/elle pose des questions précises sur "comment ça marche"', dim:'behavior' },
  { id:'s5f_58', t:5, e:'📡', txt:'Les groupes bruyants, les fêtes, l\'école l\'épuisent vite', dim:'stress' },
  // T6 — petit prudent : anticipation, fidélité
  { id:'s6a_58', t:6, e:'⚠️', txt:'Il/elle pose beaucoup de questions "et si…" (et si on perd, et si ça arrive)', dim:'voice' },
  { id:'s6b_58', t:6, e:'📋', txt:'Il/elle a besoin de rituels rassurants (histoire du soir, doudou, ordre des choses)', dim:'behavior' },
  { id:'s6c_58', t:6, e:'❓', txt:'Il/elle hésite, redemande, cherche confirmation avant de décider', dim:'shadow' },
  { id:'s6d_58', t:6, e:'🛡️', txt:'Il/elle aime les règles claires, sait qui fait quoi dans la famille', dim:'motive' },
  { id:'s6e_58', t:6, e:'🔎', txt:'Il/elle observe longuement les nouvelles personnes avant de leur parler', dim:'behavior' },
  { id:'s6f_58', t:6, e:'🤝', txt:'Il/elle est très attaché·e à ses meilleurs amis, à sa famille, à ses repères', dim:'motive' },
  // T7 — petit aventurier : mouvement, enthousiasme, évitement
  { id:'s7a_58', t:7, e:'✨', txt:'Il/elle passe très vite d\'une activité à une autre, commence tout sans finir', dim:'behavior' },
  { id:'s7b_58', t:7, e:'😊', txt:'Il/elle veut tout faire, déteste attendre, s\'ennuie vite', dim:'compul' },
  { id:'s7c_58', t:7, e:'🎪', txt:'Il/elle a toujours plein d\'idées, raconte des histoires farfelues', dim:'behavior' },
  { id:'s7d_58', t:7, e:'☀️', txt:'Il/elle rebondit vite après une contrariété, oublie le problème', dim:'belief' },
  { id:'s7e_58', t:7, e:'🔗', txt:'Les punitions longues, les corvées, les attentes lui pèsent énormément', dim:'fear' },
  { id:'s7f_58', t:7, e:'🥂', txt:'C\'est un·e enfant enthousiaste, rieur·se, toujours en mouvement', dim:'belief' },
  // T8 — petit chef : force, protection, opposition à l\'autorité
  { id:'s8a_58', t:8, e:'⚡', txt:'Il/elle prend la tête dans les jeux de groupe, organise les autres', dim:'behavior' },
  { id:'s8b_58', t:8, e:'💬', txt:'Il/elle dit "non" haut et fort, ne se laisse pas intimider', dim:'behavior' },
  { id:'s8c_58', t:8, e:'👁️', txt:'Il/elle défie l\'autorité adulte quand il/elle juge que c\'est injuste', dim:'attunement' },
  { id:'s8d_58', t:8, e:'🦁', txt:'Il/elle défend ses copains plus faibles, s\'interpose dans les bagarres', dim:'motive' },
  { id:'s8e_58', t:8, e:'⛓️', txt:'Il/elle déteste être commandé·e, réagit fort aux ordres directs', dim:'fear' },
  { id:'s8f_58', t:8, e:'👑', txt:'Il/elle a une présence physique forte, une énergie marquée', dim:'integ' },
  // T9 — petit sage : adaptation, évitement du conflit
  { id:'s9a_58', t:9, e:'🕊️', txt:'Il/elle est facile, accommodant·e, suit ce que le groupe propose', dim:'compul' },
  { id:'s9b_58', t:9, e:'💤', txt:'Il/elle traîne pour se mettre à une activité, met du temps à démarrer', dim:'shadow' },
  { id:'s9c_58', t:9, e:'🌊', txt:'Il/elle s\'adapte à ce qu\'on lui propose, rarement opposant·e', dim:'behavior' },
  { id:'s9d_58', t:9, e:'☮️', txt:'Il/elle fuit les disputes, pleure ou se met à l\'écart quand ça crie', dim:'compul' },
  { id:'s9e_58', t:9, e:'🤷', txt:'Quand on lui demande ce qu\'il/elle veut, il/elle dit "je sais pas"', dim:'shadow' },
  { id:'s9f_58', t:9, e:'☁️', txt:'Il/elle peut rester longtemps devant un écran, comme "absent·e"', dim:'stress' },
];

const STATEMENTS_9_12: Statement[] = [
  // T1 — exigence, sens du juste, perfectionnisme scolaire
  { id:'s1a_912', t:1, e:'🔍', txt:'Il/elle repère les erreurs, corrige volontiers les adultes quand ils se trompent', dim:'behavior' },
  { id:'s1b_912', t:1, e:'📏', txt:'Il/elle est perfectionniste sur ses devoirs : efface, refait, soigne', dim:'voice' },
  { id:'s1c_912', t:1, e:'🔒', txt:'Il/elle s\'en veut beaucoup quand il/elle rate une évaluation', dim:'compul' },
  { id:'s1d_912', t:1, e:'😤', txt:'Les tricheurs, les menteurs le/la révoltent particulièrement', dim:'body' },
  { id:'s1e_912', t:1, e:'⚖️', txt:'Il/elle a un avis tranché sur ce qui est juste à l\'école, à la maison', dim:'belief' },
  { id:'s1f_912', t:1, e:'✅', txt:'Il/elle supporte mal qu\'on lui fasse des reproches — se justifie longuement', dim:'behavior' },
  // T2 — aide, attention aux autres, besoin de reconnaissance
  { id:'s2a_912', t:2, e:'💞', txt:'Il/elle est attentionné·e avec ses copains, écoute leurs soucis', dim:'attunement' },
  { id:'s2b_912', t:2, e:'🤲', txt:'Il/elle aime rendre service à l\'école (ramasser les cahiers, aider)', dim:'behavior' },
  { id:'s2c_912', t:2, e:'🚫', txt:'Il/elle a du mal à dire non à un ami, quitte à s\'oublier', dim:'shadow' },
  { id:'s2d_912', t:2, e:'😞', txt:'Il/elle est blessé·e si on oublie de le/la remercier', dim:'shadow' },
  { id:'s2e_912', t:2, e:'🔗', txt:'Il/elle cherche à être "le/la préféré·e" d\'un prof, d\'un adulte', dim:'compul' },
  { id:'s2f_912', t:2, e:'🧭', txt:'Il/elle propose spontanément son aide avant qu\'on lui demande', dim:'belief' },
  // T3 — adaptation sociale, compétition, image
  { id:'s3a_912', t:3, e:'🎯', txt:'Il/elle change de style, d\'attitude selon le groupe où il/elle est', dim:'compul' },
  { id:'s3b_912', t:3, e:'📉', txt:'Il/elle a très peur de rater publiquement (exposé, compétition)', dim:'fear' },
  { id:'s3c_912', t:3, e:'🎭', txt:'Il/elle fait attention à son image — coiffure, vêtements, photos', dim:'behavior' },
  { id:'s3d_912', t:3, e:'⏭️', txt:'Il/elle minimise ses difficultés pour "rester dans la course"', dim:'shadow' },
  { id:'s3e_912', t:3, e:'🏅', txt:'Les notes, les classements, les médailles comptent énormément', dim:'belief' },
  { id:'s3f_912', t:3, e:'⚙️', txt:'Il/elle mène plusieurs activités / compétitions de front', dim:'stress' },
  // T4 — sensibilité intense, sentiment d\'unicité
  { id:'s4a_912', t:4, e:'🫥', txt:'Il/elle se sent décalé·e, souvent incompris·e par les autres enfants', dim:'identity' },
  { id:'s4b_912', t:4, e:'🌫️', txt:'Il/elle a des moments mélancoliques sans cause évidente', dim:'fear' },
  { id:'s4c_912', t:4, e:'🎨', txt:'Ses émotions sont intenses — il/elle les exprime par l\'art, l\'écriture', dim:'emotion' },
  { id:'s4d_912', t:4, e:'🌙', txt:'Il/elle est attiré·e par ce qui est original, rare, un peu hors norme', dim:'aesthetic' },
  { id:'s4e_912', t:4, e:'🌑', txt:'Il/elle supporte mal la banalité, cherche l\'intensité dans ses relations', dim:'shadow' },
  { id:'s4f_912', t:4, e:'🎭', txt:'Il/elle a quelques amis très proches plutôt qu\'une grande bande', dim:'compul' },
  // T5 — solitude, passion approfondie, retenue
  { id:'s5a_912', t:5, e:'🔋', txt:'Il/elle passe beaucoup de temps seul·e dans sa chambre, c\'est son besoin', dim:'behavior' },
  { id:'s5b_912', t:5, e:'🔬', txt:'Il/elle observe avant de parler, rarement le/la premier·ère à réagir', dim:'behavior' },
  { id:'s5c_912', t:5, e:'🏰', txt:'Il/elle protège son espace, ses objets — n\'aime pas qu\'on y touche', dim:'compul' },
  { id:'s5d_912', t:5, e:'🧠', txt:'Il/elle exprime peu ses émotions, reste discret·e sur son intériorité', dim:'shadow' },
  { id:'s5e_912', t:5, e:'📚', txt:'Il/elle a une passion qu\'il/elle approfondit énormément (livres, jeu, thème)', dim:'behavior' },
  { id:'s5f_912', t:5, e:'📡', txt:'Les sollicitations sociales denses l\'épuisent visiblement', dim:'stress' },
  // T6 — anticipation, doute, loyauté
  { id:'s6a_912', t:6, e:'⚠️', txt:'Il/elle imagine les scénarios qui peuvent mal tourner, prépare des plans B', dim:'voice' },
  { id:'s6b_912', t:6, e:'📋', txt:'Il/elle vérifie plusieurs fois (sa sacoche, ses devoirs, la porte fermée)', dim:'behavior' },
  { id:'s6c_912', t:6, e:'❓', txt:'Il/elle doute de ses choix, demande confirmation à un adulte', dim:'shadow' },
  { id:'s6d_912', t:6, e:'🛡️', txt:'Il/elle a besoin de règles claires, d\'adultes fiables, d\'un cadre stable', dim:'motive' },
  { id:'s6e_912', t:6, e:'🔎', txt:'Il/elle teste ses amis avant de leur confier quelque chose d\'important', dim:'behavior' },
  { id:'s6f_912', t:6, e:'🤝', txt:'Il/elle est très loyal·e — reste avec ses vrais amis, même contre le groupe', dim:'motive' },
  // T7 — enthousiasme, multiplicité, évitement
  { id:'s7a_912', t:7, e:'✨', txt:'Il/elle s\'enthousiasme pour mille choses, papillonne d\'un intérêt à l\'autre', dim:'behavior' },
  { id:'s7b_912', t:7, e:'😊', txt:'Il/elle fuit l\'ennui à tout prix, supporte mal les moments calmes', dim:'compul' },
  { id:'s7c_912', t:7, e:'🎪', txt:'Il/elle a plusieurs projets / passions en parallèle', dim:'behavior' },
  { id:'s7d_912', t:7, e:'☀️', txt:'Il/elle transforme les contrariétés en opportunités, rebondit vite', dim:'belief' },
  { id:'s7e_912', t:7, e:'🔗', txt:'Les longues contraintes, les corvées le/la font fuir mentalement', dim:'fear' },
  { id:'s7f_912', t:7, e:'🥂', txt:'Il/elle a un humour qui détend, un optimisme naturel', dim:'belief' },
  // T8 — leadership, franchise, opposition
  { id:'s8a_912', t:8, e:'⚡', txt:'Il/elle prend le lead dans son groupe, tranche dans les désaccords', dim:'behavior' },
  { id:'s8b_912', t:8, e:'💬', txt:'Il/elle dit ce qu\'il/elle pense franchement, sans filtre', dim:'behavior' },
  { id:'s8c_912', t:8, e:'👁️', txt:'Il/elle teste l\'autorité des adultes, remet en question les règles', dim:'attunement' },
  { id:'s8d_912', t:8, e:'🦁', txt:'Il/elle défend farouchement son territoire, ses amis, sa fratrie', dim:'motive' },
  { id:'s8e_912', t:8, e:'⛓️', txt:'Il/elle résiste frontalement aux ordres directs', dim:'fear' },
  { id:'s8f_912', t:8, e:'👑', txt:'Il/elle a une énergie qui impressionne ses camarades', dim:'integ' },
  // T9 — paix, adaptation, procrastination
  { id:'s9a_912', t:9, e:'🕊️', txt:'Il/elle recherche la paix, évite les prises de position conflictuelles', dim:'compul' },
  { id:'s9b_912', t:9, e:'💤', txt:'Il/elle procrastine les devoirs, attend la dernière minute', dim:'shadow' },
  { id:'s9c_912', t:9, e:'🌊', txt:'Il/elle s\'adapte au groupe, suit plus qu\'il/elle n\'initie', dim:'behavior' },
  { id:'s9d_912', t:9, e:'☮️', txt:'Il/elle fuit les disputes, se met en retrait ou fait l\'arbitre', dim:'compul' },
  { id:'s9e_912', t:9, e:'🤷', txt:'Il/elle a du mal à exprimer ses envies propres — "ça dépend"', dim:'shadow' },
  { id:'s9f_912', t:9, e:'☁️', txt:'Il/elle s\'isole dans ses écrans, sa musique, quand c\'est tendu', dim:'stress' },
];

const STATEMENTS_13_17: Statement[] = [
  // T1 — engagement moral, autocritique, contenance
  { id:'s1a_1317', t:1, e:'🔍', txt:'Il/elle est engagé·e sur des causes qui lui tiennent à cœur (justice, écologie)', dim:'behavior' },
  { id:'s1b_1317', t:1, e:'📏', txt:'Il/elle est très exigeant·e avec lui-même/elle-même, peu satisfait·e de ce qu\'il/elle rend', dim:'voice' },
  { id:'s1c_1317', t:1, e:'🔒', txt:'Il/elle contient ses émotions, les exprime par des remarques pointues', dim:'compul' },
  { id:'s1d_1317', t:1, e:'😤', txt:'Il/elle critique les incohérences des adultes, remet en cause les autorités injustes', dim:'body' },
  { id:'s1e_1317', t:1, e:'⚖️', txt:'Il/elle a un idéal moral strict, voit le monde en "bien / mal"', dim:'belief' },
  { id:'s1f_1317', t:1, e:'✅', txt:'Il/elle supporte mal d\'être pris·e en défaut, de montrer une faiblesse', dim:'behavior' },
  // T2 — empathie, investissement relationnel, difficulté à poser des limites
  { id:'s2a_1317', t:2, e:'💞', txt:'Il/elle est "la personne confidente" — les autres se confient à lui/elle', dim:'attunement' },
  { id:'s2b_1317', t:2, e:'🤲', txt:'Il/elle s\'investit dans l\'associatif, le bénévolat, l\'humanitaire', dim:'behavior' },
  { id:'s2c_1317', t:2, e:'🚫', txt:'Il/elle a du mal à poser des limites — se fait parfois exploiter', dim:'shadow' },
  { id:'s2d_1317', t:2, e:'😞', txt:'Il/elle peut être rancunier·ère si on minimise son engagement pour les autres', dim:'shadow' },
  { id:'s2e_1317', t:2, e:'🔗', txt:'Il/elle s\'accroche à certaines amitiés de façon exclusive', dim:'compul' },
  { id:'s2f_1317', t:2, e:'🧭', txt:'Il/elle anticipe activement les besoins de ses proches', dim:'belief' },
  // T3 — image publique, performance, ambition
  { id:'s3a_1317', t:3, e:'🎯', txt:'Il/elle soigne son image publique, son profil sur les réseaux sociaux', dim:'compul' },
  { id:'s3b_1317', t:3, e:'📉', txt:'Échouer à un examen, en public, le/la hante plus que tout', dim:'fear' },
  { id:'s3c_1317', t:3, e:'🎭', txt:'Il/elle s\'adapte à chaque groupe social pour y avoir sa place', dim:'behavior' },
  { id:'s3d_1317', t:3, e:'⏭️', txt:'Il/elle met ses difficultés émotionnelles en pause pour avancer', dim:'shadow' },
  { id:'s3e_1317', t:3, e:'🏅', txt:'Sa valeur est liée à ses résultats scolaires, sportifs ou sociaux', dim:'belief' },
  { id:'s3f_1317', t:3, e:'⚙️', txt:'Il/elle enchaîne projets, jobs, compétitions sans vraiment s\'arrêter', dim:'stress' },
  // T4 — singularité revendiquée, intensité, esthétique
  { id:'s4a_1317', t:4, e:'🫥', txt:'Il/elle se sent profondément différent·e, à part', dim:'identity' },
  { id:'s4b_1317', t:4, e:'🌫️', txt:'Il/elle traverse des phases existentielles, se questionne sur le sens', dim:'fear' },
  { id:'s4c_1317', t:4, e:'🎨', txt:'Ses émotions sont centrales, il/elle vit par elles, les assume pleinement', dim:'emotion' },
  { id:'s4d_1317', t:4, e:'🌙', txt:'Il/elle cultive un style personnel marqué (musique, vêtements, esthétique)', dim:'aesthetic' },
  { id:'s4e_1317', t:4, e:'🌑', txt:'Il/elle supporte mal la routine, a besoin d\'intensité, de beau, de sens', dim:'shadow' },
  { id:'s4f_1317', t:4, e:'🎭', txt:'Il/elle s\'exprime par l\'art, la musique, l\'écriture — sensibilité revendiquée', dim:'compul' },
  // T5 — solitude, expertise, retrait émotionnel
  { id:'s5a_1317', t:5, e:'🔋', txt:'Il/elle a besoin de beaucoup plus de solitude que ses pairs', dim:'behavior' },
  { id:'s5b_1317', t:5, e:'🔬', txt:'Il/elle observe, analyse avant de s\'engager — peu impulsif·ve', dim:'behavior' },
  { id:'s5c_1317', t:5, e:'🏰', txt:'Il/elle protège farouchement sa vie privée, ses secrets', dim:'compul' },
  { id:'s5d_1317', t:5, e:'🧠', txt:'Il/elle reste dans sa tête, semble parfois distant·e émotionnellement', dim:'shadow' },
  { id:'s5e_1317', t:5, e:'📚', txt:'Il/elle approfondit ses centres d\'intérêt à un niveau quasi-expert', dim:'behavior' },
  { id:'s5f_1317', t:5, e:'📡', txt:'Les situations socialement denses l\'épuisent, il/elle s\'en retire', dim:'stress' },
  // T6 — anticipation, préparation, loyauté groupe
  { id:'s6a_1317', t:6, e:'⚠️', txt:'Il/elle anticipe les problèmes, envisage les pires scénarios', dim:'voice' },
  { id:'s6b_1317', t:6, e:'📋', txt:'Il/elle se prépare à fond pour les examens, les événements importants', dim:'behavior' },
  { id:'s6c_1317', t:6, e:'❓', txt:'Il/elle doute de ses décisions, sollicite l\'avis de sa bande', dim:'shadow' },
  { id:'s6d_1317', t:6, e:'🛡️', txt:'Il/elle rejette les autorités incohérentes, cherche des figures solides', dim:'motive' },
  { id:'s6e_1317', t:6, e:'🔎', txt:'Il/elle teste longuement les gens avant de leur faire confiance', dim:'behavior' },
  { id:'s6f_1317', t:6, e:'🤝', txt:'Il/elle est farouchement loyal·e à son groupe d\'amis proches', dim:'motive' },
  // T7 — multiplicité, évitement, optimisme
  { id:'s7a_1317', t:7, e:'✨', txt:'Il/elle enchaîne les projets, les passions, les envies', dim:'behavior' },
  { id:'s7b_1317', t:7, e:'😊', txt:'Il/elle évite les sujets difficiles, pivote vers le positif', dim:'compul' },
  { id:'s7c_1317', t:7, e:'🎪', txt:'Il/elle mène plusieurs choses de front — études, amis, loisirs', dim:'behavior' },
  { id:'s7d_1317', t:7, e:'☀️', txt:'Il/elle reframe les galères en aventures, optimiste naturel', dim:'belief' },
  { id:'s7e_1317', t:7, e:'🔗', txt:'L\'ennui, la routine, les contraintes longues l\'étouffent vite', dim:'fear' },
  { id:'s7f_1317', t:7, e:'🥂', txt:'C\'est un·e ado sociable, joyeux·se, avec un réseau large', dim:'belief' },
  // T8 — leadership, franchise, défi de l\'autorité
  { id:'s8a_1317', t:8, e:'⚡', txt:'Il/elle est un·e leader naturel·le dans son groupe, influence les décisions', dim:'behavior' },
  { id:'s8b_1317', t:8, e:'💬', txt:'Il/elle assume ses désaccords, dit les choses cash', dim:'behavior' },
  { id:'s8c_1317', t:8, e:'👁️', txt:'Il/elle défie les figures d\'autorité qu\'il/elle juge illégitimes', dim:'attunement' },
  { id:'s8d_1317', t:8, e:'🦁', txt:'Il/elle défend férocement ses proches, ne laisse rien passer', dim:'motive' },
  { id:'s8e_1317', t:8, e:'⛓️', txt:'Il/elle supporte très mal d\'être dirigé·e, encadré·e', dim:'fear' },
  { id:'s8f_1317', t:8, e:'👑', txt:'Il/elle a une présence charismatique, une force physique assumée', dim:'integ' },
  // T9 — harmonie, adaptation, difficulté à se positionner
  { id:'s9a_1317', t:9, e:'🕊️', txt:'Il/elle cherche l\'harmonie, évite les positions tranchées', dim:'compul' },
  { id:'s9b_1317', t:9, e:'💤', txt:'Il/elle procrastine ses travaux, ses choix d\'orientation', dim:'shadow' },
  { id:'s9c_1317', t:9, e:'🌊', txt:'Il/elle s\'adapte aux différents groupes, se fond facilement', dim:'behavior' },
  { id:'s9d_1317', t:9, e:'☮️', txt:'Il/elle fuit les conflits ouverts, se mure dans le silence', dim:'compul' },
  { id:'s9e_1317', t:9, e:'🤷', txt:'Il/elle a du mal à savoir ce qu\'il/elle veut vraiment pour son avenir', dim:'shadow' },
  { id:'s9f_1317', t:9, e:'☁️', txt:'Il/elle se noie dans les écrans, les séries, pour oublier les tensions', dim:'stress' },
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
  { id:'w1_9_ad', wingOf:1, wingType:9, e:'🌙', txt:'Mon exigence s\'exprime plus dans la contemplation calme que dans l\'expression verbale' },
  { id:'w1_2_ad', wingOf:1, wingType:2, e:'🤲', txt:'Mon exigence s\'exprime à travers le soin que je porte aux autres' },
  { id:'w2_1_ad', wingOf:2, wingType:1, e:'⚖️', txt:'J\'aide par devoir moral — c\'est juste de le faire, je peux être critique sinon' },
  { id:'w2_3_ad', wingOf:2, wingType:3, e:'✨', txt:'J\'aime l\'image de quelqu\'un qui aide, qui est socialement visible' },
  { id:'w3_2_ad', wingOf:3, wingType:2, e:'❤️', txt:'Mon succès inclut d\'être aimé et apprécié, pas seulement admiré' },
  { id:'w3_4_ad', wingOf:3, wingType:4, e:'🎭', txt:'Derrière ma performance, j\'ai un côté introspectif, parfois mélancolique' },
  { id:'w4_3_ad', wingOf:4, wingType:3, e:'🏆', txt:'Mon unicité s\'exprime AUSSI par des accomplissements visibles' },
  { id:'w4_5_ad', wingOf:4, wingType:5, e:'🏰', txt:'Ma singularité est surtout intérieure — je préfère la solitude pour la cultiver' },
  { id:'w5_4_ad', wingOf:5, wingType:4, e:'🌌', txt:'Mon monde intellectuel a une dimension esthétique, imaginative' },
  { id:'w5_6_ad', wingOf:5, wingType:6, e:'🔎', txt:'Je teste les gens avant de leur faire confiance — mon analyse a une teinte de méfiance' },
  { id:'w6_5_ad', wingOf:6, wingType:5, e:'📚', txt:'Mes inquiétudes passent par beaucoup d\'analyse et de réflexion' },
  { id:'w6_7_ad', wingOf:6, wingType:7, e:'🎉', txt:'Je décharge mes anxiétés dans l\'activité sociale, le mouvement' },
  { id:'w7_6_ad', wingOf:7, wingType:6, e:'🤝', txt:'Mon goût pour la nouveauté coexiste avec de la loyauté, de la responsabilité' },
  { id:'w7_8_ad', wingOf:7, wingType:8, e:'⚡', txt:'Mon énergie est assertive — je veux faire, construire, prendre les choses en main' },
  { id:'w8_7_ad', wingOf:8, wingType:7, e:'🎢', txt:'Mon énergie de chef est doublée d\'un appétit pour le nouveau, l\'aventure' },
  { id:'w8_9_ad', wingOf:8, wingType:9, e:'🌾', txt:'Je prends les rênes avec calme — force tranquille plutôt qu\'agressive' },
  { id:'w9_8_ad', wingOf:9, wingType:8, e:'🦁', txt:'Mon calme est ancré dans une présence physique solide' },
  { id:'w9_1_ad', wingOf:9, wingType:1, e:'📏', txt:'Mon besoin de paix s\'accompagne d\'un sens du devoir, de l\'ordre' },
];

// 5-8 : phrases courtes, comportements très concrets
const WING_5_8: WingStatement[] = [
  { id:'w1_9_58', wingOf:1, wingType:9, e:'🌙', txt:'Il/elle est exigeant·e mais discret·ète, surveille sans faire de bruit' },
  { id:'w1_2_58', wingOf:1, wingType:2, e:'🤲', txt:'Son exigence est chaleureuse : il/elle aide les copains à bien faire' },
  { id:'w2_1_58', wingOf:2, wingType:1, e:'⚖️', txt:'Il/elle aide par principe et reproche quand c\'est "mal fait"' },
  { id:'w2_3_58', wingOf:2, wingType:3, e:'✨', txt:'Il/elle aime être vu·e comme serviable, être le/la "chouchou" de la maîtresse' },
  { id:'w3_2_58', wingOf:3, wingType:2, e:'❤️', txt:'Sa réussite inclut d\'être aimé·e et pas juste admiré·e' },
  { id:'w3_4_58', wingOf:3, wingType:4, e:'🎭', txt:'Derrière l\'éclat, il/elle a un côté rêveur·se, parfois mélancolique' },
  { id:'w4_3_58', wingOf:4, wingType:3, e:'🏆', txt:'Il/elle veut qu\'on voie sa singularité — ses créations, ses dessins' },
  { id:'w4_5_58', wingOf:4, wingType:5, e:'🏰', txt:'Sa sensibilité est surtout intérieure, cultivée seul·e dans sa chambre' },
  { id:'w5_4_58', wingOf:5, wingType:4, e:'🌌', txt:'Son monde intérieur a un côté imaginaire, artistique, poétique' },
  { id:'w5_6_58', wingOf:5, wingType:6, e:'🔎', txt:'Il/elle observe longuement les nouveaux avant d\'aller vers eux' },
  { id:'w6_5_58', wingOf:6, wingType:5, e:'📚', txt:'Ses inquiétudes passent par beaucoup de questions et d\'observations' },
  { id:'w6_7_58', wingOf:6, wingType:7, e:'🎉', txt:'Ses anxiétés se calment dans le jeu, l\'activité avec les autres' },
  { id:'w7_6_58', wingOf:7, wingType:6, e:'🤝', txt:'Son enthousiasme est doublé d\'un fort attachement à ses copains' },
  { id:'w7_8_58', wingOf:7, wingType:8, e:'⚡', txt:'Son énergie est forte, il/elle prend les choses en main dans le jeu' },
  { id:'w8_7_58', wingOf:8, wingType:7, e:'🎢', txt:'Son leadership cherche toujours de nouveaux jeux, de l\'aventure' },
  { id:'w8_9_58', wingOf:8, wingType:9, e:'🌾', txt:'Il/elle prend la place mais avec un calme tranquille' },
  { id:'w9_8_58', wingOf:9, wingType:8, e:'🦁', txt:'Son calme est ancré physiquement, il/elle tient le sol' },
  { id:'w9_1_58', wingOf:9, wingType:1, e:'📏', txt:'Son besoin de paix est doublé d\'un sens des règles' },
];

// 9-12 : vocabulaire un peu plus nuancé, contexte scolaire/groupe
const WING_9_12: WingStatement[] = [
  { id:'w1_9_912', wingOf:1, wingType:9, e:'🌙', txt:'Son exigence s\'exprime plus par l\'observation silencieuse que par la parole' },
  { id:'w1_2_912', wingOf:1, wingType:2, e:'🤲', txt:'Son exigence inclut de veiller sur les autres, de les pousser vers le mieux' },
  { id:'w2_1_912', wingOf:2, wingType:1, e:'⚖️', txt:'Il/elle aide par devoir — et peut faire remarquer ce qui ne va pas' },
  { id:'w2_3_912', wingOf:2, wingType:3, e:'✨', txt:'Il/elle aime l\'image de quelqu\'un de populaire et de serviable' },
  { id:'w3_2_912', wingOf:3, wingType:2, e:'❤️', txt:'Sa performance inclut d\'être aimé·e — pas seulement admiré·e' },
  { id:'w3_4_912', wingOf:3, wingType:4, e:'🎭', txt:'Derrière la performance, il/elle a un côté introspectif, parfois triste' },
  { id:'w4_3_912', wingOf:4, wingType:3, e:'🏆', txt:'Il/elle veut être reconnu·e pour sa singularité, ses créations' },
  { id:'w4_5_912', wingOf:4, wingType:5, e:'🏰', txt:'Sa sensibilité est surtout intérieure, il/elle garde sa bulle' },
  { id:'w5_4_912', wingOf:5, wingType:4, e:'🌌', txt:'Son monde intellectuel a un côté imaginatif, artistique, esthétique' },
  { id:'w5_6_912', wingOf:5, wingType:6, e:'🔎', txt:'Il/elle teste longuement avant de faire confiance, reste méfiant·e' },
  { id:'w6_5_912', wingOf:6, wingType:5, e:'📚', txt:'Il/elle gère ses inquiétudes par l\'analyse, la réflexion' },
  { id:'w6_7_912', wingOf:6, wingType:7, e:'🎉', txt:'Il/elle décharge ses anxiétés dans l\'activité sociale, le mouvement' },
  { id:'w7_6_912', wingOf:7, wingType:6, e:'🤝', txt:'Son enthousiasme s\'accompagne de loyauté envers ses proches' },
  { id:'w7_8_912', wingOf:7, wingType:8, e:'⚡', txt:'Son énergie est assertive, il/elle prend les choses en main' },
  { id:'w8_7_912', wingOf:8, wingType:7, e:'🎢', txt:'Son leadership est doublé d\'un goût pour le nouveau, l\'aventure' },
  { id:'w8_9_912', wingOf:8, wingType:9, e:'🌾', txt:'Il/elle prend les rênes avec calme, pas avec agressivité' },
  { id:'w9_8_912', wingOf:9, wingType:8, e:'🦁', txt:'Son calme est ancré dans une présence physique solide' },
  { id:'w9_1_912', wingOf:9, wingType:1, e:'📏', txt:'Son besoin de paix s\'accompagne d\'un sens du devoir silencieux' },
];

// 13-17 : proche de l\'adulte, en 3e personne
const WING_13_17: WingStatement[] = [
  { id:'w1_9_1317', wingOf:1, wingType:9, e:'🌙', txt:'Son exigence s\'exprime dans la contemplation plutôt que dans la parole' },
  { id:'w1_2_1317', wingOf:1, wingType:2, e:'🤲', txt:'Son exigence s\'exprime via le soin porté aux autres, pour les faire grandir' },
  { id:'w2_1_1317', wingOf:2, wingType:1, e:'⚖️', txt:'Il/elle aide par devoir moral, peut être critique si ça ne l\'est pas' },
  { id:'w2_3_1317', wingOf:2, wingType:3, e:'✨', txt:'Il/elle aime l\'image de quelqu\'un qui aide, socialement visible et apprécié·e' },
  { id:'w3_2_1317', wingOf:3, wingType:2, e:'❤️', txt:'Son succès inclut d\'être aimé·e et apprécié·e, pas seulement admiré·e de loin' },
  { id:'w3_4_1317', wingOf:3, wingType:4, e:'🎭', txt:'Derrière sa performance, il/elle a un côté introspectif, en quête de sens unique' },
  { id:'w4_3_1317', wingOf:4, wingType:3, e:'🏆', txt:'Il/elle veut être reconnu·e pour sa singularité — pas ignoré·e' },
  { id:'w4_5_1317', wingOf:4, wingType:5, e:'🏰', txt:'Sa singularité est surtout intérieure, cultivée dans la solitude' },
  { id:'w5_4_1317', wingOf:5, wingType:4, e:'🌌', txt:'Son monde intellectuel a une dimension esthétique, ses obsessions sont singulières' },
  { id:'w5_6_1317', wingOf:5, wingType:6, e:'🔎', txt:'Il/elle teste les gens avant de leur faire confiance, analyse avec méfiance' },
  { id:'w6_5_1317', wingOf:6, wingType:5, e:'📚', txt:'Ses inquiétudes passent par beaucoup d\'analyse, il/elle approfondit avant d\'agir' },
  { id:'w6_7_1317', wingOf:6, wingType:7, e:'🎉', txt:'Il/elle décharge ses anxiétés dans l\'activité sociale, a besoin des autres autour' },
  { id:'w7_6_1317', wingOf:7, wingType:6, e:'🤝', txt:'Son goût pour la nouveauté coexiste avec de la loyauté et de la responsabilité' },
  { id:'w7_8_1317', wingOf:7, wingType:8, e:'⚡', txt:'Son énergie est assertive — il/elle veut faire, construire, obtenir' },
  { id:'w8_7_1317', wingOf:8, wingType:7, e:'🎢', txt:'Son leadership est doublé d\'un appétit pour le nouveau, le stimulant' },
  { id:'w8_9_1317', wingOf:8, wingType:9, e:'🌾', txt:'Il/elle prend les rênes avec un calme intérieur, force tranquille' },
  { id:'w9_8_1317', wingOf:9, wingType:8, e:'🦁', txt:'Son calme est ancré dans une présence physique solide, peut basculer en force' },
  { id:'w9_1_1317', wingOf:9, wingType:1, e:'📏', txt:'Son besoin de paix s\'accompagne d\'exigences morales silencieuses' },
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
