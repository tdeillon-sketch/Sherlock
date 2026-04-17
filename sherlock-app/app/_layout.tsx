import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import GateScreen from '../components/GateScreen';
import GoogleAuthScreen from '../components/GoogleAuthScreen';
import {
  onAuthChange, getUserData, updateLastSeen, isGoogleSignedIn,
} from '../constants/firebase';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay: require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
    'PlayfairDisplay-Italic': require('../assets/fonts/PlayfairDisplay-Italic.ttf'),
    Inter: require('../assets/fonts/Inter-Regular.ttf'),
  });

  // Two-stage gate: code → Google sign-in
  const [codeAccepted, setCodeAccepted] = useState(false);
  const [googleAccepted, setGoogleAccepted] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // On boot: check if user is already Google-authenticated (returning user)
  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (user && isGoogleSignedIn(user)) {
        // Already Google-signed in → skip both gates
        const data = await getUserData(user.uid).catch(() => null);
        if (data) {
          setCodeAccepted(true);
          setGoogleAccepted(true);
          updateLastSeen(user.uid).catch(() => {});
        }
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

  // ── Stage 1: PIN code from the book ──
  if (!codeAccepted) {
    return <GateScreen onUnlock={() => setCodeAccepted(true)} />;
  }

  // ── Stage 2: Google sign-in ──
  if (!googleAccepted) {
    return <GoogleAuthScreen onSuccess={() => setGoogleAccepted(true)} />;
  }

  // ── Authenticated: render the app ──
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
