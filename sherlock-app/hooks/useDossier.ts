import { useState, useCallback, useEffect } from 'react';
import { DOSSIERS, RANKS, type DossierCase, type Dossier } from '../constants/dossiers';
import { auth } from '../constants/firebase';
import { saveDossierProgress, loadDossierProgress } from '../constants/firebase';

// ── Types ──────────────────────────────────────────────────────

export interface DossierProgress {
  completedCases: string[];   // cases the user has answered CORRECTLY at least once
  wrongCases: string[];       // cases the user has answered WRONG and not yet redeemed
  unlockedFiches: string[];
  totalXP: number;
  dailyLastDate: string | null;
  dailyCompleted: boolean;
  streak: number;
  bestCombo: number;
}

export interface RankInfo {
  current: { id: number; title: string; emoji: string; xpRequired: number };
  next: { id: number; title: string; emoji: string; xpRequired: number } | null;
  progress: number;
}

export type GameScreen =
  | 'hub'
  | 'playing'
  | 'reveal'
  | 'session_summary'  // After daily mission (3 cases) done
  | 'collection'
  | 'fiche';

// Historical note: there used to be a third mode 'rapide' (3 cases on-demand
// with combo bonus). It has been merged INTO 'daily' to simplify the hub —
// the daily mission now IS the 3-case session that gives combo + streak.
export type GameMode = 'entrainement' | 'daily';

export interface PlayState {
  mode: GameMode;
  dossier: Dossier;        // dossier the case belongs to (for back-compat with case rendering)
  caseIndex: number;       // index within dossier
  currentCase: DossierCase;
  // Session-level (daily=3 cases / entrainement=continuous)
  comboCount: number;      // current consecutive correct in this session
  casesPlayedInSession: number;
  // Per-case
  revealedIndices: number;
  answered: boolean;
  correct: boolean;
  xpEarned: number;
  fauxAmisAnswers: { a: number | null; b: number | null };
  detailAnswered: number | null;
}

// Session summary (after daily mission — 3 cases)
export interface SessionSummary {
  mode: GameMode;
  cases: number;
  correct: number;
  xpTotal: number;
  comboBonus: number;
  bestCombo: number;
}

const DEFAULT_PROGRESS: DossierProgress = {
  completedCases: [],
  wrongCases: [],
  unlockedFiches: [],
  totalXP: 0,
  dailyLastDate: null,
  dailyCompleted: false,
  streak: 0,
  bestCombo: 0,
};

// ── Helpers ──────────────────────────────────────────────────

export function getRankInfo(xp: number): RankInfo {
  let currentRank = RANKS[0];
  for (const rank of RANKS) {
    if (xp >= rank.xpRequired) currentRank = rank;
  }
  const nextRank = RANKS.find(r => r.xpRequired > xp) ?? null;
  let progress = 1;
  if (nextRank) {
    const span = nextRank.xpRequired - currentRank.xpRequired;
    const done = xp - currentRank.xpRequired;
    progress = Math.min(done / span, 1);
  }
  return { current: currentRank, next: nextRank, progress };
}

function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

// All cases as a flat pool: { dossier, caseIndex }
function getAllCases(): { dossier: Dossier; caseIndex: number }[] {
  return DOSSIERS.flatMap(d => d.cases.map((_, ci) => ({ dossier: d, caseIndex: ci })));
}

// Pick a case using a weighted strategy across 3 buckets:
//   - tier "new"      : never seen by the user           (target ~70%)
//   - tier "wrong"    : seen but answered wrong (to redo) (target ~25%)
//   - tier "mastered" : already answered correctly        (target  ~5%)
// If the chosen tier is empty, falls back to the next non-empty tier so the
// user always gets a case as long as the global pool isn't exhausted.
function pickSmartCase(
  completed: string[],
  wrongCases: string[],
  avoidIds: string[] = [],
): { dossier: Dossier; caseIndex: number } | null {
  const all = getAllCases();
  const avoid = new Set(avoidIds);
  const completedSet = new Set(completed);
  const wrongSet = new Set(wrongCases);

  type Item = { dossier: Dossier; caseIndex: number };
  const tierNew: Item[] = [];
  const tierWrong: Item[] = [];
  const tierMastered: Item[] = [];

  for (const item of all) {
    const id = item.dossier.cases[item.caseIndex].id;
    if (avoid.has(id)) continue;
    if (wrongSet.has(id)) tierWrong.push(item);
    else if (completedSet.has(id)) tierMastered.push(item);
    else tierNew.push(item);
  }

  // Weighted pick: 70% new / 25% wrong / 5% mastered.
  const r = Math.random();
  const order: Item[][] =
    r < 0.70 ? [tierNew, tierWrong, tierMastered] :
    r < 0.95 ? [tierWrong, tierNew, tierMastered] :
               [tierMastered, tierNew, tierWrong];

  for (const tier of order) {
    if (tier.length > 0) {
      return tier[Math.floor(Math.random() * tier.length)];
    }
  }
  return null;
}

// ── Hook ─────────────────────────────────────────────────────

export function useDossier() {
  const [screen, setScreen] = useState<GameScreen>('hub');
  const [progress, setProgress] = useState<DossierProgress>(DEFAULT_PROGRESS);
  const [playState, setPlayState] = useState<PlayState | null>(null);
  const [sessionSummary, setSessionSummary] = useState<SessionSummary | null>(null);
  const [selectedFicheId, setSelectedFicheId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [xpGainAnim, setXpGainAnim] = useState<number | null>(null);

  // Session accumulators (daily 3-case mission; reset & accumulate per session)
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionXP, setSessionXP] = useState(0);
  const [sessionMaxCombo, setSessionMaxCombo] = useState(0);
  const [sessionPlayedIds, setSessionPlayedIds] = useState<string[]>([]);

  // ── Load progress from Firebase ──
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) { setLoading(false); return; }
    loadDossierProgress(uid)
      .then(p => {
        if (p) {
          setProgress({
            ...DEFAULT_PROGRESS,
            ...p,
            bestCombo: (p as any).bestCombo ?? 0,
            wrongCases: (p as any).wrongCases ?? [],
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const persistProgress = useCallback((p: DossierProgress) => {
    const uid = auth.currentUser?.uid;
    if (uid) saveDossierProgress(uid, p as any).catch(() => {});
  }, []);

  // ── Navigation ──
  const openCollection = useCallback(() => setScreen('collection'), []);
  const openFiche = useCallback((ficheId: string) => {
    setSelectedFicheId(ficheId);
    setScreen('fiche');
  }, []);
  const goHub = useCallback(() => {
    setScreen('hub');
    setPlayState(null);
    setSessionSummary(null);
    setSessionCorrect(0);
    setSessionXP(0);
    setSessionMaxCombo(0);
    setSessionPlayedIds([]);
  }, []);
  const goBack = useCallback(() => {
    if (screen === 'fiche') setScreen('collection');
    else if (screen === 'session_summary') goHub();
    else if (screen === 'collection') setScreen('hub');
    else if (screen === 'playing' || screen === 'reveal') goHub();
    else setScreen('hub');
  }, [screen, goHub]);

  // ── Internal: launch a case in a given mode ──
  const launchCase = useCallback((mode: GameMode, dossier: Dossier, caseIndex: number, comboCount: number, casesPlayedInSession: number) => {
    const currentCase = dossier.cases[caseIndex];
    setPlayState({
      mode,
      dossier,
      caseIndex,
      currentCase,
      comboCount,
      casesPlayedInSession,
      revealedIndices: 1,
      answered: false,
      correct: false,
      xpEarned: 0,
      fauxAmisAnswers: { a: null, b: null },
      detailAnswered: null,
    });
    setScreen('playing');
  }, []);

  // ── Public: start each mode ──

  // Shared reset helper so "start daily" and "start entrainement" don't drift.
  const resetSessionAccumulators = useCallback(() => {
    setSessionCorrect(0);
    setSessionXP(0);
    setSessionMaxCombo(0);
    setSessionPlayedIds([]);
  }, []);

  const startEntrainement = useCallback(() => {
    resetSessionAccumulators();
    const pick = pickSmartCase(progress.completedCases, progress.wrongCases);
    if (pick) launchCase('entrainement', pick.dossier, pick.caseIndex, 0, 0);
  }, [progress.completedCases, progress.wrongCases, launchCase, resetSessionAccumulators]);

  // Daily mission = 3 cases back-to-back with combo bonus + streak.
  // Uses pickSmartCase (personalised) rather than a deterministic same-for-all
  // case, so each user gets fresh variety + priority to their "wrong" pool.
  const startDaily = useCallback(() => {
    // Defensive guard: if the daily was already completed today, ignore.
    // (The UI already disables the button, but this prevents a replay on edge cases.)
    const today = getTodayString();
    if (progress.dailyCompleted && progress.dailyLastDate === today) return;
    resetSessionAccumulators();
    const pick = pickSmartCase(progress.completedCases, progress.wrongCases);
    if (pick) launchCase('daily', pick.dossier, pick.caseIndex, 0, 0);
  }, [progress.dailyCompleted, progress.dailyLastDate, progress.completedCases, progress.wrongCases, launchCase, resetSessionAccumulators]);

  const isDailyAvailable = useCallback((): boolean => {
    const today = getTodayString();
    return !(progress.dailyCompleted && progress.dailyLastDate === today);
  }, [progress]);

  // ── Enquête: reveal next indice ──
  const revealNextIndice = useCallback(() => {
    setPlayState(prev => {
      if (!prev || prev.currentCase.format !== 'enquete') return prev;
      const maxIndices = (prev.currentCase as any).indices.length;
      return { ...prev, revealedIndices: Math.min(prev.revealedIndices + 1, maxIndices) };
    });
  }, []);

  // ── Submit answer ──
  const submitAnswer = useCallback((answerValue: number | string) => {
    setPlayState(prev => {
      if (!prev || prev.answered) return prev;
      const c = prev.currentCase;
      let correct = false;
      let xpEarned = 0;
      if (c.format === 'enquete') {
        correct = answerValue === c.answer;
        const xpTable = c.xpValues;
        xpEarned = correct ? xpTable[Math.min(prev.revealedIndices - 1, xpTable.length - 1)] : 0;
      } else if (c.format === 'citation') {
        correct = answerValue === c.answer;
        xpEarned = correct ? 300 : 0;
      } else if (c.format === 'detail') {
        correct = answerValue === c.answer;
        xpEarned = correct ? c.xp : 0;
      }
      return { ...prev, answered: true, correct, xpEarned };
    });
  }, []);

  const submitFauxAmis = useCallback((side: 'a' | 'b', typeNum: number) => {
    setPlayState(prev => {
      if (!prev || prev.currentCase.format !== 'faux_amis') return prev;
      const newAnswers = { ...prev.fauxAmisAnswers, [side]: typeNum };
      const c = prev.currentCase;
      const bothDone = newAnswers.a !== null && newAnswers.b !== null;
      if (bothDone) {
        const correct = newAnswers.a === c.typeA && newAnswers.b === c.typeB;
        return { ...prev, fauxAmisAnswers: newAnswers, answered: true, correct, xpEarned: correct ? c.xp : Math.round(c.xp * 0.4) };
      }
      return { ...prev, fauxAmisAnswers: newAnswers };
    });
  }, []);

  // ── Confirm → reveal screen, persist progress, update combo/streak ──
  const confirmAndReveal = useCallback(() => {
    if (!playState?.answered) return;
    setScreen('reveal');

    const c = playState.currentCase;
    const ficheId = (c as any).ficheId as string | undefined;
    const isCorrect = playState.correct;
    const xpForThis = playState.xpEarned;

    // Update session combo
    const newCombo = isCorrect ? playState.comboCount + 1 : 0;
    setPlayState(prev => prev ? { ...prev, comboCount: newCombo } : prev);

    // Track session accumulators
    if (isCorrect) setSessionCorrect(n => n + 1);
    setSessionXP(n => n + xpForThis);
    setSessionMaxCombo(n => Math.max(n, newCombo));
    setSessionPlayedIds(arr => [...arr, c.id]);

    // Persist progress
    setProgress(prev => {
      // Mastery tracking:
      //  - On correct: add to completedCases, REMOVE from wrongCases (redeemed).
      //  - On wrong:   add to wrongCases (if not already), do NOT add to
      //    completedCases — so it stays in the "to redo" tier of pickSmartCase.
      let newCompleted = prev.completedCases;
      let newWrong = prev.wrongCases;
      if (isCorrect) {
        if (!newCompleted.includes(c.id)) newCompleted = [...newCompleted, c.id];
        if (newWrong.includes(c.id)) newWrong = newWrong.filter(id => id !== c.id);
      } else {
        if (!newWrong.includes(c.id)) newWrong = [...newWrong, c.id];
      }
      const newFiches =
        ficheId && isCorrect && !prev.unlockedFiches.includes(ficheId)
          ? [...prev.unlockedFiches, ficheId]
          : prev.unlockedFiches;
      const newXP = prev.totalXP + xpForThis;

      // NOTE: daily streak + dailyCompleted are NOT updated here anymore.
      // They are bumped once at the END of the 3-case daily session inside
      // `nextCase`, because the user requested streak to count as soon as
      // the mission is attempted (even if some answers are wrong).

      const newBestCombo = Math.max(prev.bestCombo, newCombo);

      const updated: DossierProgress = {
        completedCases: newCompleted,
        wrongCases: newWrong,
        unlockedFiches: newFiches,
        totalXP: newXP,
        dailyLastDate: prev.dailyLastDate,
        dailyCompleted: prev.dailyCompleted,
        streak: prev.streak,
        bestCombo: newBestCombo,
      };
      persistProgress(updated);
      return updated;
    });

    if (xpForThis > 0) setXpGainAnim(xpForThis);
  }, [playState, persistProgress]);

  // ── Next case in session, or end session ──
  // Daily mission = 3 cases with combo bonus + streak.
  // Entrainement = continuous, no limit.
  const nextCase = useCallback(() => {
    if (!playState) { goHub(); return; }
    const newPlayedCount = playState.casesPlayedInSession + 1;

    // Daily mission ends after 3 cases — compute combo bonus, bump streak, show summary.
    if (playState.mode === 'daily' && newPlayedCount >= 3) {
      // Combo bonus tiered on max combo reached during the session.
      // 3/3 correct → big bonus. 2 in a row → small bonus. Else nothing.
      // Rationale: the streak itself rewards *showing up*; the combo bonus
      // rewards *performing well*. "moins de points" if you miss.
      const comboBonus = sessionMaxCombo >= 3 ? 200 : sessionMaxCombo === 2 ? 50 : 0;

      // Update progress atomically:
      //  - Add combo bonus to XP
      //  - Mark daily as completed for today (disables the button)
      //  - Bump streak: +1 if previous completion was yesterday, else restart at 1.
      //    Streak bumps REGARDLESS of correct count — the ritual is what matters.
      const today = getTodayString();
      setProgress(prev => {
        // Guard: if somehow we already bumped today, don't double-bump.
        if (prev.dailyCompleted && prev.dailyLastDate === today) {
          const updated = { ...prev, totalXP: prev.totalXP + comboBonus };
          persistProgress(updated);
          return updated;
        }
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        const newStreak = prev.dailyLastDate === yesterdayStr ? prev.streak + 1 : 1;
        const updated: DossierProgress = {
          ...prev,
          totalXP: prev.totalXP + comboBonus,
          dailyCompleted: true,
          dailyLastDate: today,
          streak: newStreak,
        };
        persistProgress(updated);
        return updated;
      });

      setSessionSummary({
        mode: 'daily',
        cases: 3,
        correct: sessionCorrect,
        xpTotal: sessionXP + comboBonus,
        comboBonus,
        bestCombo: sessionMaxCombo,
      });
      setScreen('session_summary');
      setPlayState(null);
      return;
    }

    // Otherwise (daily < 3, or entrainement): pick next case, avoiding the ones
    // already played in the current session so the user doesn't repeat.
    const pick = pickSmartCase(progress.completedCases, progress.wrongCases, sessionPlayedIds);
    if (!pick) { goHub(); return; }
    launchCase(playState.mode, pick.dossier, pick.caseIndex, playState.comboCount, newPlayedCount);
  }, [playState, sessionMaxCombo, sessionCorrect, sessionXP, sessionPlayedIds, progress.completedCases, progress.wrongCases, launchCase, persistProgress, goHub]);

  // Quit the current session early (returns to hub)
  const quitSession = useCallback(() => {
    goHub();
  }, [goHub]);

  return {
    // State
    screen, progress, playState, sessionSummary, selectedFicheId, loading, xpGainAnim,
    // Navigation
    openCollection, openFiche, goHub, goBack,
    // Modes (rapide was merged into daily — daily now runs 3 cases)
    startEntrainement, startDaily, isDailyAvailable,
    // Gameplay
    revealNextIndice, submitAnswer, submitFauxAmis, confirmAndReveal, nextCase, quitSession,
    // Helpers
    getRankInfo,
    // Anim
    clearXpAnim: () => setXpGainAnim(null),
  };
}
