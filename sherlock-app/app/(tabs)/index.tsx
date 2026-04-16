import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { colors, fonts, spacing, radius } from '../../constants/theme';
import { CHAPTERS } from '../../constants/data';

export default function ChapitresScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chapitres</Text>
        <Text style={styles.headerSubtitle}>
          Le voyage interieur d'un pere imparfait
        </Text>
      </View>

      {/* Parts & Chapters */}
      {CHAPTERS.map((part, partIndex) => (
        <View key={partIndex} style={styles.partContainer}>
          <Text style={styles.partTitle}>{part.part}</Text>

          {part.chapters.map((chapter) => (
            <Pressable
              key={chapter.num}
              style={styles.chapterItem}
              onPress={() => router.push(`/chapter/${chapter.num}`)}
            >
              <View style={styles.chapterRow}>
                <View style={styles.chapterBadge}>
                  <Text style={styles.chapterBadgeText}>{chapter.num}</Text>
                </View>
                <View style={styles.chapterContent}>
                  <Text style={styles.chapterTitle}>{chapter.title}</Text>
                  {chapter.quote ? (
                    <Text style={styles.chapterQuote}>{chapter.quote}</Text>
                  ) : null}
                  <Text style={styles.chapterDesc} numberOfLines={3}>
                    {chapter.desc}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      ))}
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

  // Header
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: 72,
    paddingBottom: spacing.lg,
    backgroundColor: colors.surface,
  },
  headerTitle: {
    fontFamily: fonts.serif,
    fontSize: 28,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  headerSubtitle: {
    fontFamily: fonts.serifItalic,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSoft,
  },

  // Parts
  partContainer: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  partTitle: {
    fontFamily: fonts.serif,
    fontSize: 20,
    color: colors.accent,
    marginBottom: spacing.md,
  },

  // Chapters
  chapterItem: {
    marginBottom: spacing.lg,
  },
  chapterRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  chapterBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    marginTop: 2,
  },
  chapterBadgeText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  chapterContent: {
    flex: 1,
  },
  chapterTitle: {
    fontFamily: fonts.sans,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  chapterQuote: {
    fontFamily: fonts.serifItalic,
    fontSize: 14,
    color: colors.textSoft,
    marginBottom: spacing.sm,
  },
  chapterDesc: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSoft,
  },
});
