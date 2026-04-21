// ═══════════════════════════════════════════════════════════════
//  CONFIDENCE BAR — affiche le score de confiance du résultat
//
//  - Barre horizontale 0..100% avec gradient orange
//  - Label : Très confiant / Confiant / Plutôt confiant / À préciser
//  - Bouton "Préciser (3 questions de plus)" si confiance < 80
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, spacing, radius } from '../constants/theme';

interface Props {
  /** 0..100 */
  confidence: number;
  label: 'Très confiant' | 'Confiant' | 'Plutôt confiant' | 'À préciser';
  onRefine?: () => void;
  canRefine?: boolean;
}

export default function ConfidenceBar({
  confidence, label, onRefine, canRefine,
}: Props) {
  const showRefineBtn = canRefine && confidence < 80 && !!onRefine;

  // Couleur selon le niveau
  const tone =
    confidence >= 80 ? colors.success :
    confidence >= 60 ? colors.accent :
    confidence >= 40 ? colors.accentLight :
                       colors.textMuted;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Confiance du résultat</Text>
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

      <Text style={[styles.qualifier, { color: tone }]}>{label}</Text>

      {showRefineBtn && (
        <>
          <Text style={styles.refineHint}>
            Le résultat n'est pas tranché. Vous pouvez répondre à 3 questions
            de plus pour le préciser.
          </Text>
          <Pressable
            onPress={onRefine}
            style={({ pressed }) => [
              styles.refineBtn, pressed && { opacity: 0.85 },
            ]}
          >
            <Text style={styles.refineBtnText}>
              ✨ Préciser (3 questions de plus)
            </Text>
          </Pressable>
        </>
      )}
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
  refineHint: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 18,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  refineBtn: {
    backgroundColor: colors.accentFill,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  refineBtnText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    fontWeight: '600',
    color: colors.accent,
  },
});
