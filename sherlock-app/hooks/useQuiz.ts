import { useState, useCallback, useMemo, useEffect } from 'react';
import {
  QUIZ_ENFANT, QUIZ_ADO, QUIZ_ADULTE, DISAMBIG_POOL,
  QuizQuestion, QuizMode, DisambigQuestion,
} from '../constants/data';
import { getTopType } from '../utils/radar';
import {
  auth, loadChildProfiles, saveChildProfiles,
  type ChildProfile, type ChildProfileEntry,
} from '../constants/firebase';

const QUIZ_MAP: Record<QuizMode, QuizQuestion[]> = {
  enfant: QUIZ_ENFANT,
  ado: QUIZ_ADO,
  adulte: QUIZ_ADULTE,
};

// ── Quiz state machine ──
export type QuizPhase =
  | 'select_mode'         // pick enfant/ado/adulte
  | 'questions'           // main 18-20 questions
  | 'disambiguation'      // 3 targeted questions if ambiguous
  | 'result'              // rich result card
  | 'save_profile'        // ask to name + save the child
  | 'history';            // view past results

export interface QuizResult {
  topType: number;
  topPercent: number;
  secondType: number;
  secondPercent: number;
  thirdType: number;
  thirdPercent: number;
  wingType: number | null;
  isAmbiguous: boolean;
  ambiguousPair: [number, number] | null;
  insight: string; // "Notre lecture"
}

const EMPTY_SCORES = (): Record<number, number> => {
  const s: Record<number, number> = {};
  for (let i = 1; i <= 9; i++) s[i] = 0;
  return s;
};

// Compute rich result from raw scores
function computeResult(scores: Record<number, number>): QuizResult {
  const sorted = Object.entries(scores)
    .map(([t, s]) => ({ type: parseInt(t), score: s }))
    .sort((a, b) => b.score - a.score);
  const total = Math.max(1, sorted.reduce((a, b) => a + b.score, 0));

  const top = sorted[0];
  const second = sorted[1];
  const third = sorted[2];
  const topPercent = Math.round((top.score / total) * 100);
  const secondPercent = Math.round((second.score / total) * 100);
  const thirdPercent = Math.round((third.score / total) * 100);

  // Wing detection: 2nd-place type is adjacent
  let wingType: number | null = null;
  if (second.score > 0) {
    const diff = Math.abs(top.type - second.type);
    if (diff === 1 || diff === 8) wingType = second.type;
  }

  // Ambiguity: top 2 within 8 percentage points
  const isAmbiguous = (topPercent - secondPercent) < 8 && second.score > 0;
  const ambiguousPair: [number, number] | null = isAmbiguous ? [top.type, second.type] : null;

  // "Notre lecture" insight
  let insight = '';
  if (topPercent >= 40) {
    insight = `Le profil ${top.type} se dégage très clairement.`;
  } else if (topPercent >= 28) {
    insight = `Le profil ${top.type} domine, mais le profil ${second.type} colore aussi fortement la personnalité.`;
  } else {
    insight = `Profil composite : les types ${top.type}, ${second.type} et ${third.type} se mélangent. Le quiz permet d'orienter, pas de trancher.`;
  }
  if (wingType) {
    insight += ` La présence forte du ${wingType} suggère une aile ${top.type}w${wingType}.`;
  }

  return {
    topType: top.type, topPercent,
    secondType: second.type, secondPercent,
    thirdType: third.type, thirdPercent,
    wingType, isAmbiguous, ambiguousPair, insight,
  };
}

// Pick up to N disambig questions for a given pair (in either order)
function pickDisambigQuestions(pair: [number, number], n = 3): DisambigQuestion[] {
  const [a, b] = pair;
  const matching = DISAMBIG_POOL.filter(q =>
    (q.forTypes[0] === a && q.forTypes[1] === b) ||
    (q.forTypes[0] === b && q.forTypes[1] === a)
  );
  if (matching.length === 0) return [];
  // Shuffle and pick n
  const shuffled = [...matching].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

export function useQuiz() {
  const [phase, setPhase] = useState<QuizPhase>('select_mode');
  const [mode, setMode] = useState<QuizMode | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<number, number>>(EMPTY_SCORES);

  // Disambiguation state
  const [disambigQuestions, setDisambigQuestions] = useState<DisambigQuestion[]>([]);
  const [disambigIndex, setDisambigIndex] = useState(0);

  // Open question (bonus)
  const [openNote, setOpenNote] = useState<string>('');

  // Child profiles (history)
  const [childProfiles, setChildProfiles] = useState<ChildProfile[]>([]);
  const [profilesLoaded, setProfilesLoaded] = useState(false);

  // Load profiles on mount
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) { setProfilesLoaded(true); return; }
    loadChildProfiles(uid)
      .then(list => setChildProfiles(list))
      .catch(() => {})
      .finally(() => setProfilesLoaded(true));
  }, []);

  const questions = mode ? QUIZ_MAP[mode] : [];
  const totalPoints = Object.values(scores).reduce((a, b) => a + b, 0);

  const sortedScores = useMemo(() =>
    Object.entries(scores)
      .map(([t, s]) => ({ type: parseInt(t), score: s }))
      .sort((a, b) => b.score - a.score),
    [scores]
  );

  const result = useMemo(() => computeResult(scores), [scores]);

  // ── Phase 1: select mode ──
  const startQuiz = useCallback((selectedMode: QuizMode) => {
    setMode(selectedMode);
    setCurrentQuestion(0);
    setScores(EMPTY_SCORES());
    setDisambigQuestions([]);
    setDisambigIndex(0);
    setOpenNote('');
    setPhase('questions');
  }, []);

  // ── Phase 2: main questions ──
  const applyScores = useCallback((scoresDelta: Record<number, number>, multiplier = 1) => {
    setScores(prev => {
      const next = { ...prev };
      Object.entries(scoresDelta).forEach(([type, weight]) => {
        next[parseInt(type)] += (weight as number) * multiplier;
      });
      return next;
    });
  }, []);

  const advanceFromMain = useCallback(() => {
    setCurrentQuestion(prev => {
      const next = prev + 1;
      // Check end of main questions
      if (next >= questions.length) {
        // Compute current result to decide disambiguation
        const r = computeResult(scores);
        if (r.isAmbiguous && r.ambiguousPair) {
          const dq = pickDisambigQuestions(r.ambiguousPair, 3);
          if (dq.length > 0) {
            setDisambigQuestions(dq);
            setDisambigIndex(0);
            setPhase('disambiguation');
            return next;
          }
        }
        setPhase('result');
      }
      return next;
    });
  }, [questions.length, scores]);

  const selectAnswer = useCallback((qIdx: number, aIdx: number) => {
    const q = questions[qIdx];
    if (q?.type === 'choice' && q.a) {
      const chosen = q.a[aIdx];
      if (chosen?.scores) applyScores(chosen.scores);
    }
    advanceFromMain();
  }, [questions, applyScores, advanceFromMain]);

  const selectSlider = useCallback((qIdx: number, value: number) => {
    const q = questions[qIdx];
    if (q?.type === 'slider' && q.sliderScores) {
      const { low, high } = q.sliderScores;
      if (value <= -2) applyScores(low);
      else if (value >= 2) applyScores(high);
      else { applyScores(low, 0.5); applyScores(high, 0.5); }
    }
    advanceFromMain();
  }, [questions, applyScores, advanceFromMain]);

  // BONUS: "Je ne sais pas" — skip without scoring
  const skipQuestion = useCallback(() => {
    advanceFromMain();
  }, [advanceFromMain]);

  // ── Phase 3: disambiguation ──
  const answerDisambig = useCallback((favors: number) => {
    setScores(prev => ({ ...prev, [favors]: prev[favors] + 3 }));
    setDisambigIndex(prev => {
      const next = prev + 1;
      if (next >= disambigQuestions.length) {
        setPhase('result');
      }
      return next;
    });
  }, [disambigQuestions.length]);

  const skipDisambig = useCallback(() => {
    setDisambigIndex(prev => {
      const next = prev + 1;
      if (next >= disambigQuestions.length) setPhase('result');
      return next;
    });
  }, [disambigQuestions.length]);

  // ── Phase 4: actions on result ──
  const goToSaveProfile = useCallback(() => setPhase('save_profile'), []);
  const goToHistory = useCallback(() => setPhase('history'), []);
  const backToResult = useCallback(() => setPhase('result'), []);

  // Save child profile
  const saveChildResult = useCallback(async (childName: string, age?: number, existingProfileId?: string) => {
    const uid = auth.currentUser?.uid;
    if (!uid || !mode) return;
    const entry: ChildProfileEntry = {
      date: new Date().toISOString(),
      mode,
      topType: result.topType,
      topPercent: result.topPercent,
      secondType: result.secondType,
      secondPercent: result.secondPercent,
      wingType: result.wingType,
      scores,
      note: openNote || undefined,
    };

    let updated: ChildProfile[];
    if (existingProfileId) {
      updated = childProfiles.map(p =>
        p.id === existingProfileId
          ? { ...p, history: [...p.history, entry] }
          : p
      );
    } else {
      const newProfile: ChildProfile = {
        id: `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        name: childName.trim() || 'Sans nom',
        age,
        history: [entry],
      };
      updated = [...childProfiles, newProfile];
    }
    setChildProfiles(updated);
    await saveChildProfiles(uid, updated).catch(() => {});
  }, [mode, result, scores, openNote, childProfiles]);

  // Reset to beginning
  const reset = useCallback(() => {
    setMode(null);
    setCurrentQuestion(0);
    setScores(EMPTY_SCORES());
    setDisambigQuestions([]);
    setDisambigIndex(0);
    setOpenNote('');
    setPhase('select_mode');
  }, []);

  // For Duo Express: start a new quiz keeping previous result memory implicit
  const startNewQuizSameMode = useCallback(() => {
    if (!mode) return;
    startQuiz(mode);
  }, [mode, startQuiz]);

  // Legacy compat: topType/wingType/isComplete used by quiz.tsx
  const topType = result.topType;
  const wingType = result.wingType;
  const isComplete = phase === 'result';

  // Current disambig question
  const currentDisambig = disambigQuestions[disambigIndex] ?? null;

  return {
    // Phase
    phase, setPhase,
    // Mode
    mode,
    // Main quiz
    currentQuestion, questions, scores, totalPoints, sortedScores,
    // Result
    result, topType, wingType, isComplete,
    // Disambiguation
    currentDisambig, disambigIndex, disambigTotal: disambigQuestions.length,
    answerDisambig, skipDisambig,
    // Open note (bonus)
    openNote, setOpenNote,
    // History
    childProfiles, profilesLoaded,
    // Actions
    startQuiz, selectAnswer, selectSlider, skipQuestion,
    goToSaveProfile, goToHistory, backToResult,
    saveChildResult, startNewQuizSameMode, reset,
  };
}
