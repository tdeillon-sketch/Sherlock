// ═══════════════════════════════════════════════════════════════
//  RADAR DE STRESS — lecture observationnelle stress/sécurité par type
//  Ancré sur les flèches (désintégration = stress, intégration = sécurité)
//  de constants/data.ts. Langage NON diagnostique : "a l'air de…", pas
//  "il EST…". Généré + vérifié (FR + EN). À affiner librement.
// ═══════════════════════════════════════════════════════════════

export interface StressRadarType {
  stressSignFR: string; stressSignEN: string;
  tryFR: string; tryEN: string;
  avoidFR: string; avoidEN: string;
  securitySignFR: string; securitySignEN: string;
}

export const STRESS_RADAR: Record<number, StressRadarType> = {
  1: {
    stressSignFR: 'Il/elle a l\'air de se replier, plus sombre, dur(e) envers lui/elle-même, comme si tout était sa faute.', stressSignEN: 'He/she seems to withdraw, gloomier, harsh on himself/herself, as if everything were his/her fault.',
    tryFR: 'Glissez-lui, sans corriger : « Là tu n\'as rien à réussir, t\'es bien comme tu es. »', tryEN: 'Slip in, without correcting: "Right now there\'s nothing to get right, you\'re fine as you are."',
    avoidFR: 'Évitez de pointer une erreur ou d\'ajouter une exigence : la critique tombe déjà de l\'intérieur.', avoidEN: 'Avoid pointing out a mistake or adding a demand: the criticism is already coming from inside.',
    securitySignFR: 'Il/elle a l\'air plus léger(ère), rit de ses propres ratés, joue et improvise sans chercher à bien faire.', securitySignEN: 'He/she seems lighter, laughs at his/her own slip-ups, plays and improvises without trying to do it right.',
  },
  2: {
    stressSignFR: 'Il/elle a l\'air de forcer pour aider, et semble devenir exigeant(e) ou cassant(e) quand on ne le remarque pas.', stressSignEN: 'He/she seems to push hard to help, and to turn demanding or sharp when it goes unnoticed.',
    tryFR: 'Dites-lui simplement « je t\'aime parce que tu es là, pas pour ce que tu fais ».', tryEN: 'Just tell them "I love you because you\'re here, not for what you do."',
    avoidFR: 'Évitez de le/la remercier surtout pour ses services : ça renforce l\'idée qu\'il faut se rendre utile.', avoidEN: 'Avoid praising mainly what they do for you: it reinforces the need to stay useful.',
    securitySignFR: 'Il/elle ose dire ce dont il/elle a envie, montre ses vrais goûts sans d\'abord penser à plaire.', securitySignEN: 'He/she dares to say what he/she wants, showing real tastes without first trying to please.',
  },
  3: {
    stressSignFR: 'Il/elle a l\'air de se désengager, comme éteint(e) : moins d\'allant, comme s\'il/elle baissait les bras.', stressSignEN: 'He/she seems to be checking out, a bit dimmed: less drive, as if quietly giving up.',
    tryFR: 'Passez juste un moment ensemble sans enjeu : « Content(e) de t\'avoir là, peu importe le reste. »', tryEN: 'Just share a low-stakes moment: "I\'m glad you\'re here, whatever else is going on."',
    avoidFR: 'Évitez de le/la relancer sur ses résultats ou de pointer ce qui n\'avance pas.', avoidEN: 'Avoid pushing about results or pointing out what isn\'t getting done.',
    securitySignFR: 'Il/elle a l\'air posé(e) et confiant(e) : présent(e) pour de vrai, sans avoir à briller.', securitySignEN: 'He/she seems settled and trusting: genuinely present, with nothing to prove.',
  },
  4: {
    stressSignFR: 'Il/elle a l\'air de se fondre dans les autres, de dire oui à tout, comme s\'il/elle s\'oubliait pour être aimé(e).', stressSignEN: 'He/she seems to blend into others, to agree with everything, as if forgetting himself/herself to be loved.',
    tryFR: 'Renvoyez-lui une chose précise et vraie sur lui/elle : « ça, c\'est tellement toi, et j\'adore ça ».', tryEN: 'Reflect back one precise, true thing about them: "that\'s so you, and I love it."',
    avoidFR: 'Évitez de minimiser ce qu\'il/elle ressent ou de réparer trop vite : « ce n\'est rien ».', avoidEN: 'Avoid minimizing what they feel or fixing it too fast: "it\'s nothing."',
    securitySignFR: 'Il/elle met sa sensibilité dans quelque chose de concret, crée avec soin, relié(e) plutôt que replié(e).', securitySignEN: 'He/she pours that sensitivity into something concrete, creates with care, connected rather than withdrawn.',
  },
  5: {
    stressSignFR: 'Il/elle a l\'air de papillonner sans se poser : saute d\'un écran ou d\'une idée à l\'autre, agité(e).', stressSignEN: 'He/she seems to flit about without settling: jumping from screen to screen or idea to idea, restless.',
    tryFR: 'Proposez-lui un petit coin tranquille et du temps seul(e), sans rien attendre ni questionner.', tryEN: 'Offer him/her a quiet little corner and some alone time, expecting nothing and asking nothing.',
    avoidFR: 'Évitez de l\'envahir de questions ou d\'activités : ça vide encore plus son énergie.', avoidEN: 'Avoid flooding him/her with questions or activities: it drains his/her energy even more.',
    securitySignFR: 'Il/elle a l\'air posé(e) et sûr(e) : partage ce qu\'il/elle sait et passe volontiers à l\'action.', securitySignEN: 'He/she seems grounded and confident: shares what he/she knows and steps into action willingly.',
  },
  6: {
    stressSignFR: 'Il/elle a l\'air de chercher à tout prévoir, à se montrer parfait(e) ou à plaire pour se rassurer.', stressSignEN: 'He/she seems to be trying to anticipate everything, look perfect, or please others to feel reassured.',
    tryFR: 'Dites-lui calmement, en le/la regardant : « Je suis là, c\'est bon, on gère ça ensemble. »', tryEN: 'Tell him/her calmly, looking them in the eye: "I\'m here, it\'s okay, we\'ve got this together."',
    avoidFR: 'Évitez de minimiser son inquiétude par un « mais arrête, il n\'y a aucune raison de t\'en faire ».', avoidEN: 'Avoid brushing off the worry with "come on, stop, there\'s nothing to worry about."',
    securitySignFR: 'Il/elle a l\'air plus posé(e), fait confiance, ose agir sans tout vérifier et semble apaisé(e) à l\'intérieur.', securitySignEN: 'He/she seems calmer, more trusting, willing to act without double-checking everything, and settled inside.',
  },
  7: {
    stressSignFR: 'Il/elle a l\'air plus tendu(e), critique de tout, jamais satisfait(e), et n\'arrive plus à enchaîner ses projets.', stressSignEN: 'He/she seems more tense, critical of everything, never satisfied, and can\'t move from one project to the next.',
    tryFR: 'Proposez une petite chose joyeuse à faire ensemble là, maintenant, sans aucun objectif ni résultat attendu.', tryEN: 'Offer one small fun thing to do together right now, with no goal and nothing to finish.',
    avoidFR: 'Évitez de lui imposer plus de règles ou de lui reprocher de ne rien terminer.', avoidEN: 'Avoid piling on more rules or scolding him/her for never finishing things.',
    securitySignFR: 'Il/elle a l\'air posé(e), curieux(se) en profondeur, capable de rester sur une seule chose qui le/la passionne.', securitySignEN: 'He/she seems settled, deeply curious, able to stay with one thing that genuinely fascinates him/her.',
  },
  8: {
    stressSignFR: 'Il/elle a l\'air de se refermer d\'un coup, plus silencieux(se) et méfiant(e), à distance, comme si plus personne n\'était fiable.', stressSignEN: 'He/she seems to shut down all at once, quieter and warier, keeping a distance as if no one could be trusted.',
    tryFR: 'Restez près de lui/d\'elle, calme et fiable, sans rien exiger : « Je suis là, tu n\'as rien à prouver. »', tryEN: 'Stay near, calm and steady, asking nothing: "I\'m right here, you\'ve got nothing to prove to me."',
    avoidFR: 'Évitez de forcer la confidence ou de hausser le ton : ça le/la pousse à se barricader davantage.', avoidEN: 'Avoid forcing a confession or raising your voice: it only pushes him/her to wall off further.',
    securitySignFR: 'Il/elle a l\'air de laisser tomber l\'armure : un geste tendre, un câlin demandé, un « j\'ai besoin d\'aide » qui sort sans peine.', securitySignEN: 'He/she seems to let the armor drop: a tender gesture, a hug asked for, an easy "I need some help."',
  },
  9: {
    stressSignFR: 'Lui/elle d\'habitude si tranquille a l\'air à cran, soucieux(se), comme s\'il/elle imaginait toujours le pire.', stressSignEN: 'Usually so easygoing, he/she seems on edge and worried, as if always imagining the worst.',
    tryFR: 'Asseyez-vous calmement près de lui/d\'elle et demandez : « De quoi tu aurais besoin, là, maintenant ? »', tryEN: 'Sit calmly beside him/her and ask: "What would you need, just right now?"',
    avoidFR: 'Évitez de minimiser ses inquiétudes ou de le/la presser ; ça augmente le sentiment d\'insécurité.', avoidEN: 'Avoid brushing off his/her worries or rushing him/her; it deepens the sense of unease.',
    securitySignFR: 'Il/elle a l\'air apaisé(e) et présent(e), avec ses propres envies, qu\'il/elle se met à poursuivre activement.', securitySignEN: 'He/she seems settled and present, with wishes of his/her own that he/she actively starts to pursue.',
  },
};
