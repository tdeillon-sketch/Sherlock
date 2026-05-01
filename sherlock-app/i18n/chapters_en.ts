// ═══════════════════════════════════════════════════════════════
//  EN TRANSLATIONS — Book chapters (CHAPTERS content)
//  Mirrors the FR content in constants/data.ts CHAPTERS.
//  Used by Home and Chapter detail pages when locale === 'en'.
// ═══════════════════════════════════════════════════════════════

export interface PartEn {
  part: string;
  chapters: ChapterEn[];
}

export interface ChapterEn {
  num: number | string;
  title: string;
  quote: string;
  desc: string;
  keyPoints: string[];
  reflections: string[];
}

export const CHAPTERS_EN: PartEn[] = [
  {
    part: 'Part One — The most beautiful work in the world',
    chapters: [
      {
        num: 1,
        title: "The only animal that doesn't know how to raise its young",
        quote: '"Man is the measure of all things" — Protagoras',
        desc: "Humans are the only living beings not biologically programmed to raise their young. Everything must be built. This freedom is dizzying: no instruction manual, no instinct dictating what to do. That's the starting point of this book — accepting that being a parent means moving forward without a map.",
        keyPoints: [
          'Humans are the only living beings without an innate program for raising their young',
          'Parenting is a permanent worksite, with no instruction manual',
          'Tuesday-night dinner as a sacred ritual of family connection',
          "The PGHM principle: roped together, you don't move forward until everyone is heard",
          "This book isn't a method but a personal account of an imperfect father",
        ],
        reflections: [
          'What is your greatest daily challenge as a parent?',
          'Do you have a family ritual that creates connection?',
          "What would you like to pass on that you didn't receive?",
        ],
      },
      {
        num: 2,
        title: 'The camel, the lion, and the child',
        quote: '"One must still have chaos in oneself to give birth to a dancing star." — Nietzsche',
        desc: "Inspired by Nietzsche's three metamorphoses. The camel carries the weight of inheritance, the lion rebels against the \"thou shalts,\" the child creates freely. As parents, we move through these phases: enduring what we received, freeing ourselves from it, then choosing what we want to pass on.",
        keyPoints: [
          "Nietzsche's three metamorphoses: camel (carrying the inheritance), lion (rebelling), child (creating freely)",
          'As parents, we move through these phases: enduring what we received, freeing ourselves, choosing what to pass on',
          'The Enneagram as a map of personality, not a box',
          'Each type sees the world through a different filter — the "lenses"',
          'The importance of self-knowledge before wanting to educate',
        ],
        reflections: [
          'Which metamorphosis are you in today: camel, lion, or child?',
          'What family inheritance have you consciously chosen to pass on?',
          'Do you know your own Enneagram type?',
          "How do your \"lenses\" differ from your child's?",
        ],
      },
      {
        num: 3,
        title: "You don't choose your family (but you build it)",
        quote: '"Tell me how you love, and I\'ll tell you what kind of society you build."',
        desc: 'Every family is a society in miniature with its laws, power dynamics, and implicit values. This chapter explores how to consciously build the family system rather than simply enduring it.',
        keyPoints: [
          'Every family is a society in miniature with its laws and implicit values',
          'The "monster in the basement" concept: our unconscious defense mechanisms',
          'Three monsters: the crow (inner critic), the camel (overload), the fox (avoidance)',
          'Naming the monster = beginning to disarm it',
          "When you yell at your child, it's often the monster speaking",
        ],
        reflections: [
          'What is your main "monster": the crow, the camel, or the fox?',
          'In what situations does your monster take over?',
          'How do you react when you\'re tired and your child needs you?',
          'Can you name a recent time when your reaction was disproportionate?',
        ],
      },
    ],
  },
  {
    part: 'Part Two — Open your eyes',
    chapters: [
      {
        num: 4,
        title: 'Nine ways of seeing the world',
        quote: '"Know thyself." — Temple of Delphi',
        desc: "An introduction to the Enneagram: nine ways of seeing the world, nine different lenses. Your child and you may not have the same lens. That's where misunderstandings live — not malice, just two worlds that don't speak the same language.",
        keyPoints: [
          'Each child has their own inner logic and emotional survival mechanism',
          'The Enneagram describes 9 fundamental ways of perceiving the world',
          'A child is not a miniature version of the parent',
          "Misunderstandings come from two worlds that don't speak the same language",
          "Don't project your own type onto your children",
        ],
        reflections: [
          'How does your child perceive the world differently from you?',
          'Have you ever projected your own expectations onto your child?',
          'What recurring misunderstanding exists between you and your child?',
        ],
      },
      {
        num: 5,
        title: 'What speaks when you yell',
        quote: '"What you do not bring to consciousness comes back to you as fate." — Jung',
        desc: 'Exploring your shadow zones. When we yell at our children, it\'s often our own wound speaking. This chapter invites you to identify your "monster" — that part of shadow within us that, once acknowledged, can become a strength.',
        keyPoints: [
          "When you yell, it's often your own wound speaking — not education",
          "Jung's shadow work applied to parenting",
          'Each type\'s core values guide parenting decisions',
          'Value conflicts within a couple are normal — understanding them changes everything',
          "The importance of understanding the other's values before judging them",
        ],
        reflections: [
          'What personal wound gets reactivated when you yell?',
          "Do you know your partner's non-negotiable values?",
          'On what topic do your parenting values diverge most?',
          "How do you react when your child touches one of your deep values?",
        ],
      },
      {
        num: 6,
        title: "What can't be negotiated",
        quote: '"There is no favorable wind for the sailor who doesn\'t know where they\'re going." — Seneca',
        desc: "Defining your non-negotiable values as a parent. Not arbitrary rules, but an inner compass. It's by exploring your monster that you discover your values — the energy is the same, just channeled differently.",
        keyPoints: [
          "Gary Chapman's 5 love languages applied to parenting",
          'Each child has a dominant love language: words, time, gifts, service, touch',
          "Parents often give love in THEIR language, not the child's",
          'The Enneagram × love languages crossover for finer understanding',
          'Love is not a feeling but a decision and an intentional act',
        ],
        reflections: [
          'What is your dominant love language?',
          "What is your child's?",
          "Do you give love in your language or in your child's?",
          "How could you \"translate\" your love into your child's language?",
        ],
      },
    ],
  },
  {
    part: 'Part Three — What holds when everything trembles',
    chapters: [
      {
        num: 7,
        title: 'The hardest verb',
        quote: '"Love is patient, love is kind..." — 1 Corinthians 13',
        desc: "What is love? Not a feeling, but a verb. A choice. A demand. This chapter defines parental love as a deliberate, daily, difficult act — not as a spontaneous emotion.",
        keyPoints: [
          'Love is not a spontaneous feeling but a verb — a daily choice',
          "Winnicott's \"good-enough parent\" concept",
          'Parenting is not a performance but a relationship',
          'The difference between loving and loving well',
          'Family robustness comes from the quality of bonds, not individual strength',
        ],
        reflections: [
          'Are you trying to be a perfect parent or a "good-enough" parent?',
          'When does parental love become hardest for you?',
          'How do you concretely show your love day-to-day?',
        ],
      },
      {
        num: 8,
        title: 'What the forest knows and monoculture ignores',
        quote: '"The oak that didn\'t bend in the wind broke. The reed bends and never breaks." — La Fontaine',
        desc: "Robustness inspired by the living world, drawing on the work of Olivier Hamant. A diverse forest is more resilient than a monoculture. Likewise, a family that accepts its differences and imperfections weathers storms better.",
        keyPoints: [
          'Diversity is a strength, not a problem — like a mixed forest vs. a monoculture',
          'Family robustness comes from the diversity of profiles, not from uniformity',
          "Type difference within a couple is complementarity",
          'Wu Wei (Taoist wisdom): the art of not forcing',
          "The best parenting moments = when you didn't force anything",
        ],
        reflections: [
          'How does the diversity of profiles enrich your family?',
          "What trait of your child annoys you most? Could it be a strength?",
          'When have you let go and seen better results?',
          'Does your family look more like a mixed forest or a monoculture?',
        ],
      },
      {
        num: 9,
        title: 'What Laurent taught me',
        quote: '"To forgive is to set a prisoner free and discover that the prisoner was you." — Lewis B. Smedes',
        desc: 'Forgiveness as a foundational gesture. We will hurt those we love — through clumsiness, fatigue. Neither love nor robustness survives without this third gesture, the most difficult and the most decisive.',
        keyPoints: [
          'Forgiveness is the central act of family robustness',
          'The difference between apologizing (softening) and asking forgiveness (acknowledging)',
          'Forgiving oneself is the hardest',
          'Parental guilt is a silent monster',
          "Forgiveness is where self-knowledge and love-of-the-other meet",
        ],
        reflections: [
          'When did you last ask your child for forgiveness?',
          "Is there something you haven't yet forgiven yourself for as a parent?",
          'Do you distinguish between apologizing and asking forgiveness?',
          'How could forgiveness transform a tense family relationship?',
        ],
      },
    ],
  },
  {
    part: 'Part Four — Learning to watch them go',
    chapters: [
      {
        num: 10,
        title: 'The hand we let go',
        quote: '"The child is the future of humankind." — Gaston Bachelard',
        desc: "The final chapter is about letting go. As children grow up, the parent must learn to release the hand they've been holding. All the tools in this book — the profiles, the monsters, the values, love — are forged in childhood to prepare for that moment.",
        keyPoints: [
          'Adolescence is a metamorphosis, not a crisis',
          'The lion emerges in the teen: the "I want" against the "you must"',
          "Understanding the teen's type to adapt your parental response",
          'Becoming useless: the ultimate paradox of parenting',
          "The work succeeds when you're no longer needed — when the child can fly",
        ],
        reflections: [
          "How are you handling your child's growing need for autonomy?",
          'What is the hardest thing to "let go" in your role as a parent?',
          'What do you hope your child will retain from their childhood?',
          'Are you ready to become "useless"?',
        ],
      },
    ],
  },
  {
    part: 'Annex',
    chapters: [
      {
        num: 'A',
        title: 'The Enneagram in daily life',
        quote: '',
        desc: "A detailed guide to the nine Enneagram profiles, adapted to children by age range (5-8, 8-12, 13-16). With a quiz, complete portraits, integration and disintegration mechanics, and three companion keys for each type.",
        keyPoints: [
          'The 9 types in detail with portraits by age range',
          "Practical quiz to identify your child's profile",
          'Integration and disintegration mechanics',
          '3 concrete companion keys for each type',
          'The wings concept: nuances between neighboring types',
        ],
        reflections: [
          'Did you recognize your child in one of the 9 portraits?',
          'Which profile surprised you most?',
          'Which companion keys will you try this week?',
        ],
      },
    ],
  },
];

// Helper: find a chapter by num across all parts
export function findChapterEn(num: string | number): ChapterEn | undefined {
  for (const part of CHAPTERS_EN) {
    const found = part.chapters.find((c) => String(c.num) === String(num));
    if (found) return found;
  }
  return undefined;
}
