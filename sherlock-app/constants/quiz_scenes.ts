// ═══════════════════════════════════════════════════════════════
//  QUIZ SCENES — Habillage immersif des questions (AXE 1)
//  Mappé par mode et index. Si pas de scène, l'UI tombe en mode
//  question simple (back-compat).
// ═══════════════════════════════════════════════════════════════

import { QuizMode } from './data';

export interface QuizScene {
  icon: string;       // big emoji at the top
  setup: string;      // 1-3 sentences setting the scene
}

// ── 20 scènes pour le mode ENFANT (parent répond pour son enfant) ──
const SCENES_ENFANT: QuizScene[] = [
  {
    icon: '🎒',
    setup: "C'est mercredi, 16h30. Votre enfant rentre de l'école, pose son cartable, et a deux heures totalement libres devant lui. Personne ne lui dit quoi faire."
  },
  {
    icon: '📝',
    setup: "Votre enfant rentre avec un contrôle raté. Il ouvre son cahier, voit la note, et son visage se ferme. Il ne dit rien."
  },
  {
    icon: '👫',
    setup: "Vendredi soir, anniversaire d'un copain. Tout le monde est dans le jardin, ça chante, ça court. Vous observez votre enfant à distance."
  },
  {
    icon: '😢',
    setup: "Sa meilleure amie vient d'arriver à la maison en pleurant — son grand-père est gravement malade. Votre enfant est dans la pièce, témoin de la scène."
  },
  {
    icon: '⚖️',
    setup: "Dans la cour de récréation, deux copains se disputent violemment. Votre enfant les voit. La maîtresse n'a rien remarqué."
  },
  {
    icon: '🛏️',
    setup: "Vous entrez dans la chambre de votre enfant un samedi matin, comme ça, sans prévenir."
  },
  {
    icon: '🚫',
    setup: "Votre enfant veut absolument aller chez un copain ce week-end. Vous lui dites non — vous avez des raisons valables, mais lui ne les comprend pas vraiment."
  },
  {
    icon: '😔',
    setup: "Quelque chose ne va pas. Vous le sentez. Votre enfant a passé la journée dans sa bulle. Quand vous lui demandez ce qu'il a, il vous regarde, hésite..."
  },
  {
    icon: '😡',
    setup: "Vous voyez votre enfant exploser. Très fort. Pour une raison qui vous semble disproportionnée. Vous attendez que ça redescende."
  },
  {
    icon: '🌙',
    setup: "C'est l'heure du coucher. La lumière est éteinte. Votre enfant a quelque chose qui lui fait peur — un cauchemar récent, un truc à l'école, une histoire entendue."
  },
  {
    icon: '✨',
    setup: "Vous avez 5 minutes seul avec votre enfant. Vous lui demandez : « Si tu pouvais devenir vraiment fort dans une chose, ce serait laquelle ? » Il réfléchit."
  },
  {
    icon: '💪',
    setup: "Vous échangez avec un autre parent, qui vous demande sincèrement : « Et votre enfant, c'est quoi sa grande force ? » Vous prenez une seconde."
  },
  {
    icon: '🎭',
    setup: "Vous repensez à comment votre enfant est dans la vie de tous les jours. Sa façon d'être au monde, sans filtre, sans se forcer."
  },
  {
    icon: '📏',
    setup: "Quand vous posez une règle (heure du coucher, écrans, devoirs), comment votre enfant réagit habituellement ?"
  },
  {
    icon: '👥',
    setup: "Vous observez votre enfant dans sa vie sociale au fil des semaines. Anniversaires, école, voisinage, sport..."
  },
  {
    icon: '💔',
    setup: "Votre enfant rate quelque chose qui comptait pour lui — un examen, une compétition, un casting. Le soir, comment se passe la soirée ?"
  },
  {
    icon: '💧',
    setup: "Quand votre enfant ressent une émotion forte (joie, peine, colère), qu'est-ce qui se voit de l'extérieur ?"
  },
  {
    icon: '🤝',
    setup: "Dans un groupe (cousins, copains, équipe sportive), votre enfant se positionne naturellement plutôt comme :"
  },
  {
    icon: '🌪️',
    setup: "Quand quelque chose stresse votre enfant (contrôle, événement, changement), sa réaction typique :"
  },
  {
    icon: '🌟',
    setup: "Au fond, ce qui anime votre enfant — la chose qu'il cherche dans la vie, sans toujours pouvoir la nommer :"
  },
];

// ── 20 scènes pour le mode ADO (l'ado répond, tutoiement) ──
const SCENES_ADO: QuizScene[] = [
  {
    icon: '🎒',
    setup: "Vendredi 17h, t'as fini les cours. T'as ton week-end devant toi, rien de prévu. Personne te demande rien."
  },
  {
    icon: '📝',
    setup: "T'as une note vraiment décevante en maths. Tu rentres chez toi, tu vois cette note dans ton bulletin..."
  },
  {
    icon: '🍕',
    setup: "Soirée pizza chez un pote, vous êtes sept. Toi, t'es plutôt..."
  },
  {
    icon: '😔',
    setup: "Ton meilleur(e) ami(e) te dit en sortant des cours qu'il/elle vient de se faire larguer. Il/elle craque, là, devant toi."
  },
  {
    icon: '⚡',
    setup: "Dans ton groupe d'amis, deux personnes se sont engueulées violemment. Ça met tout le monde mal à l'aise. Toi, tu fais quoi ?"
  },
  {
    icon: '🛏️',
    setup: "Ta chambre, là, tout de suite, sans tricher : c'est plutôt..."
  },
  {
    icon: '🚫',
    setup: "Tes parents te disent non sur quelque chose que tu voulais vraiment (sortie, achat, voyage). Ta réaction immédiate :"
  },
  {
    icon: '🌑',
    setup: "T'as un truc qui te plombe depuis quelques jours. Tu le portes seul(e). Quand on te demande ce qui ne va pas..."
  },
  {
    icon: '🤬',
    setup: "Quand tu pètes vraiment un câble (ça arrive à tout le monde), c'est généralement pour..."
  },
  {
    icon: '😨',
    setup: "T'as une vraie peur — pas une peur d'enfant, une peur de jeune adulte (avenir, échec, jugement). Comment tu fais avec ?"
  },
  {
    icon: '🚀',
    setup: "Si tu te projettes dans 10 ans, ce qui te ferait le plus kiffer ce serait..."
  },
  {
    icon: '💎',
    setup: "Si tu devais te décrire avec une vraie qualité, pas une banalité, qu'est-ce que tu choisirais ?"
  },
  {
    icon: '🎨',
    setup: "Ta façon d'être au monde, ce qui te ressemble vraiment, c'est plutôt :"
  },
  {
    icon: '📜',
    setup: "Avec les règles (parents, profs, lois en général) : t'as quel genre de relation ?"
  },
  {
    icon: '📸',
    setup: "Sur ton compte Insta/Snap/TikTok, ton entourage te perçoit comment ?"
  },
  {
    icon: '💔',
    setup: "Tu rates quelque chose d'important pour toi (asso, exam, sport, audition). Le soir, dans ton lit, qu'est-ce qui se passe ?"
  },
  {
    icon: '💧',
    setup: "Quand t'as une émotion forte, ça se voit ?"
  },
  {
    icon: '👥',
    setup: "Dans un groupe (amis, asso, sport, classe), t'as tendance à te placer comment ?"
  },
  {
    icon: '🌪️',
    setup: "Le stress, t'en fais quoi ?"
  },
  {
    icon: '⭐',
    setup: "Ce qui te fait te sentir VIVANT(e), au fond — pas ce qui devrait, ce qui te fait :"
  },
];

// ── 20 scènes pour le mode ADULTE (vouvoiement) ──
const SCENES_ADULTE: QuizScene[] = [
  {
    icon: '🍷',
    setup: "Vendredi 19h, fin d'une semaine intense. Vous avez le choix entre sortir avec des amis, rester seul(e) à lire, ou faire un truc créatif."
  },
  {
    icon: '📊',
    setup: "Au boulot, vous présentez un projet auquel vous tenez. Le client/manager fait un retour critique. Votre première réaction intérieure :"
  },
  {
    icon: '🍾',
    setup: "Vous arrivez à un évènement social où vous ne connaissez quasi personne. Vous restez 2 heures. Comment ça se passe ?"
  },
  {
    icon: '🤝',
    setup: "Un proche vous appelle, en larmes, parce qu'il/elle traverse quelque chose de très dur. Vous êtes au téléphone. Comment vous êtes ?"
  },
  {
    icon: '⚖️',
    setup: "Vous êtes témoin d'une vraie injustice — au boulot, en société, en famille. Vous avez le choix d'agir ou de laisser passer."
  },
  {
    icon: '🏠',
    setup: "Quelqu'un visite votre logement à l'improviste. État réel des lieux, sans vous mentir :"
  },
  {
    icon: '🛑',
    setup: "Quelqu'un vous dit non sur quelque chose qui compte pour vous — un projet refusé, une demande rejetée. Votre mode par défaut :"
  },
  {
    icon: '🌒',
    setup: "Une période sombre. Vous portez une vraie peine ou un vrai stress depuis plusieurs jours. Vous croisez vos proches, qui demandent comment ça va."
  },
  {
    icon: '🔥',
    setup: "Quand quelque chose vous met VRAIMENT en colère (ça arrive à tout le monde), c'est généralement parce que :"
  },
  {
    icon: '😰',
    setup: "Une vraie peur d'adulte (avenir, santé, finance, relation). Comment vous faites avec, dans la vraie vie ?"
  },
  {
    icon: '🌅',
    setup: "Si on vous donnait totalement carte blanche pour les 5 prochaines années — sans contrainte d'argent, de jugement, de responsabilités — ce que vous voudriez vivre :"
  },
  {
    icon: '💫',
    setup: "Si vous deviez nommer votre principale qualité — celle dont vous êtes secrètement fier(e) — ce serait :"
  },
  {
    icon: '🎯',
    setup: "Votre façon naturelle d'être au monde, sans masque, sans rôle social, c'est plutôt :"
  },
  {
    icon: '📐',
    setup: "Avec les règles, les normes, les conventions sociales : votre rapport est plutôt :"
  },
  {
    icon: '💼',
    setup: "Au travail, dans votre cercle, vos collègues vous perçoivent généralement comme :"
  },
  {
    icon: '⛅',
    setup: "Un échec significatif (pro ou perso) — pas un petit truc, un vrai. Le soir, qu'est-ce qui se passe en vous ?"
  },
  {
    icon: '🌊',
    setup: "Quand vous traversez une émotion forte (joie, peine, colère), ce que les autres en voient :"
  },
  {
    icon: '🏛️',
    setup: "Dans un groupe que vous découvrez (asso, équipe, soirée), votre placement spontané :"
  },
  {
    icon: '🌪️',
    setup: "Sous stress fort, votre mode automatique :"
  },
  {
    icon: '💎',
    setup: "Au fond, ce que vous cherchez à protéger ou à obtenir dans la vie — la chose qu'on n'avoue pas toujours :"
  },
];

// ── Map ──
const SCENES_BY_MODE: Record<QuizMode, QuizScene[]> = {
  enfant: SCENES_ENFANT,
  ado: SCENES_ADO,
  adulte: SCENES_ADULTE,
};

export function getScene(mode: QuizMode, questionIndex: number): QuizScene | null {
  const scenes = SCENES_BY_MODE[mode];
  return scenes[questionIndex] ?? null;
}
