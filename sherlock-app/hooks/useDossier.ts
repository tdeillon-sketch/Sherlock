import { useState, useCallback, useEffect, useRef } from 'react';
import { DOSSIERS, RANKS, type DossierCase, type Dossier } from '../constants/dossiers';
import { auth } from '../constants/firebase';
import { saveDossierProgress, loadDossierProgress } from '../constants/firebase';

// ── Types ──────────────────────────────────────────────────────

export interface DossierProgress {
  completedCases: string[];   // case ids
  unlockedFiches: string[];   // fiche ids
  totalXP: number;
  dailyLastDate: string | null;
  dailyCompleted: boolean;
  streak: number;
}

export interface RankInfo {
  current: { id: number; title: string; emoji: string; xpRequired: number };
  next: { id: number; title: string; emoji: string; xpRequired: number } | null;
  progress: number; // 0-1 toward next rank
}

export type GameScreen =
  | 'hub'          // Home — rangs + dossiers
  | 'dossier'      // Liste des cas d'un dossier
  | 'playing'      // Cas en cours
  | 'reveal'       // Réponse + XP
  | 'collection'   // Toutes les fiches
  | 'fiche';       // Fiche détail

export interface PlayState {
  dossier: Dossier;
  caseIndex: number;
  currentCase: DossierCase;
  // Enquête-specific
  revealedIndices: number;
  // answer state
  answered: boolean;
  correct: boolean;
  xpEarned: number;
  // faux-amis specific
  fauxAmisAnswers: { a: number | null; b: number | null };
  // detail specific
  detailAnswered: number | null;
}

// ── Initial progress ──────────────────────────────────────────

const DEFAULT_PROGRESS: DossierProgress = {
  completedCases: [],
  unlockedFiches: [],
  totalXP: 0,
  dailyLastDate: null,
  dailyCompleted: false,
  streak: 0,
};

// ── Helpers ───────────────────────────────────────────────────

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

export function getDossierCompletion(dossierId: string, completed: string[]): number {
  const dossier = DOSSIERS.find(d => d.id === dossierId);
  if (!dossier) return 0;
  const done = dossier.cases.filter(c => completed.includes(c.id)).length;
  return done / dossier.cases.length;
}

function getTodayString(): string {
  return new Date().toISOString().split('T')[0];
}

// ── Hook ──────────────────────────────────────────────────────

export function useDossier() {
  const [screen, setScreen] = useState<GameScreen>('hub');
  const [progress, setProgress] = useState<DossierProgress>(DEFAULT_PROGRESS);
  const [playState, setPlayState] = useState<PlayState | null>(null);
  const [selectedDossier, setSelectedDossier] = useState<Dossier | null>(null);
  const [selectedFicheId, setSelectedFicheId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // XP gain animation trigger
  const [xpGainAnim, setXpGainAnim] = useState<number | null>(null);

  // Load progress from Firebase on mount
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) { setLoading(false); return; }
    loadDossierProgress(uid)
      .then(p => { if (p) setProgress(p); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Persist progress
  const persistProgress = useCallback((p: DossierProgress) => {
    const uid = auth.currentUser?.uid;
    if (uid) saveDossierProgress(uid, p).catch(() => {});
  }, []);

  // ── Navigation ───────────────────────────────────────────────

  const openDossier = useCallback((dossier: Dossier) => {
    setSelectedDossier(dossier);
    setScreen('dossier');
  }, []);

  const openCollection = useCallback(() => setScreen('collection'), []);

  const openFiche = useCallback((ficheId: string) => {
    setSelectedFicheId(ficheId);
    setScreen('fiche');
  }, []);

  const goHub = useCallback(() => {
    setScreen('hub');
    setPlayState(null);
    setSelectedDossier(null);
  }, []);

  const goBack = useCallback(() => {
    if (screen === 'fiche') {
      setScreen(selectedDossier ? 'dossier' : 'collection');
    } else if (screen === 'dossier' || screen === 'collection') {
      setScreen('hub');
    } else if (screen === 'playing' || screen === 'reveal') {
      if (selectedDossier) setScreen('dossier');
      else setScreen('hub');
    } else {
      setScreen('hub');
    }
  }, [screen, selectedDossier]);

  // ── Start a case ─────────────────────────────────────────────

  const startCase = useCallback((dossier: Dossier, caseIndex: number) => {
    const currentCase = dossier.cases[caseIndex];
    setPlayState({
      dossier,
      caseIndex,
      currentCase,
      revealedIndices: 1,
      answered: false,
      correct: false,
      xpEarned: 0,
      fauxAmisAnswers: { a: null, b: null },
      detailAnswered: null,
    });
    setScreen('playing');
  }, []);

  // ── Enquête: reveal next indice ───────────────────────────────

  const revealNextIndice = useCallback(() => {
    setPlayState(prev => {
      if (!prev || prev.currentCase.format !== 'enquete') return prev;
      const maxIndices = (prev.currentCase as any).indices.length;
      return { ...prev, revealedIndices: Math.min(prev.revealedIndices + 1, maxIndices) };
    });
  }, []);

  // ── Submit answer (generic) ───────────────────────────────────

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

  // ── Faux-amis: submit one side at a time ─────────────────────

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

  // ── Confirm answer → go to reveal ────────────────────────────

  const confirmAndReveal = useCallback(() => {
    if (!playState?.answered) return;
    setScreen('reveal');

    // Update progress
    const c = playState.currentCase;
    const ficheId = (c as any).ficheId as string | undefined;

    setProgress(prev => {
      const newCompleted = prev.completedCases.includes(c.id)
        ? prev.completedCases
        : [...prev.completedCases, c.id];

      const newFiches =
        ficheId && !prev.unlockedFiches.includes(ficheId)
          ? [...prev.unlockedFiches, ficheId]
          : prev.unlockedFiches;

      const newXP = prev.totalXP + playState.xpEarned;

      // Streak
      const today = getTodayString();
      let newStreak = prev.streak;
      let newDailyCompleted = prev.dailyCompleted;
      if (!prev.dailyCompleted && prev.dailyLastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        newStreak = prev.dailyLastDate === yesterdayStr ? prev.streak + 1 : 1;
        newDailyCompleted = true;
      }

      const updated: DossierProgress = {
        completedCases: newCompleted,
        unlockedFiches: newFiches,
        totalXP: newXP,
        dailyLastDate: today,
        dailyCompleted: newDailyCompleted,
        streak: newStreak,
      };
      persistProgress(updated);
      return updated;
    });

    if (playState.xpEarned > 0) setXpGainAnim(playState.xpEarned);
  }, [playState, persistProgress]);

  // ── Next case or back to dossier ─────────────────────────────

  const nextCase = useCallback(() => {
    if (!playState) return;
    const { dossier, caseIndex } = playState;
    const nextIndex = caseIndex + 1;
    if (nextIndex < dossier.cases.length) {
      startCase(dossier, nextIndex);
    } else {
      setSelectedDossier(dossier);
      setScreen('dossier');
      setPlayState(null);
    }
  }, [playState, startCase]);

  // ── Daily challenge ───────────────────────────────────────────

  const getDailyCase = useCallback((): { dossier: Dossier; caseIndex: number } | null => {
    const today = getTodayString();
    if (progress.dailyCompleted && progress.dailyLastDate === today) return null;
    // Pick a deterministic case based on today's date
    const allCases = DOSSIERS.flatMap((d, di) => d.cases.map((c, ci) => ({ dossier: d, caseIndex: ci })));
    const dayNum = Math.floor(Date.now() / 86400000);
    const pick = allCases[dayNum % allCases.length];
    return pick;
  }, [progress]);

  return {
    // State
    screen, progress, playState, selectedDossier, selectedFicheId, loading, xpGainAnim,
    // Navigation
    openDossier, openCollection, openFiche, goHub, goBack,
    // Gameplay
    startCase, revealNextIndice, submitAnswer, submitFauxAmis, confirmAndReveal, nextCase,
    // Helpers
    getRankInfo, getDossierCompletion, getDailyCase,
    // Anim reset
    clearXpAnim: () => setXpGainAnim(null),
  };
}
