// ═══════════════════════════════════════════════════════════════
//  Ritual journal — local persistence of answers to the daily question.
//  Stored in AsyncStorage (no auth required, fully offline).
// ═══════════════════════════════════════════════════════════════

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'ritual:answers:v1';

export interface RitualEntry {
  /** ISO date string YYYY-MM-DD (the day the answer was saved) */
  date: string;
  /** ISO timestamp (ms) — for ordering and uniqueness */
  ts: number;
  /** Locale at the moment of saving */
  locale: 'fr' | 'en';
  /** The question that was asked */
  question: string;
  /** The user's answer */
  answer: string;
}

function todayKey(): string {
  return new Date().toISOString().split('T')[0];
}

export async function loadJournal(): Promise<RitualEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // sort: most recent first
    return parsed.sort((a: RitualEntry, b: RitualEntry) => b.ts - a.ts);
  } catch {
    return [];
  }
}

export async function saveAnswer(args: {
  question: string;
  answer: string;
  locale: 'fr' | 'en';
}): Promise<void> {
  const entry: RitualEntry = {
    date: todayKey(),
    ts: Date.now(),
    locale: args.locale,
    question: args.question,
    answer: args.answer.trim(),
  };
  if (!entry.answer) return;
  const existing = await loadJournal();
  // Keep only one entry per day — overwrite if user saves twice today
  const filtered = existing.filter(e => e.date !== entry.date);
  const next = [entry, ...filtered];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export async function deleteAnswer(ts: number): Promise<void> {
  const existing = await loadJournal();
  const next = existing.filter(e => e.ts !== ts);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

/** Has the user already answered today? */
export async function hasAnsweredToday(): Promise<boolean> {
  const existing = await loadJournal();
  const today = todayKey();
  return existing.some(e => e.date === today);
}

/** Format the journal-entry date for display */
export function formatEntryDate(ts: number, locale: 'fr' | 'en'): string {
  const d = new Date(ts);
  if (locale === 'en') {
    return d.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric',
    });
  }
  return d.toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long',
  });
}
