import { useEffect, useRef, useState } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthScreen from '../components/AuthScreen';
import Onboarding from '../components/Onboarding';
import { LocaleProvider } from '../i18n';
import {
  onAuthChange, ensureUserDoc, signInAnon, retryPendingAnonMerge, syncUserProfile,
} from '../constants/firebase';

SplashScreen.preventAutoHideAsync();

// Minimum time the splash screen stays visible at boot, in milliseconds.
// The splash naturally hides as soon as fonts + auth check are ready (often
// well under a second). We hold it at least this long so the brand image has
// time to register — roughly doubles the perceived startup duration.
const MIN_SPLASH_MS = 2000;
const bootStart = Date.now();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay: require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
    'PlayfairDisplay-Italic': require('../assets/fonts/PlayfairDisplay-Italic.ttf'),
    Inter: require('../assets/fonts/Inter-Regular.ttf'),
  });

  // No account needed to start: without a session, an anonymous one is
  // created (the app is usable right away). An Apple / Google account is
  // asked only to save a family profile or the journal (constants/authGate).
  // Fallback: if the anonymous session can't start (e.g. first launch
  // offline), the sign-in screen is shown as before.
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [needsSignIn, setNeedsSignIn] = useState(false);
  // Bumped when a session ends (sign-out, account deletion): every screen of
  // the previous session is dropped, so nothing of it stays in memory or is
  // written into the next one. (Not on an anonymous → account switch: a
  // result waiting to be saved must survive it.)
  const [sessionKey, setSessionKey] = useState(0);
  const hadUser = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (!user) {
        if (hadUser.current) setSessionKey((k) => k + 1);
        hadUser.current = false;
        // Hold the app until the new session exists (no screen mounts
        // without a user).
        setCheckingAuth(true);
        try {
          await signInAnon(); // fires onAuthChange again with the new user
        } catch {
          setNeedsSignIn(true);
          setCheckingAuth(false);
        }
        return;
      }
      hadUser.current = true;
      // Never block the launch on the network: the document is created in
      // the background, and only if the server confirms it is missing.
      ensureUserDoc(user.uid)
        .then(() => { if (!user.isAnonymous) return syncUserProfile(user); })
        .catch(() => {});
      retryPendingAnonMerge().catch(() => {});
      setNeedsSignIn(false);
      setCheckingAuth(false);
    });
    return unsubscribe;
  }, []);

  // Track when the natural ready conditions (fonts + auth) are met so we
  // can render the app, but defer hiding the native splash until the
  // minimum hold time has also elapsed.
  const [splashHidden, setSplashHidden] = useState(false);
  useEffect(() => {
    if (fontsLoaded && !checkingAuth) {
      const elapsed = Date.now() - bootStart;
      const remaining = Math.max(0, MIN_SPLASH_MS - elapsed);
      const t = setTimeout(() => {
        SplashScreen.hideAsync().catch(() => {});
        setSplashHidden(true);
      }, remaining);
      return () => clearTimeout(t);
    }
  }, [fontsLoaded, checkingAuth]);

  // First-launch onboarding flag (null = not yet read from storage).
  const [onboardingDone, setOnboardingDone] = useState<boolean | null>(null);
  useEffect(() => {
    AsyncStorage.getItem('onboarding:done')
      .then((v) => setOnboardingDone(v === '1'))
      .catch(() => setOnboardingDone(true));
  }, []);
  const completeOnboarding = () => {
    AsyncStorage.setItem('onboarding:done', '1').catch(() => {});
    setOnboardingDone(true);
  };

  if (!fontsLoaded || checkingAuth || !splashHidden) {
    return null;
  }

  // ── Fallback only: the anonymous session could not start ──
  if (needsSignIn) {
    return (
      <LocaleProvider>
        <AuthScreen onSuccess={() => setNeedsSignIn(false)} />
      </LocaleProvider>
    );
  }

  // ── First launch: onboarding once (wait until the flag is read) ──
  if (onboardingDone === null) {
    return null;
  }
  if (!onboardingDone) {
    return (
      <LocaleProvider>
        <Onboarding onDone={completeOnboarding} />
      </LocaleProvider>
    );
  }

  // ── Session ready (with or without an account) + onboarded ──
  return (
    <LocaleProvider>
      <Stack key={sessionKey} screenOptions={{ headerShown: false }} />
    </LocaleProvider>
  );
}
