// ═══════════════════════════════════════════════════════════════
//  EN TRANSLATIONS — Profile detail (TYPES content)
//  Mirrors the FR content in constants/data.ts TYPES.
//  Used by Profile detail page when locale === 'en'.
// ═══════════════════════════════════════════════════════════════

export interface TypeContentEn {
  short: string;
  fear: string;
  need: string;
  metaphor: string;
  integrationDesc: string;
  disintegrationDesc: string;
  ages: { '5-8': string; '8-12': string; '13-16': string };
  keys: { title: string; desc: string }[];
  belief: string;
  compulsionName: string;
  compulsionDesc: string;
  virtueName: string;
  virtueDesc: string;
  identity: string;
  missionLibre: string;
  wings: string;
}

export const TYPES_EN: Record<number, TypeContentEn> = {
  1: {
    short: 'A sharp sense of right and wrong, a need for order and justice.',
    fear: 'Not being good enough, doing wrong',
    need: 'Order, rightness, integrity',
    metaphor: "The Reformer is like a plumb line — the tool masons use to check that a wall is straight. The Type 1 child is constantly evaluating: is this right or wrong, is this good or bad? This innate ability makes them a guardian of justice and integrity. But it can also become heavy. The Type 1 keeps asking themselves: \"Am I good enough?\"",
    integrationDesc: 'When safe, the Reformer integrates toward Type 7: they unlock their joy, spontaneity, humor. The inner pressure releases. They allow themselves to laugh at their mistakes and play without aim.',
    disintegrationDesc: 'Under stress, the Type 1 disintegrates toward Type 4: the inner critic becomes devastating. The child withdraws, becomes gloomy, melancholic. They feel everything is their fault.',
    ages: {
      '5-8': 'At this age, the Type 1 puts away their toys methodically, has flawless notebooks (not a single smudge!), and points out your inconsistencies with confidence. "It\'s not fair!" is their signature line — not from jealousy, but from a true sense of justice.',
      '8-12': 'The Reformer becomes more rigid. School results become a personal matter. Frustration is a major emotion: things should be better. They develop an intense relationship with self-improvement and can be hard on themselves and others.',
      '13-16': 'Idealism meets reality. The teen may become a fervent activist or withdraw into guilt. Some throw themselves into causes (climate, social justice), others internalize everything to the point of burnout.',
    },
    keys: [
      { title: 'Validate their standards without reproducing them', desc: 'Listen with seriousness when they flag an injustice. Say: "You noticed something important. Thank you." But don\'t let them turn the family into a permanent tribunal. Excellence is an orientation, not a prison.' },
      { title: 'Offer them spaces of imperfection', desc: 'Create moments where mistakes are welcome. Play games where you deliberately lose. Show that you\'re imperfect and that\'s okay. These memories of shared imperfection are a grace for a Type 1.' },
      { title: 'Value the attempt more than perfection', desc: 'When they doubt — "But what if I fail?" — say: "I\'m proud of you for trying, regardless of the outcome." Celebrate courage more than victory.' },
    ],
    belief: 'To be worthy of love, I must be perfect, righteous, beyond reproach. A mistake is a moral fault.',
    compulsionName: 'Anger (resentment)',
    compulsionDesc: 'A cold, contained anger, made of chronic irritation that nothing — neither themselves, others, nor the world — lives up to the ideal.',
    virtueName: 'Serenity',
    virtueDesc: 'The wisdom to accept what is, to do their best with what they control, and to let go of the rest with deep peace.',
    identity: 'I am the one who does things right.',
    missionLibre: 'The freed Type 1 no longer seeks to correct the world, but to embody serenity. They become an ethical leader: their discernment, freed from judgment, inspires by example rather than by criticism.',
    wings: 'Type 9 (the silent dreamer) and Type 2 (the giving helper)',
  },
  2: {
    short: 'A natural generosity, a need to be loved.',
    fear: 'Not being loved, being useless',
    need: 'To be loved and recognized for their generosity',
    metaphor: "A Type 2 is like a spring. It naturally rises up to nourish those around it. The Type 2 child has this innate quality of sensing others, of wanting to help, of finding their place by being useful. But this generosity can become a prison: the spring needs to be thanked. When the return doesn't come, the spring runs dry.",
    integrationDesc: 'When safe, the Helper integrates toward Type 4: they discover their own emotional world, their true passions, their authenticity. They dare to be real, not to please but to exist.',
    disintegrationDesc: 'Under stress, the Type 2 disintegrates toward Type 8: the little helper turns into a foreman. The child becomes aggressive, manipulative, demanding.',
    ages: {
      '5-8': "This is the little helper who proudly offers you drawings made just for you. At school, they're the \"teacher's pet\" who eagerly helps and consoles others. They notice when you're sad and insist: \"Mom, are you okay?\"",
      '8-12': 'Generosity gains a tinge of resentment. The child has trouble saying no. They neglect their own needs for those of others. An underlying anger may appear when they don\'t feel appreciated.',
      '13-16': 'Social explosion and inner confusion. Who am I beyond what others expect of me? The teen may become a hyperactive helper or withdraw, depressed, feeling useless.',
    },
    keys: [
      { title: 'Love them without conditioning it on their usefulness', desc: 'Say regularly: "I love you because you exist, not because you help me." For the Type 2, this is a revelation. It is healing.' },
      { title: 'Help them discover their own desires', desc: 'Ask questions: "What would YOU like to do?" Create spaces where they\'re invited to think about themselves, without compromise, without worrying about others.' },
      { title: 'Teach them that saying no is an act of love', desc: '"If you say yes when you want to say no, you suffer. A friend who loves you wants you to say what you feel." Normalizing no is a lifelong gift to the Type 2.' },
    ],
    belief: 'To be loved, I must give and respond to others\' needs. My own needs are secondary, even selfish.',
    compulsionName: 'Pride (of helping)',
    compulsionDesc: 'A subtle pride draped in humility: "you need me," "I know better than you what\'s good for you." They refuse to see their own needs.',
    virtueName: 'Humility',
    virtueDesc: 'The courage to recognize one\'s own needs and limits. To love oneself in order to love freely, without expecting return.',
    identity: 'I am the one who loves.',
    missionLibre: 'The freed Type 2 no longer seeks to make themselves indispensable. They become a leader in service to others: their generosity becomes unconditional, and they nourish others\' potential without expecting anything in return.',
    wings: 'Type 1 (the conscientious) and Type 3 (the performer)',
  },
  3: {
    short: 'Energy turned toward success, a need for recognition.',
    fear: 'Having no value without results',
    need: 'Recognition and admiration',
    metaphor: "A Type 3 is the one who shines. Naturally. Like a star, they draw the gaze. The Type 3 child has this innate ability to perform, to succeed. But there's a hidden price: the Type 3 risks confusing what they do with who they are. They live in a secret fear that they aren't enough if the results disappear.",
    integrationDesc: 'When safe, the Achiever integrates toward Type 6: they begin to trust, become more loyal, more willing to work without needing to shine alone. They discover they can be true, not just effective.',
    disintegrationDesc: 'Under stress, the Type 3 disintegrates toward Type 9: the child becomes apathetic, disconnected, numb. The shine disappears behind a torpor of resignation.',
    ages: {
      '5-8': 'The Type 3 simply shines. They make others laugh, win, succeed at school without apparent effort. They seek to impress adults and want to be recognized for their accomplishments.',
      '8-12': 'Competition intensifies. The child starts adapting their image to the audience. They can become very results-oriented and have trouble handling failure.',
      '13-16': 'The teen is absorbed by their image. The pressure of excellence can lead to exhaustion. The Type 3 can lose themselves in performance and forget who they truly are.',
    },
    keys: [
      { title: 'Separate your love from their results', desc: 'When they bring home a bad grade, don\'t say "I\'m disappointed." Say: "I love you. Let\'s talk about what happened." Celebrate that they exist, not what they do.' },
      { title: 'Frame failure as a data point, not a catastrophe', desc: 'Tell your own failures, fears, awkward moments. Show that you\'re imperfect and that\'s okay. Failure isn\'t an identity, it\'s an event.' },
      { title: 'Create spaces of non-performance', desc: 'A screen-free evening where you simply talk. A walk where there\'s nothing to do, nothing to win, nothing to prove. Little by little, the child learns that you love their presence, not their productivity.' },
    ],
    belief: 'My worth depends on my successes, my performance, and the admirable image others have of me.',
    compulsionName: 'Deceit (self-deception)',
    compulsionDesc: 'A subtle deception: they identify with their image of success and end up believing their own mask, losing contact with their real feelings.',
    virtueName: 'Truthfulness (Authenticity)',
    virtueDesc: 'The courage to slow down, peel off the mask, and dare to be seen for who they are, beyond successes and failures. They discover that their value is inherent.',
    identity: 'I am my successes.',
    missionLibre: 'The freed Type 3 no longer performs to be loved. They become an authentic, inspiring leader: their energy serves a meaningful vision, and they motivate others through the courage of their vulnerability.',
    wings: 'Type 2 (the helper) and Type 4 (the sensitive)',
  },
  4: {
    short: 'A deep sensitivity, a need to be understood.',
    fear: 'Being ordinary, not being understood',
    need: 'Authenticity and singularity',
    metaphor: "The child who feels everything. Not just events — the unspoken, the sadness of the invisible. The Type 4 is born with the muffled conviction of being different: the wrong note in the song. And this feeling pushes them toward their greatest strength: authenticity. But first, it leaves them alone.",
    integrationDesc: 'In integration toward Type 1, emotional depth finds structure. The child channels their emotions into action: they paint with discipline, write with precision. Authenticity no longer means isolation; it becomes contribution.',
    disintegrationDesc: 'In disintegration toward Type 2, they become smothering, desperately seeking love, forgetting who they really were. They change colors like a chameleon.',
    ages: {
      '5-8': 'The child cries easily, not from anger but from sensation. A classmate who doesn\'t invite them becomes proof that they\'re fundamentally "uninvitable." They create paper universes to live in when the real world hurts them.',
      '8-12': 'The sensation becomes conviction. The Individualist watches other children with envy mixed with incomprehension. They become a specialist of absence and may confuse loneliness with depth. Existential questions appear.',
      '13-16': 'The waves of emotion intensify. One day, they\'re creative and passionate. The next, they plunge into dense melancholy. Beneath the drama, there\'s a quest for truth. The Individualist refuses the polite lies of daily life.',
    },
    keys: [
      { title: 'Your emotions are real, not dramatic', desc: 'The Individualist needs to hear that what they feel is valid. They also need to learn that authenticity does not mean isolation. One can be true AND connected. Sensitive AND brave.' },
      { title: 'Your difference is your path, not your prison', desc: 'Help them transform their feeling of strangeness into a creative quest. Show them other people who were different and made an impact. Help them find their tribe.' },
      { title: 'Stay present when I withdraw', desc: 'The Individualist withdraws into their universes. That\'s healthy. But they need to know they\'re not forgotten. Not to be forced out, but invited back regularly with gentleness.' },
    ],
    belief: 'I am missing something essential to be complete. I am fundamentally different and must find my unique identity to be loved.',
    compulsionName: 'Envy (of what\'s missing)',
    compulsionDesc: 'Not jealousy, but the conviction that they lack an essential quality others possess. Their attention stays turned toward the absent, the inaccessible, the idealized.',
    virtueName: 'Equanimity',
    virtueDesc: 'The capacity to feel the full range of human emotions — joy as well as sadness — without being swept away. The discovery that nothing essential is missing.',
    identity: 'I am my feelings.',
    missionLibre: 'The freed Type 4 no longer indulges in the feeling of difference. They become a creative, empathic leader: their depth serves beauty and meaning, and they reveal the hidden humanity within imperfection.',
    wings: 'Type 3 (the ambitious) and Type 5 (the thinker)',
  },
  5: {
    short: 'An insatiable curiosity, a need to understand.',
    fear: 'Being incompetent, being overwhelmed',
    need: 'To understand and preserve their energy',
    metaphor: "The Investigator watches the world from afar, listens more than they speak, builds labyrinthine mental systems to understand how things work. They don't want to participate. They want to see. They want to know. And they want to be left alone to do it. This need for space is their signature — and often their puzzle for those who love them.",
    integrationDesc: 'In integration toward Type 8, they leave their tower. All their knowledge, they turn into action. They become assertive, confident, capable of bringing their expertise to the world.',
    disintegrationDesc: 'In disintegration toward Type 7, they scatter into distractions: jumping from one interest to another, becoming hyperactive, fleeing into screens and stimulation.',
    ages: {
      '5-8': 'They watch other children play with detached curiosity. They ask questions that catch adults off guard. Birthday parties are an ordeal — too many kids, too much noise. Books become their friends.',
      '8-12': 'They become an expert in one or two domains they\'ve decided to understand thoroughly. Other kids find their expertise fascinating for five minutes, then get bored. They need space to function.',
      '13-16': 'Intellectual independence. They question everything. The fear of incompetence may set in: the fear that all their knowledge isn\'t enough, that they\'re an impostor in their own tower.',
    },
    keys: [
      { title: 'Solitude is not a symptom to cure', desc: 'Respect your Investigator\'s space. Don\'t force them to participate just to participate. But make sure they\'re alone in a healthy way — that they\'re learning, exploring, growing.' },
      { title: 'Your knowledge matters', desc: 'Validate their expertise. Create spaces where their knowledge counts. Encourage them to share in a way that satisfies them — not to impress, but to truly communicate.' },
      { title: 'The heart exists, even behind the intellect', desc: 'They\'re not cold. They\'re emotionally cautious. They need to know it\'s safe to come down from the tower. That love can be true even when it\'s hard to express.' },
    ],
    belief: 'The world is intrusive and my resources are limited. I must understand before acting and conserve my energy by minimizing my engagements.',
    compulsionName: 'Avarice (of self)',
    compulsionDesc: 'Not material avarice, but a holding back: they retain their time, energy, emotions, knowledge, living in an inner economy of scarcity.',
    virtueName: 'Non-attachment (Engaged wisdom)',
    virtueDesc: 'The capacity to engage fully in the world, share their gifts, and feel their emotions, without fearing depletion. The more they give, the more they receive.',
    identity: 'I am what I know.',
    missionLibre: 'The freed Type 5 leaves their ivory tower. They become a wise, visionary leader: their analytical clarity, now generously shared, brings understanding and innovation to the challenges of the world.',
    wings: 'Type 4 (the sensitive) and Type 6 (the cautious)',
  },
  6: {
    short: 'Constant vigilance, a need for security.',
    fear: 'Being abandoned, betrayed, without bearings',
    need: 'Security and trust',
    metaphor: "The Loyalist constantly scans the horizon. Is something going wrong? Are we safe? They ask questions other children don't. They notice the tensions adults think are hidden. They're a loyal child who would do anything to protect those they love. And who builds an inner committee of voices that argue: \"But what if...?\"",
    integrationDesc: 'In integration toward Type 9, vigilance relaxes. They learn to trust — others, and most importantly themselves. They find inner stability, a tranquility that turns their caution into wisdom.',
    disintegrationDesc: 'In disintegration toward Type 3, they build a flawless façade. They become high-performing, competitive, obsessed with image. They sacrifice their soul for a security that never comes.',
    ages: {
      '5-8': 'They approach the world with caution. New babysitter? They need time. They ask surprising questions: "Are we going to die?" Two forms exist: the "phobic" Loyalist who obeys, and the "counter-phobic" who defies.',
      '8-12': 'Anxiety surfaces. A constant hum of "what if...?" They may become perfectionist to feel safer. In friendships, they look for proofs of loyalty. But they also show real courage.',
      '13-16': 'They question everything: authorities, parents, systems. The peer group becomes crucial. They may follow the group just to be accepted. They need anchor points and the certainty of your love.',
    },
    keys: [
      { title: 'Your fear is real. I am reliable.', desc: 'The Loyalist needs consistency. If you say something, do it. If you promise, keep it. If you make a mistake, acknowledge it. They build their trust brick by brick, and each inconsistency dismantles what they\'ve built.' },
      { title: 'Your doubt doesn\'t mean you\'re weak', desc: 'Instead of trying to cure them of doubt, teach them to live with it. "You doubt. That\'s who you are. You can doubt and act anyway." That\'s a courage to cultivate.' },
      { title: 'You need belonging, not perfection', desc: 'Give them a tribe where they can be authentic. Show them they belong to you, unconditionally. That\'s the security they truly need.' },
    ],
    belief: 'The world is dangerous and unpredictable. I cannot trust my own guidance — I must be vigilant and find a reliable outside authority.',
    compulsionName: 'Fear (chronic anxiety)',
    compulsionDesc: 'A "fear of fear" that pushes one to imagine all worst-case scenarios. Doubt eats away at certainty, suspicion questions every intention.',
    virtueName: 'Courage (Faith)',
    virtueDesc: 'Not the absence of fear, but the capacity to act despite fear. To find one\'s authority and security no longer outside, but within oneself.',
    identity: 'I am the one who doubts (and is loyal).',
    missionLibre: 'The freed Type 6 no longer seeks security outside. They become a courageous, engaged leader: their lucidity becomes strategic foresight, their loyalty an unwavering commitment. They ask the hard questions no one else dares to ask.',
    wings: 'Type 5 (the thinker) and Type 7 (the optimist)',
  },
  7: {
    short: 'Boundless enthusiasm, a need for freedom.',
    fear: 'Suffering, being deprived, being bored',
    need: 'Freedom and possibilities',
    metaphor: "The child who seems to emit their own light, who illuminates the room by their mere presence. They have ideas constantly, projects jostling like birds. Boredom feels like holding their breath: possible for a few seconds, but unnatural. The Enthusiast lives for the moment, for possibility. It's beautiful. It's also exhausting.",
    integrationDesc: 'In integration toward Type 5, they discover depth. They start digging instead of dancing on the surface. Attention span lengthens. This is the golden age of the healthy Enthusiast.',
    disintegrationDesc: 'In disintegration toward Type 1, the child becomes rigid, critical, perfectionist. Optimism becomes cynicism. Movement becomes paralysis.',
    ages: {
      '5-8': 'A thousand projects starting Monday morning. Piano on Monday, climbing on Tuesday, botany on Wednesday. They may start five projects and finish none. But they turn meals into parties and the commute into adventure. Anxiety? They sidestep it.',
      '8-12': 'The social butterfly: always in motion, invited to every party. FOMO kicks in. Concentration at school is a challenge — not from inability, but from a problem of selecting what deserves their attention.',
      '13-16': 'They want to live everything, try everything. Risks become real. But this is also the child who dreams of changing the world and inspires others through their optimism.',
    },
    keys: [
      { title: 'Structure, but not too much', desc: 'The Enthusiast needs limits to be free. Clear limits on screens, activities, sleep. But leave room for spontaneity. Balance is what matters.' },
      { title: 'Help them finish things', desc: 'Not by forcing them, but by staying present. The Enthusiast needs to feel that letting something shine for the long haul is magical — not just the spark of beginnings.' },
      { title: 'Name the avoidance', desc: '"I notice that when things get hard, you change the subject. That\'s normal. But together, we can learn to stay a little even when it\'s less shiny." The Enthusiast needs to learn depth through discovery.' },
    ],
    belief: 'The world is full of opportunities, but I must avoid pain and limitation. I must keep my options open so as not to be trapped.',
    compulsionName: 'Gluttony (of experiences)',
    compulsionDesc: 'An insatiable thirst for experiences, ideas, pleasures, projects. They consume ever more stimulation to avoid having to digest the present.',
    virtueName: 'Sobriety (Full joy)',
    virtueDesc: 'Not deprivation, but the capacity to find full satisfaction in the present experience, just as it is. Joy as a state of being, not as stimulation.',
    identity: 'I am someone happy (and free).',
    missionLibre: 'The freed Type 7 no longer flees the shadow. They become a joyful, visionary leader: their optimism is no longer escape but resilient strength, and they couple their vision of possibilities with the discipline to realize them.',
    wings: 'Type 6 (the cautious) and Type 8 (the leader)',
  },
  8: {
    short: 'A quiet (or not-so-quiet) strength, a need for control.',
    fear: 'Being controlled, showing weakness',
    need: 'Control, justice, and intensity',
    metaphor: "The child who takes up space. Not always with malice, but with a presence that's felt. They know what they want. They see power dynamics instinctively. The world is made of strong and weak, and the Challenger refuses to be on the wrong side — not for themselves, but for their tribe, the small ones they've taken under their wing.",
    integrationDesc: 'In integration toward Type 2, the hardest thing becomes accessible: tenderness. The Challenger learns to show vulnerability, to ask for help. The warrior discovers that loving can be more powerful than dominating.',
    disintegrationDesc: 'In disintegration toward Type 5, total isolation. The child becomes silent, suspicious, cold. Trust disappears. They build paranoid worlds in their head.',
    ages: {
      '5-8': 'From age four, they refuse to go to bed without explanation. For the Challenger, authority is earned. They protect other children and have an instinctive sense of justice. Tantrums are spectacular — but it\'s an unwavering honesty.',
      '8-12': 'The pack leader. Natural leader of the group, they decide where to go and what to play. Confrontations with school authority appear. Vulnerability? They hide it like a shameful secret.',
      '13-16': 'A force of nature. Intensity rises. Binary thinking: strong or weak, loyal or traitor. They can hurt with the strength of their presence, or rise against injustice. Behind it all: a terrifying fear of being controlled.',
    },
    keys: [
      { title: 'Be stronger, but fair', desc: 'The Challenger tests authority because they need it. Be firm, consistent, fair, without irony or contempt. If you show calm strength with integrity, the Challenger will settle.' },
      { title: 'Create space for vulnerability', desc: 'Not by demanding it, but by naming it. "I noticed it\'s hard to say when you\'re afraid. But admitting you need help is the opposite of weakness."' },
      { title: 'Acknowledge the good they do', desc: 'The Challenger protects others. Name it: "You defended that boy no one was looking at. That\'s beautiful." The Challenger needs to know their strength can be a beauty, not just a threat.' },
    ],
    belief: 'The world is a jungle where the strong dominate the weak. To survive and protect mine, I must be strong, take control, and never show my vulnerability.',
    compulsionName: 'Lust (for life, intensity)',
    compulsionDesc: 'A thirst for intensity, a need for "too much": pushing limits, taking up more space, intensifying confrontations. A way to feel their own vitality.',
    virtueName: 'Innocence (Protective strength)',
    virtueDesc: 'Not naivety, but the courage to lay down their armor, open their heart, and rediscover their own tenderness. True strength protects rather than dominates.',
    identity: 'I am strength.',
    missionLibre: 'The freed Type 8 no longer needs to dominate. They become a protective, magnanimous leader: their power creates a safe space where others can grow, and they defend justice rather than imposing their will.',
    wings: 'Type 7 (the energetic) and Type 9 (the peacemaker)',
  },
  9: {
    short: 'A soothing gentleness, a need for harmony.',
    fear: 'Conflict, being insignificant',
    need: 'Peace, harmony, and connection',
    metaphor: "The child who soothes. They enter a room and you feel a relaxation. The tone drops. Voices soften. The Peacemaker doesn't need to do much. They exist, and that's enough. They have an extraordinary capacity for absorption: they absorb joys, sadness, conflicts. But beneath the smooth surface, currents can be complex.",
    integrationDesc: 'In integration toward Type 3, the child starts having goals. Intentional movement. They discover they can want, pursue, succeed at something. They become active rather than reactive.',
    disintegrationDesc: 'In disintegration toward Type 6, soothing becomes anxiety. The child becomes suspicious and fearful, imagining worst scenarios, doubting what was once obvious.',
    ages: {
      '5-8': 'The "easy" child who always says yes. No tantrums, no conflicts. But there\'s a form of passive resistance — the Peacemaker doesn\'t say no out of politeness, but because they\'ve understood it\'s safer. They have an extraordinary sense of empathy.',
      '8-12': 'The invisible mediator. They float, friendly to every group, but without truly belonging to any. They risk losing themselves in others. Procrastination sets in: committing feels like choosing an identity.',
      '13-16': 'The Peacemaker starts wondering "And me?" — a terrifying question. They\'re vulnerable to peer pressure. But this is also the age when they can find their voice, if accompanied with gentleness.',
    },
    keys: [
      { title: 'Ask questions, not expectations', desc: 'Don\'t ask "What do you want?" expecting an immediate answer. Ask and wait. The Peacemaker must slowly learn that having a preference is normal and allowed.' },
      { title: 'Validate their soft limits', desc: 'When the Peacemaker says "I\'m not sure" or "maybe," it\'s a limit, not indecision. Respect it. They must learn that asserting themselves doesn\'t mean hurting others.' },
      { title: 'Connect them to themselves, not to others', desc: 'Help them distinguish: what comes from them, what comes from their mother, what comes from their group. "This is what YOU feel. This is what YOU believe. This is what YOU want."' },
    ],
    belief: 'My opinion, my desires, and my presence are not that important. To maintain peace, I must not assert myself — that would risk creating conflicts.',
    compulsionName: 'Self-forgetting (sloth)',
    compulsionDesc: 'Not physical laziness, but spiritual: a tendency to forget oneself, to numb one\'s own desires and anger so as not to disturb the established order.',
    virtueName: 'Right action (Holy love)',
    virtueDesc: 'To engage fully in life from one\'s own center, awake to oneself. Their unique contribution matters; true peace comes from engaged presence.',
    identity: 'I am easy to live with.',
    missionLibre: 'The freed Type 9 no longer fades. They become a unifying, awakened leader: their capacity to see all points of view is no longer paralysis but a powerful tool for mediation, and their calm presence soothes conflicts.',
    wings: 'Type 8 (the protector) and Type 1 (the conscientious)',
  },
};
