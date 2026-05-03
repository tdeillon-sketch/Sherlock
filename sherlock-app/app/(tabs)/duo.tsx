import React, { useEffect, useState } from 'react';
import { trackScreen } from '../../constants/firebase';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, spacing, radius } from '../../constants/theme';
import { DuoContext, getDuoPair, DUO_PAIRS_CONTEXT, DUO_PARENT_VIEW, DUO_PEERS_VIEW } from '../../constants/duo';
import { DUO_DATA_EN, DUO_PAIRS_CONTEXT_EN } from '../../i18n/duo_en';
import { DUO_PARENT_VIEW_EN, DUO_PEERS_VIEW_EN } from '../../i18n/duo_views_en';
import { useT } from '../../i18n';

// ── Type metadata ──────────────────────────────────────────────
const TYPE_COLORS = [
  '#7b8e6e', '#c0713a', '#d4a03c', '#8b6ca7',
  '#5b8a9a', '#6b7b8e', '#d4853c', '#9b4a4a', '#7a9a7b',
];
const TYPE_NAMES_FR = [
  'Perfectionniste', 'Assistant', 'Gagneur', 'Artiste',
  'Observateur', 'Loyaliste', 'Épicurien', 'Chef', 'Médiateur',
];
const TYPE_NAMES_EN = [
  'Reformer', 'Helper', 'Achiever', 'Individualist',
  'Investigator', 'Loyalist', 'Enthusiast', 'Challenger', 'Peacemaker',
];

// ── Role ───────────────────────────────────────────────────────
// 2 roles only: 'adulte' and 'enfant'. The 'enfant' bucket covers the
// full 5–17 range (the previous 'ado' role + bucket has been removed).
type ProfileRole = 'adulte' | 'enfant';

function deriveContext(roleA: ProfileRole, roleB: ProfileRole): DuoContext {
  if (roleA === 'enfant' && roleB === 'enfant') return 'pairs';
  if (roleA === 'enfant' || roleB === 'enfant') return 'enfant';
  return 'adulte';
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
  roleLabels,
}: {
  value: ProfileRole;
  onChange: (r: ProfileRole) => void;
  typeColor: string;
  roleLabels: Record<ProfileRole, string>;
}) {
  const roles: ProfileRole[] = ['adulte', 'enfant'];
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
              {roleLabels[r]}
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
  typeNames,
}: {
  selected: number | null;
  onSelect: (t: number) => void;
  label: string;
  typeNames: string[];
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
                {typeNames[i]}
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
  const { t, locale } = useT();
  const isEn = locale === 'en';
  const TYPE_NAMES = isEn ? TYPE_NAMES_EN : TYPE_NAMES_FR;
  const ROLE_LABELS: Record<ProfileRole, string> = {
    adulte: t('duo.roleAdulte'),
    enfant: t('duo.roleEnfant'),
  };

  useEffect(() => { trackScreen('duo').catch(() => {}); }, []);

  // Defaults: Adulte (gauche) / Enfant (droite) — le cas d'usage le plus
  // probable dans une app destinée aux parents.
  const [roleA, setRoleA] = useState<ProfileRole>('adulte');
  const [roleB, setRoleB] = useState<ProfileRole>('enfant');
  const [typeA, setTypeA] = useState<number | null>(null);
  const [typeB, setTypeB] = useState<number | null>(null);

  const context = deriveContext(roleA, roleB);
  const pairFr = typeA && typeB ? getDuoPair(typeA, typeB) : null;
  const pairKey = typeA && typeB ? `${typeA}-${typeB}` : '';
  const pairEn = isEn && pairKey ? DUO_DATA_EN[pairKey] : null;

  // ── Locale-aware base pair: prefer EN, fall back to FR field-by-field ──
  const pair = pairFr ? {
    pointsForts: (isEn && pairEn?.pointsForts) || pairFr.pointsForts,
    vigilances:  (isEn && pairEn?.vigilances)  || pairFr.vigilances,
    aApporte:    (isEn && pairEn?.aApporte)    || pairFr.aApporte,
    bApporte:    (isEn && pairEn?.bApporte)    || pairFr.bApporte,
    conseil:     (isEn && pairEn?.conseil)     || pairFr.conseil,
    contexte: {
      enfant: (isEn && pairEn?.contexte?.enfant) || pairFr.contexte.enfant,
      couple: (isEn && pairEn?.contexte?.couple) || pairFr.contexte.couple,
      adulte: (isEn && pairEn?.contexte?.adulte) || pairFr.contexte.adulte,
    },
  } : null;

  // ── Perspective views with field-level fallback (EN ?? FR) ──
  // Parent-child context → DUO_PARENT_VIEW (parentSoutien/parentChallenge)
  // Peers context → DUO_PEERS_VIEW (parent observing two kids/teens)
  const perspectiveView = (() => {
    if (!pairFr) return null;
    if (context === 'pairs') {
      const fr = DUO_PEERS_VIEW[pairKey];
      const en = isEn ? DUO_PEERS_VIEW_EN[pairKey] : null;
      if (!fr && !en) return null;
      return {
        pointsForts: (en?.pointsForts) || fr?.pointsForts || '',
        vigilances:  (en?.vigilances)  || fr?.vigilances  || '',
        conseil:     (en?.conseil)     || fr?.conseil     || '',
      };
    }
    if (context === 'enfant') {
      const fr = DUO_PARENT_VIEW[pairKey];
      const en = isEn ? DUO_PARENT_VIEW_EN[pairKey] : null;
      if (!fr && !en) return null;
      return {
        pointsForts:     (en?.pointsForts)     || fr?.pointsForts     || '',
        vigilances:      (en?.vigilances)      || fr?.vigilances      || '',
        conseil:         (en?.conseil)         || fr?.conseil         || '',
        parentSoutien:   (en?.parentSoutien)   || fr?.parentSoutien   || '',
        parentChallenge: (en?.parentChallenge) || fr?.parentChallenge || '',
      };
    }
    return null;
  })();

  // Resolved section content (perspective overrides default in FR only)
  const pointsForts = perspectiveView?.pointsForts ?? pair?.pointsForts ?? '';
  const vigilances  = perspectiveView?.vigilances  ?? pair?.vigilances  ?? '';
  const conseil     = perspectiveView?.conseil     ?? pair?.conseil     ?? '';
  const parentSoutien   = perspectiveView?.parentSoutien   ?? '';
  const parentChallenge = perspectiveView?.parentChallenge ?? '';

  // For 'pairs' context, peer-peer tip — locale-aware
  const pairsText = (typeA && typeB)
    ? (
        (isEn && DUO_PAIRS_CONTEXT_EN[`${typeA}-${typeB}`]) ||
        DUO_PAIRS_CONTEXT[`${typeA}-${typeB}`] ||
        pair?.conseil ||
        ''
      )
    : '';

  const contextBodyText = (ctx: DuoContext): string => {
    if (!pair) return '';
    if (ctx === 'pairs') return pairsText;
    return pair.contexte[ctx as Exclude<DuoContext, 'pairs'>] ?? '';
  };

  // Use the parent-perspective layout for parent-child context (now translated in EN too).
  const useParentChildLayout = context === 'enfant';

  const contextLabelText =
    context === 'pairs'  ? t('duo.contextPairs')  :
    context === 'enfant' ? t('duo.contextEnfant') :
                           t('duo.contextAdulte');

  const colorA = typeA ? TYPE_COLORS[typeA - 1] : colors.accent;
  const colorB = typeB ? TYPE_COLORS[typeB - 1] : colors.accentLight;

  return (
    <View style={styles.screen}>
      {/* ── Title bar ── */}
      <View style={styles.titleBar}>
        <Text style={styles.screenTitle}>{t('duo.title')}</Text>
        <Text style={styles.screenSub}>{t('duo.subtitle')}</Text>
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
            <RoleStrip value={roleA} onChange={setRoleA} typeColor={colorA} roleLabels={ROLE_LABELS} />
            <TypeGrid selected={typeA} onSelect={setTypeA} label={t('duo.profileA')} typeNames={TYPE_NAMES} />
          </View>

          {/* VS */}
          <View style={styles.vsCol}>
            <View style={[styles.vsBadge, !!(typeA && typeB) && { borderColor: colorA }]}>
              <Text style={styles.vsText}>VS</Text>
            </View>
          </View>

          {/* Profil B */}
          <View style={styles.selectorBlock}>
            <RoleStrip value={roleB} onChange={setRoleB} typeColor={colorB} roleLabels={ROLE_LABELS} />
            <TypeGrid selected={typeB} onSelect={setTypeB} label={t('duo.profileB')} typeNames={TYPE_NAMES} />
          </View>
        </View>

        {/* ── Context label ── */}
        {(typeA || typeB) && (
          <View style={styles.contextBanner}>
            <Text style={styles.contextBannerText}>{contextLabelText}</Text>
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
                    <Text style={styles.resultTypeLabel}>{t('duo.typePrefix')} {typeA}</Text>
                    <Text style={styles.resultTypeName}>{TYPE_NAMES[typeA! - 1]}</Text>
                  </View>
                </View>

                <Text style={styles.arrowChar}>⟷</Text>

                <View style={[styles.resultTypePill, { justifyContent: 'flex-end' }]}>
                  <View style={styles.resultTypeMeta}>
                    <Text style={[styles.resultTypeLabel, { textAlign: 'right' }]}>{t('duo.typePrefix')} {typeB}</Text>
                    <Text style={[styles.resultTypeName, { textAlign: 'right' }]}>{TYPE_NAMES[typeB! - 1]}</Text>
                  </View>
                  <View style={[styles.typeDot, { backgroundColor: colorB }]}>
                    <Text style={styles.typeDotNum}>{typeB}</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>

            {/* Flat sections — perspective-aware */}
            <FlatSection
              emoji="✨"
              title={
                context === 'pairs'  ? t('duo.sectionStrengthsPairs')  :
                context === 'enfant' ? t('duo.sectionStrengthsEnfant') :
                                       t('duo.sectionStrengthsAdulte')
              }
              body={pointsForts}
              colorA={colorA}
            />
            <FlatSection
              emoji="⚠️"
              title={
                context === 'pairs'  ? t('duo.sectionFrictionPairs')  :
                context === 'enfant' ? t('duo.sectionFrictionEnfant') :
                                       t('duo.sectionFrictionAdulte')
              }
              body={vigilances}
              colorA={'#d4a03c'}
            />
            {/* Middle sections — parent-child layout is FR-only (relies on
                DUO_PARENT_VIEW). In EN we fall back to the symmetric layout. */}
            {useParentChildLayout ? (
              <>
                <FlatSection
                  emoji="🌱"
                  title={t('duo.sectionSupport')}
                  body={parentSoutien}
                  colorA={colorA}
                />
                <FlatSection
                  emoji="🪞"
                  title={t('duo.sectionChallenge')}
                  body={parentChallenge}
                  colorA={colorB}
                />
              </>
            ) : (
              <>
                <FlatSection
                  emoji="🤲"
                  title={t('duo.sectionAportsAtoB', { a: typeA, b: typeB })}
                  body={pair.aApporte}
                  colorA={colorA}
                />
                <FlatSection
                  emoji="🎁"
                  title={t('duo.sectionAportsBtoA', { a: typeA, b: typeB })}
                  body={pair.bApporte}
                  colorA={colorB}
                />
              </>
            )}
            <FlatSection
              emoji="💡"
              title={
                context === 'pairs'  ? t('duo.sectionAdvicePairs')  :
                context === 'enfant' ? t('duo.sectionAdviceEnfant') :
                                       t('duo.sectionAdviceAdulte')
              }
              body={conseil}
              colorA={colorA}
            />
            <FlatSection
              emoji="🔍"
              title={t('duo.sectionContext')}
              body={contextBodyText(context)}
              colorA={colorA}
            />
          </View>
        ) : (
          /* Empty state */
          <View style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>◎</Text>
            <Text style={styles.emptyTitle}>{t('duo.emptyTitle')}</Text>
            <Text style={styles.emptyDesc}>{t('duo.emptyDesc')}</Text>
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
