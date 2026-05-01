// ═══════════════════════════════════════════════════════════════
//  EN COMING SOON BANNER
//  Bandeau affiché en haut des sections encore en FR pour les
//  utilisateurs en mode EN. Les sections FR-only sont :
//   - Profile detail page (book content)
//   - Duo (162 dynamiques parent-enfant)
//   - Case files / Dossiers
//
//  Le composant ne s'affiche que si locale === 'en'.
// ═══════════════════════════════════════════════════════════════

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts, spacing, radius } from '../constants/theme';
import { useT } from '../i18n';

export default function EnComingSoonBanner() {
  const { t, locale } = useT();
  if (locale !== 'en') return null;

  return (
    <View style={styles.banner}>
      <Text style={styles.label}>{t('enComingSoon.label')}</Text>
      <Text style={styles.text}>{t('enComingSoon.text')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: colors.accentSoft,
    borderWidth: 1, borderColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
  },
  label: {
    fontFamily: fonts.sans, fontSize: 10, fontWeight: '700',
    color: colors.accent, letterSpacing: 1, textTransform: 'uppercase',
    marginBottom: 4,
  },
  text: {
    fontFamily: fonts.sans, fontSize: 12, lineHeight: 17,
    color: colors.textSoft, fontStyle: 'italic',
  },
});
