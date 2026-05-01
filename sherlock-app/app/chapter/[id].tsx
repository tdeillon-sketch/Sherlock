import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../../constants/theme';
import { CHAPTERS } from '../../constants/data';
import { findChapterEn } from '../../i18n/chapters_en';
import { useT } from '../../i18n';

export default function ChapterDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, locale } = useT();

  // Find the chapter across all parts (FR data)
  let chapter: (typeof CHAPTERS)[number]['chapters'][number] | undefined;
  for (const part of CHAPTERS) {
    chapter = part.chapters.find((c) => String(c.num) === id);
    if (chapter) break;
  }

  if (!chapter) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{t('chapter.notFound')}</Text>
      </View>
    );
  }

  // Locale-aware content: use EN translation if available, else fall back to FR
  const enChapter = locale === 'en' ? findChapterEn(chapter.num) : null;
  const title = enChapter?.title ?? chapter.title;
  const quote = enChapter?.quote ?? chapter.quote;
  const desc = enChapter?.desc ?? chapter.desc;
  const keyPoints = enChapter?.keyPoints ?? chapter.keyPoints;
  const reflections = enChapter?.reflections ?? chapter.reflections;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Back button */}
      <View style={styles.backBar}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={colors.accent} />
          <Text style={styles.backText}>{t('chapter.backLabel')}</Text>
        </Pressable>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.chapterBadge}>
          <Text style={styles.chapterBadgeText}>{chapter.num}</Text>
        </View>
        <Text style={styles.chapterTitle}>{title}</Text>
        {quote ? (
          <Text style={styles.chapterQuote}>{quote}</Text>
        ) : null}
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionBody}>{desc}</Text>
      </View>

      {/* Key Points */}
      {keyPoints && keyPoints.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('chapter.keyPointsTitle')}</Text>
          {keyPoints.map((point, index) => (
            <View key={index} style={styles.keyPointRow}>
              <View style={styles.keyPointBullet}>
                <Ionicons name="checkmark-circle" size={18} color={colors.accent} />
              </View>
              <Text style={styles.keyPointText}>{point}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Reflections */}
      {reflections && reflections.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('chapter.reflectionsTitle')}</Text>
          {reflections.map((question, index) => (
            <View key={index} style={styles.reflectionCard}>
              <View style={styles.reflectionIconCircle}>
                <Ionicons name="help-circle-outline" size={20} color={colors.accent} />
              </View>
              <Text style={styles.reflectionText}>{question}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    paddingBottom: spacing.xxl,
  },
  errorText: {
    fontFamily: fonts.sans,
    fontSize: 16,
    color: colors.textSoft,
    textAlign: 'center',
    marginTop: 120,
  },

  // Back bar
  backBar: {
    paddingHorizontal: spacing.lg,
    paddingTop: 56,
    paddingBottom: spacing.sm,
    backgroundColor: colors.surface,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  backText: {
    fontFamily: fonts.sans,
    fontSize: 15,
    color: colors.accent,
    fontWeight: '600',
  },

  // Header
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    backgroundColor: colors.surface,
  },
  chapterBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  chapterBadgeText: {
    fontFamily: fonts.sans,
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  chapterTitle: {
    fontFamily: fonts.serif,
    fontSize: 26,
    lineHeight: 34,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  chapterQuote: {
    fontFamily: fonts.serifItalic,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSoft,
  },

  // Section
  section: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  sectionTitle: {
    fontFamily: fonts.serif,
    fontSize: 22,
    color: colors.text,
    marginBottom: spacing.md,
  },
  sectionBody: {
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 24,
    color: colors.textSoft,
  },

  // Key Points
  keyPointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  keyPointBullet: {
    marginRight: spacing.sm,
    marginTop: 1,
  },
  keyPointText: {
    flex: 1,
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
  },

  // Reflections
  reflectionCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.cardBg,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  reflectionIconCircle: {
    marginRight: spacing.sm,
    marginTop: 1,
  },
  reflectionText: {
    flex: 1,
    fontFamily: fonts.serifItalic,
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
  },
});
