import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  Animated,
} from 'react-native';
import { colors, fonts, spacing, radius } from '../../constants/theme';
import {
  EASY_QUIZ,
  HARD_QUIZ,
  TYPE_NAMES,
} from '../../constants/celebrities';

type Mode = 'easy' | 'hard';
type Phase = 'question' | 'feedback' | 'end';

export default function CelebritiesScreen() {
  const [mode, setMode] = useState<Mode>('easy');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<Phase>('question');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const quiz = mode === 'easy' ? EASY_QUIZ : HARD_QUIZ;
  const total = quiz.length;
  const isEnd = phase === 'end';

  const animateFadeIn = useCallback(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    animateFadeIn();
  }, [currentIndex, mode, animateFadeIn]);

  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setPhase('question');
    setSelectedAnswer(null);
    setIsCorrect(false);
  }, []);

  const handleSwitchMode = useCallback((newMode: Mode) => {
    setMode(newMode);
    setCurrentIndex(0);
    setScore(0);
    setPhase('question');
    setSelectedAnswer(null);
    setIsCorrect(false);
  }, []);

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= total) {
      setPhase('end');
    } else {
      setCurrentIndex(prev => prev + 1);
      setPhase('question');
      setSelectedAnswer(null);
      setIsCorrect(false);
    }
  }, [currentIndex, total]);

  // --- Easy mode answer ---
  const handleEasyAnswer = useCallback(
    (optionIdx: number) => {
      if (phase !== 'question') return;
      const q = EASY_QUIZ[currentIndex];
      const correct = q.options[optionIdx].correct;
      setSelectedAnswer(optionIdx);
      setIsCorrect(correct);
      if (correct) setScore(prev => prev + 1);
      setPhase('feedback');
    },
    [currentIndex, phase],
  );

  // --- Hard mode answer ---
  const handleHardAnswer = useCallback(
    (typeNum: number) => {
      if (phase !== 'question') return;
      const q = HARD_QUIZ[currentIndex];
      const correct = typeNum === q.correctType;
      setSelectedAnswer(typeNum);
      setIsCorrect(correct);
      if (correct) setScore(prev => prev + 1);
      setPhase('feedback');
    },
    [currentIndex, phase],
  );

  // ========== RENDER ==========

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Personnalites connues</Text>
      <Text style={styles.subtitle}>
        Apprenez l'Enneagramme a travers des figures celebres
      </Text>

      {/* Mode buttons */}
      <View style={styles.modeRow}>
        <Pressable
          onPress={() => handleSwitchMode('easy')}
          style={[styles.modeBtn, mode === 'easy' && styles.modeBtnActive]}
        >
          <Text
            style={[
              styles.modeBtnText,
              mode === 'easy' && styles.modeBtnTextActive,
            ]}
          >
            Facile
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleSwitchMode('hard')}
          style={[styles.modeBtn, mode === 'hard' && styles.modeBtnActive]}
        >
          <Text
            style={[
              styles.modeBtnText,
              mode === 'hard' && styles.modeBtnTextActive,
            ]}
          >
            Difficile
          </Text>
        </Pressable>
      </View>

      {/* Score */}
      {!isEnd && (
        <Text style={styles.scoreText}>
          Score : {score} / {total}
        </Text>
      )}
    </View>
  );

  const renderEasyQuestion = () => {
    const q = EASY_QUIZ[currentIndex];
    return (
      <Animated.View style={[styles.questionCard, { opacity: fadeAnim }]}>
        <Text style={styles.questionCounter}>
          Question {currentIndex + 1} / {total}
        </Text>
        <Text style={styles.typeDesc}>
          Type {q.type} — {q.typeDesc}
        </Text>
        <Text style={styles.questionPrompt}>
          Quelle personnalite correspond a ce type ?
        </Text>

        <View style={styles.optionsContainer}>
          {q.options.map((opt, idx) => {
            const isFeedback = phase === 'feedback';
            const isSelected = selectedAnswer === idx;
            const optCorrect = opt.correct;

            let optStyle = styles.optionBtn;
            let textStyle = styles.optionText;
            if (isFeedback && optCorrect) {
              optStyle = { ...styles.optionBtn, ...styles.optionCorrect };
              textStyle = { ...styles.optionText, ...styles.optionTextCorrect };
            } else if (isFeedback && isSelected && !optCorrect) {
              optStyle = { ...styles.optionBtn, ...styles.optionWrong };
              textStyle = { ...styles.optionText, ...styles.optionTextWrong };
            }

            return (
              <Pressable
                key={idx}
                onPress={() => handleEasyAnswer(idx)}
                disabled={phase === 'feedback'}
                style={({ pressed }) => [
                  optStyle,
                  pressed && phase === 'question' && styles.optionPressed,
                ]}
              >
                <Text style={textStyle}>{opt.name}</Text>
              </Pressable>
            );
          })}
        </View>

        {phase === 'feedback' && (
          <View style={styles.feedbackBox}>
            <Text
              style={[
                styles.feedbackLabel,
                isCorrect ? styles.feedbackCorrect : styles.feedbackWrong,
              ]}
            >
              {isCorrect ? 'Bonne reponse !' : 'Mauvaise reponse'}
            </Text>
            <Text style={styles.explanationText}>{q.explanation}</Text>
            <Pressable
              onPress={handleNext}
              style={({ pressed }) => [
                styles.nextBtn,
                pressed && styles.nextBtnPressed,
              ]}
            >
              <Text style={styles.nextBtnText}>Suivant</Text>
            </Pressable>
          </View>
        )}
      </Animated.View>
    );
  };

  const renderHardQuestion = () => {
    const q = HARD_QUIZ[currentIndex];
    return (
      <Animated.View style={[styles.questionCard, { opacity: fadeAnim }]}>
        <Text style={styles.questionCounter}>
          Question {currentIndex + 1} / {total}
        </Text>
        <Text style={styles.celebrityName}>{q.celebrityName}</Text>
        <Text style={styles.bioText}>{q.bio}</Text>
        <Text style={styles.questionPrompt}>
          Quel est le type Enneagramme de cette personnalite ?
        </Text>

        {/* 3x3 grid of type buttons */}
        <View style={styles.typeGrid}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(typeNum => {
            const isFeedback = phase === 'feedback';
            const isSelected = selectedAnswer === typeNum;
            const isCorrectType = typeNum === q.correctType;

            let btnStyle = styles.typeBtn;
            let btnTextStyle = styles.typeBtnText;
            if (isFeedback && isCorrectType) {
              btnStyle = { ...styles.typeBtn, ...styles.typeBtnCorrect };
              btnTextStyle = {
                ...styles.typeBtnText,
                ...styles.typeBtnTextCorrect,
              };
            } else if (isFeedback && isSelected && !isCorrectType) {
              btnStyle = { ...styles.typeBtn, ...styles.typeBtnWrong };
              btnTextStyle = {
                ...styles.typeBtnText,
                ...styles.typeBtnTextWrong,
              };
            }

            return (
              <Pressable
                key={typeNum}
                onPress={() => handleHardAnswer(typeNum)}
                disabled={phase === 'feedback'}
                style={({ pressed }) => [
                  btnStyle,
                  pressed && phase === 'question' && styles.typeBtnPressed,
                ]}
              >
                <Text style={btnTextStyle}>{typeNum}</Text>
                <Text
                  style={[
                    styles.typeBtnLabel,
                    isFeedback && isCorrectType && styles.typeBtnLabelCorrect,
                  ]}
                  numberOfLines={1}
                >
                  {TYPE_NAMES[typeNum]}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {phase === 'feedback' && (
          <View style={styles.feedbackBox}>
            <Text
              style={[
                styles.feedbackLabel,
                isCorrect ? styles.feedbackCorrect : styles.feedbackWrong,
              ]}
            >
              {isCorrect ? 'Bonne reponse !' : 'Mauvaise reponse'}
            </Text>
            <Text style={styles.correctTypeText}>
              Type {q.correctType} — {TYPE_NAMES[q.correctType]}
            </Text>
            <Text style={styles.explanationText}>{q.explanation}</Text>
            <Pressable
              onPress={handleNext}
              style={({ pressed }) => [
                styles.nextBtn,
                pressed && styles.nextBtnPressed,
              ]}
            >
              <Text style={styles.nextBtnText}>Suivant</Text>
            </Pressable>
          </View>
        )}
      </Animated.View>
    );
  };

  const renderEndScreen = () => (
    <Animated.View style={[styles.endCard, { opacity: fadeAnim }]}>
      <Text style={styles.endEmoji}>
        {score === total ? '🏆' : score >= total * 0.7 ? '👏' : '📚'}
      </Text>
      <Text style={styles.endTitle}>Quiz termine !</Text>
      <Text style={styles.endScore}>
        {score} / {total}
      </Text>
      <Text style={styles.endMessage}>
        {score === total
          ? 'Parfait ! Vous connaissez bien les personnalites de chaque type.'
          : score >= total * 0.7
          ? 'Tres bien ! Vous avez une bonne intuition des types.'
          : 'Continuez a explorer les profils pour approfondir vos connaissances.'}
      </Text>
      <Pressable
        onPress={handleReset}
        style={({ pressed }) => [
          styles.restartBtn,
          pressed && styles.restartBtnPressed,
        ]}
      >
        <Text style={styles.restartBtnText}>Recommencer</Text>
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderHeader()}
        {isEnd
          ? renderEndScreen()
          : mode === 'easy'
          ? renderEasyQuestion()
          : renderHardQuestion()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl + spacing.xl,
  },

  // Header
  header: {
    paddingTop: spacing.xxl + spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 26,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.lg,
  },

  // Mode buttons
  modeRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  modeBtn: {
    paddingVertical: 10,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgCard,
  },
  modeBtnActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  modeBtnText: {
    fontFamily: fonts.sans,
    fontSize: 15,
    fontWeight: '600',
    color: colors.textLight,
  },
  modeBtnTextActive: {
    color: '#ffffff',
  },

  // Score
  scoreText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textLighter,
  },

  // Question card
  questionCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.bgCard,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  questionCounter: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textLighter,
    marginBottom: spacing.sm,
  },
  typeDesc: {
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.text,
    lineHeight: 26,
    marginBottom: spacing.md,
  },
  questionPrompt: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textLight,
    marginBottom: spacing.md,
  },

  // Easy mode options
  optionsContainer: {
    gap: spacing.sm,
  },
  optionBtn: {
    backgroundColor: colors.bgWarm,
    borderRadius: radius.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionPressed: {
    backgroundColor: colors.accentBg,
    borderColor: colors.accentLight,
  },
  optionCorrect: {
    backgroundColor: 'rgba(76, 175, 80, 0.12)',
    borderColor: '#4caf50',
  },
  optionWrong: {
    backgroundColor: 'rgba(239, 83, 80, 0.12)',
    borderColor: '#ef5350',
  },
  optionText: {
    fontFamily: fonts.sans,
    fontSize: 15,
    color: colors.text,
    textAlign: 'center',
  },
  optionTextCorrect: {
    color: '#2e7d32',
    fontWeight: '600',
  },
  optionTextWrong: {
    color: '#c62828',
    fontWeight: '600',
  },

  // Hard mode - celebrity name + bio
  celebrityName: {
    fontFamily: fonts.serif,
    fontSize: 22,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  bioText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 21,
    fontStyle: 'italic',
    marginBottom: spacing.lg,
  },

  // Hard mode - type grid (3x3)
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  typeBtn: {
    width: '30%',
    backgroundColor: colors.bgWarm,
    borderRadius: radius.md,
    paddingVertical: 12,
    paddingHorizontal: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  typeBtnPressed: {
    backgroundColor: colors.accentBg,
    borderColor: colors.accentLight,
  },
  typeBtnCorrect: {
    backgroundColor: 'rgba(76, 175, 80, 0.12)',
    borderColor: '#4caf50',
  },
  typeBtnWrong: {
    backgroundColor: 'rgba(239, 83, 80, 0.12)',
    borderColor: '#ef5350',
  },
  typeBtnText: {
    fontFamily: fonts.serif,
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  typeBtnTextCorrect: {
    color: '#2e7d32',
  },
  typeBtnTextWrong: {
    color: '#c62828',
  },
  typeBtnLabel: {
    fontFamily: fonts.sans,
    fontSize: 10,
    color: colors.textLighter,
    marginTop: 2,
  },
  typeBtnLabelCorrect: {
    color: '#2e7d32',
    fontWeight: '600',
  },

  // Feedback
  feedbackBox: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  feedbackLabel: {
    fontFamily: fonts.sans,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  feedbackCorrect: {
    color: '#4caf50',
  },
  feedbackWrong: {
    color: '#ef5350',
  },
  correctTypeText: {
    fontFamily: fonts.serif,
    fontSize: 16,
    color: colors.accent,
    marginBottom: spacing.sm,
  },
  explanationText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 21,
    marginBottom: spacing.md,
  },
  nextBtn: {
    backgroundColor: colors.accent,
    paddingVertical: 12,
    borderRadius: radius.full,
    alignItems: 'center',
  },
  nextBtnPressed: {
    opacity: 0.85,
  },
  nextBtnText: {
    fontFamily: fonts.sans,
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },

  // End screen
  endCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.xl,
    backgroundColor: colors.bgCard,
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  endEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  endTitle: {
    fontFamily: fonts.serif,
    fontSize: 24,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  endScore: {
    fontFamily: fonts.serif,
    fontSize: 36,
    fontWeight: '700',
    color: colors.accent,
    marginBottom: spacing.md,
  },
  endMessage: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textLight,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  restartBtn: {
    backgroundColor: colors.accent,
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.full,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  restartBtnPressed: {
    opacity: 0.85,
  },
  restartBtnText: {
    fontFamily: fonts.sans,
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
