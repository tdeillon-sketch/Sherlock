// ═══════════════════════════════════════════════════════════════
//  Mon journal : la question du jour.
//  Chaque question doit se comprendre seule (sans référence extérieure).
//  Sélection déterministe basée sur le jour de l'année.
// ═══════════════════════════════════════════════════════════════

export interface RitualQuestion {
  fr: string;
  en: string;
  /** Earlier wordings (answers saved before a rewrite still match) */
  legacy?: string[];
}

export const RITUAL_QUESTIONS: RitualQuestion[] = [
  {
    fr: "Avez-vous déjà ressenti ce vertige : ce moment où vous réalisez que l'enfant qui vous regarde n'attend pas vos réponses, mais votre témoignage ?",
    en: "Have you ever felt that vertigo: that moment when you realize the child looking at you isn't waiting for your answers, but for your testimony?",
  },
  {
    fr: "Et vous, qu'avez-vous appris de vos enfants que vous n'auriez jamais appris autrement ?",
    en: "And you, what have you learned from your children that you would never have learned otherwise?",
  },
  {
    fr: "Quels fardeaux portez-vous encore sans les avoir choisis ? Quelles phrases de vos parents résonnent dans votre tête quand vous éduquez vos propres enfants ?",
    en: "What burdens are you still carrying that you never chose? Which of your parents' phrases echo in your head when you raise your own children?",
  },
  {
    fr: "Contre quoi vous rebellez-vous en ce moment ? Quel « tu dois » hérité êtes-vous en train de remettre en question ?",
    en: "What are you rebelling against right now? Which inherited 'you must' are you currently questioning?",
    legacy: [
      "Contre quel dragon rugissez-vous en ce moment ? Quel « tu dois » hérité êtes-vous en train de remettre en question ?",
      "Which dragon are you roaring at right now? Which inherited 'you must' are you currently questioning?",
    ],
  },
  {
    fr: "Faites-vous porter à vos enfants des fardeaux qui sont les vôtres ? Avez-vous besoin de leur réussite pour vous sentir réussi ?",
    en: "Are you placing your own burdens on your children's shoulders? Do you need their success to feel successful yourself?",
  },
  {
    fr: "Votre enfant sait-il qu'il est aimé quand il échoue, avec la même intensité que quand il réussit ?",
    en: "Does your child know they're loved when they fail with the same intensity as when they succeed?",
  },
  {
    fr: "Vos enfants ont-ils le droit d'être différents du reste de la famille ? De ne pas aimer ce que vous aimez ? De vouloir ce que vous n'aviez pas prévu ?",
    en: "Do your children have the right to be different from the rest of the family? To not like what you like? To want what you didn't plan for?",
  },
  {
    fr: "Qui décide chez vous ? Les règles sont-elles au service de l'enfant ou au service de votre tranquillité ?",
    en: "Who decides at home? Are the rules in service of the child, or in service of your peace of mind?",
  },
  {
    fr: "Quelle façon de faire famille domine chez vous en ce moment ? Et qu'aimeriez-vous renforcer dans votre famille ?",
    en: "What way of being a family dominates at home right now? And what would you like to strengthen in your family?",
    legacy: [
      "Quel modèle familial domine chez vous en ce moment ? Quelle vérité de chaque modèle aimeriez-vous renforcer dans votre famille ?",
      "Which family model dominates at home right now? What truth from each model would you like to strengthen in your family?",
    ],
  },
  {
    fr: "Connaissez-vous votre propre profil Ennéagramme ? Si oui, reconnaissez-vous les deux faces de votre médaille : votre force et l'ombre qu'elle porte ?",
    en: "Do you know your own Enneagram profile? If so, do you recognize both sides of the coin: your strength and the shadow it carries?",
  },
  {
    fr: "Quelles sont vos forces en tant que parent ? Et honnêtement, quels sont vos angles morts ? Votre conjoint·e comble-t-il ce que vous ne savez pas faire ?",
    en: "What are your strengths as a parent? And honestly, what are your blind spots? Does your partner complete what you don't know how to do?",
  },
  {
    fr: "Vos enfants reçoivent-ils la même éducation ? Ou avez-vous commencé à adapter votre approche à qui ils sont vraiment ?",
    en: "Do your children receive the same upbringing? Or have you started to adapt your approach to who they really are?",
  },
  {
    fr: "Avez-vous déjà mis une étiquette sur votre enfant (« difficile », « têtu », « trop sensible ») sans chercher à comprendre ce que cette étiquette cachait vraiment ?",
    en: "Have you ever labeled your child ('difficult', 'stubborn', 'too sensitive') without trying to understand what that label was really hiding?",
  },
  {
    fr: "Avez-vous déjà pris le temps de voyager vers ceux qui vous sont le plus différents ? Pas pour les changer : pour les comprendre ?",
    en: "Have you ever taken the time to travel toward those most different from you? Not to change them: to understand them?",
  },
  {
    fr: "Votre enfant murmure-t-il en ce moment quelque chose que vous n'entendez pas ? Est-ce parce que le murmure est trop faible, ou parce que vous n'avez pas appris à écouter ce langage-là ?",
    en: "Is your child whispering something right now that you can't hear? Is it because the whisper is too quiet, or because you haven't learned to listen to that language?",
  },
  {
    fr: "Quelle est la force dominante de votre enfant ? Et avez-vous regardé l'ombre qu'elle porte, non pour la corriger, mais pour l'accompagner ?",
    en: "What is your child's dominant strength? And have you looked at the shadow it carries, not to correct it, but to walk beside it?",
  },
  {
    fr: "Dans quels domaines de votre vie portez-vous encore ce qu'on vous a imposé ? Où êtes-vous en train de dire non ? Et où avez-vous déjà trouvé un oui libre, une création sans colère ?",
    en: "In which areas of your life are you still carrying what was imposed on you? Where are you saying no? And where have you already found a free yes, a creation without anger?",
    legacy: [
      "Dans quels domaines de votre vie êtes-vous encore chameau ? Où êtes-vous lion ? Et où avez-vous déjà atteint l'étape de l'enfant — ce oui libre, cette création sans colère ?",
      "In which areas of your life are you still the camel? Where are you the lion? And where have you already reached the child's stage — that free yes, that creation without anger?",
    ],
  },
];

// Compare question texts ignoring punctuation, case and accents, so answers
// saved before a punctuation-only edit (e.g. dashes removed) still match.
const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

/** Was this saved question text asked as `q` (in any language or wording)? */
export function isSameQuestion(q: RitualQuestion, text: string): boolean {
  const t = norm(text);
  return [q.fr, q.en, ...(q.legacy ?? [])].some((s) => norm(s) === t);
}

/**
 * Pick the question of the day. Deterministic based on the date —
 * everyone gets the same question on the same day.
 */
export function getDailyQuestion(date: Date = new Date()): RitualQuestion {
  // day-of-year (1..366) from the LOCAL calendar date (DST-free, so the
  // question changes at local midnight, like the journal's day key)
  const dayOfYear = Math.round(
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 86400000,
  );
  const idx = dayOfYear % RITUAL_QUESTIONS.length;
  return RITUAL_QUESTIONS[idx];
}

/** Format the date as displayed in the eyebrow (e.g. "DIM. 3 MAI") */
export function formatRitualDate(date: Date, locale: 'fr' | 'en'): string {
  if (locale === 'en') {
    const day = date.toLocaleDateString('en-US', { weekday: 'short' });
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    return `${day.toUpperCase()} · ${month.toUpperCase()} ${date.getDate()}`;
  }
  // FR — shorten the day to 3 letters with dot
  const dayLong = date.toLocaleDateString('fr-FR', { weekday: 'short' });
  const day = dayLong.replace('.', '').slice(0, 3) + '.';
  const month = date.toLocaleDateString('fr-FR', { month: 'short' }).replace('.', '');
  return `${day.toUpperCase()} ${date.getDate()} ${month.toUpperCase()}`;
}
