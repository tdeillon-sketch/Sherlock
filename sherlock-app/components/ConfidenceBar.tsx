// ═══════════════════════════════════════════════════════════════
//  CONFIDENCE BAR — affiche le score de confiance du résultat
//
//  V3 : le bouton "Préciser" a été retiré (le flow adaptatif gère
//  lui-même la relance). Barre + label uniquement.
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, spacing, radius } from '../constants/theme';
import { useT } from '../i18n';

interface Props {
  /** 0..100 */
  confidence: number;
  /** Legacy prop, ignored — label is now derived via i18n from confidence */
  label?: string;
}

export default function ConfidenceBar({ confidence }: Props) {
  const { t } = useT();
  const tone =
    confidence >= 80 ? colors.success :
    confidence >= 60 ? colors.accent :
    confidence >= 40 ? colors.accentLight :
                       colors.textMuted;
  const localizedLabel =
    confidence >= 80 ? t('result.confidenceVeryHigh') :
    confidence >= 60 ? t('result.confidenceHigh') :
    confidence >= 40 ? t('result.confidenceMid') :
                       t('result.confidenceLow');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{t('result.confidenceLabel')}</Text>
        <Text style={[styles.percent, { color: tone }]}>{confidence}%</Text>
      </View>

      <View style={styles.track}>
        <LinearGradient
          colors={[tone, tone === colors.accent ? colors.accentLight : tone]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.fill, { width: `${Math.max(4, confidence)}%` as any }]}
        />
      </View>

      <Text style={[styles.qualifier, { color: tone }]}>{localizedLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: spacing.sm,
  },
  label: {
    fontFamily: fonts.sans,
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  percent: {
    fontFamily: fonts.serif,
    fontSize: 22,
    fontWeight: '700' as any,
  },
  track: {
    height: 8,
    backgroundColor: colors.subtle06,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: { height: 8, borderRadius: 4 },
  qualifier: {
    fontFamily: fonts.sans,
    fontSize: 13,
    fontWeight: '600',
    marginTop: spacing.sm,
  },
});
