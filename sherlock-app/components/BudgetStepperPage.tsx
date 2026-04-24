// ═══════════════════════════════════════════════════════════════
//  BUDGET STEPPER PAGE
//  N affirmations, chacune avec un stepper [-]/val/[+]
//  Contrainte : Σ|valeurs| = budget total (10 ou 6)
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, fonts, spacing, radius } from '../constants/theme';
import type { AgeBand } from '../constants/quiz_v3';
import { findStmt } from '../constants/quiz_v3';

interface Props {
  stmtIds: string[];
  responses: Record<string, number>;
  budget: number;
  ageBand: AgeBand;
  onChange: (stmtId: string, value: number) => void;
  subtitle?: string;
  hint?: string;
  isFinal?: boolean;  // enables slightly different min/max range
}

export default function BudgetStepperPage({
  stmtIds,
  responses,
  budget,
  ageBand,
  onChange,
  subtitle,
  hint,
  isFinal = false,
}: Props) {
  const MIN = isFinal ? -2 : -3;
  const MAX = isFinal ? 6 : 5;

  const used = stmtIds.reduce((s, id) => s + Math.abs(responses[id] ?? 0), 0);
  const meterColor =
    used === budget ? colors.success :
    used > budget   ? colors.error   :
                       colors.accent;

  return (
    <View style={styles.container}>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {hint && <Text style={styles.hint}>{hint}</Text>}

      <View style={styles.meter}>
        <Text style={styles.meterLabel}>Budget à distribuer</Text>
        <Text style={[styles.meterValue, { color: meterColor }]}>
          {used} / {budget}
        </Text>
      </View>

      {stmtIds.map((sid) => {
        const stmt = findStmt(sid, ageBand);
        if (!stmt) return null;
        const v = responses[sid] ?? 0;
        // Decide button disabled state based on whether click moves away from 0 (costs budget)
        const tryIncrement = (delta: number) => {
          const newV = v + delta;
          if (newV < MIN || newV > MAX) return;
          const absDelta = Math.abs(newV) - Math.abs(v);
          if (absDelta > 0 && used >= budget) return;
          onChange(sid, newV);
        };
        const canMinus = v > MIN && !(Math.abs(v - 1) > Math.abs(v) && used >= budget);
        const canPlus = v < MAX && !(Math.abs(v + 1) > Math.abs(v) && used >= budget);
        return (
          <View key={sid} style={styles.row}>
            <Text style={styles.label} numberOfLines={3}>{stmt.txt}</Text>
            <View style={styles.stepper}>
              <Pressable
                onPress={() => tryIncrement(-1)}
                disabled={!canMinus}
                style={({ pressed }) => [
                  styles.stepBtn,
                  !canMinus && styles.stepBtnDisabled,
                  pressed && canMinus && styles.stepBtnPressed,
                ]}
              >
                <Text style={styles.stepBtnText}>−</Text>
              </Pressable>
              <Text style={[
                styles.val,
                v > 0 && styles.valPos,
                v < 0 && styles.valNeg,
              ]}>
                {v > 0 ? `+${v}` : v}
              </Text>
              <Pressable
                onPress={() => tryIncrement(1)}
                disabled={!canPlus}
                style={({ pressed }) => [
                  styles.stepBtn,
                  !canPlus && styles.stepBtnDisabled,
                  pressed && canPlus && styles.stepBtnPressed,
                ]}
              >
                <Text style={styles.stepBtnText}>+</Text>
              </Pressable>
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm },

  subtitle: {
    fontFamily: fonts.serif, fontSize: 18, color: colors.text,
    marginBottom: spacing.xs, lineHeight: 24,
  },
  hint: {
    fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted,
    fontStyle: 'italic', marginBottom: spacing.md,
  },

  meter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.sm, paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  meterLabel: {
    fontFamily: fonts.sans, fontSize: 11, fontWeight: '700',
    color: colors.textMuted, letterSpacing: 1, textTransform: 'uppercase',
  },
  meterValue: {
    fontFamily: fonts.serif, fontSize: 22, fontWeight: '700',
  },

  row: {
    backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  label: {
    flex: 1,
    fontFamily: fonts.serif, fontSize: 14,
    color: colors.text, lineHeight: 18,
  },
  stepper: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: colors.bgLight,
    borderRadius: 24, padding: 3,
  },
  stepBtn: {
    width: 34, height: 34, borderRadius: 17,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  stepBtnPressed: { backgroundColor: colors.accent },
  stepBtnDisabled: { opacity: 0.3 },
  stepBtnText: {
    fontFamily: fonts.sans, fontSize: 20, fontWeight: '700',
    color: colors.text, lineHeight: 22,
  },
  val: {
    minWidth: 36, textAlign: 'center',
    fontFamily: fonts.serif, fontSize: 18, fontWeight: '700',
    color: colors.text,
  },
  valPos: { color: colors.success },
  valNeg: { color: colors.error },
});
