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

// Web Client ID (auto-créé par Firebase quand on active Google sign-in).
// Utilisé par Expo Go, le web, et comme fallback pour iOS/Android tant
// qu'on n'a pas créé de Client ID natif dédié.
const WEB_CLIENT_ID = '635336758858-jg7h3s3jl5u43nqbk9s1rnrroam6visb.apps.googleusercontent.com';

export const GOOGLE_OAUTH = {
  /** Used by Expo Go (web-based OAuth flow). */
  expoClientId:    WEB_CLIENT_ID,

  /**
   * Used by the standalone iOS app (after EAS Build).
   * Pour l'instant on utilise le Web Client ID, mais quand tu passeras
   * à EAS Build pour l'App Store, il faudra créer un iOS OAuth Client ID
   * dans Google Cloud Console (avec ton bundle ID com.thomasdeillon.sherlock).
   */
  iosClientId:     WEB_CLIENT_ID,

  /** Used by the standalone Android app. Idem, à remplacer plus tard. */
  androidClientId: WEB_CLIENT_ID,

  /** Used in the web build. */
  webClientId:     WEB_CLIENT_ID,
};

export function isGoogleConfigured(): boolean {
  return !GOOGLE_OAUTH.expoClientId.startsWith('PASTE_');
}
