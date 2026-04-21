// ═══════════════════════════════════════════════════════════════
//  ADAPTIVE QUESTION — rend les 6 formats du quiz v2
//
//  Formats supportés :
//   - choice              : MCQ classique
//   - forced_choice       : 2 options "ou bien / ou bien"
//   - slider              : -2..+2
//   - scenario_complete   : "Il/Elle…" + options qui complètent la phrase
//   - memory              : (rendu comme un choice avec setup spécifique)
//   - validation          : "Cette description vous parle ?" → oui/à peu près/non
// ═══════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, fonts, spacing, radius } from '../constants/theme';
import { AdaptiveQuestion as Q } from '../constants/quiz_v2';

interface Props {
  question: Q;
  stepIndex: number;
  estimatedTotal: number;
  onChoice: (optIdx: number) => void;
  onSlider: (value: number) => void;
  onValidation: (response: 'oui' | 'peupres' | 'non') => void;
  onSkip: () => void;
}

const SLIDER_TICKS = [-2, -1, 0, 1, 2];

export default function AdaptiveQuestion({
  question, stepIndex, estimatedTotal,
  onChoice, onSlider, onValidation, onSkip,
}: Props) {
  const [sliderValue, setSliderValue] = useState(0);

  // ── Header commun ──
  const phaseLabel =
    question.phase === 'positioning' ? 'Pour démarrer' :
    question.phase === 'validation'  ? 'Dernière vérification' :
                                        'Affinons';

  const Header = (
    <View style={styles.header}>
      <View style={styles.headerTopRow}>
        <Text style={styles.category}>{phaseLabel.toUpperCase()} · {question.category.toUpperCase()}</Text>
        <Text style={styles.questionNum}>{stepIndex} / ~{estimatedTotal}</Text>
      </View>

      {question.setup && (
        <View style={styles.sceneBox}>
          {question.icon && <Text style={styles.sceneIcon}>{question.icon}</Text>}
          <Text style={styles.sceneSetup}>{question.setup}</Text>
        </View>
      )}

      <Text style={styles.questionText}>{question.prompt}</Text>
    </View>
  );

  // ═══════════ Validation ═══════════
  if (question.format === 'validation') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <Text style={styles.category}>DERNIÈRE VÉRIFICATION</Text>
            <Text style={styles.questionNum}>{stepIndex} / ~{estimatedTotal}</Text>
          </View>
          <Text style={styles.validationLead}>{question.prompt}</Text>
          <View style={styles.validationDescBox}>
            <Text style={styles.validationDescText}>« {question.validationText} »</Text>
          </View>
        </View>

        <View style={styles.answers}>
          <Pressable
            onPress={() => onValidation('oui')}
            style={({ pressed }) => [styles.validationBtn, styles.validationBtnYes, pressed && styles.answerCardPressed]}
          >
            <Text style={styles.validationBtnEmoji}>✅</Text>
            <Text style={styles.validationBtnText}>Oui, ça lui ressemble vraiment</Text>
          </Pressable>

          <Pressable
            onPress={() => onValidation('peupres')}
            style={({ pressed }) => [styles.validationBtn, pressed && styles.answerCardPressed]}
          >
            <Text style={styles.validationBtnEmoji}>🤔</Text>
            <Text style={styles.validationBtnText}>À peu près, en partie seulement</Text>
          </Pressable>

          <Pressable
            onPress={() => onValidation('non')}
            style={({ pressed }) => [styles.validationBtn, styles.validationBtnNo, pressed && styles.answerCardPressed]}
          >
            <Text style={styles.validationBtnEmoji}>❌</Text>
            <Text style={styles.validationBtnText}>Non, pas vraiment</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // ═══════════ Slider ═══════════
  if (question.format === 'slider') {
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

  // ═══════════ Choice / Forced choice / Scenario complete / Memory ═══════════
  const isForced = question.format === 'forced_choice';
  return (
    <View style={styles.container}>
      {Header}

      <View style={[styles.answers, isForced && styles.answersForced]}>
        {(question.options || []).map((opt, idx) => (
          <Pressable
            key={idx}
            onPress={() => onChoice(idx)}
            style={({ pressed }) => [
              styles.answerCard,
              isForced && styles.answerCardForced,
              pressed && styles.answerCardPressed,
            ]}
          >
            <Text style={styles.answerText}>
              {opt.emoji ? `${opt.emoji}  ` : ''}{opt.text}
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
    fontFamily: fonts.sans, fontSize: 11, letterSpacing: 1.2,
    color: colors.accent, fontWeight: '700', flex: 1,
  },
  questionNum: { fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted },

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
    flex: 1, fontFamily: fonts.serifItalic, fontSize: 14,
    lineHeight: 22, color: colors.textSoft,
  },

  questionText: {
    fontFamily: fonts.serif, fontSize: 19, color: colors.text, lineHeight: 27,
  },

  answers: { gap: spacing.sm },
  answersForced: { gap: spacing.md },
  answerCard: {
    backgroundColor: colors.cardBg, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, paddingVertical: spacing.md, paddingHorizontal: spacing.md,
  },
  answerCardForced: {
    paddingVertical: spacing.lg,
    backgroundColor: colors.surface,
    borderColor: colors.borderLight,
  },
  answerCardPressed: {
    borderColor: colors.accent, backgroundColor: colors.accentSoft,
  },
  answerText: {
    fontFamily: fonts.sans, fontSize: 15, color: colors.textSoft, lineHeight: 22,
  },

  skipBtn: { padding: spacing.md, alignItems: 'center', marginTop: spacing.sm },
  skipBtnText: {
    fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted,
    textDecorationLine: 'underline',
  },

  // Slider
  sliderLabelsRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.md,
    gap: spacing.sm,
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
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    backgroundColor: colors.cardBg, borderRadius: radius.md,
    paddingVertical: spacing.sm, paddingHorizontal: spacing.sm,
  },
  sliderTick: {
    width: 50, height: 50, borderRadius: radius.sm,
    alignItems: 'center', justifyContent: 'center',
  },
  sliderTickCenter: { borderWidth: 1, borderColor: colors.border },
  sliderTickSelected: { backgroundColor: colors.accent },
  sliderTickText: {
    fontFamily: fonts.sans, fontSize: 14, color: colors.textMuted, fontWeight: '600',
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

  // Validation
  validationLead: {
    fontFamily: fonts.serif, fontSize: 18, color: colors.text,
    lineHeight: 26, marginBottom: spacing.md,
  },
  validationDescBox: {
    backgroundColor: colors.accentFill,
    borderWidth: 1, borderColor: colors.accent,
    borderRadius: radius.md, padding: spacing.md,
  },
  validationDescText: {
    fontFamily: fonts.serifItalic, fontSize: 15, color: colors.text,
    lineHeight: 23,
  },
  validationBtn: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    backgroundColor: colors.cardBg, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, paddingVertical: spacing.md, paddingHorizontal: spacing.md,
  },
  validationBtnYes: { borderColor: colors.successDark },
  validationBtnNo: { borderColor: colors.errorDark },
  validationBtnEmoji: { fontSize: 22 },
  validationBtnText: {
    flex: 1, fontFamily: fonts.sans, fontSize: 15, color: colors.textSoft,
  },
});
