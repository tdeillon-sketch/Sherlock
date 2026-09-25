// ═══════════════════════════════════════════════════════════════
//  Sign-in, shown as a modal when an account is needed to save something
//  (see constants/authGate.ts). Links the anonymous session to Apple or
//  Google (or signs in to an existing account), then resumes what the user
//  was doing. With ?mode=reauth: confirms the identity before an account
//  deletion.
// ═══════════════════════════════════════════════════════════════

import { Stack, router, useLocalSearchParams, useNavigation } from 'expo-router';
import AuthScreen from '../components/AuthScreen';
import { consumePendingAction, clearPendingAction } from '../constants/authGate';
import { forgetAppleRevokeCode } from '../constants/firebase';

export default function SignInScreen() {
  const { mode } = useLocalSearchParams<{ mode?: string }>();
  const navigation = useNavigation();
  return (
    <>
      <Stack.Screen options={{ presentation: 'modal' }} />
      <AuthScreen
        mode={mode === 'reauth' ? 'reauth' : 'modal'}
        onClose={() => { clearPendingAction(); forgetAppleRevokeCode(); router.back(); }}
        onSuccess={() => {
          const action = consumePendingAction();
          // Closed meanwhile (swipe down or ✕ during the sign-in): don't pop
          // the screen underneath, and don't resume (nor keep an Apple code).
          if (!navigation.isFocused()) { forgetAppleRevokeCode(); return; }
          router.back();
          if (action) setTimeout(action, 350);
        }}
      />
    </>
  );
}
