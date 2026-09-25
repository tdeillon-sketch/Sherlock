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
  // Legacy fields from the removed "Mission du jour" (daily 3-case session).
  // Kept so progress saved by older versions loads and saves back unchanged.
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
  | 'collection'
  | 'fiche';

// Historical note: there used to be a 'rapide' mode, then a 'daily' mission
// (3 cases, combo bonus, streak). Both were removed; only the continuous
// training mode remains.
export type GameMode = 'entrainement';

export interface PlayState {
  mode: GameMode;
  dossier: Dossier;        // dossier the case belongs to (for back-compat with case rendering)
  caseIndex: number;       // index within dossier
  currentCase: DossierCase;
  // Session-level (continuous training)
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
  const [selectedFicheId, setSelectedFicheId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [xpGainAnim, setXpGainAnim] = useState<number | null>(null);

  // Cases already played in the current session (so the next pick avoids them)
  const [sessionPlayedIds, setSessionPlayedIds] = useState<string[]>([]);
  // Rank-up celebration: set to the new rank when XP crosses a threshold.
  const [rankUp, setRankUp] = useState<RankInfo['current'] | null>(null);

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
            bestCombo: p.bestCombo ?? 0,
            wrongCases: p.wrongCases ?? [],
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const persistProgress = useCallback((p: DossierProgress) => {
    const uid = auth.currentUser?.uid;
    if (uid) saveDossierProgress(uid, p).catch(() => {});
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
    setSessionPlayedIds([]);
  }, []);
  const goBack = useCallback(() => {
    if (screen === 'fiche') setScreen('collection');
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

  // ── Public: start training ──
  const startEntrainement = useCallback(() => {
    setSessionPlayedIds([]);
    const pick = pickSmartCase(progress.completedCases, progress.wrongCases);
    if (pick) launchCase('entrainement', pick.dossier, pick.caseIndex, 0, 0);
  }, [progress.completedCases, progress.wrongCases, launchCase]);

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

  // ── Confirm → reveal screen, persist progress, update combo ──
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
      // Detect a rank promotion to trigger a celebration moment.
      if (xpForThis > 0 && getRankInfo(newXP).current.id > getRankInfo(prev.totalXP).current.id) {
        setRankUp(getRankInfo(newXP).current);
      }

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

  // ── Next case (training is continuous) ──
  // Picks the next case, avoiding the ones already played in this session.
  const nextCase = useCallback(() => {
    if (!playState) { goHub(); return; }
    const pick = pickSmartCase(progress.completedCases, progress.wrongCases, sessionPlayedIds);
    if (!pick) { goHub(); return; }
    launchCase(playState.mode, pick.dossier, pick.caseIndex, playState.comboCount, playState.casesPlayedInSession + 1);
  }, [playState, sessionPlayedIds, progress.completedCases, progress.wrongCases, launchCase, goHub]);

  // Quit the current session early (returns to hub)
  const quitSession = useCallback(() => {
    goHub();
  }, [goHub]);

  return {
    // State
    screen, progress, playState, selectedFicheId, loading, xpGainAnim,
    // Navigation
    openCollection, openFiche, goHub, goBack,
    // Mode
    startEntrainement,
    // Gameplay
    revealNextIndice, submitAnswer, submitFauxAmis, confirmAndReveal, nextCase, quitSession,
    // Helpers
    getRankInfo,
    // Rank-up celebration
    rankUp,
    clearRankUp: () => setRankUp(null),
    // Anim
    clearXpAnim: () => setXpGainAnim(null),
  };
}
