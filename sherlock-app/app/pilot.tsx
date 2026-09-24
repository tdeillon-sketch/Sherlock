// ═══════════════════════════════════════════════════════════════
//  Reading screen — a free text to read in the app (Chapter 1 text).
//  No book promotion here: the release date is unknown.
// ═══════════════════════════════════════════════════════════════

import { useEffect } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../constants/theme';
import { CHAPTER_1_FR, CHAPTER_1_EN, type Paragraph } from '../constants/chapter1';
import { useT } from '../i18n';
import { trackScreen } from '../constants/firebase';

export default function PilotScreen() {
  const { t, locale } = useT();
  const chapter = locale === 'en' ? CHAPTER_1_EN : CHAPTER_1_FR;
  useEffect(() => { trackScreen('pilot').catch(() => {}); }, []);

  const renderParagraph = (p: Paragraph, idx: number) => {
    switch (p.kind) {
      case 'h2':
        return <Text key={idx} style={styles.h2}>{p.text}</Text>;
      case 'pullquote':
        return (
          <View key={idx} style={styles.pullquoteWrap}>
            <Text style={styles.pullquote}>{p.text}</Text>
          </View>
        );
      case 'callout':
        return (
          <View key={idx} style={styles.calloutWrap}>
            <Text style={styles.calloutText}>{p.text}</Text>
          </View>
        );
      case 'epigraph':
        return <Text key={idx} style={styles.epigraph}>{p.text}</Text>;
      case 'p':
      default:
        return <Text key={idx} style={styles.body}>{p.text}</Text>;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* ── Top bar ── */}
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backButton} hitSlop={10}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>
        <Text style={styles.topBarLabel}>
          {locale === 'en' ? 'A SHORT READ' : 'À LIRE'}
        </Text>
        <View style={{ width: 26 }} />
      </View>

      {/* ── Part intro (sets up Chapter 1 in the broader arc) ── */}
      <View style={styles.partWrap}>
        <Text style={styles.partLabel}>{chapter.partLabel}</Text>
        <Text style={styles.partTitle}>{chapter.partTitle}</Text>
        <View style={styles.partIntroBody}>
          {chapter.partIntro.map(renderParagraph)}
        </View>
        <View style={styles.partDivider} />
      </View>

      {/* ── Chapter header ── */}
      <View style={styles.header}>
        <Text style={styles.chapterLabel}>
          {locale === 'en' ? `Chapter ${chapter.number}` : `Chapitre ${chapter.number}`}
        </Text>
        <Text style={styles.chapterTitle}>{chapter.title}</Text>
        <View style={styles.epigraphRow}>
          <Text style={styles.epigraphText}>{chapter.epigraph}</Text>
          <Text style={styles.epigraphAuthor}>— {chapter.epigraphAuthor}</Text>
        </View>
        <Text style={styles.duration}>{chapter.durationLabel}</Text>
      </View>

      {/* ── Body ── */}
      <View style={styles.bodyWrap}>
        {chapter.body.map(renderParagraph)}
      </View>

      {/* ── End-of-chapter signature ── */}
      <View style={styles.signatureWrap}>
        <Text style={styles.signature}>{chapter.signature}</Text>
      </View>

      {/* ── End card: a bridge to the quiz (no book promotion) ── */}
      <View style={styles.endCard}>
        <Text style={styles.endEyebrow}>
          {locale === 'en' ? 'WHAT NOW?' : 'ET MAINTENANT ?'}
        </Text>
        <Text style={styles.endTitle}>
          {locale === 'en' ? 'Start by looking.' : 'Commencez par regarder.'}
        </Text>
        <Text style={styles.endText}>
          {locale === 'en'
            ? "A few minutes are enough to sketch your profile, or your child's. A map, not a box."
            : "Quelques minutes suffisent pour esquisser votre profil, ou celui de votre enfant. Une carte, pas une case."}
        </Text>
        <Pressable
          onPress={() => router.push('/quiz' as never)}
          style={({ pressed }) => [styles.endCta, pressed && { opacity: 0.85 }]}
        >
          <Text style={styles.endCtaText}>
            {locale === 'en' ? 'Take the quiz  →' : 'Faire le quiz  →'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: spacing.xxl + spacing.xl },

  // Top bar
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 56, paddingHorizontal: spacing.md, paddingBottom: spacing.sm,
  },
  backButton: { padding: 4 },
  topBarLabel: {
    fontFamily: fonts.sans, fontSize: 10, letterSpacing: 1.8,
    color: colors.accent, fontWeight: '700',
  },

  // Part intro (above Chapter 1)
  partWrap: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  partLabel: {
    fontFamily: fonts.serifItalic, fontSize: 13,
    color: colors.accent,
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  partTitle: {
    fontFamily: fonts.serif, fontSize: 30, lineHeight: 38,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  partIntroBody: {
    marginBottom: spacing.md,
  },
  partDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginTop: spacing.lg,
  },

  // Header
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  chapterLabel: {
    fontFamily: fonts.sans, fontSize: 12, letterSpacing: 1.5,
    color: colors.textMuted, textTransform: 'uppercase', fontWeight: '700',
    marginBottom: spacing.sm,
  },
  chapterTitle: {
    fontFamily: fonts.serif, fontSize: 28, lineHeight: 36,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  epigraphRow: {
    paddingLeft: spacing.md,
    borderLeftWidth: 2,
    borderLeftColor: colors.accent,
    marginBottom: spacing.md,
  },
  epigraphText: {
    fontFamily: fonts.serifItalic, fontSize: 15, lineHeight: 22,
    color: colors.textSoft,
  },
  epigraphAuthor: {
    fontFamily: fonts.sans, fontSize: 11,
    color: colors.textMuted,
    marginTop: 4,
  },
  duration: {
    fontFamily: fonts.sans, fontSize: 12,
    color: colors.textMuted,
  },

  // Body
  bodyWrap: {
    paddingHorizontal: spacing.lg,
  },
  body: {
    fontFamily: fonts.serif,
    fontSize: 16,
    lineHeight: 27,
    color: colors.text,
    marginBottom: spacing.md,
  },
  h2: {
    fontFamily: fonts.serif,
    fontSize: 20,
    lineHeight: 26,
    color: colors.accent,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  pullquoteWrap: {
    marginVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  pullquote: {
    fontFamily: fonts.serifItalic,
    fontSize: 19,
    lineHeight: 28,
    color: colors.accent,
    textAlign: 'center',
  },
  calloutWrap: {
    marginVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.accentFill,
    borderRadius: radius.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  calloutText: {
    fontFamily: fonts.serifItalic,
    fontSize: 15,
    lineHeight: 23,
    color: colors.text,
  },
  epigraph: {
    fontFamily: fonts.serifItalic,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textMuted,
    textAlign: 'center',
    marginVertical: spacing.md,
  },

  // Signature
  signatureWrap: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    alignItems: 'flex-start',
  },
  signature: {
    fontFamily: fonts.serifItalic,
    fontSize: 16,
    color: colors.accent,
  },

  // End card
  endCard: {
    marginHorizontal: spacing.md,
    marginTop: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.lg,
  },
  endEyebrow: {
    fontFamily: fonts.sans, fontSize: 10, letterSpacing: 1.8,
    color: colors.accent, fontWeight: '700',
    marginBottom: spacing.sm,
  },
  endTitle: {
    fontFamily: fonts.serif, fontSize: 22, lineHeight: 28,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  endText: {
    fontFamily: fonts.sans, fontSize: 14, lineHeight: 22,
    color: colors.textSoft,
    marginBottom: spacing.md,
  },
  endCta: {
    backgroundColor: colors.accent,
    borderRadius: radius.full,
    paddingVertical: 14,
    alignItems: 'center',
  },
  endCtaText: {
    fontFamily: fonts.sans, fontSize: 14, fontWeight: '700',
    color: colors.white,
  },
});
