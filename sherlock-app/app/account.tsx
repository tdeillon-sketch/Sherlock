// ═══════════════════════════════════════════════════════════════
//  ACCOUNT SCREEN — settings, sign-out, delete account
//
//  App Store guideline 5.1.1(v) requires apps that support account
//  creation to also offer in-app account deletion. This screen is
//  the entry point for that.
// ═══════════════════════════════════════════════════════════════

import React, { useState } from 'react';
import {
  View, Text, Pressable, StyleSheet, Alert, ScrollView, ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { colors, fonts, spacing, radius } from '../constants/theme';
import {
  auth, signOut, deleteAccount, isAppleSignedIn, isGoogleSignedIn,
} from '../constants/firebase';

export default function AccountScreen() {
  const [busy, setBusy] = useState<null | 'signout' | 'delete'>(null);

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
      Alert.alert('Erreur', e?.message ?? 'Impossible de se déconnecter');
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
          'Reconnexion requise',
          "Pour des raisons de sécurité, reconnectez-vous à votre compte puis relancez la suppression depuis cet écran.",
          [
            {
              text: 'Se reconnecter',
              onPress: async () => {
                try { await signOut(); } catch {}
                router.replace('/');
              },
            },
            { text: 'Annuler', style: 'cancel' },
          ],
        );
      } else {
        Alert.alert(
          'Suppression impossible',
          e?.message ?? "Une erreur s'est produite. Réessayez plus tard.",
        );
      }
    } finally {
      setBusy(null);
    }
  };

  const handleDelete = () => {
    if (busy) return;
    Alert.alert(
      'Supprimer définitivement votre compte ?',
      "Cette action est irréversible. Toutes vos données seront effacées :\n\n• Profils enfants et historiques\n• Résultats de quiz\n• Progression du Pokédex et XP Sherlock\n\nCela ne peut pas être annulé.",
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer définitivement',
          style: 'destructive',
          onPress: () => {
            // Second confirmation, per Apple's "prevent accidental deletion"
            Alert.alert(
              'Êtes-vous absolument sûr ?',
              'Dernière confirmation. Voulez-vous vraiment supprimer votre compte et toutes vos données ?',
              [
                { text: 'Annuler', style: 'cancel' },
                {
                  text: 'Oui, supprimer',
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
        <Text style={styles.topTitle}>Mon compte</Text>
        <View style={styles.backBtn} />
      </View>

      {/* ── Identity card ── */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Connecté avec</Text>
        <Text style={styles.cardValue}>{provider}</Text>
        {user?.email && (
          <>
            <Text style={[styles.cardLabel, { marginTop: spacing.md }]}>Email</Text>
            <Text style={styles.cardValue}>{user.email}</Text>
          </>
        )}
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
          <Text style={styles.actionBtnText}>Se déconnecter</Text>
        )}
      </Pressable>

      {/* ── Danger zone ── */}
      <View style={styles.dangerZone}>
        <Text style={styles.dangerLabel}>Zone sensible</Text>
        <Text style={styles.dangerDesc}>
          La suppression de votre compte efface définitivement vos profils enfants,
          vos résultats de quiz, votre historique et votre progression. Cette action
          est irréversible.
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
            <Text style={styles.deleteBtnText}>Supprimer mon compte</Text>
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
