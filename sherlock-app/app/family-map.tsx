import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { colors, fonts, spacing, radius } from '../constants/theme';
import { auth, loadFamily, type Family, type FamilyMember } from '../constants/firebase';
import { getDuoPair } from '../constants/duo';
import { DUO_DATA_EN } from '../i18n/duo_en';
import { TYPES as TYPES_V3, type EnneaType } from '../constants/quiz_v3';
import { TYPES } from '../constants/data';
import { useT, getTypeText } from '../i18n';

// B — "Carte de famille" : modélise le foyer comme un SYSTÈME (pas une liste).
// Centre de gravité tête/cœur/ventre + dynamiques deux-à-deux, en réutilisant
// le contenu Duo déjà écrit (DUO_DATA / DUO_DATA_EN). 100 % in-app.
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

  useFocusEffect(
    useCallback(() => {
      const uid = auth.currentUser?.uid;
      if (uid) loadFamily(uid).then(setFamily).catch(() => {});
    }, []),
  );

  const members: FamilyMember[] = family
    ? [...(family.self ? [family.self] : []), ...family.adults, ...family.children]
        .filter(m => m.type != null && (m.type as number) >= 1 && (m.type as number) <= 9)
    : [];

  const nameOf = (m: FamilyMember) => (m.kind === 'self' ? t('checkin.me') : m.name);
  const colorOf = (typeNum: number) => TYPES[typeNum - 1]?.color ?? colors.accent;

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
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backBtnText}>‹</Text>
      </Pressable>
      <Text style={styles.topTitle}>{t('familyMap.title')}</Text>
      <View style={styles.backBtn} />
    </View>
  );

  if (members.length < 2) {
    return (
      <View style={styles.container}>
        {header}
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.empty}>{t('familyMap.needTwo')}</Text>
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
                  ? <Text style={styles.centerEmpty}>—</Text>
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
          <Text key={m.id} style={styles.overlooked}>{t('familyMap.overlooked', { name: nameOf(m) })}</Text>
        ))}

        {/* Dyads */}
        <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>{t('familyMap.dynamicsTitle')}</Text>
        {pairs.map(([a, b], idx) => {
          const ta = a.type as number, tb = b.type as number;
          const fr = getDuoPair(ta, tb);
          const en = DUO_DATA_EN[`${ta}-${tb}`];
          const friction = (isEn && en?.vigilances) || fr?.vigilances || '';
          const strength = (isEn && en?.pointsForts) || fr?.pointsForts || '';
          return (
            <View key={idx} style={styles.pairCard}>
              <View style={styles.pairHead}>
                <View style={[styles.dot, { backgroundColor: colorOf(ta) }]} />
                <Text style={styles.pairNames}>{nameOf(a)} ({ta}) ↔ {nameOf(b)} ({tb})</Text>
                <View style={[styles.dot, { backgroundColor: colorOf(tb) }]} />
              </View>
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

  sectionTitle: {
    fontFamily: fonts.sans, fontSize: 12, fontWeight: '700', color: colors.accent,
    letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: spacing.sm,
  },

  centerCard: {
    backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
    padding: spacing.md, gap: spacing.md,
  },
  centerRow: { gap: spacing.xs },
  centerLabel: { fontFamily: fonts.serif, fontSize: 14, color: colors.text },
  centerMembers: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  centerEmpty: { fontFamily: fonts.sans, fontSize: 13, color: colors.textDim },
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
  pairBlock: { marginTop: spacing.xs },
  pairLabel: { fontFamily: fonts.sans, fontSize: 11, fontWeight: '700', color: colors.textMuted, marginBottom: 2 },
  pairText: { fontFamily: fonts.sans, fontSize: 13.5, color: colors.textSoft, lineHeight: 20 },
});
