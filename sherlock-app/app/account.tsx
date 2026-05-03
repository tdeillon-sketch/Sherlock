// ═══════════════════════════════════════════════════════════════
//  ACCOUNT SCREEN — settings, sign-out, delete account
//
//  App Store guideline 5.1.1(v) requires apps that support account
//  creation to also offer in-app account deletion. This screen is
//  the entry point for that.
// ═══════════════════════════════════════════════════════════════

import React, { useEffect, useState } from 'react';
import {
  View, Text, Pressable, StyleSheet, Alert, ScrollView, ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { colors, fonts, spacing, radius } from '../constants/theme';
import {
  auth, signOut, deleteAccount, isAppleSignedIn, isGoogleSignedIn, trackScreen,
} from '../constants/firebase';
import { useT } from '../i18n';

export default function AccountScreen() {
  const [busy, setBusy] = useState<null | 'signout' | 'delete'>(null);
  const { t, locale, setLocale } = useT();
  useEffect(() => { trackScreen('account').catch(() => {}); }, []);

  const user = auth.currentUser;
  const provider = isAppleSignedIn(user) ? 'Apple'
                 : isGoogleSignedIn(user) ? 'Google'
                 : '—';

  const handleSignOut = async () => {
    if (busy) return;
    setBusy('signout');
    try {
      await signOut();
      // Reset the navigation stack — root layout will detect signed-out
      // state and render the AuthScreen.
      router.replace('/');
    } catch (e: any) {
      Alert.alert(t('account.signOutErrorTitle'), e?.message ?? t('account.signOutErrorBody'));
    } finally {
      setBusy(null);
    }
  };

  const performDelete = async () => {
    setBusy('delete');
    try {
      await deleteAccount();
      // Auth listener in _layout will pick up the signed-out state
      // and render the AuthScreen.
      router.replace('/');
    } catch (e: any) {
      const code = e?.code as string | undefined;
      if (code === 'auth/requires-recent-login') {
        Alert.alert(
          t('account.reauthTitle'),
          t('account.reauthBody'),
          [
            {
              text: t('account.reauthAction'),
              onPress: async () => {
                try { await signOut(); } catch {}
                router.replace('/');
              },
            },
            { text: t('account.cancel'), style: 'cancel' },
          ],
        );
      } else {
        Alert.alert(
          t('account.deleteFailedTitle'),
          e?.message ?? t('account.deleteFailedBody'),
        );
      }
    } finally {
      setBusy(null);
    }
  };

  const handleDelete = () => {
    if (busy) return;
    Alert.alert(
      t('account.deleteConfirmTitle'),
      t('account.deleteConfirmBody'),
      [
        { text: t('account.cancel'), style: 'cancel' },
        {
          text: t('account.deleteConfirmAction'),
          style: 'destructive',
          onPress: () => {
            // Second confirmation, per Apple's "prevent accidental deletion"
            Alert.alert(
              t('account.deleteConfirm2Title'),
              t('account.deleteConfirm2Body'),
              [
                { text: t('account.cancel'), style: 'cancel' },
                {
                  text: t('account.deleteConfirm2Action'),
                  style: 'destructive',
                  onPress: performDelete,
                },
              ],
            );
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>‹</Text>
        </Pressable>
        <Text style={styles.topTitle}>{t('account.title')}</Text>
        <View style={styles.backBtn} />
      </View>

      {/* ── Identity card ── */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>{t('account.connectedWith')}</Text>
        <Text style={styles.cardValue}>{provider}</Text>
        {user?.email && (
          <>
            <Text style={[styles.cardLabel, { marginTop: spacing.md }]}>{t('account.emailLabel')}</Text>
            <Text style={styles.cardValue}>{user.email}</Text>
          </>
        )}
      </View>

      {/* ── Language selector ── */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>{t('account.languageSection')}</Text>
        <View style={styles.langRow}>
          <Pressable
            onPress={() => setLocale('fr')}
            style={({ pressed }) => [
              styles.langBtn,
              locale === 'fr' && styles.langBtnActive,
              pressed && { opacity: 0.85 },
            ]}
          >
            <Text style={[styles.langBtnText, locale === 'fr' && styles.langBtnTextActive]}>
              🇫🇷  {t('account.languageFr')}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setLocale('en')}
            style={({ pressed }) => [
              styles.langBtn,
              locale === 'en' && styles.langBtnActive,
              pressed && { opacity: 0.85 },
            ]}
          >
            <Text style={[styles.langBtnText, locale === 'en' && styles.langBtnTextActive]}>
              🇬🇧  {t('account.languageEn')}
            </Text>
          </Pressable>
        </View>
      </View>

      {/* ── Sign out ── */}
      <Pressable
        onPress={handleSignOut}
        disabled={busy !== null}
        style={({ pressed }) => [
          styles.actionBtn,
          (pressed || busy === 'signout') && { opacity: 0.85 },
        ]}
      >
        {busy === 'signout' ? (
          <ActivityIndicator color={colors.text} />
        ) : (
          <Text style={styles.actionBtnText}>{t('account.signOut')}</Text>
        )}
      </Pressable>

      {/* ── Danger zone ── */}
      <View style={styles.dangerZone}>
        <Text style={styles.dangerLabel}>{t('account.dangerLabel')}</Text>
        <Text style={styles.dangerDesc}>
          {t('account.dangerDesc')}
        </Text>
        <Pressable
          onPress={handleDelete}
          disabled={busy !== null}
          style={({ pressed }) => [
            styles.deleteBtn,
            (pressed || busy === 'delete') && { opacity: 0.85 },
          ]}
        >
          {busy === 'delete' ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.deleteBtnText}>{t('account.deleteBtn')}</Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  content: { paddingBottom: spacing.xxl },

  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: spacing.xxl + spacing.sm,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  backBtn: {
    width: 44, height: 44,
    alignItems: 'center', justifyContent: 'center',
  },
  backBtnText: { fontFamily: fonts.sans, fontSize: 28, color: colors.text, lineHeight: 32 },
  topTitle: { fontFamily: fonts.serif, fontSize: 18, color: colors.text },

  langRow: {
    flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md,
  },
  langBtn: {
    flex: 1,
    paddingVertical: spacing.md, paddingHorizontal: spacing.md,
    backgroundColor: colors.bgLight,
    borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
    alignItems: 'center',
  },
  langBtnActive: {
    backgroundColor: colors.accentFill,
    borderColor: colors.accent,
  },
  langBtnText: { fontFamily: fonts.sans, fontSize: 14, color: colors.textSoft },
  langBtnTextActive: { color: colors.accent, fontWeight: '700' },

  card: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
  },
  cardLabel: {
    fontFamily: fonts.sans, fontSize: 11, fontWeight: '700',
    letterSpacing: 0.8, textTransform: 'uppercase',
    color: colors.textMuted, marginBottom: 4,
  },
  cardValue: {
    fontFamily: fonts.serif, fontSize: 17, color: colors.text,
  },

  actionBtn: {
    marginHorizontal: spacing.md, marginTop: spacing.lg,
    padding: spacing.md, alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
  },
  actionBtnText: {
    fontFamily: fonts.sans, fontSize: 15, fontWeight: '600', color: colors.text,
  },

  dangerZone: {
    marginHorizontal: spacing.md,
    marginTop: spacing.xxl,
    padding: spacing.lg,
    backgroundColor: 'rgba(233,69,96,0.06)',
    borderRadius: radius.md,
    borderWidth: 1, borderColor: 'rgba(233,69,96,0.25)',
  },
  dangerLabel: {
    fontFamily: fonts.sans, fontSize: 11, fontWeight: '700',
    letterSpacing: 0.8, textTransform: 'uppercase',
    color: colors.error, marginBottom: spacing.sm,
  },
  dangerDesc: {
    fontFamily: fonts.sans, fontSize: 13, lineHeight: 19,
    color: colors.textSoft, marginBottom: spacing.md,
  },
  deleteBtn: {
    backgroundColor: colors.error,
    paddingVertical: 14,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  deleteBtnText: {
    fontFamily: fonts.sans, fontSize: 15, fontWeight: '700', color: colors.white,
  },
});
