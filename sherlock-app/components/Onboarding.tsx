// ═══════════════════════════════════════════════════════════════
//  ONBOARDING — shown once on first launch (after sign-in).
//  3 steps that orient the user toward the core value (the quiz).
//  A "seen" flag is persisted by the caller (RootLayout) in AsyncStorage.
// ═══════════════════════════════════════════════════════════════

import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, fonts, spacing, radius } from '../constants/theme';
import { useT } from '../i18n';

export default function Onboarding({ onDone }: { onDone: () => void }) {
  const { t } = useT();
  const [step, setStep] = useState(0);

  const slides = [
    { emoji: '👋', title: t('onboarding.s1Title'), body: t('onboarding.s1Body') },
    { emoji: '🧭', title: t('onboarding.s2Title'), body: t('onboarding.s2Body') },
    { emoji: '🕐', title: t('onboarding.s3Title'), body: t('onboarding.s3Body') },
  ];
  const last = step === slides.length - 1;
  const s = slides[step];

  return (
    <View style={styles.container}>
      <Pressable onPress={onDone} style={styles.skip} hitSlop={10}>
        <Text style={styles.skipText}>{t('onboarding.skip')}</Text>
      </Pressable>

      <View style={styles.content}>
        <Text style={styles.emoji}>{s.emoji}</Text>
        <Text style={styles.title}>{s.title}</Text>
        <Text style={styles.body}>{s.body}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View key={i} style={[styles.dot, i === step && styles.dotActive]} />
          ))}
        </View>
        <Pressable
          onPress={() => (last ? onDone() : setStep(step + 1))}
          style={({ pressed }) => [styles.cta, pressed && { opacity: 0.85 }]}
        >
          <Text style={styles.ctaText}>{last ? t('onboarding.start') : t('common.next')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: colors.bg,
    paddingHorizontal: spacing.lg, paddingTop: 64, paddingBottom: spacing.xxl,
  },
  skip: { alignSelf: 'flex-end', padding: spacing.sm },
  skipText: { fontFamily: fonts.sans, fontSize: 14, color: colors.textMuted },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md },
  emoji: { fontSize: 64, marginBottom: spacing.sm },
  title: {
    fontFamily: fonts.serif, fontSize: 26, lineHeight: 32,
    color: colors.text, textAlign: 'center',
  },
  body: {
    fontFamily: fonts.sans, fontSize: 15, lineHeight: 23,
    color: colors.textSoft, textAlign: 'center', paddingHorizontal: spacing.sm,
  },
  footer: { gap: spacing.lg },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
  dot: {
    width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border,
  },
  dotActive: { backgroundColor: colors.accent, width: 22 },
  cta: {
    backgroundColor: colors.accent, borderRadius: radius.full,
    paddingVertical: 16, alignItems: 'center',
  },
  ctaText: { fontFamily: fonts.sans, fontSize: 15, fontWeight: '700', color: colors.white },
});
