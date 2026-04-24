// ═══════════════════════════════════════════════════════════════
//  WING PAGE — Page finale qui détermine l'aile du type dominant.
//  Réutilise LikertSliderPage avec 2 items (une par aile adjacente).
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, spacing } from '../constants/theme';
import type { AgeBand, EnneaType } from '../constants/quiz_v3';
import LikertSliderPage from './LikertSliderPage';

interface Props {
  stmtIds: string[];
  responses: Record<string, number>;
  ageBand: AgeBand;
  topType: EnneaType;
  wings: [EnneaType, EnneaType];
  onChange: (stmtId: string, value: number) => void;
}

export default function WingPage({
  stmtIds, responses, ageBand, topType, wings, onChange,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text style={styles.bannerLabel}>DERNIÈRE ÉTAPE · AILE</Text>
        <Text style={styles.bannerTitle}>
          Type {topType} — quelle teinte ?
        </Text>
        <Text style={styles.bannerHint}>
          Deux ailes possibles pour ton Type {topType} : aile {wings[0]} ou aile {wings[1]}.
          Celle qui te parle le plus l'emporte.
        </Text>
      </View>

      <LikertSliderPage
        stmtIds={stmtIds}
        responses={responses}
        ageBand={ageBand}
        onChange={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: spacing.sm },
  banner: {
    backgroundColor: colors.accentSoft,
    borderWidth: 1, borderColor: colors.accent,
    borderRadius: 14,
    paddingHorizontal: spacing.md, paddingVertical: spacing.md,
    marginHorizontal: spacing.md, marginBottom: spacing.md,
  },
  bannerLabel: {
    fontFamily: fonts.sans, fontSize: 11, fontWeight: '700',
    color: colors.accent, letterSpacing: 1.5, textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  bannerTitle: {
    fontFamily: fonts.serif, fontSize: 20, color: colors.text,
    marginBottom: spacing.xs,
  },
  bannerHint: {
    fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted,
    fontStyle: 'italic', lineHeight: 18,
  },
});
