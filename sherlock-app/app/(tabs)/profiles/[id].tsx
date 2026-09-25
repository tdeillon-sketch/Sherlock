import { useEffect, useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { colors, fonts, spacing, radius } from '../../../constants/theme';
import { TYPES } from '../../../constants/data';
import { TYPE_WINGS, getWing } from '../../../constants/wings';
import { WINGS_EN } from '../../../i18n/wings_en';
import { TYPES as TYPES_V3 } from '../../../constants/quiz_v3';
import type { EnneaType } from '../../../constants/quiz_v3';
import { useT, getTypeText } from '../../../i18n';
import { TYPES_EN } from '../../../i18n/types_en';
import { auth, loadFamily, type FamilyMember } from '../../../constants/firebase';
import { deName } from '../../../utils/frenchName';
import {
  CONTENT_AGE_KEYS, AGE_LABEL_KEYS, contentKeyForAge, contentKeyForBand,
} from '../../../constants/ageBands';

// Who the page is about. Opened from the 9-profile list: 'general' (the
// original page). From "Ma famille" or a quiz result: the person, so the
// headings speak to or about them, and the child-only sections (age bands,
// keys to support a child) only show for a child.
type Frame = 'general' | 'self' | 'child' | 'adult';

export default function ProfileDetailScreen() {
  const params = useLocalSearchParams<{
    id: string; who?: string; member?: string; wing?: string; band?: string;
  }>();
  const typeIndex = parseInt(params.id ?? '1', 10) - 1;
  const type = TYPES[typeIndex];
  const { t, locale } = useT();

  // ── The person (only an opaque id travels in the URL, never a name) ──
  const [member, setMember] = useState<FamilyMember | null>(null);
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!params.member || !uid) return;
    let alive = true;
    loadFamily(uid)
      .then((f) => {
        const all = [...(f.self ? [f.self] : []), ...f.adults, ...f.children];
        if (alive) setMember(all.find((m) => m.id === params.member) ?? null);
      })
      .catch(() => {});
    return () => { alive = false; };
  }, [params.member]);

  const whoParam = params.who === 'self' || params.who === 'child' || params.who === 'adult' ? params.who : null;
  const frame: Frame = member?.kind ?? whoParam ?? 'general';
  const isPerson = frame !== 'general';
  const isSelf = frame === 'self';
  const personName = member && member.kind !== 'self' ? member.name : '';
  // The child's current band: the band of the latest quiz, else the saved
  // age, else the band passed by the quiz result screen.
  const currentBand = frame === 'child'
    ? (contentKeyForBand(member?.lastMode) ?? contentKeyForAge(member?.age) ?? contentKeyForBand(params.band ?? null))
    : null;

  // ── Wing selection: the person's wing if known, else none (resets on open) ──
  const wingParam = Number(params.wing ?? member?.wingType ?? NaN);
  const initialWing = type && TYPE_WINGS[type.num]?.includes(wingParam) ? wingParam : null;
  const [selectedWing, setSelectedWing] = useState<number | null>(initialWing);
  const [wingTouched, setWingTouched] = useState(false);
  useEffect(() => {
    // The member loads after the first render: adopt their wing once.
    if (!wingTouched && initialWing !== null) setSelectedWing(initialWing);
  }, [initialWing, wingTouched]);
  const pickWing = (w: number | null) => { setWingTouched(true); setSelectedWing(w); };

  if (!type) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{t('profile.notFound')}</Text>
      </View>
    );
  }

  const wingOptions = TYPE_WINGS[type.num]; // [wing1, wing2]
  const wingVariantFr = selectedWing !== null ? getWing(type.num, selectedWing) : null;
  // Locale-aware wing variant: prefer the EN translation (i18n/wings_en.ts),
  // falling back field-by-field to the FR source.
  const wingEn = (locale === 'en' && selectedWing !== null)
    ? (WINGS_EN[`${type.num}w${selectedWing}`] ?? null)
    : null;
  const wingVariant = wingVariantFr ? {
    nickname: wingEn?.nickname ?? wingVariantFr.nickname,
    short:    wingEn?.short    ?? wingVariantFr.short,
    metaphor: wingEn?.metaphor ?? wingVariantFr.metaphor,
    ages:     wingEn?.ages     ?? wingVariantFr.ages,
    keys:     wingEn?.keys     ?? wingVariantFr.keys,
  } : null;

  // ── Localized content (wing variant overrides base; EN content from TYPES_EN) ──
  const isEn = locale === 'en';
  const en = TYPES_EN[type.num];
  const v3 = TYPES_V3[type.num as EnneaType];

  const localizedTypeName = v3 ? getTypeText(v3, 'name', locale) : type.name;
  // Wing variant nicknames stay FR — we keep them; in EN we just show the type+wing notation
  const displayName = wingVariant
    ? `${localizedTypeName} · ${wingVariant.nickname}`
    : localizedTypeName;
  const displayShort = wingVariant?.short ?? (isEn && en ? en.short : type.short);
  const displayMetaphor = wingVariant?.metaphor ?? (isEn && en ? en.metaphor : type.metaphor);
  const displayAges = wingVariant?.ages ?? (isEn && en ? en.ages : type.ages);
  const displayKeys = wingVariant?.keys ?? (isEn && en ? en.keys : type.keys);
  const displayBelief = isEn && en ? en.belief : type.belief;
  const displayCompulsionName = isEn && en ? en.compulsionName : type.compulsion?.name;
  const displayCompulsionDesc = isEn && en ? en.compulsionDesc : type.compulsion?.desc;
  const displayVirtueName = isEn && en ? en.virtueName : type.virtue?.name;
  const displayVirtueDesc = isEn && en ? en.virtueDesc : type.virtue?.desc;
  const displayIdentity = isEn && en ? en.identity : type.identity;
  const displayMissionLibre = isEn && en ? en.missionLibre : type.missionLibre;
  const displayIntegrationDesc = isEn && en ? en.integrationDesc : type.integration.desc;
  const displayDisintegrationDesc = isEn && en ? en.disintegrationDesc : type.disintegration.desc;
  const displayFear = isEn && en ? en.fear : type.fear;
  const displayNeed = isEn && en ? en.need : type.need;

  // ── Headings per person ──
  const topTitle = isSelf ? t('subject.legendSelf')
    : personName ? t('profile.forNamed', { name: personName, deName: deName(personName) })
    : frame === 'child' ? t('subject.legendChild')
    : frame === 'adult' ? t('subject.legendProche')
    : t('profile.pageTitle');
  const L = (base: string) => t(isSelf ? `profile.${base}Self` : `profile.${base}`);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top bar with back button */}
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>‹</Text>
        </Pressable>
        <Text style={styles.topBarTitle} numberOfLines={1}>{topTitle}</Text>
        <View style={styles.backBtn} />
      </View>


      {/* Hero */}
      <View style={styles.header}>
        <View style={[styles.typeCircle, { backgroundColor: type.color }]}>
          <Text style={styles.typeCircleText}>{type.num}</Text>
        </View>
        <Text style={styles.typeName}>{displayName}</Text>

        {/* ── Wing selector (3 pills) ── */}
        <View style={styles.wingSelector}>
          <Pressable
            style={[
              styles.wingPill,
              selectedWing === null && [styles.wingPillActive, { borderColor: type.color, backgroundColor: type.color }],
            ]}
            onPress={() => pickWing(null)}
          >
            <Text
              style={[
                styles.wingPillText,
                selectedWing === null && styles.wingPillTextActive,
              ]}
            >
              Type {type.num}
            </Text>
          </Pressable>

          {wingOptions.map((w) => {
            const active = selectedWing === w;
            const wingData = getWing(type.num, w);
            const wingNick = (locale === 'en'
              ? (WINGS_EN[`${type.num}w${w}`]?.nickname ?? wingData?.nickname)
              : wingData?.nickname) ?? '';
            return (
              <Pressable
                key={w}
                style={[
                  styles.wingPill,
                  active && [styles.wingPillActive, { borderColor: type.color, backgroundColor: type.color }],
                ]}
                onPress={() => pickWing(w)}
              >
                <Text
                  style={[
                    styles.wingPillText,
                    active && styles.wingPillTextActive,
                  ]}
                >
                  {type.num}w{w}
                </Text>
                {wingData && (
                  <Text
                    style={[
                      styles.wingPillSub,
                      active && styles.wingPillSubActive,
                    ]}
                    numberOfLines={1}
                  >
                    {wingNick}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.typeShort}>{displayShort}</Text>
      </View>

      {/* What drives them (adults: fear + need, adult-worded) */}
      {(isSelf || frame === 'adult') && displayFear && displayNeed && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{isSelf ? t('profile.driversTitleSelf') : t('profile.driversTitle')}</Text>
          <View style={styles.beliefCard}>
            <Text style={styles.beliefLabel}>{L('fearLabel')}</Text>
            <Text style={styles.driverText}>{displayFear}</Text>
            <Text style={[styles.beliefLabel, { marginTop: spacing.md }]}>{L('needLabel')}</Text>
            <Text style={styles.driverText}>{displayNeed}</Text>
          </View>
        </View>
      )}

      {/* Portrait (the texts describe the type from childhood on) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {isSelf || frame === 'adult' ? t('profile.portraitTitleAdult') : t('profile.portraitTitle')}
        </Text>
        <Text style={styles.sectionBody}>{displayMetaphor}</Text>
      </View>

      {/* Inner mechanics */}
      {displayBelief && displayCompulsionName && displayVirtueName && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.mechanicsTitle')}</Text>

          {/* Belief */}
          <View style={styles.beliefCard}>
            <Text style={styles.beliefLabel}>{L('beliefLabel')}</Text>
            <Text style={styles.beliefText}>« {displayBelief} »</Text>
          </View>

          {/* Identity */}
          {displayIdentity && (
            <View style={styles.identityRow}>
              <Text style={styles.identityLabel}>{L('identityLabel')}</Text>
              <Text style={styles.identityText}>« {displayIdentity} »</Text>
            </View>
          )}

          {/* Compulsion → Virtue */}
          <View style={styles.dynamicBox}>
            <View style={[styles.poleCard, styles.poleCompulsion]}>
              <Text style={styles.poleLabel}>{L('compulsionLabel')}</Text>
              <Text style={styles.poleName}>{displayCompulsionName}</Text>
              <Text style={styles.poleDesc}>{displayCompulsionDesc}</Text>
            </View>

            <View style={styles.arrowRow}>
              <Text style={styles.arrowText}>{t('profile.pathToFreedom')}</Text>
            </View>

            <View style={[styles.poleCard, styles.poleVirtue, { borderColor: type.color }]}>
              <Text style={[styles.poleLabel, { color: type.color }]}>{L('virtueLabel')}</Text>
              <Text style={styles.poleName}>{displayVirtueName}</Text>
              <Text style={styles.poleDesc}>{displayVirtueDesc}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Liberated mission */}
      {displayMissionLibre && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{L('liberatedTitle')}</Text>
          <Text style={styles.sectionBody}>{displayMissionLibre}</Text>
        </View>
      )}

      {/* Integration & Disintegration */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('profile.arrowsTitle')}</Text>
        <View style={styles.integrationBox}>
          <Text style={styles.integrationLabel}>
            {t('profile.integrationToward', { n: type.integration.toward })}
          </Text>
          <Text style={styles.integrationDesc}>{displayIntegrationDesc}</Text>
        </View>
        <View style={styles.integrationBox}>
          <Text style={styles.integrationLabel}>
            {t('profile.disintegrationToward', { n: type.disintegration.toward })}
          </Text>
          <Text style={styles.integrationDesc}>{displayDisintegrationDesc}</Text>
        </View>
      </View>

      {isPerson && frame !== 'child' ? (
        /* Adults: the age bands and the keys are written for a child */
        <View style={styles.section}>
          <Text style={styles.childNote}>{t('profile.childSectionsNote')}</Text>
          <Pressable
            onPress={() => router.push(`/profiles/${type.num}` as never)}
            accessibilityRole="link"
            style={({ pressed }) => [styles.childLink, pressed && { opacity: 0.6 }]}
          >
            <Text style={styles.childLinkText}>{t('profile.seeChildVersion')}  →</Text>
          </Pressable>
        </View>
      ) : (
        <>
          {/* Age bands (a child's current band is highlighted) */}
          {CONTENT_AGE_KEYS.map((ageKey) => {
            const isCurrent = currentBand === ageKey;
            return (
              <View
                key={ageKey}
                style={[styles.section, isCurrent && [styles.currentBand, { borderLeftColor: type.color }]]}
              >
                {isCurrent && (
                  <Text style={[styles.currentBandBadge, { color: type.color }]}>{t('profile.currentBand')}</Text>
                )}
                <Text style={styles.sectionTitle}>{t(AGE_LABEL_KEYS[ageKey])}</Text>
                <Text style={styles.sectionBody}>{displayAges[ageKey]}</Text>
              </View>
            );
          })}

          {/* Keys */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {personName ? t('profile.keysTitleNamed', { name: personName }) : t('profile.keysTitle')}
            </Text>
            {displayKeys.map((key, index) => (
              <View key={index} style={styles.keyCard}>
                <View style={styles.keyNumberCircle}>
                  <Text style={styles.keyNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.keyTitle}>{key.title}</Text>
                <Text style={styles.keyDesc}>{key.desc}</Text>
              </View>
            ))}
          </View>
        </>
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
    paddingBottom: spacing.xxl * 2,
  },
  errorText: {
    fontFamily: fonts.sans,
    fontSize: 16,
    color: colors.textSoft,
    textAlign: 'center',
    marginTop: 120,
  },

  // Barre du haut
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.xxl + spacing.sm,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  backBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnText: {
    fontFamily: fonts.sans,
    fontSize: 28,
    color: colors.text,
    lineHeight: 32,
  },
  topBarTitle: {
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.text,
  },

  // Hero
  header: {
    alignItems: 'center',
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    paddingTop: spacing.md,
  },
  typeCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  typeCircleText: {
    fontFamily: fonts.sans,
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
  },
  typeName: {
    fontFamily: fonts.serif,
    fontSize: 24,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },

  // ── Wing selector ──
  wingSelector: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.md,
    width: '100%',
    justifyContent: 'center',
  },
  wingPill: {
    flex: 1,
    maxWidth: 130,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.full,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.bg,
    alignItems: 'center',
  },
  wingPillActive: {
    // borderColor and backgroundColor injected dynamically
  },
  wingPillText: {
    fontFamily: fonts.sans,
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSoft,
  },
  wingPillTextActive: {
    color: colors.white,
  },
  wingPillSub: {
    fontFamily: fonts.sans,
    fontSize: 9,
    color: colors.textMuted,
    marginTop: 1,
    textAlign: 'center',
  },
  wingPillSubActive: {
    color: 'rgba(255,255,255,0.85)',
  },

  typeShort: {
    fontFamily: fonts.serifItalic,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSoft,
    textAlign: 'center',
    marginTop: spacing.sm,
  },

  // Sections
  section: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xl,
  },
  sectionTitle: {
    fontFamily: fonts.serif,
    fontSize: 22,
    color: colors.accentText,
    marginBottom: spacing.md,
  },
  sectionBody: {
    fontFamily: fonts.sans,
    fontSize: 15,
    lineHeight: 24,
    color: colors.textSoft,
  },

  // ── Mécanique intérieure ──
  beliefCard: {
    backgroundColor: colors.surface,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    borderRadius: radius.sm,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  beliefLabel: {
    fontFamily: fonts.sans,
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 1.2,
    marginBottom: spacing.sm,
  },
  driverText: {
    fontFamily: fonts.sans, fontSize: 15, lineHeight: 22, color: colors.text, marginTop: 4,
  },
  childNote: {
    fontFamily: fonts.sans, fontSize: 14, lineHeight: 21, color: colors.textSoft,
  },
  childLink: { minHeight: 44, justifyContent: 'center', alignSelf: 'flex-start' },
  childLinkText: { fontFamily: fonts.sans, fontSize: 14, fontWeight: '600', color: colors.accentText },
  currentBand: {
    borderLeftWidth: 3, paddingLeft: spacing.md,
  },
  currentBandBadge: {
    fontFamily: fonts.sans, fontSize: 11, fontWeight: '700', letterSpacing: 1,
    textTransform: 'uppercase', marginBottom: 4,
  },
  beliefText: {
    fontFamily: fonts.serifItalic,
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
  },
  identityRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xs,
  },
  identityLabel: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textSoft,
    marginRight: spacing.xs,
  },
  identityText: {
    fontFamily: fonts.serif,
    fontSize: 15,
    color: colors.text,
    flexShrink: 1,
  },
  dynamicBox: {
    marginTop: spacing.sm,
  },
  poleCard: {
    borderRadius: radius.md,
    padding: spacing.lg,
    borderWidth: 1,
  },
  poleCompulsion: {
    backgroundColor: 'rgba(192, 68, 58, 0.06)',
    borderColor: 'rgba(192, 68, 58, 0.25)',
  },
  poleVirtue: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
  },
  poleLabel: {
    fontFamily: fonts.sans,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#c0443a',
    marginBottom: spacing.xs,
  },
  poleName: {
    fontFamily: fonts.serif,
    fontSize: 18,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  poleDesc: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSoft,
  },
  arrowRow: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  arrowText: {
    fontFamily: fonts.sans,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    color: colors.textMuted,
  },

  // Intégration
  integrationBox: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  integrationLabel: {
    fontFamily: fonts.sans,
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  integrationDesc: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSoft,
  },

  // Clés
  keyCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  keyNumberCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.accentFill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  keyNumberText: {
    fontFamily: fonts.sans,
    fontSize: 13,
    fontWeight: '700',
    color: colors.accentText,
  },
  keyTitle: {
    fontFamily: fonts.sans,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  keyDesc: {
    fontFamily: fonts.sans,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSoft,
  },
});
