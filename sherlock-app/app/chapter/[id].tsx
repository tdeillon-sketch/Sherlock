import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../../constants/theme';
import { CHAPTERS } from '../../constants/data';

export default function ChapterDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Find the chapter across all parts
  let chapter: (typeof CHAPTERS)[number]['chapters'][number] | undefined;
  for (const part of CHAPTERS) {
    chapter = part.chapters.find((c) => String(c.num) === id);
    if (chapter) break;
  }

  if (!chapter) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Chapitre introuvable.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Back button */}
      <View style={styles.backBar}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={colors.accent} />
          <Text style={styles.backText}>Retour</Text>
        </Pressable>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.chapterBadge}>
          <Text style={styles.chapterBadgeText}>{chapter.num}</Text>
        </View>
        <Text style={styles.chapterTitle}>{chapter.title}</Text>
        {chapter.quote ? (
          <Text style={styles.chapterQuote}>{chapter.quote}</Text>
        ) : null}
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionBody}>{chapter.desc}</Text>
      </View>

      {/* Key Points */}
      {chapter.keyPoints && chapter.keyPoints.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Points cles</Text>
          {chapter.keyPoints.map((point, index) => (
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
      {chapter.reflections && chapter.reflections.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Questions de reflexion</Text>
          {chapter.reflections.map((question, index) => (
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
