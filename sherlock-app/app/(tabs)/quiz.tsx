import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { colors, fonts, spacing } from '../../constants/theme';
import { QUIZ, TYPES } from '../../constants/data';
import { useQuiz } from '../../hooks/useQuiz';
import RadarChart from '../../components/RadarChart';
import QuizQuestion from '../../components/QuizQuestion';
import QuizResult from '../../components/QuizResult';

export default function QuizScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const {
    currentQuestion,
    scores,
    isComplete,
    topType,
    totalPoints,
    sortedScores,
    wingType,
    selectAnswer,
    selectSlider,
    reset,
  } = useQuiz();

  const progress = Math.min(currentQuestion / QUIZ.length, 1);

  const handleViewProfile = () => {
    router.push(`/profile/${topType}`);
  };

  const radarSection = (
    <View style={[styles.radarSection, isWide && styles.radarSectionWide]}>
      <RadarChart scores={scores} size={isWide ? 280 : 200} />
      {isComplete && (
        <View style={styles.legendRow}>
          <View style={[styles.legendDot, { backgroundColor: '#c0713a' }]} />
          <Text style={styles.legendText}>Vos resultats</Text>
        </View>
      )}
    </View>
  );

  const progressBar = (
    <View style={styles.progressTrack}>
      <LinearGradient
        colors={['#c0713a', '#e8a06a']}
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
      childAge={null}
      wingType={wingType}
      onViewProfile={handleViewProfile}
      onReset={reset}
    />
  ) : (
    <QuizQuestion
      question={QUIZ[currentQuestion]}
      questionNum={currentQuestion + 1}
      totalQuestions={QUIZ.length}
      onAnswer={(aIdx) => selectAnswer(currentQuestion, aIdx)}
      onSlider={(value) => selectSlider(currentQuestion, value)}
    />
  );

  if (isWide) {
    return (
      <View style={styles.wideContainer}>
        <LinearGradient
          colors={[colors.quizDark1, '#1e1830']}
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

  return (
    <View style={styles.narrowContainer}>
      {progressBar}
      <ScrollView
        style={styles.scrollFlex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {radarSection}
        {questionSection}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wideContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.quizDark2,
  },
  leftPanel: {
    width: '42%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  rightPanel: {
    flex: 1,
    backgroundColor: colors.quizDark2,
  },
  narrowContainer: {
    flex: 1,
    backgroundColor: colors.quizDark2,
  },
  radarSection: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  radarSectionWide: {
    paddingVertical: spacing.xxl,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
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
    color: '#667788',
  },
  progressTrack: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.06)',
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
