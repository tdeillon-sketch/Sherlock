import React, { useCallback, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { colors, fonts, spacing, radius } from '../constants/theme';
import { auth, loadFamily, type Family, type FamilyMember } from '../constants/firebase';
import { STRESS_RADAR } from '../constants/stressRadar';
import { TYPES as TYPES_V3, type EnneaType } from '../constants/quiz_v3';
import { TYPES } from '../constants/data';
import { useT, getTypeText } from '../i18n';
import { hapticLight } from '../utils/haptics';

// A5 — "Radar de stress" : pour un membre déjà typé, une lecture OBSERVATIONNELLE
// du moment (stress = flèche désintégration / sécurité = flèche intégration),
// + une chose à essayer / à éviter. Jamais un diagnostic.
export default function CheckinScreen() {
  const { t, locale } = useT();
  const fr = locale !== 'en';
  const [family, setFamily] = useState<Family | null>(null);
  const [sel, setSel] = useState<FamilyMember | null>(null);

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

  const header = (
    <View style={styles.topBar}>
      <Pressable onPress={sel ? () => setSel(null) : () => router.back()} style={styles.backBtn}>
        <Text style={styles.backBtnText}>‹</Text>
      </Pressable>
      <Text style={styles.topTitle}>{t('checkin.title')}</Text>
      <View style={styles.backBtn} />
    </View>
  );

  // ── Picker ──
  if (!sel) {
    return (
      <View style={styles.container}>
        {header}
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.pick}>{t('checkin.pick')}</Text>
          <Text style={styles.intro}>{t('checkin.intro')}</Text>
          {members.length === 0 ? (
            <Text style={styles.empty}>{t('checkin.empty')}</Text>
          ) : members.map(m => {
            const typeNum = m.type as number;
            const color = TYPES[typeNum - 1]?.color ?? colors.accent;
            const v3 = TYPES_V3[typeNum as EnneaType];
            const typeName = v3 ? getTypeText(v3, 'name', locale) : (TYPES[typeNum - 1]?.name ?? '');
            const label = m.kind === 'self' ? t('checkin.me') : m.name;
            return (
              <Pressable
                key={m.id}
                onPress={() => { hapticLight(); setSel(m); }}
                style={({ pressed }) => [styles.memberRow, pressed && { opacity: 0.7 }]}
              >
                <View style={[styles.badge, { backgroundColor: color }]}>
                  <Text style={styles.badgeNum}>{typeNum}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.memberName}>{label}</Text>
                  <Text style={styles.memberType}>{t('result.type')} {typeNum} · {typeName}</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  // ── Read ──
  const typeNum = sel.type as number;
  const data = STRESS_RADAR[typeNum];
  if (!data) return null; // defensive: out-of-range type (already filtered out of the picker)
  const name = sel.kind === 'self' ? t('checkin.me') : sel.name;

  return (
    <View style={styles.container}>
      {header}
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.question}>{t('checkin.questionFor', { name })}</Text>

        <View style={[styles.card, styles.stressCard]}>
          <Text style={styles.cardLabel}>{t('checkin.stressLabel')}</Text>
          <Text style={styles.cardBody}>{fr ? data.stressSignFR : data.stressSignEN}</Text>
          <View style={styles.advRow}>
            <Text style={styles.advLabel}>{t('checkin.tryLabel')}</Text>
            <Text style={styles.advText}>{fr ? data.tryFR : data.tryEN}</Text>
          </View>
          <View style={styles.advRow}>
            <Text style={styles.advLabel}>{t('checkin.avoidLabel')}</Text>
            <Text style={styles.advText}>{fr ? data.avoidFR : data.avoidEN}</Text>
          </View>
        </View>

        <View style={[styles.card, styles.secCard]}>
          <Text style={styles.cardLabel}>{t('checkin.securityLabel')}</Text>
          <Text style={styles.cardBody}>{fr ? data.securitySignFR : data.securitySignEN}</Text>
        </View>

        <Text style={styles.hedge}>{t('checkin.hedge')}</Text>

        <Pressable onPress={() => setSel(null)} style={styles.backLink}>
          <Text style={styles.backLinkText}>‹ {t('checkin.back')}</Text>
        </Pressable>
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

  pick: { fontFamily: fonts.serif, fontSize: 20, color: colors.text, marginBottom: spacing.xs },
  intro: { fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted, marginBottom: spacing.lg, lineHeight: 19 },
  empty: { fontFamily: fonts.sans, fontSize: 14, color: colors.textMuted, textAlign: 'center', padding: spacing.xl },

  memberRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.md,
    padding: spacing.md, backgroundColor: colors.surface,
    borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.sm,
  },
  badge: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  badgeNum: { fontFamily: fonts.serif, fontSize: 18, color: colors.white, fontWeight: '700' },
  memberName: { fontFamily: fonts.serif, fontSize: 17, color: colors.text },
  memberType: { fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted, marginTop: 2 },
  chevron: { fontFamily: fonts.sans, fontSize: 22, color: colors.textDim },

  question: { fontFamily: fonts.serif, fontSize: 21, color: colors.text, marginBottom: spacing.lg, lineHeight: 28 },

  card: { borderRadius: radius.md, borderWidth: 1, padding: spacing.md, marginBottom: spacing.md },
  stressCard: { backgroundColor: colors.surface, borderColor: colors.border, borderLeftWidth: 4, borderLeftColor: '#d4a24a' },
  secCard: { backgroundColor: colors.surface, borderColor: colors.border, borderLeftWidth: 4, borderLeftColor: '#7abf8e' },
  cardLabel: {
    fontFamily: fonts.sans, fontSize: 11, fontWeight: '700', color: colors.textMuted,
    letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: spacing.xs,
  },
  cardBody: { fontFamily: fonts.sans, fontSize: 15, color: colors.text, lineHeight: 22 },
  advRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md, alignItems: 'flex-start' },
  advLabel: { fontFamily: fonts.sans, fontSize: 12.5, fontWeight: '700', color: colors.textSoft, width: 92 },
  advText: { fontFamily: fonts.sans, fontSize: 13.5, color: colors.textSoft, flex: 1, lineHeight: 20 },

  hedge: {
    fontFamily: fonts.serifItalic, fontSize: 12.5, color: colors.textMuted,
    lineHeight: 19, marginTop: spacing.xs, marginBottom: spacing.lg,
  },
  backLink: { padding: spacing.sm, alignItems: 'center' },
  backLinkText: { fontFamily: fonts.sans, fontSize: 14, color: colors.accent },
});
