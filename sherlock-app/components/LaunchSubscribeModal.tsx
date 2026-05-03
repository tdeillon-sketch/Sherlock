// ═══════════════════════════════════════════════════════════════
//  LaunchSubscribeModal
//  Used wherever the user taps "M'avertir à la sortie".
//  Collects email (optional) + push permission, stores in Firestore.
// ═══════════════════════════════════════════════════════════════

import { useState } from 'react';
import {
  Modal, View, Text, Pressable, StyleSheet, TextInput, ActivityIndicator, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing, radius } from '../constants/theme';
import { subscribeToLaunch } from '../constants/launchSubscribe';
import { useT } from '../i18n';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function LaunchSubscribeModal({ visible, onClose }: Props) {
  const { t, locale } = useT();
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [pushGranted, setPushGranted] = useState(false);

  const reset = () => {
    setEmail('');
    setBusy(false);
    setDone(false);
    setPushGranted(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const handleSubscribe = async () => {
    const trimmed = email.trim();
    if (trimmed && !validateEmail(trimmed)) {
      Alert.alert(t('launch.invalidEmailTitle'), t('launch.invalidEmailBody'));
      return;
    }
    setBusy(true);
    const result = await subscribeToLaunch({ email: trimmed || undefined, locale });
    setBusy(false);
    if (!result.ok) {
      Alert.alert(t('launch.errorTitle'), t('launch.errorBody'));
      return;
    }
    setPushGranted(result.pushGranted);
    setDone(true);
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <Pressable onPress={handleClose} style={styles.closeBtn} hitSlop={10}>
            <Ionicons name="close" size={22} color={colors.textMuted} />
          </Pressable>

          {!done ? (
            <>
              <Text style={styles.eyebrow}>{t('launch.eyebrow')}</Text>
              <Text style={styles.title}>{t('launch.title')}</Text>
              <Text style={styles.body}>{t('launch.body')}</Text>

              <Text style={styles.label}>{t('launch.emailLabel')}</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder={t('launch.emailPlaceholder')}
                placeholderTextColor={colors.textDim}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />
              <Text style={styles.helper}>{t('launch.helper')}</Text>

              <Pressable
                onPress={handleSubscribe}
                disabled={busy}
                style={({ pressed }) => [
                  styles.primaryBtn,
                  (pressed || busy) && { opacity: 0.85 },
                ]}
              >
                {busy ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text style={styles.primaryBtnText}>{t('launch.cta')}</Text>
                )}
              </Pressable>

              <Pressable onPress={handleClose} style={styles.secondaryBtn}>
                <Text style={styles.secondaryBtnText}>{t('launch.cancel')}</Text>
              </Pressable>
            </>
          ) : (
            <>
              <View style={styles.successIcon}>
                <Ionicons name="checkmark" size={32} color={colors.white} />
              </View>
              <Text style={styles.successTitle}>{t('launch.successTitle')}</Text>
              <Text style={styles.successBody}>
                {pushGranted
                  ? t('launch.successWithPush')
                  : email.trim()
                    ? t('launch.successEmailOnly')
                    : t('launch.successNoChannel')}
              </Text>
              <Pressable onPress={handleClose} style={styles.primaryBtn}>
                <Text style={styles.primaryBtnText}>{t('launch.successCta')}</Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  closeBtn: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 32, height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: 'center', justifyContent: 'center',
    zIndex: 1,
  },

  eyebrow: {
    fontFamily: fonts.sans, fontSize: 11, letterSpacing: 1.5,
    color: colors.accent, fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  title: {
    fontFamily: fonts.serif, fontSize: 22, lineHeight: 28,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  body: {
    fontFamily: fonts.sans, fontSize: 14, lineHeight: 22,
    color: colors.textSoft,
    marginBottom: spacing.lg,
  },

  label: {
    fontFamily: fonts.sans, fontSize: 11, fontWeight: '700',
    color: colors.textMuted, letterSpacing: 1, textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  input: {
    fontFamily: fonts.sans, fontSize: 15, color: colors.text,
    backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.md,
    paddingVertical: 12, paddingHorizontal: spacing.md,
  },
  helper: {
    fontFamily: fonts.sans, fontSize: 12,
    color: colors.textMuted,
    marginTop: 6, marginBottom: spacing.lg,
  },

  primaryBtn: {
    backgroundColor: colors.accent,
    paddingVertical: 14,
    borderRadius: radius.full,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  primaryBtnText: {
    fontFamily: fonts.sans, fontSize: 14, fontWeight: '700',
    color: colors.white,
  },
  secondaryBtn: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  secondaryBtnText: {
    fontFamily: fonts.sans, fontSize: 13,
    color: colors.textMuted,
  },

  // Success
  successIcon: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: colors.accent,
    alignItems: 'center', justifyContent: 'center',
    alignSelf: 'center', marginTop: spacing.md, marginBottom: spacing.md,
  },
  successTitle: {
    fontFamily: fonts.serif, fontSize: 22,
    color: colors.text,
    textAlign: 'center', marginBottom: spacing.sm,
  },
  successBody: {
    fontFamily: fonts.sans, fontSize: 14, lineHeight: 22,
    color: colors.textSoft,
    textAlign: 'center', marginBottom: spacing.lg,
  },
});
