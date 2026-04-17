import React, { useEffect, useState } from 'react';
import {
  View, Text, Pressable, StyleSheet, ActivityIndicator, ScrollView,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { colors, fonts, spacing, radius } from '../constants/theme';
import {
  signInWithGoogleIdToken, getUserData, createUserData, updateLastSeen,
} from '../constants/firebase';
import { GOOGLE_OAUTH, isGoogleConfigured } from '../constants/google_oauth';

WebBrowser.maybeCompleteAuthSession();

interface Props {
  onSuccess: () => void;
}

export default function GoogleAuthScreen({ onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:        GOOGLE_OAUTH.expoClientId,
    iosClientId:     GOOGLE_OAUTH.iosClientId,
    androidClientId: GOOGLE_OAUTH.androidClientId,
    webClientId:     GOOGLE_OAUTH.webClientId,
  });

  // Handle response from Google OAuth flow
  useEffect(() => {
    const handleResponse = async () => {
      if (response?.type === 'success') {
        setLoading(true);
        setError(null);
        try {
          const idToken = response.authentication?.idToken
            ?? (response.params as any)?.id_token;
          if (!idToken) {
            throw new Error("Pas d'id_token reçu de Google");
          }
          const user = await signInWithGoogleIdToken(idToken);
          // Create user data if not exists
          const existing = await getUserData(user.uid).catch(() => null);
          if (!existing) {
            await createUserData(user.uid);
          } else {
            await updateLastSeen(user.uid).catch(() => {});
          }
          onSuccess();
        } catch (e: any) {
          setError(e?.message ?? 'Connexion échouée');
        } finally {
          setLoading(false);
        }
      } else if (response?.type === 'error') {
        setError("La connexion Google a échoué. Réessayez.");
      }
    };
    handleResponse();
  }, [response]);

  const onPress = async () => {
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
      setError(e?.message ?? 'Connexion impossible');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.inner}>
        <Text style={styles.emoji}>🔐</Text>
        <Text style={styles.title}>Une dernière étape</Text>
        <Text style={styles.subtitle}>
          Connectez-vous avec votre compte Google pour sauvegarder vos progrès, vos profils d'enfants et accéder à l'app sur tous vos appareils.
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

        <Pressable
          onPress={onPress}
          disabled={loading || !request}
          style={({ pressed }) => [
            styles.googleBtn,
            (pressed || loading) && { opacity: 0.85 },
          ]}
        >
          {loading ? (
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
});
