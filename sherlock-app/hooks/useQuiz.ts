import { useState, useCallback, useMemo } from 'react';
import { QUIZ_ENFANT, QUIZ_ADO, QUIZ_ADULTE, QuizQuestion, QuizMode } from '../constants/data';
import { getTopType } from '../utils/radar';

const QUIZ_MAP: Record<QuizMode, QuizQuestion[]> = {
  enfant: QUIZ_ENFANT,
  ado: QUIZ_ADO,
  adulte: QUIZ_ADULTE,
};

export function useQuiz() {
  const [mode, setMode] = useState<QuizMode | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Record<number, number>>(() => {
    const s: Record<number, number> = {};
    for (let i = 1; i <= 9; i++) s[i] = 0;
    return s;
  });

  const questions = mode ? QUIZ_MAP[mode] : [];
  const isComplete = mode !== null && currentQuestion >= questions.length;
  const topType = getTopType(scores);
  const totalPoints = Object.values(scores).reduce((a, b) => a + b, 0);

  const sortedScores = useMemo(() =>
    Object.entries(scores)
      .map(([t, s]) => ({ type: parseInt(t), score: s }))
      .sort((a, b) => b.score - a.score),
    [scores]
  );

  const startQuiz = useCallback((selectedMode: QuizMode) => {
    setMode(selectedMode);
    setCurrentQuestion(0);
    const s: Record<number, number> = {};
    for (let i = 1; i <= 9; i++) s[i] = 0;
    setScores(s);
  }, []);

  const selectAnswer = useCallback((qIdx: number, aIdx: number) => {
    const q = questions[qIdx] as QuizQuestion;

    if (q.type !== 'choice' || !q.a) {
      setCurrentQuestion(prev => prev + 1);
      return;
    }

    const chosen = q.a[aIdx];

    if (chosen.scores) {
      setScores(prev => {
        const next = { ...prev };
        Object.entries(chosen.scores).forEach(([type, weight]) => {
          next[parseInt(type)] += weight as number;
        });
        return next;
      });
    }

    setCurrentQuestion(prev => prev + 1);
  }, [questions]);

  const selectSlider = useCallback((qIdx: number, value: number) => {
    const q = questions[qIdx] as QuizQuestion;

    if (q.type !== 'slider' || !q.sliderScores) {
      setCurrentQuestion(prev => prev + 1);
      return;
    }

    const { low, high } = q.sliderScores;

    setScores(prev => {
      const next = { ...prev };

      if (value <= -2) {
        Object.entries(low).forEach(([type, weight]) => {
          next[parseInt(type)] += weight as number;
        });
      } else if (value >= 2) {
        Object.entries(high).forEach(([type, weight]) => {
          next[parseInt(type)] += weight as number;
        });
      } else {
        Object.entries(low).forEach(([type, weight]) => {
          next[parseInt(type)] += (weight as number) * 0.5;
        });
        Object.entries(high).forEach(([type, weight]) => {
          next[parseInt(type)] += (weight as number) * 0.5;
        });
      }

      return next;
    });

    setCurrentQuestion(prev => prev + 1);
  }, [questions]);

  const reset = useCallback(() => {
    setMode(null);
    setCurrentQuestion(0);
    const s: Record<number, number> = {};
    for (let i = 1; i <= 9; i++) s[i] = 0;
    setScores(s);
  }, []);

  // Wing detection
  let wingType: number | null = null;
  if (sortedScores.length > 1 && sortedScores[1].score > 0) {
    const second = sortedScores[1].type;
    const diff = Math.abs(topType - second);
    if (diff === 1 || diff === 8) wingType = second;
  }

  return {
    mode,
    currentQuestion,
    questions,
    scores,
    isComplete,
    topType,
    totalPoints,
    sortedScores,
    wingType,
    startQuiz,
    selectAnswer,
    selectSlider,
    reset,
  };
}
