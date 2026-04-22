import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AuthScreen from '../components/AuthScreen';
import {
  onAuthChange, getUserData, updateLastSeen, isThirdPartySignedIn,
} from '../constants/firebase';

SplashScreen.preventAutoHideAsync();

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

  useEffect(() => {
    if (fontsLoaded && !checkingAuth) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, checkingAuth]);

  if (!fontsLoaded || checkingAuth) {
    return null;
  }

  // ── Sign-in screen (Google + Apple) ──
  if (!signedIn) {
    return <AuthScreen onSuccess={() => setSignedIn(true)} />;
  }

  // ── Authenticated: render the app ──
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
