// ═══════════════════════════════════════════════════════════════
//  AUTH SCREEN — Sign in with Google AND Sign in with Apple
//
//  Two uses:
//   - mode "modal" (normal case): the app is used without an account
//     (anonymous session); this screen appears when something is to be
//     saved, and links the session to Apple / Google (nothing is lost).
//   - mode "gate" (fallback): only if the anonymous session can't start
//     (e.g. first launch offline), as the first screen.
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
  auth, signInAnon, signInWithGoogleIdToken, signInWithAppleIdToken, ensureUserDoc,
  reauthWithGoogleIdToken, reauthWithAppleIdToken, isAppleSignedIn, isGoogleSignedIn,
} from '../constants/firebase';
import { GOOGLE_OAUTH, isGoogleConfigured } from '../constants/google_oauth';
import { useT } from '../i18n';

WebBrowser.maybeCompleteAuthSession();

interface Props {
  onSuccess: () => void;
  mode?: 'gate' | 'modal' | 'reauth';
  onClose?: () => void;
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

export default function AuthScreen({ onSuccess, mode = 'gate', onClose }: Props) {
  const isModal = mode === 'modal' || mode === 'reauth';
  const isReauth = mode === 'reauth';
  // Re-authentication: only the provider of the current account.
  const showApple = !isReauth || isAppleSignedIn(auth.currentUser);
  const showGoogle = !isReauth || isGoogleSignedIn(auth.currentUser);
  const { t, locale, setLocale } = useT();
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

  // Common post-sign-in (the sign-in helpers already made sure the user
  // document exists; this is a no-op safety net that never overwrites).
  const finishSignIn = async (uid: string) => {
    if (!isReauth) await ensureUserDoc(uid).catch(() => {});
    onSuccess();
  };
  const reauthError = (e: any, fallback: string) =>
    e?.code === 'auth/user-mismatch' || e?.code === 'auth/user-not-found'
      ? t('auth.errorReauthMismatch') : fallback;

  // ── Google response handler ──
  useEffect(() => {
    const handleResponse = async () => {
      if (response?.type === 'success') {
        setLoading('google');
        setError(null);
        try {
          const idToken = response.authentication?.idToken
            ?? (response.params as any)?.id_token;
          if (!idToken) throw new Error(t('auth.errorNoGoogleIdToken'));
          if (isReauth) {
            await reauthWithGoogleIdToken(idToken);
            onSuccess();
            return;
          }
          const user = await signInWithGoogleIdToken(idToken);
          await finishSignIn(user.uid);
        } catch (e: any) {
          setError(isReauth ? reauthError(e, t('auth.errorGoogleFailed')) : (e?.message ?? t('auth.errorGoogleFailed')));
        } finally {
          setLoading(null);
        }
      } else if (response?.type === 'error') {
        setError(t('auth.errorGoogleRetry'));
      }
    };
    handleResponse();
  }, [response]);

  const onPressGoogle = async () => {
    setError(null);
    if (!isGoogleConfigured()) {
      setError(t('auth.errorGoogleNotConfigured'));
      return;
    }
    if (!request) {
      setError(t('auth.errorGoogleInit'));
      return;
    }
    try {
      await promptAsync();
    } catch (e: any) {
      setError(e?.message ?? t('auth.errorGoogleImpossible'));
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
        throw new Error(t('auth.errorAppleNoToken'));
      }
      if (isReauth) {
        await reauthWithAppleIdToken(credential.identityToken, raw);
        onSuccess();
        return;
      }
      const user = await signInWithAppleIdToken(credential.identityToken, raw);
      await finishSignIn(user.uid);
    } catch (e: any) {
      // The user can cancel, in which case `e.code` is ERR_REQUEST_CANCELED
      if (e?.code === 'ERR_REQUEST_CANCELED' || e?.code === 'ERR_CANCELED') {
        // Silent cancel — no error display
      } else {
        setError(isReauth ? reauthError(e, t('auth.errorAppleFailed')) : (e?.message ?? t('auth.errorAppleFailed')));
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      {isModal && onClose && (
        <Pressable
          onPress={onClose}
          accessibilityRole="button"
          accessibilityLabel={t('auth.close')}
          style={({ pressed }) => [styles.closeBtn, pressed && { opacity: 0.6 }]}
        >
          <Text style={styles.closeBtnText}>✕</Text>
        </Pressable>
      )}
      <View style={styles.inner}>
        {/* ── Language toggle (top of screen) ── */}
        <View style={styles.langToggle}>
          <Pressable
            onPress={() => setLocale('fr')}
            style={({ pressed }) => [
              styles.langBtn,
              locale === 'fr' && styles.langBtnActive,
              pressed && { opacity: 0.85 },
            ]}
          >
            <Text style={[styles.langBtnText, locale === 'fr' && styles.langBtnTextActive]}>
              🇫🇷  Français
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
              🇬🇧  English
            </Text>
          </Pressable>
        </View>

        <Text style={styles.emoji}>🔐</Text>
        <Text style={styles.title}>
          {isReauth ? t('auth.reauthTitle') : isModal ? t('auth.saveTitle') : t('auth.title')}
        </Text>
        <Text style={styles.subtitle}>
          {isReauth ? t('auth.reauthSubtitle') : isModal ? t('auth.saveSubtitle') : t('auth.subtitle')}
        </Text>

        {!isReauth && (
        <View style={styles.benefitsBox}>
          <View style={styles.benefitRow}>
            <Text style={styles.benefitIcon}>☁️</Text>
            <Text style={styles.benefitText}>{t('auth.benefit1')}</Text>
          </View>
          <View style={styles.benefitRow}>
            <Text style={styles.benefitIcon}>📱</Text>
            <Text style={styles.benefitText}>{t('auth.benefit2')}</Text>
          </View>
          <View style={styles.benefitRow}>
            <Text style={styles.benefitIcon}>🏆</Text>
            <Text style={styles.benefitText}>{t('auth.benefit3')}</Text>
          </View>
        </View>
        )}

        {/* ── Sign in with Apple (iOS 13+) ── */}
        {appleAvailable && showApple && (
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
                <Text style={styles.appleBtnText}>{t('auth.appleBtn')}</Text>
              </>
            )}
          </Pressable>
        )}

        {/* ── Sign in with Google ── */}
        {showGoogle && (
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
              <Text style={styles.googleBtnText}>{t('auth.googleBtn')}</Text>
            </>
          )}
        </Pressable>
        )}

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <Text style={styles.hint}>{t('auth.privacyHint')}</Text>

        {/* Fallback screen only: try again without an account (the first
            attempt failed, e.g. offline) — never a login wall. */}
        {mode === 'gate' && (
          <Pressable
            onPress={async () => {
              setError(null);
              try { await signInAnon(); } catch { setError(t('auth.errorNoNetwork')); }
            }}
            accessibilityRole="button"
            style={({ pressed }) => [styles.continueBtn, pressed && { opacity: 0.6 }]}
          >
            <Text style={styles.continueBtnText}>{t('auth.continueWithout')}</Text>
          </Pressable>
        )}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  continueBtn: { marginTop: spacing.lg, minHeight: 44, justifyContent: 'center', paddingHorizontal: spacing.md },
  continueBtnText: { fontFamily: fonts.sans, fontSize: 14, color: colors.textSoft, textDecorationLine: 'underline' },
  closeBtn: {
    position: 'absolute', top: spacing.lg, right: spacing.md, zIndex: 2,
    width: 44, height: 44, alignItems: 'center', justifyContent: 'center',
  },
  closeBtnText: { fontSize: 20, color: colors.textMuted },
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

  // Language toggle (top of screen)
  langToggle: {
    flexDirection: 'row',
    gap: spacing.sm,
    width: '100%',
    maxWidth: 360,
    marginBottom: spacing.xl,
  },
  langBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.bgLight,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  langBtnActive: {
    backgroundColor: colors.accentFill,
    borderColor: colors.accent,
  },
  langBtnText: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.textSoft,
  },
  langBtnTextActive: {
    color: colors.accentText,
    fontWeight: '700',
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
