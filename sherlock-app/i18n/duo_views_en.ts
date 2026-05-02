// ═══════════════════════════════════════════════════════════════
//  EN TRANSLATIONS — Duo Perspective Views
//
//  Mirrors DUO_PARENT_VIEW + DUO_PEERS_VIEW from constants/duo.ts.
//  Used by the Duo screen when locale === 'en' to surface the
//  parent-perspective specific framing (parent-child + peers contexts).
//
//  Coverage:
//   - DUO_PARENT_VIEW_EN: 81 entries × 5 fields = 405 paragraphs
//     (pointsForts, vigilances, conseil, parentSoutien, parentChallenge)
//   - DUO_PEERS_VIEW_EN: 81 entries × 3 fields = 243 paragraphs
//     (pointsForts, vigilances, conseil)
//
//  Strategy: field-level fallback. Consumers do
//    DUO_PARENT_VIEW_EN[key]?.[field] ?? DUO_PARENT_VIEW[key][field]
//  so any missing entry gracefully falls back to French.
// ═══════════════════════════════════════════════════════════════

import type { PerspectiveView } from '../constants/duo';

export const DUO_PARENT_VIEW_EN: Record<string, PerspectiveView> = {
  // ── Parent Type 1 ──
  "1-1": {
    pointsForts: "You instinctively understand his need to do well. You speak the same language of rigor and duty.",
    vigilances: "Your demands + his demands = escalation. He's already hard on himself — he doesn't need you piling on. Two perfectionists together can become suffocating.",
    conseil: "Replace one criticism in two with a sincere compliment. And allow for mistakes — yours as well as his.",
    parentSoutien: "You think you're helping him aim higher; you're confirming his harshest inner voice. When he comes home with 18/20 and your first words are 'what about those two missing points?', you're not correcting a technical detail — you're agreeing with the voice already whispering 'you're never enough.' He thought he had done well. He understands he never has. That equation, set by the person he needs most, doesn't get unmade.",
    parentChallenge: "What you call his 'flaws' is exactly what your partner has been trying to tell you about yourself for years. His permanent tension, his need to be right, his inability to let go — you tolerate them less in him because you recognize them without being able to name them. Correcting him means continuing to silence yourself. Until you put down your own weapons, he'll only learn to sharpen his.",
  },
  "1-2": {
    pointsForts: "Your structure reassures your Type 2 child, who likes to know how to please. He feels safe with your clarity.",
    vigilances: "Your rigor can cut his affectionate impulse. He needs your approval, not your constant correction.",
    conseil: "Say 'I'm proud of you' before 'you can do better.' Teach him to ask for himself, not just to give.",
    parentSoutien: "For this child, his drawing isn't a drawing — it's an act of love waiting to be received. When your first reflex is 'oh, you went outside the lines here,' you're correcting a stroke, but he hears that his love isn't acceptable as is. Over time, he'll check before giving. And what he offers later will be more cautious, less true, less him.",
    parentChallenge: "This child loves you for free, and that's what destabilizes you. Your head looks for the return on investment, the 'earned' reciprocity, the right order of love. His unconditional tenderness disorients you because you never learned to receive it that way. Teaching him to earn love means transmitting the emptiness you grew up in.",
  },
  "1-3": {
    pointsForts: "You both value performance and effort. A beautiful alliance around results and a job well done.",
    vigilances: "You correct the process, he wants the result. Your 'yes but you could do better' wound a child who's seeking your admiration.",
    conseil: "Celebrate his successes WITHOUT moderation or 'but.' Help him find his worth beyond the trophies.",
    parentSoutien: "For this child, your 'but' amputates every victory. When he wins his competition and you say 'great, but you could've kept your elbow tighter,' you think you're helping him improve; he understands his success is worth nothing in itself. He'll keep chasing 'almost-perfect' higher and higher, hoping your sentence will one day stop before the 'but.' It won't stop until you settle that sentence inside your own head.",
    parentChallenge: "He's the child you would have wanted to be — visible, brilliant, adored. And that's precisely what unsettles you: he's admired for what isn't noble in your eyes, while you sweated for invisible excellence. Your demand may hide an unspeakable jealousy of his easy access to other people's gaze. Naming it won't make it disappear. Silencing it, on the other hand, will amplify it.",
  },
  "1-4": {
    pointsForts: "You both hold a high ideal — aesthetic for him, ethical for you. Fertile common ground for creation.",
    vigilances: "His sensitivity strikes you as excessive, your rigor strikes him as cold. Real risk of deep mutual wounding.",
    conseil: "His emotions aren't a problem to solve — they're his way of being in the world. Listen before framing.",
    parentSoutien: "For him, his inner world is the only place where he truly exists. When he cries for the third time this week and you blurt 'stop, it's nothing,' you don't comfort — you announce that what he holds most truly has no place at home. He'll keep crying, but elsewhere, alone. And you'll say 'he's so secretive,' without seeing that you're the one who closed the door.",
    parentChallenge: "His sensitivity bothers you because it reveals your own — the one you converted very early into rigor so you wouldn't have to feel it anymore. You haven't suppressed your fragility, you dressed it up as moral demand. This child refuses that conversion. He lives everything you buried — and that's why you find him 'difficult.'",
  },
  "1-5": {
    pointsForts: "You both respect competence and good work. A calm, structured relationship with little drama.",
    vigilances: "Two heads, few hugs. The relationship can become purely functional — he feels silently judged.",
    conseil: "Initiate moments of tenderness and play — he won't. And respect his zones of withdrawal.",
    parentSoutien: "For this child, your 'well-meaning' interruption is a violent break. When you walk into his room for the fifth time with an instruction and he doesn't look up, you take it as defiance — he had simply entered his world. Every reminder teaches him that his concentration isn't worthy of respect. He won't disobey you head-on. He'll just become an expert at invisible escape.",
    parentChallenge: "His quiet autonomy hurts you without your knowing why. You built your worth by being beyond reproach in front of someone — he builds his without anyone watching. His independence reflects your dependence on outside judgment. You want to frame him 'for his own good': in truth, to regain the control his distance makes you lose.",
  },
  "1-6": {
    pointsForts: "Your consistency is a gift for his anxiety. He leans on you like a rock that doesn't move.",
    vigilances: "If he senses nothing is ever good enough, his anxiety explodes. Your criticisms terrify him and block initiative.",
    conseil: "Reassure first, correct second. Keep your promises: predictability is his main source of safety.",
    parentSoutien: "Your criticisms, even fair ones, become micro-earthquakes for him. You said 'tomorrow we'll do this thing,' something unexpected comes up, you let it drop without making a fuss — for him, vigilant, the broken promise registers. He doesn't learn your rules: he learns to fear you. And that fear won't make him obedient, just anxious for life.",
    parentChallenge: "His anxiety irritates you because it's yours, in audible form. You too scan the world for cracks, but you call it lucidity. He hasn't yet built that façade of rigor — he confesses his fear without filter, and it's his vulnerability that makes you angry. It isn't him you want to silence: it's your own fear, which he reveals.",
  },
  "1-7": {
    pointsForts: "His energy and joy can pull you out of your seriousness. He reminds you that life is also for fun.",
    vigilances: "Your long, moralizing rules lose him. He flees rigid frames by scattering or playing the clown.",
    conseil: "SHORT, clear rules — no long sermons. Accept that he starts a lot and finishes little — that's his nature.",
    parentSoutien: "When he bursts in with fifteen ideas in five minutes and you reply 'finish what you've already started,' that isn't pedagogy — it's your fear of mess dressed up as wisdom. You teach him every day that his joyful impulses are a problem to manage. One day he'll stop having impulses. And on that day, you'll cry over it.",
    parentChallenge: "His pure joy irritates you, even if you'll never admit it: you find him 'not serious enough.' The truth is, you've taken everything too seriously forever, and his lightness reminds you of what was forbidden you very early. He offers you, freely, what no one ever taught you: that you can be happy without having earned it.",
  },
  "1-8": {
    pointsForts: "Two strong characters who respect each other when each holds their territory. You're his solid landmark that doesn't bend.",
    vigilances: "He tests your limits to see if you hold. Your sanctions must be fair, never humiliating — he'll remember for a long time.",
    conseil: "Be firm and calm, never reactive. Acknowledge his strength instead of trying to break it.",
    parentSoutien: "With a Type 8 child, your 'don't speak to me in that tone' teaches him that brute force (yours) wins against honest argument (his). He confronts you head-on, you raise the authority — for you it's respect, for him it's proof that you don't listen, you impose. In that small moment, you've lost the only thing he truly respects: rightness. He'll test you harder next time.",
    parentChallenge: "His strength intimidates you, even if you'll never say it. He names without filter what you've spent your life sidestepping through moral uprightness: that there are power dynamics, and they matter. You want to 'civilize' him — in reality, you want to fit him into the reassuring frame of your rules, because his raw power reminds you that your rules are only a polite way of not looking the world in the face.",
  },
  "1-9": {
    pointsForts: "Your structure helps him organize his day. He accepts your rules without friction or open rebellion.",
    vigilances: "His slowness annoys you, your pressure makes him disappear. He becomes a ghost under your demands.",
    conseil: "Give him time to answer, to decide, to do. Ask his opinion — he has one, but doesn't volunteer it.",
    parentSoutien: "His 'yes' to everything isn't agreement — it's a vanishing. You're relieved to have an easy child, without seeing that he fades because he understood very early that his desires have no place against your demands. You think you have a docile child. You'll soon have an absent one — physically present, but unfindable when you actually try to meet him.",
    parentChallenge: "His slowness sets you off like nothing else. It isn't his slowness that irritates you, it's what it reveals: that your relentless race may not be the only legitimate rhythm. Every time you push him, you defend the necessity of your own forward flight. He simply offers another tempo.",
  },

  // ── Parent Type 2 ──
  "2-1": {
    pointsForts: "Your warmth softens his seriousness. You see his worth beyond his performance, and that's a gift to him.",
    vigilances: "He needs autonomy, not invasive attention. Your constant hugs can suffocate him.",
    conseil: "Love him without smothering. And teach him that his high standards are a strength, not a flaw to console.",
    parentSoutien: "For this young Type 1, your immediate hug isn't comfort — it's a message: your sadness is unbearable to me, get better right now. He made a mistake, he already feels guilty, you wrap him up saying 'it's nothing, sweetie.' He'll learn to hide his sorrow to protect you. And soon, he'll hide himself.",
    parentChallenge: "This child rejects you — he wants to handle it alone, he tells you he doesn't need you. That stings: you want to be needed, he tells you that you aren't always. That's exactly the lesson you don't want to hear: your worth isn't in your usefulness. He confirms it every day by loving you without needing you.",
  },
  "2-2": {
    pointsForts: "Mutual tenderness, affectionate complicity. You understand each other without words on the level of the heart.",
    vigilances: "You risk raising him to believe loving = sacrificing. He'll forget his own needs the way you forget yours.",
    conseil: "Teach him to say 'no' and to receive. Model it by taking care of yourself in front of him.",
    parentSoutien: "When he brings you the cup of coffee before you've asked, you're touched — but look closely: he's copying you. He learns from you that love means sensing the other person's needs before your own. You've paid dearly for that lesson all your life. You're transmitting it to him intact, with your gratitude as wrapping paper.",
    parentChallenge: "This child is your mirror, and what he reflects back bothers you. You love him out of impulse, yes — and also because he fills the affective emptiness you've carried forever. His generosity nourishes you more than you nourish his, in a quietly inverted exchange. To free him from the trap, you'd first have to admit you're still in it.",
  },
  "2-3": {
    pointsForts: "You adore his energy and celebrate his successes with sincere enthusiasm. He feels seen and valued.",
    vigilances: "If he senses he must perform to deserve your love, he becomes a 'little adult' who forgets himself.",
    conseil: "Love him when he fails, not just when he wins. And tell him you'd love him even if he did nothing special.",
    parentSoutien: "For this child, your great love follows his victories — he'll learn that fast. When he comes home with a great grade and you call grandma, you love him sincerely, but he registers the equation: performing = being celebrated by mom/dad. He'll keep collecting trophies the way you feed someone you're afraid of losing. He won't stop, even exhausted, because his fuel will have become your gaze.",
    parentChallenge: "His ability to sell himself, to charm, to 'succeed socially' bothers you — you sense something calculated that clashes with your belief that love is above strategy. But your generosity is also a strategy: more elegant, more discreet, but a way of making yourself necessary. He's just doing the visible version of what you do under the radar.",
  },
  "2-4": {
    pointsForts: "You welcome his intense emotions without fearing them. He feels understood in his difference.",
    vigilances: "You want to console, he wants to be heard in his pain. Your too-quick solutions shut him down.",
    conseil: "Hold the space of his emotions without trying to solve. Sometimes he just needs to be with you, in silence.",
    parentSoutien: "For this child, your 'tell me what's wrong' is a gentle intrusion. You want to console; he experiences a disguised demand to feel better to reassure you. He'll learn to cry in silence, to spare you, to live his storms alone. And later, you'll resent him for sharing nothing anymore.",
    parentChallenge: "This child refuses your consolation right when you most want to give it. You want to be the one who saves, he prefers to walk through his night. His withdrawal deprives you of your role, and that's exactly your work: learning that loving him sometimes means accepting you can't be useful. Few things will cost you as much.",
  },
  "2-5": {
    pointsForts: "You see his depth behind his reserve. You can build an intimate bond without pressure.",
    vigilances: "He needs space to recharge. Your too-frequent affectionate impulses exhaust him and make him flee.",
    conseil: "Respect his solitary zones — it isn't rejection. Approach through ideas, not just through hugs.",
    parentSoutien: "For this child, your intrusion 'for his own good' is an energy withdrawal. You walk into his room with a hot chocolate and a smile, he looks up almost cold: 'can you close the door?' You read it as rejection; he loves you, but in his own way. He'll learn that love is invasion made legitimate.",
    parentChallenge: "His need for isolation makes your stomach hurt — you experience it as personal rejection, you search for what you did wrong. Nothing. He just has a different energy economy. His independence reflects your existential fear: that of not being indispensable. Loving him through his distance is one of the hardest tasks he can ask of you.",
  },
  "2-6": {
    pointsForts: "Your constant warmth soothes his anxiety. He knows he can count on you no matter what.",
    vigilances: "If you show worry yourself, he absorbs it and amplifies it. Your calm is his anchor.",
    conseil: "Be the unwavering 'secure base.' And encourage his progressive autonomy — he needs to learn he can manage alone.",
    parentSoutien: "His safety won't come from your repeated 'yes I love you's — it'll come from your silent reliability, the kind that doesn't beg for thanks. He asks you the same reassuring question for the tenth time, you answer patiently, but your patience isn't neutral: he senses he's exhausting you, and that adds to his anxiety instead of calming it. He needs a parent who doesn't waver. Not a parent who sacrifices.",
    parentChallenge: "His instinctive mistrust wounds you — you give so much, and he doubts you. That mistrust touches exactly where it hurts: your secret expectation of gratitude. You want to be loved in return for what you give. He's asking you to love him without balance, without guaranteed return — the only form of love that can secure him.",
  },
  "2-7": {
    pointsForts: "His joy fills you. You know how to join his adventures without smothering his enthusiasm.",
    vigilances: "He flees difficult emotions. If you avoid too, you help him build a shell of cheerfulness.",
    conseil: "Help him name sadness, fear, disappointment. Stay available when the party is over.",
    parentSoutien: "Your 'unspoken' disappointment is more toxic than your honest anger. You'd planned a moment together, he got swept up elsewhere, you let out 'it's no big deal, do whatever' with that tone. He picks up perfectly on your wrapped-up disappointment, and he'll learn to avoid you to dodge that sticky guilt. You'll lose precisely what you were seeking: his free presence.",
    parentChallenge: "His escape elsewhere flattens you. You've always believed that loving meant being there, available, present — he tells you that sometimes loving means leaving. His desire for freedom confronts you with your affective dependence, that silent fear of being alone. Freeing him means letting go of the invisible rope — and feeling, perhaps for the first time, the emptiness it was hiding.",
  },
  "2-8": {
    pointsForts: "You see his tender heart behind the shell. With you, he can lower his guard.",
    vigilances: "He refuses to be coddled. Your 'my baby' and invasive hugs trigger his rebellion.",
    conseil: "Love him with respect, not sappiness. Acknowledge his strength instead of seeing it as a problem to soften.",
    parentSoutien: "With this child, your camouflaged affective demand gets a direct 'no.' You tell him 'you could be nicer to your sister,' he answers 'no,' without aggression, just clear. Your blood rushes: how dare he? Because he hasn't yet learned that love means obeying your need disguised as advice. Your work isn't to make him bend — it's to learn from him that you can say no without ceasing to love.",
    parentChallenge: "This child doesn't reward you, and that breaks something in you. You give, he doesn't thank. You offer, he takes what he wants. Your benefactor's pride collides with his pure verticality, and he forces you to choose: keep giving to receive, or learn to give just because giving is enough. Only the second path will keep him close to you.",
  },
  "2-9": {
    pointsForts: "Peaceful tenderness, gentle home. You naturally agree on rhythm and harmony.",
    vigilances: "You both avoid conflict. But a child needs to learn how to say what's wrong.",
    conseil: "Model the kind 'no.' And gently provoke his choices — he tends to say 'whatever you want.'",
    parentSoutien: "His 'whatever you want' isn't cooperation, it's non-existence. You ask him 'A or B?', he always answers 'whatever you want' — he learned very early that his desire weighs less than your desire to do the right thing. He gives you peace, you give him non-existence. The exchange is profoundly unequal.",
    parentChallenge: "His self-effacement reassures and alarms you at the same time. Reassures because he disputes nothing. Alarms because he asks nothing of you either — and that deprives you of your role. This child forces you to love someone who doesn't call out to you. Accepting that he exists without your help is perhaps the greatest gift you can give him.",
  },

  // ── Parent Type 3 ──
  "3-1": {
    pointsForts: "You acknowledge his need to do well and celebrate his efforts. A beautiful alliance around quality work.",
    vigilances: "You want visible performance, he wants things done correctly. Tension between means and results.",
    conseil: "Value his integrity even when it slows the project. And teach him that image isn't everything in life.",
    parentSoutien: "For this child, your obsession with results amputates exactly what he invested in: the quality of the process. He shows you his pristine notebook, you ask 'what was the grade?' For him who put his soul into the form, the form mattered — he learns that with you, work only exists if it produces a trophy. He'll soon optimize what shows. And despise what he truly loved.",
    parentChallenge: "His meticulous slowness drives you crazy — but what irritates you is exactly what you sacrificed: care for care's sake, work well done because it's right. You confuse his ethics with inefficiency. He, lucid, senses that confusion. And it humiliates him.",
  },
  "3-2": {
    pointsForts: "You're touched by his natural generosity and know how to value it. He blossoms in your admiration.",
    vigilances: "You sometimes use him without realizing. He gives without asking — you take without returning.",
    conseil: "Thank him explicitly. Help him express his own needs, not just serve yours.",
    parentSoutien: "When he offers you a drawing and your brain has already moved on to the next task, you don't say anything mean — but he stays with his drawing in his hands, understanding that the affection he was reaching out doesn't deserve a real pause. He won't hold it against you. He'll just learn to reach less, and to console himself alone.",
    parentChallenge: "This child loves you for who you are when you aren't performing. And that destabilizes you, because you don't know who you are outside the role. His unconditional warmth places you before the identity void you filled with action. Truly receiving him would require stopping the race. You don't know how.",
  },
  "3-3": {
    pointsForts: "You understand his quest for success and know how to channel it. You speak the same language of results.",
    vigilances: "Risk of raising a 'little performer' cut off from himself. He imitates you — including in your blind spots.",
    conseil: "Show him you love him when he fails, not just when he shines. Model rest and vulnerability.",
    parentSoutien: "You won't love him less if he fails — you're sure of that. But he isn't sure, because he's never seen you celebrate anything but a victory. When he comes home with a trophy, the house is celebrating; when he comes home empty-handed, the silence becomes loaded. He'll run his entire life so as never to test your love through failure.",
    parentChallenge: "This child is exactly what you've become — brilliant, adaptable, strategic. You watch him and you can already guess his future. The problem: you also know what you never found behind your own success. Loving him enough to spare him that path would require admitting that your own path may have been a dead end. That's the costliest confession.",
  },
  "3-4": {
    pointsForts: "His creativity fascinates you. You know how to showcase it without distorting it.",
    vigilances: "You want results, he wants authenticity. Your accelerations break his creative process.",
    conseil: "Respect his inner rhythm. And don't try to turn his originality into a sellable product.",
    parentSoutien: "When you tell him 'you're talented, do something with it,' you want to get him out of his room — he hears that what he does in there doesn't count. What you call 'talented' rarely touches what matters to him. He'll learn to hide his unprofitable passions, or abandon them. What he called his world will become his shame.",
    parentChallenge: "His depth without trophies throws you off — he can spend an hour on an emotion without producing anything. You feel a discomfort: what if life weren't only about KPIs? This child poses the question you buried at 12 to allow yourself to function. Waking it up now means renegotiating what you believed was your strength.",
  },
  "3-5": {
    pointsForts: "You respect his intellectual depth and know how to encourage him in his passions.",
    vigilances: "You move fast, he thinks slowly. Your demands for immediate action freeze him.",
    conseil: "Give him time to analyze before acting. And accept he isn't demonstrative — his love comes through attention, not expression.",
    parentSoutien: "When he's been reading for two hours about migrating birds and you tell him 'that's not what's on the worksheet, focus,' you don't bring him back to work — you teach him that knowledge has value only if validated by a system. He may become a good student. And an adult who has lost his curiosity.",
    parentChallenge: "His indifference to your gaze secretly wounds you. You built your identity on admiration received, he refuses the game: he thinks alone, takes interest alone, doesn't ask you to validate. What you call his 'distance' is in fact his sovereignty — and it confronts you with all you gave up to be loved by others.",
  },
  "3-6": {
    pointsForts: "Your energy and confidence in the future reassure him. You show him you can move forward despite doubt.",
    vigilances: "You charge ahead, he anticipates risks. If you crush his fears, he buries them and the anxiety explodes elsewhere.",
    conseil: "Take his worries seriously before pushing past them. His caution isn't a brake — it's intelligence.",
    parentSoutien: "When he says 'what if I can't do it?' and you reply in coach mode 'come on, go for it!', your intention is fair — your effect, devastating. He senses you don't take his fear seriously, that you've already moved on to the 'mobilization' phase. He'll learn to fake confidence to reassure you, while carrying his doubt alone. His fear won't disappear — it'll just go invisible.",
    parentChallenge: "His caution exasperates you — why doesn't he just charge ahead? But that caution is exactly what your youth crushed in you. You charged ahead, yes, and you built. But you also lost permission to say 'I don't know.' He inhabits it naturally, and that wakes a nostalgia in you that you don't know how to name.",
  },
  "3-7": {
    pointsForts: "You adore his energy and know how to draw him into stimulating projects. A dynamic, joyful duo.",
    vigilances: "You both struggle with difficult emotions. You risk always fleeing toward what's next.",
    conseil: "Teach him to finish what he starts. And dare the serious conversations, even when uncomfortable.",
    parentSoutien: "When you tell him 'finish at least one thing,' your intention is to discipline him — what he hears is: even pure joy must produce a result. You want to structure him; in reality, you want him to become a small version of you, efficient and focused. He'll end up choosing one path. Not his: yours.",
    parentChallenge: "His joyful scattering hits you because it resembles what you call 'lack of character.' But look more carefully: he lives, you perform. He takes what life offers without needing to prove. You taste nothing without an objective. His apparent waste sends you back to your own affective scarcity.",
  },
  "3-8": {
    pointsForts: "You acknowledge his power and know how to channel it. He respects you because you don't bend.",
    vigilances: "Two strong personalities can clash. If you always win, he digs in; if you always yield, he despises you.",
    conseil: "Be firm without being authoritarian. Acknowledge his strength as an asset, not a problem.",
    parentSoutien: "With a Type 8 child, your status authority is useless — he respects only embodied authority. He refuses your way of doing things, head-on, you raise the volume, you mobilize your parental role: he doesn't care. Every time you try to make him bend through position, you lose his respect. And with him, lost respect is very hard to rebuild.",
    parentChallenge: "This child cannot be managed — and that enrages you because you manage everything, everywhere, always. His pure will reminds you that image and strategy only work on those who respect them. He doesn't. You're forced to return to what you left behind at 10: raw truth, the word that holds, the commitment without sparkle. It's brutal.",
  },
  "3-9": {
    pointsForts: "Your dynamism gently pulls him out of his torpor. His serenity reminds you to slow down.",
    vigilances: "Your fast rhythm makes him disappear. He says 'yes' but checks out internally to protect himself from your energy.",
    conseil: "Slow down when you speak to him. Ask his opinion and actually wait for the answer — it comes slowly.",
    parentSoutien: "When he follows you without protest and everyone around you congratulates you on this 'easy' child, no one sees that he's disappearing. He bends to your program because he hasn't learned to claim space. You build his life while he dissolves. One day he won't answer anymore. And you won't understand why.",
    parentChallenge: "His slowness, his non-engagement, that mold where nothing imprints — it all exasperates you. But his inertia is the exact opposite of your forward flight, and it forces you to stay still with him. In that stillness, a truth surfaces: you may be running so as not to have to meet yourself. By not moving, he offers you that appointment.",
  },

  // ── Parent Type 4 ──
  "4-1": {
    pointsForts: "You acknowledge the beauty of his rigor and value it. He feels seen in his singularity.",
    vigilances: "Your emotional intensity can destabilize him. He needs constancy, not waves.",
    conseil: "Stabilize your moods around him. And celebrate his difference in your way — he's unique, but in his manner, not yours.",
    parentSoutien: "For this young Type 1, your shared emotional wave isn't an education to inner life — it's a foundational uncertainty. You're going through an intense phase, you share your states with everyone, him included. He'll learn to walk on eggshells, to monitor your face before building his. You give him a radar, not a ground.",
    parentChallenge: "His quiet rigor sometimes bores you — you find him lacking in inner life, in drama. But that rigor is precisely the stability you've never been able to offer yourself. His need for order reveals your dependence on inner chaos, that way of confusing intensity with depth. Learning from him means accepting that peace isn't the opposite of life.",
  },
  "4-2": {
    pointsForts: "You welcome his generosity with real gratitude. He senses you see his heart.",
    vigilances: "Your intensity can crush him. He sets aside his own emotions to manage yours.",
    conseil: "Watch out for role reversal. It's your job to hold the emotional space, not his.",
    parentSoutien: "When he offers you a spontaneous hug and your head wanders into a sad past, you return the hug without being there. His little heart senses the distance immediately, even at 4. He'll learn to settle for lukewarm love — or worse, to become his parent's psychologist to get a bit of your full presence.",
    parentChallenge: "This child loves you simply, fluidly, unconditionally — and that troubles you because you've never believed it possible to be loved without complication. You search for the deep meaning of his love, you complicate it, question it. He just wants to be there with you. Receiving his simplicity means admitting that love doesn't always need to be intense to be true.",
  },
  "4-3": {
    pointsForts: "You see his depth behind his need to succeed. You know how to help him reconnect with himself.",
    vigilances: "Your 'you're worth more than the race for results' can be perceived as a rejection of what he loves.",
    conseil: "Honor his need to shine — it isn't a flaw. Help him find authenticity WITHIN performance, not against it.",
    parentSoutien: "For this child, your 'that's not what matters' after a victory is a rejection of his joy. He wins a competition, happy; you congratulate while relativizing — he hears: mom/dad finds my joy superficial. He'll learn to celebrate elsewhere, with people who can just say 'great' without hitting the brake. And later, you'll say: 'he doesn't talk to me about his successes anymore.'",
    parentChallenge: "His visible need to succeed strikes you as almost vulgar. But that 'superficiality' is in fact a capacity your intensity took from you: doing things for themselves, inhabiting the present without the poison of 'but for what really?' You teach him depth — he could teach you fluidity. The exchange intimidates you because it would force you to leave depth as a refuge.",
  },
  "4-4": {
    pointsForts: "You understand each other deeply, without words. A rare and precious emotional complicity.",
    vigilances: "Risk of melancholic cocoon. Two Type 4s together can lock themselves in intensity and lose contact with reality.",
    conseil: "Cultivate lightness, laughter, the everyday banal. He needs emotional stability, not a mirror of intensity.",
    parentSoutien: "For this young Type 4, your shared melancholy isn't intimacy — it's a nest he won't leave. You're both in the same gray atmosphere on a Sunday, you understand each other without speaking; you find it beautiful. He learns from you that shared sadness is more intimate than shared joy. He'll spend his life looking for partners who share the night.",
    parentChallenge: "This child is your mirror, and he charms as much as he frightens you. You recognize every oscillation, every dark phase. You want to save him from what damaged you — and at the same time you adore this shared intimacy. Freeing him requires a choice: maintain your privileged bond in pain, or help him out of it at the price of less communion. The second path is more solitary for you.",
  },
  "4-5": {
    pointsForts: "You respect his need for space and depth. A rich relationship made of chosen moments.",
    vigilances: "You two can isolate yourselves and build a bubble where the outside world ceases to exist.",
    conseil: "Force yourself to go out, to invite, to show the wide world. He needs outside stimulation not to close in.",
    parentSoutien: "For this child, your 'how do you feel?' questions are energy withdrawals. You want to reconnect him, to know what he thinks; he, in his mental bubble, feels a well-meaning intrusion. He'll learn to fake conversation, to give the minimum so you'll leave him alone, all while feeling guilty about the strategy. You'll search for his depth exactly where you yourself made it flee.",
    parentChallenge: "His ability to live without feeling intensely deeply destabilizes you. You think he lacks something — he thinks the same of you. His emotional frugality isn't poverty, it's another language. Recognizing it forces you to question your central belief: that feeling strongly equals living truly. You don't want that questioning. It's right, though.",
  },
  "4-6": {
    pointsForts: "You welcome his fears with empathy. He feels truly understood in his worries.",
    vigilances: "Your emotional intensity feeds his anxiety. If he senses nothing is stable, he panics.",
    conseil: "Stabilize your moods and keep your commitments. Predictability is more precious than depth for this child.",
    parentSoutien: "Your emotional authenticity is, for a Type 6, an invisible disaster. You go through an inner storm and you show it to him — undone face, deep sigh — you think you're being transparent. He, hyper-vigilant, picks up your storm as a vital threat. His nights fill with scenarios, his anxiety explodes, and you'll never understand where it came from.",
    parentChallenge: "His fear strikes you as not very noble, not very deep. You prefer melancholy to panic. But that hierarchy of suffering is a privilege: you can contemplate yours, he must survive his. Learning to respect his fear means learning that not all emotions are aesthetic material. Some just ask to be soothed, not magnified.",
  },
  "4-7": {
    pointsForts: "His joy lights you up. You also know how to recognize his hidden depth behind the enthusiasm.",
    vigilances: "Your intense moods push him to flee toward distraction. He builds himself a joyful shell.",
    conseil: "Lighten your intensity when you're with him. And teach him to touch his difficult emotions without fleeing them.",
    parentSoutien: "When he laughs at something you find silly and you blurt 'can't you do better humor?', you think you're educating his taste — he hears that his joy is banal. He'll learn to moderate his laughter in front of you, to save his excitement for elsewhere. Your house will become a serious place where joy must be earned through depth. He'll prefer his friends' houses.",
    parentChallenge: "His lightness sometimes makes you angry, and you don't quite know why. Because it's free, it doesn't pay its admission with suffering? Because it threatens your theory that the serious life is more noble? This child, by laughing at nothing, asks whether you may have made your sadness an identity rather than a moment crossed.",
  },
  "4-8": {
    pointsForts: "You see his vulnerability behind the strength. With you, he can be tender without shame.",
    vigilances: "Your emotional waves push him to harden in self-protection. He becomes his own rampart.",
    conseil: "Be stable and reliable. His strength only asks to become tenderness — but only in a safe frame.",
    parentSoutien: "When you ask him to be 'gentler' with his sister, you think you're talking about inner sophistication — for him, gentleness is a social lie. He plays rough, you correct him; every invitation to 'soften' cuts him off from his raw vitality. The very vitality that fascinates and frightens you. He'll learn to hold back, or to explode. No third option.",
    parentChallenge: "His strength intimidates and overwhelms you. You're in interiority, in nuance, in shadow. He's in the act, in clarity, in impact. His ability to act without hesitation reminds you that your depth is sometimes an alibi for never deciding. Truly loving him means admitting there are forms of rightness that have nothing to do with feeling — and that he has one of them.",
  },
  "4-9": {
    pointsForts: "His gentleness soothes you. You know how to feel with him without forcing him to speak.",
    vigilances: "Your intensity erases him. He absents himself so as not to carry your emotions, and you lose contact.",
    conseil: "Regulate your intensity, ask open questions, listen to the silences. His words come slowly.",
    parentSoutien: "You propose an 'important conversation,' he says yes; while you speak intensely, he nods but his gaze is elsewhere. You think he's listening. He's protecting himself. Your emotional density overwhelms him, and he's learned to be present in body, absent in head. He'll spend his life with this strategy of invisible fusion to survive overly intense people.",
    parentChallenge: "His self-effacement exasperates and saddens you. But look carefully: he fades because your presence takes all the air. Your Envy constantly seeks singularity — yours, others', depth — and he disappears into your quest. Meeting him requires first leaving him a space where you aren't. That's your hardest work.",
  },

  // ── Parent Type 5 ──
  "5-1": {
    pointsForts: "You respect his sense of duty and accompany him with calm. You bring depth to his rigor.",
    vigilances: "You're not very demonstrative, he seeks your approval. Your silence is read as criticism.",
    conseil: "Verbalize your pride — he doesn't guess it. And offer him substantive explanations, not just evaluations.",
    parentSoutien: "This child doesn't read your words, he reads your eyes. When he comes to show you his drawing and you say 'that's nice' without looking up, he doesn't hear a compliment — he registers an absence. He'll conclude, without telling you, that his efforts don't deserve your gaze. As an adult, he'll seek approval everywhere. Except his own.",
    parentChallenge: "You call it 'respecting his autonomy.' For him, it's a desert. This child isn't too demanding — you are too economical, and the distance you think protective produces exactly the anxiety you reproach him with. Worst of all: he'll end up aligning with you, holding back his impulses, and you'll praise his maturity. It's a loss no one will name.",
  },
  "5-2": {
    pointsForts: "You offer him space to think and to be alone, something he appreciates that few children receive.",
    vigilances: "He needs explicit affectionate warmth. Your emotional restraint can be experienced as rejection.",
    conseil: "Hug him, say 'I love you' out loud. Distance isn't an option for this child.",
    parentSoutien: "For this child, your energy economy amputates his. He comes into your study to tell you about his day, overflowing; you're in an intellectual problem, you answer distractedly. He leaves less radiant than when he came in. He'll learn that his vital flow is a nuisance to those he loves — and he'll muzzle it, until he no longer knows how to tell about his day.",
    parentChallenge: "His constant need for contact deeply tires you. You experience it as a withdrawal, when in fact it's an outpouring. What he asks of you — being there, just there — is what costs you most. Not because you don't love him, but because every contact is an expense your inner economy can't afford. He isn't the problem: it's your stockpile.",
  },
  "5-3": {
    pointsForts: "You temper his agitation with your calm. He learns to think before acting thanks to you.",
    vigilances: "He needs your enthusiastic admiration. Your cold analyses of his successes extinguish him.",
    conseil: "Express your pride with words and energy. And participate in his victories instead of commenting on them.",
    parentSoutien: "For this child, your rational approval is worth nothing without the spark in your gaze. He comes back with his medal, waves it before you; your brain evaluates: 'good, keep going.' He's waiting for something else he won't get. He'll go look for it elsewhere, with an intensity that grows every year. Without meaning to, you'll have built an adult dependent on others' gaze.",
    parentChallenge: "His constant need to be seen strikes you as almost vulgar. You built your worth in invisibility, in underground work, in knowledge that doesn't show off. He affirms the opposite: he wants to be looked at. Your silence, in his eyes, isn't depth — it's a lack. He confronts you with the possibility that visibility is also a legitimate form of life.",
  },
  "5-4": {
    pointsForts: "You respect his inner world and his creativity. You know how to communicate deeply without overload.",
    vigilances: "He needs emotional connection, not just intellectual. Your apparent coldness wounds him.",
    conseil: "Sit near him. Touch him, look at his creations at length. Physical presence matters as much as ideas.",
    parentSoutien: "When he cries over something that strikes you as disproportionate and you ask 'but why are you reacting like this?', your intention is to understand — what he experiences is: you're seeking to invalidate his emotion through logic. He'll learn to no longer share his states with you. You'll keep thinking him 'mysterious.' You're the one who closed the door.",
    parentChallenge: "This child resembles you in withdrawal, but for radically different reasons. You protect yourself from invasion, he cultivates his suffering as a singularity. His way of turning emotions into art fascinates and irritates you — because it reveals that you may also have turned your withdrawal into identity. Just with less drama.",
  },
  "5-5": {
    pointsForts: "You understand each other without words. Mutual respect for silences and personal space.",
    vigilances: "Risk of parallel relationship where each lives in their own world. He needs more than you do.",
    conseil: "Initiate contact despite your reserved nature. Sit in his room, share an activity — presence is enough.",
    parentSoutien: "You call it 'mutual respect.' He learns from you that love among loved ones resembles a courteous cohabitation. You're two in the same room, each in their world, no one disturbs anyone. He'll build his adult relationships on that model — clean, economical, frictionless. And he'll wonder, later, why nothing ever moves him.",
    parentChallenge: "This child is your exact mirror, and that's precisely the problem. You understand each other without words, you respect each other's space, nothing grates. It's comfortable. It's also the ultimate trap: no one pulls you out of your economy, no one demands your full presence. His resemblance to you exposes him to the same fate as yours — a mentally rich life, affectively narrow.",
  },
  "5-6": {
    pointsForts: "Your analytical calm soothes his anxiety. You teach him to understand his fears instead of yielding to them.",
    vigilances: "He needs explicit, constant warmth. Your emotional distance can fuel his insecurity.",
    conseil: "Reassure with words AND gestures. And keep your rituals — for him, predictability is securing.",
    parentSoutien: "For this child, your annoyed 'I told you, didn't I?' is a break in safety. He comes to ask you for the sixth time if you'll be there tomorrow — he doesn't need the information, he needs the bond. Every 'yes I'll be there' said with warmth is a brick. Your dry answer confirms that your love is conditional on his emotional sobriety. He'll learn it.",
    parentChallenge: "His anxiety exasperates you because it asks for what you don't know how to give: reassuring, repeated presence. You prefer the occasional, 'fair' presence — economical. But this child shows you that your economy is also a form of stinginess — affective, this time. Loving him requires accepting that he deserves more than you want to spend. That battle is with yourself.",
  },
  "5-7": {
    pointsForts: "You know how to channel his overflowing energy by orienting it toward depth. You open new worlds for him.",
    vigilances: "His need for stimulation and play can exhaust you. You risk withdrawing into your bubble.",
    conseil: "Accept playing even when you'd rather read. And give him rules — his energy needs a frame.",
    parentSoutien: "For this child, your economical listening is a disappointment that registers. He chats enthusiastically, you note only the main points; he senses your absence but keeps going. You teach him without meaning to that his energy is too much for others. One day he'll lower the volume. His spark, his charm, will dim first in your presence.",
    parentChallenge: "This child forces you out, to talk, to answer in real time. You find him exhausting, but he's actually borrowing your integration arrow — engagement, warmth, explosive presence. Your stress beside him isn't fatigue: it's the discomfort of growth. What stretches you is precisely what nourishes him.",
  },
  "5-8": {
    pointsForts: "Your calm soothes his power. You aren't impressed by his strength.",
    vigilances: "He tests your limits vigorously. If you withdraw before him, he takes all the space and loses his bearings.",
    conseil: "Hold your positions calmly. And engage physically with him — wrestling for fun, sport, concrete action.",
    parentSoutien: "For this child, explaining means weakening. When he disputes a rule, you argue calmly — you think you're holding firm, he hears that you aren't sure. Every demonstration is a door he pushes a little harder. He won't respect you for your good reasons, but for your ability to say no without giving any. Your authority isn't in your head: it's in your body that doesn't move.",
    parentChallenge: "He comes to find you exactly where you withdrew: in the body, in direct confrontation, in undisputed power. Every negotiation is a signal — he isn't trying to win, he's looking for a wall. As long as you stay in your head, he'll keep hitting. The day you stand without arguing, you'll see: he'll settle. He's the one teaching you to inhabit your authority.",
  },
  "5-9": {
    pointsForts: "Two peaceful profiles who appreciate calm. You don't push each other.",
    vigilances: "Risk of parallel life in silence. No one initiates, no one asks, no one truly meets.",
    conseil: "Force regular contact — a meal, a walk, a shared activity. Without it, you drift apart slowly.",
    parentSoutien: "For this child, your active absence is a confirmation that his presence isn't interesting. You're relieved to have a calm child who doesn't withdraw your energy — but this child resembles you by default, not by choice. He'll fade alone, without drama. You won't notice anything until very late.",
    parentChallenge: "His tranquil self-effacement suits you too well. No conflict, no demand, no request. That's precisely the trap. This child shows you what becomes of a Type 5 who's never been pulled out of withdrawal: not a sage, just an absent. His salvation depends on what you don't like doing — disturbing, calling out, demanding his presence. Your love passes through the discomfort you flee.",
  },

  // ── Parent Type 6 ──
  "6-1": {
    pointsForts: "You bring him safety through your reliability. He blossoms in your clear, constant frame.",
    vigilances: "Your anxiety feeds his perfectionism. He exhausts himself trying to avoid the catastrophes you fear.",
    conseil: "Work on YOUR anxiety so as not to transmit it to him. And trust him to decide alone, at his measure.",
    parentSoutien: "For this anxious young Type 1, your alliance in caution isn't a gift — it's a two-person prison. You, anxious; him too: you reinforce his frame with even more rules 'for his own good.' Two anxieties feed each other, and he understands the world is dangerous and one must monitor oneself constantly. You're reproducing in him exactly what your childhood made of you.",
    parentChallenge: "His self-criticism echoes yours — you recognize the moral anxiety, that 'what if I did wrong?' But by trying to reassure him, you validate his fear instead of contesting it. What he needs is someone who dares say 'it's not serious' without worry. To do it for him, you'd first need to say it to yourself.",
  },
  "6-2": {
    pointsForts: "You offer him warmth and safety. An affectionate, predictable home — he feels deeply loved there.",
    vigilances: "Your need for protection can suffocate him. He learns to sacrifice himself so as not to worry you.",
    conseil: "Trust his ability to handle the world. And teach him to say 'no' — including to your demands.",
    parentSoutien: "For this child who offers you his heart, your 'benevolent' vigilance teaches him that closeness comes with an investigation. He hugs you, seeks your affection — you scan what he might be hiding: 'did you have a problem at school?' He'll learn to reassure you before himself. His love will become, without your seeing it, a job of securing.",
    parentChallenge: "His spontaneous love disarms you — you look for the trap, the hidden 'why.' Your background mistrust can't tolerate gratuity. This child offers you what your own childhood may have refused you: affection without counterpart. Receiving it requires putting down, just for an instant, the scanner. You don't know if you're capable of that gesture.",
  },
  "6-3": {
    pointsForts: "You see his fragility behind his energy. You know how to ground him when he exhausts himself in performance.",
    vigilances: "He flees your anxiety by over-investing in success. The more you worry, the more he performs to reassure you.",
    conseil: "Visibly relax when he's with you. Love him without conditions of success — that's what frees him.",
    parentSoutien: "When he comes home with an ambitious project and your first reflex is to enumerate the risks, you think you're protecting him — he hears that you don't trust him. He'll learn not to share his impulses anymore until he's secured the ground himself. Or to carry them out in secret, with that small shame of having dared.",
    parentChallenge: "This child charges where you hesitate — and that scares you, but also fascinates you. You recognize in him what you would have wanted to be, what anxiety prevented you from becoming. Letting him grow up means accepting that he'll be what you didn't dare. It's one of the strongest and most jealous liberations a parent can experience.",
  },
  "6-4": {
    pointsForts: "You welcome his intense emotions seriously. You don't minimize them and he's grateful.",
    vigilances: "Your worries + his intensity = emotional spiral. You can feed each other in drama.",
    conseil: "Stay grounded when he wavers. And don't add your fears to his storms — he already has plenty to handle.",
    parentSoutien: "When he's in a dark phase and you go into inner consultation 'should I be alarmed?', your anxious questions confirm to him that his emotions are indeed dangerous. He'll learn to manage them alone so as not to alarm you, or to amplify them to keep you close. In both cases, his emotions become theater. Not territory.",
    parentChallenge: "His ability to inhabit intensity terrifies you — for you, strong emotion equals loss of control, equals danger. But he lives those states as his native country. His tolerance for emotion, which you find dangerous, may be just another way of inhabiting life. Accepting it means revising your founding equation: intensity equals threat. Maybe not always.",
  },
  "6-5": {
    pointsForts: "You respect his need for analysis and calm. You bring him warmth, he brings you thought.",
    vigilances: "He needs a reassuring parent, not an anxious one. Your constant doubts push him to retreat into his head.",
    conseil: "Display your confidence even when you doubt inwardly. And allow him to retreat to think — that's how he handles things.",
    parentSoutien: "For this child, your 'benevolent' check-up is an intrusion into his only refuge. He's in his bubble, reading, not answering you right away — your anxiety rises, you walk into his room. He'll learn to close more, communicate less, spare you the alarm. You'll lose access to his world precisely by trying to verify it.",
    parentChallenge: "His tranquil withdrawal worries you because it's beyond your vigilance's reach. You can't control him, can't anticipate. This child asks of you what costs you most: trusting without checking. His silent autonomy throws you back to your fear of letting go of the wheel. He teaches you that love can also be the act of not knowing.",
  },
  "6-6": {
    pointsForts: "You understand each other on the ground of vigilance. Mutual loyalty and reliability.",
    vigilances: "Your worries amplify each other. You can build a bubble of fear where the outside world seems dangerous.",
    conseil: "Cultivate confidence in the future. Model courage in the face of uncertainty — he learns it by watching you.",
    parentSoutien: "You think you're creating closeness through shared vigilance — you're building an ecosystem of permanent fear. You're two scanners that activate each other. Every 'what if' you validate in him becomes another 'what if' he'll carry for life. Your alliance in worry is a slow poison.",
    parentChallenge: "This child is your anxious mirror, and looking at him places you before what you can no longer deny: your fear hasn't made you safer, it's made you exhausted. His healing passes through yours — not through shared vigilance, but through a confidence you've never embodied. Teaching him peace requires that you find it yourself, after all these years.",
  },
  "6-7": {
    pointsForts: "His joy of life reassures you: life isn't only dangers. You offer him solidity, he offers you lightness.",
    vigilances: "You want to protect him, he wants to explore. Your repeated 'be careful's can extinguish his natural enthusiasm.",
    conseil: "Let him take measured risks. His confidence in life is a gift — don't steal it through over-protection.",
    parentSoutien: "Your repeated 'be careful's aren't vigilant love — they're a daily dose of doubt injected into his motor. He takes a risk, you let the phrase out; you repeat it ten times a day. He'll start hesitating where he didn't hesitate. He'll hear your voice at the moment of deciding. He'll associate adventure with parental fear.",
    parentChallenge: "His natural optimism almost physically clashes with you. How can he not see the dangers? You secretly envy him, and that envy sometimes turns to anger. This child embodies what your vigilance took from you: the basic confidence that the world isn't going to collapse. Admitting it means recognizing that your fear didn't protect you — it just amputated you.",
  },
  "6-8": {
    pointsForts: "His strength reassures you: he can defend himself. You also know how to see his vulnerability behind the shell.",
    vigilances: "He tests your limits with power. If you back down out of fear of conflict, he loses his bearings and gets more agitated.",
    conseil: "Be firm and calm in the face of his outbursts. Your solidity (not your harshness) secures him.",
    parentSoutien: "With a Type 8 child, your anxious control is illegible — he sees neither strength nor justice in it, just a parent who's afraid. He defies you, your anxiety explodes, you tighten the bolts, multiply rules. He doesn't obey for that. He'll test more, because he's looking for real authority — the kind that doesn't tremble — and he doesn't find it in you.",
    parentChallenge: "His strength terrifies you more than it terrifies other parents. Not because of his outbursts — because of what it reveals in negative: your own fear of existing. He embodies the raw verticality your anxiety slowly dissolved. Your parental work with this child is paradoxical: to hold up before him, you must first find a strength in yourself you don't believe you have.",
  },
  "6-9": {
    pointsForts: "His serenity soothes you. A gentle home where each finds his place without friction.",
    vigilances: "You avoid conflicts, but they pile up in silence. And your worries can disturb his calm.",
    conseil: "Initiate difficult conversations with gentleness. And reassure yourself: he's fine — his calm isn't a worrying sign.",
    parentSoutien: "When he tells you 'it's fine' and you close your eyes from exhaustion, his calm relieves you — at least one front to monitor less. But you know it's not true, and he learns that 'it's fine' is a gift he gives you. Later, you won't know what he really feels. And you won't know how you got there.",
    parentChallenge: "His apparent calm reassures you in the short term and troubles you deep down. You sense something beneath the smooth surface, but you don't dare touch it — out of fear of revealing something you wouldn't know how to handle. This child places you before an uncomfortable choice: preserve your fragile peace, or go look for his in the depths. The second option requires energy you don't know if you have.",
  },

  // ── Parent Type 7 ──
  "7-1": {
    pointsForts: "Your energy lightens him. You show him you can live without being perfect every moment.",
    vigilances: "Your scattering can frustrate his need for stability. He needs routine and kept promises.",
    conseil: "Keep your commitments and rituals. His rigor is a strength — don't confuse it with rigidity.",
    parentSoutien: "For this young Type 1, your creative fluidity isn't a gift — it's the absence of the bearings he asks of you. He asks you for a frame, rules, schedules; you reply with a flexible, negotiable version. He'll learn to set his own rules — compensatorily rigid — to survive your floating. He'll be far more rigid than you would have imagined.",
    parentChallenge: "His need for rigor tires and irritates you — why must everything be framed? But this child points precisely to what your gluttony has avoided: sustained commitment, chosen constraint, the depth that requires not flitting. Your stress arrow toward Type 1 awakens at his contact. To love him, you must accept that he forces you to land.",
  },
  "7-2": {
    pointsForts: "Mutual joy and warmth. A sparkling home where one laughs and loves hard.",
    vigilances: "He takes care of your mood. If you flee difficult moments, he learns to carry his own sadnesses alone.",
    conseil: "Stay available when the party is over. And allow yourself to show sadness — he needs to see that's OK.",
    parentSoutien: "For this child, your bursts of intensity are worth less than your steady reliability. You offer sublime but irregular moments — for you, the burst is enough; for him, regularity is the affective foundation. He'll learn to value intensity over reliability, like you. And he'll seek love in exciting people rather than safe ones.",
    parentChallenge: "His constant demand for presence weighs on you like a leash. You like intensity in flashes, he wants presence over time. This child confronts you with your basic flight: sustained engagement. His need for anchoring is precisely what your gluttony flees. Accepting it means renouncing the myth that love must always be sparkling.",
  },
  "7-3": {
    pointsForts: "A dynamic duo, endless projects, contagious energy. Your mutual admiration carries you.",
    vigilances: "You both flee difficult emotions. The family becomes a succession of activities without depth.",
    conseil: "Impose calm, deep moments on yourselves. Ask 'how do you REALLY feel?' and listen.",
    parentSoutien: "For this young Type 3, your 'relax, have fun' over his seriousness is a non-recognition. He applies himself, finishes what he starts, performs — you want to protect him from pressure; he hears that his seriousness isn't valued at home. He'll learn to hide his ambition. Or feel misunderstood in what he holds strongest.",
    parentChallenge: "His discipline almost bores you — why does he impose so much, when life can be lighter? But look closely: his commitment to accomplishment is precisely what you didn't manage to build. Your lightness has a hidden cost — you've never really finished the important things. This child, by finishing, sends you back to all you've started and abandoned.",
  },
  "7-4": {
    pointsForts: "His depth touches you. He teaches you to slow down and to feel — precious for you both.",
    vigilances: "You flee toward the positive when he needs to dive. Your 'come on, it'll pass' cuts him off from himself.",
    conseil: "Hold the space of his emotions without trying to transform them. Presence is worth more than solutions.",
    parentSoutien: "When he's sad and you suggest a thousand distractions 'to take his mind off,' you think you're helping — you refuse him the right to inhabit his sadness. He'll learn that his deep emotions are nuisances to others. He'll be cheerful on the surface with you, and unhappy in secret. And you'll think for a long time that he's fine.",
    parentChallenge: "His melancholy panics you — you sense in it the deprivation you've fled forever. What he naturally inhabits, you actively flee. This child shows you it's possible to stay with gravity without dying in it. Your gluttony may not be a richness — just an avoidance technique. Accepting it means tasting, you too, what isn't brilliant.",
  },
  "7-5": {
    pointsForts: "You open the wide world to him through your energy. He teaches you depth and concentration.",
    vigilances: "Your fast rhythm and changes of plan destabilize him. He needs mental space to digest.",
    conseil: "Announce changes in advance. And accept his retreat times — it isn't antisocial, it's recharging.",
    parentSoutien: "For this child, your joyful invitation is a disguised drain. He needs calm, silence, withdrawal; you walk in with 'come on, let's do something,' you find it 'sad' that he stays alone. Each intrusion is an energy withdrawal. He'll learn to flee you to preserve himself. Your house will become, for him, a place where one cannot recharge.",
    parentChallenge: "His tranquil withdrawal panics you — how can he not want to be with others? But his silent economy is exactly what your scattering can't embody: depth through concentration. He carries your integration arrow toward Type 5, and every moment you respect his silence is a moment you grow despite yourself.",
  },
  "7-6": {
    pointsForts: "Your optimism reassures his fears. You show him there's always a way out.",
    vigilances: "Your 'don't worry' without listening leaves him alone with his anxieties. He stops daring to talk about them.",
    conseil: "Validate his fears before transcending them. 'It's normal to be afraid of that, here's what we can do together.'",
    parentSoutien: "For this child, your promises are floating yes-es — he picks them up and his anxiety multiplies. He asks you for the third time if you'll really be there tonight; you say yes, but you already want to go out, and the tone betrays you. He'll learn that your love is real but unreliable. And reliability, for him, is love.",
    parentChallenge: "His need for guarantees suffocates you. You like to keep options open, he wants to lock them. His demand for safety reminds you of all the prisons you've avoided — commitments, firm promises, presences without exit. This child asks you to choose a prison: his, the prison of his safety. It's your love that passes through this voluntary claustrophobia.",
  },
  "7-7": {
    pointsForts: "A sparkling, creative, never-boring family. You help him embrace life fully.",
    vigilances: "You flee difficult moments together. No one starts the serious conversations or finishes the projects.",
    conseil: "Force yourself to stay when it's uncomfortable. And teach him to finish before starting something else.",
    parentSoutien: "You understand each other in a second, you're complicit, you never get bored — and no one lands. No one finishes, no one looks at the depth. Together you build a house without foundations. It'll be wonderful to live in until the storm comes.",
    parentChallenge: "This child is your joyful mirror, and that's precisely the problem. You complete each other in avoidance, you reassure each other in the race for experience. His healing passes through yours — one of you must learn to stop first. You can ask him to do it, or accept that it's up to you, the adult, to show the way. The second option is less fun.",
  },
  "7-8": {
    pointsForts: "His power stimulates you. You know how to turn his raw energy into play and adventure.",
    vigilances: "He needs clear frames. Your natural flexibility can be perceived as a lack of stance.",
    conseil: "Hold the essential rules firmly. Be flexible on details, firm on principles.",
    parentSoutien: "With a Type 8 child, your flight from conflict is read as weakness. He imposes his point of view, you negotiate, charm, bypass — he loses respect for your authority not because you're weak, but because you don't own your center. He'll test more and more to find a wall. And as long as he doesn't find one, he'll keep going.",
    parentChallenge: "His head-on power bothers you — you who prefer to glide, he wants to confront. But he offers you what your fluidity has lost: commitment without an exit door. Learning to hold up before him means learning to exist without the option of flight. It's one of the muscles your gluttony left atrophied, and he forces you to wake it.",
  },
  "7-9": {
    pointsForts: "Your energy gently pulls him out of his torpor. His serenity rests you from your agitation.",
    vigilances: "Your speed erases him. He says 'yes to everything' to follow your rhythm, and loses contact with his own wishes.",
    conseil: "Slow down regularly. Ask him what HE wants, not what he thinks you want him to want.",
    parentSoutien: "For this child, the 'yes' he offers you isn't shared joy — it's his own slowness denied to follow your rhythm. He accepts, smiles, follows the movement. You think he's having fun. He'll become an adult who no longer knows what tires him. Because he's learned too well not to say it.",
    parentChallenge: "His passive calm almost frightens you — you sense that without you, nothing would happen. This child gives you the illusion of being indispensable. But look more carefully: he fades all the more as you fill in. Your energy becomes his, and he loses his own. Waking him requires sometimes, just sometimes, silencing yourself. That's almost impossible for you.",
  },

  // ── Parent Type 8 ──
  "8-1": {
    pointsForts: "You acknowledge his rigor and respect it. You bring him strength when his rigidity blocks him.",
    vigilances: "You head-on, he methodical: conflict possible. Your fast decisions short-circuit his need to do well.",
    conseil: "Give him time to finish before moving. And acknowledge his sense of duty — it's his motor, not slowness.",
    parentSoutien: "For this serious young Type 1, your robust teasing isn't tenderness — it's a threat to his center. You jostle him physically 'to relax him,' you think you're injecting strength; your jokes hit his fragile point. He'll learn to rigidify further, or to withdraw. Either way, not to feel safe in your raw tenderness.",
    parentChallenge: "His moral demands sting you. His uprightness brings you back to a notion you buried: that there are gentle, slow forces that don't impose themselves. His refusal of your bluntness isn't weakness, it's another form of stance. This child forces you to consider that one can stand tall otherwise than through brute power. You hate that idea.",
  },
  "8-2": {
    pointsForts: "Your strength and his gentleness complement each other beautifully. You protect him, he softens you.",
    vigilances: "Your intensity can crush his sensitivity. He fades so as not to clash with you.",
    conseil: "Moderate your energy with him. And invite him to express his disagreements — he has them, but suppresses them.",
    parentSoutien: "For this tender young Type 2, your vigorous hug isn't gentleness — it's a benevolent force that retrains him. He comes to you, vulnerable; you squeeze him hard, big slap on the back. He'll learn to appreciate your love, but he'll never know how to receive real tenderness. Your power will have molded him.",
    parentChallenge: "This child offers you what you seek without knowing it: tenderness. Your Lust for life crashes against his gentleness like against a wall of feathers — nothing to fight, just to receive. And receiving is almost impossible for you. Your integration arrow toward Type 2 passes through him: he asks the most vertiginous of you, putting down weapons before someone smaller, without conditions.",
  },
  "8-3": {
    pointsForts: "Shared energy, high ambitions. You push him to surpass himself, he gives you something to chew on.",
    vigilances: "Possible competition. Your comparisons ('when I was your age...') wound him even when you mean to encourage.",
    conseil: "Celebrate HIS successes without comparing them to yours. He needs to be seen for himself.",
    parentSoutien: "For this child, your dry 'yeah, good' after a victory is a cold shower. He performs, succeeds, awaits your pride; for you it's already commitment, for him who lives off your admiring gaze, it's nothing. He'll do more, perform more, raise the cursor — until one day he tears out a real 'bravo,' maybe. He'll sell his inner balance for that minute.",
    parentChallenge: "This child seeks your admiration — and that bothers you because you don't admire easily. You respect strength, not performance. But he asks you for precisely what you don't know how to give freely: an admiring gaze. Your stinginess with recognition may be the only muscle you haven't trained. He forces you to train it.",
  },
  "8-4": {
    pointsForts: "You protect him in his emotional storms. He knows that with you, he can feel everything without danger.",
    vigilances: "Your strength can seem insensitive to his fragility. Your 'stop crying' crushes what he's living.",
    conseil: "Be present in silence during his emotions. Strength doesn't oppose tenderness — it can contain it.",
    parentSoutien: "For this child, your 'come on, stand up, it's nothing' is a clear message: his sensitivity is a problem in your eyes. You built yourself by deciding very young that crying made you vulnerable to blows. But he doesn't need that armor. At 10 he'll learn to hide what he holds most precious. At 20 he'll no longer know where his sensitivity is.",
    parentChallenge: "You decided very early that fragility was dangerous — that choice was probably necessary for you. But this child asks for permission to stay tender. Refusing it means transmitting a wound you didn't choose to inherit. Granting it requires re-crossing something in you, buried around age 8.",
  },
  "8-5": {
    pointsForts: "You respect his intelligence and know how to defend him when he isolates. He trusts you to protect him.",
    vigilances: "Your energy exhausts him. He needs calm and withdrawal — you risk invading him with your intensity.",
    conseil: "Moderate your presence when he's in his bubble. And engage physically with him — sport, action games.",
    parentSoutien: "For this child, your 'move, do something' is a devaluation of his inner world. He withdraws calmly to read, you push him outside; every time, you teach him that his inner life is inferior. He may obey on the surface. His inner richness, however, will shrink.",
    parentChallenge: "His analytical withdrawal makes you grind your teeth. For you, strength proves itself in action, not contemplation. But this child embodies exactly your stress arrow — under stress, you too retreat into silent suspicion. Seeing him bothers you because he naturally does what you do when you're unwell. You refuse to see it.",
  },
  "8-6": {
    pointsForts: "You embody the solidity he needs. His loyalty toward you is total once he trusts you.",
    vigilances: "Your bursts of force can terrify his anxiety. He builds himself on fear if you thunder too much.",
    conseil: "Be strong WITHOUT being scary. Calm + firm, never explosive. Your loud voice paralyzes him more than it educates.",
    parentSoutien: "For this anxious young Type 6, your 'stop stressing, go for it' isn't a liberation — it's contempt for his fear. He asks questions, doubts; you want to free him, he registers that you don't see his fear, that you judge it. He'll learn to hide it, to repress it, to fake confidence in front of you. His doubts won't disappear. They'll just become invisible. Far more toxic.",
    parentChallenge: "His caution deeply irritates you — why doesn't he just go for it? But his fear is real, not negotiable, not dispelled by force. This child forces you to do what you don't know how to do: respect a fragility without despising it, without wanting to make it disappear. Your Lust for control isn't equipped for that. Learning is slow, humbling, and necessary.",
  },
  "8-7": {
    pointsForts: "Overflowing energy on both sides. Adventures, sport, action — you understand each other in movement.",
    vigilances: "You both avoid difficult emotions through action. No one stops to feel.",
    conseil: "Impose calm moments together. And teach him to finish what he starts — your example matters.",
    parentSoutien: "For this child, your verticality looks like a prison. He starts ten things, changes his mind, isn't reliable; your blood rises: 'commit or don't.' You want to discipline him, he learns to flee you to preserve his freedom, or to conform out of fear. Either way, he loses. And so do you.",
    parentChallenge: "His joyful scattering bothers you because it flouts your code of honor: keep your word, finish, own up. But this child doesn't play that code. His freedom doesn't pass through commitment, and you must recognize that your verticality can also be rigidity in disguise. Your strength can integrate his — but you must first accept that his is also a strength.",
  },
  "8-8": {
    pointsForts: "Mutual respect of strong characters. When you're allied, nothing stops you.",
    vigilances: "Possible power rivalry. If you're always strongest, he digs in; if you yield, he despises you.",
    conseil: "Choose your battles. Acknowledge his strength as equal to yours — he needs you to see it.",
    parentSoutien: "You take your confrontations as healthy clash — behind, there's a child learning that love passes through domination. You're two strong characters, the battles are frequent and spectacular. He'll struggle to build gentle adult relationships. He'll need friction to feel attachment.",
    parentChallenge: "This child is your raw mirror, and your confrontations are as captivating as they are destructive. You recognize your power facing you, and that forces you to choose: keep winning over him, or yield him territories. Your Lust for control hates yielding. But it's the only path for him to learn that strength isn't the opposite of tenderness. You too.",
  },
  "8-9": {
    pointsForts: "His gentleness soothes you. You embody the strength he doesn't dare mobilize.",
    vigilances: "Your intensity erases him. He says 'whatever you want' to avoid the shock with your energy.",
    conseil: "Ask his opinion and actually wait for the answer. Moderate your voice, your rhythm, your intensity.",
    parentSoutien: "For this child, your intensity leaves him no oxygen. He fades the moment you enter the room, with no bad intention on your part — it's just your way of being, and he's learned not to fight it. You think he agrees with everything. He'll become an adult who switches off in front of powerful personalities. You'll have shaped his romantic pattern without meaning to.",
    parentChallenge: "His self-effacement suits you too well. No conflict, no resistance, all rolling. That's precisely the trap. This child reflects your stress arrow toward Type 5 — the silent, mistrustful relationship where one doesn't really commit. He asks of you the hardest effort: reduce your intensity so he can simply exist. You've never learned to lower the volume.",
  },

  // ── Parent Type 9 ──
  "9-1": {
    pointsForts: "Your calm soothes him. You help him release his perfectionism and enjoy the moment.",
    vigilances: "He needs a clear frame. Your tendency to accept everything can destabilize him — he's seeking limits.",
    conseil: "Set firm rules even when it costs you. His inner structure builds on yours.",
    parentSoutien: "For this young Type 1, your 'we'll see, do what you feel' isn't freedom — it's the absence of the support he asks of you. He demands a clear decision, a frame, a definite stance; you offer him fog. He'll learn to set his own rules. Harder, more rigid, more punitive than yours would ever have been.",
    parentChallenge: "His demand exhausts you — he wants too much, asks too much, frames too much. But what he claims is exactly what your Sloth flees: the firm position, the embodied commitment, the non-negotiable no. This child confronts you with your disinvestment disguised as tolerance. Loving him requires waking up. And you don't want to.",
  },
  "9-2": {
    pointsForts: "A gentle, harmonious home. You welcome his generosity with gratitude and calm.",
    vigilances: "You both avoid conflicts. He learns to smother his needs to preserve harmony.",
    conseil: "Model the kind 'no.' And invite him to express disagreements without fearing he'll disappoint you.",
    parentSoutien: "For this child, your silent fusion isn't an exchange — it's an absorption. He comes to you with all his love, you receive in silence, melted with him. He needs to see you give him back something active — a gaze, a precise word, a recognition. Your passive gentleness places him in doubt: is he loved, or just absorbed? He'll spend his life looking for the difference.",
    parentChallenge: "This child loves you intensely, and that intensity draws you to self-effacement rather than presence. You let yourself flow into his love instead of being its interlocutor. He asks you to stand up before him, not to merge. Your Sloth confuses this demand with aggressive pressure. It isn't aggressive — it's an invitation to exist.",
  },
  "9-3": {
    pointsForts: "You temper his agitation with your serenity. He brings you energy and movement.",
    vigilances: "You risk holding back his impulses through your passivity. His quest for success runs into your absence of enthusiasm.",
    conseil: "Visibly invest in his projects. Your active support matters as much as your calm acceptance.",
    parentSoutien: "For this child who lives off the gaze, your inner peace is an absence. He needs you to shine, to be applauded; you find it tiring, almost vain, your gaze stays lukewarm. He'll take your lukewarmness as disinvestment, and double his efforts to the point of exhaustion to deserve the spark that doesn't come. Your tranquility is, for him, an active lack.",
    parentChallenge: "This child carries your integration arrow — momentum, movement, visible affirmation. His flame intimidates and exhausts you. But look closely: his presence forces you not to fade. Every time you actively follow him, you grow. Your Sloth wants to bring him back to your tempo. He, on the contrary, asks you to accelerate to his.",
  },
  "9-4": {
    pointsForts: "You welcome his emotions without judging or overloading them. He feels deeply accepted.",
    vigilances: "Your passivity can leave him alone in his storms. He needs you to engage contact.",
    conseil: "Go to him actively when he closes off. Ask questions, stay present — your silence isolates him.",
    parentSoutien: "For this child in storm, your dissolved presence isn't support — it's a parent sinking with him. You welcome him in silence, present but absorbed in his state; you think you're at his side. He needs a presence that stays itself during his storm, not a parent who lets himself be carried away. Your passive empathy becomes a risk for him.",
    parentChallenge: "His emotional depth fascinates and draws you in. You drown in it with pleasure — it's restful to be in another's emotion rather than your own. But this child asks for exactly what your Sloth refuses: staying centered on yourself even in empathy. Your presence must be a distinct presence. Not a diluted one.",
  },
  "9-5": {
    pointsForts: "You respect his need for space and silence. Peaceful, respectful coexistence.",
    vigilances: "Risk of parallel life where no one initiates contact. He withdraws, you let him withdraw.",
    conseil: "Force shared moments — meal, outing, game. Without imposed rituals, you drift imperceptibly apart.",
    parentSoutien: "For this child, your shared peace isn't intimacy — it's a double absence. He withdraws, you find it comfortable: two tranquil beings in the same room. No one initiates, no one carries the bond. He'll grow up thinking love resembles courteous, silent cohabitation. He'll struggle to believe in more.",
    parentChallenge: "His silent withdrawal suits you too well. It's your favorite profile: someone who asks nothing of you. But this child forces you, if you really want to meet him, to become the one who knocks at the door, who interrupts, who invites. Your sloth tells you he's 'fine like that.' False — he's just waiting for someone to come find him.",
  },
  "9-6": {
    pointsForts: "Your serenity soothes his anxiety. A stable home where he knows he can count on constancy.",
    vigilances: "He needs clear answers to his worries. Your 'it'll be fine' without commitment leaves him alone.",
    conseil: "Commit concretely to his fears: 'here's what we'll do together.' Active presence reassures.",
    parentSoutien: "For this young Type 6, your 'we'll see, no need to worry' isn't a soothing — it's the absence of the support he asks of you. He's anxious, wants to know, seeks bearings; your reassuring fluidity is, for him, an anxiety-inducing void. He'll build his safety scenarios alone. Far more rigid than you would have imagined.",
    parentChallenge: "His anxiety activates your stress arrow toward Type 6 — in his presence, you become more suspicious, more doubtful. This child reminds you that one cannot live in superficial peace when someone you love is in fear. He pulls you out of your anesthesia — and your Sloth, which refused to go there, no longer has a choice. You owe him your awakening.",
  },
  "9-7": {
    pointsForts: "His joy animates you, your calm anchors him. Beautiful complementarity between energy and serenity.",
    vigilances: "His fast rhythm exhausts you. You risk mentally absenting yourself to protect yourself.",
    conseil: "Stay engaged even when you want to withdraw. He needs your active presence, not just physical.",
    parentSoutien: "For this child, your tranquil detachment isn't respect for his freedom — it's disengagement. He overflows with energy, ideas, projects; you follow at your rhythm, settled. He'll redouble his energy to reach you, or give up looking for you. Your benevolent neutrality is, for him, a form of abandonment.",
    parentChallenge: "This child carries the fire your Sloth extinguished in you. His overflowing vitality is exactly what you abandoned to have peace. His intensity tires you — but it's also your only chance to escape your anesthesia. Your integration arrow toward Type 3 passes through him. Following him means waking up. Letting him fall means dying a little more each day.",
  },
  "9-8": {
    pointsForts: "Your gentleness softens his power. You don't fear him, and that's precious for him.",
    vigilances: "He tests your limits with force. If you systematically yield, he takes all the space and loses his bearings.",
    conseil: "Hold your positions calmly but firmly. Your tranquil firmness is more powerful than confrontation.",
    parentSoutien: "With a Type 8 child, yielding to preserve peace is the worst message — he needs to find a wall. He defies you, tests, pushes; your reflex is to bypass, to yield. Your flight from conflict confirms to him that he's the strongest, and that no one is there to frame him. He'll be afraid of it. You won't have wanted to see.",
    parentChallenge: "His head-on power terrifies you. You don't have the tools — your Sloth has spared the muscle of confrontation. This child asks of you exactly what you've never wanted to embody: firm verticality, authority that holds. Either you learn, or you lose him. With a Type 8, there is no third option — and he needs you to know it.",
  },
  "9-9": {
    pointsForts: "Calm, harmony, fluidity. You live in peace at the same tranquil rhythm.",
    vigilances: "You both avoid decisions and conflicts. No one decides, no one moves forward.",
    conseil: "Force yourself to be the one who decides and initiates. He needs to learn to choose — through your active example.",
    parentSoutien: "You think you've succeeded as a duo — but no one demands anything, no one pushes, no one goes deep. You're two peaceful beings, you live in fluid harmony. He learns from you that love comes down to peace without friction. He'll build his adult relationships in that mold — gentle and comfortable, but also inert. He'll wonder why nothing transports him.",
    parentChallenge: "This child is your tranquil mirror, and that's the ultimate trap. You understand each other in silence, respect each other effortlessly, nothing scratches. But no one comes out of torpor, no one grows. His healing passes through yours: someone in this duo must start to exist openly. It won't be him — a child doesn't emerge from self-effacement alone. It'll be you. Or no one.",
  },
};

export const DUO_PEERS_VIEW_EN: Record<string, PerspectiveView> = {
  // ── Type 1 (sibling/friend) with… ──
  "1-1": {
    pointsForts: "Two little perfectionists who understand each other perfectly. They can build very polished projects together.",
    vigilances: "Fierce competition over 'who does it best.' Mutual criticism can spiral into fights over trifles.",
    conseil: "Encourage cooperation rather than comparison. And celebrate what they do TOGETHER, not individually.",
  },
  "1-2": {
    pointsForts: "The 1 sets the frame, the 2 brings comfort. The 2 admires the 1's rigor, the 1 accepts the 2's warmth. Beautiful complementarity.",
    vigilances: "The 1 criticizes, the 2 suffers in silence. The 2 learns to sacrifice for the 1's approval.",
    conseil: "Teach the 1 to value before correcting. And the 2 to say what they feel instead of absorbing.",
  },
  "1-3": {
    pointsForts: "An ambitious duo, serious projects well executed. They respect each other in effort and performance.",
    vigilances: "The 1 corrects the 3's process, the 3 finds the 1 slow. Inevitable competition over results.",
    conseil: "Give them distinct projects where each can shine in their own way. And teach them to celebrate the other's success.",
  },
  "1-4": {
    pointsForts: "An enriching contrast: the 1 structures, the 4 creates. Together they can produce something unique and complete.",
    vigilances: "The 1 finds the 4 too dramatic, the 4 finds the 1 too cold. Friction over emotions and rhythm.",
    conseil: "Help them see their differences as richness. The 4 needs emotional space, the 1 needs structure.",
  },
  "1-5": {
    pointsForts: "Solid intellectual friendship. They can spend hours building, debating, experimenting without tiring.",
    vigilances: "Two undemonstrative profiles. No one initiates the hug or the 'I need you.'",
    conseil: "Encourage physical moments — sport, play, walks. Connection doesn't pass through ideas alone.",
  },
  "1-6": {
    pointsForts: "Strong loyalty, mutual reliability. The 6 trusts the 1's direction, the 1 appreciates the 6's constancy.",
    vigilances: "The 1 may judge the 6's fears, the 6 may feel pushed by the 1's rigor.",
    conseil: "Teach the 1 to reassure before demanding. And the 6 to express fears instead of hiding them.",
  },
  "1-7": {
    pointsForts: "The 7 unsticks the 1, the 1 anchors the 7. If they accept each other, they create beauty and joy together.",
    vigilances: "The 1 finds the 7 irresponsible, the 7 finds the 1 boring. Frequent conflicts over rule-following.",
    conseil: "Give them COMMON projects with short rules. The 1 frames, the 7 enlivens — natural division.",
  },
  "1-8": {
    pointsForts: "Two strong personalities who respect each other in confrontation. When they ally, they're formidable.",
    vigilances: "Possible clashes. The 1 is right on principles, the 8 is right on force — each digs in.",
    conseil: "Mediate conflicts without taking sides. Help them see that their joint strength is more precious than rivalry.",
  },
  "1-9": {
    pointsForts: "Calm, stable friendship. The 9 accepts the 1's frame without friction, the 1 appreciates the 9's serenity.",
    vigilances: "The 1 may rush the 9 who fades. The 9 may frustrate the 1 with slow decision-making.",
    conseil: "Teach the 1 to wait, the 9 to express. Give the 9 the time he needs.",
  },

  // ── Type 2 ──
  "2-1": {
    pointsForts: "The warm 2 surrounds the serious 1. The 1 brings seriousness to the 2, the 2 brings warmth to the 1.",
    vigilances: "The 2 seeks the 1's approval, the 1 criticizes without realizing. The 2 may feel constantly insufficient.",
    conseil: "Teach the 1 to express gratitude. And the 2 not to define themselves by others' approval.",
  },
  "2-2": {
    pointsForts: "Mutual tenderness and generosity. They take care of each other with a gentleness rare among children.",
    vigilances: "Risk of codependency. They forget themselves for each other and exclude other friends.",
    conseil: "Encourage them to also have individual friends. And teach them to receive, not just give.",
  },
  "2-3": {
    pointsForts: "The 2 admires and supports the 3's ambitions. The 3 shines with a loyal fan club.",
    vigilances: "The 3 takes the 2's help for granted. The 2 fades in the 3's shadow and forgets their own dreams.",
    conseil: "Teach the 3 to thank explicitly. And the 2 to shine for themselves, not just to serve others' success.",
  },
  "2-4": {
    pointsForts: "Deep emotional friendship. The 2 surrounds the 4, the 4 offers the 2 their depth.",
    vigilances: "The 2 wants to console, the 4 wants to be understood in pain. The 2 may feel powerless and guilty.",
    conseil: "Teach the 2 that holding the space doesn't mean solving. And the 4 to say thank you for the presence received.",
  },
  "2-5": {
    pointsForts: "The 2 opens the 5's cocoon with respect. The 5 offers the 2 their thinking and depth.",
    vigilances: "The 2 invades the 5 with excess attention, the 5 withdraws. The 2 reads the distance as rejection.",
    conseil: "Teach the 2 to respect the 5's withdrawal zones. And the 5 to manifest presence when they return.",
  },
  "2-6": {
    pointsForts: "Very loyal, warm friendship. They support each other through hard times with rare fidelity.",
    vigilances: "They may lock themselves in a bubble of mutual worry. The 2 feeds the 6's fears by trying to reassure.",
    conseil: "Encourage them to explore the outside world. And invite other friends into their duo to air the relationship.",
  },
  "2-7": {
    pointsForts: "The 7 draws the 2 into joy, the 2 takes care of the 7 in their excesses. A popular, warm duo.",
    vigilances: "The 7 runs everywhere, the 2 exhausts themselves following. And both flee difficult emotions.",
    conseil: "Teach them to stop together. And invite them to talk about what's wrong, not just what's sparkling.",
  },
  "2-8": {
    pointsForts: "The 2 softens the 8, the 8 protects the 2. Deep loyalty once trust is established.",
    vigilances: "The 8 may crush the 2 unintentionally. The 2 absorbs the 8's intensity and forgets to assert.",
    conseil: "Teach the 8 to moderate force with friends. And the 2 to respect themselves enough to say 'stop.'",
  },
  "2-9": {
    pointsForts: "Gentle, harmonious friendship. They take care of each other in calm and kindness.",
    vigilances: "Neither says what's wrong. Unspoken things pile up to a silent drift.",
    conseil: "Encourage them to express disagreements. Without verbalized friction, their friendship may fade soundlessly.",
  },

  // ── Type 3 ──
  "3-1": {
    pointsForts: "Shared ambition and rigor. They pull each other up on serious projects.",
    vigilances: "The 3 wants to shine, the 1 wants to do well. Possible conflict over methods (shortcut vs. deep work).",
    conseil: "Teach them to respect the other's mode. And to recognize that both approaches are valid.",
  },
  "3-2": {
    pointsForts: "The 2 supports the 3, the 3 makes the 2 shine by association. Smooth friendship where each finds their place.",
    vigilances: "The 3 uses the 2 without realizing. The 2 fades to serve the 3's image.",
    conseil: "Help the 2 shine for themselves. And teach the 3 to include the 2 in successes, not push them to the background.",
  },
  "3-3": {
    pointsForts: "Overflowing energy, ambitious projects, shared successes. They understand each other in the quest for accomplishment.",
    vigilances: "Fierce competition. Constant comparison can destroy their friendship and create lasting wounds.",
    conseil: "Give them distinct projects. Encourage them to celebrate the other's success as their own.",
  },
  "3-4": {
    pointsForts: "The 3 draws the 4 toward action, the 4 brings the 3 back to themselves. Precious mutual learning.",
    vigilances: "The 3 finds the 4 too slow and too intense. The 4 finds the 3 superficial and disconnected.",
    conseil: "Help them see what each brings. The 4 needs the 3's dynamism, the 3 needs the 4's depth.",
  },
  "3-5": {
    pointsForts: "The 3 puts the 5's analyses into action. A very efficient duo on projects requiring thought AND execution.",
    vigilances: "The 3 short-circuits the 5's thinking, the 5 brakes the 3's momentum. Tension on rhythm.",
    conseil: "Define roles: the 5 thinks, the 3 executes. And respect the time each needs.",
  },
  "3-6": {
    pointsForts: "The 3 gives confidence to the 6, the 6 brings the 3 back to caution. Beautiful alliance for well-prepared projects.",
    vigilances: "The 3 charges, the 6 anticipates catastrophes. Tension over which risks to take.",
    conseil: "Teach the 3 to listen to the 6's fears (often well-founded). And the 6 to trust the 3's momentum.",
  },
  "3-7": {
    pointsForts: "Energy, projects, two-person enthusiasm. They can build incredible things together.",
    vigilances: "You both flee difficult emotions. Your friendships can stay on the surface.",
    conseil: "Teach them to talk about what's wrong. Depth comes through sharing difficulties, not just successes.",
  },
  "3-8": {
    pointsForts: "Two ambitious leaders who respect each other. When they ally, they can carry the group.",
    vigilances: "Possible power rivalry. Competition over who decides, who leads, who succeeds.",
    conseil: "Help them cooperate rather than fight. Defining distinct territories prevents friction.",
  },
  "3-9": {
    pointsForts: "The 3 energizes the 9, the 9 calms the 3. Beautiful complementarity between energy and serenity.",
    vigilances: "The 3 finds the 9 too passive, the 9 finds the 3 too agitated. The 9 disappears under the 3's pressure.",
    conseil: "Teach the 3 to respect the 9's rhythm. And the 9 to express wishes before the 3 decides for them.",
  },

  // ── Type 4 ──
  "4-1": {
    pointsForts: "Aesthetics and rigor united. They can create works or projects of great refinement together.",
    vigilances: "The 4 finds the 1 cold, the 1 finds the 4 dramatic. Friction over emotional expression.",
    conseil: "Help them see their differences as complementary. And respect each one's emotional needs.",
  },
  "4-2": {
    pointsForts: "Shared emotional depth. The 2 consoles, the 4 reveals layers few dare to touch.",
    vigilances: "The 4 absorbs the 2's attention through intensity. The 2 exhausts themselves trying to repair what isn't broken.",
    conseil: "Teach the 2 to be present without solving. And the 4 to appreciate presence without always diving.",
  },
  "4-3": {
    pointsForts: "The 4 offers depth, the 3 offers action. Together they can produce both meaning AND results.",
    vigilances: "The 4 finds the 3 superficial, the 3 finds the 4 slow. Conflict over what really matters.",
    conseil: "Help them see what each brings. And respect their different visions of success.",
  },
  "4-4": {
    pointsForts: "Deep emotional understanding, intense friendship. They see each other in their true nature.",
    vigilances: "Risk of melancholic cocoon. Two 4s together can lock themselves in intensity and lose touch with reality.",
    conseil: "Encourage light, joyful, physical activities. And invite other friends to air their bubble.",
  },
  "4-5": {
    pointsForts: "Rich intellectual and emotional friendship. They mutually respect each other's inner world.",
    vigilances: "Risk of two-person isolation. No one invites, no one goes out, the outside world recedes.",
    conseil: "Force openness toward other relationships. Their friendship gains by being fed by the wide world.",
  },
  "4-6": {
    pointsForts: "The 4 offers depth, the 6 offers loyalty. Beautiful emotional complementarity.",
    vigilances: "The 4 feeds the 6's fears with intensity. The 6 exhausts themselves reassuring the 4 in their doubts.",
    conseil: "Teach the 4 to moderate their storms. And the 6 not to feel responsible for the 4's happiness.",
  },
  "4-7": {
    pointsForts: "The 4 dives, the 7 skims the surface — their differences are enriching if each opens to the other.",
    vigilances: "The 7 flees the 4's intensity, the 4 finds the 7 superficial. Tension over what deserves attention.",
    conseil: "Help the 7 stay when it's uncomfortable. And the 4 appreciate lightness without judging it.",
  },
  "4-8": {
    pointsForts: "Shared intensity. The 8 protects the 4, the 4 helps the 8 touch their vulnerability.",
    vigilances: "The 8 may crush the 4 with strength. The 4 may frustrate the 8 with emotional storms.",
    conseil: "Teach the 8 to respect the 4's sensitivity. And the 4 to receive protection without dramatizing it.",
  },
  "4-9": {
    pointsForts: "The 9 welcomes all the 4's emotions without judgment. The 4 appreciates this total acceptance.",
    vigilances: "The 4 may invade the 9 with intensity. The 9 disappears so as not to carry the 4's emotions.",
    conseil: "Teach the 4 to respect the 9's peace. And the 9 to say when it's too much, instead of absenting themselves.",
  },

  // ── Type 5 ──
  "5-1": {
    pointsForts: "Solid intellectual friendship, rigorous, reliable. They mutually respect each other's seriousness.",
    vigilances: "Little explicit warmth, little spontaneity. The relationship can become purely functional.",
    conseil: "Encourage moments of play, sport, bodily expression. Connection doesn't pass through the head alone.",
  },
  "5-2": {
    pointsForts: "The 5 offers thought, the 2 offers warmth. If both respect the other's rhythm, beautiful friendship.",
    vigilances: "The 2 invades the 5, the 5 withdraws. The 2 reads the distance as rejection and doubles attention.",
    conseil: "Teach the 2 to leave space. And the 5 to manifest presence when they return from their bubble.",
  },
  "5-3": {
    pointsForts: "The 5 thinks, the 3 acts. Efficient duo if each respects the other's rhythm.",
    vigilances: "The 3 short-circuits the 5's thinking, the 5 brakes the 3's momentum. Tension on tempo.",
    conseil: "Teach them to value what the other brings. And give each the time needed.",
  },
  "5-4": {
    pointsForts: "Intellectual AND emotional depth. A rare friendship where everything can be shared without superficiality.",
    vigilances: "Risk of hermetic bubble. Two introverted profiles isolating themselves together from the rest of the world.",
    conseil: "Encourage openness toward other friends. And physical activities to get them out of the mental.",
  },
  "5-5": {
    pointsForts: "Mutual respect for silences and space. A calm friendship without drama, deeply stable.",
    vigilances: "No one initiates contact. They can stay side by side without ever truly meeting.",
    conseil: "Encourage concrete rituals — a shared project, a regular activity. Without it, they lose sight of each other.",
  },
  "5-6": {
    pointsForts: "The 5 analyzes, the 6 anticipates. A very complementary duo for projects requiring caution and thought.",
    vigilances: "Risk of analytical worry spiral. They can see dangers everywhere and paralyze each other.",
    conseil: "Encourage action and calculated risk. And invite other profiles into their duo to air the thinking.",
  },
  "5-7": {
    pointsForts: "The 5 deepens, the 7 opens. Rich mutual learning if each opens to the other.",
    vigilances: "The 7 exhausts the 5 with agitation. The 5 frustrates the 7 with slowness and withdrawal.",
    conseil: "Teach the 7 to respect the 5's withdrawal zones. And the 5 to participate in the 7's energy at times.",
  },
  "5-8": {
    pointsForts: "Mutual respect possible: the 8 protects the 5, the 5 advises the 8. An interesting duo if each respects the other.",
    vigilances: "The 8 jostles the 5 with force. The 5 frustrates the 8 with restraint.",
    conseil: "Teach the 8 to moderate intensity. And the 5 to engage physically, not just mentally.",
  },
  "5-9": {
    pointsForts: "Shared calm, respect for silences, peaceful coexistence. Friendship without drama.",
    vigilances: "No one initiates. They can stay very close in silence and end up losing each other.",
    conseil: "Encourage concrete rituals — sport, play, shared project. Without it, their friendship fades quietly.",
  },

  // ── Type 6 ──
  "6-1": {
    pointsForts: "Shared loyalty and rigor. A reliable, respectful friendship one can count on.",
    vigilances: "The 1 criticizes the 6's hesitations, the 6 feels judged. Risk of friendship under permanent tension.",
    conseil: "Teach the 1 to reassure before demanding. And the 6 to trust the 1's intentions.",
  },
  "6-2": {
    pointsForts: "Tenderness and loyalty. They take care of each other with touching fidelity.",
    vigilances: "The 2 feeds the 6's fears by trying to reassure. They can lock themselves in a bubble of worry.",
    conseil: "Encourage them to explore the outside world. And to invite other friends into their duo.",
  },
  "6-3": {
    pointsForts: "The 3 gives confidence to the 6, the 6 anchors the 3. Beautiful complementarity between caution and energy.",
    vigilances: "The 3 minimizes the 6's fears, the 6 brakes the 3's momentum. Tension on risks.",
    conseil: "Teach the 3 to listen to the 6's fears before transcending them. And the 6 to dare despite worry.",
  },
  "6-4": {
    pointsForts: "The 6 offers reliability, the 4 offers depth. Rich emotional complementarity.",
    vigilances: "The 4's intensity fuels the 6's anxiety. The 6 may exhaust themselves trying to stabilize the 4.",
    conseil: "Teach the 4 to moderate storms. And the 6 not to feel responsible for the 4's happiness.",
  },
  "6-5": {
    pointsForts: "Calm and analytical friendship. They reassure each other through thought and anticipation.",
    vigilances: "Risk of intellectual doubt and worry spiral. They can paralyze each other.",
    conseil: "Encourage action and measured risk. And invite other profiles into their duo to air things out.",
  },
  "6-6": {
    pointsForts: "Absolute loyalty, mutual support facing fears. When one doubts, the other reassures.",
    vigilances: "Risk of anxiety amplification. They can feed each other in worry.",
    conseil: "Cultivate confidence, calculated risk, adventure. And model (you, parent) courage in the face of uncertainty.",
  },
  "6-7": {
    pointsForts: "The 7 reassures the 6 with lightness, the 6 anchors the 7 with caution. Beautiful complementarity.",
    vigilances: "The 7 minimizes the 6's fears, the 6 brakes the 7's momentum. Recurring tension.",
    conseil: "Teach the 7 to validate the 6's fears before transcending them. And the 6 to dare despite doubts.",
  },
  "6-8": {
    pointsForts: "The 8 protects the 6, the 6 is loyally devoted to the 8. Strong friendship once trust is established.",
    vigilances: "The 8 may intimidate the 6 with strength. The 6 may frustrate the 8 with hesitations.",
    conseil: "Teach the 8 to moderate power. And the 6 not to be crushed — their opinion matters.",
  },
  "6-9": {
    pointsForts: "Gentle, stable friendship. The 9 soothes the 6's fears with natural serenity.",
    vigilances: "Neither broaches conflicts. Unspoken things pile up and may erode the relationship.",
    conseil: "Encourage them to express disagreements. And to make clear decisions together — they wobble in twos.",
  },

  // ── Type 7 ──
  "7-1": {
    pointsForts: "The 7 unsticks the 1, the 1 anchors the 7. If both accept each other, they create joy AND structure.",
    vigilances: "The 1 criticizes the 7's mess, the 7 flees the 1's rigidity. Recurring conflicts over rules.",
    conseil: "Give them shared projects with short rules. And teach them to respect what the other brings.",
  },
  "7-2": {
    pointsForts: "Shared joy and warmth. The 7 takes the 2 along on adventures, the 2 takes care of the 7.",
    vigilances: "The 7 runs everywhere, the 2 exhausts themselves following. Both flee difficult emotions.",
    conseil: "Teach them to stop together. And to talk about what's wrong, not just what's sparkling.",
  },
  "7-3": {
    pointsForts: "Overflowing energy, joyful projects, shared successes. They mutually boost each other with enthusiasm.",
    vigilances: "You both flee emotional depth. Your friendships can stay on the surface.",
    conseil: "Teach them to talk about what really touches them. Depth enriches friendship without weighing it down.",
  },
  "7-4": {
    pointsForts: "The 4 offers depth, the 7 offers lightness. Precious mutual learning.",
    vigilances: "The 7 flees the 4's intensity, the 4 finds the 7 superficial. Friction over what deserves attention.",
    conseil: "Help the 7 stay when it's uncomfortable. And the 4 appreciate joy without devaluing it.",
  },
  "7-5": {
    pointsForts: "The 7 opens, the 5 deepens. Interesting duo if each respects the other's rhythm.",
    vigilances: "The 7 exhausts the 5 with agitation. The 5 frustrates the 7 with slowness and withdrawal.",
    conseil: "Teach the 7 to respect the 5's withdrawal zones. And the 5 to participate in the 7's energy at times.",
  },
  "7-6": {
    pointsForts: "The 7 reassures the 6, the 6 anchors the 7. Beautiful complementarity between joy and caution.",
    vigilances: "The 7 minimizes the 6's fears, the 6 brakes the 7's momentum. Recurring tension.",
    conseil: "Teach the 7 to validate the 6's fears. And the 6 to dare despite doubts — often it's OK.",
  },
  "7-7": {
    pointsForts: "Contagious energy, overflowing creativity, endless projects. A sparkling, joyful friendship.",
    vigilances: "Scattering, projects never finished, flight from difficult emotions. No one stops.",
    conseil: "Teach them to finish ONE project before starting another. And to talk about what they really feel.",
  },
  "7-8": {
    pointsForts: "Shared energy and action. Adventures, sport, challenges — they understand each other in movement.",
    vigilances: "You both avoid difficult emotions through action. No one stops to feel.",
    conseil: "Impose calm moments. And teach them to talk about what's wrong, not just to act.",
  },
  "7-9": {
    pointsForts: "The 7 enlivens the 9, the 9 calms the 7. Beautiful complementarity between energy and serenity.",
    vigilances: "The 7 sweeps the 9 into their rhythm, the 9 says yes but checks out. Risk of silent disengagement.",
    conseil: "Teach the 7 to actually ask the 9's opinion. And the 9 to express their own wishes.",
  },

  // ── Type 8 ──
  "8-1": {
    pointsForts: "Shared force and rigor. When they ally, they're formidable on serious projects.",
    vigilances: "The 8 head-on, the 1 methodical: possible conflicts over rhythm and rules.",
    conseil: "Help them see their joint strength. The 1 frames, the 8 propels — natural division if each respects the other.",
  },
  "8-2": {
    pointsForts: "The 8 protects the 2, the 2 softens the 8. Mutual loyalty and tenderness.",
    vigilances: "The 8 may crush the 2 unintentionally. The 2 absorbs the 8's intensity and forgets to assert.",
    conseil: "Teach the 8 to moderate force. And the 2 to respect themselves enough to say 'stop.'",
  },
  "8-3": {
    pointsForts: "Two ambitious leaders who respect each other. When they cooperate, they can take on anything.",
    vigilances: "Possible power rivalry. Competition over who decides, who leads, who succeeds.",
    conseil: "Help them cooperate rather than fight. Defining distinct territories prevents friction.",
  },
  "8-4": {
    pointsForts: "Shared intensity. The 8 protects the 4, the 4 helps the 8 touch their vulnerability.",
    vigilances: "The 8 may crush the 4 with strength. The 4 may frustrate the 8 with emotional storms.",
    conseil: "Teach the 8 to respect the 4's sensitivity. And the 4 to receive protection without dramatizing.",
  },
  "8-5": {
    pointsForts: "Mutual respect: the 8 protects the 5, the 5 advises the 8. An interesting and stable duo.",
    vigilances: "The 8 jostles the 5 with energy. The 5 frustrates the 8 with restraint.",
    conseil: "Teach the 8 to moderate intensity. And the 5 to participate physically, not just mentally.",
  },
  "8-6": {
    pointsForts: "The 8 protects the 6, the 6 is loyally devoted to the 8. Strong friendship once trust is built.",
    vigilances: "The 8 may intimidate the 6. The 6 may frustrate the 8 with hesitations.",
    conseil: "Teach the 8 to moderate power. And the 6 not to be crushed — their opinion matters.",
  },
  "8-7": {
    pointsForts: "Shared energy, action, adventure. An intense, lively friendship, never boring.",
    vigilances: "You both avoid difficult emotions through action. No one stops to feel.",
    conseil: "Impose calm moments. And teach them to talk about what's wrong, not just to charge ahead.",
  },
  "8-8": {
    pointsForts: "When two 8s are allied, they're indestructible. Absolute loyalty and total mutual respect.",
    vigilances: "When they clash, it's explosive. Power rivalry can destroy their friendship.",
    conseil: "Help them recognize the other's strength as an asset, not a challenge. Mutual respect is the key.",
  },
  "8-9": {
    pointsForts: "The 8 protects the 9, the 9 soothes the 8. Beautiful complementarity if balance is respected.",
    vigilances: "The 8 takes all the space, the 9 disappears to avoid conflict. The 9 loses their voice.",
    conseil: "Teach the 8 to actually ask the 9's opinion. And the 9 to assert themselves before the 8 — they're capable of it.",
  },

  // ── Type 9 ──
  "9-1": {
    pointsForts: "A calm friendship — the 9 accepts the 1's frame, the 1 appreciates the 9's serenity. Welcome stability.",
    vigilances: "The 1 may rush the 9 who fades. The 9 may frustrate the 1 with slowness.",
    conseil: "Teach the 1 to wait. And the 9 to express wishes instead of always adapting.",
  },
  "9-2": {
    pointsForts: "Gentle, kind friendship. They take care of each other in calm.",
    vigilances: "Neither says what's wrong. Unspoken things pile up to silent drift.",
    conseil: "Encourage them to express disagreements. Without verbalized friction, their friendship dies down.",
  },
  "9-3": {
    pointsForts: "The 9 calms the 3, the 3 energizes the 9. Beautiful complementarity between energy and serenity.",
    vigilances: "The 3 sweeps the 9 into their rhythm, the 9 says yes but checks out. Risk of disengagement.",
    conseil: "Teach the 3 to actually ask the 9's opinion. And the 9 to clearly express their own wishes.",
  },
  "9-4": {
    pointsForts: "The 9 welcomes all the 4's emotions without judgment. The 4 appreciates this total acceptance.",
    vigilances: "The 4 may invade the 9 with intensity. The 9 disappears so as not to carry the 4's emotions.",
    conseil: "Teach the 4 to respect the 9's peace. And the 9 to say 'stop' instead of silently absenting themselves.",
  },
  "9-5": {
    pointsForts: "Shared calm, respect for silences, peaceful coexistence. Friendship without drama.",
    vigilances: "No one initiates. They can stay very close in silence and end up losing each other.",
    conseil: "Encourage concrete rituals — sport, play, shared project. Without it, their friendship fades quietly.",
  },
  "9-6": {
    pointsForts: "Gentle, stable friendship. The 9 soothes the 6's fears with natural serenity.",
    vigilances: "Neither broaches conflicts. Unspoken things pile up and may erode the relationship.",
    conseil: "Encourage them to express disagreements. And to make clear decisions together.",
  },
  "9-7": {
    pointsForts: "The 9 calms the 7, the 7 enlivens the 9. Beautiful complementarity between energy and serenity.",
    vigilances: "The 7 sweeps the 9 into their rhythm, the 9 says yes but checks out. Risk of disengagement.",
    conseil: "Teach the 7 to actually ask the 9's opinion. And the 9 to express their own wishes.",
  },
  "9-8": {
    pointsForts: "The 8 protects the 9, the 9 soothes the 8. Beautiful complementarity if balance is respected.",
    vigilances: "The 8 takes all the space, the 9 disappears to avoid conflict. The 9 loses their voice.",
    conseil: "Teach the 8 to actually ask the 9's opinion. And the 9 to assert themselves before the 8.",
  },
  "9-9": {
    pointsForts: "Calm, harmony, fluidity. They live in peace at the same tranquil rhythm.",
    vigilances: "No one decides, no one cuts through. The friendship can bog down in mutual passivity.",
    conseil: "Encourage them to take initiative, to choose, to propose. And to express disagreements without fear.",
  },
};

