// ═══════════════════════════════════════════════════════════════
//  Ritual journal ("Mon journal") — answers to the daily question.
//
//  The phone copy comes first: every read is instant and works offline.
//  Each account has its own copy (AsyncStorage key per uid), and changes are
//  mirrored to Firestore (/journals/{uid}/entries/{date}, see firebase.ts)
//  so the journal follows the account to a new phone.
//
//  - One entry per day: the document id is the local date YYYY-MM-DD.
//  - `dirty` remembers the changes not yet sent online, so nothing is lost
//    if the app is killed offline; they are sent on the next sync.
//  - If the Firestore rule is missing ("permission-denied"), the journal
//    keeps working on the phone and sync is retried at the next launch.
//  - Answers saved by older versions (one shared key for the whole phone)
//    are moved once into the account that opens the journal first.
// ═══════════════════════════════════════════════════════════════

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  auth,
  listJournalEntriesRemote,
  putJournalEntryRemote,
  deleteJournalEntryRemote,
} from './firebase';

const LEGACY_KEY = 'ritual:answers:v1';
const cacheKey = (uid: string) => `journal:v2:${uid}`;

export interface RitualEntry {
  /** Local date YYYY-MM-DD of the day the question was answered (unique) */
  date: string;
  /** Timestamp (ms) of the last save — orders entries and resolves conflicts */
  ts: number;
  /** Locale at the moment of saving */
  locale: 'fr' | 'en';
  /** The question that was asked */
  question: string;
  /** The user's answer */
  answer: string;
}

type DirtyOp = { op: 'put' | 'del'; ts: number };
interface Cache {
  entries: RitualEntry[];
  dirty: Record<string, DirtyOp>;
}

export type JournalSyncState = 'synced' | 'pending' | 'offline' | 'blocked';

/** Today's key, YYYY-MM-DD in the phone's LOCAL time (the daily question
 *  also follows the local date, so both change at local midnight). */
export function todayKey(): string {
  return dateKey(new Date());
}

function dateKey(d: Date): string {
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const byNewest = (a: RitualEntry, b: RitualEntry) =>
  b.date === a.date ? b.ts - a.ts : (b.date > a.date ? 1 : -1);

// ── Local storage (always called under the lock) ──

// One chain for every local read-modify-write, so a save and a sync never
// overwrite each other's changes.
let chain: Promise<unknown> = Promise.resolve();
function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = chain.then(fn, fn);
  chain = run.catch(() => {});
  return run;
}

function sanitize(list: unknown): RitualEntry[] {
  if (!Array.isArray(list)) return [];
  return list
    .filter((e: any) => e && typeof e.answer === 'string' && typeof e.ts === 'number')
    .map((e: any) => ({
      date: typeof e.date === 'string' && DATE_RE.test(e.date) ? e.date : dateKey(new Date(e.ts)),
      ts: e.ts,
      locale: e.locale === 'en' ? 'en' : 'fr',
      question: typeof e.question === 'string' ? e.question : '',
      answer: e.answer,
    }));
}

async function readCache(uid: string): Promise<Cache> {
  let cache: Cache = { entries: [], dirty: {} };
  try {
    const raw = await AsyncStorage.getItem(cacheKey(uid));
    if (raw) {
      const parsed = JSON.parse(raw);
      cache = {
        entries: sanitize(parsed?.entries),
        dirty: parsed?.dirty && typeof parsed.dirty === 'object' ? parsed.dirty : {},
      };
    }
  } catch {}

  // One-time move of the answers saved by older versions (shared key).
  // Old versions keyed answers by the UTC date; re-key them by the local day
  // (the one the question belonged to), never dropping an answer on a clash.
  try {
    const legacyRaw = await AsyncStorage.getItem(LEGACY_KEY);
    if (legacyRaw) {
      const byDate = new Map(cache.entries.map((e) => [e.date, e]));
      const legacy = sanitize(JSON.parse(legacyRaw)).sort((a, b) => b.ts - a.ts);
      const taken = new Set<string>();
      for (const raw of legacy) {
        const local = dateKey(new Date(raw.ts));
        let date = taken.has(local) ? raw.date : local;
        // Still taken (possible west of UTC): use the nearest free earlier day.
        while (taken.has(date)) {
          const [y, m, d] = date.split('-').map(Number);
          date = dateKey(new Date(y, m - 1, d - 1));
        }
        taken.add(date);
        const e = { ...raw, date };
        const current = byDate.get(date);
        if (!current || e.ts > current.ts) {
          byDate.set(date, e);
          cache.dirty[date] = { op: 'put', ts: e.ts };
        }
      }
      cache.entries = [...byDate.values()];
      await writeCache(uid, cache);
      await AsyncStorage.removeItem(LEGACY_KEY);
    }
  } catch {}

  return cache;
}

async function writeCache(uid: string, cache: Cache): Promise<void> {
  cache.entries.sort(byNewest);
  await AsyncStorage.setItem(cacheKey(uid), JSON.stringify(cache));
}

// ── Public API ──

/** The journal of this account, newest first. Local only, never throws. */
export async function loadJournal(uid: string): Promise<RitualEntry[]> {
  return withLock(async () => (await readCache(uid)).entries);
}

/** Save (or replace) today's answer. Returns the saved entry, or null if the
 *  answer is empty. Sent online in the background. */
export async function saveAnswer(uid: string, args: {
  question: string;
  answer: string;
  locale: 'fr' | 'en';
}): Promise<RitualEntry | null> {
  const entry: RitualEntry = {
    date: todayKey(),
    ts: Date.now(),
    locale: args.locale,
    question: args.question,
    answer: args.answer.trim(),
  };
  if (!entry.answer) return null;
  await withLock(async () => {
    const cache = await readCache(uid);
    cache.entries = [entry, ...cache.entries.filter((e) => e.date !== entry.date)];
    cache.dirty[entry.date] = { op: 'put', ts: entry.ts };
    await writeCache(uid, cache);
  });
  syncJournal(uid, true).catch(() => {});
  return entry;
}

/** Delete the answer of a given day. Sent online in the background. */
export async function deleteAnswer(uid: string, date: string): Promise<void> {
  await withLock(async () => {
    const cache = await readCache(uid);
    cache.entries = cache.entries.filter((e) => e.date !== date);
    cache.dirty[date] = { op: 'del', ts: Date.now() };
    await writeCache(uid, cache);
  });
  syncJournal(uid, true).catch(() => {});
}

// Accounts whose Firestore rule is missing: no retry until the next launch.
const blocked = new Set<string>();
// Bumped on sign-out / account deletion: a sync still running for that
// account then stops without writing anything back.
const generation = new Map<string, number>();
const bumpGeneration = (uid: string) => generation.set(uid, (generation.get(uid) ?? 0) + 1);
// One sync at a time per account; callers share the running one.
const running = new Map<string, { gen: number; p: Promise<JournalSyncState> }>();
// A change made while a sync is already pushing: run one more sync after it.
const again = new Set<string>();

const isPermissionDenied = (e: any) => e?.code === 'permission-denied';

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(Object.assign(new Error('timeout'), { code: 'timeout' })), ms);
    p.then((v) => { clearTimeout(timer); resolve(v); }, (e) => { clearTimeout(timer); reject(e); });
  });
}

/** Bring the phone copy and Firestore in line. Never throws. */
export function syncJournal(uid: string, followUp = false): Promise<JournalSyncState> {
  const gen = generation.get(uid) ?? 0;
  const current = running.get(uid);
  if (current && current.gen === gen) {
    if (followUp) again.add(uid);
    return current.p;
  }
  const p: Promise<JournalSyncState> = doSync(uid).finally(() => {
    if (running.get(uid)?.p === p) running.delete(uid);
    if (again.delete(uid)) syncJournal(uid).catch(() => {});
  });
  running.set(uid, { gen, p });
  return p;
}

async function doSync(uid: string): Promise<JournalSyncState> {
  // Local only for dev anonymous sessions and signed-out moments.
  const user = auth.currentUser;
  if (!user || user.uid !== uid || user.isAnonymous) return 'offline';
  const pendingCount = () => withLock(async () => Object.keys((await readCache(uid)).dirty).length);
  if (blocked.has(uid)) return (await pendingCount()) > 0 ? 'blocked' : 'offline';
  const gen = generation.get(uid) ?? 0;
  const alive = () => (generation.get(uid) ?? 0) === gen && auth.currentUser?.uid === uid;

  // 1. Pull (network, outside the lock so saves stay instant).
  let remote: RitualEntry[];
  try {
    remote = await withTimeout(listJournalEntriesRemote(uid), 10000);
  } catch (e) {
    if (!alive()) return 'offline';
    if (isPermissionDenied(e)) { blocked.add(uid); return (await pendingCount()) > 0 ? 'blocked' : 'offline'; }
    return (await pendingCount()) > 0 ? 'pending' : 'offline';
  }
  if (!alive()) return 'offline';

  // 2. Merge. Firestore wins for every day without a pending local change;
  //    a day missing online and not pending was deleted on another phone.
  const toPush = await withLock(async () => {
    if (!alive()) return null;
    const cache = await readCache(uid);
    const remoteByDate = new Map(remote.map((e) => [e.date, e]));
    const localByDate = new Map(cache.entries.map((e) => [e.date, e]));
    const merged: RitualEntry[] = [];
    const dates = new Set([...remoteByDate.keys(), ...localByDate.keys()]);
    for (const date of dates) {
      const r = remoteByDate.get(date);
      const l = localByDate.get(date);
      const pending = cache.dirty[date];
      if (!pending) {
        if (r) merged.push(r);
      } else if (pending.op === 'put') {
        if (r && l && r.ts > l.ts) {
          merged.push(r);
          delete cache.dirty[date];
        } else if (l) {
          merged.push(l);
        } else {
          delete cache.dirty[date];
          if (r) merged.push(r);
        }
      }
      else if (pending.op === 'del' && r && r.ts > pending.ts) {
        // Answered again on another phone after this delete: keep that answer.
        merged.push(r);
        delete cache.dirty[date];
      }
      // otherwise a pending 'del' stays deleted locally, pushed below.
    }
    cache.entries = merged;
    await writeCache(uid, cache);
    return Object.entries(cache.dirty).map(([date, d]) => ({
      date, d, entry: merged.find((e) => e.date === date),
    }));
  });

  if (!toPush) return 'offline';

  // 3. Push pending changes, then clear the flags that did not change since.
  let state: JournalSyncState = 'synced';
  const done: { date: string; ts: number }[] = [];
  for (const { date, d, entry } of toPush) {
    if (!alive()) return 'offline';
    try {
      if (d.op === 'put' && entry) await withTimeout(putJournalEntryRemote(uid, entry), 10000);
      else if (d.op === 'del') await withTimeout(deleteJournalEntryRemote(uid, date), 10000);
      done.push({ date, ts: d.ts });
    } catch (e) {
      if (isPermissionDenied(e)) { blocked.add(uid); state = 'blocked'; break; }
      state = 'pending';
    }
  }
  if (done.length && alive()) {
    await withLock(async () => {
      if (!alive()) return;
      const cache = await readCache(uid);
      for (const { date, ts } of done) {
        if (cache.dirty[date]?.ts === ts) delete cache.dirty[date];
      }
      await writeCache(uid, cache);
    });
  }
  if (state === 'synced' && (await pendingCount()) > 0) state = 'pending';
  if (state === 'blocked' && (await pendingCount()) === 0) state = 'offline';
  return state;
}

/** Before signing out: try to send pending changes (a few seconds at most),
 *  then drop the phone copy if everything is online. If some changes could
 *  not be sent, the copy stays (only this account reads it) and is sent at
 *  the next sign-in. */
export async function prepareJournalSignOut(uid: string, timeoutMs = 4000): Promise<void> {
  try {
    await withTimeout(syncJournal(uid), timeoutMs);
  } catch {}
  bumpGeneration(uid);
  await withLock(async () => {
    const cache = await readCache(uid);
    if (Object.keys(cache.dirty).length === 0) {
      await AsyncStorage.removeItem(cacheKey(uid));
    }
  }).catch(() => {});
  blocked.delete(uid);
}

/** Stop any running sync for this account (before deleting the account). */
export function stopJournalSync(uid: string): void {
  bumpGeneration(uid);
}

/** Account deletion: remove the phone copy (and any old shared copy). */
export async function clearLocalJournal(uid: string): Promise<void> {
  bumpGeneration(uid);
  await withLock(async () => {
    await AsyncStorage.multiRemove([cacheKey(uid), LEGACY_KEY]);
  }).catch(() => {});
  blocked.delete(uid);
}

/** Format a journal day (YYYY-MM-DD, local) for display */
export function formatEntryDay(date: string, locale: 'fr' | 'en'): string {
  const [y, m, d] = date.split('-').map(Number);
  const day = new Date(y, (m || 1) - 1, d || 1);
  if (locale === 'en') {
    return day.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  }
  return day.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
}

/** Whole days between a journal day and today (local calendar days). */
export function daysAgo(date: string): number {
  const [y, m, d] = date.split('-').map(Number);
  const then = new Date(y, (m || 1) - 1, d || 1).getTime();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Math.round((today - then) / 86400000);
}
