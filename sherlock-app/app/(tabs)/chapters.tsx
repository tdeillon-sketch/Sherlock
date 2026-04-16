import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { colors, fonts, spacing, radius } from '../../constants/theme';
import { CHAPTERS } from '../../constants/data';

export default function ChaptersScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Section Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Le livre en un regard</Text>
        <Text style={styles.headerSubtitle}>
          Quatre parties, dix chapitres et une annexe pour explorer la parentalite
          autrement — de Nietzsche a l'Enneagramme, de l'ombre a la lumiere.
        </Text>
      </View>

      {/* Parts & Chapters */}
      {CHAPTERS.map((part, partIndex) => (
        <View key={partIndex} style={styles.partContainer}>
          <Text style={styles.partTitle}>{part.part}</Text>

          {part.chapters.map((chapter) => (
            <View key={chapter.num} style={styles.chapterItem}>
              <View style={styles.chapterRow}>
                <View style={styles.chapterBadge}>
                  <Text style={styles.chapterBadgeText}>{chapter.num}</Text>
                </View>
                <View style={styles.chapterContent}>
                  <Text style={styles.chapterTitle}>{chapter.title}</Text>
                  {chapter.quote ? (
                    <Text style={styles.chapterQuote}>{chapter.quote}</Text>
                  ) : null}
                  <Text style={styles.chapterDesc}>{chapter.desc}</Text>
                </View>
              </View>
            </View>
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
    backgroundColor: colors.bgWarm,
  },
  headerTitle: {
    fontFamily: fonts.serif,
    fontSize: 28,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  headerSubtitle: {
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textLight,
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
    color: '#ffffff',
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
    color: colors.textLight,
    marginBottom: spacing.sm,
  },
  chapterDesc: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textLight,
  },
});
