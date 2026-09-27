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
    quote: "To be free is not merely to cast off one's chains, but to live in a way that respects and enhances the freedom of others.",
    quoteSource: "Long Walk to Freedom, 1994",
    coreFear: "Being corrupt, evil, or imperfect",
    coreDesire: "To be good, virtuous, and just",
    whyThisType: "Mandela devoted his life to an absolute moral ideal. His inner discipline, his ability to turn prison into a school of wisdom, and his refusal to compromise his values are the essence of Type 1.",
  },
  gandhi: {
    name: 'Gandhi',
    quote: "If we could change ourselves, the tendencies in the world would also change. As a man changes his own nature, so does the attitude of the world change towards him.",
    quoteSource: "Indian Opinion, 1913",
    coreFear: "Being impure, hypocritical, or irresponsible",
    coreDesire: "To live in perfect alignment with one's values",
    whyThisType: "Gandhi embodied ethical rigor pushed to the extreme. His asceticism, his protest fasts, and his obsession with truth (satyagraha) are classic markers of Type 1.",
  },
  obama_michelle: {
    name: 'Michelle Obama',
    quote: "When they go low, we go high.",
    quoteSource: "Speech at the Democratic National Convention, 2016",
    coreFear: "In a Type 1 reading: falling short of her principles, being found at fault",
    coreDesire: "In a Type 1 reading: to be a model of integrity for others",
    whyThisType: "Michelle Obama's public image suggests Type 1: personal discipline, high standards, a sharp sense of duty, and a stated choice to answer attacks by taking the high road ('we go high').",
  },
  marie_curie: {
    name: 'Marie Curie',
    quote: "One never notices what has been done; one can only see what remains to be done.",
    quoteSource: "Letter to her brother Józef, March 18, 1894",
    coreFear: "Doing imperfect or sloppy work",
    coreDesire: "To reach absolute excellence in her work",
    whyThisType: "Marie Curie worked in dangerous conditions out of pure scientific ideal. Her obsessive methodological rigor, her principled refusal to patent her discoveries, and her self-demanding nature are Type 1 traits.",
  },
  confucius: {
    name: 'Confucius',
    quote: "To have faults and not to reform them: this, indeed, should be pronounced having faults.",
    quoteSource: "The Analects, XV.29",
    coreFear: "Moral disorder and injustice",
    coreDesire: "To create an orderly, virtuous society",
    whyThisType: "Confucius built his entire philosophy on the moral perfecting of self and society. His insistence on rituals, self-discipline, and rectitude make him the archetype of Type 1.",
  },

  // ── TYPE 2 — The Helper ──
  diana: {
    name: 'Princess Diana',
    quote: "I'd like to be a queen of people's hearts, in people's hearts.",
    quoteSource: "BBC Panorama Interview, 1995",
    coreFear: "Being unloved, being rejected",
    coreDesire: "To feel loved through helping others",
    whyThisType: "Diana sought love through self-giving. Her humanitarian work, her intense need for emotional connection, and her suffering at royal rejection are deep expressions of Type 2.",
  },
  teresa: {
    name: 'Mother Teresa',
    quote: "Love begins at home, and it is not how much we do, but how much love we put in the action that we do.",
    quoteSource: "Nobel Peace Prize lecture, 1979",
    coreFear: "Being useless, serving no purpose",
    coreDesire: "To be indispensable through the love she gives",
    whyThisType: "Mother Teresa represents Type 2 in its holiest form. Her entire life in service of others, her need to be needed, and her inner doubts about her own worth reveal the heart of Type 2.",
  },
  oprah: {
    name: 'Oprah Winfrey',
    quote: "You get a car! You get a car! Everybody gets a car!",
    quoteSource: "The Oprah Winfrey Show, September 13, 2004",
    coreFear: "In a Type 2 reading: not being loved despite her generosity",
    coreDesire: "In a Type 2 reading: to be loved for what she gives others",
    whyThisType: "Oprah's public image suggests a healthy Type 2: generosity, strong emotional bonds with her guests, and a stated wish to transform people's lives. Her empathy, visible on screen, is a signature trait of this reading.",
  },
  elvis: {
    name: 'Elvis Presley',
    quote: "I figure all any kid needs is hope and the feeling he or she belongs. If I could do or say anything that would give some kid that feeling, I would believe I had contributed something to the world.",
    quoteSource: "Attributed",
    coreFear: "Not being valued at his true worth",
    coreDesire: "To be unconditionally loved and adored",
    whyThisType: "Elvis had an intense need for approval that drove him to give endlessly to those around him. His excessive generosity, sensitivity to criticism, and emotional dependence reveal an unintegrated Type 2.",
  },
  pope_francis: {
    name: 'Pope Francis',
    quote: "Who am I to judge?",
    quoteSource: "In-flight press conference returning from Rio, 2013",
    coreFear: "Being seen as indifferent or cold-hearted",
    coreDesire: "To serve and stay close to human suffering",
    whyThisType: "Pope Francis revolutionized the Vatican by rejecting pomp and staying close to the poor. His humility, refusal to judge, and prioritization of the marginalized are Type 2 expressions.",
  },

  // ── TYPE 3 — The Achiever ──
  obama_barack: {
    name: 'Barack Obama',
    quote: "Yes, we can.",
    quoteSource: "New Hampshire primary night speech, 2008",
    coreFear: "In a Type 3 reading: being seen as a failure",
    coreDesire: "In a Type 3 reading: to succeed and be recognized for his accomplishments",
    whyThisType: "Obama's public image suggests Type 3 in its most accomplished form: a keen sense of image, a gift for speaking to every audience, and a career marked by successes are strong markers.",
  },
  madonna: {
    name: 'Madonna',
    quote: "I am my own experiment. I am my own work of art.",
    quoteSource: "Attributed",
    coreFear: "In a Type 3 reading: being ordinary, going unnoticed",
    coreDesire: "In a Type 3 reading: to be number one, the absolute reference",
    whyThisType: "Madonna's public image suggests a textbook Type 3: constant image reinvention, open ambition, a keen sense of trends, and a career built on accomplishments.",
  },
  taylor_swift: {
    name: 'Taylor Swift',
    quote: "Never be ashamed of trying. Effortlessness is a myth.",
    quoteSource: "New York University commencement speech, 2022",
    coreFear: "In a Type 3 reading: public failure, being forgotten",
    coreDesire: "In a Type 3 reading: to be recognized as the best in her field",
    whyThisType: "Taylor Swift's public image suggests Type 3: strong command of her image, a new aesthetic with each album, and a knack for turning public setbacks into new successes.",
  },
  federer: {
    name: 'Roger Federer',
    quote: "I had to work very hard... to make it look easy.",
    quoteSource: 'Dartmouth commencement speech, 2024',
    coreFear: "In a Type 3 reading: losing his champion status",
    coreDesire: "In a Type 3 reading: excellence and universal recognition",
    whyThisType: "Federer's public image suggests the elegance of Type 3: maximum efficiency, polished image, tactical adaptability, and rare longevity at the top. His consistently managed personal brand is a signature of this reading.",
  },
  elon: {
    name: 'Elon Musk',
    quote: "When something is important enough, you do it even if the odds are not in your favor.",
    quoteSource: "60 Minutes (CBS), 2012",
    coreFear: "Failure, being outpaced by others",
    coreDesire: "To accomplish big projects and be recognized for his achievements",
    whyThisType: "Elon Musk's public image suggests a Type 3: a very strong drive toward success and performance, constant media visibility, and a close identification between himself and his companies.",
  },

  // ── TYPE 4 — The Individualist ──
  frida: {
    name: 'Frida Kahlo',
    quote: "I never painted dreams. I painted my own reality.",
    quoteSource: "Quoted in Time, \"Mexican Autobiography\", April 27, 1953",
    coreFear: "Having no identity of one's own, being ordinary",
    coreDesire: "To find unique meaning, to be authentic",
    whyThisType: "Frida Kahlo is the archetype of Type 4. Her transformation of pain into art, her radically personal aesthetic, her quest for identity, and her ability to sublimate suffering are quintessentially Romantic.",
  },
  mj: {
    name: 'Michael Jackson',
    quote: "All of us are products of our childhood. But I am the product of a lack of a childhood.",
    quoteSource: "Oxford Union speech, March 6, 2001",
    coreFear: "Being ordinary, without meaning",
    coreDesire: "To be unique, incomparable",
    whyThisType: "Michael Jackson is a complex Type 4: his sense of being radically different since childhood, his bodily transformation as identity quest, his chronic melancholy, and his deeply personal art all bear witness.",
  },
  dylan: {
    name: 'Bob Dylan',
    quote: "I really was never any more than what I was, a folk musician who gazed into the gray mist with tear-blinded eyes and made up songs that floated in a luminous haze.",
    quoteSource: "Chronicles: Volume One (memoir), 2004",
    coreFear: "Losing his authenticity, being co-opted",
    coreDesire: "To express a unique inner truth",
    whyThisType: "Dylan's public career suggests Type 4 in its artistic dimension: refusal to conform to expectations, successive reinventions that can be read as a quest for authenticity, and poetic melancholy running through much of his work.",
  },
  adele: {
    name: 'Adele',
    quote: "I don't make music for eyes. I make music for ears.",
    quoteSource: 'Rolling Stone, 2011',
    coreFear: "Having no identity of her own, no uniqueness",
    coreDesire: "To turn her emotions into something universal",
    whyThisType: "Adele's work suggests a flourishing Type 4: she says she draws on her own life to write songs that speak to everyone. The emotional intensity of her songs, their quest for depth, and their embraced melancholy are classic traits of this type.",
  },
  virginia: {
    name: 'Virginia Woolf',
    quote: "No need to hurry. No need to sparkle. No need to be anybody but oneself.",
    quoteSource: "A Room of One's Own (essay), 1929",
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
    quote: "My goal is simple. It is a complete understanding of the universe, why it is as it is and why it exists at all.",
    quoteSource: "Quoted in John Boslough, Stephen Hawking's Universe (1985)",
    coreFear: "That his brain might stop working",
    coreDesire: "To understand the fundamental laws of the universe",
    whyThisType: "Hawking embodied the resilience of Type 5: as illness took his body, he retreated even deeper into intellect. His entire life lived inside his head is the symbol of Type 5.",
  },
  tesla: {
    name: 'Nikola Tesla',
    quote: "Be alone, that is the secret of invention; be alone, that is when ideas are born.",
    quoteSource: "Interview in The New York Times, 1934",
    coreFear: "Misunderstanding, lack of intellectual resources",
    coreDesire: "To unlock the mysteries of nature",
    whyThisType: "Tesla was an overloaded Type 5: he lived almost entirely in his head, fully visualized inventions before building them, avoided social ties, and accumulated knowledge as protection.",
  },
  gates: {
    name: 'Bill Gates',
    quote: "If you're clever, you can learn to get the benefits of being an introvert, which might be, say, being willing to go off for a few days and think about a tough problem, read everything you can.",
    quoteSource: "Q&A, ABC TV (Australia), 2013",
    coreFear: "Being outpaced, lacking information",
    coreDesire: "To master complex systems",
    whyThisType: "Bill Gates's public image suggests an integrated Type 5: his passion for systems, his analytical approach to philanthropy, his avowed love of reading and reflection, and his public praise of the strengths of introversion are clear markers.",
  },
  sherlock_h: {
    name: 'Sherlock Holmes',
    quote: "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.",
    quoteSource: "The Sign of the Four (1890), Arthur Conan Doyle",
    coreFear: "Being wrong, missing a detail",
    coreDesire: "To see what others cannot",
    whyThisType: "Sherlock Holmes is the fictional Type 5 par excellence: intelligence as armor, emotional detachment, encyclopedic accumulation of knowledge, social withdrawal, and distant observation of the human world.",
  },

  // ── TYPE 6 — The Loyalist ──
  freud: {
    name: 'Sigmund Freud',
    quote: "The problem of anxiety is a nodal point at which the most various and important questions converge, a riddle whose solution would be bound to throw a flood of light on our whole mental existence.",
    quoteSource: "Introductory Lectures on Psychoanalysis, lecture 25, 1917",
    coreFear: "Lacking security, being betrayed",
    coreDesire: "To have reliable support, certainty",
    whyThisType: "Freud built his theory around anxiety, no accident for a Type 6. His paranoia about dissent (Jung, Adler), his need to control his circle, and his view of the world as fundamentally threatening are characteristic.",
  },
  tom_hanks: {
    name: 'Tom Hanks',
    quote: "When are they going to discover that I am, in fact, a fraud and take everything away from me?",
    quoteSource: "Fresh Air interview (NPR), 2016",
    coreFear: "Lacking support, not measuring up",
    coreDesire: "To be reliable and trust those around him",
    whyThisType: "Tom Hanks's public image suggests a positive Type 6: loyalty, commitment, a self-doubt he has spoken about in interviews despite his success, and roles in which characters find meaning through community and loyalty.",
  },
  jennifer: {
    name: 'Jennifer Aniston',
    quote: "To be friends with Courteney is to be family with Courteney.",
    quoteSource: "Speech at Courteney Cox's Hollywood Walk of Fame ceremony, 2023",
    coreFear: "Lacking support, losing her bearings",
    coreDesire: "Solid, lasting friendships",
    whyThisType: "Jennifer Aniston's public image suggests Type 6: lasting, visible friendships (notably with her Friends co-stars), repeated collaborations with the same actors, and a visible attachment to continuity make her, in this reading, a clear Type 6.",
  },
  katniss: {
    name: 'Katniss Everdeen',
    quote: "I protect Prim in every way I can, but I'm powerless against the reaping.",
    quoteSource: "The Hunger Games, Suzanne Collins, 2008 (chapter 1)",
    coreFear: "Losing those she protects",
    coreDesire: "To protect her family at any cost",
    whyThisType: "Katniss is a counter-phobic Type 6: she charges into danger to protect her own. Her absolute loyalty, skepticism of power, courage in the face of fear, and constant questioning of authority are Type 6 traits.",
  },
  twain: {
    name: 'Mark Twain',
    quote: "Courage is resistance to fear, mastery of fear, not absence of fear.",
    quoteSource: "Pudd'nhead Wilson, 1894",
    coreFear: "Hypocrisy and social betrayal",
    coreDesire: "A more honest and just world",
    whyThisType: "Twain was a skeptical, counter-phobic Type 6. His humor served to denounce the hypocrisies of American society. His mistrust of conformism, anti-authoritarianism, and financial anxieties are Type 6 markers.",
  },

  // ── TYPE 7 — The Enthusiast ──
  robin: {
    name: 'Robin Williams',
    quote: "You're only given a little spark of madness, and if you lose that, you're nothing.",
    quoteSource: "Off the Wall, stand-up special at the Roxy (HBO, 1978)",
    coreFear: "Suffering, pain, being trapped",
    coreDesire: "To be happy, free, and stimulated",
    whyThisType: "Robin Williams is Type 7 in its tragic dimension: humor as escape from inner pain. His overflowing energy, inability to sit still, frenetic creativity, and hidden depression are the portrait of Type 7.",
  },
  mozart: {
    name: 'Mozart',
    quote: "I am happier when I have something to compose, which is, after all, my only joy and passion.",
    quoteSource: "Letter to his father, Munich, 11 October 1777",
    coreFear: "Boredom, creative limitation",
    coreDesire: "Constant stimulation, pure joy",
    whyThisType: "Mozart is a brilliant Type 7: inexhaustible creative energy, inability to finish one project before starting several others, schoolboy humor, and lightness in the face of life's seriousness are emblematic traits.",
  },
  branson: {
    name: 'Richard Branson',
    quote: "Fun is one of the most important, and underrated, ingredients in any successful venture. If you're not having fun, then it's probably time to call it quits and try something else.",
    quoteSource: "The Virgin Way, 2014",
    coreFear: "In a Type 7 reading: boredom, routine",
    coreDesire: "In a Type 7 reading: to live a thousand adventures and ventures",
    whyThisType: "Richard Branson's public career suggests an entrepreneurial Type 7: a host of very different ventures, an openly stated taste for novelty and adventure, a contagious optimism, and a way of bouncing back after failures.",
  },
  jim: {
    name: 'Jim Carrey',
    quote: "You can fail at what you don't want, so you might as well take a chance on doing what you love.",
    quoteSource: "Maharishi University of Management commencement speech, 2014",
    coreFear: "In a Type 7 reading: being stuck in pain, being deprived of freedom",
    coreDesire: "In a Type 7 reading: freedom, the joy of living",
    whyThisType: "Jim Carrey's public image suggests Type 7: overflowing comic energy, an openly stated taste for freedom and joy, and, by his own account, a childhood marked by money troubles. His later interest in spirituality can be read as a Type 7 integration movement.",
  },
  tony_stark: {
    name: 'Tony Stark',
    quote: "I am Iron Man.",
    quoteSource: "Iron Man (2008), Marvel Studios",
    coreFear: "Losing control, being vulnerable",
    coreDesire: "To have it all: genius, parties, glory",
    whyThisType: "Tony Stark is a classic Type 7: forward flight, jokes to dodge deep conversation, multiple simultaneous projects, and turning fear (death) into literal armor. His integration toward Type 5 also gives him depth.",
  },

  // ── TYPE 8 — The Challenger ──
  churchill: {
    name: 'Winston Churchill',
    quote: "Never give in, never give in, never, never, never, never, in nothing, great or small, large or petty, never give in except to convictions of honour and good sense.",
    quoteSource: "Speech at Harrow School, 29 October 1941",
    coreFear: "Being controlled or betrayed",
    coreDesire: "To protect what's his, to master his fate",
    whyThisType: "Churchill is a pure Type 8: his categorical refusal to submit to Hitler, his bluntness in decisions, his indomitable vitality, and his way of turning others' fear into collective strength.",
  },
  mlk: {
    name: 'Martin Luther King',
    quote: "Injustice anywhere is a threat to justice everywhere.",
    quoteSource: "Letter from Birmingham Jail, 1963",
    coreFear: "That injustice might win",
    coreDesire: "To protect the vulnerable, to deliver justice",
    whyThisType: "MLK is a flourishing Type 8. His power of conviction, courage in the face of death threats, willingness to physically take a stand, and passion for protecting the weak against the strong are integrated Type 8.",
  },
  steve_jobs: {
    name: 'Steve Jobs',
    quote: "The people who are crazy enough to think they can change the world, are the ones who do.",
    quoteSource: "Apple Think different ad (1997), version narrated by Steve Jobs",
    coreFear: "Mediocrity, loss of control",
    coreDesire: "To impose his vision on the world",
    whyThisType: "Steve Jobs is an intense Type 8: his reality distortion field, his bluntness with teams, his absolute refusal to compromise, and his way of dominating through sheer force of will.",
  },
  serena: {
    name: 'Serena Williams',
    quote: "I really think a champion is defined not by their wins but by how they can recover when they fall.",
    quoteSource: "US Open press conference, 2012",
    coreFear: "In a Type 8 reading: appearing vulnerable, losing control",
    coreDesire: "In a Type 8 reading: to stay in control, not to bend",
    whyThisType: "Serena Williams's public image suggests Type 8: rare intensity in competition, a refusal to yield under pressure, and plain speaking, including toward umpire decisions she found unfair.",
  },
  darth_vader: {
    name: 'Darth Vader',
    quote: "You don't know the power of the dark side!",
    quoteSource: "Star Wars: Return of the Jedi (1983)",
    coreFear: "Vulnerability, loving and losing",
    coreDesire: "To control, never to be hurt again",
    whyThisType: "Darth Vader is Type 8 in its disintegration toward Type 5: the fear of losing Padmé drove him to control everything. His mask (literal and symbolic), his brutality, and his final redemption through his son's love are a perfect metaphor.",
  },

  // ── TYPE 9 — The Peacemaker ──
  dalai: {
    name: 'Dalai Lama',
    quote: "If you want others to be happy, practice compassion; and if you want yourself to be happy, practice compassion.",
    quoteSource: "The Art of Happiness, preface to the 10th anniversary edition, 2009",
    coreFear: "In a Type 9 reading: conflict, division",
    coreDesire: "In a Type 9 reading: inner and outer peace",
    whyThisType: "The Dalai Lama's public image suggests Type 9 in its spiritual dimension: an emphasis on the interdependence of all things, non-violence, a visible serenity in hardship, and a universal message of harmony.",
  },
  audrey: {
    name: 'Audrey Hepburn',
    quote: "I myself was born with an enormous need for affection and a terrible need to give it.",
    quoteSource: "Interview with The New York Times, 1991",
    coreFear: "Conflict and discord",
    coreDesire: "Harmony, to be loved by all",
    whyThisType: "Audrey Hepburn was a Type 9: her legendary gentleness, her quiet humanitarian work for UNICEF, her aversion to Hollywood scandal, and her way of defusing tensions on set are the signs.",
  },
  morgan: {
    name: 'Morgan Freeman',
    quote: "Stop talking about it. I'm going to stop calling you a white man. And I'm going to ask you to stop calling me a black man.",
    quoteSource: "60 Minutes (CBS), interview with Mike Wallace, December 2005",
    coreFear: "In a Type 9 reading: division and chaos",
    coreDesire: "In a Type 9 reading: unity and mutual understanding",
    whyThisType: "Morgan Freeman's public image suggests Type 9: a soothing voice, roles as wise, unifying figures (God, Nelson Mandela, Lucius Fox), and a calm presence on screen and in interviews.",
  },
  lincoln: {
    name: 'Abraham Lincoln',
    quote: "We are not enemies, but friends. We must not be enemies.",
    quoteSource: "First Inaugural Address, March 4, 1861",
    coreFear: "Permanent civil war, division",
    coreDesire: "To reunify, to pacify",
    whyThisType: "Lincoln is a remarkable Type 9. His 'Team of Rivals' policy (appointing his enemies to his cabinet), tolerance of opponents, and constant search for compromise that preserved national unity are pure Type 9.",
  },
  walt: {
    name: 'Walt Disney',
    quote: "To all who come to this happy place: Welcome. Disneyland is your land.",
    quoteSource: "Disneyland dedication speech, July 17, 1955",
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
    quote: "Be alone, that is the secret of invention; be alone, that is when ideas are born.",
    author: 'Nikola Tesla',
    explanation: "Tesla lived withdrawn into his intellect. This quote reveals the Type 5 need: stepping back from the world to think, with solitude as the condition for discovery.",
  },
  v3: {
    indices: [
      "This person renounced all material comfort out of moral conviction.",
      "They built a strict ethical code they imposed on themselves before teaching it to others.",
      "His fasts weren't weakness but political weapons grounded in principle.",
      "He led India to independence through absolute non-violence.",
    ],
    explanation: "Gandhi is Type 1 par excellence. Moral principles guided every decision and he expected the same rigor of himself that he asked of others: the very definition of the Reformer.",
  },
  v4: {
    scene: "Every morning, he redid yesterday's calculations from scratch, not because he doubted the result, but to be sure the method was flawless. His notebooks contained no crossings-out. Mistakes were rewritten on a fresh page.",
    keyDetail: "Redoing the calculations for the method, not the result: no crossings-out, perfect form.",
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
      "First woman to win a Nobel Prize, she earned two, in different disciplines.",
    ],
    explanation: "Marie Curie embodies Type 1 in its most heroic form: the moral ideal (science for all) outranks personal survival. Her refusal of the patent and absolute rigor are her signature.",
  },
  v7: {
    quote: "To have faults and not to reform them: this, indeed, should be pronounced having faults.",
    author: 'Confucius',
    explanation: "This quote reveals the heart of Type 1: moral vigilance and the duty to correct oneself. For Confucius, the real fault is not the mistake but the refusal to amend it.",
  },
  v8: {
    indices: [
      "This person was obsessed with the idea that loved ones might betray or disappoint him.",
      "He needed loyal disciples but broke violently with them at the slightest disagreement.",
      "He saw the world as fundamentally hostile, ruled by hidden, uncontrollable forces.",
      "He founded psychoanalysis by exploring anxieties and defense mechanisms.",
    ],
    explanation: "Freud is a fascinating Type 6: he built an entire theory around anxiety, Type 6's central topic. His paranoia about dissent (Jung, Adler) and view of the world as fundamentally threatening bear witness.",
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
    quote: "I really was never any more than what I was, a folk musician who gazed into the gray mist with tear-blinded eyes and made up songs that floated in a luminous haze.",
    author: "Bob Dylan",
    explanation: "In his memoir, Dylan rejects the role of voice of a generation he was handed and describes himself through his melancholy. This can be read as the Type 4 rejection of any co-opting. In this reading, giving up authenticity would mean losing one's identity: the central fear of the Romantic.",
  },
  a3: {
    indices: [
      "This person used humor as a shield to hide deep inner suffering.",
      "His on-stage energy was overflowing: he couldn't sit still or finish a single idea.",
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
      "His humor was childish and often inappropriate: he made scatological jokes at the Empress's court.",
      "He composed several works at once, unable to commit to just one.",
      "Viennese prodigy, he composed over 600 works before dying at 35.",
    ],
    explanation: "Mozart is the musical Type 7 par excellence. His inability to be bored, schoolboy humor, multiple creative energy, and irreducible joy of life even amid hardship are classic markers.",
  },
  a6: {
    scene: "She refused to leave her apartment for days on end. She filled entire notebooks, not to publish, but to capture something elusive. Friends sometimes found her crying at a sunset: too beautiful not to hurt.",
    keyDetail: "Crying at a sunset: beauty hurts because it reveals what's missing.",
    explanation: "This is quintessential Type 4: beauty intensifies the sense of lack rather than filling it. The Romantic feels things with an intensity that can turn against them.",
  },
  a7: {
    quote: "I don't make music for eyes. I make music for ears.",
    author: 'Adele',
    explanation: "This can be read as the essence of Type 4: wanting to be recognized for what you express rather than for the image you project. A 2 would first seek to please, a 9 to avoid making waves: here, authentic expression comes first.",
  },
  a8: {
    indices: [
      "This writer described human consciousness as a flow impossible to interrupt.",
      "She suffered intense depressive episodes that she turned into literary material.",
      "Her novels don't tell a story: they capture the space between words.",
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
    explanation: "This quote reveals Type 8 in its luminous form: defending the weak against the oppressor. MLK wasn't afraid to name injustice and call for nonviolent direct action.",
  },
  l3: {
    indices: [
      "This person naturally adjusted his language and style to his audience.",
      "His speeches were meticulously crafted to produce a precise effect.",
      "Hundreds of marketing professionals once voted his campaign 'Marketer of the Year', ahead of Apple.",
      "First African-American U.S. president, he won the Nobel Peace Prize in 2009.",
    ],
    explanation: "On this reading, Obama illustrates Type 3 in its most accomplished form: a keen sense of public image, an ability to adapt to any audience, and a path marked by historic accomplishments.",
  },
  l4: {
    descA: "Wants to control the environment to protect himself. Confronts directly. His strength comes from within. He protects the weak.",
    descB: "Wants to reach his goals to be admired. Adjusts his image. His strength comes from others' gaze. He wants to win.",
    keyDiff: "Type 8 is power-and-protection oriented. Type 3 is success-and-image oriented. One wants to control, the other wants to shine.",
  },
  l5: {
    indices: [
      "This person spent 27 years in prison without abandoning his principles.",
      "On release, he refused revenge and chose reconciliation: by principle, not weakness.",
      "Friends described an inner discipline of frightening rigor.",
      "Father of the Rainbow Nation, he ended apartheid in South Africa.",
    ],
    explanation: "Mandela is Type 1 in its most heroic dimension: the moral ideal outranks everything, even personal freedom. His post-apartheid reconciliation is integrated Type 1 toward Type 7: joy in justice realized.",
  },
  l6: {
    scene: "In a meeting, he watched a presentation in silence for 10 minutes. Then he said: 'This is shit.' He gave no further explanation. The team redid the work entirely. The next version was approved in 30 seconds.",
    keyDetail: "Verdict without explanation, absolute power, no compromise, and the team redoes everything without question.",
    explanation: "This behavior is characteristic of Type 8 in a position of authority: instant decision, no need to justify, and the implicit expectation that one's will be carried out. Strength imposes itself.",
  },
  l7: {
    quote: "When something is important enough, you do it even if the odds are not in your favor.",
    author: 'Elon Musk',
    explanation: "This line, said in 2012 about founding SpaceX, sounds like sheer will (Type 8) or duty (Type 1): that's the trap. The Type 3 tell is the stake: importance is measured by impact, reputation, legacy. The 3 takes risks mainly out of ambition, where the 8 takes them out of an appetite for confrontation.",
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
      "This person radically changed her image with almost every album, while staying on top for decades.",
      "In each era, she teamed up with producers from the hottest scenes, from electronica to hip-hop.",
      "She co-founded her own record label, and her career is often cited as a model of brand management.",
      "Queen of pop, icon of the 80s–2000s, she sold over 300 million records.",
    ],
    explanation: "On this reading, Madonna is a textbook Type 3: her successive reinventions suggest less a quest for authenticity (that would be Type 4) than a keen sense of what resonates with the public. Her image and her brand seem to be one, a trait associated with the Achiever.",
  },
  i2: {
    quote: "I'd like to be a queen of people's hearts, in people's hearts.",
    author: 'Princess Diana',
    explanation: "This quote reveals Type 2 in all its complexity: the need to be loved disguised as a desire to give. Diana sought love through service: the central dynamic of the Helper.",
  },
  i3: {
    indices: [
      "This personality was described as impossible to follow in conversation: he leapt from one idea to another at lightning speed.",
      "Friends said he was always 'on', as if stopping would have destroyed him.",
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
      "She came back stronger after every injury or defeat, as if the obstacle energized her.",
      "Facing an opponent, her attitude seemed to say: 'I will not back down.'",
      "Greatest tennis player in history, 23 Grand Slam titles.",
    ],
    explanation: "On this reading, Serena Williams illustrates Type 8: intensity, plain speaking and a refusal to bend under pressure. The Challenger stands firm where others back down.",
  },
  i6: {
    scene: "In a radio interview, he says that no matter what you've done, there always comes a point where you wonder how you got here, and when people will find out you're a fraud. Yet he won the Best Actor Oscar two years in a row.",
    keyDetail: "Two Oscars and he still talks about doubt: in this reading, success isn't enough to quiet the worry.",
    explanation: "These public remarks by Tom Hanks illustrate Type 6 well: doubt doesn't vanish with success. The Loyalist seeks security, and even at the top, doubt can persist.",
  },
  i7: {
    quote: "You can fail at what you don't want, so you might as well take a chance on doing what you love.",
    author: 'Jim Carrey',
    explanation: "This quote suggests Type 7: choosing what you love and taking a chance rather than staying safe. On this reading, it carries the drive toward freedom and joy.",
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
      "He hoards knowledge in precise and perfectly useless fields: types of mud across the districts of London.",
      "Emotions strike him as 'noise data' that disrupts analysis.",
      "Detective at 221B Baker Street, he solves cases Scotland Yard can't.",
    ],
    explanation: "Sherlock Holmes is the fictional Type 5 par excellence. His emotional detachment, intellect as sole armor, distant observation of the human world, and encyclopedic collection of useless lore define the Investigator.",
  },
  f2: {
    quote: "You don't know the power of the dark side!",
    author: "Darth Vader, Return of the Jedi",
    explanation: "This quote is the Type 8 reveal beneath the mask. Vader's whole tragedy comes from a Type 8 who let fear corrupt him: the fear of vulnerability (losing Padmé) turned him into a tyrant.",
  },
  f3: {
    indices: [
      "This character will do anything to protect her family, even sacrifice herself.",
      "She isn't naturally brave: she is terrified, but she acts anyway.",
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
      "Billionaire genius, philanthropist playboy: Iron Man.",
    ],
    explanation: "Tony Stark is a classic Type 7. His forward flight, humor as armor, multiple compulsive projects, and transformation of his fear of death into literal armor are markers of the Enthusiast.",
  },
  f6: {
    scene: "He had lived alone for years. His apartment was filled with books on apparently unrelated subjects. When asked how he was, he answered with facts. When someone cried in front of him, he quietly left the room, not from cruelness, but because he didn't know what to do with emotions.",
    keyDetail: "Leaving when someone cries: no cruelty, just sincere emotional incompetence.",
    explanation: "Withdrawal from emotion is a fundamental Type 5 trait. The Investigator doesn't flee out of malice: emotions are simply a domain where he lacks the resources to respond.",
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
      "This person made helping others change their lives the common thread of her career.",
      "She was often moved to tears on air with her guests: her empathy shows on screen.",
      "One day, she had a car given to each of the 276 people in her audience, all chosen because they needed one.",
      "One of the first African-American women billionaires, thanks to her empathetic talk show that ran for 25 seasons.",
    ],
    explanation: "On this reading, Oprah illustrates Type 2: spectacular generosity, great sensitivity to her guests' emotions, and a stated wish to help others transform their lives. The Helper is fed by connection.",
  },
  s2: {
    indices: [
      "This person had a compulsive need to be loved: every applause fed him like a drug.",
      "He bought cars, houses, and jewelry for strangers met on the street.",
      "His mother was the most important person in his life: he gave her a pink Cadillac.",
      "The 'King' of rock 'n' roll, dead at 42 in his Graceland home.",
    ],
    explanation: "Elvis is Type 2 in its dependent form: constant need for love and validation, compulsive generosity toward those close (the 'Memphis Mafia'), and inability to survive when adoration faded.",
  },
  s3: {
    quote: "Never be ashamed of trying. Effortlessness is a myth.",
    author: 'Taylor Swift',
    explanation: "This line, from her 2022 New York University commencement speech, can be read as Type 3: owning ambition and the work success takes. For the Achiever, success is built, it doesn't fall from the sky.",
  },
  s4: {
    quote: "I had to work very hard... to make it look easy.",
    author: 'Roger Federer',
    explanation: "This line can be read as Type 3 in its most elegant form: hard work also serves an image, that of ease. The trap: Type 1 works hard to do things right, Type 3 also cares about the effect produced. Federer stayed at the top for two decades while making it all look natural.",
  },
  s5: {
    indices: [
      "This actress has stayed close, for decades, to the same group of friends she met on set.",
      "Her public image is that of a faithful friend who values trust and loyalty.",
      "With her co-stars from a 90s series, she presented a united front to get equal pay for all, and reunited with them for a TV special in 2021.",
      "Star of the sitcom Friends, who became a worldwide icon as Rachel Green.",
    ],
    explanation: "Jennifer Aniston's public image suggests Type 6: loyalty to her inner circle, group solidarity, and attachment to stable anchors. The Loyalist prefers familiar ground, however imperfect, to adventure.",
  },
  s6: {
    scene: "When asked about hot-button issues, he often replies with a line that defuses conflict. Asked 'How do you get rid of racism?', his answer, strikingly simple, sparked debate: stop talking about it. On set, his calm presence and deep voice ease all tension. He takes very different roles (God, a president, a prisoner) without ever being boxed into one image.",
    keyDetail: "Defusing conflict through simplicity rather than debating it: preserving harmony over winning the argument.",
    explanation: "On this reading, Morgan Freeman illustrates Type 9: avoiding needless divisions, seeking unity over confrontation, with a soothing presence. The Peacemaker preserves peace before settling scores.",
  },
  s7: {
    indices: [
      "This person said that at the height of his career, he was so lonely he would walk the streets looking for someone to talk to.",
      "He transformed his body radically over the years, like a physical identity quest.",
      "His music constantly speaks of pain, lost childhood, and absolute otherness.",
      "The 'King of Pop,' author of Thriller, the best-selling album in history.",
    ],
    explanation: "Michael Jackson is an archetypal Type 4: a sense of being radically different since childhood, bodily transformations as identity quests, and deeply personal art tinged with melancholy. The Romantic lives loneliness at the heart of adoration.",
  },
  s8: {
    indices: [
      "This writer defined courage as resistance to fear and mastery of fear, not absence of fear.",
      "His biting humor served to denounce the hypocrisies of authorities and institutions.",
      "Ruined by bad investments, he paid back all his creditors through a lecture tour around the world.",
      "American author of The Adventures of Tom Sawyer and Huckleberry Finn.",
    ],
    explanation: "Mark Twain is a counter-phobic Type 6: his biting irony was a weapon against social anxiety, his mistrust of authority is typical of the Loyalist, and his humor let him voice uncomfortable truths without exposing himself directly.",
  },

  // ── DOSSIER 7 — Masters ──
  m1: {
    indices: [
      "This person recalls rehearsing a pivotal speech for weeks, until she could recite it word for word.",
      "Her public philosophy boils down to one phrase: 'When they go low, we go high.'",
      "She launched a national campaign against childhood obesity, starting by setting an example: a vegetable garden planted with schoolchildren.",
      "First Lady of the United States from 2009 to 2017, former lawyer, Princeton and Harvard graduate.",
    ],
    explanation: "On this reading, Michelle Obama illustrates Type 1: self-discipline, a sharp sense of duty, and a choice to answer attacks by taking the high road ('we go high'). The Reformer measures herself first against her own standards.",
  },
  m2: {
    quote: "Love begins at home, and it is not how much we do, but how much love we put in the action that we do.",
    author: 'Mother Teresa',
    explanation: "This quote reveals the essence of Type 2: measuring one's life by the love given rather than by results. Mother Teresa said it when receiving the Nobel Peace Prize, typical of a Type 2 for whom every act is worth the love put into it.",
  },
  m3: {
    indices: [
      "This religious leader refused to live in the traditional palace, staying in a modest guest room.",
      "On Holy Thursday, he would wash and kiss the feet of prisoners, refugees or disabled people, including women and Muslims.",
      "His famous reply about homosexuality in the Church: 'Who am I to judge?'",
      "First Jesuit pope and first Latin American pope, elected in 2013.",
    ],
    explanation: "Pope Francis embodied Type 2: refusal of pomp, physical closeness with the poor, and rejection of judgment as a barrier to giving. The Helper is defined by service, not hierarchical rank.",
  },
  m4: {
    descA: "Lives by strict moral principles. Seeks to improve the world through rigor. Gives out of duty, not from a need to be loved.",
    descB: "Gives to others with immediate warmth. Seeks to be loved in return, even unconsciously. Giving is also an attachment strategy.",
    keyDiff: "Type 1 gives by principle: they would do the same thing alone. Type 2 gives to create a bond: they need it to be received.",
  },
  m5: {
    indices: [
      "This person launched dozens of unrelated companies: music, airline, train, space, mobile.",
      "He often says that if you're not having fun, it's time to call it quits and try something else.",
      "He turned every failure into a new media adventure: flying in hot-air balloons, boats, rockets.",
      "Founder of the Virgin group, British billionaire known for his publicity stunts.",
    ],
    explanation: "On this reading, Richard Branson illustrates an entrepreneurial Type 7: a taste for novelty, optimism, a dislike of boredom, and a way of bouncing back after failures. The Enthusiast is fed by multiple options.",
  },
  m6: {
    quote: "If you want others to be happy, practice compassion; and if you want yourself to be happy, practice compassion.",
    author: 'Dalai Lama',
    explanation: "This quote suggests Type 9 in its spiritual dimension: seeing the unity between self and others. For the Peacemaker, there is no individual peace separate from collective peace.",
  },
  m7: {
    indices: [
      "This person watched his body slowly disappear from an incurable disease.",
      "The more his body froze, the more he took refuge in pure thought and astrophysics.",
      "He wrote his most famous book forcing himself to use only one equation, for the sake of elegance.",
      "British astrophysicist with ALS, author of A Brief History of Time.",
    ],
    explanation: "Stephen Hawking embodied the resilience of Type 5: as his body vanished, he doubled his investment in intellect. For the Investigator, thought is the safest territory, and sometimes the last one left.",
  },
  m8: {
    indices: [
      "This person isolates himself twice a year in a cabin to read for a week without interruption.",
      "His philanthropy is known for its highly analytical approach: measuring lives saved per dollar spent.",
      "He has said that as a child he read an entire encyclopedia, volume by volume, out of sheer curiosity.",
      "Co-founder of Microsoft and of one of the world's largest private philanthropic foundations.",
    ],
    explanation: "Bill Gates's public image suggests an integrated Type 5: time set aside to think (his famous Think Weeks), systematic accumulation of knowledge, and an analytical approach applied even to giving. The Investigator brings intellectual rigor to every domain.",
  },
};

// ── Fun facts ─────────────────────────────────────────────────
export const FUN_FACTS_EN: Record<string, string> = {
  // Type 1
  mandela:        "In prison, Nelson Mandela learned Afrikaans so he could argue better with his jailers, typical of a Type 1 who believes justice is won through rigor, not resentment.",
  gandhi:         "Gandhi weighed himself every day and meticulously logged what he ate. This moral discipline pushed to the extreme, applied to himself first, is the mark of Type 1.",
  obama_michelle: "Michelle Obama has recalled rehearsing her 2008 Democratic convention speech for weeks, until she knew it by heart. On the night, a teleprompter failed, and she delivered it without a hitch. Seen through the Enneagram, this pursuit of 'doing it right' is very telling of Type 1.",
  marie_curie:    "Marie Curie refused her entire life to patent her discoveries, believing science should belong to everyone. An absolute moral integrity, signature of Type 1.",
  confucius:      "In the Analects, Confucius sums up his life in stages and concludes: 'At seventy, I could follow what my heart desired, without transgressing what was right.' As if his whole life had been a long training in becoming just.",

  // Type 2
  diana:          "Lady Diana shook the hands of AIDS patients at a time when people avoided them. Her ability to draw close to others' suffering, at the expense of protocol, is the essence of Type 2.",
  teresa:         "In her 1979 Nobel Peace Prize lecture in Oslo, Mother Teresa spoke of loving others 'not in big things, but in small things with great love.' This focus on the attention given rather than the impact measured is typical of Type 2.",
  oprah:          "In 2004, Oprah Winfrey had a car, supplied by a partner carmaker, given to each of the 276 people in her audience, all chosen because they needed one. Turning generosity into a shared, spectacular moment can be read as a Type 2 hallmark.",
  elvis:          "Elvis Presley bought Cadillacs for strangers met on the street. His compulsive need to give, to be loved in return, is an intense expression of Type 2.",
  pope_francis:   "Pope Francis washes and kisses the feet of prisoners every Holy Thursday, including women and Muslims. This act of service toward the marginalized is very Type 2.",

  // Type 3
  obama_barack:   "Barack Obama wrote most of his 2004 Democratic convention keynote himself, in longhand, working on it for about two weeks, often past midnight. The speech introduced him to the whole country. Seizing the moment when all eyes are on you can be read as the art of Type 3.",
  madonna:        "Madonna changed her look and sound with almost every album, from 80s pop to the electronica of 'Ray of Light'. It can be read as a very Type 3 idea: staying in the spotlight means always surprising.",
  taylor_swift:   "After the original recordings of her first albums (her 'masters') were bought by a third party in 2019, Taylor Swift re-recorded four of them, then bought her masters back in 2025. Turning a public setback into a strategic victory can be read as a Type 3 signature.",
  federer:        "Roger Federer broke down in tears at the 2009 Australian Open trophy ceremony, after losing the final to Nadal. Showing emotion in public while remaining the image of elegance: a rare balance for a Type 3.",
  elon:           "In 2018, Elon Musk said on American TV that he was sleeping at the Tesla factory to hit Model 3 production targets. It can be read as an intense expression of Type 3: total commitment to the goal and its visible success.",

  // Type 4
  frida:          "Frida Kahlo painted some 55 self-portraits. 'I paint self-portraits because I am so often alone, because I am the person I know best,' she explained. Pure essence of Type 4.",
  mj:             "In 1993, Michael Jackson told Oprah Winfrey: 'On stage for me was home.' But once he got off stage, he felt sad and lonely. This paradox, being adored and misunderstood, is the deep experience of Type 4.",
  dylan:          "After his 2016 Nobel Prize in Literature was announced, Bob Dylan stayed silent for about two weeks, then skipped the ceremony, citing prior commitments. He received his medal at a private meeting in Stockholm in April 2017. It can be read as an artist's refusal to play the expected game, very Type 4.",
  adele:          "Adele named her first four albums after her age when she wrote them (19, 21, 25, 30), each one a snapshot of a period of her life. Turning her work into a diary of her own experience can be read as a Type 4 signature.",
  virginia:       "Virginia Woolf wrote standing up at a lectern, just as her painter sister worked at an easel. Making every detail of daily life an expression of self: signature of Type 4.",

  // Type 5
  einstein:       "Einstein owned several identical suits so he wouldn't have to decide what to wear. Saving mental energy for what really matters: very Type 5.",
  hawking:        "For A Brief History of Time, Stephen Hawking was warned that each equation would halve the sales. He resolved to include none, but in the end put in just one, Einstein's E=mc². This pursuit of elegance in transmitting knowledge is purely Type 5.",
  tesla:          "Nikola Tesla could fully visualize his inventions in his head, mentally 'running' them for weeks before building a single prototype. Pure inner vision, Type 5 hallmark.",
  gates:          "Bill Gates would isolate himself twice a year in a cabin to read for a week without interruption: his famous 'Think Week.' The need to retreat to think is central to Type 5.",
  sherlock_h:     "Sherlock Holmes didn't know that the Earth orbited the Sun: he refused to store information he didn't deem useful to his work. This extreme rationalization of knowledge is the archetype of Type 5.",

  // Type 6
  freud:          "Sigmund Freud refused to travel without his personal armchair. This need for familiar anchors, even on the great intellectual adventure, is typical of Type 6.",
  tom_hanks:      "Tom Hanks has made five films with Steven Spielberg, five with Ron Howard and five with Robert Zemeckis. This loyalty to trusted collaborators suggests Type 6.",
  jennifer:       "In 2021, more than fifteen years after Friends ended, Jennifer Aniston reunited with her co-stars for a TV special. This loyalty to long-standing bonds suggests Type 6.",
  katniss:        "Katniss Everdeen volunteers in her sister's place, not from heroism, but from absolute loyalty to her own. Brave action driven by protection: essence of Type 6.",
  twain:          "The line about 'troubles that never happened', often credited to Mark Twain, isn't his: it was already folk wisdom in his lifetime. Still, it captures the anticipatory anxiety associated with Type 6.",

  // Type 7
  robin:          "Robin Williams improvised for hours, turning every interview into a show. This ability to flee silence through overflowing creativity is typical of Type 7.",
  mozart:         "Mozart often composed while playing dice or clowning around. Mixing pleasure and genius, without ranking the two, is very Type 7.",
  branson:        "Richard Branson launched Virgin Records, Virgin Atlantic, Virgin Mobile, Virgin Galactic… fields with no obvious link between them. It can be read as the Type 7 taste for many possibilities.",
  jim:            "Jim Carrey has said that early in his career he wrote himself a $10 million check 'for acting services rendered', dated 1995. It can be read as the bold optimism associated with Type 7.",
  tony_stark:     "Tony Stark builds his armor in a cave to escape a kidnapping, and walks out cracking jokes. Turning suffering into adventure: pure Type 7.",

  // Type 8
  churchill:      "Churchill received his ministers in his bath. This total absence of awkwardness, this rejection of protocol when it blocks action: very Type 8.",
  mlk:            "Stabbed in 1958 with the blade against his aorta, Martin Luther King had to lie perfectly still for weeks (a single sneeze could have killed him), then returned to the fight, never backing down. Refusing to be intimidated: essence of Type 8.",
  steve_jobs:     "With Steve Jobs, colleagues said, you were either a hero or a nobody, sometimes on the same day. Yet, according to his biographer, dozens of those he treated most harshly admitted he got them to do things they never dreamed possible. Bluntness and recognition: classic Type 8 pairing.",
  serena:         "Serena Williams revealed she won the 2017 Australian Open while about 8 weeks pregnant. It can be read as the endurance and determination associated with Type 8.",
  darth_vader:    "Darth Vader chokes an officer who contradicts him without even touching him. Type 8 under stress, when power becomes the only language, reaches this caricature.",

  // Type 9
  dalai:          "The Dalai Lama is known for his laughter, even when speaking of grave hardships. It can be read as the Type 9 ability to go through suffering without dissolving in it.",
  audrey:         "In 1991, Audrey Hepburn told CBS: 'I find it very hard to look at myself.' She felt her performances fell short of what they should have been. Making herself so small next to her own work: you can read Type 9 self-effacement in it.",
  morgan:         "Morgan Freeman is one of the most recognized narration voices in film and documentary, and he even played God (in Bruce Almighty). It can be read as the calm presence associated with Type 9.",
  lincoln:        "Lincoln kept the letters of his political opponents in his pocket, not for revenge, but to better understand them. This radical empathy toward all sides: signature of Type 9.",
  walt:           "Walt Disney wanted Disneyland to be a place 'where the parents and the children could have fun together.' Creating a world where everyone gets along: the utopia of Type 9.",
};
