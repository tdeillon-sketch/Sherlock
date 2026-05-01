import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, fonts, spacing, radius } from '../constants/theme';
import { TYPES, QuizMode } from '../constants/data';
import { TYPES as TYPES_V3 } from '../constants/quiz_v3';
import type { EnneaType } from '../constants/quiz_v3';
import { QuizResult as QuizResultType } from '../hooks/useQuiz';
import { useT, getTypeText } from '../i18n';

interface QuizResultProps {
  result: QuizResultType;
  mode: QuizMode;
  onViewProfile: () => void;
  onSaveProfile: () => void;
  onNewChild: () => void;
  onReset: () => void;
}

const TYPE_COLORS: Record<number, string> = {
  1: '#6b8f71', 2: '#c0713a', 3: '#d4a437', 4: '#7b68b5',
  5: '#4a90d9', 6: '#5b9e8f', 7: '#e07b54', 8: '#c0443a', 9: '#8fa68f',
};

/** Locale-aware type name, falling back to data.ts FR name */
function localizedTypeName(typeNum: number, locale: 'fr' | 'en'): string {
  const v3 = TYPES_V3[typeNum as EnneaType];
  if (v3) return getTypeText(v3, 'name', locale);
  return TYPES[typeNum - 1]?.name ?? '';
}

export default function QuizResult({
  result, mode, onViewProfile, onSaveProfile, onNewChild, onReset,
}: QuizResultProps) {
  const { t, locale } = useT();
  const top = TYPES[result.topType - 1];
  const wing = result.wingType ? TYPES[result.wingType - 1] : null;

  const topName = localizedTypeName(result.topType, locale);
  const secondName = localizedTypeName(result.secondType, locale);
  const thirdName = localizedTypeName(result.thirdType, locale);
  const wingName = result.wingType ? localizedTypeName(result.wingType, locale) : '';

  const subjectLabel =
    mode === 'enfant' ? t('result.subjectChild') :
    mode === 'ado'    ? t('result.subjectAdo')   :
                        t('result.subjectAdult');

  return (
    <View style={styles.container}>
      {/* ── Hero with top type ── */}
      <View style={styles.hero}>
        <View style={[styles.heroBadge, { backgroundColor: top.color }]}>
          <Text style={styles.heroBadgeNum}>{result.topType}</Text>
        </View>
        <Text style={styles.heroSubject}>{subjectLabel}</Text>
        <Text style={styles.heroType}>
          {t('result.typeProb', { n: result.topType })}
        </Text>
        <Text style={styles.heroTypeName}>{topName}</Text>
        <View style={styles.heroPercentBox}>
          <Text style={styles.heroPercent}>{result.topPercent}%</Text>
          <Text style={styles.heroPercentLabel}>{t('result.confidence')}</Text>
        </View>
      </View>

      {/* ── "Our reading" ── */}
      <View style={styles.insightCard}>
        <Text style={styles.insightLabel}>{t('result.insightLabel')}</Text>
        <Text style={styles.insightText}>{result.insight}</Text>
      </View>

      {/* ── Top 3 types with bars ── */}
      <View style={styles.topThreeCard}>
        <Text style={styles.sectionTitle}>{t('result.topThree')}</Text>

        <TypeRow
          rank={1}
          type={result.topType}
          name={topName}
          percent={result.topPercent}
          color={TYPE_COLORS[result.topType]}
          wingTag={t('result.wingTagShort')}
        />
        <TypeRow
          rank={2}
          type={result.secondType}
          name={secondName}
          percent={result.secondPercent}
          color={TYPE_COLORS[result.secondType]}
          isWing={result.wingType === result.secondType}
          wingTag={t('result.wingTagShort')}
        />
        <TypeRow
          rank={3}
          type={result.thirdType}
          name={thirdName}
          percent={result.thirdPercent}
          color={TYPE_COLORS[result.thirdType]}
          wingTag={t('result.wingTagShort')}
        />
      </View>

      {/* ── Wing card if detected ── */}
      {wing && (
        <View style={styles.wingCard}>
          <Text style={styles.wingLabel}>🪶 {t('result.wingDetected')}</Text>
          <Text style={styles.wingTitle}>
            {result.topType}w{result.wingType}
          </Text>
          <Text style={styles.wingDesc}>
            {t('result.wingDescription', { top: topName.toLowerCase(), wing: wingName.toLowerCase() })}
          </Text>
        </View>
      )}

      {/* ── Actions ── */}
      <View style={styles.actions}>
        <Pressable
          onPress={onViewProfile}
          style={({ pressed }) => [styles.btnPrimary, pressed && { opacity: 0.85 }]}
        >
          <Text style={styles.btnPrimaryText}>{t('result.actionsViewProfile')}</Text>
        </Pressable>

        {mode === 'enfant' && (
          <>
            <Pressable
              onPress={onSaveProfile}
              style={({ pressed }) => [styles.btnSecondary, pressed && styles.btnSecondaryPressed]}
            >
              <Text style={styles.btnSecondaryText}>{t('result.actionsSave')}</Text>
            </Pressable>
            <Pressable
              onPress={onNewChild}
              style={({ pressed }) => [styles.btnSecondary, pressed && styles.btnSecondaryPressed]}
            >
              <Text style={styles.btnSecondaryText}>{t('result.actionsNew')}</Text>
            </Pressable>
          </>
        )}

        <Pressable onPress={onReset} style={styles.btnGhost}>
          <Text style={styles.btnGhostText}>{t('result.actionsReset')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ── TypeRow ──
function TypeRow({
  rank, type, name, percent, color, isWing, wingTag,
}: {
  rank: number; type: number; name: string; percent: number; color: string; isWing?: boolean; wingTag: string;
}) {
  return (
    <View style={styles.typeRow}>
      <Text style={styles.typeRowRank}>#{rank}</Text>
      <View style={[styles.typeRowBadge, { backgroundColor: color }]}>
        <Text style={styles.typeRowBadgeNum}>{type}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.typeRowTopLine}>
          <Text style={styles.typeRowName}>{name}</Text>
          {isWing && <Text style={styles.wingTag}>🪶 {wingTag}</Text>}
        </View>
        <View style={styles.typeRowBarTrack}>
          <View
            style={[
              styles.typeRowBarFill,
              { width: `${percent}%`, backgroundColor: color },
            ]}
          />
        </View>
      </View>
      <Text style={styles.typeRowPercent}>{percent}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: spacing.md, gap: spacing.md, paddingBottom: spacing.lg },

  // Hero
  hero: {
    alignItems: 'center', padding: spacing.lg,
    backgroundColor: colors.surface, borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border,
  },
  heroBadge: {
    width: 64, height: 64, borderRadius: 32,
    alignItems: 'center', justifyContent: 'center', marginBottom: spacing.sm,
  },
  heroBadgeNum: {
    fontFamily: fonts.serif, fontSize: 30, fontWeight: '700' as any, color: colors.white,
  },
  heroSubject: {
    fontFamily: fonts.sans, fontSize: 11, fontWeight: '700',
    color: colors.accent, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4,
  },
  heroType: { fontFamily: fonts.serif, fontSize: 22, color: colors.text },
  heroTypeName: {
    fontFamily: fonts.serifItalic, fontSize: 16, color: colors.textSoft, marginBottom: spacing.sm,
  },
  heroPercentBox: { alignItems: 'center', marginTop: spacing.xs },
  heroPercent: { fontFamily: fonts.serif, fontSize: 32, fontWeight: '700' as any, color: colors.accent },
  heroPercentLabel: { fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted },

  // Insight
  insightCard: {
    backgroundColor: '#d4a03c1a',
    borderWidth: 1, borderColor: '#d4a03c66',
    borderRadius: radius.md, padding: spacing.md,
  },
  insightLabel: {
    fontFamily: fonts.sans, fontSize: 12, fontWeight: '700',
    color: '#d4a03c', marginBottom: spacing.xs, letterSpacing: 0.5,
  },
  insightText: {
    fontFamily: fonts.sans, fontSize: 14, lineHeight: 22,
    color: colors.textSoft,
  },

  // Top 3
  topThreeCard: {
    backgroundColor: colors.surface, borderRadius: radius.md,
    padding: spacing.md, borderWidth: 1, borderColor: colors.border, gap: spacing.md,
  },
  sectionTitle: {
    fontFamily: fonts.serif, fontSize: 16, color: colors.text, marginBottom: spacing.xs,
  },
  typeRow: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
  },
  typeRowRank: {
    fontFamily: fonts.sans, fontSize: 11, fontWeight: '700',
    color: colors.textMuted, width: 24,
  },
  typeRowBadge: {
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  typeRowBadgeNum: {
    fontFamily: fonts.sans, fontSize: 14, fontWeight: '700', color: colors.white,
  },
  typeRowTopLine: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 3 },
  typeRowName: { fontFamily: fonts.sans, fontSize: 13, color: colors.text },
  wingTag: {
    fontFamily: fonts.sans, fontSize: 10, fontWeight: '600',
    color: colors.accent,
    backgroundColor: colors.accentFill,
    paddingHorizontal: 6, paddingVertical: 1, borderRadius: 8,
  },
  typeRowBarTrack: {
    height: 4, backgroundColor: colors.border, borderRadius: 2, overflow: 'hidden',
  },
  typeRowBarFill: { height: 4, borderRadius: 2 },
  typeRowPercent: {
    fontFamily: fonts.sans, fontSize: 13, fontWeight: '700',
    color: colors.text, width: 40, textAlign: 'right',
  },

  // Wing card
  wingCard: {
    backgroundColor: colors.accentFill,
    borderRadius: radius.md, padding: spacing.md,
    borderWidth: 1, borderColor: colors.accent,
  },
  wingLabel: {
    fontFamily: fonts.sans, fontSize: 12, fontWeight: '700',
    color: colors.accent, letterSpacing: 0.5, marginBottom: spacing.xs,
  },
  wingTitle: {
    fontFamily: fonts.serif, fontSize: 24, color: colors.text, marginBottom: spacing.xs,
  },
  wingDesc: {
    fontFamily: fonts.sans, fontSize: 13, lineHeight: 20, color: colors.textSoft,
  },

  // Actions
  actions: { gap: spacing.sm, marginTop: spacing.sm },
  btnPrimary: {
    backgroundColor: colors.accent, paddingVertical: 14, borderRadius: radius.md,
    alignItems: 'center',
  },
  btnPrimaryText: { fontFamily: fonts.sans, fontSize: 15, fontWeight: '700', color: colors.white },
  btnSecondary: {
    paddingVertical: 12, borderRadius: radius.md,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    alignItems: 'center',
  },
  btnSecondaryPressed: { opacity: 0.7, borderColor: colors.accent },
  btnSecondaryText: { fontFamily: fonts.sans, fontSize: 13, color: colors.textSoft, fontWeight: '600' },
  btnGhost: { padding: spacing.sm, alignItems: 'center' },
  btnGhostText: {
    fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted,
    textDecorationLine: 'underline',
  },
});
