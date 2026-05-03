import { useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, Alert, TextInput } from 'react-native';
import { router } from 'expo-router';
import { colors, fonts, spacing, radius } from '../../constants/theme';
import { useT } from '../../i18n';
import { getDailyQuestion, formatRitualDate } from '../../constants/ritualQuestions';
import { saveAnswer } from '../../constants/ritualJournal';
import LaunchSubscribeModal from '../../components/LaunchSubscribeModal';

// ── Tool cards (entrées vers les autres onglets) ──
type Tool = {
  emoji: string;
  titleKey: string;
  descKey: string;
  route: string;
  accent: string;
};

const TOOLS: Tool[] = [
  { emoji: '🕐', titleKey: 'tools.quizTitle',        descKey: 'tools.quizDesc',        route: '/quiz',        accent: '#c0713a' },
  { emoji: '👥', titleKey: 'tools.profilesTitle',    descKey: 'tools.profilesDesc',    route: '/profiles',    accent: '#5b8a9a' },
  { emoji: '🔎', titleKey: 'tools.celebritiesTitle', descKey: 'tools.celebritiesDesc', route: '/celebrities', accent: '#d4a03c' },
  { emoji: '◎', titleKey: 'tools.duoTitle',         descKey: 'tools.duoDesc',         route: '/duo',         accent: '#8b6ca7' },
];

// ── Seasons (4 parts of the book) ──
const SEASONS = [
  { num: 1, titleKey: 'home.season1Title', subKey: 'home.season1Sub', episodes: 3, unlocked: true,  firstChapter: 1 },
  { num: 2, titleKey: 'home.season2Title', subKey: 'home.seasonLockedSub', episodes: 3, unlocked: false, firstChapter: null },
  { num: 3, titleKey: 'home.season3Title', subKey: 'home.seasonLockedSub', episodes: 3, unlocked: false, firstChapter: null },
  { num: 4, titleKey: 'home.season4Title', subKey: 'home.seasonLockedSub', episodes: 1, unlocked: false, firstChapter: null },
];

export default function HomeScreen() {
  const { t, locale } = useT();
  const [ritualOpen, setRitualOpen] = useState(false);
  const [ritualNote, setRitualNote] = useState('');
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const dailyQuestion = getDailyQuestion();
  const ritualDate = formatRitualDate(new Date(), locale);
  const ritualText = locale === 'en' ? dailyQuestion.en : dailyQuestion.fr;

  const openSubscribe = () => setSubscribeOpen(true);

  const handleSeasonPress = (season: typeof SEASONS[number]) => {
    if (season.unlocked && season.firstChapter !== null) {
      // Season 1 = the pilot (full Chapter 1 reader). Other unlocked seasons
      // would route to their first chapter (none for now).
      if (season.num === 1) {
        router.push('/pilot' as never);
      } else {
        router.push(`/chapter/${season.firstChapter}` as never);
      }
      return;
    }
    Alert.alert(
      t('home.seasonLockedAlertTitle'),
      t('home.seasonLockedAlertBody'),
      [
        { text: t('home.seasonLockedAlertCancel'), style: 'cancel' },
        { text: t('home.seasonLockedAlertCta'), onPress: openSubscribe },
      ],
    );
  };

  const handleSolenePress = () => {
    openSubscribe();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* ── Top bar (brand + account) ── */}
      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <View style={styles.brandSquare}>
            <Text style={styles.brandSquareLetter}>L</Text>
          </View>
          <Text style={styles.brandLabel}>{t('home.brandLabel')}</Text>
        </View>
        <Pressable
          onPress={() => router.push('/account' as never)}
          accessibilityLabel={t('account.title')}
          style={({ pressed }) => [styles.accountBtn, pressed && { opacity: 0.6 }]}
          hitSlop={10}
        >
          <Text style={styles.accountBtnIcon}>👤</Text>
        </Pressable>
      </View>

      {/* ── Hero quote ── */}
      <View style={styles.hero}>
        <Text style={styles.heroQuote}>{t('home.heroQuote')}</Text>
        <Text style={styles.heroSubtitle}>{t('home.heroSubtitle')}</Text>
        <Text style={styles.heroCredit}>{t('home.heroCredit')}</Text>
      </View>

      {/* ── Pilot episode card (the marketing centerpiece) ── */}
      <Pressable
        onPress={() => router.push('/pilot' as never)}
        style={({ pressed }) => [styles.pilotCard, pressed && { opacity: 0.92 }]}
      >
        <View style={styles.pilotHeader}>
          <Text style={styles.pilotEyebrow}>{t('home.pilotEyebrow')}</Text>
          <Text style={styles.pilotDuration}>{t('home.pilotDuration')}</Text>
        </View>
        <Text style={styles.pilotChapterLabel}>{t('home.pilotChapterLabel')}</Text>
        <Text style={styles.pilotChapterTitle}>{t('home.pilotChapterTitle')}</Text>
        <Text style={styles.pilotTagline}>{t('home.pilotTagline')}</Text>
        <View style={styles.pilotCtaRow}>
          <Text style={styles.pilotCtaText}>{t('home.pilotCta')}</Text>
          <Text style={styles.pilotCtaArrow}>→</Text>
        </View>
      </Pressable>

      {/* ── Daily ritual ── */}
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
            <View style={styles.ritualCtaSecondary}>
              <Text style={styles.ritualCtaSecondaryText}>{t('home.ritualCtaSecondary')}</Text>
            </View>
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

      {/* ── The series · 4 seasons ── */}
      <View style={styles.seriesSection}>
        <View style={styles.seriesHeader}>
          <Text style={styles.seriesEyebrow}>{t('home.seriesEyebrow')}</Text>
        </View>
        <View style={styles.seasonList}>
          {SEASONS.map((season) => (
            <Pressable
              key={season.num}
              onPress={() => handleSeasonPress(season)}
              style={({ pressed }) => [
                styles.seasonItem,
                !season.unlocked && styles.seasonItemLocked,
                pressed && { opacity: 0.85 },
              ]}
            >
              <View style={[
                styles.seasonBadge,
                season.unlocked ? styles.seasonBadgeUnlocked : styles.seasonBadgeLocked,
              ]}>
                <Text style={[
                  styles.seasonBadgeText,
                  season.unlocked ? styles.seasonBadgeTextUnlocked : styles.seasonBadgeTextLocked,
                ]}>{season.num}</Text>
              </View>
              <View style={styles.seasonBody}>
                <Text style={styles.seasonTitle}>{t(season.titleKey)}</Text>
                <Text style={styles.seasonSub}>{t(season.subKey)}</Text>
              </View>
              {season.unlocked ? (
                <Text style={styles.seasonMeta}>{t('home.seasonEpisodes', { n: season.episodes })}</Text>
              ) : (
                <View style={styles.seasonLockIcon}>
                  <Text style={styles.seasonLockIconText}>×</Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </View>

      {/* ── Solène teaser (the strategic block) ── */}
      <Pressable
        onPress={handleSolenePress}
        style={({ pressed }) => [styles.soleneCard, pressed && { opacity: 0.9 }]}
      >
        <Text style={styles.soleneEyebrow}>{t('home.soleneEyebrow')}</Text>
        <Text style={styles.soleneText}>{t('home.soleneText')}</Text>
        <Text style={styles.soleneCta}>{t('home.soleneCta')}  →</Text>
      </Pressable>

      {/* ── Tools (les outils du voyage) ── */}
      <View style={styles.toolsSection}>
        <Text style={styles.sectionLabel}>{t('home.toolsLabel')}</Text>
        <Text style={styles.toolsIntro}>{t('home.toolsIntro')}</Text>

        {TOOLS.map((tool) => (
          <Pressable
            key={tool.route}
            style={({ pressed }) => [
              styles.toolCard,
              pressed && styles.toolCardPressed,
            ]}
            onPress={() => router.push(tool.route as never)}
          >
            <View style={[styles.toolEmojiBox, { backgroundColor: tool.accent + '22', borderColor: tool.accent + '55' }]}>
              <Text style={styles.toolEmoji}>{tool.emoji}</Text>
            </View>
            <View style={styles.toolBody}>
              <Text style={styles.toolTitle}>{t(tool.titleKey)}</Text>
              <Text style={styles.toolDesc}>{t(tool.descKey)}</Text>
            </View>
            <Text style={[styles.toolChevron, { color: tool.accent }]}>›</Text>
          </Pressable>
        ))}
      </View>

      {/* ── Pre-order / launch-notify CTA ── */}
      <Pressable
        onPress={openSubscribe}
        style={({ pressed }) => [styles.preorderBox, pressed && { opacity: 0.85 }]}
      >
        <Text style={styles.preorderHint}>{t('home.preorderHint')}</Text>
        <Text style={styles.preorderText}>{t('home.preorderText')}</Text>
        <Text style={styles.preorderCta}>{t('home.preorderCta')}</Text>
      </Pressable>

      <LaunchSubscribeModal
        visible={subscribeOpen}
        onClose={() => setSubscribeOpen(false)}
      />
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
  accountBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  accountBtnIcon: { fontSize: 18 },

  // ── Hero ──
  hero: {
    paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.md,
  },
  heroQuote: {
    fontFamily: fonts.serifItalic, fontSize: 26, lineHeight: 34,
    color: colors.text,
  },
  heroAuthor: {
    fontFamily: fonts.sans, fontSize: 11, letterSpacing: 1.2, textTransform: 'uppercase',
    color: colors.textMuted, fontWeight: '600', marginTop: spacing.sm,
  },
  heroSubtitle: {
    fontFamily: fonts.sans, fontSize: 13, lineHeight: 19,
    color: colors.textSoft, marginTop: spacing.md,
  },
  heroCredit: {
    fontFamily: fonts.serifItalic, fontSize: 12,
    color: colors.textMuted, marginTop: 4,
  },

  // ── Pilot card (the marketing centerpiece) ──
  pilotCard: {
    marginHorizontal: spacing.md, marginTop: spacing.md,
    backgroundColor: '#1f2429',
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  pilotHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: spacing.sm,
  },
  pilotEyebrow: {
    fontFamily: fonts.sans, fontSize: 10, letterSpacing: 2,
    color: colors.accent, fontWeight: '700',
  },
  pilotDuration: {
    fontFamily: fonts.sans, fontSize: 11, color: '#b8a89b',
  },
  pilotChapterLabel: {
    fontFamily: fonts.serif, fontSize: 17, color: '#FBF7F1', marginTop: 4,
  },
  pilotChapterTitle: {
    fontFamily: fonts.serifItalic, fontSize: 18, lineHeight: 24,
    color: '#FBF7F1', marginTop: 2,
  },
  pilotTagline: {
    fontFamily: fonts.sans, fontSize: 13, lineHeight: 20,
    color: '#b8a89b', marginTop: spacing.md, marginBottom: spacing.md,
  },
  pilotCtaRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: radius.full,
    paddingVertical: 12, paddingHorizontal: spacing.md,
  },
  pilotCtaText: {
    fontFamily: fonts.sans, fontSize: 14, fontWeight: '700', color: colors.white,
  },
  pilotCtaArrow: {
    fontFamily: fonts.sans, fontSize: 18, color: colors.white,
  },

  // ── Ritual ──
  ritualCard: {
    marginHorizontal: spacing.md, marginTop: spacing.md,
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

  // ── Series ──
  seriesSection: {
    marginHorizontal: spacing.md, marginTop: spacing.lg,
  },
  seriesHeader: { marginBottom: spacing.sm },
  seriesEyebrow: {
    fontFamily: fonts.sans, fontSize: 10, letterSpacing: 1.8,
    color: colors.textMuted, fontWeight: '700',
  },
  seasonList: { gap: 8 },
  seasonItem: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    paddingVertical: 12, paddingHorizontal: 14,
    backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md,
  },
  seasonItemLocked: { opacity: 0.55 },
  seasonBadge: {
    width: 30, height: 30, borderRadius: 8,
    alignItems: 'center', justifyContent: 'center',
  },
  seasonBadgeUnlocked: { backgroundColor: colors.accent },
  seasonBadgeLocked: { borderWidth: 1, borderColor: colors.textDim, backgroundColor: 'transparent' },
  seasonBadgeText: { fontFamily: fonts.serif, fontSize: 14, fontWeight: '600' },
  seasonBadgeTextUnlocked: { color: colors.white },
  seasonBadgeTextLocked: { color: colors.textMuted },
  seasonBody: { flex: 1 },
  seasonTitle: { fontFamily: fonts.sans, fontSize: 14, color: colors.text, fontWeight: '600' },
  seasonSub: { fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted, marginTop: 2 },
  seasonMeta: {
    fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted,
  },
  seasonLockIcon: {
    width: 18, height: 18, borderRadius: 9,
    borderWidth: 1, borderColor: colors.textDim,
    alignItems: 'center', justifyContent: 'center',
  },
  seasonLockIconText: { fontSize: 10, color: colors.textMuted, lineHeight: 12 },

  // ── Solène teaser ──
  soleneCard: {
    marginHorizontal: spacing.md, marginTop: spacing.lg,
    backgroundColor: colors.accentFill,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  soleneEyebrow: {
    fontFamily: fonts.sans, fontSize: 10, letterSpacing: 1.8,
    color: colors.accent, fontWeight: '700', marginBottom: 6,
  },
  soleneText: {
    fontFamily: fonts.serifItalic, fontSize: 14, lineHeight: 22,
    color: colors.text,
  },
  soleneCta: {
    fontFamily: fonts.sans, fontSize: 13, fontWeight: '700',
    color: colors.accent, marginTop: spacing.sm,
  },

  // ── Tools section ──
  toolsSection: {
    paddingHorizontal: spacing.lg, paddingTop: spacing.xl,
  },
  sectionLabel: {
    fontFamily: fonts.sans, fontSize: 11, fontWeight: '700',
    color: colors.textMuted, letterSpacing: 1.2, textTransform: 'uppercase',
    marginBottom: 6,
  },
  toolsIntro: {
    fontFamily: fonts.sans, fontSize: 13, lineHeight: 19,
    color: colors.textSoft, marginBottom: spacing.md,
  },
  toolCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.md, marginBottom: spacing.sm, gap: spacing.md,
  },
  toolCardPressed: { opacity: 0.7 },
  toolEmojiBox: {
    width: 48, height: 48, borderRadius: 24,
    borderWidth: 1.5,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  toolEmoji: { fontSize: 22 },
  toolBody: { flex: 1 },
  toolTitle: { fontFamily: fonts.serif, fontSize: 17, color: colors.text, marginBottom: 2 },
  toolDesc: { fontFamily: fonts.sans, fontSize: 13, lineHeight: 19, color: colors.textMuted },
  toolChevron: { fontSize: 28, fontWeight: '300', paddingHorizontal: spacing.xs },

  // ── Pre-order CTA ──
  preorderBox: {
    marginHorizontal: spacing.md, marginTop: spacing.lg,
    paddingVertical: spacing.md, paddingHorizontal: spacing.md,
    borderWidth: 1, borderStyle: 'dashed', borderColor: colors.accent,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  preorderHint: {
    fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted, marginBottom: 4,
  },
  preorderText: {
    fontFamily: fonts.sans, fontSize: 14, color: colors.text, marginBottom: spacing.xs,
  },
  preorderCta: {
    fontFamily: fonts.sans, fontSize: 13, color: colors.accent, fontWeight: '700',
  },
});
