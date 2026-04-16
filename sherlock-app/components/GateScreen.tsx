import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { colors, fonts } from '../constants/theme';
import { signInAnon, createUserData } from '../constants/firebase';

const ACCESS_CODE = '314159';

interface GateProps {
  onUnlock: () => void;
}

export default function GateScreen({ onUnlock }: GateProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const handleSubmit = async () => {
    if (loading) return;

    if (code.trim() === ACCESS_CODE) {
      setLoading(true);
      try {
        const user = await signInAnon();
        await createUserData(user.uid);
        onUnlock();
      } catch (e) {
        // Firebase offline? Let them in anyway
        onUnlock();
      }
    } else {
      setError(true);
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 12, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -12, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
      ]).start();
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>
        <Text style={styles.emoji}>📖</Text>
        <Text style={styles.title}>On a tous besoin{'\n'}de quelqu'un d'autre</Text>
        <Text style={styles.author}>Thomas Deillon</Text>
        <View style={styles.divider} />
        <Text style={styles.desc}>
          Cette application est le compagnon numerique du livre.
          {'\n'}Entrez le code inscrit dans votre exemplaire pour y acceder.
        </Text>

        <Animated.View style={[styles.inputRow, { transform: [{ translateX: shakeAnim }] }]}>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            value={code}
            onChangeText={(t) => { setCode(t); setError(false); }}
            placeholder="Code d'acces"
            placeholderTextColor={colors.tealFaint}
            keyboardType="number-pad"
            maxLength={6}
            onSubmitEditing={handleSubmit}
            autoCorrect={false}
            editable={!loading}
          />
        </Animated.View>

        {error && (
          <Text style={styles.errorText}>Code incorrect. Reessayez.</Text>
        )}

        <Pressable
          style={({ pressed }) => [styles.btn, pressed && styles.btnPressed, loading && styles.btnLoading]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.btnText}>Entrer</Text>
          )}
        </Pressable>

        <Text style={styles.hint}>
          Le code se trouve a la derniere page du livre.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 36,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 24,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 26,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 8,
  },
  author: {
    fontFamily: fonts.serifItalic,
    fontSize: 16,
    color: colors.tealSoft,
    marginBottom: 24,
  },
  divider: {
    width: 40,
    height: 1,
    backgroundColor: colors.tealLine,
    marginBottom: 24,
  },
  desc: {
    fontFamily: fonts.sans,
    fontSize: 14,
    color: colors.subtle55,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  inputRow: {
    width: '100%',
    maxWidth: 280,
    marginBottom: 12,
  },
  input: {
    fontFamily: fonts.sans,
    fontSize: 22,
    color: colors.text,
    textAlign: 'center',
    letterSpacing: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 1.5,
    borderColor: colors.tealBorder,
    borderRadius: 12,
    backgroundColor: colors.cardBg,
  },
  inputError: {
    borderColor: colors.error,
  },
  errorText: {
    fontFamily: fonts.sans,
    fontSize: 13,
    color: colors.error,
    marginBottom: 8,
  },
  btn: {
    width: '100%',
    maxWidth: 280,
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: colors.accent,
    alignItems: 'center',
    marginTop: 8,
  },
  btnPressed: {
    opacity: 0.85,
  },
  btnLoading: {
    opacity: 0.7,
  },
  btnText: {
    fontFamily: fonts.sans,
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  hint: {
    fontFamily: fonts.sans,
    fontSize: 12,
    color: colors.subtle25,
    marginTop: 24,
    textAlign: 'center',
  },
});
