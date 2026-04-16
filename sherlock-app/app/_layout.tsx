import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import GateScreen from '../components/GateScreen';
import { onAuthChange, getUserData, updateLastSeen } from '../constants/firebase';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay: require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
    'PlayfairDisplay-Italic': require('../assets/fonts/PlayfairDisplay-Italic.ttf'),
    Inter: require('../assets/fonts/Inter-Regular.ttf'),
  });

  const [unlocked, setUnlocked] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check if user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (user) {
        // User already signed in — check if they have data (= already passed the gate)
        const data = await getUserData(user.uid).catch(() => null);
        if (data) {
          setUnlocked(true);
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

  if (!unlocked) {
    return <GateScreen onUnlock={() => setUnlocked(true)} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
