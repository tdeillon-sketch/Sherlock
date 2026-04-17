import { useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, spacing, radius } from '../../constants/theme';
import { CHAPTERS } from '../../constants/data';

// ── Tool cards (entrées vers les autres onglets) ──
type Tool = {
  emoji: string;
  title: string;
  desc: string;
  route: string;
  accent: string;
};

const TOOLS: Tool[] = [
  {
    emoji: '🕐',
    title: 'Quiz',
    desc: "Découvrez votre profil — ou celui de votre enfant — en quelques minutes.",
    route: '/quiz',
    accent: '#c0713a',
  },
  {
    emoji: '👥',
    title: 'Profils',
    desc: "Explorez les 9 types de l'Ennéagramme et leurs nuances (ailes incluses).",
    route: '/profiles',
    accent: '#5b8a9a',
  },
  {
    emoji: '🔎',
    title: 'Testez-vous',
    desc: "Les Dossiers Sherlock : apprenez à reconnaître les profils en jouant.",
    route: '/celebrities',
    accent: '#d4a03c',
  },
  {
    emoji: '◎',
    title: 'Duo',
    desc: "Découvrez la dynamique entre deux profils, dans tous les contextes.",
    route: '/duo',
    accent: '#8b6ca7',
  },
];

export default function HomeScreen() {
  const [chaptersOpen, setChaptersOpen] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* ── Hero ── */}
      <LinearGradient
        colors={[colors.surface, colors.bg]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.hero}
      >
        <Text style={styles.heroEyebrow}>Le compagnon de lecture</Text>
        <Text style={styles.heroTitle}>On a tous besoin{'\n'}de quelqu'un d'autre</Text>
        <Text style={styles.heroSubtitle}>
          Le voyage intérieur d'un père imparfait
        </Text>
      </LinearGradient>

      {/* ── Introduction ── */}
      <View style={styles.introSection}>
        <Text style={styles.introTitle}>Bienvenue</Text>
        <Text style={styles.introBody}>
          Cette application est le compagnon du livre. Elle se concentre sur l'Ennéagramme — non pas parce que c'est l'unique outil pour comprendre nos enfants, encore moins parce qu'il serait sans défauts. Simplement parce qu'il ouvre une porte. Une porte vers cette idée fondamentale : nos enfants ne sont pas nous, et ils ne perçoivent pas le monde comme nous le percevons.
        </Text>
        <Text style={styles.introBody}>
          L'Ennéagramme est une langue parmi d'autres pour nommer ces différences. Imparfaite, partielle, parfois caricaturale — mais utile. Elle donne des mots à ce que vous ressentez confusément depuis longtemps : votre enfant n'a pas le même moteur intérieur que vous, et ce qui le nourrit n'est peut-être pas ce que vous lui offrez naturellement.
        </Text>
        <Text style={styles.introBody}>
          Les outils ci-dessous ne sont pas des tests à valider, ni des étiquettes à coller. Ce sont des invitations — à observer, à vous interroger, à dialoguer autrement.
        </Text>
      </View>

      {/* ── Tools (entrées vers les onglets) ── */}
      <View style={styles.toolsSection}>
        <Text style={styles.sectionLabel}>Les outils</Text>

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
              <Text style={styles.toolTitle}>{tool.title}</Text>
              <Text style={styles.toolDesc}>{tool.desc}</Text>
            </View>
            <Text style={[styles.toolChevron, { color: tool.accent }]}>›</Text>
          </Pressable>
        ))}
      </View>

      {/* ── Chapitres du livre (collapsible) ── */}
      <View style={styles.chaptersSection}>
        <Pressable
          style={styles.chaptersHeader}
          onPress={() => setChaptersOpen((v) => !v)}
        >
          <View style={styles.chaptersHeaderLeft}>
            <Text style={styles.chaptersHeaderEmoji}>📖</Text>
            <View>
              <Text style={styles.chaptersHeaderTitle}>Chapitres du livre</Text>
              <Text style={styles.chaptersHeaderSub}>
                {chaptersOpen ? 'Fermer la table des matières' : 'Ouvrir la table des matières'}
              </Text>
            </View>
          </View>
          <Text style={styles.chaptersChevron}>{chaptersOpen ? '▴' : '▾'}</Text>
        </Pressable>

        {chaptersOpen && (
          <View style={styles.chaptersList}>
            {CHAPTERS.map((part, partIndex) => (
              <View key={partIndex} style={styles.partContainer}>
                <Text style={styles.partTitle}>{part.part}</Text>

                {part.chapters.map((chapter) => (
                  <Pressable
                    key={chapter.num}
                    style={styles.chapterItem}
                    onPress={() => router.push(`/chapter/${chapter.num}` as never)}
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
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    paddingBottom: spacing.xxl + spacing.xl,
  },

  // ── Hero ──
  hero: {
    paddingTop: 72,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  heroEyebrow: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.accent,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  heroTitle: {
    fontFamily: fonts.serif,
    fontSize: 28,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    fontFamily: fonts.serifItalic,
    fontSize: 14,
    color: colors.textSoft,
    textAlign: 'center',
  },

  // ── Introduction ──
  introSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  introTitle: {
    fontFamily: fonts.serif,
    fontSize: 22,
    color: colors.accent,
    marginBottom: spacing.md,
  },
  introBody: {
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 24,
    color: colors.textSoft,
    marginBottom: spacing.md,
  },

  // ── Tools section ──
  toolsSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  sectionLabel: {
    fontFamily: fonts.sans,
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: spacing.md,
  },
  toolCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  toolCardPressed: {
    opacity: 0.7,
  },
  toolEmojiBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  toolEmoji: {
    fontSize: 22,
  },
  toolBody: {
    flex: 1,
  },
  toolTitle: {
    fontFamily: fonts.serif,
    fontSize: 17,
    color: colors.text,
    marginBottom: 2,
  },
  toolDesc: {
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textMuted,
  },
  toolChevron: {
    fontSize: 28,
    fontWeight: '300',
    paddingHorizontal: spacing.xs,
  },

  // ── Chapters section ──
  chaptersSection: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  chaptersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  chaptersHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  chaptersHeaderEmoji: {
    fontSize: 24,
  },
  chaptersHeaderTitle: {
    fontFamily: fonts.serif,
    fontSize: 17,
    color: colors.text,
  },
  chaptersHeaderSub: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  chaptersChevron: {
    fontFamily: fonts.sans,
    fontSize: 14,
    fontWeight: '700',
    color: colors.accent,
    paddingHorizontal: spacing.sm,
  },

  // ── Chapters list (when open) ──
  chaptersList: {
    marginTop: spacing.md,
  },
  partContainer: {
    marginTop: spacing.lg,
  },
  partTitle: {
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.accent,
    marginBottom: spacing.md,
  },
  chapterItem: {
    marginBottom: spacing.lg,
  },
  chapterRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  chapterBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    marginTop: 2,
  },
  chapterBadgeText: {
    fontFamily: fonts.sans,
    fontSize: 13,
    fontWeight: '700',
    color: colors.white,
  },
  chapterContent: {
    flex: 1,
  },
  chapterTitle: {
    fontFamily: fonts.sans,
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  chapterQuote: {
    fontFamily: fonts.serifItalic,
    fontSize: 13,
    color: colors.textSoft,
    marginBottom: spacing.sm,
  },
  chapterDesc: {
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSoft,
  },
});
