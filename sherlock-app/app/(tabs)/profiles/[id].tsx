import { useState } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { colors, fonts, spacing, radius } from '../../../constants/theme';
import { TYPES } from '../../../constants/data';
import { TYPE_WINGS, getWing } from '../../../constants/wings';
import { useT } from '../../../i18n';
import EnComingSoonBanner from '../../../components/EnComingSoonBanner';

export default function ProfileDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const typeIndex = parseInt(id ?? '1', 10) - 1;
  const type = TYPES[typeIndex];
  const { t } = useT();

  // ── Wing selection (no persistence — resets on each open) ──
  // null = base type (no wing); number = wing type number
  const [selectedWing, setSelectedWing] = useState<number | null>(null);

  if (!type) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{t('profile.notFound')}</Text>
      </View>
    );
  }

  const wingOptions = TYPE_WINGS[type.num]; // [wing1, wing2]
  const wingVariant = selectedWing !== null ? getWing(type.num, selectedWing) : null;

  // ── Resolved content (wing variant overrides base) ──
  const displayName = wingVariant
    ? `${type.name} — ${wingVariant.nickname}`
    : type.name;
  const displayShort = wingVariant?.short ?? type.short;
  const displayMetaphor = wingVariant?.metaphor ?? type.metaphor;
  const displayAges = wingVariant?.ages ?? type.ages;
  const displayKeys = wingVariant?.keys ?? type.keys;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Top bar with back button */}
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>‹</Text>
        </Pressable>
        <Text style={styles.topBarTitle}>{t('profile.pageTitle')}</Text>
        <View style={styles.backBtn} />
      </View>

      {/* EN coming soon banner — only shows in EN mode */}
      <EnComingSoonBanner />

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
            onPress={() => setSelectedWing(null)}
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
            return (
              <Pressable
                key={w}
                style={[
                  styles.wingPill,
                  active && [styles.wingPillActive, { borderColor: type.color, backgroundColor: type.color }],
                ]}
                onPress={() => setSelectedWing(w)}
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
                    {wingData.nickname}
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.typeShort}>{displayShort}</Text>
      </View>

      {/* Portrait */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('profile.portraitTitle')}</Text>
        <Text style={styles.sectionBody}>{displayMetaphor}</Text>
      </View>

      {/* Inner mechanics */}
      {type.belief && type.compulsion && type.virtue && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.mechanicsTitle')}</Text>

          {/* Belief */}
          <View style={styles.beliefCard}>
            <Text style={styles.beliefLabel}>{t('profile.beliefLabel')}</Text>
            <Text style={styles.beliefText}>« {type.belief} »</Text>
          </View>

          {/* Identity */}
          {type.identity && (
            <View style={styles.identityRow}>
              <Text style={styles.identityLabel}>{t('profile.identityLabel')}</Text>
              <Text style={styles.identityText}>« {type.identity} »</Text>
            </View>
          )}

          {/* Compulsion → Virtue */}
          <View style={styles.dynamicBox}>
            <View style={[styles.poleCard, styles.poleCompulsion]}>
              <Text style={styles.poleLabel}>{t('profile.compulsionLabel')}</Text>
              <Text style={styles.poleName}>{type.compulsion.name}</Text>
              <Text style={styles.poleDesc}>{type.compulsion.desc}</Text>
            </View>

            <View style={styles.arrowRow}>
              <Text style={styles.arrowText}>{t('profile.pathToFreedom')}</Text>
            </View>

            <View style={[styles.poleCard, styles.poleVirtue, { borderColor: type.color }]}>
              <Text style={[styles.poleLabel, { color: type.color }]}>{t('profile.virtueLabel')}</Text>
              <Text style={styles.poleName}>{type.virtue.name}</Text>
              <Text style={styles.poleDesc}>{type.virtue.desc}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Liberated mission */}
      {type.missionLibre && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile.liberatedTitle')}</Text>
          <Text style={styles.sectionBody}>{type.missionLibre}</Text>
        </View>
      )}

      {/* Integration & Disintegration */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('profile.arrowsTitle')}</Text>
        <View style={styles.integrationBox}>
          <Text style={styles.integrationLabel}>
            {t('profile.integrationToward', { n: type.integration.toward })}
          </Text>
          <Text style={styles.integrationDesc}>{type.integration.desc}</Text>
        </View>
        <View style={styles.integrationBox}>
          <Text style={styles.integrationLabel}>
            {t('profile.disintegrationToward', { n: type.disintegration.toward })}
          </Text>
          <Text style={styles.integrationDesc}>{type.disintegration.desc}</Text>
        </View>
      </View>

      {/* Age bands */}
      {(['5-8', '8-12', '13-16'] as const).map((ageKey) => {
        const labelMap: Record<string, string> = {
          '5-8': t('profile.age58'),
          '8-12': t('profile.age812'),
          '13-16': t('profile.age1316'),
        };
        return (
          <View key={ageKey} style={styles.section}>
            <Text style={styles.sectionTitle}>{labelMap[ageKey]}</Text>
            <Text style={styles.sectionBody}>{displayAges[ageKey]}</Text>
          </View>
        );
      })}

      {/* Keys */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('profile.keysTitle')}</Text>
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
    color: colors.accent,
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
    color: colors.accent,
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
