// ═══════════════════════════════════════════════════════════════
//  GOOGLE OAUTH CLIENT IDs
//  Récupérés dans Google Cloud Console après activation Google
//  comme provider dans Firebase Console > Authentication.
//
//  TUTO :
//  1. Aller sur https://console.firebase.google.com → projet sherlock-app
//  2. Authentication > Sign-in method > Google > Enable
//  3. Renseigner un email de support et sauvegarder
//  4. Aller sur https://console.cloud.google.com → projet sherlock-app
//  5. APIs & Services > Credentials → vous y verrez les Client IDs
//     créés automatiquement par Firebase :
//       • Web client (auto created by Google Service)  → WEB_CLIENT_ID
//       • iOS client                                    → IOS_CLIENT_ID
//       • Android client                                → ANDROID_CLIENT_ID
//  6. Coller ci-dessous. Pour Expo Go, utiliser EXPO_CLIENT_ID = WEB_CLIENT_ID.
// ═══════════════════════════════════════════════════════════════

export const GOOGLE_OAUTH = {
  /**
   * Used by Expo Go (web-based OAuth flow). Same value as WEB_CLIENT_ID.
   * REQUIRED for the app to function.
   */
  expoClientId:    'PASTE_WEB_CLIENT_ID_HERE.apps.googleusercontent.com',

  /**
   * Used by the standalone iOS app (after EAS Build).
   * Optional for Expo Go testing.
   */
  iosClientId:     'PASTE_IOS_CLIENT_ID_HERE.apps.googleusercontent.com',

  /**
   * Used by the standalone Android app (after EAS Build).
   * Optional if you target only iOS.
   */
  androidClientId: 'PASTE_ANDROID_CLIENT_ID_HERE.apps.googleusercontent.com',

  /**
   * Used in the web build (Expo for Web). Same value as expoClientId.
   */
  webClientId:     'PASTE_WEB_CLIENT_ID_HERE.apps.googleusercontent.com',
};

export function isGoogleConfigured(): boolean {
  return !GOOGLE_OAUTH.expoClientId.startsWith('PASTE_');
}
