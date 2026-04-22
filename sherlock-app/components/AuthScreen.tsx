// ═══════════════════════════════════════════════════════════════
//  AUTH SCREEN — Sign in with Google AND Sign in with Apple
//
//  Apple Store guideline 4.8 requires that any third-party sign-in
//  option (Google, Facebook, etc.) be matched by an "equivalent"
//  login service. Sign in with Apple satisfies this requirement.
// ═══════════════════════════════════════════════════════════════

import React, { useEffect, useState } from 'react';
import {
  View, Text, Pressable, StyleSheet, ActivityIndicator, ScrollView, Platform,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';
import Constants from 'expo-constants';
import { colors, fonts, spacing, radius } from '../constants/theme';
import {
  signInAnon, signInWithGoogleIdToken, signInWithAppleIdToken,
  getUserData, createUserData, updateLastSeen,
} from '../constants/firebase';
import { GOOGLE_OAUTH, isGoogleConfigured } from '../constants/google_oauth';

WebBrowser.maybeCompleteAuthSession();

interface Props {
  onSuccess: () => void;
}

// Generate a cryptographically random nonce string for Apple Sign In.
// We pass the SHA-256 hash to Apple, but Firebase needs the raw value
// to verify the returned identity token.
async function generateAppleNonce(): Promise<{ raw: string; hashed: string }> {
  const randomBytes = await Crypto.getRandomBytesAsync(32);
  const raw = Array.from(randomBytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  const hashed = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    raw,
  );
  return { raw, hashed };
}

export default function AuthScreen({ onSuccess }: Props) {
  const [loading, setLoading] = useState<null | 'google' | 'apple'>(null);
  const [error, setError] = useState<string | null>(null);
  const [appleAvailable, setAppleAvailable] = useState(false);

  // Detect Expo Go vs standalone build
  const isExpoGo =
    Constants.executionEnvironment === 'storeClient' ||
    Constants.appOwnership === 'expo';

  // Check that Apple Sign In is available on this device.
  // Only iOS 13+ supports it.
  useEffect(() => {
    if (Platform.OS === 'ios') {
      AppleAuthentication.isAvailableAsync()
        .then(setAppleAvailable)
        .catch(() => setAppleAvailable(false));
    }
  }, []);

  // ── Google OAuth setup ──
  const redirectUri = isExpoGo
    ? 'https://auth.expo.io/@anonymous/sherlock-app'
    : undefined;

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:        GOOGLE_OAUTH.expoClientId,
    iosClientId:     GOOGLE_OAUTH.iosClientId,
    androidClientId: GOOGLE_OAUTH.androidClientId,
    webClientId:     GOOGLE_OAUTH.webClientId,
    redirectUri,
    scopes: ['openid', 'profile', 'email'],
  });

  // Common post-sign-in: create user doc if needed, update lastSeen, callback.
  const finishSignIn = async (uid: string) => {
    const existing = await getUserData(uid).catch(() => null);
    if (!existing) {
      await createUserData(uid);
    } else {
      await updateLastSeen(uid).catch(() => {});
    }
    onSuccess();
  };

  // ── Google response handler ──
  useEffect(() => {
    const handleResponse = async () => {
      if (response?.type === 'success') {
        setLoading('google');
        setError(null);
        try {
          const idToken = response.authentication?.idToken
            ?? (response.params as any)?.id_token;
          if (!idToken) throw new Error("Pas d'id_token reçu de Google");
          const user = await signInWithGoogleIdToken(idToken);
          await finishSignIn(user.uid);
        } catch (e: any) {
          setError(e?.message ?? 'Connexion Google échouée');
        } finally {
          setLoading(null);
        }
      } else if (response?.type === 'error') {
        setError("La connexion Google a échoué. Réessayez.");
      }
    };
    handleResponse();
  }, [response]);

  const onPressGoogle = async () => {
    setError(null);
    if (!isGoogleConfigured()) {
      setError(
        "Les identifiants Google OAuth ne sont pas encore configurés. " +
        "Voir constants/google_oauth.ts pour les instructions."
      );
      return;
    }
    if (!request) {
      setError("Initialisation Google en cours, réessayez dans 1 seconde.");
      return;
    }
    try {
      await promptAsync();
    } catch (e: any) {
      setError(e?.message ?? 'Connexion Google impossible');
    }
  };

  // ── Apple sign-in handler ──
  const onPressApple = async () => {
    setError(null);
    setLoading('apple');
    try {
      const { raw, hashed } = await generateAppleNonce();
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: hashed,
      });
      if (!credential.identityToken) {
        throw new Error("Pas d'identityToken reçu d'Apple");
      }
      const user = await signInWithAppleIdToken(credential.identityToken, raw);
      await finishSignIn(user.uid);
    } catch (e: any) {
      // The user can cancel, in which case `e.code` is ERR_REQUEST_CANCELED
      if (e?.code === 'ERR_REQUEST_CANCELED' || e?.code === 'ERR_CANCELED') {
        // Silent cancel — no error display
      } else {
        setError(e?.message ?? 'Connexion Apple échouée');
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.inner}>
        <Text style={styles.emoji}>🔐</Text>
        <Text style={styles.title}>Connectez-vous</Text>
        <Text style={styles.subtitle}>
          Pour sauvegarder vos progrès, vos profils d'enfants et accéder à l'app sur tous vos appareils.
        </Text>

        <View style={styles.benefitsBox}>
          <View style={styles.benefitRow}>
            <Text style={styles.benefitIcon}>☁️</Text>
            <Text style={styles.benefitText}>Vos profils enfants sauvés et synchronisés</Text>
          </View>
          <View style={styles.benefitRow}>
            <Text style={styles.benefitIcon}>📱</Text>
            <Text style={styles.benefitText}>Retrouvez vos données sur n'importe quel appareil</Text>
          </View>
          <View style={styles.benefitRow}>
            <Text style={styles.benefitIcon}>🏆</Text>
            <Text style={styles.benefitText}>XP Sherlock et Pokédex préservés à vie</Text>
          </View>
        </View>

        {/* ── Sign in with Apple (iOS 13+) ── */}
        {appleAvailable && (
          <Pressable
            onPress={onPressApple}
            disabled={loading !== null}
            style={({ pressed }) => [
              styles.appleBtn,
              (pressed || loading === 'apple') && { opacity: 0.85 },
            ]}
          >
            {loading === 'apple' ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <>
                <Text style={styles.appleLogo}></Text>
                <Text style={styles.appleBtnText}>Continuer avec Apple</Text>
              </>
            )}
          </Pressable>
        )}

        {/* ── Sign in with Google ── */}
        <Pressable
          onPress={onPressGoogle}
          disabled={loading !== null || !request}
          style={({ pressed }) => [
            styles.googleBtn,
            appleAvailable && { marginTop: spacing.md },
            (pressed || loading === 'google') && { opacity: 0.85 },
          ]}
        >
          {loading === 'google' ? (
            <ActivityIndicator color={colors.text} />
          ) : (
            <>
              <Text style={styles.googleG}>G</Text>
              <Text style={styles.googleBtnText}>Continuer avec Google</Text>
            </>
          )}
        </Pressable>

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <Text style={styles.hint}>
          Vos données restent privées. Aucun partage, aucune publicité.
        </Text>

        {/* ── DEV BYPASS ── (visible only in Expo Go / __DEV__) */}
        {(__DEV__ || isExpoGo) && (
          <Pressable
            onPress={async () => {
              setLoading('google');
              setError(null);
              try {
                const user = await signInAnon();
                await finishSignIn(user.uid);
              } catch (e: any) {
                setError(e?.message ?? 'Bypass échoué');
              } finally {
                setLoading(null);
              }
            }}
            style={styles.devBypass}
          >
            <Text style={styles.devBypassText}>
              🔓 Dev bypass (anonymous) — Expo Go only
            </Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: colors.bg,
    justifyContent: 'center',
  },
  inner: {
    paddingHorizontal: 36,
    paddingVertical: spacing.xxl,
    alignItems: 'center',
  },
  emoji: { fontSize: 48, marginBottom: 24 },
  title: {
    fontFamily: fonts.serif, fontSize: 26, color: colors.text,
    textAlign: 'center', marginBottom: 12,
  },
  subtitle: {
    fontFamily: fonts.sans, fontSize: 14, color: colors.textSoft,
    textAlign: 'center', lineHeight: 22, marginBottom: spacing.xl,
  },
  benefitsBox: {
    width: '100%', maxWidth: 360,
    backgroundColor: colors.surface, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border,
    padding: spacing.md, gap: spacing.md, marginBottom: spacing.xl,
  },
  benefitRow: {
    flexDirection: 'row', alignItems: 'flex-start', gap: spacing.md,
  },
  benefitIcon: { fontSize: 20, width: 24 },
  benefitText: {
    flex: 1, fontFamily: fonts.sans, fontSize: 13, lineHeight: 19,
    color: colors.textSoft,
  },
  // Apple button — black per Apple HIG when on light background
  appleBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: spacing.sm,
    width: '100%', maxWidth: 360, paddingVertical: 14, paddingHorizontal: spacing.lg,
    backgroundColor: '#000', borderRadius: radius.full,
  },
  appleLogo: {
    fontSize: 18, color: colors.white,
    // Apple logo glyph "" (Private Use Area), falls back gracefully
    // on systems that don't have it; iOS native font does.
  },
  appleBtnText: {
    fontFamily: fonts.sans, fontSize: 15, fontWeight: '600', color: colors.white,
  },
  googleBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: spacing.sm,
    width: '100%', maxWidth: 360, paddingVertical: 14, paddingHorizontal: spacing.lg,
    backgroundColor: colors.white, borderRadius: radius.full,
  },
  googleG: {
    fontFamily: fonts.serif, fontSize: 22, fontWeight: '700' as any,
    color: '#4285F4',
  },
  googleBtnText: {
    fontFamily: fonts.sans, fontSize: 15, fontWeight: '600',
    color: '#3c4043',
  },
  errorBox: {
    marginTop: spacing.md, padding: spacing.md,
    backgroundColor: 'rgba(233,69,96,0.1)', borderWidth: 1, borderColor: colors.error,
    borderRadius: radius.sm, maxWidth: 360,
  },
  errorText: {
    fontFamily: fonts.sans, fontSize: 12, color: colors.error,
    textAlign: 'center', lineHeight: 18,
  },
  hint: {
    fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted,
    marginTop: spacing.xl, textAlign: 'center',
  },
  devBypass: {
    marginTop: spacing.xl,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.textMuted,
    borderStyle: 'dashed',
    opacity: 0.6,
  },
  devBypassText: {
    fontFamily: fonts.sans, fontSize: 11, color: colors.textMuted,
    textAlign: 'center',
  },
});
