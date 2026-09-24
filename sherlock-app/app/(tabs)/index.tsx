import { useCallback, useEffect, useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { colors, fonts, spacing, radius } from '../../constants/theme';
import { useT, getTypeText } from '../../i18n';
import { getDailyQuestion, formatRitualDate } from '../../constants/ritualQuestions';
import { saveAnswer } from '../../constants/ritualJournal';
import { openFeedbackEmail } from '../../utils/feedback';
import { TYPES } from '../../constants/data';
import { TYPES as TYPES_V3, type EnneaType } from '../../constants/quiz_v3';
import { auth, isAdmin, onAuthChange, trackScreen, loadFamily, type Family } from '../../constants/firebase';

// ═══════════════════════════════════════════════════════════════
//  HOME
//
//  First visit (nothing typed yet):
//    what this app is for → what is what (+ where to start) → what you can
//    reach → the daily ritual → why this app (Thomas's text).
//  Returning visit (family already typed):
//    Ma famille → the daily ritual → "Comment ça marche ?" (folded guide)
//    → why this app.
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
  const { t, locale } = useT();
  const [ritualOpen, setRitualOpen] = useState(false);
  const [ritualNote, setRitualNote] = useState('');
  const [howOpen, setHowOpen] = useState(false);
  const [admin, setAdmin] = useState(isAdmin(auth.currentUser));
  const [family, setFamily] = useState<Family | null>(null);
  const dailyQuestion = getDailyQuestion();
  const ritualDate = formatRitualDate(new Date(), locale);
  const ritualText = locale === 'en' ? dailyQuestion.en : dailyQuestion.fr;

  // Re-evaluate admin status when auth changes
  useEffect(() => {
    return onAuthChange((u) => setAdmin(isAdmin(u)));
  }, []);

  // Track screen view (analytics)
  useEffect(() => {
    trackScreen('home').catch(() => {});
  }, []);

  // Refresh "Ma famille" whenever the home regains focus (a quiz/profile may
  // have been saved in another tab).
  useFocusEffect(
    useCallback(() => {
      const uid = auth.currentUser?.uid;
      if (uid) loadFamily(uid).then(setFamily).catch(() => {});
    }, []),
  );

  const familyMembers = family
    ? [...(family.self ? [family.self] : []), ...family.adults, ...family.children].filter((m) => m.type != null)
    : [];
  // Someone who has already typed their family knows the app: show their
  // family first and fold the guide into one line.
  const isReturning = familyMembers.length > 0;

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

  const guide = (
    <>
      {introSection}
      {guideSection}
      {reachSection}
    </>
  );

  // ── Daily ritual ──
  const ritualCard = (
    <View style={styles.ritualCard}>
      <View style={styles.ritualHeader}>
        <Text style={styles.ritualEyebrow}>{t('home.ritualEyebrow')} · {ritualDate}</Text>
        <View style={styles.ritualDot} />
      </View>
      <Text style={styles.ritualText}>« {ritualText} »</Text>
      {!ritualOpen ? (
        <View style={styles.ritualCtaRow}>
          <Pressable
            onPress={() => setRitualOpen(true)}
            style={({ pressed }) => [styles.ritualCtaPrimary, pressed && { opacity: 0.85 }]}
          >
            <Text style={styles.ritualCtaPrimaryText}>{t('home.ritualCtaPrimary')}</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.ritualNoteWrap}>
          <Text style={styles.ritualNoteLabel}>{t('home.ritualNoteTitle')}</Text>
          <TextInput
            value={ritualNote}
            onChangeText={setRitualNote}
            placeholder={t('home.ritualNotePlaceholder')}
            placeholderTextColor={colors.textDim}
            style={styles.ritualNoteInput}
            multiline
            numberOfLines={4}
          />
          <View style={styles.ritualCtaRow}>
            <Pressable
              onPress={async () => {
                if (ritualNote.trim()) {
                  await saveAnswer({ question: ritualText, answer: ritualNote, locale });
                }
                setRitualOpen(false);
                setRitualNote('');
              }}
              style={({ pressed }) => [styles.ritualCtaPrimary, pressed && { opacity: 0.85 }]}
            >
              <Text style={styles.ritualCtaPrimaryText}>{t('home.ritualNoteSave')}</Text>
            </Pressable>
            <Pressable
              onPress={() => { setRitualOpen(false); setRitualNote(''); }}
              style={({ pressed }) => [styles.ritualCtaSecondary, pressed && { opacity: 0.85 }]}
            >
              <Text style={styles.ritualCtaSecondaryText}>{t('home.ritualNoteCancel')}</Text>
            </Pressable>
          </View>
        </View>
      )}
      <Pressable
        onPress={() => router.push('/journal' as never)}
        style={({ pressed }) => [styles.journalLink, pressed && { opacity: 0.6 }]}
        hitSlop={8}
      >
        <Text style={styles.journalLinkText}>{t('journal.viewJournal')}  →</Text>
      </Pressable>
    </View>
  );

  // ── Ma famille (saved profiles) ──
  const familySection = isReturning ? (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{t('family.title')}</Text>
      <View style={styles.familyList}>
        {familyMembers.map((m) => {
          const typeNum = m.type as number;
          const color = TYPES[typeNum - 1]?.color ?? colors.accent;
          const v3 = TYPES_V3[typeNum as EnneaType];
          const typeName = v3 ? getTypeText(v3, 'name', locale) : (TYPES[typeNum - 1]?.name ?? '');
          const label = m.kind === 'self' ? t('family.me') : m.name;
          return (
            <Pressable
              key={m.id}
              onPress={() => router.push(`/profiles/${typeNum}` as never)}
              style={({ pressed }) => [styles.familyRow, pressed && { opacity: 0.7 }]}
            >
              <View style={[styles.familyBadge, { backgroundColor: color }]}>
                <Text style={styles.familyBadgeNum}>{typeNum}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.familyName}>{label}</Text>
                <Text style={styles.familyType}>
                  {t('result.type')} {typeNum}{m.wingType ? `w${m.wingType}` : ''} · {typeName}
                </Text>
                {m.kind === 'adult' && (
                  <Text style={styles.familyType}>👥 {t('subject.procheTitle')}</Text>
                )}
                {m.kind === 'child' && m.age != null && (
                  <Text style={styles.familyType}>🧒 {t('subject.yearsOld', { n: m.age })}</Text>
                )}
              </View>
              <Text style={styles.chevron}>›</Text>
            </Pressable>
          );
        })}
      </View>
      <Pressable
        onPress={() => router.push('/checkin' as never)}
        style={({ pressed }) => [styles.familyCta, pressed && { opacity: 0.85 }]}
      >
        <Text style={styles.familyCtaText}>{t('checkin.cta')}</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push('/family-map' as never)}
        style={({ pressed }) => [styles.familyCta, pressed && { opacity: 0.85 }]}
      >
        <Text style={styles.familyCtaText}>{t('familyMap.cta')}</Text>
      </Pressable>
    </View>
  ) : null;

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
        hitSlop={6}
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

      {isReturning ? (
        <>
          {familySection}
          {ritualCard}
          <Pressable
            onPress={() => setHowOpen((o) => !o)}
            style={({ pressed }) => [styles.howToggle, pressed && { opacity: 0.7 }]}
          >
            <Text style={styles.howToggleText}>
              {howOpen ? t('home.howToggleClose') : t('home.howToggle')}
            </Text>
            <Text style={styles.howToggleChevron}>{howOpen ? '▴' : '▾'}</Text>
          </Pressable>
          {howOpen && guide}
        </>
      ) : (
        <>
          {guide}
          {ritualCard}
        </>
      )}

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
    color: colors.accent, letterSpacing: 1.2, textTransform: 'uppercase',
  },
  startBody: {
    fontFamily: fonts.sans, fontSize: 14.5, lineHeight: 22,
    color: colors.text, marginTop: spacing.sm,
  },
  startCta: {
    marginTop: spacing.md, alignSelf: 'flex-start',
    backgroundColor: colors.accent, borderRadius: radius.full,
    paddingVertical: 11, paddingHorizontal: spacing.lg,
  },
  startCtaText: { fontFamily: fonts.sans, fontSize: 14, fontWeight: '700', color: colors.white },

  // ── 3. Reach ──
  reachList: { gap: spacing.sm, marginTop: spacing.xs },
  reachRow: { flexDirection: 'row', gap: spacing.sm, paddingHorizontal: spacing.xs },
  reachDash: { fontFamily: fonts.serif, fontSize: 15, lineHeight: 22, color: colors.accent },
  reachText: { flex: 1, fontFamily: fonts.sans, fontSize: 14.5, lineHeight: 22, color: colors.textSoft },

  // ── Returning users: folded guide ──
  howToggle: {
    marginHorizontal: spacing.md, marginTop: spacing.lg,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 12, paddingHorizontal: 14,
    backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.md,
  },
  howToggleText: { fontFamily: fonts.sans, fontSize: 14, fontWeight: '600', color: colors.text },
  howToggleChevron: { fontFamily: fonts.sans, fontSize: 14, color: colors.textMuted },

  // ── Ritual ──
  ritualCard: {
    marginHorizontal: spacing.md, marginTop: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.md,
  },
  ritualHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: spacing.sm,
  },
  ritualEyebrow: {
    fontFamily: fonts.sans, fontSize: 10, letterSpacing: 1.8,
    color: colors.textMuted, fontWeight: '700',
  },
  ritualDot: {
    width: 10, height: 10, borderRadius: 5, backgroundColor: colors.accent,
  },
  ritualText: {
    fontFamily: fonts.serifItalic, fontSize: 15, lineHeight: 23,
    color: colors.text,
  },
  ritualCtaRow: {
    flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md,
  },
  ritualCtaPrimary: {
    flex: 1,
    backgroundColor: colors.bg,
    borderRadius: radius.sm,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  ritualCtaPrimaryText: {
    fontFamily: fonts.sans, fontSize: 13, color: colors.text, fontWeight: '600',
  },
  ritualCtaSecondary: {
    paddingVertical: 10, paddingHorizontal: spacing.md,
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm,
    alignItems: 'center',
  },
  ritualCtaSecondaryText: {
    fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted,
  },
  ritualNoteWrap: { marginTop: spacing.sm },
  ritualNoteLabel: {
    fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted,
    letterSpacing: 1, textTransform: 'uppercase', fontWeight: '700',
    marginBottom: spacing.xs,
  },
  ritualNoteInput: {
    fontFamily: fonts.sans, fontSize: 14, color: colors.text,
    backgroundColor: colors.bg,
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm,
    padding: spacing.sm, minHeight: 80, textAlignVertical: 'top',
  },
  journalLink: {
    marginTop: spacing.sm,
    paddingVertical: 6,
    alignItems: 'flex-end',
  },
  journalLinkText: {
    fontFamily: fonts.sans, fontSize: 12,
    color: colors.accent, fontWeight: '600',
  },

  // ── Ma famille ──
  familyList: { gap: 8, marginTop: spacing.sm },
  familyRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    paddingVertical: 10, paddingHorizontal: 14,
    backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.md,
  },
  familyBadge: {
    width: 34, height: 34, borderRadius: 17,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  familyBadgeNum: { fontFamily: fonts.serif, fontSize: 16, fontWeight: '700', color: colors.white },
  familyName: { fontFamily: fonts.sans, fontSize: 14, color: colors.text, fontWeight: '600' },
  familyType: { fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted, marginTop: 2 },
  familyCta: {
    marginTop: spacing.sm, paddingVertical: spacing.md, paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, alignItems: 'center',
  },
  familyCtaText: { fontFamily: fonts.sans, fontSize: 14, fontWeight: '600', color: colors.accent },

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
  feedback: { marginTop: spacing.md, alignSelf: 'flex-start' },
  feedbackText: {
    fontFamily: fonts.sans, fontSize: 12.5, color: colors.textMuted,
    textDecorationLine: 'underline',
  },
});
