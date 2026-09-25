import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { colors, fonts, spacing, radius } from '../constants/theme';
import { auth, loadFamily, type Family, type FamilyMember } from '../constants/firebase';
import { getDuoPair, DUO_PARENT_VIEW, DUO_PEERS_VIEW, type PerspectiveView } from '../constants/duo';
import { DUO_DATA_EN } from '../i18n/duo_en';
import { DUO_PARENT_VIEW_EN, DUO_PEERS_VIEW_EN } from '../i18n/duo_views_en';
import { TYPES } from '../constants/data';
import { useT } from '../i18n';
import { deName } from '../utils/frenchName';

// B — "Carte de famille" : modélise le foyer comme un SYSTÈME (pas une liste).
// Centre de gravité tête/cœur/ventre + dynamiques deux-à-deux, en réutilisant
// le contenu Duo déjà écrit, choisi selon le lien entre les deux personnes :
//   - un adulte et un enfant : la vue parent → enfant (DUO_PARENT_VIEW),
//   - deux enfants : la vue fratrie (DUO_PEERS_VIEW),
//   - deux adultes : le texte générique (DUO_DATA), plus le conseil de couple
//     quand l'un des deux est vous (présenté au conditionnel : un proche
//     adulte n'est pas forcément un·e conjoint·e). 100 % in-app.
type Center = 'gut' | 'heart' | 'head';
const CENTER_OF: Record<number, Center> = {
  8: 'gut', 9: 'gut', 1: 'gut',
  2: 'heart', 3: 'heart', 4: 'heart',
  5: 'head', 6: 'head', 7: 'head',
};
const CENTERS: Center[] = ['gut', 'heart', 'head'];

export default function FamilyMapScreen() {
  const { t, locale } = useT();
  const isEn = locale === 'en';
  const [family, setFamily] = useState<Family | null>(null);
  const [loaded, setLoaded] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const uid = auth.currentUser?.uid;
      if (!uid) { setLoaded(true); return; }
      loadFamily(uid)
        .then(setFamily)
        .catch(() => {})
        .finally(() => setLoaded(true));
    }, []),
  );

  const members: FamilyMember[] = family
    ? [...(family.self ? [family.self] : []), ...family.adults, ...family.children]
        .filter(m => m.type != null && (m.type as number) >= 1 && (m.type as number) <= 9)
    : [];

  const nameOf = (m: FamilyMember) => (m.kind === 'self' ? t('family.me') : m.name);
  const colorOf = (typeNum: number) => TYPES[typeNum - 1]?.color ?? colors.accent;

  type Rel = 'parentChild' | 'adultChild' | 'adults' | 'children';

/** Relationship of a pair, with the adult (or first child) as `p`. */
function relationOf(a: FamilyMember, b: FamilyMember): { rel: Rel; p: FamilyMember; q: FamilyMember } {
  const ac = a.kind === 'child', bc = b.kind === 'child';
  if (ac && bc) return { rel: 'children', p: a, q: b };
  if (ac || bc) {
    const p = ac ? b : a, q = ac ? a : b;
    return { rel: p.kind === 'self' ? 'parentChild' : 'adultChild', p, q };
  }
  return { rel: 'adults', p: a, q: b };
}

// Center of gravity
  const byCenter: Record<Center, FamilyMember[]> = { gut: [], heart: [], head: [] };
  members.forEach(m => { const c = CENTER_OF[m.type as number]; if (c) byCenter[c].push(m); });
  const maxCount = Math.max(byCenter.gut.length, byCenter.heart.length, byCenter.head.length);
  const lone: FamilyMember[] = CENTERS
    .filter(c => byCenter[c].length === 1 && maxCount > 1)
    .map(c => byCenter[c][0]);

  // Dyads
  const pairs: [FamilyMember, FamilyMember][] = [];
  for (let i = 0; i < members.length; i++) {
    for (let j = i + 1; j < members.length; j++) pairs.push([members[i], members[j]]);
  }

  const header = (
    <View style={styles.topBar}>
      <Pressable
        onPress={() => router.back()}
        accessibilityRole="button"
        accessibilityLabel={t('common.back')}
        style={styles.backBtn}
      >
        <Text style={styles.backBtnText}>‹</Text>
      </Pressable>
      <Text style={styles.topTitle}>{t('familyMap.title')}</Text>
      <View style={styles.backBtn} />
    </View>
  );

  if (!loaded) return <View style={styles.container}>{header}</View>;

  if (members.length < 2) {
    return (
      <View style={styles.container}>
        {header}
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.empty}>{t('familyMap.needTwo')}</Text>
          <Pressable
            // dismissTo: back to the existing tabs, on the Quiz tab (no second tab stack)
            onPress={() => router.dismissTo('/quiz' as never)}
            accessibilityRole="button"
            style={({ pressed }) => [styles.emptyCta, pressed && { opacity: 0.85 }]}
          >
            <Text style={styles.emptyCtaText}>{t('family.emptyCta')}  →</Text>
          </Pressable>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {header}
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Center of gravity */}
        <Text style={styles.sectionTitle}>{t('familyMap.centerTitle')}</Text>
        <View style={styles.centerCard}>
          {CENTERS.map(c => (
            <View key={c} style={styles.centerRow}>
              <Text style={styles.centerLabel}>{t(`familyMap.${c}`)}</Text>
              <View style={styles.centerMembers}>
                {byCenter[c].length === 0
                  ? <Text style={styles.centerEmpty}>{t('familyMap.centerNone')}</Text>
                  : byCenter[c].map(m => (
                      <View key={m.id} style={[styles.chip, { borderColor: colorOf(m.type as number) }]}>
                        <Text style={styles.chipNum}>{m.type}</Text>
                        <Text style={styles.chipName}>{nameOf(m)}</Text>
                      </View>
                    ))}
              </View>
            </View>
          ))}
        </View>
        {lone.map(m => (
          <Text key={m.id} style={styles.overlooked}>
            {m.kind === 'self' ? t('familyMap.overlookedSelf') : t('familyMap.overlooked', { name: nameOf(m) })}
          </Text>
        ))}

        {/* Dyads */}
        <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>{t('familyMap.dynamicsTitle')}</Text>
        {pairs.map(([a, b]) => {
          const { rel, p, q } = relationOf(a, b);
          const tp = p.type as number, tq = q.type as number;
          const key = `${tp}-${tq}`;
          // Relationship view (parent → child, or two children), else generic.
          const [viewFr, viewEn]: [PerspectiveView | undefined, PerspectiveView | undefined] =
            rel === 'children' ? [DUO_PEERS_VIEW[key], DUO_PEERS_VIEW_EN[key]]
            : rel === 'adults' ? [undefined, undefined]
            : [DUO_PARENT_VIEW[key], DUO_PARENT_VIEW_EN[key]];
          const base = getDuoPair(tp, tq);
          const baseEn = DUO_DATA_EN[key];
          const pick = (k: 'pointsForts' | 'vigilances' | 'conseil') =>
            (isEn && viewEn?.[k]) || viewFr?.[k] || (isEn && baseEn?.[k]) || base?.[k] || '';
          const strength = pick('pointsForts');
          const friction = pick('vigilances');
          const advice = pick('conseil');
          const couple = rel === 'adults' && (p.kind === 'self' || q.kind === 'self')
            ? ((isEn && baseEn?.contexte?.couple) || base?.contexte?.couple || '')
            : '';
          return (
            <View key={`${a.id}-${b.id}`} style={styles.pairCard}>
              <View style={styles.pairHead}>
                <View style={[styles.dot, { backgroundColor: colorOf(tp) }]} />
                <Text style={styles.pairNames}>{nameOf(p)} ({tp}) ↔ {nameOf(q)} ({tq})</Text>
                <View style={[styles.dot, { backgroundColor: colorOf(tq) }]} />
              </View>
              <Text style={styles.pairRel}>{t(`familyMap.rel${rel.charAt(0).toUpperCase()}${rel.slice(1)}`)}</Text>
              {rel === 'adultChild' && (
                <Text style={styles.pairReadAs}>{t('familyMap.readAs', { name: nameOf(p), deName: deName(nameOf(p)) })}</Text>
              )}
              {!!strength && (
                <View style={styles.pairBlock}>
                  <Text style={styles.pairLabel}>{t('familyMap.strengthLabel')}</Text>
                  <Text style={styles.pairText}>{strength}</Text>
                </View>
              )}
              {!!friction && (
                <View style={styles.pairBlock}>
                  <Text style={styles.pairLabel}>{t('familyMap.frictionLabel')}</Text>
                  <Text style={styles.pairText}>{friction}</Text>
                </View>
              )}
              {!!advice && (
                <View style={styles.pairBlock}>
                  <Text style={styles.pairLabel}>{t('familyMap.adviceLabel')}</Text>
                  <Text style={styles.pairText}>{advice}</Text>
                </View>
              )}
              {!!couple && (
                <View style={styles.pairBlock}>
                  <Text style={styles.pairLabel}>{t('familyMap.coupleLabel')}</Text>
                  <Text style={styles.pairText}>{couple}</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: spacing.xxl + spacing.sm, paddingHorizontal: spacing.md, paddingBottom: spacing.xs,
  },
  backBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  backBtnText: { fontFamily: fonts.sans, fontSize: 28, color: colors.text, lineHeight: 32 },
  topTitle: { fontFamily: fonts.serif, fontSize: 16, color: colors.text },

  empty: { fontFamily: fonts.sans, fontSize: 14, color: colors.textMuted, textAlign: 'center', padding: spacing.xl, lineHeight: 21 },
  emptyCta: {
    alignSelf: 'center', minHeight: 44, justifyContent: 'center', paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.accent, borderRadius: radius.full,
  },
  emptyCtaText: { fontFamily: fonts.sans, fontSize: 14, fontWeight: '600', color: colors.accentText },

  sectionTitle: {
    fontFamily: fonts.sans, fontSize: 12, fontWeight: '700', color: colors.accentText,
    letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: spacing.sm,
  },

  centerCard: {
    backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
    padding: spacing.md, gap: spacing.md,
  },
  centerRow: { gap: spacing.xs },
  centerLabel: { fontFamily: fonts.serif, fontSize: 14, color: colors.text },
  centerMembers: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  centerEmpty: { fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted, fontStyle: 'italic' },
  chip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: radius.full, borderWidth: 1.5,
    backgroundColor: colors.bg,
  },
  chipNum: { fontFamily: fonts.serif, fontSize: 12, fontWeight: '700', color: colors.textSoft },
  chipName: { fontFamily: fonts.sans, fontSize: 13, color: colors.text },

  overlooked: {
    fontFamily: fonts.serifItalic, fontSize: 13, color: colors.textSoft,
    lineHeight: 19, marginTop: spacing.sm,
  },

  pairCard: {
    backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
    padding: spacing.md, marginBottom: spacing.sm,
  },
  pairHead: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm, marginBottom: spacing.sm },
  dot: { width: 12, height: 12, borderRadius: 6 },
  pairNames: { flex: 1, fontFamily: fonts.serif, fontSize: 15, color: colors.text, textAlign: 'center' },
  pairRel: {
    fontFamily: fonts.sans, fontSize: 11, fontWeight: '700', color: colors.textMuted,
    letterSpacing: 0.8, textTransform: 'uppercase', textAlign: 'center', marginBottom: spacing.xs,
  },
  pairReadAs: {
    fontFamily: fonts.serifItalic, fontSize: 13, lineHeight: 19, color: colors.textSoft,
    textAlign: 'center', marginBottom: spacing.xs,
  },
  pairBlock: { marginTop: spacing.xs },
  pairLabel: { fontFamily: fonts.sans, fontSize: 11, fontWeight: '700', color: colors.textMuted, marginBottom: 2 },
  pairText: { fontFamily: fonts.sans, fontSize: 13.5, color: colors.textSoft, lineHeight: 20 },
});
