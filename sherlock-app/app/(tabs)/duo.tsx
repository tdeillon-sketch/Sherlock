import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, spacing, radius } from '../../constants/theme';
import { DuoContext, CONTEXT_LABELS, getDuoPair } from '../../constants/duo';

// ── Type metadata ──────────────────────────────────────────────
const TYPE_COLORS = [
  '#7b8e6e', // 1
  '#c0713a', // 2
  '#d4a03c', // 3
  '#8b6ca7', // 4
  '#5b8a9a', // 5
  '#6b7b8e', // 6
  '#d4853c', // 7
  '#9b4a4a', // 8
  '#7a9a7b', // 9
];

const TYPE_SHORT = [
  'Perfectio.', // 1
  'Assistant',  // 2
  'Battant',    // 3
  'Artiste',    // 4
  'Observat.',  // 5
  'Loyaliste',  // 6
  'Épicurien',  // 7
  'Chef',       // 8
  'Médiateur',  // 9
];

const CONTEXTS: DuoContext[] = ['enfant', 'ado', 'couple', 'adulte'];

// ── Collapsible section ────────────────────────────────────────
function Section({
  title,
  emoji,
  body,
  open,
  onToggle,
  accentColor,
}: {
  title: string;
  emoji: string;
  body: string;
  open: boolean;
  onToggle: () => void;
  accentColor: string;
}) {
  return (
    <View style={sectionStyles.wrap}>
      <Pressable
        style={({ pressed }) => [sectionStyles.header, pressed && { opacity: 0.7 }]}
        onPress={onToggle}
      >
        <View style={[sectionStyles.pill, { backgroundColor: accentColor + '22' }]}>
          <Text style={sectionStyles.pillEmoji}>{emoji}</Text>
        </View>
        <Text style={sectionStyles.title}>{title}</Text>
        <Text style={[sectionStyles.chevron, { color: accentColor }]}>
          {open ? '▴' : '▾'}
        </Text>
      </Pressable>
      {open && (
        <View style={sectionStyles.body}>
          <Text style={sectionStyles.bodyText}>{body}</Text>
        </View>
      )}
    </View>
  );
}

const sectionStyles = StyleSheet.create({
  wrap: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  pill: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillEmoji: {
    fontSize: 16,
  },
  title: {
    flex: 1,
    fontFamily: fonts.sans,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  chevron: {
    fontSize: 12,
    fontWeight: '700',
  },
  body: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  bodyText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSoft,
  },
});

// ── 3×3 type grid ──────────────────────────────────────────────
function TypeGrid({
  selected,
  onSelect,
  label,
}: {
  selected: number | null;
  onSelect: (t: number) => void;
  label: string;
}) {
  return (
    <View style={gridStyles.container}>
      <Text style={gridStyles.label}>{label}</Text>
      <View style={gridStyles.grid}>
        {Array.from({ length: 9 }, (_, i) => {
          const t = i + 1;
          const isSelected = selected === t;
          const col = TYPE_COLORS[i];
          return (
            <Pressable
              key={t}
              style={({ pressed }) => [
                gridStyles.cell,
                { borderColor: col },
                isSelected && { backgroundColor: col },
                pressed && { opacity: 0.75 },
              ]}
              onPress={() => onSelect(t)}
            >
              <Text
                style={[
                  gridStyles.num,
                  { color: isSelected ? colors.white : col },
                ]}
              >
                {t}
              </Text>
              <Text
                style={[
                  gridStyles.short,
                  { color: isSelected ? colors.white + 'cc' : colors.textDim },
                ]}
                numberOfLines={1}
              >
                {TYPE_SHORT[i]}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const gridStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    fontFamily: fonts.serif,
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
  },
  cell: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 2,
  },
  num: {
    fontFamily: fonts.sans,
    fontSize: 18,
    fontWeight: '700',
  },
  short: {
    fontFamily: fonts.sans,
    fontSize: 9,
    textAlign: 'center',
    marginTop: 1,
  },
});

// ── Main screen ────────────────────────────────────────────────
export default function DuoScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const [context, setContext] = useState<DuoContext>('couple');
  const [typeA, setTypeA] = useState<number | null>(null);
  const [typeB, setTypeB] = useState<number | null>(null);
  const [openSection, setOpenSection] = useState<string | null>('pointsForts');

  const pair = typeA && typeB ? getDuoPair(typeA, typeB) : null;

  const toggle = (key: string) =>
    setOpenSection(prev => (prev === key ? null : key));

  // accent = color of type A (or fallback)
  const accentColor =
    typeA ? TYPE_COLORS[typeA - 1] : colors.accent;
  const accentColorB =
    typeB ? TYPE_COLORS[typeB - 1] : colors.accentLight;

  // ── Context tabs ──
  const contextTabs = (
    <View style={styles.contextRow}>
      {CONTEXTS.map(c => (
        <Pressable
          key={c}
          style={[styles.contextTab, context === c && styles.contextTabActive]}
          onPress={() => setContext(c)}
        >
          <Text
            style={[
              styles.contextTabText,
              context === c && styles.contextTabTextActive,
            ]}
            numberOfLines={2}
          >
            {CONTEXT_LABELS[c]}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  // ── VS badge ──
  const vsBadge = (
    <View style={styles.vsWrap}>
      <View style={styles.vsBadge}>
        <Text style={styles.vsText}>VS</Text>
      </View>
      {typeA && typeB && (
        <Text style={styles.vsSubText}>
          Type {typeA} + Type {typeB}
        </Text>
      )}
    </View>
  );

  // ── Result card ──
  const resultCard = pair ? (
    <View style={styles.resultCard}>
      {/* Header */}
      <LinearGradient
        colors={[accentColor + '33', accentColorB + '22']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.resultHeader}
      >
        <View style={styles.resultTypeRow}>
          <View style={[styles.typeBadge, { backgroundColor: accentColor }]}>
            <Text style={styles.typeBadgeText}>{typeA}</Text>
          </View>
          <Text style={styles.resultArrow}>⟷</Text>
          <View style={[styles.typeBadge, { backgroundColor: accentColorB }]}>
            <Text style={styles.typeBadgeText}>{typeB}</Text>
          </View>
        </View>
        <Text style={styles.resultContextLabel}>{CONTEXT_LABELS[context]}</Text>
      </LinearGradient>

      {/* Collapsible sections */}
      <Section
        emoji="✨"
        title="Points forts"
        body={pair.pointsForts}
        open={openSection === 'pointsForts'}
        onToggle={() => toggle('pointsForts')}
        accentColor={accentColor}
      />
      <Section
        emoji="⚠️"
        title="Vigilances"
        body={pair.vigilances}
        open={openSection === 'vigilances'}
        onToggle={() => toggle('vigilances')}
        accentColor={accentColor}
      />
      <Section
        emoji="🎁"
        title={`Ce que le ${typeA} apporte au ${typeB}`}
        body={pair.aApporte}
        open={openSection === 'aApporte'}
        onToggle={() => toggle('aApporte')}
        accentColor={accentColor}
      />
      <Section
        emoji="🎁"
        title={`Ce que le ${typeB} apporte au ${typeA}`}
        body={pair.bApporte}
        open={openSection === 'bApporte'}
        onToggle={() => toggle('bApporte')}
        accentColor={accentColorB}
      />
      <Section
        emoji="💡"
        title="Conseil pratique"
        body={pair.conseil}
        open={openSection === 'conseil'}
        onToggle={() => toggle('conseil')}
        accentColor={accentColor}
      />
      <Section
        emoji="🔍"
        title="Dans ce contexte"
        body={pair.contexte[context]}
        open={openSection === 'contexte'}
        onToggle={() => toggle('contexte')}
        accentColor={accentColor}
      />
    </View>
  ) : (
    <View style={styles.emptyCard}>
      <Text style={styles.emptyEmoji}>◎</Text>
      <Text style={styles.emptyTitle}>Sélectionnez deux types</Text>
      <Text style={styles.emptyDesc}>
        Choisissez un profil à gauche et un à droite pour découvrir leur dynamique.
      </Text>
    </View>
  );

  return (
    <View style={styles.screen}>
      {/* Title bar */}
      <View style={styles.titleBar}>
        <Text style={styles.screenTitle}>Duo</Text>
        <Text style={styles.screenSub}>Dynamiques entre profils</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Context */}
        {contextTabs}

        {/* Type selectors */}
        <View style={styles.selectorsRow}>
          <TypeGrid
            selected={typeA}
            onSelect={setTypeA}
            label="Profil A"
          />
          {vsBadge}
          <TypeGrid
            selected={typeB}
            onSelect={setTypeB}
            label="Profil B"
          />
        </View>

        {/* Result */}
        {resultCard}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  // Title bar
  titleBar: {
    paddingTop: spacing.xxl + spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.bg,
  },
  screenTitle: {
    fontFamily: fonts.serif,
    fontSize: 28,
    color: colors.text,
  },
  screenSub: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },

  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl + spacing.xl,
    paddingHorizontal: spacing.md,
    gap: spacing.lg,
  },

  // Context tabs
  contextRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  contextTab: {
    flex: 1,
    minWidth: '44%',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  contextTabActive: {
    borderColor: colors.accent,
    backgroundColor: colors.accentFill,
  },
  contextTabText: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 15,
  },
  contextTabTextActive: {
    color: colors.accent,
    fontWeight: '600',
  },

  // Selectors row
  selectorsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
  },

  // VS badge
  vsWrap: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 28,
    width: 44,
  },
  vsBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vsText: {
    fontFamily: fonts.sans,
    fontSize: 10,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  vsSubText: {
    fontFamily: fonts.sans,
    fontSize: 9,
    color: colors.textDim,
    textAlign: 'center',
    marginTop: 4,
  },

  // Result card
  resultCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  resultHeader: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
  },
  resultTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  typeBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeBadgeText: {
    fontFamily: fonts.sans,
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
  },
  resultArrow: {
    fontSize: 20,
    color: colors.textDim,
  },
  resultContextLabel: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textSoft,
  },

  // Empty state
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  emptyEmoji: {
    fontSize: 40,
    color: colors.textDim,
    marginBottom: spacing.xs,
  },
  emptyTitle: {
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.text,
    textAlign: 'center',
  },
  emptyDesc: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 21,
  },
});
