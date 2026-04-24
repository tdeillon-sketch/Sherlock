// ═══════════════════════════════════════════════════════════════
//  ADAPTIVE QUESTION — DISPATCHER (v3)
//  Route selon le kind de la Page courante :
//   - likert → LikertSliderPage
//   - budget / final → BudgetStepperPage
//   - wing   → WingPage
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '../constants/theme';
import type { AgeBand } from '../constants/quiz_v3';
import type { Page } from '../hooks/useAdaptiveQuiz';
import LikertSliderPage from './LikertSliderPage';
import BudgetStepperPage from './BudgetStepperPage';
import WingPage from './WingPage';

interface Props {
  page: Page;
  pageIndex: number;
  ageBand: AgeBand;
  onChange: (stmtId: string, value: number) => void;
}

export default function AdaptiveQuestion({ page, pageIndex, ageBand, onChange }: Props) {
  if (page.kind === 'likert') {
    const n = pageIndex + 1;
    const subtitle = n === 1
      ? 'Pour chaque affirmation, à quel point ça te ressemble ?'
      : 'On continue — glisse chaque curseur selon ta perception.';
    const hint = 'Curseur au centre = sans avis. À droite si ça te ressemble, à gauche si non.';
    return (
      <View style={styles.wrap}>
        <Text style={styles.phaseLabel}>PAGE {n} · SCAN LIBRE</Text>
        <LikertSliderPage
          stmtIds={page.stmtIds}
          responses={page.responses}
          ageBand={ageBand}
          onChange={onChange}
          subtitle={subtitle}
          hint={hint}
        />
      </View>
    );
  }

  if (page.kind === 'budget') {
    return (
      <View style={styles.wrap}>
        <Text style={styles.phaseLabel}>PAGE {pageIndex + 1} · HIÉRARCHIE</Text>
        <BudgetStepperPage
          stmtIds={page.stmtIds}
          responses={page.responses}
          budget={page.budget}
          ageBand={ageBand}
          onChange={onChange}
          subtitle="Répartis 10 points sur ces affirmations"
          hint="Tu peux aller en négatif (jusqu'à −3) pour retirer du signal. Chaque point consomme du budget."
        />
      </View>
    );
  }

  if (page.kind === 'final') {
    return (
      <View style={styles.wrap}>
        <Text style={styles.phaseLabel}>PAGE {pageIndex + 1} · DÉPARTAGE</Text>
        <BudgetStepperPage
          stmtIds={page.stmtIds}
          responses={page.responses}
          budget={page.budget}
          ageBand={ageBand}
          onChange={onChange}
          isFinal
          subtitle="Départage tes finalistes"
          hint="Chaque affirmation représente un des types en tête. 6 points pour trancher."
        />
      </View>
    );
  }

  if (page.kind === 'wing') {
    return (
      <WingPage
        stmtIds={page.stmtIds}
        responses={page.responses}
        ageBand={ageBand}
        topType={page.topType}
        wings={page.wings}
        onChange={onChange}
      />
    );
  }

  return null;
}

const styles = StyleSheet.create({
  wrap: { paddingVertical: spacing.sm },
  phaseLabel: {
    fontFamily: fonts.sans, fontSize: 11, fontWeight: '700',
    color: colors.accent, letterSpacing: 1.5, textTransform: 'uppercase',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xs,
  },
});
