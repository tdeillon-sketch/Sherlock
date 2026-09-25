import React, { useCallback, useEffect, useState } from 'react';
import { auth, trackScreen, loadFamily, isAnonymousUser, type Family } from '../../../constants/firebase';
import { openSignIn } from '../../../constants/authGate';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { colors, fonts, spacing, radius } from '../../../constants/theme';
import { TYPES } from '../../../constants/data';
import { TYPES as TYPES_V3 } from '../../../constants/quiz_v3';
import type { EnneaType } from '../../../constants/quiz_v3';
import { TYPES_EN } from '../../../i18n/types_en';
import { useT, getTypeText } from '../../../i18n';
import { requestSecondOpinion } from '../../../constants/quizIntent';

function ProfileCard({ type, name, shortText }: { type: typeof TYPES[0]; name: string; shortText: string }) {
  return (
    <Pressable
      onPress={() => router.push(`/profiles/${type.num}`)}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={[styles.circle, { backgroundColor: type.color }]}>
        <Text style={styles.circleText}>{type.num}</Text>
      </View>
      <Text style={styles.typeName}>{name}</Text>
      <Text style={styles.typeShort}>
        {shortText}
      </Text>
    </Pressable>
  );
}

export default function ProfilesScreen() {
  const { width } = useWindowDimensions();
  const { t, locale } = useT();
  const numColumns = width >= 900 ? 3 : width >= 550 ? 2 : 1;
  const [family, setFamily] = useState<Family | null>(null);
  const [familyLoaded, setFamilyLoaded] = useState(false);
  useEffect(() => { trackScreen('profiles').catch(() => {}); }, []);

  // Refresh "Ma famille" whenever the tab regains focus (a quiz may have
  // just saved someone).
  useFocusEffect(
    useCallback(() => {
      const uid = auth.currentUser?.uid;
      if (!uid) { setFamilyLoaded(true); return; }
      loadFamily(uid)
        .then(setFamily)
        .catch(() => {})
        .finally(() => setFamilyLoaded(true));
    }, []),
  );

  const familyMembers = family
    ? [...(family.self ? [family.self] : []), ...family.adults, ...family.children].filter((m) => m.type != null)
    : [];

  // ── Ma famille (saved profiles) ──
  // Nothing until the first load has answered, so a typed family never sees
  // the "take the quiz" empty state flash.
  const familySection = !familyLoaded ? null : (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>{t('family.title')}</Text>
      {isAnonymousUser() && (
        <Pressable
          onPress={openSignIn}
          accessibilityRole="button"
          style={({ pressed }) => [styles.familyEmpty, pressed && { opacity: 0.85 }]}
        >
          <Text style={styles.familyEmptyText}>{t('family.anonHint')}</Text>
          <Text style={styles.familyCtaText}>{t('family.anonCta')}  →</Text>
        </Pressable>
      )}
      {familyMembers.length > 0 ? (
        <>
          <View style={styles.familyList}>
            {familyMembers.map((m) => {
              const typeNum = m.type as number;
              const color = TYPES[typeNum - 1]?.color ?? colors.accent;
              const v3 = TYPES_V3[typeNum as EnneaType];
              const typeName = v3 ? getTypeText(v3, 'name', locale) : (TYPES[typeNum - 1]?.name ?? '');
              const label = m.kind === 'self' ? t('family.me') : m.name;
              // The page adapts to the person (only an opaque id in the URL).
              const href = `/profiles/${typeNum}?who=${m.kind}&member=${encodeURIComponent(m.id)}`
                + (m.wingType ? `&wing=${m.wingType}` : '');
              const opinion = m.kind === 'self' ? m.secondOpinion : null;
              return (
                <View key={m.id}>
                <Pressable
                  onPress={() => router.push(href as never)}
                  style={({ pressed }) => [styles.familyRow, pressed && { opacity: 0.7 }]}
                >
                  <View style={[styles.familyBadge, { backgroundColor: color }]}>
                    <Text style={styles.familyBadgeNum}>{typeNum}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.familyName}>{label}</Text>
                    <Text style={styles.familyType}>
                      {t('result.type')} {typeNum}{m.wingType ? `w${m.wingType}` : ''} · {typeName}
                    </Text>
                    {m.kind === 'adult' && (
                      <Text style={styles.familyType}>👥 {t('subject.procheTitle')}</Text>
                    )}
                    {m.kind === 'child' && m.age != null && (
                      <Text style={styles.familyType}>🧒 {t('subject.yearsOld', { n: m.age })}</Text>
                    )}
                    {opinion && (
                      <Text style={styles.familyType}>
                        👀 {opinion.agree
                          ? t('family.seenByCloseAgree', { t: opinion.observerTop })
                          : t('family.seenByClose', { t: opinion.observerTop })}
                      </Text>
                    )}
                  </View>
                  <Text style={styles.chevron}>›</Text>
                </Pressable>
                {m.kind === 'self' && (
                  <Pressable
                    onPress={() => { requestSecondOpinion(); router.navigate('/quiz' as never); }}
                    accessibilityRole="button"
                    style={({ pressed }) => [styles.secondBtn, pressed && { opacity: 0.7 }]}
                  >
                    <Text style={styles.secondBtnText}>{t('second.againCta')}</Text>
                  </Pressable>
                )}
                </View>
              );
            })}
          </View>
          <Pressable
            onPress={() => router.push('/family-map' as never)}
            style={({ pressed }) => [styles.familyCta, pressed && { opacity: 0.85 }]}
          >
            <Text style={styles.familyCtaText}>{t('familyMap.cta')}</Text>
          </Pressable>
        </>
      ) : (
        <Pressable
          onPress={() => router.push('/quiz' as never)}
          style={({ pressed }) => [styles.familyEmpty, pressed && { opacity: 0.85 }]}
        >
          <Text style={styles.familyEmptyText}>{t('family.emptyHint')}</Text>
          <Text style={styles.familyCtaText}>{t('family.emptyCta')}  →</Text>
        </Pressable>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={TYPES}
        key={`cols-${numColumns}`}
        keyExtractor={(item) => String(item.num)}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Text style={styles.title}>{t('profilesList.title')}</Text>
              <Text style={styles.subtitle}>{t('profilesList.subtitle')}</Text>
            </View>
            {familySection}
            <Text style={[styles.sectionLabel, styles.allTypesLabel]}>{t('profilesList.allTypes')}</Text>
          </View>
        }
        renderItem={({ item }) => {
          const v3 = TYPES_V3[item.num as EnneaType];
          const localizedName = v3 ? getTypeText(v3, 'name', locale) : item.name;
          const localizedShort = locale === 'en'
            ? (TYPES_EN[item.num]?.short ?? item.short)
            : item.short;
          return (
            <View style={numColumns > 1 ? { flex: 1, padding: spacing.xs } : undefined}>
              <ProfileCard type={item} name={localizedName} shortText={localizedShort} />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  row: {
    justifyContent: 'flex-start',
  },
  header: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xs,
    marginBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 26,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: fonts.sans,
    fontSize: 15,
    color: colors.textSoft,
    lineHeight: 22,
  },

  // ── Ma famille ──
  section: { marginBottom: spacing.xl },
  sectionLabel: {
    fontFamily: fonts.sans, fontSize: 11, fontWeight: '700',
    color: colors.textMuted, letterSpacing: 1.2, textTransform: 'uppercase',
    marginBottom: 6, paddingHorizontal: spacing.xs,
  },
  allTypesLabel: { marginBottom: spacing.sm },
  familyList: { gap: 8, marginTop: spacing.sm },
  familyRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    paddingVertical: 10, paddingHorizontal: 14,
    backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.md,
  },
  familyBadge: {
    width: 34, height: 34, borderRadius: 17,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  familyBadgeNum: { fontFamily: fonts.serif, fontSize: 16, fontWeight: '700', color: colors.white },
  familyName: { fontFamily: fonts.sans, fontSize: 14, color: colors.text, fontWeight: '600' },
  familyType: { fontFamily: fonts.sans, fontSize: 12, color: colors.textMuted, marginTop: 2 },
  chevron: { fontSize: 24, color: colors.textDim, paddingHorizontal: spacing.xs },
  familyCta: {
    marginTop: spacing.sm, paddingVertical: spacing.md, paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, alignItems: 'center',
  },
  familyCtaText: { fontFamily: fonts.sans, fontSize: 14, fontWeight: '600', color: colors.accentText },
  secondBtn: {
    minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start',
    paddingHorizontal: 14, marginTop: 2,
  },
  secondBtnText: { fontFamily: fonts.sans, fontSize: 13, fontWeight: '600', color: colors.accentText },
  familyEmpty: {
    marginTop: spacing.sm, padding: spacing.md, gap: spacing.sm,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md,
  },
  familyEmptyText: { fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.textSoft },

  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  cardPressed: {
    backgroundColor: colors.bgLight,
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  circleText: {
    fontFamily: fonts.serif,
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
  },
  typeName: {
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.text,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  typeShort: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textSoft,
    textAlign: 'center',
    lineHeight: 19,
  },
});
