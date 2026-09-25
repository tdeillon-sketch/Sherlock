import { useCallback, useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { colors, fonts, spacing, radius } from '../constants/theme';
import { useT } from '../i18n';
import { auth } from '../constants/firebase';
import { getDailyQuestion, formatRitualDate, isSameQuestion } from '../constants/ritualQuestions';
import {
  loadJournal, saveAnswer, syncJournal, todayKey, daysAgo, type RitualEntry,
} from '../constants/ritualJournal';

// ═══════════════════════════════════════════════════════════════
//  "Mon journal" — the question of the day, answered in a few lines.
//  Answers are kept per account on the phone and backed up online
//  (constants/ritualJournal.ts); the full list lives in /journal.
//  When today's question already came up before, the previous answer is
//  shown so the reader can see how they have moved. Shown in Testez-vous.
// ═══════════════════════════════════════════════════════════════

export default function JournalCard() {
  const { t, locale } = useT();
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');
  const [entries, setEntries] = useState<RitualEntry[]>([]);
  const now = new Date();
  const question = getDailyQuestion(now);
  const questionText = locale === 'en' ? question.en : question.fr;
  const dateLabel = formatRitualDate(now, locale);

  const today = todayKey();
  const todayEntry = entries.find((e) => e.date === today) ?? null;
  // Most recent earlier answer to this same question (any language or wording).
  const previous = entries.find((e) => e.date !== today && isSameQuestion(question, e.question)) ?? null;
  const previousDays = previous ? daysAgo(previous.date) : 0;

  // Phone copy first (instant), then a background sync with the account.
  // Refreshed on focus: an answer may have been deleted from the journal.
  const refresh = useCallback(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    let alive = true;
    loadJournal(uid)
      .then((list) => { if (alive) setEntries(list); })
      .then(() => syncJournal(uid))
      .then(() => loadJournal(uid))
      .then((list) => { if (alive) setEntries(list); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);
  useFocusEffect(refresh);

  const close = () => { setOpen(false); setNote(''); };

  const save = async () => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;
    if (note.trim()) {
      try {
        const saved = await saveAnswer(uid, { question: questionText, answer: note, locale });
        if (saved) setEntries((list) => [saved, ...list.filter((e) => e.date !== saved.date)]);
      } catch {
        return; // keep the text on screen so nothing is lost
      }
    }
    close();
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>{t('journal.cardEyebrow')} · {dateLabel}</Text>
        <View style={[styles.dot, todayEntry && styles.dotDone]} />
      </View>
      <Text style={styles.question}>« {questionText} »</Text>

      {previous && !todayEntry && !open && (
        <View style={styles.previous}>
          <Text style={styles.previousLabel}>
            {previousDays === 1
              ? t('journal.previousAnswerOne')
              : t('journal.previousAnswer', { n: previousDays })}
          </Text>
          <Text style={styles.previousText} numberOfLines={4}>{previous.answer}</Text>
        </View>
      )}

      {open ? (
        <View style={styles.noteWrap}>
          <Text style={styles.noteLabel}>{t('journal.cardNoteTitle')}</Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder={t('journal.cardNotePlaceholder')}
            placeholderTextColor={colors.textMuted}
            style={styles.noteInput}
            multiline
            numberOfLines={4}
            maxLength={5000}
            autoFocus
          />
          <View style={styles.ctaRow}>
            <Pressable
              onPress={save}
              accessibilityRole="button"
              style={({ pressed }) => [styles.ctaPrimary, pressed && { opacity: 0.85 }]}
            >
              <Text style={styles.ctaPrimaryText}>{t('journal.cardSave')}</Text>
            </Pressable>
            <Pressable
              onPress={close}
              accessibilityRole="button"
              style={({ pressed }) => [styles.ctaSecondary, pressed && { opacity: 0.85 }]}
            >
              <Text style={styles.ctaSecondaryText}>{t('journal.cardCancel')}</Text>
            </Pressable>
          </View>
        </View>
      ) : todayEntry ? (
        <View style={styles.doneRow}>
          <Text style={styles.doneText}>{t('journal.cardDone')}</Text>
          <Pressable
            onPress={() => { setNote(todayEntry.answer); setOpen(true); }}
            accessibilityRole="button"
            style={({ pressed }) => [styles.editBtn, pressed && { opacity: 0.6 }]}
          >
            <Text style={styles.editText}>{t('journal.cardEdit')}</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.ctaRow}>
          <Pressable
            onPress={() => setOpen(true)}
            accessibilityRole="button"
            style={({ pressed }) => [styles.ctaPrimary, pressed && { opacity: 0.85 }]}
          >
            <Text style={styles.ctaPrimaryText}>{t('journal.cardAnswer')}</Text>
          </Pressable>
        </View>
      )}

      <Pressable
        onPress={() => router.push('/journal' as never)}
        accessibilityRole="link"
        style={({ pressed }) => [styles.journalLink, pressed && { opacity: 0.6 }]}
      >
        <Text style={styles.journalLinkText}>{t('journal.viewJournal')}  →</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: spacing.sm,
  },
  eyebrow: {
    fontFamily: fonts.sans, fontSize: 10, letterSpacing: 1.8,
    color: colors.textMuted, fontWeight: '700', textTransform: 'uppercase',
  },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.accent },
  dotDone: { backgroundColor: colors.success },
  question: {
    fontFamily: fonts.serifItalic, fontSize: 15, lineHeight: 23,
    color: colors.text,
  },
  previous: {
    marginTop: spacing.md, paddingLeft: spacing.sm,
    borderLeftWidth: 2, borderLeftColor: colors.accent,
  },
  previousLabel: {
    fontFamily: fonts.sans, fontSize: 12, fontWeight: '600', color: colors.textMuted,
  },
  previousText: {
    fontFamily: fonts.sans, fontSize: 13.5, lineHeight: 20, color: colors.textSoft, marginTop: 4,
  },
  ctaRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md },
  ctaPrimary: {
    flex: 1,
    minHeight: 44, justifyContent: 'center',
    backgroundColor: colors.bg,
    borderRadius: radius.sm,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  ctaPrimaryText: { fontFamily: fonts.sans, fontSize: 13, color: colors.text, fontWeight: '600' },
  ctaSecondary: {
    minHeight: 44, justifyContent: 'center',
    paddingVertical: 10, paddingHorizontal: spacing.md,
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm,
    alignItems: 'center',
  },
  ctaSecondaryText: { fontFamily: fonts.sans, fontSize: 13, color: colors.textMuted },
  doneRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    gap: spacing.sm, marginTop: spacing.sm,
  },
  doneText: { flex: 1, fontFamily: fonts.sans, fontSize: 13, lineHeight: 19, color: colors.textSoft },
  editBtn: { minHeight: 44, justifyContent: 'center', paddingHorizontal: spacing.sm },
  editText: { fontFamily: fonts.sans, fontSize: 13, fontWeight: '600', color: colors.accentText },
  noteWrap: { marginTop: spacing.sm },
  noteLabel: {
    fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted,
    letterSpacing: 1, textTransform: 'uppercase', fontWeight: '700',
    marginBottom: spacing.xs,
  },
  noteInput: {
    fontFamily: fonts.sans, fontSize: 14, color: colors.text,
    backgroundColor: colors.bg,
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm,
    padding: spacing.sm, minHeight: 80, textAlignVertical: 'top',
  },
  journalLink: { marginTop: spacing.xs, minHeight: 44, justifyContent: 'center', alignItems: 'flex-end' },
  journalLinkText: { fontFamily: fonts.sans, fontSize: 13, color: colors.accentText, fontWeight: '600' },
});
