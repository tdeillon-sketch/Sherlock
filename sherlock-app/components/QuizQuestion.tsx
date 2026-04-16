import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, fonts, spacing, radius } from '../constants/theme';
import { QuizQuestion as QuizQuestionType } from '../constants/data';

interface QuizQuestionProps {
  question: QuizQuestionType;
  questionNum: number;
  totalQuestions: number;
  onAnswer: (aIdx: number) => void;
  onSlider: (value: number) => void;
}

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

// Slider tick marks
const SLIDER_TICKS = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

export default function QuizQuestion({
  question,
  questionNum,
  totalQuestions,
  onAnswer,
  onSlider,
}: QuizQuestionProps) {
  const [sliderValue, setSliderValue] = useState(0);

  if (question.type === 'slider') {
    return (
      <View style={styles.container}>
        <Text style={styles.category}>
          {question.category.toUpperCase()}
        </Text>

        <Text style={styles.questionNum}>
          Question {questionNum} / {totalQuestions}
        </Text>

        <Text style={styles.questionText}>{question.q}</Text>

        {/* Slider labels */}
        <View style={styles.sliderLabelsRow}>
          <Text style={styles.sliderLabelLeft}>{question.sliderLeft}</Text>
          <Text style={styles.sliderLabelRight}>{question.sliderRight}</Text>
        </View>

        {/* Custom slider track with ticks */}
        <View style={styles.sliderContainer}>
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
                  <Text
                    style={[
                      styles.sliderTickText,
                      isSelected && styles.sliderTickTextSelected,
                    ]}
                  >
                    {tick > 0 ? `+${tick}` : tick}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Value display */}
        <Text style={styles.sliderValueDisplay}>
          {sliderValue > 0 ? `+${sliderValue}` : sliderValue}
        </Text>

        {/* Confirm button */}
        <Pressable
          onPress={() => {
            onSlider(sliderValue);
            setSliderValue(0);
          }}
          style={({ pressed }) => [
            styles.confirmBtn,
            pressed && styles.confirmBtnPressed,
          ]}
        >
          <Text style={styles.confirmBtnText}>Confirmer</Text>
        </Pressable>
      </View>
    );
  }

  // ===== Choice question =====
  return (
    <View style={styles.container}>
      <Text style={styles.category}>
        {question.category.toUpperCase()}
      </Text>

      <Text style={styles.questionNum}>
        Question {questionNum} / {totalQuestions}
      </Text>

      {question.situation && (
        <Text style={styles.situationText}>{question.situation}</Text>
      )}

      <Text style={styles.questionText}>{question.q}</Text>

      <View style={styles.answers}>
        {(question.a || []).map((answer, idx) => (
          <Pressable
            key={idx}
            onPress={() => onAnswer(idx)}
            style={({ pressed }) => [
              styles.answerCard,
              pressed && styles.answerCardPressed,
            ]}
          >
            {({ pressed }) => (
              <View style={styles.answerInner}>
                <View
                  style={[
                    styles.letterCircle,
                    pressed && styles.letterCirclePressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.letterText,
                      pressed && styles.letterTextPressed,
                    ]}
                  >
                    {LETTERS[idx]}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.answerText,
                    pressed && styles.answerTextPressed,
                  ]}
                >
                  {answer.emoji ? `${answer.emoji}  ` : ''}{answer.text}
                </Text>
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  category: {
    fontFamily: fonts.sans,
    fontSize: 11,
    letterSpacing: 2,
    color: colors.accent,
    marginBottom: spacing.xs,
  },
  questionNum: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textFaint,
    marginBottom: spacing.md,
  },
  situationText: {
    fontFamily: fonts.serifItalic,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  questionText: {
    fontFamily: fonts.serif,
    fontSize: 20,
    color: colors.text,
    lineHeight: 28,
    marginBottom: spacing.lg,
  },
  answers: {
    gap: spacing.sm,
  },
  answerCard: {
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
  },
  answerCardPressed: {
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
  },
  answerInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  letterCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.subtle06,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  letterCirclePressed: {
    backgroundColor: colors.accent,
  },
  letterText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },
  letterTextPressed: {
    color: colors.white,
  },
  answerText: {
    fontFamily: fonts.sans,
    fontSize: 15,
    color: colors.textSoft,
    flex: 1,
    lineHeight: 21,
  },
  answerTextPressed: {
    color: colors.text,
  },

  // ===== Slider styles =====
  sliderLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sliderLabelLeft: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textMuted,
    flex: 1,
    textAlign: 'left',
  },
  sliderLabelRight: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textMuted,
    flex: 1,
    textAlign: 'right',
  },
  sliderContainer: {
    marginBottom: spacing.md,
  },
  sliderTrack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.cardBg,
    borderRadius: radius.md,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
  },
  sliderTick: {
    width: 28,
    height: 40,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderTickCenter: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  sliderTickSelected: {
    backgroundColor: colors.accent,
  },
  sliderTickText: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
  },
  sliderTickTextSelected: {
    color: colors.white,
  },
  sliderValueDisplay: {
    fontFamily: fonts.serif,
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  confirmBtn: {
    backgroundColor: colors.accent,
    paddingVertical: 14,
    borderRadius: radius.full,
    alignItems: 'center',
  },
  confirmBtnPressed: {
    opacity: 0.85,
  },
  confirmBtnText: {
    fontFamily: fonts.sans,
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});
