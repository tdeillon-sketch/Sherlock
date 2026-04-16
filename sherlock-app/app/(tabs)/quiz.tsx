import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { colors, fonts, spacing, radius } from '../../constants/theme';
import { TYPES, QuizMode } from '../../constants/data';
import { useQuiz } from '../../hooks/useQuiz';
import RadarChart from '../../components/RadarChart';
import QuizQuestion from '../../components/QuizQuestion';
import QuizResult from '../../components/QuizResult';
import { auth, saveQuizResult } from '../../constants/firebase';

// ── Mode selection cards ──
const MODES: { key: QuizMode; emoji: string; title: string; desc: string }[] = [
  {
    key: 'enfant',
    emoji: '🧒',
    title: 'Mon enfant',
    desc: '5-12 ans — vous repondez pour lui',
  },
  {
    key: 'ado',
    emoji: '🎧',
    title: 'Mon ado',
    desc: '13-17 ans — il repond lui-meme',
  },
  {
    key: 'adulte',
    emoji: '🪞',
    title: 'Moi-meme',
    desc: 'Decouvrez votre propre profil',
  },
];

export default function QuizScreen() {
  const { width, height } = useWindowDimensions();
  const isWide = width >= 768;

  const {
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
  } = useQuiz();

  // ── Save result to Firebase when quiz completes ──
  const savedRef = useRef(false);
  useEffect(() => {
    if (isComplete && mode && !savedRef.current) {
      savedRef.current = true;
      const uid = auth.currentUser?.uid;
      if (uid) {
        saveQuizResult(uid, {
          mode,
          topType,
          wingType,
          scores,
          completedAt: new Date().toISOString(),
        }).catch(() => {});
      }
    }
    if (!isComplete) savedRef.current = false;
  }, [isComplete, mode, topType, wingType, scores]);

  // ── ECRAN DE SELECTION ──
  if (!mode) {
    return (
      <View style={styles.selectContainer}>
        <View style={styles.selectInner}>
          <Text style={styles.selectTitle}>Quel test souhaitez-vous faire ?</Text>
          <Text style={styles.selectSub}>
            Chaque quiz est adapte a l'age et au point de vue du repondant.
          </Text>

          {MODES.map((m) => (
            <Pressable
              key={m.key}
              style={({ pressed }) => [styles.modeCard, pressed && styles.modeCardPressed]}
              onPress={() => startQuiz(m.key)}
            >
              <Text style={styles.modeEmoji}>{m.emoji}</Text>
              <View style={styles.modeText}>
                <Text style={styles.modeTitle}>{m.title}</Text>
                <Text style={styles.modeDesc}>{m.desc}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    );
  }

  // ── QUIZ EN COURS ──
  const progress = Math.min(currentQuestion / questions.length, 1);

  // Radar size: fill the screen on mobile
  const radarSize = isWide ? 320 : Math.min(width * 0.72, 300);

  const resultLabel =
    mode === 'enfant' ? 'Le profil de votre enfant' :
    mode === 'ado' ? 'Ton profil' : 'Votre profil';

  const handleViewProfile = () => {
    router.push(`/profile/${topType}`);
  };

  const radarSection = (
    <View style={[styles.radarSection, isWide && styles.radarSectionWide]}>
      <RadarChart scores={scores} size={radarSize} />
      {isComplete && (
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: colors.accent }]} />
          <Text style={styles.legendText}>{resultLabel}</Text>
        </View>
      )}
    </View>
  );

  const progressBar = (
    <View style={styles.progressTrack}>
      <LinearGradient
        colors={[colors.accent, colors.accentLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.progressFill, { width: `${progress * 100}%` as any }]}
      />
    </View>
  );

  const questionSection = isComplete ? (
    <QuizResult
      topType={topType}
      sortedScores={sortedScores}
      totalPoints={totalPoints}
      childAge={mode === 'enfant' ? '5-12' : mode === 'ado' ? '13-16' : null}
      wingType={wingType}
      mode={mode}
      onViewProfile={handleViewProfile}
      onReset={reset}
    />
  ) : (
    <QuizQuestion
      question={questions[currentQuestion]}
      questionNum={currentQuestion + 1}
      totalQuestions={questions.length}
      onAnswer={(aIdx) => selectAnswer(currentQuestion, aIdx)}
      onSlider={(value) => selectSlider(currentQuestion, value)}
    />
  );

  // ── WIDE LAYOUT (desktop/tablet) ──
  if (isWide) {
    return (
      <View style={styles.wideContainer}>
        <LinearGradient
          colors={[colors.bg, colors.bgLight]}
          style={styles.leftPanel}
        >
          {radarSection}
        </LinearGradient>

        <View style={styles.rightPanel}>
          {progressBar}
          <ScrollView
            style={styles.scrollFlex}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {questionSection}
          </ScrollView>
        </View>
      </View>
    );
  }

  // ── MOBILE LAYOUT (radar + question fullscreen) ──
  return (
    <View style={styles.narrowContainer}>
      {progressBar}
      <ScrollView
        style={styles.scrollFlex}
        contentContainerStyle={styles.narrowScroll}
        showsVerticalScrollIndicator={false}
      >
        {radarSection}
        <View style={styles.questionArea}>
          {questionSection}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // ── Selection ──
  selectContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  selectInner: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  selectTitle: {
    fontFamily: fonts.serif,
    fontSize: 24,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  selectSub: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: 21,
  },
  modeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  modeCardPressed: {
    borderColor: colors.accent,
    backgroundColor: colors.bgLight,
  },
  modeEmoji: {
    fontSize: 32,
    marginRight: spacing.lg,
  },
  modeText: {
    flex: 1,
  },
  modeTitle: {
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.text,
    marginBottom: 2,
  },
  modeDesc: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textMuted,
  },

  // ── Wide layout ──
  wideContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.bg,
  },
  leftPanel: {
    width: '42%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  rightPanel: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // ── Narrow (mobile) layout ──
  narrowContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  narrowScroll: {
    paddingBottom: spacing.xl,
  },
  questionArea: {
    paddingHorizontal: spacing.md,
  },

  // ── Radar ──
  radarSection: {
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
  },
  radarSectionWide: {
    paddingVertical: spacing.xxl,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  legendText: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textDim,
  },

  // ── Progress ──
  progressTrack: {
    height: 3,
    backgroundColor: colors.subtle06,
  },
  progressFill: {
    height: 3,
    borderRadius: 2,
  },
  scrollFlex: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
});
