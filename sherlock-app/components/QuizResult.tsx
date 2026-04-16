import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, fonts, spacing, radius } from '../constants/theme';
import { TYPES, QuizMode } from '../constants/data';

interface QuizResultProps {
  topType: number;
  sortedScores: { type: number; score: number }[];
  totalPoints: number;
  childAge: string | null;
  wingType: number | null;
  mode?: QuizMode;
  onViewProfile: () => void;
  onReset: () => void;
}

export default function QuizResult({
  topType,
  sortedScores,
  totalPoints,
  childAge,
  wingType,
  mode = 'enfant',
  onViewProfile,
  onReset,
}: QuizResultProps) {
  const typeData = TYPES[topType - 1];
  const wingData = wingType ? TYPES[wingType - 1] : null;
  const ageNote = childAge && typeData.ages
    ? (typeData.ages as Record<string, string>)[childAge]
    : null;

  return (
    <View style={styles.container}>
      {/* Badge */}
      <View style={[styles.badge, { backgroundColor: typeData.color }]}>
        <Text style={styles.badgeText}>{topType}</Text>
      </View>

      {/* Heading */}
      <Text style={styles.heading}>
        Type {topType} — {typeData.name}
      </Text>

      {/* Context label */}
      <Text style={styles.modeLabel}>
        {mode === 'enfant' ? 'Le profil de votre enfant' :
         mode === 'ado' ? 'Ton profil' : 'Votre profil'}
      </Text>

      {/* Short description */}
      <Text style={styles.description}>{typeData.short}</Text>

      {/* Wing note */}
      {wingData && (
        <View style={styles.noteBox}>
          <Text style={styles.noteLabel}>Aile dominante</Text>
          <Text style={styles.noteText}>
            Type {wingType} — {wingData.name}
          </Text>
        </View>
      )}

      {/* Age-specific note */}
      {ageNote && (
        <View style={styles.ageBox}>
          <Text style={styles.noteLabel}>A cet age ({childAge} ans)</Text>
          <Text style={styles.ageText}>{ageNote}</Text>
        </View>
      )}

      {/* Score tags */}
      <View style={styles.scoreTags}>
        {sortedScores
          .filter((s) => s.score > 0)
          .map((s) => {
            const pct = totalPoints > 0
              ? Math.round((s.score / totalPoints) * 100)
              : 0;
            const isTop = s.type === topType;
            return (
              <View
                key={s.type}
                style={[
                  styles.scoreTag,
                  isTop && styles.scoreTagTop,
                ]}
              >
                <Text
                  style={[
                    styles.scoreTagText,
                    isTop && styles.scoreTagTextTop,
                  ]}
                >
                  T{s.type}: {pct}%
                </Text>
              </View>
            );
          })}
      </View>

      {/* Buttons */}
      <Pressable
        onPress={onViewProfile}
        style={({ pressed }) => [
          styles.btnPrimary,
          pressed && styles.btnPrimaryPressed,
        ]}
      >
        <Text style={styles.btnPrimaryText}>Voir le profil complet</Text>
      </Pressable>

      <Pressable
        onPress={onReset}
        style={({ pressed }) => [
          styles.btnOutline,
          pressed && styles.btnOutlinePressed,
        ]}
      >
        <Text style={styles.btnOutlineText}>Refaire le quiz</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  badge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  badgeText: {
    fontFamily: fonts.serif,
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
  },
  heading: {
    fontFamily: fonts.serif,
    fontSize: 24,
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    fontFamily: fonts.sans,
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  noteBox: {
    backgroundColor: colors.subtle05,
    borderRadius: radius.sm,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignSelf: 'stretch',
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  noteLabel: {
    fontFamily: fonts.sans,
    fontSize: 11,
    color: colors.accentLight,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  noteText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  ageBox: {
    backgroundColor: colors.cardBg,
    borderRadius: radius.sm,
    padding: spacing.md,
    marginBottom: spacing.lg,
    alignSelf: 'stretch',
    borderLeftWidth: 3,
    borderLeftColor: colors.textMuted,
  },
  ageText: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.textSoft,
    lineHeight: 19,
  },
  scoreTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.xs,
    marginBottom: spacing.xl,
  },
  scoreTag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
    backgroundColor: colors.subtle06,
  },
  scoreTagTop: {
    backgroundColor: colors.accentMedium,
  },
  scoreTagText: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.textMuted,
  },
  scoreTagTextTop: {
    color: colors.accentLight,
    fontWeight: '600',
  },
  btnPrimary: {
    backgroundColor: colors.accent,
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.full,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  btnPrimaryPressed: {
    opacity: 0.85,
  },
  btnPrimaryText: {
    fontFamily: fonts.sans,
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  btnOutline: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 14,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.full,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  btnOutlinePressed: {
    backgroundColor: colors.cardBg,
  },
  btnOutlineText: {
    fontFamily: fonts.sans,
    fontSize: 16,
    color: colors.textMuted,
  },
  modeLabel: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.accentLight,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.md,
  },
});
