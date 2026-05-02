// ═══════════════════════════════════════════════════════════════
//  EN TRANSLATIONS — Dossiers Sherlock / The Sherlock Files
//
//  Strategy: field-level fallback. Consumers do
//    DATA_EN[id]?.[field] ?? DATA_FR[id][field]
//  so missing entries gracefully fall back to French.
//
//  Coverage:
//   - RANKS_EN (5 rank titles)
//   - TYPE_NAMES_EN (9 Riso-Hudson type names)
//   - DOSSIER_META_EN (7 dossier titles + descs)
//   - FICHES_EN (45 suspect files × 5 translatable fields)
//   - CASES_EN (56 cases — explanation + format-specific fields)
//   - FUN_FACTS_EN (45 anecdotes)
// ═══════════════════════════════════════════════════════════════

// ── Ranks ─────────────────────────────────────────────────────
export const RANKS_EN: Record<number, string> = {
  0: 'Trainee',
  1: 'Inspector',
  2: 'Detective',
  3: 'Senior Detective',
  4: 'Sherlock',
};

// ── Type names (Riso-Hudson) ──────────────────────────────────
export const TYPE_NAMES_EN: Record<number, string> = {
  1: 'Reformer',
  2: 'Helper',
  3: 'Achiever',
  4: 'Individualist',
  5: 'Investigator',
  6: 'Loyalist',
  7: 'Enthusiast',
  8: 'Challenger',
  9: 'Peacemaker',
};

// ── Dossier metadata ──────────────────────────────────────────
export const DOSSIER_META_EN: Record<string, { title: string; desc: string }> = {
  visionnaires: { title: 'The Visionaries', desc: 'Scientists, philosophers & inventors' },
  artistes:     { title: 'The Artists',     desc: 'Musicians, painters & writers' },
  leaders:      { title: 'The Leaders',     desc: 'Politicians, entrepreneurs & activists' },
  icones:       { title: 'The Icons',       desc: 'Actors, athletes & pop figures' },
  fictifs:      { title: 'The Fictional Heroes', desc: 'Films, series & literature' },
  stars:        { title: 'The Stars',       desc: 'Big-screen, music & sports celebrities' },
  maitres:      { title: 'The Masters',     desc: 'Strategists, scientists & spiritual guides' },
};

// ── Fiche translations ────────────────────────────────────────
// Field-level fallback: if a field is missing, the FR original is used.
export interface FicheEn {
  name?: string;
  quote?: string;
  quoteSource?: string;
  coreFear?: string;
  coreDesire?: string;
  whyThisType?: string;
}

export const FICHES_EN: Record<string, FicheEn> = {
  // ── TYPE 1 — The Reformer ──
  mandela: {
    name: 'Nelson Mandela',
    quote: "I never lose. Either I win or I learn.",
    quoteSource: 'Long Walk to Freedom',
    coreFear: "Being corrupt, evil, or imperfect",
    coreDesire: "To be good, virtuous, and just",
    whyThisType: "Mandela devoted his life to an absolute moral ideal. His inner discipline, his ability to turn prison into a school of wisdom, and his refusal to compromise his values are the essence of Type 1.",
  },
  gandhi: {
    name: 'Gandhi',
    quote: "Be the change you want to see in the world.",
    quoteSource: 'Attributed',
    coreFear: "Being impure, hypocritical, or irresponsible",
    coreDesire: "To live in perfect alignment with one's values",
    whyThisType: "Gandhi embodied ethical rigor pushed to the extreme. His asceticism, his protest fasts, and his obsession with truth (satyagraha) are classic markers of Type 1.",
  },
  obama_michelle: {
    name: 'Michelle Obama',
    quote: "When they go low, we go high.",
    quoteSource: 'Democratic National Convention, 2016',
    coreFear: "Being criticized or seen as immoral",
    coreDesire: "To be a model of integrity for others",
    whyThisType: "Michelle Obama shows Type 1 through her personal discipline, high standards, sharp sense of duty, and ability to channel anger into constructive momentum.",
  },
  marie_curie: {
    name: 'Marie Curie',
    quote: "Nothing in life is to be feared, it is only to be understood.",
    quoteSource: 'Speech in Warsaw',
    coreFear: "Doing imperfect or sloppy work",
    coreDesire: "To reach absolute excellence in her work",
    whyThisType: "Marie Curie worked in dangerous conditions out of pure scientific ideal. Her obsessive methodological rigor, her principled refusal to patent her discoveries, and her self-demanding nature are Type 1 traits.",
  },
  confucius: {
    name: 'Confucius',
    quote: "Perfection is reachable for the one who never tires of self-improvement.",
    quoteSource: 'The Analects',
    coreFear: "Moral disorder and injustice",
    coreDesire: "To create an orderly, virtuous society",
    whyThisType: "Confucius built his entire philosophy on the moral perfecting of self and society. His insistence on rituals, self-discipline, and rectitude make him the archetype of Type 1.",
  },

  // ── TYPE 2 — The Helper ──
  diana: {
    name: 'Princess Diana',
    quote: "I want to be the queen of people's hearts.",
    quoteSource: 'BBC Panorama Interview, 1995',
    coreFear: "Being unloved, being rejected",
    coreDesire: "To feel loved through helping others",
    whyThisType: "Diana sought love through self-giving. Her humanitarian work, her intense need for emotional connection, and her suffering at royal rejection are deep expressions of Type 2.",
  },
  teresa: {
    name: 'Mother Teresa',
    quote: "If you judge people, you have no time to love them.",
    quoteSource: 'Come Be My Light',
    coreFear: "Being useless, serving no purpose",
    coreDesire: "To be indispensable through the love she gives",
    whyThisType: "Mother Teresa represents Type 2 in its holiest form. Her entire life in service of others, her need to be needed, and her inner doubts about her own worth reveal the heart of Type 2.",
  },
  oprah: {
    name: 'Oprah Winfrey',
    quote: "You get a car! You get a car! Everyone gets a car!",
    quoteSource: 'The Oprah Winfrey Show',
    coreFear: "Not being loved despite her generosity",
    coreDesire: "To be loved and admired by all",
    whyThisType: "Oprah embodies a healthy Type 2: she gives generously, builds powerful emotional bonds, and seeks to transform people's lives. Her exceptional empathy and need for connection are signature traits.",
  },
  elvis: {
    name: 'Elvis Presley',
    quote: "I don't recall asking for your opinion.",
    quoteSource: 'Attributed',
    coreFear: "Not being valued at his true worth",
    coreDesire: "To be unconditionally loved and adored",
    whyThisType: "Elvis had an intense need for approval that drove him to give endlessly to those around him. His excessive generosity, sensitivity to criticism, and emotional dependence reveal an unintegrated Type 2.",
  },
  pope_francis: {
    name: 'Pope Francis',
    quote: "Who am I to judge?",
    quoteSource: 'Press conference, 2013',
    coreFear: "Being seen as indifferent or cold-hearted",
    coreDesire: "To serve and stay close to human suffering",
    whyThisType: "Pope Francis revolutionized the Vatican by rejecting pomp and staying close to the poor. His humility, refusal to judge, and prioritization of the marginalized are Type 2 expressions.",
  },

  // ── TYPE 3 — The Achiever ──
  obama_barack: {
    name: 'Barack Obama',
    quote: "Yes, we can.",
    quoteSource: 'New Hampshire speech, 2008',
    coreFear: "Being seen as a failure, being worthless",
    coreDesire: "To succeed and be admired for his accomplishments",
    whyThisType: "Obama is Type 3 in its most accomplished form. His innate sense of personal branding, his ability to adapt his image to any audience, and his drive for success are strong markers.",
  },
  madonna: {
    name: 'Madonna',
    quote: "I am my own experiment.",
    quoteSource: 'Rolling Stone Interview',
    coreFear: "Being ordinary, going unnoticed",
    coreDesire: "To be number one, the absolute reference",
    whyThisType: "Madonna is the perfect example of Type 3: constant image reinvention, compulsive drive toward success, market adaptability, and identity built around accomplishments.",
  },
  taylor_swift: {
    name: 'Taylor Swift',
    quote: "Long story short, I survived.",
    quoteSource: 'Long Story Short (Evermore album)',
    coreFear: "Public failure, being forgotten",
    coreDesire: "To be recognized as the best in her field",
    whyThisType: "Taylor Swift shows Type 3: total control of her image, strategic reinventions with each album, resilience after setbacks, and ability to turn every hardship into commercial success.",
  },
  federer: {
    name: 'Roger Federer',
    quote: "I play to win. That's it.",
    quoteSource: 'Wimbledon press conference',
    coreFear: "Losing his champion status",
    coreDesire: "Excellence and universal recognition",
    whyThisType: "Federer embodies the elegance of Type 3: maximum efficiency, polished image, tactical adaptability, and a deep need to stay at the top. His perfect personal brand management is signature.",
  },
  elon: {
    name: 'Elon Musk',
    quote: "When something is important enough, you do it even if the odds are not in your favor.",
    quoteSource: 'Aeon interview',
    coreFear: "Failure, being outpaced by others",
    coreDesire: "To change the world AND be recognized for it",
    whyThisType: "Musk is a Type 3 under stress: success-driven to the extreme, constantly needing validation, prone to identifying with his projects and blurring the lines between himself and his companies.",
  },

  // ── TYPE 4 — The Individualist ──
  frida: {
    name: 'Frida Kahlo',
    quote: "I don't paint dreams. I paint my own reality.",
    quoteSource: "Frida Kahlo's Diary",
    coreFear: "Having no identity of one's own, being ordinary",
    coreDesire: "To find unique meaning, to be authentic",
    whyThisType: "Frida Kahlo is the archetype of Type 4. Her transformation of pain into art, her radically personal aesthetic, her quest for identity, and her ability to sublimate suffering are quintessentially Romantic.",
  },
  mj: {
    name: 'Michael Jackson',
    quote: "I'm beginning to believe that genius is childhood retrieved at will.",
    quoteSource: 'Moonwalk (autobiography)',
    coreFear: "Being ordinary, without meaning",
    coreDesire: "To be unique, incomparable",
    whyThisType: "Michael Jackson is a complex Type 4: his sense of being radically different since childhood, his bodily transformation as identity quest, his chronic melancholy, and his deeply personal art all bear witness.",
  },
  dylan: {
    name: 'Bob Dylan',
    quote: "I'm an artist, not an industry.",
    quoteSource: 'Rolling Stone interview, 1985',
    coreFear: "Losing his authenticity, being co-opted",
    coreDesire: "To express a unique inner truth",
    whyThisType: "Dylan embodies Type 4 in its artistic dimension: categorical refusal to conform to expectations, constant reinventions to stay authentic, and poetic melancholy running through his entire body of work.",
  },
  adele: {
    name: 'Adele',
    quote: "I sing for people who feel things deeply.",
    quoteSource: 'Vogue interview, 2021',
    coreFear: "That her pain might not be recognized",
    coreDesire: "To turn her emotions into something universal",
    whyThisType: "Adele is a flourishing Type 4: she turns personal sorrow into universal art. Her intense relationship with emotion, her quest for depth, and her ability to fully inhabit melancholy are classic traits.",
  },
  virginia: {
    name: 'Virginia Woolf',
    quote: "One cannot find peace by avoiding life.",
    quoteSource: 'Mrs Dalloway',
    coreFear: "Being inwardly empty, without depth",
    coreDesire: "To capture subjective reality in all its complexity",
    whyThisType: "Virginia Woolf is the literary Type 4 par excellence. Her stream of consciousness, constitutive melancholy, quest for feminine identity, and extreme sensitivity to atmospheres and emotions make her an emblematic Type 4.",
  },

  // ── TYPE 5 — The Investigator ──
  einstein: {
    name: 'Albert Einstein',
    quote: "Imagination is more important than knowledge.",
    quoteSource: 'Saturday Evening Post interview, 1929',
    coreFear: "Being incompetent, unable to understand",
    coreDesire: "To understand everything, to possess knowledge",
    whyThisType: "Einstein is the archetype of Type 5. His withdrawal from social life to immerse himself in abstract thought, his economy of social energy, and his way of living as observer rather than participant are the signs.",
  },
  hawking: {
    name: 'Stephen Hawking',
    quote: "Intelligence is the ability to adapt to change.",
    quoteSource: 'A Brief History of Time',
    coreFear: "That his brain might stop working",
    coreDesire: "To understand the fundamental laws of the universe",
    whyThisType: "Hawking embodied the resilience of Type 5: as illness took his body, he retreated even deeper into intellect. His entire life lived inside his head is the symbol of Type 5.",
  },
  tesla: {
    name: 'Nikola Tesla',
    quote: "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.",
    quoteSource: 'Attributed',
    coreFear: "Misunderstanding, lack of intellectual resources",
    coreDesire: "To unlock the mysteries of nature",
    whyThisType: "Tesla was an overloaded Type 5: he lived almost entirely in his head, fully visualized inventions before building them, avoided social ties, and accumulated knowledge as protection.",
  },
  gates: {
    name: 'Bill Gates',
    quote: "I choose a lazy person to do a hard job, because a lazy person will find an easy way to do it.",
    quoteSource: 'Attributed',
    coreFear: "Being outpaced, lacking information",
    coreDesire: "To master complex systems",
    whyThisType: "Gates is an integrated Type 5: his passion for systems, his analytical approach to philanthropy, his tendency to read voraciously to accumulate knowledge, and his introversion are clear markers.",
  },
  sherlock_h: {
    name: 'Sherlock Holmes',
    quote: "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
    quoteSource: 'The Sign of the Four — Conan Doyle',
    coreFear: "Being wrong, missing a detail",
    coreDesire: "To see what others cannot",
    whyThisType: "Sherlock Holmes is the fictional Type 5 par excellence: intelligence as armor, emotional detachment, encyclopedic accumulation of knowledge, social withdrawal, and distant observation of the human world.",
  },

  // ── TYPE 6 — The Loyalist ──
  freud: {
    name: 'Sigmund Freud',
    quote: "Anxiety is the natural response to the unknown.",
    quoteSource: 'Introduction to Psychoanalysis',
    coreFear: "Lacking security, being betrayed",
    coreDesire: "To have reliable support, certainty",
    whyThisType: "Freud built his theory around anxiety — no accident for a Type 6. His paranoia about dissent (Jung, Adler), his need to control his circle, and his view of the world as fundamentally threatening are characteristic.",
  },
  tom_hanks: {
    name: 'Tom Hanks',
    quote: "There's a part of me that always doubts. I'm never sure I did good work.",
    quoteSource: 'NYT interview',
    coreFear: "Abandonment, not measuring up",
    coreDesire: "To be reliable and trust those around him",
    whyThisType: "Tom Hanks embodies a positive Type 6: loyal, committed, perpetually doubting himself despite success, and seeking out roles in which characters find meaning through community and loyalty.",
  },
  jennifer: {
    name: 'Jennifer Aniston',
    quote: "True luxury is being surrounded by people I trust.",
    quoteSource: 'InStyle interview',
    coreFear: "Betrayal, unstable relationships",
    coreDesire: "Solid, lasting friendships",
    whyThisType: "Jennifer Aniston shows Type 6 in her personal life: lasting friendships (her Friends crew), wariness of new relationships, resistance to change, and a need for fidelity make her a clear Type 6.",
  },
  katniss: {
    name: 'Katniss Everdeen',
    quote: "I can't let them break someone I need.",
    quoteSource: 'The Hunger Games — Suzanne Collins',
    coreFear: "Losing those she protects",
    coreDesire: "To protect her family at any cost",
    whyThisType: "Katniss is a counter-phobic Type 6: she charges into danger to protect her own. Her absolute loyalty, skepticism of power, courage in the face of fear, and constant questioning of authority are Type 6 traits.",
  },
  twain: {
    name: 'Mark Twain',
    quote: "They didn't know it was impossible, so they did it.",
    quoteSource: 'Attributed',
    coreFear: "Hypocrisy and social betrayal",
    coreDesire: "A more honest and just world",
    whyThisType: "Twain was a skeptical, counter-phobic Type 6. His humor served to denounce the hypocrisies of American society. His mistrust of conformism, anti-authoritarianism, and financial anxieties are Type 6 markers.",
  },

  // ── TYPE 7 — The Enthusiast ──
  robin: {
    name: 'Robin Williams',
    quote: "You're only given a little spark of madness. You mustn't lose it.",
    quoteSource: "It's Not Your Fault",
    coreFear: "Suffering, pain, being trapped",
    coreDesire: "To be happy, free, and stimulated",
    whyThisType: "Robin Williams is Type 7 in its tragic dimension: humor as escape from inner pain. His overflowing energy, inability to sit still, frenetic creativity, and hidden depression are the portrait of Type 7.",
  },
  mozart: {
    name: 'Mozart',
    quote: "I don't remember learning the alphabet. I always knew how to play music.",
    quoteSource: 'Mozart correspondence',
    coreFear: "Boredom, creative limitation",
    coreDesire: "Constant stimulation, pure joy",
    whyThisType: "Mozart is a brilliant Type 7: inexhaustible creative energy, inability to finish one project before starting several others, schoolboy humor, and lightness in the face of life's seriousness are emblematic traits.",
  },
  branson: {
    name: 'Richard Branson',
    quote: "Business should be fun. If it isn't, change it.",
    quoteSource: 'Losing My Virginity',
    coreFear: "Boredom, routine",
    coreDesire: "To live a thousand adventures and ventures",
    whyThisType: "Branson is an entrepreneurial Type 7: inability to settle on one project, constant need for novelty, contagious optimism, and a knack for turning every failure into a new adventure.",
  },
  jim: {
    name: 'Jim Carrey',
    quote: "My mood doesn't depend on what happens to me, but on what I decide to feel.",
    quoteSource: 'MIU Commencement speech, 2014',
    coreFear: "Suffering, insignificance",
    coreDesire: "Total freedom, joy of life",
    whyThisType: "Jim Carrey is a Type 7 who sought liberation: hyperactive humor as a shield against pain, a childhood in poverty that fed his desire for lightness, and his later spirituality as integration of Type 7.",
  },
  tony_stark: {
    name: 'Tony Stark',
    quote: "I am Iron Man.",
    quoteSource: 'Avengers: Endgame (Marvel)',
    coreFear: "Losing control, being vulnerable",
    coreDesire: "To have it all — genius, parties, glory",
    whyThisType: "Tony Stark is a classic Type 7: forward flight, jokes to dodge deep conversation, multiple simultaneous projects, and turning fear (death) into literal armor. His integration toward Type 5 also gives him depth.",
  },

  // ── TYPE 8 — The Challenger ──
  churchill: {
    name: 'Winston Churchill',
    quote: "Success is going from failure to failure without losing your enthusiasm.",
    quoteSource: 'Attributed',
    coreFear: "Being controlled or betrayed",
    coreDesire: "To protect what's his, to master his fate",
    whyThisType: "Churchill is a pure Type 8: his categorical refusal to submit to Hitler, his bluntness in decisions, his indomitable vitality, and his way of turning others' fear into collective strength.",
  },
  mlk: {
    name: 'Martin Luther King',
    quote: "Injustice anywhere is a threat to justice everywhere.",
    quoteSource: 'Letter from Birmingham Jail, 1963',
    coreFear: "That injustice might win",
    coreDesire: "To protect the vulnerable, to deliver justice",
    whyThisType: "MLK is a flourishing Type 8. His power of conviction, courage in the face of death threats, willingness to physically take a stand, and passion for protecting the weak against the strong are integrated Type 8.",
  },
  steve_jobs: {
    name: 'Steve Jobs',
    quote: "The people who are crazy enough to think they can change the world are the ones who do.",
    quoteSource: 'Apple Think Different campaign',
    coreFear: "Mediocrity, loss of control",
    coreDesire: "To impose his vision on the world",
    whyThisType: "Steve Jobs is an intense Type 8: his reality distortion field, his bluntness with teams, his absolute refusal to compromise, and his way of dominating through sheer force of will.",
  },
  serena: {
    name: 'Serena Williams',
    quote: "I really think a champion is defined not by their wins but by how they can recover when they fall.",
    quoteSource: 'Time Magazine interview',
    coreFear: "Being seen as weak",
    coreDesire: "To dominate, to be invincible",
    whyThisType: "Serena is a Type 8 in the sporting arena: her intensity in combat, refusal to yield under pressure, direct confrontations with referees, and ability to turn anger into physical power.",
  },
  darth_vader: {
    name: 'Darth Vader',
    quote: "I am your father.",
    quoteSource: "Star Wars: The Empire Strikes Back",
    coreFear: "Vulnerability, loving and losing",
    coreDesire: "To control, never to be hurt again",
    whyThisType: "Darth Vader is Type 8 in its disintegration toward Type 5: the fear of losing Padmé drove him to control everything. His mask (literal and symbolic), his brutality, and his final redemption through his son's love are a perfect metaphor.",
  },

  // ── TYPE 9 — The Peacemaker ──
  dalai: {
    name: 'Dalai Lama',
    quote: "If you want others to be happy, practice compassion. If you want to be happy, practice compassion.",
    quoteSource: 'The Art of Happiness',
    coreFear: "Conflict, fragmentation",
    coreDesire: "Inner and outer peace",
    whyThisType: "The Dalai Lama is Type 9 in its spiritual dimension: his vision of the interconnection of all things, refusal of confrontation, serenity in the face of Chinese provocations, and universal message of harmony.",
  },
  audrey: {
    name: 'Audrey Hepburn',
    quote: "Nothing is impossible. The word itself says 'I'm possible'.",
    quoteSource: 'Attributed',
    coreFear: "Conflict and discord",
    coreDesire: "Harmony, to be loved by all",
    whyThisType: "Audrey Hepburn was a Type 9: her legendary gentleness, her quiet humanitarian work for UNICEF, her aversion to Hollywood scandal, and her way of defusing tensions on set are the signs.",
  },
  morgan: {
    name: 'Morgan Freeman',
    quote: "How do you get rid of racism? You stop talking about it.",
    quoteSource: '60 Minutes interview',
    coreFear: "Division and chaos",
    coreDesire: "Unity and mutual understanding",
    whyThisType: "Morgan Freeman embodies Type 9: his soothing voice, roles as wise unifying figures (God, Nelson Mandela, Lucius Fox), refusal of sensationalism, and calm, containing presence.",
  },
  lincoln: {
    name: 'Abraham Lincoln',
    quote: "Do I not destroy my enemies when I make them my friends?",
    quoteSource: 'Attributed',
    coreFear: "Permanent civil war, division",
    coreDesire: "To reunify, to pacify",
    whyThisType: "Lincoln is a remarkable Type 9. His 'Team of Rivals' policy (appointing his enemies to his cabinet), tolerance of opponents, and constant search for compromise that preserved national unity are pure Type 9.",
  },
  walt: {
    name: 'Walt Disney',
    quote: "It all started with a dream.",
    quoteSource: 'Attributed',
    coreFear: "A hostile world without magic",
    coreDesire: "To create a space of peace and wonder for all",
    whyThisType: "Walt Disney is a creative Type 9: his vision of an ideal, harmonious world, his ability to gather very different people around a collective dream, and his creation of physical spaces dedicated to escape from reality.",
  },
};

// ── Case translations ─────────────────────────────────────────
// For each case (id), we store the translatable text fields. Format-specific.
export interface EnqueteCaseEn {
  indices?: string[];
  explanation?: string;
}
export interface CitationCaseEn {
  quote?: string;
  author?: string;
  explanation?: string;
}
export interface FauxAmisCaseEn {
  descA?: string;
  descB?: string;
  keyDiff?: string;
}
export interface DetailCaseEn {
  scene?: string;
  keyDetail?: string;
  explanation?: string;
}
export type CaseEn = EnqueteCaseEn | CitationCaseEn | FauxAmisCaseEn | DetailCaseEn;

export const CASES_EN: Record<string, CaseEn> = {
  // ── DOSSIER 1 — Visionaries ──
  v1: {
    indices: [
      "This person preferred a quiet evening alone with their thoughts to a party.",
      "They developed revolutionary theories through imagined thought experiments.",
      "Colleagues described them as absent, always inside their head, often forgetting to eat.",
      "He reshaped our understanding of time and space with E=mc².",
    ],
    explanation: "Einstein is the archetype of Type 5. His detachment from the physical world in favor of intellectual abstraction, his economy of social energy, and his way of observing without participating are markers of the Investigator.",
  },
  v2: {
    quote: "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.",
    author: 'Nikola Tesla',
    explanation: "Tesla lived entirely in his intellect. This quote reveals the Type 5 obsession: cracking reality's mysteries through the sheer force of thought.",
  },
  v3: {
    indices: [
      "This person renounced all material comfort out of moral conviction.",
      "They built a strict ethical code they imposed on themselves before teaching it to others.",
      "His fasts weren't weakness but political weapons grounded in principle.",
      "He led India to independence through absolute non-violence.",
    ],
    explanation: "Gandhi is Type 1 par excellence. Moral principles guided every decision and he expected the same rigor of himself that he asked of others — the very definition of the Reformer.",
  },
  v4: {
    scene: "Every morning, he redid yesterday's calculations from scratch — not because he doubted the result, but to be sure the method was flawless. His notebooks contained no crossings-out. Mistakes were rewritten on a fresh page.",
    keyDetail: "Redoing the calculations for the method, not the result — no crossings-out, perfect form.",
    explanation: "Rejecting cross-outs and verifying the method rather than the result reveals a Type 1: it isn't just the right answer that matters, it's the perfect process.",
  },
  v5: {
    descA: "Withdraws from the world to accumulate knowledge. Feels the need to understand everything before acting. Apparent emotional detachment.",
    descB: "Withdraws from the world because they feel misunderstood. Seeks to express what they feel. Emotional intensity is at the core of their vision.",
    keyDiff: "Type 5 flees toward intellect to protect themselves. Type 4 flees toward emotion to find themselves.",
  },
  v6: {
    indices: [
      "This person worked in dangerous conditions and refused to take precautions for herself.",
      "She refused to patent her discoveries, believing science should belong to everyone.",
      "Her lab was tidy down to the millimeter. Her experimental protocols were impeccable.",
      "First woman to win a Nobel Prize, she earned two — in different disciplines.",
    ],
    explanation: "Marie Curie embodies Type 1 in its most heroic form: the moral ideal (science for all) outranks personal survival. Her refusal of the patent and absolute rigor are her signature.",
  },
  v7: {
    quote: "Perfection is reachable for the one who never tires of self-improvement.",
    author: 'Confucius',
    explanation: "This quote reveals the heart of Type 1: constant self-improvement as the path to the moral ideal. Confucius built his entire philosophy around this principle.",
  },
  v8: {
    indices: [
      "This person was obsessed with the idea that loved ones might betray or disappoint him.",
      "He needed loyal disciples but broke violently with them at the slightest disagreement.",
      "He saw the world as fundamentally hostile, ruled by hidden, uncontrollable forces.",
      "He founded psychoanalysis by exploring anxieties and defense mechanisms.",
    ],
    explanation: "Freud is a fascinating Type 6: he built an entire theory around anxiety — Type 6's central topic. His paranoia about dissent (Jung, Adler) and view of the world as fundamentally threatening bear witness.",
  },

  // ── DOSSIER 2 — Artists ──
  a1: {
    indices: [
      "This artist transformed her intense physical suffering into works of art.",
      "She wore traditional Mexican clothing as an assertion of a radically personal identity.",
      "Her chronic pain was, by her account, the prime material of her art.",
      "Her self-portraits trace her quest for meaning after a bus accident shattered her spine.",
    ],
    explanation: "Frida Kahlo is the archetype of Type 4. Turning suffering into beauty, the quest for a unique identity, and total authenticity in self-expression make her the Romantic par excellence.",
  },
  a2: {
    quote: "I'm an artist, not an industry.",
    author: 'Bob Dylan',
    explanation: "This quote reveals the Type 4 rejection of any commercial co-opting. For Dylan, betraying his authenticity would mean losing his identity — the central fear of the Romantic.",
  },
  a3: {
    indices: [
      "This person used humor as a shield to hide deep inner suffering.",
      "His on-stage energy was overflowing — he couldn't sit still or finish a single idea.",
      "Friends described an adorable person who was impossible to truly grasp.",
      "Legendary comedian, he secretly battled severe depression and addiction.",
    ],
    explanation: "Robin Williams is the most poignant face of Type 7: frenetic humor as flight from inner pain. Type 7 seeks joy not out of lightness, but to escape suffering.",
  },
  a4: {
    descA: "Gives much of herself in her art. Feels misunderstood. Seeks deep connection. Her suffering feels unique to her.",
    descB: "Gives much of herself to others. Feels needed. Seeks to be loved in return. Her generosity is never entirely disinterested.",
    keyDiff: "Type 4 gives in order to express itself. Type 2 gives in order to be loved. One seeks to be seen, the other to be needed.",
  },
  a5: {
    indices: [
      "Child prodigy, this person was never happier than when creating.",
      "His humor was childish and often inappropriate — he made scatological jokes at the Empress's court.",
      "He composed several works at once, unable to commit to just one.",
      "Viennese prodigy, he composed over 600 works before dying at 35.",
    ],
    explanation: "Mozart is the musical Type 7 par excellence. His inability to be bored, schoolboy humor, multiple creative energy, and irreducible joy of life even amid hardship are classic markers.",
  },
  a6: {
    scene: "She refused to leave her apartment for days on end. She filled entire notebooks, not to publish, but to capture something elusive. Friends sometimes found her crying at a sunset — too beautiful not to hurt.",
    keyDetail: "Crying at a sunset — beauty hurts because it reveals what's missing.",
    explanation: "This is quintessential Type 4: beauty intensifies the sense of lack rather than filling it. The Romantic feels things with an intensity that can turn against them.",
  },
  a7: {
    quote: "I sing for people who feel things deeply.",
    author: 'Adele',
    explanation: "This quote reveals the essence of Type 4: emotional depth as the central value. Adele doesn't sing to entertain — she sings to be recognized in her suffering.",
  },
  a8: {
    indices: [
      "This writer described human consciousness as a flow impossible to interrupt.",
      "She suffered intense depressive episodes that she turned into literary material.",
      "Her novels don't tell a story — they capture the space between words.",
      "Author of Mrs Dalloway and To the Lighthouse, a figure of literary modernism.",
    ],
    explanation: "Virginia Woolf is a literary Type 4. Her stream of consciousness, constitutive melancholy, and attempt to capture inner subjective reality are deep expressions of the Romantic.",
  },

  // ── DOSSIER 3 — Leaders ──
  l1: {
    indices: [
      "This person categorically refused to negotiate under threat.",
      "He slept little, drank heavily, and worked with a vitality his colleagues found exhausting.",
      "His speeches turned collective fear into combative energy.",
      "He led British resistance against Nazi Germany during World War II.",
    ],
    explanation: "Churchill is a classic Type 8. His refusal to bend in the face of threat, indomitable vitality, and capacity to turn his own strength into protection for others define the Challenger.",
  },
  l2: {
    quote: "Injustice anywhere is a threat to justice everywhere.",
    author: 'Martin Luther King',
    explanation: "This quote reveals Type 8 in its luminous form: defending the weak against the oppressor. MLK wasn't afraid to name the enemy and call for direct confrontation.",
  },
  l3: {
    indices: [
      "This person naturally adjusted his language and style to his audience.",
      "His speeches were meticulously crafted to produce a precise effect.",
      "He was fascinated by the image he projected and worked his personal branding with care.",
      "First African-American U.S. president, he won the Nobel Peace Prize in 2009.",
    ],
    explanation: "Obama is Type 3 in its most accomplished form. His innate sense of personal branding, his ability to adapt to any audience, and his drive toward historic accomplishments are strong markers.",
  },
  l4: {
    descA: "Wants to control the environment to protect himself. Confronts directly. His strength comes from within. He protects the weak.",
    descB: "Wants to reach his goals to be admired. Adjusts his image. His strength comes from others' gaze. He wants to win.",
    keyDiff: "Type 8 is power-and-protection oriented. Type 3 is success-and-image oriented. One wants to control, the other wants to shine.",
  },
  l5: {
    indices: [
      "This person spent 27 years in prison without abandoning his principles.",
      "On release, he refused revenge and chose reconciliation — by principle, not weakness.",
      "Friends described an inner discipline of frightening rigor.",
      "Father of the Rainbow Nation, he ended apartheid in South Africa.",
    ],
    explanation: "Mandela is Type 1 in its most heroic dimension: the moral ideal outranks everything, even personal freedom. His post-apartheid reconciliation is integrated Type 1 toward Type 7 — joy in justice realized.",
  },
  l6: {
    scene: "In a meeting, he watched a presentation in silence for 10 minutes. Then he said: 'This is shit.' He gave no further explanation. The team redid the work entirely. The next version was approved in 30 seconds.",
    keyDetail: "Verdict without explanation, absolute power, no compromise — and the team redoes everything without question.",
    explanation: "This behavior is characteristic of Type 8 in a position of authority: instant decision, no need to justify, and the implicit expectation that one's will be carried out. Strength imposes itself.",
  },
  l7: {
    quote: "When something is important enough, you do it even if the odds are not in your favor.",
    author: 'Elon Musk',
    explanation: "Musk reveals Type 3 in this quote: a goal's importance is measured by its potential impact on his reputation and legacy. Type 3 takes risks not out of courage but ambition.",
  },
  l8: {
    indices: [
      "This leader deliberately appointed his political enemies to his cabinet to keep them close.",
      "He endured sharp criticism from all sides without ever counter-attacking directly.",
      "His sole aim was to preserve national unity, even at the cost of painful compromises.",
      "American president during the Civil War, he abolished slavery.",
    ],
    explanation: "Lincoln is a remarkable Type 9. His Team of Rivals, patience under attack, and obsession with national unity over his own image are expressions of the Peacemaker in action.",
  },

  // ── DOSSIER 4 — Icons ──
  i1: {
    indices: [
      "This person radically changed her image every decade to stay on top.",
      "She studied markets, trends, and critics to anticipate her next move.",
      "Her stage work was less self-expression than the construction of a brand.",
      "Queen of pop, icon of the 80s–2000s, she sold over 300 million albums.",
    ],
    explanation: "Madonna is the Type 3 manual: constant reinvention not from a desire for authenticity (that would be Type 4) but from calculation about what works. Her identity IS her brand — she doesn't really know who she is without success.",
  },
  i2: {
    quote: "I want to be the queen of people's hearts.",
    author: 'Princess Diana',
    explanation: "This quote reveals Type 2 in all its complexity: the need to be loved disguised as a desire to give. Diana sought love through service — the central dynamic of the Helper.",
  },
  i3: {
    indices: [
      "This personality was described as impossible to follow in conversation — he leapt from one idea to another at lightning speed.",
      "Friends said he was always 'on' — as if stopping would have destroyed him.",
      "He used humor to deflect any conversation that came near his real pain.",
      "Legendary comedian of Good Will Hunting and Good Morning Vietnam, he hid deep depression.",
    ],
    explanation: "Robin Williams is the dark face of Type 7: humor as armor against pain. His inability to settle, compulsive energy, and hidden suffering paint the portrait of an unintegrated Type 7.",
  },
  i4: {
    descA: "Seeks success to be admired. Works intensely. Adapts to the audience. Driven by fear of failure.",
    descB: "Seeks adventure to flee pain. Jumps from project to project. Carries others along. Driven by fear of suffering.",
    keyDiff: "Type 3 runs toward success. Type 7 runs from suffering. One wants to be seen, the other wants to be free.",
  },
  i5: {
    indices: [
      "This athlete publicly contested umpire decisions she found unjust, even at the risk of losing the match.",
      "She came back stronger after every injury or defeat — as if the obstacle energized her.",
      "Her gaze toward an opponent wasn't hostile, it was a signal: 'I will not back down.'",
      "Greatest tennis player in history, 23 Grand Slam titles.",
    ],
    explanation: "Serena Williams is a Type 8 in the sporting arena. Her confrontations with umpires, transformation of anger into power, and absolute refusal of weakness are direct expressions of the Challenger.",
  },
  i6: {
    scene: "In an interview, he's asked if he thinks he's a great actor. He hesitates a long time. 'I don't really know. With every film, I'm afraid I won't measure up.' He won two Oscars in consecutive years.",
    keyDetail: "Two Oscars and still haunted by doubt — success doesn't quiet the anxiety.",
    explanation: "Tom Hanks perfectly illustrates Type 6: anxiety doesn't fade with success. The Loyalist seeks security — but even at the top, doubt persists.",
  },
  i7: {
    quote: "My mood doesn't depend on what happens to me, but on what I decide to feel.",
    author: 'Jim Carrey',
    explanation: "This quote reveals integrated Type 7: inner freedom as response to pain. Jim Carrey worked his whole life to choose joy rather than be at its mercy.",
  },
  i8: {
    indices: [
      "This Hollywood star avoided conflicts and scandals with remarkable consistency.",
      "Her humanitarian work for UNICEF was quiet, no cameras, no press conferences.",
      "Colleagues spoke of a calming presence that defused tensions on set.",
      "Classic cinema icon, star of Breakfast at Tiffany's and Roman Holiday.",
    ],
    explanation: "Audrey Hepburn embodies Type 9 in the world of glamour. Her legendary gentleness, conflict aversion, and quiet humanitarian work mark a Peacemaker who shunned the spotlight despite her fame.",
  },

  // ── DOSSIER 5 — Fictional Heroes ──
  f1: {
    indices: [
      "This character prefers watching people from his window to spending time with them.",
      "He hoards knowledge in precise and perfectly useless fields — types of mud across the districts of London.",
      "Emotions strike him as 'noise data' that disrupts analysis.",
      "Detective at 221B Baker Street, he solves cases Scotland Yard can't.",
    ],
    explanation: "Sherlock Holmes is the fictional Type 5 par excellence. His emotional detachment, intellect as sole armor, distant observation of the human world, and encyclopedic collection of useless lore define the Investigator.",
  },
  f2: {
    quote: "I am your father.",
    author: 'Darth Vader — Star Wars',
    explanation: "This quote is the Type 8 reveal beneath the mask. Vader's whole tragedy comes from a Type 8 who let fear corrupt him: the fear of vulnerability (losing Padmé) turned him into a tyrant.",
  },
  f3: {
    indices: [
      "This character will do anything to protect her family, even sacrifice herself.",
      "She isn't naturally brave — she is terrified, but she acts anyway.",
      "Her mistrust of authorities and institutions is total and well-founded.",
      "Heroine of The Hunger Games, she becomes the symbol of rebellion despite herself.",
    ],
    explanation: "Katniss is a counter-phobic Type 6: she charges into danger to protect her own. Her absolute loyalty, skepticism of power (the Capitol), and courage despite fear are classic Type 6 traits.",
  },
  f4: {
    descA: "Seeks peace and harmony. Steps aside to avoid conflict. Hard to mobilize. But powerful when awakened.",
    descB: "Seeks security and loyalty. Anticipates threats. Can panic. But brave when cornered.",
    keyDiff: "Type 9 avoids conflict out of love for peace. Type 6 anticipates conflict out of fear of threat. One dreams of harmony, the other dreads betrayal.",
  },
  f5: {
    indices: [
      "This character uses sarcastic humor to dodge any sincere conversation.",
      "He launches multiple projects at once, unable to be bored for a single second.",
      "Beneath the arrogance hides a deep fear: that he has no value without his inventions.",
      "Billionaire genius, philanthropist playboy — Iron Man.",
    ],
    explanation: "Tony Stark is a classic Type 7. His forward flight, humor as armor, multiple compulsive projects, and transformation of his fear of death into literal armor are markers of the Enthusiast.",
  },
  f6: {
    scene: "He had lived alone for years. His apartment was filled with books on apparently unrelated subjects. When asked how he was, he answered with facts. When someone cried in front of him, he quietly left the room — not from cruelness, but because he didn't know what to do with emotions.",
    keyDetail: "Leaving when someone cries — no cruelty, just sincere emotional incompetence.",
    explanation: "Withdrawal from emotion is a fundamental Type 5 trait. The Investigator doesn't flee out of malice — emotions are simply a domain where he lacks the resources to respond.",
  },
  f7: {
    quote: "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
    author: 'Sherlock Holmes',
    explanation: "This quote illustrates pure Type 5 thinking: reality is deduced through logic, not intuition or experience. Truth is an equation to solve.",
  },
  f8: {
    indices: [
      "This visionary wanted to create a space where adults and children could coexist in peace.",
      "He gathered around him very different creatives and could build lasting harmony.",
      "His vision was always unifying: a world where conflicts dissolve before magic.",
      "He created Mickey Mouse and the world's first themed amusement park.",
    ],
    explanation: "Walt Disney is a creative Type 9. His vision of a harmonious world, ability to bring very different people together, and creation of spaces dedicated to escape from reality are deep expressions of the Peacemaker.",
  },

  // ── DOSSIER 6 — Stars ──
  s1: {
    indices: [
      "This person feels most herself when she can transform other people's lives.",
      "She regularly cries on screen with her guests — her empathy seems physical.",
      "One day, she gave a car to every person in her audience because she 'wanted them to live their best life.'",
      "First African-American billionaire woman through her empathetic talk show that ran over 25 years.",
    ],
    explanation: "Oprah embodies Type 2: spectacular generosity, exceptional emotional reading, and a deep need to be a catalyst of transformation for others. The Helper is fed by connection.",
  },
  s2: {
    indices: [
      "This person had a compulsive need to be loved — every applause fed him like a drug.",
      "He bought cars, houses, and jewelry for strangers met on the street.",
      "His mother was the most important person in his life — he had her house painted pink for her.",
      "The 'King' of rock 'n' roll, dead at 42 in his Graceland home.",
    ],
    explanation: "Elvis is Type 2 in its dependent form: constant need for love and validation, compulsive generosity toward those close (the 'Memphis Mafia'), and inability to survive when adoration faded.",
  },
  s3: {
    quote: "Long story short, I survived.",
    author: 'Taylor Swift',
    explanation: "This short line reveals Type 3: turning every ordeal into a victory narrative. For the Achiever, failure doesn't exist — only chapters preparing the triumph.",
  },
  s4: {
    quote: "I play to win. That's it.",
    author: 'Roger Federer',
    explanation: "This stripped-down line illustrates Type 3 in its most elegant form. Federer maintained his place at the top for two decades through this total focus on results — no drama, no excuses.",
  },
  s5: {
    indices: [
      "This actress kept the same haircut and the same group of friends for years.",
      "She often speaks of her fear of abandonment and her difficulty trusting new people.",
      "Her entire career was built around the same group of 90s actor friends.",
      "Star of the sitcom Friends, who became a worldwide icon as Rachel Green.",
    ],
    explanation: "Jennifer Aniston embodies Type 6: absolute loyalty to her inner circle, mistrust of change, and need for stable anchors. The Loyalist prefers familiar ground, however imperfect, to adventure.",
  },
  s6: {
    scene: "When asked about hot-button issues, he often replies with a line that defuses conflict. Asked 'How do you get rid of racism?', his answer caused a stir with its simplicity: stop talking about it. On set, his calm presence and deep voice ease all tension. He takes very different roles — God, a president, an escapee — without ever being boxed into one image.",
    keyDetail: "Defusing conflict through simplicity rather than debating it — preserving harmony over winning the argument.",
    explanation: "Morgan Freeman embodies Type 9: avoid useless divisions, seek unity over confrontation, and embody a soothing presence. The Peacemaker preserves peace before settling scores.",
  },
  s7: {
    indices: [
      "This person said he felt 'most lonely on stage in front of millions.'",
      "He transformed his body radically over the years, like a physical identity quest.",
      "His music constantly speaks of pain, lost childhood, and absolute otherness.",
      "The 'King of Pop,' author of Thriller, the best-selling album in history.",
    ],
    explanation: "Michael Jackson is an archetypal Type 4: a sense of being radically different since childhood, bodily transformations as identity quests, and deeply personal art tinged with melancholy. The Romantic lives loneliness at the heart of adoration.",
  },
  s8: {
    indices: [
      "This writer spent his life anticipating disasters that never came — and said so himself.",
      "His biting humor served to denounce the hypocrisies of authorities and institutions.",
      "He lost and rebuilt his fortune several times — money was an anxious obsession.",
      "American author of The Adventures of Tom Sawyer and Huckleberry Finn.",
    ],
    explanation: "Mark Twain is a counter-phobic Type 6: his biting irony was a weapon against social anxiety, his mistrust of authority is typical of the Loyalist, and his humor let him voice uncomfortable truths without exposing himself directly.",
  },

  // ── DOSSIER 7 — Masters ──
  m1: {
    indices: [
      "This person rereads her speeches ten times before delivering them — perfect message is a duty.",
      "Her public philosophy boils down to one phrase: 'When they go low, we go high.'",
      "She led a national project against childhood obesity out of discipline and moral conviction.",
      "First Lady of the United States from 2009 to 2017, former lawyer, Princeton and Harvard graduate.",
    ],
    explanation: "Michelle Obama is Type 1: rigorous self-discipline, sharp sense of duty, capacity to channel anger into constructive energy ('we go high'). The Reformer measures herself first against her own standards.",
  },
  m2: {
    quote: "If you judge people, you have no time to love them.",
    author: 'Mother Teresa',
    explanation: "This quote reveals the essence of Type 2: choosing love as the first stance, refusing critical distance. Mother Teresa made this line a life rule — typical of a Type 2 who pushes judgment aside as an obstacle to giving.",
  },
  m3: {
    indices: [
      "This religious leader refused to live in the traditional palace, staying in a modest guest room.",
      "Every Holy Thursday, he washes and kisses the feet of prisoners — including women and Muslims.",
      "His famous reply about homosexuality in the Church: 'Who am I to judge?'",
      "First Jesuit pope and first Latin American pope, elected in 2013.",
    ],
    explanation: "Pope Francis embodies Type 2: refusal of pomp, physical closeness with the poor, and rejection of judgment as a barrier to giving. The Helper is defined by service — not hierarchical rank.",
  },
  m4: {
    descA: "Lives by strict moral principles. Seeks to improve the world through rigor. Gives out of duty, not from a need to be loved.",
    descB: "Gives to others with immediate warmth. Seeks to be loved in return, even unconsciously. Giving is also an attachment strategy.",
    keyDiff: "Type 1 gives by principle — they would do the same thing alone. Type 2 gives to create a bond — they need it to be received.",
  },
  m5: {
    indices: [
      "This person launched dozens of unrelated companies — music, airline, train, space, mobile.",
      "His philosophy is simple: 'Business should be fun. Otherwise, change it.'",
      "He turned every failure into a new media adventure — flying in hot-air balloons, boats, rockets.",
      "Founder of the Virgin group, British billionaire known for his publicity stunts.",
    ],
    explanation: "Richard Branson is a pure entrepreneurial Type 7: constant need for novelty, unshakable optimism, rejection of boredom, and ability to turn every failure into a stimulating adventure. The Enthusiast is fed by multiple options.",
  },
  m6: {
    quote: "If you want others to be happy, practice compassion. If you want to be happy, practice compassion.",
    author: 'Dalai Lama',
    explanation: "This quote reveals Type 9 in its spiritual dimension: seeing the fundamental unity between self and others. For the Peacemaker, there is no individual peace separate from collective peace.",
  },
  m7: {
    indices: [
      "This person watched his body slowly disappear from an incurable disease.",
      "The more his body froze, the more he took refuge in pure thought and astrophysics.",
      "He wrote his most famous book forcing himself to use only one equation, for the sake of elegance.",
      "British astrophysicist with ALS, author of A Brief History of Time.",
    ],
    explanation: "Stephen Hawking embodied the resilience of Type 5: as his body vanished, he doubled his investment in intellect. For the Investigator, thought is the safest territory — and sometimes the last one left.",
  },
  m8: {
    indices: [
      "This person isolates himself twice a year in a cabin to read for a week without interruption.",
      "His philanthropic strategy is purely analytical: he optimizes lives saved per dollar spent.",
      "As a young man, he used to read the entire encyclopedia out of personal curiosity.",
      "Co-founder of Microsoft and the world's most active philanthropic foundation.",
    ],
    explanation: "Bill Gates is an integrated Type 5: need for retreat to think (his famous Think Weeks), systematic accumulation of knowledge, and analytical approach applied even to giving. The Investigator brings intellectual rigor to every domain.",
  },
};

// ── Fun facts ─────────────────────────────────────────────────
export const FUN_FACTS_EN: Record<string, string> = {
  // Type 1
  mandela:        "In prison, Nelson Mandela learned Afrikaans so he could argue better with his jailers — typical of a Type 1 who believes justice is won through rigor, not resentment.",
  gandhi:         "Gandhi weighed himself every day and meticulously logged what he ate. This moral discipline pushed to the extreme — applied to himself first — is the mark of Type 1.",
  obama_michelle: "Michelle Obama reread her speeches ten times before delivering them. This pursuit of 'doing it right' — never resting on her achievements — is very telling of Type 1.",
  marie_curie:    "Marie Curie refused her entire life to patent her discoveries, believing science should belong to everyone. An absolute moral integrity, signature of Type 1.",
  confucius:      "Confucius said that at 70, he could finally 'follow his heart's desires without breaking the rules' — as if his whole life had been a long training in becoming just.",

  // Type 2
  diana:          "Lady Diana shook the hands of AIDS patients at a time when people avoided them. Her ability to draw close to others' suffering — at the expense of protocol — is the essence of Type 2.",
  teresa:         "Mother Teresa reminded us that 'no one can do great things, only small things with great love.' This focus on the attention given rather than the impact measured is typical of Type 2.",
  oprah:          "Oprah Winfrey gave cars to her entire audience one day — not as a publicity stunt, but because she 'wanted them to live their best life.' Spectacular generosity, Type 2 hallmark.",
  elvis:          "Elvis Presley bought Cadillacs for strangers met on the street. His compulsive need to give — to be loved in return — is an intense expression of Type 2.",
  pope_francis:   "Pope Francis washes and kisses the feet of prisoners every Holy Thursday, including women and Muslims. This act of service toward the marginalized is very Type 2.",

  // Type 3
  obama_barack:   "Barack Obama spent two years perfecting his inauguration speech, aware it had to be 'historic.' Staging oneself while staying authentic is the art of Type 3.",
  madonna:        "Madonna reinvents herself every 5 years (look, sound, era) — not from lack of identity, but because staying socially alive demands constant surprise. Very Type 3.",
  taylor_swift:   "Taylor Swift re-recorded her old albums to regain control of her masters. This ability to turn a public setback into a strategic victory is typical of Type 3.",
  federer:        "Roger Federer lost the 2008 Wimbledon final to Nadal — and cried on camera. His ability to show vulnerability while remaining the image of elegance is rare for a Type 3.",
  elon:           "Elon Musk often sleeps in his factories during critical periods. This obsession with visible performance — at the expense of any personal balance — is an intense expression of Type 3.",

  // Type 4
  frida:          "Frida Kahlo painted more self-portraits than nearly any artist of her century. 'I paint myself because I am the subject I know best.' Pure essence of Type 4.",
  mj:             "Michael Jackson said he felt 'most lonely on stage in front of millions.' This paradox — being adored and misunderstood — is the deep experience of Type 4.",
  dylan:          "Bob Dylan refused for weeks to collect his Nobel Prize. This artist's stance of not playing the game — out of authenticity rather than snobbery — is very Type 4.",
  adele:          "Adele canceled her world tour because she 'didn't really feel like herself.' Putting fidelity to oneself ahead of the commercial machine is typical of Type 4.",
  virginia:       "Virginia Woolf wrote standing up at a lectern, just as her painter sister worked at an easel. Making every detail of daily life an expression of self: signature of Type 4.",

  // Type 5
  einstein:       "Einstein owned several identical suits so he wouldn't have to decide what to wear. Saving mental energy for what really matters: very Type 5.",
  hawking:        "Stephen Hawking wrote A Brief History of Time forcing himself to use only one equation (E=mc²). This pursuit of elegance in transmitting knowledge is purely Type 5.",
  tesla:          "Nikola Tesla could fully visualize his inventions in his head, mentally 'running' them for weeks before building a single prototype. Pure inner vision, Type 5 hallmark.",
  gates:          "Bill Gates would isolate himself twice a year in a cabin to read for a week without interruption — his famous 'Think Week.' The need to retreat to think is central to Type 5.",
  sherlock_h:     "Sherlock Holmes didn't know that the Earth orbited the Sun — he refused to store information he didn't deem useful to his work. This extreme rationalization of knowledge is the archetype of Type 5.",

  // Type 6
  freud:          "Sigmund Freud refused to travel without his personal armchair. This need for familiar anchors — even on the great intellectual adventure — is typical of Type 6.",
  tom_hanks:      "Tom Hanks has been married to the same woman since 1988 and refused 'villain' roles for years. This loyalty to his choices and image is very Type 6.",
  jennifer:       "Jennifer Aniston stayed faithful to 'The Rachel' haircut and her Friends mates throughout her career. Her need for stable anchors is a Type 6 mark.",
  katniss:        "Katniss Everdeen volunteers in her sister's place — not from heroism, but from absolute loyalty to her own. Brave action driven by protection: essence of Type 6.",
  twain:          "Mark Twain wrote in his diary that he had 'spent his life anticipating disasters that never came.' This irony about his own anxiety is very Type 6.",

  // Type 7
  robin:          "Robin Williams improvised for hours, turning every interview into a show. This ability to flee silence through overflowing creativity is typical of Type 7.",
  mozart:         "Mozart often composed while playing dice or clowning around. Mixing pleasure and genius — without ranking the two — is very Type 7.",
  branson:        "Richard Branson launched Virgin Galactic, Virgin Records, Virgin Atlantic, Virgin Mobile… with no link between these businesses. Type 7 doesn't choose — they try everything.",
  jim:            "Jim Carrey wrote himself a $10 million check in 1985 'for acting services rendered,' dated 1995. The wild and fertile optimism of Type 7.",
  tony_stark:     "Tony Stark builds his armor in a cave to escape a kidnapping — and walks out cracking jokes. Turning suffering into adventure: pure Type 7.",

  // Type 8
  churchill:      "Churchill received his ministers in his bath. This total absence of awkwardness, this rejection of protocol when it blocks action: very Type 8.",
  mlk:            "Martin Luther King kept walking after being stabbed in 1958 — the blade had grazed his aorta. Not retreating in the face of physical violence: essence of Type 8.",
  steve_jobs:     "Steve Jobs would make engineers cry in meetings, then tell them days later they had produced 'the best work of their lives.' Bluntness and recognition: classic Type 8 pairing.",
  serena:         "Serena Williams won the 2017 Australian Open while 8 weeks pregnant. Refusing to let her body dictate her limits — that's pure Type 8.",
  darth_vader:    "Darth Vader chokes an officer who contradicts him without even touching him. Type 8 under stress — when power becomes the only language — reaches this caricature.",

  // Type 9
  dalai:          "The Dalai Lama laughs out loud even while speaking of the invasion of his country. This ability to hold suffering without dissolving in it is the spiritual expression of Type 9.",
  audrey:         "Audrey Hepburn refused to watch her own films. 'I don't find myself that interesting.' This unselfconscious self-effacement is very Type 9.",
  morgan:         "Morgan Freeman has a voice so soothing it's used in guided meditations, documentaries, and even God (in Bruce Almighty). The calm presence of Type 9 embodied in a voice.",
  lincoln:        "Lincoln kept the letters of his political opponents in his pocket — not for revenge, but to better understand them. This radical empathy toward all sides: signature of Type 9.",
  walt:           "Walt Disney imagined Disneyland as 'a place where parents and children can have fun together.' Creating a world where everyone gets along — the utopia of Type 9.",
};
