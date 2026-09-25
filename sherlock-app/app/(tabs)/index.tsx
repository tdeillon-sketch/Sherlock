import { useEffect, useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { colors, fonts, spacing, radius } from '../../constants/theme';
import { useT } from '../../i18n';
import { openFeedbackEmail } from '../../utils/feedback';
import { auth, isAdmin, onAuthChange, trackScreen } from '../../constants/firebase';

// ═══════════════════════════════════════════════════════════════
//  HOME
//
//  One reading order, for everyone:
//    what this app is for → what is what (+ where to start) → what you can
//    reach → why this app (Thomas's text).
//  "Ma famille" lives in Profils, the daily question ("Mon journal") in
//  Testez-vous.
// ═══════════════════════════════════════════════════════════════

// "Quoi est quoi" — one row per part of the app. The four tabs reuse the tab
// labels (tabs.*) so the home never drifts from the tab bar.
const GUIDE: { icon: string; titleKey: string; descKey: string; route: string }[] = [
  { icon: '🪞', titleKey: 'tabs.quiz',            descKey: 'home.guideQuizDesc',     route: '/quiz' },
  { icon: '📖', titleKey: 'tabs.profiles',        descKey: 'home.guideProfilesDesc', route: '/profiles' },
  { icon: '🤝', titleKey: 'tabs.duo',             descKey: 'home.guideDuoDesc',      route: '/duo' },
  { icon: '🔍', titleKey: 'tabs.celebrities',     descKey: 'home.guideGameDesc',     route: '/celebrities' },
  { icon: '🗺️', titleKey: 'home.guideMapTitle',    descKey: 'home.guideMapDesc',      route: '/family-map' },
];

// Texts stored as one string with blank lines between paragraphs.
const paragraphs = (s: string) => s.split('\n\n').map((p) => p.trim()).filter(Boolean);

export default function HomeScreen() {
  const { t } = useT();
  const [admin, setAdmin] = useState(isAdmin(auth.currentUser));

  // Re-evaluate admin status when auth changes
  useEffect(() => {
    return onAuthChange((u) => setAdmin(isAdmin(u)));
  }, []);

  // Track screen view (analytics)
  useEffect(() => {
    trackScreen('home').catch(() => {});
  }, []);

  // ── 1. What this app is for ──
  const introSection = (
    <View style={styles.intro}>
      <Text style={styles.introTitle}>{t('home.introTitle')}</Text>
      <Text style={styles.introBody}>{t('home.introBody')}</Text>
    </View>
  );

  // ── 2. What is what + where to start ──
  const guideSection = (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{t('home.guideTitle')}</Text>
      <View style={styles.guideList}>
        {GUIDE.map((g) => (
          <Pressable
            key={g.route}
            onPress={() => router.push(g.route as never)}
            style={({ pressed }) => [styles.guideRow, pressed && { opacity: 0.7 }]}
          >
            <Text style={styles.guideIcon}>{g.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.guideTitle}>{t(g.titleKey)}</Text>
              <Text style={styles.guideDesc}>{t(g.descKey)}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.startCard}>
        <Text style={styles.startTitle}>{t('home.startTitle')}</Text>
        <Text style={styles.startBody}>{t('home.startBody')}</Text>
        <Pressable
          onPress={() => router.push('/quiz' as never)}
          style={({ pressed }) => [styles.startCta, pressed && { opacity: 0.85 }]}
        >
          <Text style={styles.startCtaText}>{t('home.startCta')}  →</Text>
        </Pressable>
      </View>
    </View>
  );

  // ── 3. What you can reach by going deep ──
  const reachSection = (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{t('home.reachTitle')}</Text>
      <View style={styles.reachList}>
        {paragraphs(t('home.reachBody')).map((p, i) => (
          <View key={i} style={styles.reachRow}>
            <Text style={styles.reachDash}>•</Text>
            <Text style={styles.reachText}>{p}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  // ── 4. Why this app — Thomas's text, one block ──
  const whySection = (
    <View style={styles.why}>
      <Text style={styles.sectionLabel}>{t('home.whyTitle')}</Text>
      {paragraphs(t('home.whyBody')).map((p, i) => (
        <Text key={i} style={styles.whyBody}>{p}</Text>
      ))}
      <Text style={styles.whySignature}>{t('home.whySignature')}</Text>
      <Pressable
        onPress={() => openFeedbackEmail(t)}
        accessibilityRole="link"
        style={({ pressed }) => [styles.feedback, pressed && { opacity: 0.6 }]}
      >
        <Text style={styles.feedbackText}>{t('feedback.homeLink')}</Text>
      </Pressable>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* ── Top bar (brand + account) ── */}
      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <View style={styles.brandSquare}>
            <Text style={styles.brandSquareLetter}>5</Text>
          </View>
          <Text style={styles.brandLabel}>{t('home.brandLabel')}</Text>
        </View>
        <View style={styles.topBarRight}>
          {admin && (
            <Pressable
              onPress={() => router.push('/admin' as never)}
              accessibilityLabel="Admin"
              style={({ pressed }) => [styles.adminBtn, pressed && { opacity: 0.6 }]}
              hitSlop={10}
            >
              <Text style={styles.adminBtnText}>★</Text>
            </Pressable>
          )}
          <Pressable
            onPress={() => router.push('/account' as never)}
            accessibilityLabel={t('account.title')}
            style={({ pressed }) => [styles.accountBtn, pressed && { opacity: 0.6 }]}
            hitSlop={10}
          >
            <Text style={styles.accountBtnIcon}>👤</Text>
          </Pressable>
        </View>
      </View>

      {introSection}
      {guideSection}
      {reachSection}
      {whySection}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: spacing.xxl + spacing.xl },

  // ── Top bar ──
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 56, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  brandSquare: {
    width: 30, height: 30, borderRadius: 8,
    backgroundColor: colors.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  brandSquareLetter: {
    fontFamily: fonts.serifItalic, fontSize: 16, fontWeight: '500', color: colors.white,
  },
  brandLabel: {
    fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted,
    letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: '600',
  },
  topBarRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  accountBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  accountBtnIcon: { fontSize: 18 },
  adminBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: colors.accent,
    alignItems: 'center', justifyContent: 'center',
  },
  adminBtnText: { color: colors.white, fontSize: 18, fontWeight: '700' },

  // ── Shared ──
  section: { marginHorizontal: spacing.md, marginTop: spacing.xl },
  sectionLabel: {
    fontFamily: fonts.sans, fontSize: 11, fontWeight: '700',
    color: colors.textMuted, letterSpacing: 1.2, textTransform: 'uppercase',
    marginBottom: 6,
  },
  chevron: { fontSize: 24, color: colors.textDim, paddingHorizontal: spacing.xs },

  // ── 1. Intro ──
  intro: { paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.xs },
  introTitle: {
    fontFamily: fonts.serifItalic, fontSize: 26, lineHeight: 34, color: colors.text,
  },
  introBody: {
    fontFamily: fonts.sans, fontSize: 14.5, lineHeight: 23,
    color: colors.textSoft, marginTop: spacing.md,
  },

  // ── 2. Guide ──
  guideList: { gap: 8, marginTop: spacing.sm },
  guideRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    paddingVertical: 12, paddingHorizontal: 14,
    backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.md,
  },
  guideIcon: { fontSize: 22, width: 32, textAlign: 'center' },
  guideTitle: { fontFamily: fonts.serif, fontSize: 16, color: colors.text },
  guideDesc: { fontFamily: fonts.sans, fontSize: 12.5, lineHeight: 18, color: colors.textMuted, marginTop: 2 },

  startCard: {
    marginTop: spacing.md, padding: spacing.lg,
    backgroundColor: colors.accentFill,
    borderWidth: 1, borderColor: colors.accent, borderRadius: radius.md,
  },
  startTitle: {
    fontFamily: fonts.sans, fontSize: 11, fontWeight: '700',
    color: colors.accentText, letterSpacing: 1.2, textTransform: 'uppercase',
  },
  startBody: {
    fontFamily: fonts.sans, fontSize: 14.5, lineHeight: 22,
    color: colors.text, marginTop: spacing.sm,
  },
  startCta: {
    marginTop: spacing.md, alignSelf: 'flex-start', minHeight: 44, justifyContent: 'center',
    backgroundColor: colors.accent, borderRadius: radius.full,
    paddingVertical: 11, paddingHorizontal: spacing.lg,
  },
  startCtaText: { fontFamily: fonts.sans, fontSize: 14, fontWeight: '700', color: colors.white },

  // ── 3. Reach ──
  reachList: { gap: spacing.sm, marginTop: spacing.xs },
  reachRow: { flexDirection: 'row', gap: spacing.sm, paddingHorizontal: spacing.xs },
  reachDash: { fontFamily: fonts.serif, fontSize: 15, lineHeight: 22, color: colors.accentText },
  reachText: { flex: 1, fontFamily: fonts.sans, fontSize: 14.5, lineHeight: 22, color: colors.textSoft },

  // ── 4. Why this app ──
  why: {
    marginHorizontal: spacing.md, marginTop: spacing.xxl,
    paddingTop: spacing.xl, paddingHorizontal: spacing.xs,
    borderTopWidth: 1, borderTopColor: colors.border,
  },
  whyBody: {
    fontFamily: fonts.sans, fontSize: 14.5, lineHeight: 23,
    color: colors.textSoft, marginTop: spacing.md,
  },
  whySignature: {
    fontFamily: fonts.serifItalic, fontSize: 22, color: colors.text,
    marginTop: spacing.lg,
  },
  feedback: { marginTop: 2, paddingVertical: 14, alignSelf: 'flex-start' },
  feedbackText: {
    fontFamily: fonts.sans, fontSize: 12.5, color: colors.textMuted,
    textDecorationLine: 'underline',
  },
});
