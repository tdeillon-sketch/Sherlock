// ═══════════════════════════════════════════════════════════════
//  Age bands: the profile pages show the ranges 5-8 / 9-12 / 13-17, while the
//  profile texts are stored under the keys '5-8' / '8-12' / '13-16'
//  (data.ts, wings.ts and their EN files). The keys stay as they are; this
//  maps a child's age or quiz band to the matching text, and the page shows
//  the quiz bands as labels.
// ═══════════════════════════════════════════════════════════════

import { ageToBand } from './quiz_v3';

export type ContentAgeKey = '5-8' | '8-12' | '13-16';

export const CONTENT_AGE_KEYS: ContentAgeKey[] = ['5-8', '8-12', '13-16'];

/** i18n key of the label shown for each content band (quiz bands). */
export const AGE_LABEL_KEYS: Record<ContentAgeKey, string> = {
  '5-8': 'profile.age58',
  '8-12': 'profile.age912',
  '13-16': 'profile.age1317',
};

/** Saved band ('5-8' | '9-12' | '13-17' from quizzes before 4.1, legacy
 *  'ado') → content key. Newer child quizzes save 'enfant': the saved age
 *  then gives the band (see contentKeyForAge). */
export function contentKeyForBand(band?: string | null): ContentAgeKey | null {
  if (band === '5-8') return '5-8';
  if (band === '9-12') return '8-12';
  if (band === '13-17' || band === 'ado') return '13-16';
  return null;
}

/** Child's age → content key. */
export function contentKeyForAge(age?: number | null): ContentAgeKey | null {
  if (typeof age !== 'number' || !Number.isFinite(age) || age <= 0) return null;
  return contentKeyForBand(ageToBand(age));
}
