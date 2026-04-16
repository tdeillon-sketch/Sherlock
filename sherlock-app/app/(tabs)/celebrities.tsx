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
import { auth, saveBadge } from '../../constants/firebase';
import {
  GAME_LEVELS,
  QUIZ_DEBUTANT,
  QUIZ_CONNAISSEUR,
  QUIZ_EXPERT,
  TYPE_NAMES,
  TYPE_COLORS,
  type GameLevel,
  type GameLevelConfig,
  type DebutantQuestion,
  type ConnaisseurQuestion,
  type ExpertQuestion,
} from '../../constants/celebrities';

// ===== Types =====

type ScreenState = 'select' | 'playing' | 'end';
type ExpertStep = 'type' | 'celebrity';

interface Badges {
  debutant: boolean;
  connaisseur: boolean;
  expert: boolean;
}

// ===== Avatar Component =====

function Avatar({ name, typeNum, size = 48 }: { name: string; typeNum: number; size?: number }) {
  const color = TYPE_COLORS[typeNum] || colors.accent;
  const letter = name.charAt(0).toUpperCase();
  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2, backgroundColor: color }]}>
      <Text style={[styles.avatarLetter, { fontSize: size * 0.4 }]}>{letter}</Text>
    </View>
  );
}

// ===== Progress Bar =====

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  return (
    <View style={styles.progressBarBg}>
      <View style={[styles.progressBarFill, { width: `${pct}%` }]} />
    </View>
  );
}

// ===== Main Screen =====

export default function CelebritiesScreen() {
  const [screenState, setScreenState] = useState<ScreenState>('select');
  const [level, setLevel] = useState<GameLevel>('debutant');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<'question' | 'feedback'>('question');
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [badges, setBadges] = useState<Badges>({ debutant: false, connaisseur: false, expert: false });

  // Expert-specific state
  const [expertStep, setExpertStep] = useState<ExpertStep>('type');
  const [expertTypeCorrect, setExpertTypeCorrect] = useState(false);
  const [expertSelectedType, setExpertSelectedType] = useState<number | null>(null);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const levelConfig = GAME_LEVELS.find(l => l.key === level)!;
  const quiz = level === 'debutant' ? QUIZ_DEBUTANT : level === 'connaisseur' ? QUIZ_CONNAISSEUR : QUIZ_EXPERT;
  const total = quiz.length;

  const animateFadeIn = useCallback(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    animateFadeIn();
  }, [currentIndex, screenState, animateFadeIn]);

  // ===== Actions =====

  const startLevel = useCallback((lvl: GameLevel) => {
    setLevel(lvl);
    setCurrentIndex(0);
    setScore(0);
    setPhase('question');
    setSelectedAnswer(null);
    setIsCorrect(false);
    setExpertStep('type');
    setExpertTypeCorrect(false);
    setExpertSelectedType(null);
    setScreenState('playing');
  }, []);

  const goBack = useCallback(() => {
    setScreenState('select');
  }, []);

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= total) {
      // Check badge
      const finalScore = score;
      if (finalScore >= levelConfig.requiredScore) {
        setBadges(prev => ({ ...prev, [level]: true }));
        // Save badge to Firebase
        const uid = auth.currentUser?.uid;
        if (uid) {
          saveBadge(uid, {
            level,
            score: finalScore,
            total,
            earnedAt: new Date().toISOString(),
          }).catch(() => {});
        }
      }
      setScreenState('end');
    } else {
      setCurrentIndex(prev => prev + 1);
      setPhase('question');
      setSelectedAnswer(null);
      setIsCorrect(false);
      setExpertStep('type');
      setExpertTypeCorrect(false);
      setExpertSelectedType(null);
    }
  }, [currentIndex, total, score, levelConfig, level]);

  // --- Debutant answer ---
  const handleDebutantAnswer = useCallback(
    (optionIdx: number) => {
      if (phase !== 'question') return;
      const q = QUIZ_DEBUTANT[currentIndex];
      const correct = q.options[optionIdx].correct;
      setSelectedAnswer(optionIdx);
      setIsCorrect(correct);
      if (correct) setScore(prev => prev + 1);
      setPhase('feedback');
    },
    [currentIndex, phase],
  );

  // --- Connaisseur answer ---
  const handleConnaisseurAnswer = useCallback(
    (typeNum: number) => {
      if (phase !== 'question') return;
      const q = QUIZ_CONNAISSEUR[currentIndex];
      const correct = typeNum === q.correctType;
      setSelectedAnswer(typeNum);
      setIsCorrect(correct);
      if (correct) setScore(prev => prev + 1);
      setPhase('feedback');
    },
    [currentIndex, phase],
  );

  // --- Expert answer (two-step) ---
  const handleExpertTypeAnswer = useCallback(
    (typeNum: number) => {
      if (phase !== 'question' || expertStep !== 'type') return;
      const q = QUIZ_EXPERT[currentIndex];
      setExpertSelectedType(typeNum);
      if (typeNum === q.correctType) {
        setExpertTypeCorrect(true);
        setExpertStep('celebrity');
        animateFadeIn();
      } else {
        // Wrong type -> immediate feedback, no celebrity step
        setExpertTypeCorrect(false);
        setIsCorrect(false);
        setSelectedAnswer(typeNum);
        setPhase('feedback');
      }
    },
    [currentIndex, phase, expertStep, animateFadeIn],
  );

  const handleExpertCelebrityAnswer = useCallback(
    (celName: string) => {
      if (phase !== 'question' || expertStep !== 'celebrity') return;
      const q = QUIZ_EXPERT[currentIndex];
      const correct = celName === q.correctCelebrity;
      setSelectedAnswer(celName);
      setIsCorrect(correct);
      if (correct) setScore(prev => prev + 1);
      setPhase('feedback');
    },
    [currentIndex, phase, expertStep],
  );

  // ========== RENDER ==========

  // --- Level Select ---
  const renderLevelSelect = () => (
    <Animated.View style={{ opacity: fadeAnim }}>
      <View style={styles.header}>
        <Text style={styles.title}>Testez-vous</Text>
        <Text style={styles.subtitle}>
          Testez vos connaissances de l'Enneagramme a travers des personnalites celebres
        </Text>
      </View>

      <View style={styles.levelsContainer}>
        {GAME_LEVELS.map((lv) => {
          const hasBadge = badges[lv.key];
          return (
            <Pressable
              key={lv.key}
              onPress={() => startLevel(lv.key)}
              style={({ pressed }) => [
                styles.levelCard,
                pressed && styles.levelCardPressed,
              ]}
            >
              <View style={styles.levelCardHeader}>
                <Text style={styles.levelEmoji}>{lv.emoji}</Text>
                <View style={styles.levelTitleRow}>
                  <Text style={styles.levelTitle}>{lv.title}</Text>
                  {hasBadge && <Text style={styles.levelBadge}>{lv.badge}</Text>}
                </View>
              </View>
              <Text style={styles.levelDesc}>{lv.desc}</Text>
              <View style={styles.levelMeta}>
                <Text style={styles.levelMetaText}>
                  {lv.key === 'debutant' ? '9' : lv.key === 'connaisseur' ? '12' : '10'} questions
                </Text>
                <Text style={styles.levelMetaDot}>{'\u00B7'}</Text>
                <Text style={styles.levelMetaText}>
                  Objectif : {lv.requiredScore}+
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </Animated.View>
  );

  // --- Playing Header ---
  const renderPlayingHeader = () => (
    <View style={styles.playingHeader}>
      <Pressable onPress={goBack} style={styles.backBtn}>
        <Text style={styles.backBtnText}>{'\u2190'}</Text>
      </Pressable>
      <View style={styles.playingHeaderCenter}>
        <Text style={styles.playingTitle}>
          {levelConfig.emoji} {levelConfig.title}
        </Text>
        <Text style={styles.scoreText}>{score} / {total}</Text>
      </View>
      <View style={styles.backBtn}>
        <Text style={styles.questionCounter}>
          {currentIndex + 1}/{total}
        </Text>
      </View>
    </View>
  );

  // --- Debutant Question ---
  const renderDebutantQuestion = () => {
    const q = QUIZ_DEBUTANT[currentIndex] as DebutantQuestion;
    return (
      <Animated.View style={[styles.questionCard, { opacity: fadeAnim }]}>
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
            const celType = q.type;

            return (
              <Pressable
                key={idx}
                onPress={() => handleDebutantAnswer(idx)}
                disabled={phase === 'feedback'}
                style={({ pressed }) => [
                  styles.optionBtn,
                  isFeedback && optCorrect && styles.optionCorrect,
                  isFeedback && isSelected && !optCorrect && styles.optionWrong,
                  pressed && phase === 'question' && styles.optionPressed,
                ]}
              >
                <View style={styles.optionRow}>
                  <Avatar name={opt.name} typeNum={celType} size={36} />
                  <Text
                    style={[
                      styles.optionText,
                      isFeedback && optCorrect && styles.optionTextCorrect,
                      isFeedback && isSelected && !optCorrect && styles.optionTextWrong,
                    ]}
                  >
                    {opt.name}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        {phase === 'feedback' && renderFeedback(q.explanation)}
      </Animated.View>
    );
  };

  // --- Connaisseur Question ---
  const renderConnaisseurQuestion = () => {
    const q = QUIZ_CONNAISSEUR[currentIndex] as ConnaisseurQuestion;
    return (
      <Animated.View style={[styles.questionCard, { opacity: fadeAnim }]}>
        <View style={styles.celebrityHeader}>
          <Avatar name={q.celebrityName} typeNum={q.correctType} size={52} />
          <Text style={styles.celebrityName}>{q.celebrityName}</Text>
        </View>
        <Text style={styles.bioText}>{q.bio}</Text>
        <Text style={styles.questionPrompt}>
          Quel est le type Enneagramme de cette personnalite ?
        </Text>

        <View style={styles.typeGrid}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(typeNum => {
            const isFeedback = phase === 'feedback';
            const isSelected = selectedAnswer === typeNum;
            const isCorrectType = typeNum === q.correctType;

            return (
              <Pressable
                key={typeNum}
                onPress={() => handleConnaisseurAnswer(typeNum)}
                disabled={phase === 'feedback'}
                style={({ pressed }) => [
                  styles.typeBtn,
                  isFeedback && isCorrectType && styles.typeBtnCorrect,
                  isFeedback && isSelected && !isCorrectType && styles.typeBtnWrong,
                  pressed && phase === 'question' && styles.typeBtnPressed,
                ]}
              >
                <Text
                  style={[
                    styles.typeBtnText,
                    isFeedback && isCorrectType && styles.typeBtnTextCorrect,
                    isFeedback && isSelected && !isCorrectType && styles.typeBtnTextWrong,
                  ]}
                >
                  {typeNum}
                </Text>
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
            <Text style={[styles.feedbackLabel, isCorrect ? styles.feedbackCorrect : styles.feedbackWrong]}>
              {isCorrect ? 'Bonne reponse !' : 'Mauvaise reponse'}
            </Text>
            <Text style={styles.correctTypeText}>
              Type {q.correctType} — {TYPE_NAMES[q.correctType]}
            </Text>
            <Text style={styles.explanationText}>{q.explanation}</Text>
            <Pressable
              onPress={handleNext}
              style={({ pressed }) => [styles.nextBtn, pressed && styles.nextBtnPressed]}
            >
              <Text style={styles.nextBtnText}>Suivant</Text>
            </Pressable>
          </View>
        )}
      </Animated.View>
    );
  };

  // --- Expert Question ---
  const renderExpertQuestion = () => {
    const q = QUIZ_EXPERT[currentIndex] as ExpertQuestion;
    return (
      <Animated.View style={[styles.questionCard, { opacity: fadeAnim }]}>
        <Text style={styles.clueLabel}>Indice</Text>
        <Text style={styles.clueText}>{q.clue}</Text>

        {expertStep === 'type' && (
          <>
            <Text style={styles.questionPrompt}>Quel type ?</Text>
            <View style={styles.typeGrid}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(typeNum => (
                <Pressable
                  key={typeNum}
                  onPress={() => handleExpertTypeAnswer(typeNum)}
                  disabled={phase === 'feedback'}
                  style={({ pressed }) => [
                    styles.typeBtn,
                    phase === 'feedback' && typeNum === q.correctType && styles.typeBtnCorrect,
                    phase === 'feedback' && expertSelectedType === typeNum && typeNum !== q.correctType && styles.typeBtnWrong,
                    pressed && phase === 'question' && styles.typeBtnPressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.typeBtnText,
                      phase === 'feedback' && typeNum === q.correctType && styles.typeBtnTextCorrect,
                      phase === 'feedback' && expertSelectedType === typeNum && typeNum !== q.correctType && styles.typeBtnTextWrong,
                    ]}
                  >
                    {typeNum}
                  </Text>
                  <Text
                    style={[
                      styles.typeBtnLabel,
                      phase === 'feedback' && typeNum === q.correctType && styles.typeBtnLabelCorrect,
                    ]}
                    numberOfLines={1}
                  >
                    {TYPE_NAMES[typeNum]}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}

        {expertStep === 'celebrity' && (
          <>
            <View style={styles.expertStepSuccess}>
              <Text style={styles.expertStepSuccessText}>
                {'\u2713'} Type {q.correctType} — {TYPE_NAMES[q.correctType]}
              </Text>
            </View>
            <Text style={styles.questionPrompt}>Quelle personnalite ?</Text>
            <View style={styles.optionsContainer}>
              {q.celebrityOptions.map((celName) => {
                const isFeedback = phase === 'feedback';
                const isSelected = selectedAnswer === celName;
                const optCorrect = celName === q.correctCelebrity;

                return (
                  <Pressable
                    key={celName}
                    onPress={() => handleExpertCelebrityAnswer(celName)}
                    disabled={phase === 'feedback'}
                    style={({ pressed }) => [
                      styles.optionBtn,
                      isFeedback && optCorrect && styles.optionCorrect,
                      isFeedback && isSelected && !optCorrect && styles.optionWrong,
                      pressed && phase === 'question' && styles.optionPressed,
                    ]}
                  >
                    <View style={styles.optionRow}>
                      <Avatar name={celName} typeNum={q.correctType} size={36} />
                      <Text
                        style={[
                          styles.optionText,
                          isFeedback && optCorrect && styles.optionTextCorrect,
                          isFeedback && isSelected && !optCorrect && styles.optionTextWrong,
                        ]}
                      >
                        {celName}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </>
        )}

        {phase === 'feedback' && renderFeedback(q.explanation, q.correctType)}
      </Animated.View>
    );
  };

  // --- Feedback Block ---
  const renderFeedback = (explanation: string, correctType?: number) => (
    <View style={styles.feedbackBox}>
      <Text style={[styles.feedbackLabel, isCorrect ? styles.feedbackCorrect : styles.feedbackWrong]}>
        {isCorrect ? 'Bonne reponse !' : 'Mauvaise reponse'}
      </Text>
      {correctType != null && (
        <Text style={styles.correctTypeText}>
          Type {correctType} — {TYPE_NAMES[correctType]}
        </Text>
      )}
      <Text style={styles.explanationText}>{explanation}</Text>
      <Pressable
        onPress={handleNext}
        style={({ pressed }) => [styles.nextBtn, pressed && styles.nextBtnPressed]}
      >
        <Text style={styles.nextBtnText}>Suivant</Text>
      </Pressable>
    </View>
  );

  // --- End Screen ---
  const renderEndScreen = () => {
    const earned = score >= levelConfig.requiredScore;
    return (
      <Animated.View style={[styles.endCard, { opacity: fadeAnim }]}>
        <Text style={styles.endBadge}>{earned ? levelConfig.badge : '\u{1F4AA}'}</Text>
        <Text style={styles.endTitle}>
          {earned ? 'Badge debloque !' : 'Presque !'}
        </Text>
        <Text style={styles.endScore}>
          {score} / {total}
        </Text>
        <Text style={styles.endMessage}>
          {earned
            ? `Felicitations ! Vous avez obtenu le badge ${levelConfig.badge} du niveau ${levelConfig.title}.`
            : `Il vous fallait ${levelConfig.requiredScore} bonnes reponses pour obtenir le badge. Reessayez !`}
        </Text>
        <View style={styles.endButtons}>
          <Pressable
            onPress={() => startLevel(level)}
            style={({ pressed }) => [styles.restartBtn, pressed && styles.restartBtnPressed]}
          >
            <Text style={styles.restartBtnText}>Recommencer</Text>
          </Pressable>
          <Pressable
            onPress={goBack}
            style={({ pressed }) => [styles.backToLevelsBtn, pressed && styles.backToLevelsBtnPressed]}
          >
            <Text style={styles.backToLevelsBtnText}>Choisir un niveau</Text>
          </Pressable>
        </View>
      </Animated.View>
    );
  };

  // ========== MAIN RENDER ==========

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {screenState === 'select' && renderLevelSelect()}

        {screenState === 'playing' && (
          <>
            {renderPlayingHeader()}
            <ProgressBar current={currentIndex + (phase === 'feedback' ? 1 : 0)} total={total} />
            {level === 'debutant' && renderDebutantQuestion()}
            {level === 'connaisseur' && renderConnaisseurQuestion()}
            {level === 'expert' && renderExpertQuestion()}
          </>
        )}

        {screenState === 'end' && (
          <>
            <View style={styles.endHeader}>
              <Pressable onPress={goBack} style={styles.backBtn}>
                <Text style={styles.backBtnText}>{'\u2190'}</Text>
              </Pressable>
              <Text style={styles.playingTitle}>
                {levelConfig.emoji} {levelConfig.title}
              </Text>
              <View style={styles.backBtn} />
            </View>
            {renderEndScreen()}
          </>
        )}
      </ScrollView>
    </View>
  );
}

// ========== STYLES ==========

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

  // Header (level select)
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
    color: colors.textSoft,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.sm,
  },

  // Level cards
  levelsContainer: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  levelCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  levelCardPressed: {
    backgroundColor: colors.bgLight,
    borderColor: colors.accentLight,
  },
  levelCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  levelEmoji: {
    fontSize: 28,
    marginRight: spacing.sm,
  },
  levelTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  levelTitle: {
    fontFamily: fonts.serif,
    fontSize: 20,
    color: colors.text,
  },
  levelBadge: {
    fontSize: 20,
  },
  levelDesc: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textSoft,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  levelMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  levelMetaText: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textMuted,
  },
  levelMetaDot: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textMuted,
  },

  // Playing header
  playingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.xxl + spacing.sm,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  backBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnText: {
    fontFamily: fonts.sans,
    fontSize: 24,
    color: colors.text,
  },
  playingHeaderCenter: {
    alignItems: 'center',
  },
  playingTitle: {
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.text,
  },
  scoreText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.accent,
    fontWeight: '600',
    marginTop: 2,
  },
  questionCounter: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textMuted,
  },

  // Progress bar
  progressBarBg: {
    height: 4,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
    borderRadius: 2,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 4,
    backgroundColor: colors.accent,
    borderRadius: 2,
  },

  // Question card
  questionCard: {
    marginHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
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
    color: colors.textSoft,
    marginBottom: spacing.md,
  },

  // Avatar
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontFamily: fonts.serif,
    fontWeight: '700',
    color: colors.white,
  },

  // Celebrity header (connaisseur)
  celebrityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  celebrityName: {
    fontFamily: fonts.serif,
    fontSize: 22,
    color: colors.text,
    flex: 1,
  },
  bioText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textSoft,
    lineHeight: 21,
    fontStyle: 'italic',
    marginBottom: spacing.lg,
  },

  // Options (debutant + expert celebrity)
  optionsContainer: {
    gap: spacing.sm,
  },
  optionBtn: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionPressed: {
    backgroundColor: colors.accentFill,
    borderColor: colors.accentLight,
  },
  optionCorrect: {
    backgroundColor: colors.successBg,
    borderColor: colors.success,
  },
  optionWrong: {
    backgroundColor: colors.errorBg,
    borderColor: colors.errorLight,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  optionText: {
    fontFamily: fonts.sans,
    fontSize: 15,
    color: colors.text,
    flex: 1,
  },
  optionTextCorrect: {
    color: colors.successDark,
    fontWeight: '600',
  },
  optionTextWrong: {
    color: colors.errorDark,
    fontWeight: '600',
  },

  // Type grid (3x3) for connaisseur + expert
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  typeBtn: {
    width: '30%',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    paddingVertical: 12,
    paddingHorizontal: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  typeBtnPressed: {
    backgroundColor: colors.accentFill,
    borderColor: colors.accentLight,
  },
  typeBtnCorrect: {
    backgroundColor: colors.successBg,
    borderColor: colors.success,
  },
  typeBtnWrong: {
    backgroundColor: colors.errorBg,
    borderColor: colors.errorLight,
  },
  typeBtnText: {
    fontFamily: fonts.serif,
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  typeBtnTextCorrect: {
    color: colors.successDark,
  },
  typeBtnTextWrong: {
    color: colors.errorDark,
  },
  typeBtnLabel: {
    fontFamily: fonts.sans,
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2,
  },
  typeBtnLabelCorrect: {
    color: colors.successDark,
    fontWeight: '600',
  },

  // Expert-specific
  clueLabel: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  clueText: {
    fontFamily: fonts.serifItalic,
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  expertStepSuccess: {
    backgroundColor: colors.successBg,
    borderRadius: radius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  expertStepSuccessText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.success,
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
    color: colors.success,
  },
  feedbackWrong: {
    color: colors.errorLight,
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
    color: colors.textSoft,
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
    color: colors.white,
  },

  // End screen
  endHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.xxl + spacing.sm,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  endCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  endBadge: {
    fontSize: 64,
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
    color: colors.textSoft,
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  endButtons: {
    alignSelf: 'stretch',
    gap: spacing.sm,
  },
  restartBtn: {
    backgroundColor: colors.accent,
    paddingVertical: 14,
    borderRadius: radius.full,
    alignItems: 'center',
  },
  restartBtnPressed: {
    opacity: 0.85,
  },
  restartBtnText: {
    fontFamily: fonts.sans,
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  backToLevelsBtn: {
    backgroundColor: colors.surface,
    paddingVertical: 14,
    borderRadius: radius.full,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  backToLevelsBtnPressed: {
    backgroundColor: colors.bgLight,
  },
  backToLevelsBtnText: {
    fontFamily: fonts.sans,
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSoft,
  },
});
