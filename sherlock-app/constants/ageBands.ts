// ═══════════════════════════════════════════════════════════════
//  Age bands: the quiz uses 5-8 / 9-12 / 13-17 (quiz_v3 AgeBand), while the
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

/** Quiz band ('5-8' | '9-12' | '13-17', legacy 'enfant' / 'ado') → content key. */
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
