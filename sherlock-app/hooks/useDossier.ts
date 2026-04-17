import { useState, useCallback, useEffect } from 'react';
import { DOSSIERS, RANKS, type DossierCase, type Dossier } from '../constants/dossiers';
import { auth } from '../constants/firebase';
import { saveDossierProgress, loadDossierProgress } from '../constants/firebase';

// ── Types ──────────────────────────────────────────────────────

export interface DossierProgress {
  completedCases: string[];
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
  | 'session_summary'  // After "rapide" 3 cases done
  | 'collection'
  | 'fiche';

export type GameMode = 'rapide' | 'entrainement' | 'daily';

export interface PlayState {
  mode: GameMode;
  dossier: Dossier;        // dossier the case belongs to (for back-compat with case rendering)
  caseIndex: number;       // index within dossier
  currentCase: DossierCase;
  // Session-level (rapide/entrainement)
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

// Session summary (after rapide mode 3 cases)
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

// Pick a random case, preferring not-yet-completed ones.
function pickSmartCase(completed: string[], avoidIds: string[] = []): { dossier: Dossier; caseIndex: number } | null {
  const all = getAllCases();
  const avoid = new Set(avoidIds);
  const newCases = all.filter(({ dossier, caseIndex }) =>
    !completed.includes(dossier.cases[caseIndex].id) && !avoid.has(dossier.cases[caseIndex].id)
  );
  const pool = newCases.length > 0
    ? newCases
    : all.filter(({ dossier, caseIndex }) => !avoid.has(dossier.cases[caseIndex].id));
  if (pool.length === 0) return null;
  const pick = pool[Math.floor(Math.random() * pool.length)];
  return pick;
}

// Deterministic daily case based on the date (same case for everyone, every day)
function getDeterministicDailyCase(): { dossier: Dossier; caseIndex: number } | null {
  const all = getAllCases();
  const dayNum = Math.floor(Date.now() / 86400000);
  return all[dayNum % all.length] ?? null;
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

  // Session accumulators (for rapide mode)
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
  const startRapide = useCallback(() => {
    setSessionCorrect(0);
    setSessionXP(0);
    setSessionMaxCombo(0);
    setSessionPlayedIds([]);
    const pick = pickSmartCase(progress.completedCases);
    if (pick) launchCase('rapide', pick.dossier, pick.caseIndex, 0, 0);
  }, [progress.completedCases, launchCase]);

  const startEntrainement = useCallback(() => {
    setSessionCorrect(0);
    setSessionXP(0);
    setSessionMaxCombo(0);
    setSessionPlayedIds([]);
    const pick = pickSmartCase(progress.completedCases);
    if (pick) launchCase('entrainement', pick.dossier, pick.caseIndex, 0, 0);
  }, [progress.completedCases, launchCase]);

  const startDaily = useCallback(() => {
    const pick = getDeterministicDailyCase();
    if (pick) launchCase('daily', pick.dossier, pick.caseIndex, 0, 0);
  }, [launchCase]);

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
      const newCompleted = prev.completedCases.includes(c.id)
        ? prev.completedCases
        : [...prev.completedCases, c.id];
      const newFiches =
        ficheId && isCorrect && !prev.unlockedFiches.includes(ficheId)
          ? [...prev.unlockedFiches, ficheId]
          : prev.unlockedFiches;
      const newXP = prev.totalXP + xpForThis;

      // Streak handling — only update on daily mode success
      let newStreak = prev.streak;
      let newDailyCompleted = prev.dailyCompleted;
      let newDailyLastDate = prev.dailyLastDate;
      const today = getTodayString();
      if (playState.mode === 'daily' && isCorrect && !prev.dailyCompleted) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        newStreak = prev.dailyLastDate === yesterdayStr ? prev.streak + 1 : 1;
        newDailyCompleted = true;
        newDailyLastDate = today;
      }

      const newBestCombo = Math.max(prev.bestCombo, newCombo);

      const updated: DossierProgress = {
        completedCases: newCompleted,
        unlockedFiches: newFiches,
        totalXP: newXP,
        dailyLastDate: newDailyLastDate,
        dailyCompleted: newDailyCompleted,
        streak: newStreak,
        bestCombo: newBestCombo,
      };
      persistProgress(updated);
      return updated;
    });

    if (xpForThis > 0) setXpGainAnim(xpForThis);
  }, [playState, persistProgress]);

  // ── Next case in session (rapide/entrainement), or end session ──
  const nextCase = useCallback(() => {
    if (!playState) { goHub(); return; }
    const newPlayedCount = playState.casesPlayedInSession + 1;

    // Rapide ends after 3 cases
    if (playState.mode === 'rapide' && newPlayedCount >= 3) {
      const comboBonus = sessionMaxCombo >= 3 ? 200 : sessionMaxCombo === 2 ? 50 : 0;
      // Apply combo bonus to XP
      if (comboBonus > 0) {
        setProgress(prev => {
          const updated = { ...prev, totalXP: prev.totalXP + comboBonus };
          persistProgress(updated);
          return updated;
        });
      }
      setSessionSummary({
        mode: 'rapide',
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

    // Daily ends after 1 case
    if (playState.mode === 'daily') { goHub(); return; }

    // Entrainement or rapide < 3: pick next case (avoid already-played in this session)
    const pick = pickSmartCase(progress.completedCases, sessionPlayedIds);
    if (!pick) { goHub(); return; }
    launchCase(playState.mode, pick.dossier, pick.caseIndex, playState.comboCount, newPlayedCount);
  }, [playState, sessionMaxCombo, sessionCorrect, sessionXP, sessionPlayedIds, progress.completedCases, launchCase, persistProgress, goHub]);

  // Quit the current session early (returns to hub)
  const quitSession = useCallback(() => {
    goHub();
  }, [goHub]);

  return {
    // State
    screen, progress, playState, sessionSummary, selectedFicheId, loading, xpGainAnim,
    // Navigation
    openCollection, openFiche, goHub, goBack,
    // Modes
    startRapide, startEntrainement, startDaily, isDailyAvailable,
    // Gameplay
    revealNextIndice, submitAnswer, submitFauxAmis, confirmAndReveal, nextCase, quitSession,
    // Helpers
    getRankInfo,
    // Anim
    clearXpAnim: () => setXpGainAnim(null),
  };
}
