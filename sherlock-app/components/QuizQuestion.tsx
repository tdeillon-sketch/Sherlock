import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, fonts, spacing, radius } from '../constants/theme';
import { QuizQuestion as QuizQuestionType, QuizMode } from '../constants/data';
import { getScene } from '../constants/quiz_scenes';

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNum: number;
  totalQuestions: number;
  mode: QuizMode;
  questionIndex: number;
  onAnswer: (aIdx: number) => void;
  onSlider: (value: number) => void;
  onSkip: () => void;
}

const SLIDER_TICKS = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

export default function QuizQuestion({
  question, questionNum, totalQuestions, mode, questionIndex,
  onAnswer, onSlider, onSkip,
}: QuizQuestionProps) {
  const [sliderValue, setSliderValue] = useState(0);
  const scene = getScene(mode, questionIndex) ?? (question.scene ?? null);

  // ── Header common to all questions ──
  const Header = (
    <View style={styles.header}>
      <View style={styles.headerTopRow}>
        <Text style={styles.category}>{question.category.toUpperCase()}</Text>
        <Text style={styles.questionNum}>{questionNum} / {totalQuestions}</Text>
      </View>

      {scene && (
        <View style={styles.sceneBox}>
          {scene.icon && <Text style={styles.sceneIcon}>{scene.icon}</Text>}
          <Text style={styles.sceneSetup}>{scene.setup}</Text>
        </View>
      )}

      <Text style={styles.questionText}>{question.q}</Text>
    </View>
  );

  // ── Slider ──
  if (question.type === 'slider') {
    return (
      <View style={styles.container}>
        {Header}

        <View style={styles.sliderLabelsRow}>
          <Text style={styles.sliderLabelLeft}>{question.sliderLeft}</Text>
          <Text style={styles.sliderLabelRight}>{question.sliderRight}</Text>
        </View>

        <View style={styles.sliderTrack}>
          {SLIDER_TICKS.map(tick => {
            const isSelected = sliderValue === tick;
            const isCenter = tick === 0;
            return (
              <Pressable
                key={tick}
                onPress={() => setSliderValue(tick)}
                style={[
                  styles.sliderTick,
                  isCenter && styles.sliderTickCenter,
                  isSelected && styles.sliderTickSelected,
                ]}
              >
                <Text style={[styles.sliderTickText, isSelected && styles.sliderTickTextSelected]}>
                  {tick > 0 ? `+${tick}` : tick}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.sliderValueDisplay}>
          {sliderValue > 0 ? `+${sliderValue}` : sliderValue}
        </Text>

        <Pressable
          onPress={() => { onSlider(sliderValue); setSliderValue(0); }}
          style={({ pressed }) => [styles.confirmBtn, pressed && styles.confirmBtnPressed]}
        >
          <Text style={styles.confirmBtnText}>Confirmer</Text>
        </Pressable>

        <Pressable onPress={onSkip} style={styles.skipBtn}>
          <Text style={styles.skipBtnText}>Je ne sais pas — passer</Text>
        </Pressable>
      </View>
    );
  }

  // ── Choice ──
  return (
    <View style={styles.container}>
      {Header}

      <View style={styles.answers}>
        {(question.a || []).map((answer, idx) => (
          <Pressable
            key={idx}
            onPress={() => onAnswer(idx)}
            style={({ pressed }) => [styles.answerCard, pressed && styles.answerCardPressed]}
          >
            <Text style={styles.answerText}>
              {answer.emoji ? `${answer.emoji}  ` : ''}{answer.text}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable onPress={onSkip} style={styles.skipBtn}>
        <Text style={styles.skipBtnText}>Je ne sais pas — passer</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: spacing.lg, paddingVertical: spacing.md },

  header: { marginBottom: spacing.md },
  headerTopRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: spacing.md,
  },
  category: {
    fontFamily: fonts.sans, fontSize: 11, letterSpacing: 1.5,
    color: colors.accent, fontWeight: '700',
  },
  questionNum: { fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted },

  // Scene
  sceneBox: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    padding: spacing.md,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  sceneIcon: { fontSize: 28, marginTop: -2 },
  sceneSetup: {
    flex: 1,
    fontFamily: fonts.serifItalic,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSoft,
  },

  questionText: {
    fontFamily: fonts.serif,
    fontSize: 19,
    color: colors.text,
    lineHeight: 27,
  },

  // Choice answers (no more A/B/C circles — cleaner cards)
  answers: { gap: spacing.sm },
  answerCard: {
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  answerCardPressed: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  answerText: {
    fontFamily: fonts.sans,
    fontSize: 15,
    color: colors.textSoft,
    lineHeight: 22,
  },

  // Skip
  skipBtn: { padding: spacing.md, alignItems: 'center', marginTop: spacing.sm },
  skipBtnText: {
    fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted,
    textDecorationLine: 'underline',
  },

  // Slider
  sliderLabelsRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md,
  },
  sliderLabelLeft: {
    fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted,
    flex: 1, textAlign: 'left',
  },
  sliderLabelRight: {
    fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted,
    flex: 1, textAlign: 'right',
  },
  sliderTrack: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.cardBg, borderRadius: radius.md,
    paddingVertical: spacing.xs, paddingHorizontal: spacing.xs,
  },
  sliderTick: {
    width: 28, height: 40, borderRadius: radius.sm,
    alignItems: 'center', justifyContent: 'center',
  },
  sliderTickCenter: { borderWidth: 1, borderColor: colors.border },
  sliderTickSelected: { backgroundColor: colors.accent },
  sliderTickText: {
    fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted, fontWeight: '600',
  },
  sliderTickTextSelected: { color: colors.white },
  sliderValueDisplay: {
    fontFamily: fonts.serif, fontSize: 28, fontWeight: '700' as any,
    color: colors.text, textAlign: 'center', marginTop: spacing.md, marginBottom: spacing.lg,
  },
  confirmBtn: {
    backgroundColor: colors.accent, paddingVertical: 14,
    borderRadius: radius.full, alignItems: 'center',
  },
  confirmBtnPressed: { opacity: 0.85 },
  confirmBtnText: {
    fontFamily: fonts.sans, fontSize: 16, fontWeight: '600', color: colors.white,
  },
});
