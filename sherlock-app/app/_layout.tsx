import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AuthScreen from '../components/AuthScreen';
import { LocaleProvider } from '../i18n';
import {
  onAuthChange, getUserData, updateLastSeen, isThirdPartySignedIn,
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

  // Single auth gate: Google or Apple sign-in.
  // The previous "access code" gate was removed for App Store guideline 3.1.1
  // (no third-party promo codes for unlocking digital content).
  const [signedIn, setSignedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // On boot: check if user is already authenticated (returning user)
  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (user && isThirdPartySignedIn(user)) {
        const data = await getUserData(user.uid).catch(() => null);
        if (data) {
          setSignedIn(true);
          updateLastSeen(user.uid).catch(() => {});
        } else {
          // Auth user exists but no Firestore doc — treat as signed-out so the
          // AuthScreen flow re-creates the doc on first sign-in.
          setSignedIn(false);
        }
      } else {
        setSignedIn(false);
      }
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

  if (!fontsLoaded || checkingAuth || !splashHidden) {
    return null;
  }

  // ── Sign-in screen (Google + Apple) ──
  if (!signedIn) {
    return (
      <LocaleProvider>
        <AuthScreen onSuccess={() => setSignedIn(true)} />
      </LocaleProvider>
    );
  }

  // ── Authenticated: render the app ──
  return (
    <LocaleProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </LocaleProvider>
  );
}
