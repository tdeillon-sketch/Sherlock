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
import { useT } from '../i18n';

interface Props {
  page: Page;
  pageIndex: number;
  ageBand: AgeBand;
  onChange: (stmtId: string, value: number) => void;
}

export default function AdaptiveQuestion({ page, pageIndex, ageBand, onChange }: Props) {
  const { t } = useT();

  if (page.kind === 'likert') {
    const n = pageIndex + 1;
    const subtitle = n === 1 ? t('quiz.likertSubtitle1') : t('quiz.likertSubtitleN');
    const hint = t('quiz.likertHint');
    return (
      <View style={styles.wrap}>
        <Text style={styles.phaseLabel}>PAGE {n} · {t('quiz.likertPhase')}</Text>
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
        <Text style={styles.phaseLabel}>PAGE {pageIndex + 1} · {t('quiz.budgetPhase')}</Text>
        <BudgetStepperPage
          stmtIds={page.stmtIds}
          responses={page.responses}
          budget={page.budget}
          ageBand={ageBand}
          onChange={onChange}
          subtitle={t('quiz.budgetSubtitle')}
          hint={t('quiz.budgetHint')}
        />
      </View>
    );
  }

  if (page.kind === 'final') {
    return (
      <View style={styles.wrap}>
        <Text style={styles.phaseLabel}>PAGE {pageIndex + 1} · {t('quiz.finalPhase')}</Text>
        <BudgetStepperPage
          stmtIds={page.stmtIds}
          responses={page.responses}
          budget={page.budget}
          ageBand={ageBand}
          onChange={onChange}
          isFinal
          subtitle={t('quiz.finalSubtitle')}
          hint={t('quiz.finalHint')}
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
