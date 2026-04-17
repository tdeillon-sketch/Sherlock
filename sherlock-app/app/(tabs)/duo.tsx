import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, spacing, radius } from '../../constants/theme';
import { DuoContext, getDuoPair, DUO_PAIRS_CONTEXT } from '../../constants/duo';

// ── Type metadata ──────────────────────────────────────────────
const TYPE_COLORS = [
  '#7b8e6e', '#c0713a', '#d4a03c', '#8b6ca7',
  '#5b8a9a', '#6b7b8e', '#d4853c', '#9b4a4a', '#7a9a7b',
];
const TYPE_NAMES = [
  'Perfectionniste', 'Assistant', 'Battant', 'Artiste',
  'Observateur', 'Loyaliste', 'Épicurien', 'Chef', 'Médiateur',
];

// ── Role ───────────────────────────────────────────────────────
type ProfileRole = 'adulte' | 'enfant' | 'ado';

const ROLE_LABELS: Record<ProfileRole, string> = {
  adulte: 'Adulte',
  enfant: 'Enfant',
  ado:    'Ado',
};

function deriveContext(roleA: ProfileRole, roleB: ProfileRole): DuoContext {
  if (roleA === 'enfant' && roleB === 'enfant') return 'pairs';
  if (roleA === 'ado'    && roleB === 'ado')    return 'pairs';
  if (roleA === 'enfant' || roleB === 'enfant') return 'enfant';
  if (roleA === 'ado'    || roleB === 'ado')    return 'ado';
  return 'adulte';
}

function contextLabel(ctx: DuoContext, roleA: ProfileRole, roleB: ProfileRole): string {
  switch (ctx) {
    case 'pairs':
      return roleA === 'enfant' ? 'Amitié entre enfants (5–12 ans)' : 'Amitié entre ados (13–17 ans)';
    case 'enfant': return 'Relation parent · enfant (5–12 ans)';
    case 'ado':    return 'Relation parent · ado (13–17 ans)';
    default:       return 'Relation amis · collègues · couple';
  }
}

// ── Flat section ───────────────────────────────────────────────
function FlatSection({
  emoji,
  title,
  body,
  colorA,
}: {
  emoji: string;
  title: string;
  body: string;
  colorA: string;
}) {
  return (
    <View style={fsStyles.wrap}>
      <View style={fsStyles.headerRow}>
        <View style={[fsStyles.pill, { backgroundColor: colorA + '25' }]}>
          <Text style={fsStyles.pillEmoji}>{emoji}</Text>
        </View>
        <Text style={fsStyles.title}>{title}</Text>
      </View>
      <Text style={fsStyles.body}>{body}</Text>
    </View>
  );
}

const fsStyles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  pill: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  pillEmoji: {
    fontSize: 17,
  },
  title: {
    flex: 1,
    fontFamily: fonts.sans,
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  body: {
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 24,
    color: colors.textSoft,
    paddingLeft: 34 + spacing.sm,
  },
});

// ── Role selector strip ────────────────────────────────────────
function RoleStrip({
  value,
  onChange,
  typeColor,
}: {
  value: ProfileRole;
  onChange: (r: ProfileRole) => void;
  typeColor: string;
}) {
  const roles: ProfileRole[] = ['adulte', 'enfant', 'ado'];
  return (
    <View style={roleStyles.strip}>
      {roles.map(r => {
        const active = value === r;
        return (
          <Pressable
            key={r}
            style={[
              roleStyles.pill,
              active && { backgroundColor: typeColor, borderColor: typeColor },
            ]}
            onPress={() => onChange(r)}
          >
            <Text
              style={[roleStyles.label, active && { color: colors.white }]}
            >
              {ROLE_LABELS[r]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const roleStyles = StyleSheet.create({
  strip: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
    marginBottom: spacing.sm,
  },
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  label: {
    fontFamily: fonts.sans,
    fontSize: 10,
    fontWeight: '600',
    color: colors.textMuted,
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
          const isSel = selected === t;
          const col = TYPE_COLORS[i];
          return (
            <Pressable
              key={t}
              style={({ pressed }) => [
                gridStyles.cell,
                { borderColor: col },
                isSel && { backgroundColor: col },
                pressed && { opacity: 0.75 },
              ]}
              onPress={() => onSelect(t)}
            >
              <Text style={[gridStyles.num, { color: isSel ? colors.white : col }]}>
                {t}
              </Text>
              <Text
                style={[gridStyles.short, { color: isSel ? 'rgba(255,255,255,0.8)' : colors.textDim }]}
                numberOfLines={1}
              >
                {TYPE_NAMES[i]}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const gridStyles = StyleSheet.create({
  container: { flex: 1 },
  label: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 5,
  },
  cell: {
    width: '30%',
    aspectRatio: 1.1,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 2,
  },
  num: {
    fontFamily: fonts.sans,
    fontSize: 17,
    fontWeight: '700',
  },
  short: {
    fontFamily: fonts.sans,
    fontSize: 8,
    textAlign: 'center',
    marginTop: 1,
  },
});

// ── Main screen ────────────────────────────────────────────────
export default function DuoScreen() {
  const [roleA, setRoleA] = useState<ProfileRole>('adulte');
  const [roleB, setRoleB] = useState<ProfileRole>('adulte');
  const [typeA, setTypeA] = useState<number | null>(null);
  const [typeB, setTypeB] = useState<number | null>(null);

  const context = deriveContext(roleA, roleB);
  const pair = typeA && typeB ? getDuoPair(typeA, typeB) : null;

  // For 'pairs' context, look up the dedicated peers table
  const pairsText = (typeA && typeB)
    ? (DUO_PAIRS_CONTEXT[`${typeA}-${typeB}`] ?? pair?.conseil ?? '')
    : '';

  const contextBodyText = (ctx: DuoContext): string => {
    if (!pair) return '';
    if (ctx === 'pairs') return pairsText;
    return pair.contexte[ctx as Exclude<DuoContext, 'pairs'>] ?? '';
  };

  const colorA = typeA ? TYPE_COLORS[typeA - 1] : colors.accent;
  const colorB = typeB ? TYPE_COLORS[typeB - 1] : colors.accentLight;

  return (
    <View style={styles.screen}>
      {/* ── Title bar ── */}
      <View style={styles.titleBar}>
        <Text style={styles.screenTitle}>Duo</Text>
        <Text style={styles.screenSub}>Dynamiques entre profils Ennéagramme</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Selectors ── */}
        <View style={styles.selectorsRow}>

          {/* Profil A */}
          <View style={styles.selectorBlock}>
            <RoleStrip value={roleA} onChange={setRoleA} typeColor={colorA} />
            <TypeGrid selected={typeA} onSelect={setTypeA} label="Profil A" />
          </View>

          {/* VS */}
          <View style={styles.vsCol}>
            <View style={[styles.vsBadge, !!(typeA && typeB) && { borderColor: colorA }]}>
              <Text style={styles.vsText}>VS</Text>
            </View>
          </View>

          {/* Profil B */}
          <View style={styles.selectorBlock}>
            <RoleStrip value={roleB} onChange={setRoleB} typeColor={colorB} />
            <TypeGrid selected={typeB} onSelect={setTypeB} label="Profil B" />
          </View>
        </View>

        {/* ── Context label ── */}
        {(typeA || typeB) && (
          <View style={styles.contextBanner}>
            <Text style={styles.contextBannerText}>
              {contextLabel(context, roleA, roleB)}
            </Text>
          </View>
        )}

        {/* ── Result ── */}
        {pair ? (
          <View style={styles.resultCard}>
            {/* Header gradient */}
            <LinearGradient
              colors={[colorA + '40', colorB + '28']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.resultHeader}
            >
              <View style={styles.resultTypeRow}>
                <View style={styles.resultTypePill}>
                  <View style={[styles.typeDot, { backgroundColor: colorA }]}>
                    <Text style={styles.typeDotNum}>{typeA}</Text>
                  </View>
                  <View style={styles.resultTypeMeta}>
                    <Text style={styles.resultTypeLabel}>Type {typeA}</Text>
                    <Text style={styles.resultTypeName}>{TYPE_NAMES[typeA! - 1]}</Text>
                  </View>
                </View>

                <Text style={styles.arrowChar}>⟷</Text>

                <View style={[styles.resultTypePill, { justifyContent: 'flex-end' }]}>
                  <View style={styles.resultTypeMeta}>
                    <Text style={[styles.resultTypeLabel, { textAlign: 'right' }]}>Type {typeB}</Text>
                    <Text style={[styles.resultTypeName, { textAlign: 'right' }]}>{TYPE_NAMES[typeB! - 1]}</Text>
                  </View>
                  <View style={[styles.typeDot, { backgroundColor: colorB }]}>
                    <Text style={styles.typeDotNum}>{typeB}</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>

            {/* Flat sections */}
            <FlatSection
              emoji="✨"
              title="Ce qui fonctionne bien entre vous"
              body={pair.pointsForts}
              colorA={colorA}
            />
            <FlatSection
              emoji="⚠️"
              title="Points de friction à surveiller"
              body={pair.vigilances}
              colorA={'#d4a03c'}
            />
            <FlatSection
              emoji="🤲"
              title={`Ce que le Type ${typeA} apporte au Type ${typeB}`}
              body={pair.aApporte}
              colorA={colorA}
            />
            <FlatSection
              emoji="🎁"
              title={`Ce que le Type ${typeB} apporte au Type ${typeA}`}
              body={pair.bApporte}
              colorA={colorB}
            />
            <FlatSection
              emoji="💡"
              title="Conseil pour mieux vivre ensemble"
              body={pair.conseil}
              colorA={colorA}
            />
            <FlatSection
              emoji="🔍"
              title="Dans votre situation"
              body={contextBodyText(context)}
              colorA={colorA}
            />
          </View>
        ) : (
          /* Empty state */
          <View style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>◎</Text>
            <Text style={styles.emptyTitle}>Sélectionnez deux profils</Text>
            <Text style={styles.emptyDesc}>
              Choisissez un type à gauche et un à droite pour découvrir la dynamique entre ces deux personnalités.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  titleBar: {
    paddingTop: spacing.xxl + spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
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

  scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl + spacing.xl,
    gap: spacing.md,
  },

  // ── Selectors ──
  selectorsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
  },
  selectorBlock: {
    flex: 1,
  },
  vsCol: {
    width: 40,
    alignItems: 'center',
    paddingTop: 30,
  },
  vsBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vsText: {
    fontFamily: fonts.sans,
    fontSize: 9,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },

  // ── Context banner ──
  contextBanner: {
    backgroundColor: colors.accentFill,
    borderRadius: radius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
  },
  contextBannerText: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.accent,
    fontWeight: '600',
  },

  // ── Result card ──
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
  },
  resultTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultTypePill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  typeDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  typeDotNum: {
    fontFamily: fonts.sans,
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  resultTypeMeta: {
    flex: 1,
  },
  resultTypeLabel: {
    fontFamily: fonts.sans,
    fontSize: 10,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  resultTypeName: {
    fontFamily: fonts.serif,
    fontSize: 14,
    color: colors.text,
    marginTop: 1,
  },
  arrowChar: {
    fontSize: 16,
    color: colors.textDim,
    marginHorizontal: 4,
  },

  // ── Empty state ──
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
    lineHeight: 22,
  },
});
