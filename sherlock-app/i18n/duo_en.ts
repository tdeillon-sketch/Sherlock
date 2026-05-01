// ═══════════════════════════════════════════════════════════════
//  EN TRANSLATIONS — Duo (DUO_DATA + DUO_PAIRS_CONTEXT)
//
//  Strategy: field-level fallback. Consumers do
//    DUO_DATA_EN[key]?.[field] ?? DUO_DATA[key][field]
//  so missing entries gracefully fall back to French.
//
//  Coverage: DUO_DATA (81 directed pairs × 8 fields)
//          + DUO_PAIRS_CONTEXT (81 peer-peer tips)
//  Out of scope (next session): DUO_PARENT_VIEW + DUO_PEERS_VIEW
//  (those use long, nuanced author-voice paragraphs).
// ═══════════════════════════════════════════════════════════════

import type { DuoPair } from '../constants/duo';

export const DUO_DATA_EN: Record<string, DuoPair> = {

  // ══════════════════════════════════════════
  //  TYPE 1 — The Reformer
  // ══════════════════════════════════════════

  '1-1': {
    pointsForts: "Shared values, shared sense of duty, efficiency on projects. You understand each other without needing to explain.",
    vigilances: "Risk of competition over \"who does it best.\" Mutual criticism can spiral and leave little room for error.",
    aApporte: "Rigor, reliability, direct honesty.",
    bApporte: "The same demanding mirror — uncomfortable but precious.",
    conseil: "Set a rule together: one criticism = one sincere compliment. Without that, your shared space can become a courtroom.",
    contexte: {
      enfant: "Type 1 parent with a Type 1 child: avoid escalating demands. Your child already punishes themselves — they need your lightness, not your perfectionism.",
      couple: "You share an immaculate home and strong values, but make sure to keep spontaneity — life shouldn't be a checklist.",
      adulte: "Formidable duo on projects, but watch out: without humor or tolerance for imperfection, your collaboration can turn into a courtroom.",
    },
  },

  '1-2': {
    pointsForts: "The 1 brings the framework, the 2 brings the warmth. Together, you combine efficiency with humanity.",
    vigilances: "The 1 finds the 2 too emotional and not rigorous enough. The 2 feels criticized and never quite recognized for their efforts.",
    aApporte: "Structure, clear principles, straightforward honesty.",
    bApporte: "Gentleness, empathy, sense of connection and relationship.",
    conseil: "Type 1: express gratitude before criticism. Type 2: state clearly what you need instead of waiting for it to be guessed.",
    contexte: {
      enfant: "Your Type 2 child seeks your approval above all. Replace one correction in two with \"I'm proud of you\" — they will bloom.",
      couple: "The 2 softens the 1, the 1 structures the 2. Beautiful complementarity if the 1 learns to value before correcting.",
      adulte: "The 2 makes the 1 more human in others' eyes. The 1 helps the 2 not lose themselves in service to others.",
    },
  },

  '1-3': {
    pointsForts: "Shared ambition, sense of results, respect for effort. You pull each other upward.",
    vigilances: "The 1 wants to do well, the 3 wants to look efficient — conflict erupts over methods. The 3 sees the 1 as too rigid.",
    aApporte: "Integrity, refusal of ethical compromise, deep work.",
    bApporte: "Adaptability, sense of timing, results-driven energy.",
    conseil: "Clarify upfront: is the process or the result the priority? This question prevents most of your friction.",
    contexte: {
      enfant: "Your Type 3 child wants your admiration, not just your approval. Celebrate their successes with enthusiasm, not with \"yes, but you could have…\"",
      couple: "Powerful but potentially competitive duo. Define distinct domains where each excels to avoid rivalry.",
      adulte: "Formidable as a team if the 1 accepts the 3's pragmatic shortcuts and the 3 respects the 1's ethical red lines.",
    },
  },

  '1-4': {
    pointsForts: "The 1 and the 4 share a high ideal. Together, you can create something truly beautiful and right.",
    vigilances: "The 1 finds the 4 too dramatic and unpredictable. The 4 feels misunderstood and judged in their uniqueness.",
    aApporte: "Discipline, consistency, grounding in reality.",
    bApporte: "Emotional depth, creativity, aesthetic sense.",
    conseil: "Type 1: the 4's sensitivity isn't a flaw — it's their strength. Type 4: the 1's rigor isn't rejection — it's their way of loving.",
    contexte: {
      enfant: "Your Type 4 child needs to feel unique, not perfect. Value their difference rather than correct it.",
      couple: "Intense, rich relationship if the 1 learns to live in emotional ambiguity and the 4 accepts structure as an act of love.",
      adulte: "Ideal artistic or ethical collaboration. Let the 4 create and the 1 structure — don't reverse them.",
    },
  },

  '1-5': {
    pointsForts: "Intellectually stimulating to each other. Shared values around competence and quality work.",
    vigilances: "Two profiles that hold back their emotions — the relationship can become cold and functional. Both flee vulnerability.",
    aApporte: "Action, sense of the concrete, organization.",
    bApporte: "Analysis, depth of thought, objectivity.",
    conseil: "Schedule moments of emotional connection — neither will take the initiative naturally.",
    contexte: {
      enfant: "Your Type 5 child needs alone time to recharge — don't force them to socialize. Respect their rhythm.",
      couple: "Stable, respectful relationship but risk of \"parallel lives.\" Build regular rituals of connection.",
      adulte: "Highly effective duo on analytical projects. Don't let the relationship shrink to the professional plane.",
    },
  },

  '1-6': {
    pointsForts: "Shared reliability, sense of responsibility, strong loyalty. You can build something durable together.",
    vigilances: "The 1 may find the 6 too anxious and hesitant. The 6 may experience the 1's principles as imposed rules.",
    aApporte: "Moral certainty, clear direction, courage to act.",
    bApporte: "Loyalty, anticipation of risks, constant support.",
    conseil: "Type 1: reassure before correcting. Type 6: trust the 1's intentions — their rigor protects, it doesn't oppress.",
    contexte: {
      enfant: "Your Type 6 child needs clear rules AND your emotional safety. Both together, not one without the other.",
      couple: "Solid, reliable relationship. Beware of falling into routine out of fear of change — stimulate each other.",
      adulte: "Excellent pair for projects requiring rigor and anticipation. The 6 sees the risks, the 1 holds the course.",
    },
  },

  '1-7': {
    pointsForts: "The 7 pulls the 1 out of rigidity. The 1 grounds the 7. Powerful complementarity if each accepts the other.",
    vigilances: "The 1 finds the 7 irresponsible and superficial. The 7 finds the 1 boring and moralistic.",
    aApporte: "Reliability, follow-through, sense of commitment.",
    bApporte: "Lightness, enthusiasm, openness to possibility.",
    conseil: "Define zones of freedom for the 7 and red lines for the 1. Respect them mutually without constant negotiation.",
    contexte: {
      enfant: "Your Type 7 child is a tornado of energy. Give them SHORT, CLEAR rules — long moral explanations lose them.",
      couple: "Lively, stimulating relationship if the 1 learns to let go and the 7 honors their commitments. Never boring.",
      adulte: "The 7 generates ideas, the 1 structures them. Formidable creative duo if roles are clear.",
    },
  },

  '1-8': {
    pointsForts: "Two forces that engage fully. Mutual respect built on direct honesty and decisive action.",
    vigilances: "Two profiles who are right and don't yield. Confrontations can be violent and grudges long-lasting.",
    aApporte: "Integrity, method, sense of justice.",
    bApporte: "Strength, protection, fast decision-making.",
    conseil: "Accept that you can both be right at the same time. Complementarity is possible if ego doesn't take all the room.",
    contexte: {
      enfant: "Your Type 8 child tests your authority. Be firm and consistent — they need to know you hold strong, but with justice, not crushing.",
      couple: "Intense, passionate relationship if you can argue without humiliating each other. Otherwise, an exhausting battle.",
      adulte: "Extraordinarily effective duo on tough subjects. Mutual respect is essential — without it, total break.",
    },
  },

  '1-9': {
    pointsForts: "The 1 brings direction, the 9 brings peace. Together you balance action and harmony.",
    vigilances: "The 1 may find the 9 too slow and conflict-averse. The 9 feels bulldozed by the 1's energy.",
    aApporte: "Drive, purpose, courage to act.",
    bApporte: "Calm, ability to listen, acceptance of what is.",
    conseil: "Type 1: don't push too hard. Type 9: voice your opinion even when it disagrees — your silence isn't approval.",
    contexte: {
      enfant: "Your Type 9 child can fade under your pressure. Give them time to express their own desires, ask their opinion explicitly.",
      couple: "Soothing relationship if the 1 learns to slow down and the 9 dares to assert themselves. Otherwise, pseudo-harmony with hidden resentment.",
      adulte: "The 9 calms the 1, the 1 mobilizes the 9. Beautiful balance for projects needing both energy and patience.",
    },
  },

  // ══════════════════════════════════════════
  //  TYPE 2 — The Helper
  // ══════════════════════════════════════════

  '2-1': {
    pointsForts: "The 2 humanizes the 1. The 1 gives a clear framework to the 2. You round each other out beautifully.",
    vigilances: "The 1 corrects, the 2 absorbs. The 2 may feel rejected by the 1's coldness.",
    aApporte: "Warmth, attention to needs, generosity.",
    bApporte: "Structure, clarity, demanding standards.",
    conseil: "Type 1: notice the 2's gestures of love and acknowledge them. Type 2: don't take the 1's correction as a rejection.",
    contexte: {
      enfant: "Your Type 1 child seeks your acknowledgment of their efforts more than your hugs. Praise their conscientiousness.",
      couple: "The 2 helps the 1 relax. The 1 helps the 2 not get lost in others. Beautiful balance possible.",
      adulte: "Excellent collaboration: the 1 sets the bar, the 2 takes care of the people who keep it.",
    },
  },

  '2-2': {
    pointsForts: "Mutual tenderness, deep emotional connection, shared sense of generosity. You feel truly seen.",
    vigilances: "Risk of emotional fusion. Each abandons their own needs to please the other — and resentment builds in silence.",
    aApporte: "Warmth, attentive presence, listening.",
    bApporte: "The same warmth — and the same trap.",
    conseil: "Practice asking for what you need clearly. Without that, you build a debt of mutual care that becomes impossible to repay.",
    contexte: {
      enfant: "Two Type 2s. Watch out: your child senses your needs and shrinks themselves to take care of them. Show that you don't need to be saved.",
      couple: "Touching tenderness, but watch out for the silent trap: each ignoring themselves to take care of the other. Speak your needs out loud.",
      adulte: "Generous and warm collaboration. Beware that each doesn't carry the other's emotional load to exhaustion.",
    },
  },

  '2-3': {
    pointsForts: "The 2 supports the 3 in the spotlight, the 3 carries the 2 to visibility. Effective and warm public duo.",
    vigilances: "The 2 fades behind the 3. The 3 takes the 2 for granted. Risk of asymmetric relationship over time.",
    aApporte: "Loyal support, attention to the 3's emotions behind the mask.",
    bApporte: "Charisma, decision-making, ability to bring the 2 to the surface.",
    conseil: "Type 3: regularly thank your 2 explicitly. Type 2: claim your share of the visibility — don't disappear behind the 3.",
    contexte: {
      enfant: "Your Type 3 child impresses you, but watch out: they need to know you love them when they fail too, not just when they shine.",
      couple: "Spectacular couple but with one shadow risk. The 2 must dare to exist beyond the support of the 3.",
      adulte: "Formidable professional duo: the 3 leads, the 2 binds the team. Acknowledge both contributions publicly.",
    },
  },

  '2-4': {
    pointsForts: "The 2 wraps emotion with care, the 4 brings depth. Rich emotional relationship, capable of going far.",
    vigilances: "The 4 plunges into intensity, the 2 wants to console. The 4 may experience the 2's caring as intrusive.",
    aApporte: "Warm presence, generosity, ability to console.",
    bApporte: "Emotional depth, authenticity, refusal of polite compromise.",
    conseil: "Type 2: hold the 4's emotional space without trying to solve it. Type 4: receive the 2's care without rejecting it as superficial.",
    contexte: {
      enfant: "Your Type 4 child has dense emotional storms. Don't try to fix — sit with them in the rain. Just being there is enough.",
      couple: "Intense relationship, very emotional. Watch out for emotional roller coasters — set quiet rituals to anchor.",
      adulte: "Beautiful creative collaboration. The 4 creates, the 2 humanizes the project. Both should respect the other's pace.",
    },
  },

  '2-5': {
    pointsForts: "The 2 sees the depth behind the 5's reserve. The 5 appreciates the 2's care that doesn't intrude.",
    vigilances: "The 2 wants closeness, the 5 wants space. The 2 can experience the 5's distance as rejection.",
    aApporte: "Warmth, sensitivity to others' emotions, stable presence.",
    bApporte: "Depth of analysis, respect for autonomy, rare but precious words.",
    conseil: "Type 2: respect the 5's solitude — it's not rejection, it's life. Type 5: share something concrete now and then to nourish the bond.",
    contexte: {
      enfant: "Your Type 5 child needs alone time. Don't take their withdrawal personally — approach them through ideas, not just through cuddles.",
      couple: "Possible relationship if the 2 accepts the 5's silences and the 5 dares to share regularly. Otherwise, mutual incomprehension.",
      adulte: "The 2 humanizes the 5, the 5 deepens the 2. Useful duo if both respect each other's communication mode.",
    },
  },

  '2-6': {
    pointsForts: "Shared loyalty, mutual support, deep mutual care. Solid relationship with steady warmth.",
    vigilances: "The 2's anxiety and the 6's anxiety can amplify each other. The 2 reassures, the 6 absorbs but stays anxious.",
    aApporte: "Constant warmth, ability to console, faithful presence.",
    bApporte: "Loyalty, vigilance, anticipation of needs.",
    conseil: "Cultivate moments of lightness together — humor, play, the unexpected. Without that, the relationship can become heavy with worry.",
    contexte: {
      enfant: "Your Type 6 child needs your reassurance daily. Give it sincerely — don't minimize their fears, take them seriously.",
      couple: "Warm and faithful relationship. Watch out for shared anxiety — keep places of light and joy alive.",
      adulte: "Loyal and reliable collaboration. The 2 nourishes, the 6 anticipates. Excellent duo for community projects.",
    },
  },

  '2-7': {
    pointsForts: "The 2 anchors the 7 in human relationship. The 7 brings joy and lightness to the 2. Vibrant duo.",
    vigilances: "The 7 flees the 2's emotional weight. The 2 can feel left behind by the 7 always already moving on.",
    aApporte: "Steady warmth, attention to subtle emotions, ability to take care.",
    bApporte: "Energy, optimism, joyful escape.",
    conseil: "Type 7: pause sometimes to truly receive the 2's care. Type 2: don't try to retain the 7 — let them come and go freely.",
    contexte: {
      enfant: "Your Type 7 child is in constant motion. Take advantage of pause moments (meals, bedtime) to truly connect — they're rare with them.",
      couple: "Joyful and warm relationship. The 2 must accept that the 7 won't dive into emotional depths often. Respect this temperament.",
      adulte: "Energizing collaboration. The 7 generates ideas, the 2 turns them into people-friendly projects. Beautiful complementarity.",
    },
  },

  '2-8': {
    pointsForts: "The 2 softens the 8, the 8 protects the 2. Emotionally intense relationship built on mutual loyalty.",
    vigilances: "The 8 can dominate, the 2 can self-sacrifice. The 2 may stay in a relationship where the 8 takes too much room.",
    aApporte: "Tenderness, ability to feel emotions, vulnerability.",
    bApporte: "Protection, decisive force, full commitment.",
    conseil: "Type 8: receive the 2's tenderness without minimizing it. Type 2: assert your needs — the 8 respects strength, not effacement.",
    contexte: {
      enfant: "Your Type 8 child tests you with intensity. Stay firm but warm — they need to feel that your authority is held with love.",
      couple: "Powerful, passionate relationship. The 2 must learn to hold their place, the 8 must learn that their force can be tender.",
      adulte: "Remarkable duo: the 8 leads, the 2 maintains team cohesion. The 8 must publicly acknowledge the 2's contribution.",
    },
  },

  '2-9': {
    pointsForts: "Mutual gentleness, ease of relationship, shared search for harmony. Calm and warm relationship.",
    vigilances: "Both avoid conflict. Disagreements stay buried, resentment builds up in silence.",
    aApporte: "Active warmth, attention to others' needs, generosity.",
    bApporte: "Calm, acceptance, ability to listen without judging.",
    conseil: "Schedule regular moments to say what isn't going well. Otherwise, the relationship slowly drifts into politeness without truth.",
    contexte: {
      enfant: "Your Type 9 child agrees with everything to keep peace. Ask their real opinion regularly — give them permission to disagree.",
      couple: "Beautiful and peaceful relationship if you both dare to express your real frustrations. Otherwise, slow distancing.",
      adulte: "Pleasant collaboration. Beware the lack of friction — sometimes a project needs argument, and you'll both avoid it.",
    },
  },

  // ══════════════════════════════════════════
  //  TYPE 3 — The Achiever
  // ══════════════════════════════════════════

  '3-1': {
    pointsForts: "Shared ambition, mutual respect for effort. The 1 inspires the 3 toward integrity, the 3 inspires the 1 toward results.",
    vigilances: "The 3 takes shortcuts the 1 can't tolerate. Conflict over means is inevitable.",
    aApporte: "Performance energy, sense of timing, adaptability.",
    bApporte: "Method, ethics, intransigent quality.",
    conseil: "Type 1: accept the 3's pragmatic shortcuts. Type 3: respect the 1's red lines — they're not negotiable.",
    contexte: {
      enfant: "Your Type 1 child works hard but doubts. Tell them their effort matters — not just the grade.",
      couple: "Effective and ambitious couple. Watch out for the trap of life as a project — keep zones of free play.",
      adulte: "Powerful duo on results-oriented projects with quality requirements. Distribute roles clearly.",
    },
  },

  '3-2': {
    pointsForts: "The 3 shines, the 2 supports. Warm, effective duo where each finds their place.",
    vigilances: "The 3 takes the 2 for granted. The 2 fades while waiting for recognition that doesn't come.",
    aApporte: "Charisma, ability to mobilize, results focus.",
    bApporte: "Loyal support, attention to the 3's emotions hidden behind the mask.",
    conseil: "Type 3: thank the 2 publicly and frequently. Type 2: dare to exist for yourself, not just through your support of the 3.",
    contexte: {
      enfant: "Your Type 2 child loves to please. Show that they're valuable in themselves, not just for what they do for others.",
      couple: "Spectacular couple. The 2 must claim their place in the visibility, the 3 must learn to give credit.",
      adulte: "Excellent professional duo. The 3 leads, the 2 makes it humanly possible. Public acknowledgment essential.",
    },
  },

  '3-3': {
    pointsForts: "Shared performance energy. You understand each other instantly, you both know what \"winning\" means.",
    vigilances: "Constant rivalry. Each tries to one-up the other. Risk of relationship reduced to competitive comparison.",
    aApporte: "Drive, charisma, ability to perform.",
    bApporte: "The same energy — and the same blind spot.",
    conseil: "Define distinct domains where each can excel separately. And dare moments of vulnerability — without them, the relationship stays surface.",
    contexte: {
      enfant: "Two Type 3s in the family means natural rivalry. Make sure they don't compete only against each other — celebrate cooperation.",
      couple: "Power couple seen from outside. Watch out for the lonely race side — connect on something other than results.",
      adulte: "Devastating duo on a common goal — provided egos don't collide. Clarify who decides what.",
    },
  },

  '3-4': {
    pointsForts: "The 3 brings drive, the 4 brings depth. Together you can produce something both authentic and accomplished.",
    vigilances: "The 3 wants to keep moving, the 4 wants to stop and feel. Tension over rhythm and emotional expression.",
    aApporte: "Action, sense of result, social adaptation.",
    bApporte: "Authentic depth, refusal of compromise, creative sensitivity.",
    conseil: "Type 3: pause sometimes to feel — the 4 reminds you it matters. Type 4: appreciate the 3's drive without suspecting their authenticity.",
    contexte: {
      enfant: "Your Type 4 child needs you to acknowledge their depth. Don't push them to be \"like other kids\" — value their difference.",
      couple: "Rich and contrasting relationship. The 3 must learn to hold the 4's emotional space, the 4 to receive the 3's pragmatic care.",
      adulte: "Creative collaboration with strong potential. The 4 imagines, the 3 markets. Roles to clarify.",
    },
  },

  '3-5': {
    pointsForts: "The 3 acts, the 5 thinks. Powerful duo if expertise pairs with execution.",
    vigilances: "The 3 finds the 5 too slow, the 5 finds the 3 too superficial. Misalignment in pace and depth.",
    aApporte: "Action, social ease, decision speed.",
    bApporte: "Deep analysis, expertise, well-considered judgment.",
    conseil: "Type 3: respect the 5's analysis time — they're not slow, they're thorough. Type 5: share your work, even unfinished.",
    contexte: {
      enfant: "Your Type 5 child needs to feel competent before going public. Don't push them to perform if they don't feel ready.",
      couple: "Possible relationship if the 3 slows down and the 5 dares to share. Otherwise, two parallel worlds.",
      adulte: "Excellent duo: the 5 brings expertise, the 3 sells it. Specify each one's role to avoid frustration.",
    },
  },

  '3-6': {
    pointsForts: "The 3 builds confidence in the 6, the 6 anchors the 3 in reality. Beautifully complementary duo.",
    vigilances: "The 6 doubts, the 3 wants to keep moving. The 3 may pressure the 6 who freezes under pressure.",
    aApporte: "Confidence, drive, ability to go for it.",
    bApporte: "Anticipation, loyalty, lucid analysis of risks.",
    conseil: "Type 3: take the 6's fears seriously — they often see the real risks. Type 6: trust the 3's drive, it's also legitimate.",
    contexte: {
      enfant: "Your Type 6 child needs your reassurance and your confidence. Show them they can succeed without it being dangerous.",
      couple: "Stable and dynamic relationship. The 3 must learn to slow down to listen, the 6 to dare to act despite fear.",
      adulte: "Excellent professional duo: the 6 anticipates, the 3 executes. Important balance, especially for risky projects.",
    },
  },

  '3-7': {
    pointsForts: "Shared energy, contagious enthusiasm. Joyful duo capable of moving mountains together.",
    vigilances: "Both avoid emotions. The relationship can stay surface, focused on action and entertainment.",
    aApporte: "Drive, ability to execute, sense of result.",
    bApporte: "Enthusiasm, ideas, optimism, lightness.",
    conseil: "Schedule moments to talk about what you really feel. Without that, your relationship stays a collection of activities.",
    contexte: {
      enfant: "Your Type 7 child has a thousand ideas. Help them finish things, even small ones — that builds true self-confidence.",
      couple: "Vibrant and stimulating couple. Watch out for the avoidance of difficult subjects — face them when they come up.",
      adulte: "Formidable creative duo. The 7 creates, the 3 finishes. Beautiful complementarity if you respect commitments.",
    },
  },

  '3-8': {
    pointsForts: "Two natural leaders. Strong mutual respect built on shared force of action.",
    vigilances: "Power conflicts inevitable. Both want to lead, both refuse to yield.",
    aApporte: "Adaptability, sense of strategy, charisma.",
    bApporte: "Direct force, decision-making, total commitment.",
    conseil: "Define distinct territories. Or accept that one leads on one zone, the other on another. Otherwise, permanent struggle.",
    contexte: {
      enfant: "Your Type 8 child has natural authority. Be firm but fair — they respect strength held with justice.",
      couple: "Intense, passionate, sometimes stormy relationship. Mutual respect is non-negotiable.",
      adulte: "Devastating duo if you ally. Catastrophic if you compete. Choose the field early.",
    },
  },

  '3-9': {
    pointsForts: "The 3 mobilizes the 9, the 9 calms the 3. Beautiful complementarity if both respect each other's pace.",
    vigilances: "The 3 may push the 9 who freezes. The 9 may slow the 3 who fumes.",
    aApporte: "Drive, energy, vision oriented to the future.",
    bApporte: "Calm, ability to listen, harmony.",
    conseil: "Type 3: respect the 9's pace — they're not lazy, they're considering. Type 9: dare to assert what you really want.",
    contexte: {
      enfant: "Your Type 9 child can disappear in your shadow. Ask their opinion regularly, give them space to exist by themselves.",
      couple: "Soothing relationship if the 3 learns to slow down and the 9 dares to assert themselves. Otherwise, hidden frustration on both sides.",
      adulte: "The 9 anchors the 3, the 3 mobilizes the 9. Useful duo for projects needing both energy and patience.",
    },
  },

  // ══════════════════════════════════════════
  //  TYPE 4 — The Individualist
  // ══════════════════════════════════════════

  '4-1': {
    pointsForts: "The 4 brings depth, the 1 brings structure. Together you can create something beautiful and right.",
    vigilances: "The 4 finds the 1 too rigid and emotionally cold. The 1 finds the 4 too dramatic and unstable.",
    aApporte: "Sensitivity, depth, sense of unique beauty.",
    bApporte: "Discipline, principles, anchor in the real.",
    conseil: "Type 4: the 1's structure is a love language, not coldness. Type 1: the 4's emotion is intelligence, not drama.",
    contexte: {
      enfant: "Your Type 1 child is hard on themselves. The 4 in you can feel their inner pain — express it with words to relieve them.",
      couple: "Intense, rich, demanding relationship. Each must accept the other's mode of being without trying to convert them.",
      adulte: "Beautiful artistic or ethical collaboration. The 4 creates, the 1 finalizes. Don't reverse the roles.",
    },
  },

  '4-2': {
    pointsForts: "Profound emotional connection. The 4 feels truly understood, the 2 finds depth they crave.",
    vigilances: "The 2 wants to console, the 4 wants to be heard. The 4 may experience the 2's care as intrusion.",
    aApporte: "Authentic depth, refusal of falsehood, creative sensitivity.",
    bApporte: "Warmth, emotional presence, ability to console.",
    conseil: "Type 2: hold the space without trying to fix. Type 4: receive the 2's care without suspecting it of superficiality.",
    contexte: {
      enfant: "Your Type 2 child is sensitive to others' emotions. Show them their generosity is appreciated and protect them from emotional overload.",
      couple: "Deep emotional relationship. Watch out for waves of intensity — set quiet times to anchor.",
      adulte: "Warm and creative collaboration. The 4 imagines, the 2 humanizes. Beautiful balance.",
    },
  },

  '4-3': {
    pointsForts: "The 4 brings authentic depth, the 3 brings the ability to bring it to the world. Powerful creative duo.",
    vigilances: "The 4 distrusts the 3's surface, the 3 finds the 4 too complicated. Tension between authenticity and effectiveness.",
    aApporte: "Creative depth, refusal of compromise, true sensitivity.",
    bApporte: "Drive, social adaptation, ability to make things visible.",
    conseil: "Type 4: the 3's effectiveness isn't a betrayal of authenticity. Type 3: the 4's depth makes your work matter beyond the trophy.",
    contexte: {
      enfant: "Your Type 3 child wants to be admired. Help them know what is them beneath the mask.",
      couple: "Contrasting relationship with rich potential. Each must respect the other's mode of being — neither is superior.",
      adulte: "Strong creative duo. The 4 imagines deeply, the 3 brings to market. Beautiful complementarity if egos stay aside.",
    },
  },

  '4-4': {
    pointsForts: "Total mutual understanding. You know what feeling it all means without needing to explain.",
    vigilances: "Risk of mutual reinforcement of melancholy. Two 4s together can amplify their sense of difference and isolation.",
    aApporte: "Authentic depth, total emotional resonance.",
    bApporte: "The same depth — and the same trap.",
    conseil: "Build moments of lightness and connection to the outside world. Without that, your relationship can isolate from everything.",
    contexte: {
      enfant: "Two Type 4s. Watch out for emotional fusion — each needs their own space to develop their unique identity.",
      couple: "Deeply intimate relationship. Watch out for mutual amplification of melancholy — keep links to the outside world alive.",
      adulte: "Highly creative duo, but watch out for shared isolation. Bring in third parties to ground.",
    },
  },

  '4-5': {
    pointsForts: "Both have a rich inner world. You respect each other's privacy and silence is not a problem.",
    vigilances: "Both withdraw. The relationship can become parallel, with little active connection.",
    aApporte: "Emotional depth, expressed authenticity, refusal of compromise.",
    bApporte: "Analytical depth, respect for autonomy, deep listening.",
    conseil: "Schedule active connection moments — neither will take the initiative naturally. And dare to share what you keep.",
    contexte: {
      enfant: "Your Type 5 child needs alone time. Respect that — and approach them through ideas more than emotion.",
      couple: "Possible relationship if you respect each other's mode of being. Watch out for the parallel-life trap.",
      adulte: "Rich intellectual collaboration. The 4 imagines, the 5 builds. Excellent duo for deep projects.",
    },
  },

  '4-6': {
    pointsForts: "The 4 brings depth, the 6 brings loyalty. Faithful relationship rich with mutual support.",
    vigilances: "The 6's anxiety can amplify with the 4's intensity. The 6 may exhaust themselves reassuring the 4.",
    aApporte: "Authentic depth, creative sensitivity, refusal of falsehood.",
    bApporte: "Loyalty, anticipation, lucid risk analysis.",
    conseil: "Type 4: don't drag the 6 into your emotional storms. Type 6: don't try to anticipate all the 4's emotional crises.",
    contexte: {
      enfant: "Your Type 6 child needs your reassurance. Be present and stable — your 4 emotion can sometimes destabilize them.",
      couple: "Faithful, intense relationship. Watch out for the trap of mutually amplifying anxiety — cultivate moments of lightness.",
      adulte: "Beautiful collaboration on projects requiring depth and rigor. Beware emotional overload.",
    },
  },

  '4-7': {
    pointsForts: "The 4 plunges, the 7 surfaces. Surprising but very enriching contrast — each shows the other another way of being in the world.",
    vigilances: "The 7 flees the 4's emotions, the 4 distrusts the 7's surface. Tension over depth and lightness.",
    aApporte: "Authentic depth, refusal of compromise, creative sensitivity.",
    bApporte: "Lightness, optimism, energy, openness to the new.",
    conseil: "Type 4: receive the 7's lightness as a gift, not as an absence. Type 7: dare to dive sometimes — depth doesn't bite.",
    contexte: {
      enfant: "Your Type 7 child runs from heaviness. Don't burden them — your 4 emotion can scare them. Find your own anchors.",
      couple: "Contrasting and surprising relationship. The 7 brings air, the 4 brings depth. Mutual respect for differences essential.",
      adulte: "Creative and dynamic duo. The 7 generates ideas, the 4 deepens those that matter. Beautiful complementarity.",
    },
  },

  '4-8': {
    pointsForts: "The 8 protects the 4, the 4 helps the 8 access vulnerability. Rare and precious relationship.",
    vigilances: "The 8 can find the 4 too sensitive, the 4 can feel crushed by the 8's force.",
    aApporte: "Authentic depth, hyperfine sensitivity, refusal of falsehood.",
    bApporte: "Total protection, decisive force, full commitment.",
    conseil: "Type 4: the 8 protects you — receive that. Type 8: the 4 reaches your tenderness — let them.",
    contexte: {
      enfant: "Your Type 8 child seems unbreakable. Don't be fooled — they need your warmth too, even if they don't ask.",
      couple: "Intense, sometimes stormy relationship. The 8 must learn that their force can wound, the 4 that fragility can scare.",
      adulte: "Powerful duo on engaged projects. The 8 protects, the 4 imagines. Pre-define respective territories.",
    },
  },

  '4-9': {
    pointsForts: "The 4 brings emotional depth, the 9 brings calm acceptance. The 4 feels finally accepted as they are.",
    vigilances: "The 9 may withdraw before the 4's emotional intensity. The 4 can feel that the 9 doesn't dive deep enough.",
    aApporte: "Authentic depth, refusal of compromise, creative sensitivity.",
    bApporte: "Calm, total acceptance, ability to listen without judging.",
    conseil: "Type 4: appreciate the 9's calm — it's not indifference, it's a gift. Type 9: dare to react to the 4's emotions.",
    contexte: {
      enfant: "Your Type 9 child accepts your emotional intensity better than others. But protect them too — they can absorb your storms.",
      couple: "Soothing, very stable relationship. Watch out for the 9 effacing themselves before the 4's intensity — invite them to assert themselves.",
      adulte: "Beautiful creative collaboration. The 9 holds the space, the 4 brings imagination. Reliable duo.",
    },
  },

  // ══════════════════════════════════════════
  //  TYPE 5 — The Investigator
  // ══════════════════════════════════════════

  '5-1': {
    pointsForts: "Mutual respect for competence and effort. Calm intellectual relationship, free of unnecessary drama.",
    vigilances: "Both withdraw their emotions. The relationship can become functional, intellectual, with no emotional warmth.",
    aApporte: "Deep analysis, expertise, well-thought-out judgment.",
    bApporte: "Method, ethics, demanding standards.",
    conseil: "Schedule moments of human connection — neither will initiate. Without that, the relationship stays in the head.",
    contexte: {
      enfant: "Your Type 1 child is exacting on themselves. Use your 5 mind to help them see the big picture — they often miss it.",
      couple: "Stable and respectful relationship. Watch out for the parallel-life trap. Cultivate moments of true intimacy.",
      adulte: "Excellent duo on complex projects. Each brings precision in their domain. Beautiful collaboration.",
    },
  },

  '5-2': {
    pointsForts: "The 2 sees the 5's depth, the 5 appreciates the 2's care that doesn't intrude. Intimate relationship without pressure.",
    vigilances: "The 2 wants closeness, the 5 wants space. The 2 can experience the 5's distance as rejection.",
    aApporte: "Deep analysis, autonomy, rare but precious words.",
    bApporte: "Constant warmth, attention to needs, ability to console.",
    conseil: "Type 2: respect the 5's solitude — it's vital, not a rejection. Type 5: regularly express your real attachment, even briefly.",
    contexte: {
      enfant: "Your Type 2 child is sensitive. Express your love verbally — your withdrawn presence can be experienced as a lack.",
      couple: "Possible relationship if the 2 accepts the 5's silences and the 5 dares to share regularly. Beautiful balance to find.",
      adulte: "The 2 humanizes the 5, the 5 deepens the 2. Useful duo if both respect each other's communication mode.",
    },
  },

  '5-3': {
    pointsForts: "The 5 thinks, the 3 acts. Powerful duo if the 5's expertise pairs with the 3's execution.",
    vigilances: "The 3 finds the 5 too slow, the 5 finds the 3 too superficial. Pace mismatch.",
    aApporte: "Deep analysis, expertise, intellectual rigor.",
    bApporte: "Action, sense of timing, ability to bring to market.",
    conseil: "Type 5: share your work, even unfinished. Type 3: respect the 5's analysis time — they're not slow, they're thorough.",
    contexte: {
      enfant: "Your Type 3 child wants to perform. Use your 5 mind to help them see beyond the trophy — your reflection can save them years.",
      couple: "Possible relationship if the 5 dares to engage and the 3 slows down. Otherwise, two parallel worlds.",
      adulte: "Excellent duo: the 5 brings expertise, the 3 sells it. Specify each one's role to avoid frustration.",
    },
  },

  '5-4': {
    pointsForts: "Profound mutual understanding. Each respects the other's inner world. Few words needed to feel close.",
    vigilances: "Both withdraw. The relationship can stay parallel, with little active connection.",
    aApporte: "Analytical depth, respect for autonomy, deep listening.",
    bApporte: "Emotional depth, expressed authenticity, creative sensitivity.",
    conseil: "Schedule active connection moments — neither will take the initiative naturally. And dare to share what you keep.",
    contexte: {
      enfant: "Your Type 4 child has dense emotions. Use your 5 mind to put words on them — that helps them more than you think.",
      couple: "Rich and respectful relationship. Watch out for the parallel-life trap. Build active rituals of connection.",
      adulte: "Rich intellectual collaboration. The 5 builds, the 4 imagines. Excellent duo for deep projects.",
    },
  },

  '5-5': {
    pointsForts: "Mutual instinctive respect. You both know how to coexist in silence and calm.",
    vigilances: "Risk of double isolation. Two 5s together can withdraw entirely from the world.",
    aApporte: "Analytical depth, respect for autonomy, deep listening.",
    bApporte: "The same depth — and the same trap.",
    conseil: "Force yourselves to engage with the world together — outside, with others, in life. Without that, you isolate yourselves perfectly together.",
    contexte: {
      enfant: "Two Type 5s. Watch out for shared isolation — make sure each has external connections too.",
      couple: "Calm, respectful relationship. Watch out for the trap of total withdrawal — keep ties to the outside world alive.",
      adulte: "Highly effective intellectual duo, but watch out for collective disconnection from reality. Bring in third parties to ground.",
    },
  },

  '5-6': {
    pointsForts: "The 5 analyzes, the 6 anticipates. Powerful duo on subjects requiring rigor and lucidity.",
    vigilances: "The 6's anxiety can become an emotional weight the 5 doesn't know how to handle. The 5's silence can feed the 6's anxiety.",
    aApporte: "Deep analysis, capacity to take a step back, well-considered judgment.",
    bApporte: "Loyalty, anticipation, faithful presence.",
    conseil: "Type 5: reassure the 6 with concrete words, even brief ones. Type 6: respect the 5's silence — it isn't disinterest.",
    contexte: {
      enfant: "Your Type 6 child needs reassurance. Use your 5 mind to anticipate their fears and articulate them — that calms them.",
      couple: "Solid and reliable relationship. The 5 must communicate more, the 6 must trust more. Beautiful balance to build.",
      adulte: "Excellent professional duo: the 5 analyzes, the 6 anticipates. Powerful on risky projects.",
    },
  },

  '5-7': {
    pointsForts: "The 5 deepens, the 7 widens. Stimulating contrast that keeps both alert and curious.",
    vigilances: "The 7 finds the 5 too withdrawn, the 5 finds the 7 too dispersed. Pace and rhythm mismatch.",
    aApporte: "Deep analysis, expertise, intellectual rigor.",
    bApporte: "Enthusiasm, ideas, optimism, openness to the new.",
    conseil: "Type 7: let the 5 finish a thought before bringing in the next one. Type 5: appreciate the 7's energy — it nourishes you more than you think.",
    contexte: {
      enfant: "Your Type 7 child is full of energy. Take advantage of pause times to share an idea or two — they need depth too.",
      couple: "Stimulating relationship if the 5 lets themselves be carried sometimes and the 7 accepts to deepen. Vibrant complementarity.",
      adulte: "Rich creative duo. The 7 generates ideas, the 5 selects and deepens those that matter. Beautiful complementarity.",
    },
  },

  '5-8': {
    pointsForts: "The 5 thinks, the 8 acts. Mutual respect possible if the 8 respects the 5's pace.",
    vigilances: "The 8 can experience the 5's withdrawal as cowardice. The 5 can be steamrolled by the 8's force.",
    aApporte: "Deep analysis, expertise, ability to take a step back.",
    bApporte: "Decisive force, full commitment, total protection.",
    conseil: "Type 8: respect the 5's analysis time — they're not slow, they're thorough. Type 5: dare to assert your conclusions, the 8 respects strength.",
    contexte: {
      enfant: "Your Type 8 child can find you too withdrawn. Show your inner strength — they need to feel it to respect you.",
      couple: "Intense relationship if mutual respect is established. Otherwise, the 8 dominates, the 5 withdraws — toxic dynamic.",
      adulte: "Effective duo if territories are clear. The 5 advises, the 8 decides. Mutual respect non-negotiable.",
    },
  },

  '5-9': {
    pointsForts: "Both calm, neither demanding. Tranquil relationship that respects each other's pace and silence.",
    vigilances: "Risk of mutual passivity. Without an external trigger, you may stay together but without depth or evolution.",
    aApporte: "Deep analysis, autonomy, rare but precious words.",
    bApporte: "Calm, ability to listen without judging, total acceptance.",
    conseil: "Build common projects that pull you out of your respective comfort zones. Without that, the relationship stagnates pleasantly.",
    contexte: {
      enfant: "Your Type 9 child is easy. Don't take them for granted — they need your engaged attention, even if they don't ask for it.",
      couple: "Very peaceful relationship. Watch out for the trap of pleasant routine without true intimacy — sometimes shake things up.",
      adulte: "Calm collaboration. Beware lack of friction — sometimes a project needs argument, and you'll both avoid it.",
    },
  },

  // ══════════════════════════════════════════
  //  TYPE 6 — The Loyalist
  // ══════════════════════════════════════════

  '6-1': {
    pointsForts: "Shared reliability, sense of responsibility, strong loyalty. You build something durable together.",
    vigilances: "The 1's standards can amplify the 6's anxiety. The 6 may exhaust themselves trying to live up.",
    aApporte: "Loyalty, anticipation of risks, faithful presence.",
    bApporte: "Moral certainty, clear direction, courage to act.",
    conseil: "Type 1: rassure before correcting. Type 6: trust the 1's intentions — their rigor protects, doesn't oppress.",
    contexte: {
      enfant: "Your Type 1 child is hard on themselves. Bring your 6 anticipation to spot their breaking points before they occur.",
      couple: "Solid and reliable relationship. Watch out for falling into routine out of fear of change — stimulate each other.",
      adulte: "Excellent professional duo: the 6 anticipates, the 1 holds the course. Powerful on rigorous projects.",
    },
  },

  '6-2': {
    pointsForts: "Shared loyalty, mutual care. Solid relationship with steady warmth.",
    vigilances: "The 6's anxiety and the 2's hyper-attention can feed each other. Each absorbs the other's emotions.",
    aApporte: "Loyalty, vigilance, anticipation of needs.",
    bApporte: "Constant warmth, ability to console, faithful presence.",
    conseil: "Cultivate moments of lightness and play — humor, the unexpected. Without that, the relationship can become heavy with worry.",
    contexte: {
      enfant: "Your Type 2 child is hyper-attentive to you. Show that you don't need to be saved — relieve them of this weight.",
      couple: "Warm, faithful, and reassuring relationship. Watch out for shared anxiety — keep places of joy alive.",
      adulte: "Loyal, reliable collaboration. The 6 anticipates, the 2 takes care. Excellent duo for community projects.",
    },
  },

  '6-3': {
    pointsForts: "The 6 anchors the 3 in reality, the 3 builds confidence in the 6. Beautifully complementary duo.",
    vigilances: "The 3 finds the 6 too slow and anxious. The 6 finds the 3 too rushed and superficial.",
    aApporte: "Anticipation, loyalty, lucid analysis of risks.",
    bApporte: "Confidence, drive, ability to go for it.",
    conseil: "Type 3: take the 6's fears seriously — they often see the real risks. Type 6: trust the 3's drive, it's also legitimate.",
    contexte: {
      enfant: "Your Type 3 child wants to shine. Use your 6 vigilance to spot their breaking points — they often hide their fatigue.",
      couple: "Stable and dynamic relationship. The 3 must learn to slow down to listen, the 6 to dare act despite fear.",
      adulte: "Excellent duo: the 6 anticipates, the 3 executes. Important balance, especially for risky projects.",
    },
  },

  '6-4': {
    pointsForts: "The 6 brings loyalty, the 4 brings depth. Faithful relationship rich in mutual support.",
    vigilances: "The 4's emotional intensity can amplify the 6's anxiety. The 6 may exhaust themselves reassuring the 4.",
    aApporte: "Loyalty, anticipation, lucid risk analysis.",
    bApporte: "Authentic depth, creative sensitivity, refusal of falsehood.",
    conseil: "Type 6: don't try to anticipate all the 4's emotional crises. Type 4: don't drag the 6 into your emotional storms.",
    contexte: {
      enfant: "Your Type 4 child has dense emotions. Use your 6 vigilance to spot their distress — but don't absorb everything yourself.",
      couple: "Faithful, intense relationship. Watch out for the trap of mutually amplifying anxiety — cultivate moments of lightness.",
      adulte: "Beautiful collaboration on projects requiring depth and rigor. Beware emotional overload.",
    },
  },

  '6-5': {
    pointsForts: "The 6 anticipates, the 5 analyzes. Powerful duo on subjects requiring rigor and lucidity.",
    vigilances: "The 5's silence can feed the 6's anxiety. The 6 may exhaust themselves seeking reassurance the 5 doesn't give.",
    aApporte: "Loyalty, anticipation, faithful presence.",
    bApporte: "Deep analysis, ability to take a step back, well-considered judgment.",
    conseil: "Type 6: respect the 5's silence — it isn't disinterest. Type 5: reassure the 6 with concrete words, even brief ones.",
    contexte: {
      enfant: "Your Type 5 child needs space. Don't try to anticipate everything — sometimes their isolation is just rest.",
      couple: "Solid and reliable relationship. The 5 must communicate more, the 6 must trust more. Beautiful balance to build.",
      adulte: "Excellent professional duo: the 5 analyzes, the 6 anticipates. Powerful on risky projects.",
    },
  },

  '6-6': {
    pointsForts: "Total mutual understanding. You know each other's fears without explaining. Solidarity in vigilance.",
    vigilances: "Risk of mutual reinforcement of anxiety. Two 6s together can spiral into shared catastrophizing.",
    aApporte: "Loyalty, vigilance, faithful presence.",
    bApporte: "The same vigilance — and the same trap.",
    conseil: "Cultivate joy and trust together. Without that, your shared vigilance becomes mutual exhausting hyper-anxiety.",
    contexte: {
      enfant: "Two Type 6s. Watch out for shared anxiety amplification — model trust and confidence regularly.",
      couple: "Loyal, very reliable relationship. Watch out for hyper-anxiety as a couple — cultivate moments of lightness and joy.",
      adulte: "Useful duo on projects requiring strong anticipation. Beware collective paralysis through over-caution.",
    },
  },

  '6-7': {
    pointsForts: "The 7 brings lightness to the 6's vigilance. The 6 anchors the 7's enthusiasm in reality. Beautiful complementarity.",
    vigilances: "The 7 finds the 6 too anxious. The 6 finds the 7 too irresponsible. Tension over risk and prudence.",
    aApporte: "Anticipation, loyalty, lucid risk analysis.",
    bApporte: "Enthusiasm, optimism, ability to fly above worries.",
    conseil: "Type 6: receive the 7's optimism as a gift, not as denial. Type 7: take the 6's fears seriously — they often see what you ignore.",
    contexte: {
      enfant: "Your Type 7 child is full of enthusiasm. Use your 6 vigilance without dampening their joy — both are valuable.",
      couple: "Lively and reassuring relationship. The 7 must take the 6's fears seriously, the 6 must trust the 7's enthusiasm.",
      adulte: "Stimulating duo: the 7 generates, the 6 anticipates risks. Powerful complementarity.",
    },
  },

  '6-8': {
    pointsForts: "The 6 trusts the 8's protection. The 8 appreciates the 6's loyalty. Strong relationship once trust is established.",
    vigilances: "The 8 can experience the 6's anxiety as cowardice. The 6 can feel crushed by the 8's force.",
    aApporte: "Loyalty, vigilance, faithful presence.",
    bApporte: "Total protection, decisive force, full commitment.",
    conseil: "Type 8: take the 6's fears seriously — they're not weakness, they're lucidity. Type 6: trust the 8's protection.",
    contexte: {
      enfant: "Your Type 8 child seems unbreakable. Don't be fooled — your 6 anticipation can spot their hidden vulnerabilities.",
      couple: "Strong relationship once mutual trust is established. The 8 must learn to reassure, the 6 to trust.",
      adulte: "Powerful duo: the 6 anticipates, the 8 acts. Mutual respect for fears and forces non-negotiable.",
    },
  },

  '6-9': {
    pointsForts: "The 6's vigilance combines with the 9's calm. Reassuring relationship for both.",
    vigilances: "The 9 may withdraw before the 6's anxiety. The 6 can feel that the 9 doesn't take their concerns seriously.",
    aApporte: "Loyalty, anticipation, faithful presence.",
    bApporte: "Calm, ability to listen without judging, total acceptance.",
    conseil: "Type 6: receive the 9's calm as a gift, not as carelessness. Type 9: take the 6's worries seriously — they often see real things.",
    contexte: {
      enfant: "Your Type 9 child accepts your anxiety better than others. But protect them too — they can absorb your worries.",
      couple: "Soothing, very stable relationship. Watch out for the 9 effacing themselves before the 6's vigilance — invite them to assert themselves.",
      adulte: "Reliable collaboration. The 9 holds the space, the 6 anticipates. Powerful duo on long-term projects.",
    },
  },

  // ══════════════════════════════════════════
  //  TYPE 7 — The Enthusiast
  // ══════════════════════════════════════════

  '7-1': {
    pointsForts: "The 1 grounds the 7, the 7 unstiffens the 1. Powerful complementarity if each accepts the other.",
    vigilances: "The 7 finds the 1 boring and moralistic. The 1 finds the 7 irresponsible and superficial.",
    aApporte: "Lightness, enthusiasm, openness to the possible.",
    bApporte: "Reliability, follow-through, sense of commitment.",
    conseil: "Type 7: honor your commitments — that's what builds the 1's trust. Type 1: accept the 7's joyful chaos, it brings life.",
    contexte: {
      enfant: "Your Type 1 child takes themselves too seriously. Use your 7 lightness to remind them play and joy matter.",
      couple: "Lively and stimulating relationship if the 1 learns to let go and the 7 honors commitments. Never boring.",
      adulte: "Formidable creative duo. The 7 generates ideas, the 1 structures them. Beautiful complementarity if roles are clear.",
    },
  },

  '7-2': {
    pointsForts: "The 7 brings lightness, the 2 brings warmth. Joyful, generous duo. Solar relationship.",
    vigilances: "The 7 flees the 2's emotional weight. The 2 can feel left behind by the 7 always already moving on.",
    aApporte: "Energy, optimism, joyful escape.",
    bApporte: "Steady warmth, attention to subtle emotions, ability to console.",
    conseil: "Type 7: pause sometimes to truly receive the 2's care. Type 2: let the 7 come and go — that's their freedom.",
    contexte: {
      enfant: "Your Type 2 child is sensitive. Use your 7 joy to nourish them — but pause sometimes to receive their care.",
      couple: "Joyful, warm relationship. The 2 must accept that the 7 won't dive into emotional depths often. Respect this temperament.",
      adulte: "Energizing collaboration. The 7 generates, the 2 turns into people-friendly projects. Beautiful complementarity.",
    },
  },

  '7-3': {
    pointsForts: "Shared energy, ambition, ability to make things happen. Action and result duo.",
    vigilances: "Both avoid emotions. The relationship stays surface, focused on action and entertainment.",
    aApporte: "Enthusiasm, ideas, optimism.",
    bApporte: "Drive, ability to execute, charisma.",
    conseil: "Schedule moments to talk about what you really feel. Without that, your relationship stays a collection of activities.",
    contexte: {
      enfant: "Your Type 3 child wants to perform. Use your 7 lightness to remind them success isn't everything.",
      couple: "Vibrant, stimulating couple. Watch out for the avoidance of difficult subjects — face them when they come up.",
      adulte: "Formidable creative duo. The 7 creates, the 3 finishes. Beautiful complementarity if you respect commitments.",
    },
  },

  '7-4': {
    pointsForts: "The 7 surfaces, the 4 plunges. Surprising contrast where each shows the other another way.",
    vigilances: "The 7 flees the 4's emotions, the 4 distrusts the 7's surface.",
    aApporte: "Lightness, optimism, energy, openness to the new.",
    bApporte: "Authentic depth, refusal of compromise, creative sensitivity.",
    conseil: "Type 7: dare to dive sometimes — depth doesn't bite. Type 4: receive the 7's lightness as a gift, not as an absence.",
    contexte: {
      enfant: "Your Type 4 child has dense emotions. Don't let your 7 lightness make them feel they're \"too much.\"",
      couple: "Contrasting, surprising relationship. The 7 brings air, the 4 brings depth. Mutual respect for differences essential.",
      adulte: "Creative, dynamic duo. The 7 generates ideas, the 4 deepens those that matter. Beautiful complementarity.",
    },
  },

  '7-5': {
    pointsForts: "The 7 widens, the 5 deepens. Stimulating contrast that keeps both alert and curious.",
    vigilances: "The 7 finds the 5 too withdrawn, the 5 finds the 7 too dispersed.",
    aApporte: "Enthusiasm, ideas, optimism, openness to the new.",
    bApporte: "Deep analysis, expertise, intellectual rigor.",
    conseil: "Type 7: let the 5 finish a thought before bringing in the next. Type 5: appreciate the 7's energy.",
    contexte: {
      enfant: "Your Type 5 child needs space. Don't overwhelm them with your enthusiasm — respect their pace and silences.",
      couple: "Stimulating relationship if the 5 lets themselves be carried sometimes and the 7 accepts to deepen.",
      adulte: "Rich creative duo. The 7 generates ideas, the 5 selects and deepens those that matter.",
    },
  },

  '7-6': {
    pointsForts: "The 7 reassures the 6 with their lightness. The 6 anchors the 7's enthusiasm in reality. Beautiful complementarity.",
    vigilances: "The 6 finds the 7 too irresponsible. The 7 finds the 6 too anxious.",
    aApporte: "Enthusiasm, optimism, ability to fly above worries.",
    bApporte: "Anticipation, loyalty, lucid risk analysis.",
    conseil: "Type 7: take the 6's fears seriously — they often see what you ignore. Type 6: receive the 7's optimism as a gift.",
    contexte: {
      enfant: "Your Type 6 child needs reassurance. Use your 7 lightness without minimizing their fears — both have their place.",
      couple: "Lively, reassuring relationship. The 7 must take the 6's fears seriously, the 6 must trust the 7's enthusiasm.",
      adulte: "Stimulating duo: the 7 generates, the 6 anticipates risks. Powerful complementarity.",
    },
  },

  '7-7': {
    pointsForts: "Contagious shared energy, debordant creativity. Joyful, vibrant relationship that pulls others up.",
    vigilances: "Risk of dispersion. Two 7s together can multiply projects without ever finishing one. Avoidance of difficulties amplified.",
    aApporte: "Enthusiasm, ideas, optimism, openness to the new.",
    bApporte: "The same energy — and the same trap.",
    conseil: "Help each other finish what you start. Without that, your relationship is a fireworks of unfinished projects.",
    contexte: {
      enfant: "Two Type 7s. Watch out for collective dispersion — help them finish a project together to build true self-confidence.",
      couple: "Vibrant and joyful relationship. Watch out for dispersion and avoidance of emotions — face them when they come up.",
      adulte: "Highly creative duo. Watch out for collective dispersion — set a discipline of completion.",
    },
  },

  '7-8': {
    pointsForts: "Two profiles who love action and challenge. Intense, vibrant, loyal relationship.",
    vigilances: "The 8 can dominate the 7. The 7 can flee when the 8 becomes too intense.",
    aApporte: "Enthusiasm, ideas, openness to the new.",
    bApporte: "Decisive force, full commitment, total protection.",
    conseil: "Type 8: respect the 7's freedom — confining them makes them flee. Type 7: appreciate the 8's force, it protects you.",
    contexte: {
      enfant: "Your Type 8 child is intense. Use your 7 lightness to soothe their tensions — but maintain your firmness.",
      couple: "Passionate relationship. The 8 must learn that their force can scare, the 7 must dare to assert themselves.",
      adulte: "Devastating duo on action projects. The 7 generates, the 8 executes. Mutual respect non-negotiable.",
    },
  },

  '7-9': {
    pointsForts: "The 7 stimulates the 9, the 9 calms the 7. Beautiful natural balance.",
    vigilances: "The 9 may withdraw before the 7's permanent energy. The 7 may not see the 9's withdrawal.",
    aApporte: "Enthusiasm, ideas, contagious optimism.",
    bApporte: "Calm, ability to listen, total acceptance.",
    conseil: "Type 7: respect the 9's pace — they're not slow, they're considering. Type 9: dare to express your real desires.",
    contexte: {
      enfant: "Your Type 9 child can disappear in your energy. Ask their opinion regularly, give them space to exist.",
      couple: "Joyful, peaceful relationship. The 9 must dare to assert themselves, the 7 must respect their pace.",
      adulte: "Pleasant collaboration. The 7 generates, the 9 holds. Beautiful complementarity if commitments are kept.",
    },
  },

  // ══════════════════════════════════════════
  //  TYPE 8 — The Challenger
  // ══════════════════════════════════════════

  '8-1': {
    pointsForts: "Two forces that engage fully. Mutual respect built on direct honesty and decisive action.",
    vigilances: "Two profiles who are right and don't yield. Confrontations can be violent.",
    aApporte: "Decisive force, full commitment, total protection.",
    bApporte: "Integrity, method, sense of justice.",
    conseil: "Accept that you can both be right at the same time. Complementarity is possible if ego doesn't take all the room.",
    contexte: {
      enfant: "Your Type 1 child is hard on themselves. Use your 8 force to protect them from their own internal violence.",
      couple: "Intense relationship if you can argue without humiliating each other. Otherwise exhausting struggle.",
      adulte: "Extraordinarily effective duo on tough subjects. Mutual respect essential — without it, total break.",
    },
  },

  '8-2': {
    pointsForts: "The 8 protects the 2, the 2 softens the 8. Emotionally intense relationship built on mutual loyalty.",
    vigilances: "The 8 can dominate, the 2 can self-sacrifice. The 2 may stay where the 8 takes too much room.",
    aApporte: "Protection, decisive force, full commitment.",
    bApporte: "Tenderness, ability to feel emotions, vulnerability.",
    conseil: "Type 8: receive the 2's tenderness without minimizing it. Type 2: assert your needs — the 8 respects strength.",
    contexte: {
      enfant: "Your Type 2 child is sensitive. Use your 8 force to protect them — but watch out for crushing them with your energy.",
      couple: "Powerful, passionate relationship. The 2 must learn to hold their place, the 8 to learn that their force can be tender.",
      adulte: "Remarkable duo: the 8 leads, the 2 maintains team cohesion. The 8 must publicly acknowledge the 2's contribution.",
    },
  },

  '8-3': {
    pointsForts: "Two natural leaders. Strong mutual respect built on shared force of action.",
    vigilances: "Power conflicts inevitable. Both want to lead, both refuse to yield.",
    aApporte: "Direct force, decision-making, total commitment.",
    bApporte: "Adaptability, sense of strategy, charisma.",
    conseil: "Define distinct territories. Or accept that one leads on one zone, the other on another. Otherwise, permanent struggle.",
    contexte: {
      enfant: "Your Type 3 child wants to perform. Use your 8 force to protect them from exhaustion — they can run beyond their limits.",
      couple: "Power couple. Mutual respect non-negotiable. Watch out for permanent rivalry over visibility.",
      adulte: "Devastating duo if you ally. Catastrophic if you compete. Choose the field early.",
    },
  },

  '8-4': {
    pointsForts: "The 8 protects the 4, the 4 helps the 8 access vulnerability. Rare, precious relationship.",
    vigilances: "The 8 can find the 4 too sensitive. The 4 can feel crushed by the 8's force.",
    aApporte: "Total protection, decisive force, full commitment.",
    bApporte: "Authentic depth, hyperfine sensitivity, refusal of falsehood.",
    conseil: "Type 8: the 4 reaches your tenderness — let them. Type 4: the 8 protects you — receive that.",
    contexte: {
      enfant: "Your Type 4 child has dense emotions. Use your 8 force to anchor them, but receive their sensitivity without judging.",
      couple: "Intense, sometimes stormy relationship. The 8 must learn that their force can wound, the 4 that fragility can scare.",
      adulte: "Powerful duo on engaged projects. The 8 protects, the 4 imagines. Pre-define respective territories.",
    },
  },

  '8-5': {
    pointsForts: "The 8 acts, the 5 thinks. Mutual respect possible if the 8 respects the 5's pace.",
    vigilances: "The 8 can experience the 5's withdrawal as cowardice. The 5 can be steamrolled by the 8's force.",
    aApporte: "Decisive force, full commitment, total protection.",
    bApporte: "Deep analysis, expertise, ability to take a step back.",
    conseil: "Type 8: respect the 5's analysis time — they're not slow, they're thorough. Type 5: dare to assert your conclusions.",
    contexte: {
      enfant: "Your Type 5 child needs space. Don't experience their withdrawal as a challenge — it's their way of recharging.",
      couple: "Intense relationship if mutual respect is established. Otherwise, the 8 dominates, the 5 withdraws — toxic dynamic.",
      adulte: "Effective duo if territories are clear. The 5 advises, the 8 decides. Mutual respect non-negotiable.",
    },
  },

  '8-6': {
    pointsForts: "The 8 protects the 6, the 6 is loyally devoted to the 8. Strong relationship once trust is established.",
    vigilances: "The 8 can experience the 6's anxiety as cowardice. The 6 can feel crushed by the 8's force.",
    aApporte: "Total protection, decisive force, full commitment.",
    bApporte: "Loyalty, vigilance, faithful presence.",
    conseil: "Type 8: take the 6's fears seriously — they're not weakness, they're lucidity. Type 6: trust the 8's protection.",
    contexte: {
      enfant: "Your Type 6 child needs reassurance. Use your 8 force as a shelter — they need to feel you protect them.",
      couple: "Strong relationship once mutual trust is established. The 8 must learn to reassure, the 6 to trust.",
      adulte: "Powerful duo: the 6 anticipates, the 8 acts. Mutual respect for fears and forces non-negotiable.",
    },
  },

  '8-7': {
    pointsForts: "Two profiles who love action and challenge. Intense, vibrant, loyal relationship.",
    vigilances: "The 8 can dominate the 7. The 7 can flee when the 8 becomes too intense.",
    aApporte: "Decisive force, full commitment, total protection.",
    bApporte: "Enthusiasm, ideas, openness to the new.",
    conseil: "Type 8: respect the 7's freedom — confining them makes them flee. Type 7: appreciate the 8's force, it protects you.",
    contexte: {
      enfant: "Your Type 7 child runs from heaviness. Use your 8 force without crushing their joy — both have their place.",
      couple: "Passionate relationship. The 8 must learn that their force can scare, the 7 must dare to assert themselves.",
      adulte: "Devastating duo on action projects. The 7 generates, the 8 executes. Mutual respect non-negotiable.",
    },
  },

  '8-8': {
    pointsForts: "Total mutual understanding of force and challenge. Power-couple instinctive respect.",
    vigilances: "Risk of permanent power struggle. Two 8s together can become impossible to live with — for them and for everyone.",
    aApporte: "Decisive force, full commitment, total protection.",
    bApporte: "The same force — and the same trap.",
    conseil: "Define distinct territories from the start. Without that, your relationship is a permanent battle, exhausting for everyone.",
    contexte: {
      enfant: "Two Type 8s. Watch out for permanent power struggle — define territories early and stick to them firmly.",
      couple: "Passionate, intense relationship. Mutual respect or permanent battle. No middle ground.",
      adulte: "Devastating duo if you ally. Catastrophic if you compete. Choose the field early.",
    },
  },

  '8-9': {
    pointsForts: "The 8 brings drive, the 9 brings calm. Beautiful complementarity if the 8 doesn't crush the 9.",
    vigilances: "The 9 may withdraw before the 8's force. The 8 can experience the 9's calm as passivity.",
    aApporte: "Decisive force, full commitment, total protection.",
    bApporte: "Calm, ability to listen, total acceptance.",
    conseil: "Type 8: respect the 9's pace — they're not slow, they're considering. Type 9: dare to assert what you really want.",
    contexte: {
      enfant: "Your Type 9 child can disappear in your shadow. Ask their opinion regularly, give them space to exist.",
      couple: "Strong relationship if the 8 learns to slow down and the 9 dares to assert themselves. Otherwise, power asymmetry.",
      adulte: "Useful duo: the 9 calms the 8, the 8 mobilizes the 9. Beautiful complementarity if mutual respect is established.",
    },
  },

  // ══════════════════════════════════════════
  //  TYPE 9 — The Peacemaker
  // ══════════════════════════════════════════

  '9-1': {
    pointsForts: "The 9 brings peace, the 1 brings direction. Stable, balanced relationship.",
    vigilances: "The 1's pressure can make the 9 disappear. The 9's slowness can frustrate the 1.",
    aApporte: "Calm, ability to listen, total acceptance.",
    bApporte: "Drive, sense of duty, courage to act.",
    conseil: "Type 1: respect the 9's pace — they're not slow, they're considering. Type 9: dare to express your opinion.",
    contexte: {
      enfant: "Your Type 1 child is hard on themselves. Use your 9 calm to soothe their inner pressure.",
      couple: "Stable, peaceful relationship if the 1 learns to slow down and the 9 dares to assert themselves.",
      adulte: "Beautiful collaboration: the 9 holds the space, the 1 keeps the course. Powerful duo on long-term projects.",
    },
  },

  '9-2': {
    pointsForts: "Mutual gentleness, ease of relationship, shared search for harmony. Calm, warm relationship.",
    vigilances: "Both avoid conflict. Disagreements stay buried, resentment builds in silence.",
    aApporte: "Calm, acceptance, ability to listen without judging.",
    bApporte: "Active warmth, attention to needs of others, generosity.",
    conseil: "Schedule regular moments to say what isn't going well. Otherwise, the relationship slowly drifts into politeness without truth.",
    contexte: {
      enfant: "Your Type 2 child is sensitive to others' emotions. Use your 9 calm to relieve them of this weight.",
      couple: "Beautiful, peaceful relationship if you both dare to express your real frustrations.",
      adulte: "Pleasant collaboration. Beware lack of friction — sometimes a project needs argument, and you'll both avoid it.",
    },
  },

  '9-3': {
    pointsForts: "The 9 calms the 3, the 3 mobilizes the 9. Beautiful natural balance.",
    vigilances: "The 3 can experience the 9 as too slow. The 9 can feel crushed by the 3's drive.",
    aApporte: "Calm, ability to listen, harmony.",
    bApporte: "Drive, energy, vision oriented to the future.",
    conseil: "Type 3: respect the 9's pace — they're not lazy, they're considering. Type 9: dare to assert your real desires.",
    contexte: {
      enfant: "Your Type 3 child wants to perform. Use your 9 calm to relieve them of pressure — they can run beyond their limits.",
      couple: "Stable relationship if the 3 learns to slow down and the 9 dares to assert themselves.",
      adulte: "Useful duo: the 9 anchors the 3, the 3 mobilizes the 9. Beautiful complementarity.",
    },
  },

  '9-4': {
    pointsForts: "The 9 accepts the 4 as they are, the 4 brings depth. Soothing relationship for the 4 who feels finally accepted.",
    vigilances: "The 9 may withdraw before the 4's emotional intensity. The 4 can feel that the 9 doesn't dive deep enough.",
    aApporte: "Calm, total acceptance, ability to listen without judging.",
    bApporte: "Authentic depth, refusal of compromise, creative sensitivity.",
    conseil: "Type 9: dare to react to the 4's emotions — they need it. Type 4: appreciate the 9's calm, it's a gift.",
    contexte: {
      enfant: "Your Type 4 child has dense emotions. Use your 9 acceptance to anchor them — but assert yourself when needed.",
      couple: "Soothing, very stable relationship. Watch out for the 9 effacing themselves before the 4's intensity.",
      adulte: "Beautiful creative collaboration. The 9 holds the space, the 4 brings imagination. Reliable duo.",
    },
  },

  '9-5': {
    pointsForts: "Both calm, neither demanding. Tranquil relationship that respects each other's pace and silence.",
    vigilances: "Risk of mutual passivity. Without an external trigger, you may stay together but without depth.",
    aApporte: "Calm, ability to listen without judging, total acceptance.",
    bApporte: "Deep analysis, autonomy, rare but precious words.",
    conseil: "Build common projects that pull you out of your respective comfort zones. Without that, the relationship stagnates pleasantly.",
    contexte: {
      enfant: "Your Type 5 child needs space. Use your 9 calm to respect their pace — but engage actively when needed.",
      couple: "Very peaceful relationship. Watch out for the trap of pleasant routine without true intimacy — sometimes shake things up.",
      adulte: "Calm collaboration. Beware lack of friction — sometimes a project needs argument, and you'll both avoid it.",
    },
  },

  '9-6': {
    pointsForts: "The 9's calm combines with the 6's vigilance. Reassuring relationship for both.",
    vigilances: "The 9 may not take the 6's worries seriously. The 6 can find that the 9 doesn't anticipate enough.",
    aApporte: "Calm, ability to listen without judging, total acceptance.",
    bApporte: "Loyalty, anticipation, faithful presence.",
    conseil: "Type 9: take the 6's worries seriously — they often see real things. Type 6: receive the 9's calm as a gift.",
    contexte: {
      enfant: "Your Type 6 child needs reassurance. Use your 9 calm to anchor them — but take their fears seriously.",
      couple: "Soothing, very stable relationship. The 9 must dare to engage, the 6 must trust the 9's calm.",
      adulte: "Reliable collaboration. The 9 holds the space, the 6 anticipates. Powerful duo on long-term projects.",
    },
  },

  '9-7': {
    pointsForts: "The 9 calms the 7, the 7 stimulates the 9. Beautiful natural balance.",
    vigilances: "The 9 may withdraw before the 7's permanent energy. The 7 may not see the 9's withdrawal.",
    aApporte: "Calm, ability to listen, total acceptance.",
    bApporte: "Enthusiasm, ideas, contagious optimism.",
    conseil: "Type 9: dare to express your real desires. Type 7: respect the 9's pace — they're not slow, they're considering.",
    contexte: {
      enfant: "Your Type 7 child runs from heaviness. Use your 9 calm to relieve them of pressure — they need it too.",
      couple: "Joyful, peaceful relationship. The 9 must dare to assert themselves, the 7 must respect their pace.",
      adulte: "Pleasant collaboration. The 7 generates, the 9 holds. Beautiful complementarity if commitments are kept.",
    },
  },

  '9-8': {
    pointsForts: "The 9 softens the 8, the 8 helps the 9 to assert themselves. Beautiful complementarity if mutual respect.",
    vigilances: "The 8 can crush the 9. The 9 can disappear before the 8's force.",
    aApporte: "Calm, ability to listen, total acceptance.",
    bApporte: "Decisive force, full commitment, total protection.",
    conseil: "Type 8: respect the 9's pace — they're not slow, they're considering. Type 9: dare to assert what you really want.",
    contexte: {
      enfant: "Your Type 8 child is intense. Use your 9 calm to soothe their tensions — but maintain your firmness.",
      couple: "Strong relationship if the 8 learns to slow down and the 9 dares to assert themselves.",
      adulte: "Useful duo: the 9 calms the 8, the 8 mobilizes the 9. Beautiful complementarity if mutual respect.",
    },
  },

  '9-9': {
    pointsForts: "Total mutual peace, ease of cohabitation. You instantly understand the value of silence and calm.",
    vigilances: "Risk of complete passivity. Two 9s together can become totally inactive — pleasant but without progress.",
    aApporte: "Calm, ability to listen, total acceptance.",
    bApporte: "The same calm — and the same trap.",
    conseil: "Build common projects with deadlines. Without that, your relationship floats in a permanent now without future.",
    contexte: {
      enfant: "Two Type 9s. Watch out for collective passivity — model action and the assertion of desires regularly.",
      couple: "Very peaceful relationship. Watch out for the trap of total passivity — set common projects with clear deadlines.",
      adulte: "Calm collaboration. Beware total lack of friction — schedule moments of debate, even artificial.",
    },
  },
};

// ═══════════════════════════════════════════════════════════════
//  PEER-PEER CONTEXT (kid-kid or teen-teen)
// ═══════════════════════════════════════════════════════════════

export const DUO_PAIRS_CONTEXT_EN: Record<string, string> = {
  // ── Type 1 ──
  '1-1': "Two perfectionists: they understand each other instinctively but risk mutually criticizing each other. Value their cooperation rather than competition.",
  '1-2': "The 1 sets rules, the 2 wants to please and belong. Beautiful friendship if the 1 doesn't criticize too much and the 2 doesn't fade to be accepted.",
  '1-3': "Ambitious, effective duo. They stimulate each other but can quickly compete — help them celebrate each other's success.",
  '1-4': "The 1 finds the 4 too emotional, the 4 finds the 1 too rigid. Surprising but enriching friendship if you help them see their differences as a strength.",
  '1-5': "Serious intellectual friendship. Two profiles that respect competence — they can spend hours building or debating together.",
  '1-6': "Solid, loyal friendship. The 6 brings fidelity, the 1 brings rigor — they trust each other and form a very stable duo.",
  '1-7': "The 7 teases the 1 with their joyful chaos, the 1 structures the 7. Lively friendship if you set them on a creative project with short rules.",
  '1-8': "Two strong personalities: either a great friendship built on mutual respect, or a permanent power struggle. Help them find common ground.",
  '1-9': "Peaceful, reliable friendship. The 9 accepts the 1's rules, the 1 appreciates the 9's gentleness. Very stable duo.",

  // ── Type 2 ──
  '2-1': "The 2 tries to take care of the 1 who prefers to manage alone. Beautiful friendship if the 2 respects the 1's autonomy.",
  '2-2': "Very tight, very warm friendship. Watch out for emotional dependence — encourage them to have other friends too.",
  '2-3': "The 2 admires the 3 and encourages them. The 3 appreciates this support. Smooth friendship if the 3 doesn't take the 2 for granted.",
  '2-4': "The 2 wants to console the 4, the 4 wants to be deeply understood. Beautiful emotional friendship if the 2 learns to listen without trying to solve.",
  '2-5': "The 2 wants closeness, the 5 wants space. Friendship possible if the 2 respects the 5's solitude zones.",
  '2-6': "Very loyal, reassuring friendship. They support each other in difficult moments with deep trust.",
  '2-7': "Joyful, generous friendship. The 7 carries the 2 into their adventures, the 2 takes care of the 7. Very popular duo.",
  '2-8': "The 2 softens the 8, the 8 protects the 2. Intense friendship built on loyalty.",
  '2-9': "Gentle, harmonious friendship. Two profiles who avoid conflict — make sure they also express themselves when something isn't right.",

  // ── Type 3 ──
  '3-1': "The 3 pushes the 1 toward performance, the 1 reminds the 3 about integrity. Stimulating friendship if both accept being challenged.",
  '3-2': "The 3 enjoys the 2's support, the 2 shines in the 3's shadow. Friendship to watch so the 2 doesn't forget themselves.",
  '3-3': "Energy and success duo. Rivalry can quickly set in — help them cooperate rather than compare.",
  '3-4': "The 3 charges ahead, the 4 feels. Surprising friendship: the 4 helps the 3 connect to themselves, the 3 helps the 4 take action.",
  '3-5': "The 3 acts, the 5 analyzes. Complementary duo if the 3 doesn't short-circuit the 5's reflection and the 5 accepts to launch.",
  '3-6': "The 3 builds confidence in the 6, the 6 reminds the 3 not to charge in headfirst. Well-balanced friendship.",
  '3-7': "Energy, enthusiasm, projects! Two profiles that avoid emotional depth — help them also talk about what they feel.",
  '3-8': "Two natural leaders. They respect each other if neither tries to dominate. Powerful, loyal friendship.",
  '3-9': "The 3 energizes the 9, the 9 calms the 3. Beautiful complementarity if the 3 leaves space for the 9.",

  // ── Type 4 ──
  '4-1': "The 4 finds the 1 too rigid, the 1 finds the 4 too dramatic. Their shared ideal can unite them in creative or engaged projects.",
  '4-2': "Emotionally intense, deep friendship. The 2 supports the 4, the 4 helps the 2 connect to their own emotions.",
  '4-3': "The 4 aspires to authenticity, the 3 to performance. Possible tension, but each can learn much from the other.",
  '4-4': "Very deep but potentially melancholic friendship. Encourage light activities — two 4s together can lock into intensity.",
  '4-5': "Introverted, intellectually rich duo. They understand each other without explaining and respect each other's need for space.",
  '4-6': "The 4 brings depth, the 6 brings loyalty. Solid friendship if the 6 doesn't exhaust themselves reassuring the 4 in their doubts.",
  '4-7': "The 4 plunges, the 7 surfaces. Strong but complementary contrast: the 7 lightens the 4, the 4 gives depth to the 7.",
  '4-8': "Two intense personalities. The 8 protects the 4, the 4 helps the 8 access vulnerability. Rare and precious friendship.",
  '4-9': "Gentle, creative friendship. The 9 accepts the 4's intensity, the 4 appreciates the total peace the 9 offers.",

  // ── Type 5 ──
  '5-1': "Intellectual, respectful friendship. They share a taste for quality work and don't step on each other.",
  '5-2': "The 5 needs space, the 2 wants closeness. Friendship possible if the 2 respects the 5's pace and silences.",
  '5-3': "The 5 thinks, the 3 acts. They complement each other if the 3 doesn't go too fast and the 5 accepts to share their analyses.",
  '5-4': "Intellectually and emotionally rich friendship. They respect each other and understand each other with few words.",
  '5-5': "Two discreet observers who respect each other. Rare and precious friendship — but watch they don't isolate together.",
  '5-6': "The 5 analyzes risks, the 6 anticipates them. Highly complementary duo on projects requiring reflection.",
  '5-7': "The 5 deepens, the 7 widens. Stimulating contrast if the 7 lets the 5 finish their thoughts.",
  '5-8': "The 5 thinks, the 8 acts. Mutual respect possible if the 8 doesn't bulldoze the 5 and the 5 emerges from their inner world.",
  '5-9': "Calm, respectful friendship. Two profiles that appreciate calm — they can sit side by side without bothering each other.",

  // ── Type 6 ──
  '6-1': "Stable, reliable friendship. The 6 follows the 1's rules, the 1 reassures the 6. Very loyal, predictable duo.",
  '6-2': "Warm, loyal friendship. They take care of each other with sincere generosity.",
  '6-3': "The 6 brings the 3 back to reality, the 3 builds confidence in the 6. Dynamic, balanced friendship.",
  '6-4': "The 6 seeks security, the 4 seeks intensity. Possible friendship if the 6 doesn't find the 4 too unpredictable.",
  '6-5': "Calm, analytical friendship. They reassure each other through logic and anticipation.",
  '6-6': "Two anxious profiles supporting each other — or amplifying their mutual fears. Help them cultivate trust rather than vigilance.",
  '6-7': "The 7 reassures the 6 with their lightness, the 6 reminds the 7 to think before acting. Beautiful complementarity.",
  '6-8': "The 6 tests the 8's reliability, the 8 protects the 6. Strong friendship built on loyalty once trust is established.",
  '6-9': "Very gentle, very stable friendship. They avoid conflict together — make sure they also express themselves when something isn't right.",

  // ── Type 7 ──
  '7-1': "The 7 shakes up the 1's rules, the 1 structures the 7's chaos. Lively friendship if you set them on a common project with short rules.",
  '7-2': "Joyful, generous friendship. The 7 takes the 2 on adventures, the 2 takes care of the 7. Popular, warm duo.",
  '7-3': "Energy and enthusiasm duo. They love common projects but both may avoid difficult emotions.",
  '7-4': "The 7 lightens the 4, the 4 gives depth to the 7. Surprising and very enriching friendship if each accepts the other's difference.",
  '7-5': "The 7 opens the 5's world, the 5 deepens the 7's ideas. Intellectually stimulating friendship if the 7 lets the 5 breathe.",
  '7-6': "The 7 reassures the 6 with their lightness, the 6 brings the 7 to think before acting. Precious complementarity.",
  '7-7': "Contagious energy and bursting creativity — but also dispersion! Help them finish their projects together.",
  '7-8': "Two profiles who love action and challenge. Intense, loyal friendship if the 8 doesn't dominate the 7.",
  '7-9': "Joyful, peaceful friendship. The 7 stimulates the 9, the 9 calms the 7. Good natural balance.",

  // ── Type 8 ──
  '8-1': "Two strong personalities who mutually respect each other. Friendship possible if neither tries to impose their rules on the other.",
  '8-2': "The 8 protects the 2, the 2 softens the 8. Intense, loyal friendship built on trust.",
  '8-3': "Two leaders. They admire each other and pull each other up — but also into competition. Help them cooperate rather than rival.",
  '8-4': "The 8 protects the 4, the 4 helps the 8 access their emotions. Rare, intense, precious friendship.",
  '8-5': "The 8 acts, the 5 thinks. Mutual respect possible if the 8 lets the 5 analyze before deciding.",
  '8-6': "The 8 protects the 6, the 6 is loyally devoted to the 8. Strong friendship once trust is established.",
  '8-7': "Two adventurers. Energy, action, challenge — intense, lively friendship. Make sure they also handle their emotions.",
  '8-8': "Power rivalry or absolute loyalty: when it's true friendship between two 8s, it's for life — but the path can be chaotic.",
  '8-9': "The 8 gives energy to the 9, the 9 calms the 8. Beautiful friendship if the 8 doesn't take all the room.",

  // ── Type 9 ──
  '9-1': "Calm, reliable friendship. The 9 accepts the 1's rules, the 1 appreciates the 9's gentleness. Very stable duo.",
  '9-2': "Gentle, kind friendship. Two profiles who care for others — make sure they also take care of themselves.",
  '9-3': "The 9 admires the 3's energy, the 3 appreciates the 9's serenity. Beautiful complementarity if the 3 leaves space for the 9.",
  '9-4': "Creative, peaceful friendship. The 9 appreciates the 4's depth, the 4 appreciates the total acceptance the 9 offers.",
  '9-5': "Calm, respectful friendship. Two discreet profiles that appreciate silence and shared space.",
  '9-6': "Gentle, stable friendship. They support each other without judging and create a space of mutual trust.",
  '9-7': "The 7 animates the 9, the 9 calms the 7. Joyful, balanced friendship.",
  '9-8': "The 9 softens the 8, the 8 helps the 9 to assert themselves. Beautiful friendship if the 8 doesn't take all the room.",
  '9-9': "Very peaceful, harmonious friendship. Two 9s together avoid all conflict — make sure they also assert themselves when necessary.",
};
