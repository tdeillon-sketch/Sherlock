// ═══════════════════════════════════════════════════════════════
//  Ritual journal — list of past answers to the daily question.
// ═══════════════════════════════════════════════════════════════

import { useEffect, useState, useCallback } from 'react';
import { ScrollView, View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../constants/theme';
import { loadJournal, deleteAnswer, formatEntryDate, type RitualEntry } from '../constants/ritualJournal';
import { useT } from '../i18n';

export default function JournalScreen() {
  const { t, locale } = useT();
  const [entries, setEntries] = useState<RitualEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await loadJournal();
      setEntries(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const handleDelete = (entry: RitualEntry) => {
    Alert.alert(
      t('journal.deleteConfirmTitle'),
      t('journal.deleteConfirmBody'),
      [
        { text: t('journal.cancel'), style: 'cancel' },
        {
          text: t('journal.delete'),
          style: 'destructive',
          onPress: async () => {
            await deleteAnswer(entry.ts);
            await refresh();
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backButton} hitSlop={10}>
          <Ionicons name="chevron-back" size={26} color={colors.text} />
        </Pressable>
        <Text style={styles.topBarTitle}>{t('journal.title')}</Text>
        <View style={{ width: 26 }} />
      </View>

      <View style={styles.header}>
        <Text style={styles.heroTitle}>{t('journal.heroTitle')}</Text>
        <Text style={styles.heroSub}>{t('journal.heroSub')}</Text>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>{t('common.loading')}</Text>
      ) : entries.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyEmoji}>📖</Text>
          <Text style={styles.emptyTitle}>{t('journal.emptyTitle')}</Text>
          <Text style={styles.emptyDesc}>{t('journal.emptyDesc')}</Text>
        </View>
      ) : (
        <View style={styles.list}>
          {entries.map((entry) => (
            <View key={entry.ts} style={styles.entryCard}>
              <View style={styles.entryHeader}>
                <Text style={styles.entryDate}>{formatEntryDate(entry.ts, locale)}</Text>
                <Pressable onPress={() => handleDelete(entry)} hitSlop={8}>
                  <Ionicons name="trash-outline" size={16} color={colors.textMuted} />
                </Pressable>
              </View>
              <Text style={styles.entryQuestion}>« {entry.question} »</Text>
              <View style={styles.entryDivider} />
              <Text style={styles.entryAnswer}>{entry.answer}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: spacing.xxl + spacing.xl },

  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 56, paddingHorizontal: spacing.md, paddingBottom: spacing.sm,
  },
  backButton: { padding: 4 },
  topBarTitle: {
    fontFamily: fonts.serif, fontSize: 16, color: colors.text,
  },

  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md, paddingBottom: spacing.lg,
  },
  heroTitle: {
    fontFamily: fonts.serif, fontSize: 26, lineHeight: 32,
    color: colors.text, marginBottom: spacing.xs,
  },
  heroSub: {
    fontFamily: fonts.sans, fontSize: 13, lineHeight: 19,
    color: colors.textMuted,
  },

  loadingText: {
    fontFamily: fonts.sans, fontSize: 14, color: colors.textMuted,
    textAlign: 'center', marginTop: 60,
  },

  emptyCard: {
    marginHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  emptyEmoji: { fontSize: 40, marginBottom: spacing.xs },
  emptyTitle: {
    fontFamily: fonts.serif, fontSize: 18,
    color: colors.text, textAlign: 'center',
  },
  emptyDesc: {
    fontFamily: fonts.sans, fontSize: 14, lineHeight: 21,
    color: colors.textMuted, textAlign: 'center',
  },

  list: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  entryCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.md,
  },
  entryHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: spacing.sm,
  },
  entryDate: {
    fontFamily: fonts.sans, fontSize: 11,
    color: colors.textMuted, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: '700',
  },
  entryQuestion: {
    fontFamily: fonts.serifItalic, fontSize: 14, lineHeight: 21,
    color: colors.textSoft,
  },
  entryDivider: {
    height: 1, backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  entryAnswer: {
    fontFamily: fonts.sans, fontSize: 14, lineHeight: 22,
    color: colors.text,
  },
});
