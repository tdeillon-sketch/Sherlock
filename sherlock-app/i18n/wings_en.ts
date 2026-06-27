// ═══════════════════════════════════════════════════════════════
//  WINGS EN — English translations of the 18 wing variants
//  Keyed by the same "{type}w{wing}" ids as constants/wings.ts.
//  Consumed by app/(tabs)/profiles/[id].tsx with field-level fallback.
// ═══════════════════════════════════════════════════════════════

export interface WingVariantEn {
  nickname: string;
  short: string;
  metaphor: string;
  ages: { "5-8": string; "8-12": string; "13-16": string };
  keys: { title: string; desc: string }[];
}

export const WINGS_EN: Record<string, WingVariantEn> = {

  // ══════════════════════════════════════════
  //  TYPE 1 — The Perfectionist
  // ══════════════════════════════════════════

  "1w9": {
    nickname: "The Idealist",
    short: "A calm, thoughtful perfectionism — more detached and philosophical than the pure 1.",
    metaphor: "The 1w9 is a perfectionist who dreams of a better world from the quiet of their own desk. They keep the 1's exacting standards, but the 9 wing brings perspective, calm, and a contemplative distance. Less reactive than the pure 1, they prefer to reflect before they act. This child can seem wise and composed beyond their years, yet they carry the same inner moral courtroom as every other 1 — they simply voice it more softly. Their anger, when it does surface, runs cold and cuts sharp.",
    ages: {
      "5-8": "A calm, observant child who tidies their toys before being asked. They would rather read or draw than run around. They notice unfairness without calling it out right away, but they remember it for a long time. Not very demonstrative, they have a rich inner world.",
      "8-12": "The 1w9 becomes the serious, low-key pupil that teachers adore. Their principles are strong but rarely spoken aloud. They may retreat into an imaginary world or throw themselves into a cause (the environment, animals). Their inner critic is relentless, but they keep it to themselves — at the risk of imploding.",
      "13-16": "A reflective, sometimes melancholy teenager who can withdraw into their ideals. They love to debate but hate head-on conflict. They may develop a pessimistic view of the world while staying committed to changing it. Watch for quiet burnout."
    },
    keys: [
      { title: "Respect their need for calm and introspection", desc: "Do not push them into every social activity. Their solitude is a place to recharge, not a morbid retreat. But check in regularly to make sure they are not getting locked inside it." },
      { title: "Help them put their anger into words", desc: "Their perfectionist fury is intense but runs underground. Give them the words: \"You're allowed to say out loud that it's unfair.\" Without that, they ruminate and make themselves ill." },
      { title: "Honor their need for ideals AND for retreat", desc: "They carry lofty principles but can wear themselves out. Teach them to choose their battles — not every injustice is theirs to put right." }
    ]
  },

  "1w2": {
    nickname: "The Advocate",
    short: "A warm, engaged perfectionism, turned outward toward others.",
    metaphor: "The 1w2 is a perfectionist who wants to save the world — and rolls up their sleeves to do it. The 2 wing brings warmth, a sense of service, and genuine attention to others. This is the child who calls out the injustice AND comforts the victim. More relational than the pure 1, they can also be more preachy: they know what is good for others and won't hesitate to tell them. Their energy points toward the mission, not toward solitude.",
    ages: {
      "5-8": "The little moral guardian of the group: they remind everyone of the rules, stand up for the weakest, comfort the hurt. They love to help but judge those who don't. Deeply invested emotionally, they can be thrown off balance by arguments.",
      "8-12": "The 1w2 becomes the class representative, the eco-rep, the volunteer tutor. They throw themselves into causes and friendships alike. They tend to hand out lessons (\"you should do it like this\"), which their peers don't always take well.",
      "13-16": "A campaigning, committed, sometimes fervent teenager. They defend their convictions with passion and can grow uncompromising toward anyone who doesn't share their values. At risk of burning out from trying to fix both the world and the people in it."
    },
    keys: [
      { title: "Teach them to rest without guilt", desc: "They believe that not acting equals betraying their principles. Model rest as an act of wisdom, not laziness. \"You deserve to rest, even when the world isn't okay.\"" },
      { title: "Temper their urge to correct others", desc: "Draw the line between \"being right\" and \"having the right to dictate.\" Teach them that their standards are THEIR standards — not a universal truth to impose." },
      { title: "Value their heart as much as their morals", desc: "Point to the warmth in their gestures, not just their rightness. They need to feel that you love them for who they are, not for the good they do." }
    ]
  },

  // ══════════════════════════════════════════
  //  TYPE 2 — The Giver
  // ══════════════════════════════════════════

  "2w1": {
    nickname: "The Servant",
    short: "A disciplined generosity, rooted in the duty to help and to do things right.",
    metaphor: "The 2w1 is a helper with an ethic. The 1 wing adds rigor and a sense of duty: they help not only out of love, but because it is the right thing to do. More structured and less effusive than the pure 2, they can come across as reserved while being deeply devoted to others. This child helps with method — they tidy, organize, take care. They can be hard on themselves when they feel they haven't given enough.",
    ages: {
      "5-8": "A well-behaved, helpful child who offers a hand spontaneously, without overdoing the charm. They love to tidy up, help set the table, look after a pet. They are sensitive to rules and like to follow them.",
      "8-12": "The 2w1 becomes the dependable pupil, the conscientious class rep. They help friends with their homework and comfort them earnestly. They tend to sacrifice themselves quietly and judge themselves harshly when they fail to help.",
      "13-16": "A committed teenager, often drawn to volunteering or community work. They can become rigid toward the people they help (\"I know what's good for you\"). At risk of exhaustion and resentment hidden behind good manners."
    },
    keys: [
      { title: "Ease their sense of duty", desc: "They help out of love AND moral obligation. Teach them that saying no is not a failing, but an act of self-respect." },
      { title: "Encourage spontaneous affection", desc: "They help \"well\" but can lose the warmth. Model free hugs, compliments for no reason, play for the sheer fun of it." },
      { title: "Soften their self-criticism", desc: "They judge themselves harshly when they think they've done badly. Remind them often: \"You don't have to be perfect to be loved.\"" }
    ]
  },

  "2w3": {
    nickname: "The Host",
    short: "A bright, sociable generosity — eager both to do well and to be seen.",
    metaphor: "The 2w3 is a helper who also loves to shine. The 3 wing brings energy, charisma, and a taste for results: they help AND want to be recognized for it. Highly sociable, they know how to charm, energize, and bring people together. This is the child who organizes the snack, who puts everyone at ease, who quickly becomes the grown-ups' favorite. More assertive than the pure 2, they can also be more calculating: their help is never entirely selfless.",
    ages: {
      "5-8": "A natural little charmer, at ease with adults. They give, offer, smile, and watch for the reaction. They love being at the center of parties, handing out hugs, making people laugh. Very sensitive to the attention they receive.",
      "8-12": "The 2w3 becomes the likeable, popular \"little leader\" who gathers others around them. They invest in friendships but can also use them to feel good about themselves. They tend to measure success by popularity.",
      "13-16": "A charismatic teenager with a gift for social life. They can become an outstanding leader — or fall into chasing image and relational burnout. At risk of confusing genuine connection with social performance."
    },
    keys: [
      { title: "Love them even when they aren't shining", desc: "They believe love comes with performance AND service. Love them out loud in the quiet, in the tiredness, in the imperfection." },
      { title: "Teach them that not everything is an audience", desc: "They play the part of \"the one everyone loves.\" Create spaces with no audience where they can be clumsy, tired, vulnerable." },
      { title: "Help them tell true giving from self-serving giving", desc: "Not to make them feel guilty — to help them know themselves. \"It's okay to want recognition, but let's be clear about what's a gift and what's an exchange.\"" }
    ]
  },

  // ══════════════════════════════════════════
  //  TYPE 3 — The Achiever
  // ══════════════════════════════════════════

  "3w2": {
    nickname: "The Charmer",
    short: "A warm, relational achiever who succeeds by making others shine too.",
    metaphor: "The 3w2 is an achiever who also longs to be loved. The 2 wing brings warmth, a knack for connection, and a talent for rallying people. More emotional and expressive than the pure 3, they thrive in a team — they know how to motivate, charm, and bring everyone along. This is the child who wins THEIR victories by helping others win too. The risk: confusing friendship with usefulness, and approaching relationships like a project, complete with goals and success metrics.",
    ages: {
      "5-8": "A sunny, sociable child who charms adults and makes the other kids laugh. They love to win at games but know how to include their friends. Very sensitive to compliments and to other people's moods.",
      "8-12": "The 3w2 becomes the popular class rep, the bright pupil who helps their friends. They have lots of friends but can also be strategic about their relationships. They tend to confuse admiration with love.",
      "13-16": "A teenager with magnetic charisma, often very socially invested. They may aim for leadership roles and build an impressive network. At risk of over-investing in their image and exhausting themselves trying to please."
    },
    keys: [
      { title: "Love them for who they are, not for what they make shine", desc: "They believe they must both achieve AND charm to be loved. Tell them often: \"You have nothing to prove to deserve my love.\"" },
      { title: "Help them tell real friendships from useful alliances", desc: "Without judging them: help them see when they invest out of genuine affection, and when it's for image. Awareness sets them free." },
      { title: "Encourage visible vulnerability", desc: "Model imperfection: show your doubts, your failures, your hard emotions. They will learn that real connection grows from there." }
    ]
  },

  "3w4": {
    nickname: "The Professional",
    short: "An introspective, creative achiever who succeeds with style and sensitivity.",
    metaphor: "The 3w4 is an achiever who also wants to be unique. The 4 wing brings depth, sensitivity, and a love of the aesthetic. Less relational than the 3w2 and more turned toward their inner world, they aim for a success that is personal and original. This is the child who wants to come first, but on their own terms — with their own style, their own ideas, their own unique touch. More melancholy than the pure 3, they can swing between brilliant confidence and deep self-doubt.",
    ages: {
      "5-8": "A creative, determined child who already has clear aesthetic preferences. They love to show what they make, but they want it to be beautiful AND original. Sensitive to criticism of their work.",
      "8-12": "The 3w4 becomes the artist-pupil, or the athlete with a style all their own. They aim for excellence in their own way. They tend to withdraw after a setback and brood over how different they are.",
      "13-16": "An ambitious, introspective teenager, often drawn to creative fields (art, music, writing, design). They can become perfectionists, demanding of themselves. At risk of depression if their talent isn't recognized at its true worth."
    },
    keys: [
      { title: "Acknowledge their uniqueness AND their success", desc: "They need you to see their distinctive touch, not just their grades. Comment on their STYLE as much as their results." },
      { title: "Hold space for their melancholy", desc: "When they doubt, don't rush to pump them back up. Their emotional depth is a strength — let it exist." },
      { title: "Help them finish their projects", desc: "Their quest for originality can become paralyzing (\"it's never beautiful enough\"). Encourage them to publish, to show, to finish — even imperfectly." }
    ]
  },

  // ══════════════════════════════════════════
  //  TYPE 4 — The Artist
  // ══════════════════════════════════════════

  "4w3": {
    nickname: "The Aristocrat",
    short: "An ambitious sensitive soul who wants to be both unique AND recognized.",
    metaphor: "The 4w3 is an artist who also wants to shine. The 3 wing brings energy, ambition, and a flair for the spotlight. More sociable and outward-facing than the pure 4, they want to turn their uniqueness into visible success. This is the child who wants to be different AND admired for that difference. More dynamic, but also more dependent on others' eyes: their sensitivity is exposed, and their disappointment can hit hard when they aren't recognized.",
    ages: {
      "5-8": "A creative, expressive child who loves to dress up, put on a show, draw for an audience. They need their creations to be noticed. Very sensitive to both compliments and criticism.",
      "8-12": "The 4w3 becomes the artist-performer, throwing themselves into theater, dance, music. They seek recognition for their uniqueness. They tend to dramatize setbacks and to aim for visible excellence.",
      "13-16": "An intense teenager, often searching for an identity that is both strong and visible. They may develop a very personal style and display it proudly. At risk of deep suffering if their uniqueness goes unrecognized."
    },
    keys: [
      { title: "See both their originality AND their need to be seen", desc: "Their difference is not a retreat — it's an offering to the world. Give them chances to share it, and applaud sincerely." },
      { title: "Help them bear the silence of the audience", desc: "Not all of their creations will be noticed. Teach them to create for themselves first, for others second." },
      { title: "Temper the drama", desc: "Their disappointment runs intense. Validate the feeling (\"that's hard\") without piling on the drama. And remind them of past successes when they think it's all over." }
    ]
  },

  "4w5": {
    nickname: "The Bohemian",
    short: "An introverted, intellectual sensitive soul, withdrawn into a unique inner world.",
    metaphor: "The 4w5 is an artist who dreams in solitude. The 5 wing brings depth, withdrawal, and a hunger for knowledge. Less demonstrative than the pure 4 and more contemplative, they live in a dense inner world peopled with images, thoughts, and beauty. This is the child who reads a great deal, who creates alone in their room, who says little but feels enormously. At risk of deep isolation and escape into the imaginary — especially if they feel misunderstood.",
    ages: {
      "5-8": "A dreamy, quiet child who invents rich imaginary worlds. They often play alone, draw, and already read long stories. Not very demonstrative, but deeply attached to their key figures.",
      "8-12": "The 4w5 becomes the solitary creative: they write, draw, read, compose. They have few friends but intense friendships. They tend to feel misunderstood and to retreat into their inner universe.",
      "13-16": "A deep teenager, often passionate about art, philosophy, literature. They can develop a very rich inner life and a distinctive personal style. At real risk of depression and social isolation."
    },
    keys: [
      { title: "Respect their need for creative solitude", desc: "Their room, their notebooks, their hours alone — these are sacred spaces, not a worrying retreat. But make sure they also have moments of connection." },
      { title: "Enter their inner world through ideas", desc: "Ask them about what they read, draw, listen to. They open up through beauty and the intellect, rarely through raw emotion." },
      { title: "Gently nudge them toward social ties", desc: "Without crowding them: regularly suggest an activity with a single friend, or a creative workshop. Their depth needs contact so it doesn't close in on itself." }
    ]
  },

  // ══════════════════════════════════════════
  //  TYPE 5 — The Observer
  // ══════════════════════════════════════════

  "5w4": {
    nickname: "The Iconoclast",
    short: "A sensitive, creative observer who thinks AND feels deeply.",
    metaphor: "The 5w4 is a thinker who creates. The 4 wing brings sensitivity, aesthetics, and a love of being unique. More emotional than the pure 5, they combine rigorous analysis with overflowing imagination. This is the child who takes their toys apart AND invents intricate stories for them. Often original, sometimes eccentric, they may be misunderstood by their peers but fascinating to attentive adults. At risk of intellectual melancholy and early withdrawal.",
    ages: {
      "5-8": "A child with a very rich inner world, asking questions surprising for their age. They love to explore alone, read, watch insects, invent. Not much drawn to group games.",
      "8-12": "The 5w4 becomes the creative \"little professor,\" passionate about one specific subject (space, dinosaurs, mythology). They can be highly original in their interests and creations. They tend to feel different — and to own it.",
      "13-16": "An introspective, original teenager, often interested in philosophy, science, art. They can develop a very personal, distinctive way of thinking. At risk of isolation and intellectual melancholy."
    },
    keys: [
      { title: "Feed their curiosity AND their sensitivity", desc: "Offer them books, museums, experiences that engage both their head AND their heart. Not only science, not only art." },
      { title: "Respect their inner rhythm", desc: "They need long stretches of silence to digest what they live through. Don't rush them with constant activity." },
      { title: "Validate their difference without dramatizing it", desc: "\"You see the world differently, and that's precious.\" No need to make it a tragic fate — it's just one way of being in the world." }
    ]
  },

  "5w6": {
    nickname: "The Problem-Solver",
    short: "A loyal, anticipating observer who thinks both to understand AND to stay safe.",
    metaphor: "The 5w6 is a thinker who prepares. The 6 wing brings loyalty, vigilance, and a need for security. More practical and anxious than the pure 5, they analyze in order to anticipate problems and find solutions. This is the child who wants to understand how something works to make sure it won't break. Often precise, methodical, and reliable, they are also more socially engaged (with those close to them) than the pure 5 — though still reserved.",
    ages: {
      "5-8": "A cautious, observant child who asks lots of safety questions (\"what if...?\"). They like to understand the rules before acting. Loyal to their attachment figures, wary of strangers.",
      "8-12": "The 5w6 becomes the serious, reliable pupil who prepares methodically for tests. They have a small, stable circle of friends. They tend to anticipate problems and spin anxious scenarios.",
      "13-16": "A thoughtful teenager, often passionate about science, computing, strategy. They analyze a great deal and can build elaborate theories. At risk of analytical anxiety and paralysis in the face of uncertainty."
    },
    keys: [
      { title: "Reassure through facts and consistency", desc: "Understanding is what reassures them. Explain things concretely (\"here's what will happen\") — not with \"don't worry.\"" },
      { title: "Encourage action despite the doubt", desc: "They can analyze endlessly to avoid acting. Teach them to begin with \"enough information,\" not with an impossible certainty." },
      { title: "Honor their quiet loyalty", desc: "They attach deeply but don't show it much. Recognize their faithfulness out loud — it is precious." }
    ]
  },

  // ══════════════════════════════════════════
  //  TYPE 6 — The Loyalist
  // ══════════════════════════════════════════

  "6w5": {
    nickname: "The Defender",
    short: "An introspective, analytical loyalist who finds reassurance in understanding everything.",
    metaphor: "The 6w5 is a loyalist who thinks in order to protect themselves. The 5 wing brings intellectual depth and a need for retreat. More introverted and analytical than the pure 6, they anticipate dangers by studying them at length. This is the child who reads the instructions, checks the evacuation plans, asks how something works before using it. Often deeply loyal to a small circle, they can seem wary of the outside world. Their thinking is their main weapon against anxiety.",
    ages: {
      "5-8": "A cautious, observant child who wants to understand before they trust. They attach strongly to their key figures and stay reserved with strangers. They love strategy games, riddles, and intricate stories.",
      "8-12": "The 6w5 becomes the serious, low-key pupil — reliable and loyal to their small group. They analyze social relationships at length without always engaging in them. They tend to expect the worst and take refuge in knowledge.",
      "13-16": "A thoughtful teenager, often drawn to technical or intellectual fields. They may develop a skeptical view of the world and a small circle of close friends. At risk of isolation and anxious thoughts running in loops."
    },
    keys: [
      { title: "Give them clear, stable information", desc: "Understanding is what reassures them. Explain your decisions, your plans, your changes. Avoid surprises and vagueness." },
      { title: "Respect their small circle", desc: "They trust few people — and that's okay. Don't force them to widen their group of friends. Depth matters more than numbers." },
      { title: "Encourage physical experience", desc: "They live a lot inside their head. Sport, movement, nature, physical play — draw them out of their thoughts regularly, without devaluing those thoughts." }
    ]
  },

  "6w7": {
    nickname: "The Companion",
    short: "A sociable, cheerful loyalist who soothes their fears through connection and activity.",
    metaphor: "The 6w7 is a loyalist who lightens up in the fun. The 7 wing brings energy, humor, and a taste for social life. More extroverted and optimistic than the pure 6, they fight their anxieties through contact, fun, and projects. This is the child who has lots of friends, who laughs loudly, who proposes activities — and who still worries a great deal inside, but hides it better. More active but also more scattered, they may flee their fears rather than face them.",
    ages: {
      "5-8": "A warm, sociable child who loves friends, parties, group games. They may be anxious at night or in the face of novelty, but contact soothes them. Very attached to their parents.",
      "8-12": "The 6w7 becomes the sociable, engaged pupil, popular within their group. They invest in friendships, class projects, activities. They tend to flee their worries through constant motion.",
      "13-16": "A dynamic, loyal teenager, often at the heart of their friend group. They can be deeply invested in causes that move them. At risk of scattering themselves and struggling to stop long enough to hear their own fears."
    },
    keys: [
      { title: "Help them stop and feel", desc: "They flee their anxieties through activity. Build in quiet moments (reading, a walk, a conversation) where they can sense what's happening inside." },
      { title: "Honor their fears behind the smile", desc: "Their cheerfulness can mask real worry. Ask them regularly: \"And deep down, are you okay?\" — and truly listen to the answer." },
      { title: "Set limits on the scattering", desc: "Their fear pushes them to start project after project without finishing any. Help them choose, prioritize, and finish — that's a form of courage too." }
    ]
  },

  // ══════════════════════════════════════════
  //  TYPE 7 — The Enthusiast
  // ══════════════════════════════════════════

  "7w6": {
    nickname: "The Entertainer",
    short: "A warm, faithful enthusiast who entertains while keeping loved ones at the center.",
    metaphor: "The 7w6 is an enthusiast who also loves to reassure. The 6 wing brings loyalty, a sense of responsibility, and relational warmth. Less free and more committed than the pure 7, they put their energy at the service of the group, the family, their friends. This is the child who makes the whole class laugh AND looks out for the lonely friend. More funny than daring, more present than scattered, but with an undercurrent of anxiety they tuck away beneath the humor.",
    ages: {
      "5-8": "A joyful, funny child who loves making their parents and friends laugh. Very attached to their family, they need to know all is well at home. Anxious about novelty or separations.",
      "8-12": "The 7w6 becomes the class's likeable clown, popular and loyal to their friends. They invest in groups and hate being left out. They tend to use humor to defuse tension.",
      "13-16": "An enthusiastic, loyal teenager, often at the center of their group. They can be committed to causes that touch the people close to them. At risk of masking real anxiety behind constant cheerfulness."
    },
    keys: [
      { title: "Recognize the depth behind the humor", desc: "Their laughter is sincere but can also be a shield. Let them feel they can be sad, tired, or worried with you — without having to entertain." },
      { title: "Secure their attachments", desc: "They need stability in their bonds. Keep your promises, warn them of changes ahead of time, be steady in your affection." },
      { title: "Help them finish what they start", desc: "Their enthusiasm sweeps them into a thousand projects. Teach them the pleasure of completing — not just of beginning." }
    ]
  },

  "7w8": {
    nickname: "The Realist",
    short: "A powerful, enterprising enthusiast who turns excitement into action.",
    metaphor: "The 7w8 is an enthusiast who moves into action. The 8 wing brings strength, boldness, and a love of a challenge. More assertive and less scattered than the pure 7, they turn their wants into concrete projects and aren't afraid to shake things up to get moving. This is the child who proposes AND leads, who laughs AND decides. More independent and combative, they can also be more abrupt in their choices: if something stops pleasing them, they walk away without lingering.",
    ages: {
      "5-8": "An energetic, go-getting child who wants to try everything and fears nothing. They lead the games and negotiate, with authority, for what they want. Full of life — sometimes exhausting.",
      "8-12": "The 7w8 becomes the dynamic, entrepreneurial pupil who launches projects, organizes, persuades. They know how to get what they want. They tend to steamroll anyone who slows them down.",
      "13-16": "A powerful, enterprising teenager, often drawn to sport, travel, adventure, business. They can build impressive projects. At risk of large-scale scattering and clashes with authority."
    },
    keys: [
      { title: "Channel their power, don't crush it", desc: "Their strength is precious. Set clear limits (\"no, not that\") without trying to snuff them out. They need respect, not submission." },
      { title: "Teach them patience and listening", desc: "They charge ahead without always hearing others. Model the art of asking questions, waiting, and taking what others feel into account." },
      { title: "Help them finish before launching anew", desc: "Their energy sweeps them into the next thing before they've finished the last. Set the rule of \"finish first.\"" }
    ]
  },

  // ══════════════════════════════════════════
  //  TYPE 8 — The Leader
  // ══════════════════════════════════════════

  "8w7": {
    nickname: "The Maverick",
    short: "An energetic, expansive leader who pairs strength with a zest for life.",
    metaphor: "The 8w7 is a leader who also loves to have fun. The 7 wing brings overflowing energy, charisma, and an openness to possibility. More extroverted and enterprising than the pure 8, they combine power with a joy for living. This is the child who leads the games, takes bold initiatives, and sweeps others into adventures. Charismatic but also more impulsive, they can be intensely generous and intensely brutal — often in the same day.",
    ages: {
      "5-8": "An energetic, leading child who takes the reins of the games and speaks loudly. They love challenges, play-fights, and grand adventures. Charming, but apt to impose their will.",
      "8-12": "The 8w7 becomes the natural \"big sibling\" of the playground: they defend the weakest, organize the gangs, and break the rules with flair. They tend to dominate their friendships.",
      "13-16": "A teenager with powerful charisma, often the leader of their group. They may be an entrepreneur, an athlete, an activist. Very independent, sometimes rebellious. At risk of excessive risk-taking and head-on clashes with authority."
    },
    keys: [
      { title: "Be firm and calm in the face of their power", desc: "They test limits to check that you'll hold. Don't give in out of exhaustion, don't react in anger — stay fair, firm, calm." },
      { title: "Honor their energy without repressing it", desc: "Their strength is a gift. Give them sport, ambitious projects, responsibilities worthy of them. Without that, their energy turns destructive." },
      { title: "Teach them nuance and tenderness", desc: "They charge, attack, defend — but can lose the subtlety. Model gentleness, diplomacy, listening — not as weaknesses, but as tools of strength." }
    ]
  },

  "8w9": {
    nickname: "The Bear",
    short: "A calm, protective leader who prefers quiet strength to confrontation.",
    metaphor: "The 8w9 is a leader who also loves peace. The 9 wing brings calm, perspective, and the ability to hold back. More settled and less explosive than the pure 8, they embody a quiet, natural strength that doesn't seek confrontation but doesn't back down either. This is the child who doesn't shout but is listened to, who defends others without making a drama of it. Their power lies dormant — when it does surface, it is slow but unstoppable.",
    ages: {
      "5-8": "A calm, solid child who isn't easily impressed. They play quietly, but they cannot stand unfairness. When they push back, it's rare and firm.",
      "8-12": "The 8w9 becomes the group's quiet anchor: people trust them and follow them without their having to speak up. They defend the weakest calmly. They tend to bury their emotions and avoid conflict — until it explodes.",
      "13-16": "A settled, reliable teenager, often respected by their peers without seeking to dominate. They may be an entrepreneur or commit to causes that demand endurance. At risk of passivity, or of sudden eruptions after holding too much in."
    },
    keys: [
      { title: "Respect their quiet strength", desc: "They have no need to prove their power. Don't push them to provoke a reaction — their nature is calm, not weak." },
      { title: "Encourage regular emotional expression", desc: "They store things up in silence, then erupt. Create rituals for talking about what they feel, before it overflows." },
      { title: "Honor their natural sense of justice", desc: "They defend others discreetly but with conviction. Recognize those gestures out loud — they shape their identity as a protector." }
    ]
  },

  // ══════════════════════════════════════════
  //  TYPE 9 — The Peacemaker
  // ══════════════════════════════════════════

  "9w8": {
    nickname: "The Referee",
    short: "An assertive peacemaker who can step out of their reserve to defend their own.",
    metaphor: "The 9w8 is a peacemaker who also knows how to stand their ground. The 8 wing brings strength, firmness, and the capacity to assert themselves. More powerful and less self-erasing than the pure 9, they prefer peace but know how to set limits when needed. This is the calm child who surprises you with a sudden firmness when someone crosses the line. Their anger is rare but formidable — and they return to calm quickly afterward. An excellent natural mediator: they understand every side AND can make a decision.",
    ages: {
      "5-8": "A gentle, easygoing child who nonetheless won't be pushed around. They love quiet games but can stand their ground if you touch what matters (a favorite toy, a friend). Attached to their routine.",
      "8-12": "The 9w8 becomes the settled, reliable pupil who smooths over conflicts in the playground. They carry a natural authority when they choose to use it. They tend to avoid arguments — but explode if pushed too far.",
      "13-16": "A calm, solid teenager, often respected for their steadiness. They can lead without commotion, mediate in conflicts. At risk of procrastination and inertia when facing important decisions."
    },
    keys: [
      { title: "Encourage their assertiveness without forcing it", desc: "They know how to say no when it matters, but give in on the small things. Help them see that their preferences count, even in the details." },
      { title: "Respect their rhythm while inviting them to decide", desc: "They take their time to choose. Give them space, but ask them to make the call — don't always decide for them." },
      { title: "Honor their quiet strength", desc: "When they assert themselves, take them seriously. It isn't a whim — it's a genuine stance. And recognize their unique ability to understand every party." }
    ]
  },

  "9w1": {
    nickname: "The Dreamer",
    short: "An idealistic peacemaker who dreams of a better world without ruffling anyone.",
    metaphor: "The 9w1 is a peacemaker who carries principles. The 1 wing brings a sense of duty, a moral ideal, and a need for inner order. More settled and structured than the pure 9, they dream of a just world but prefer to embody it quietly rather than proclaim it loudly. This is the calm child who tidies their toys, who gently reminds everyone of the rules, who defends their convictions without raising their voice. More rigid inside than they appear: they have standards — they simply don't impose them.",
    ages: {
      "5-8": "A gentle, organized child who likes everything in its place. They are attentive to rules and to others, without overdoing it. Very few emotional outbursts.",
      "8-12": "The 9w1 becomes the serious, well-liked pupil — reliable and fair. They avoid conflict but carry a strong moral compass. They tend to judge themselves in silence and to dream of an ideal world without acting to change it.",
      "13-16": "A settled, idealistic teenager, often interested in causes (the environment, justice, spirituality). They may develop a philosophical view of the world. At risk of procrastination and of escaping into the dream rather than into action."
    },
    keys: [
      { title: "Honor their ideals without dismissing them as naive", desc: "Their vision of a better world is precious. Help them move from dream to concrete action, in small steps." },
      { title: "Encourage commitment, even modest", desc: "They can stay a spectator of their own convictions. Help them embody what they believe, even just a little each day." },
      { title: "Validate their gentleness AND their inner firmness", desc: "They carry strong standards behind their calm. Recognize that quiet strength — it shapes their self-confidence." }
    ]
  },
};
