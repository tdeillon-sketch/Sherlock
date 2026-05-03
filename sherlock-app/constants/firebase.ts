import { initializeApp } from 'firebase/app';
import {
  getAuth, signInAnonymously, onAuthStateChanged, User,
  GoogleAuthProvider, OAuthProvider, signInWithCredential, signOut as fbSignOut,
  deleteUser,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  increment,
} from 'firebase/firestore';

// ── Admin allowlist ──
// Only this email gets access to the admin dashboard.
const ADMIN_EMAILS = ['tdeillon@gmail.com'];

export function isAdmin(user: User | null): boolean {
  if (!user || !user.email) return false;
  return ADMIN_EMAILS.includes(user.email.toLowerCase());
}

// ── Config Firebase ──
const firebaseConfig = {
  apiKey: "AIzaSyDdyiM7I8HyvnMN9naVNjFnjxUvrGM3J3k",
  authDomain: "sherlock-app-af7f4.firebaseapp.com",
  projectId: "sherlock-app-af7f4",
  storageBucket: "sherlock-app-af7f4.firebasestorage.app",
  messagingSenderId: "635336758858",
  appId: "1:635336758858:web:0cb01257eadb6272dc78b3",
  measurementId: "G-12NMJDCEY5",
};

// ── Init ──
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// ── Auth helpers ──
export async function signInAnon(): Promise<User> {
  const result = await signInAnonymously(auth);
  return result.user;
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// Sign in with a Google ID token (obtained from expo-auth-session)
export async function signInWithGoogleIdToken(idToken: string): Promise<User> {
  const credential = GoogleAuthProvider.credential(idToken);
  const result = await signInWithCredential(auth, credential);
  // Best-effort backfill of email/provider on the user doc
  syncUserProfile(result.user).catch(() => {});
  return result.user;
}

// Sign in with an Apple identity token (obtained from expo-apple-authentication)
// `rawNonce` is the unhashed nonce we passed to Apple — Firebase requires it
// to verify the token.
export async function signInWithAppleIdToken(
  identityToken: string,
  rawNonce: string,
): Promise<User> {
  const provider = new OAuthProvider('apple.com');
  const credential = provider.credential({
    idToken: identityToken,
    rawNonce,
  });
  const result = await signInWithCredential(auth, credential);
  syncUserProfile(result.user).catch(() => {});
  return result.user;
}

// Returns true if the current user is signed in with Google (vs anonymous)
export function isGoogleSignedIn(user: User | null): boolean {
  if (!user) return false;
  return user.providerData.some(p => p.providerId === 'google.com');
}

// Returns true if the current user is signed in with Apple (vs anonymous)
export function isAppleSignedIn(user: User | null): boolean {
  if (!user) return false;
  return user.providerData.some(p => p.providerId === 'apple.com');
}

// Returns true if the user is signed in with any third-party provider
export function isThirdPartySignedIn(user: User | null): boolean {
  return isGoogleSignedIn(user) || isAppleSignedIn(user);
}

export async function signOut(): Promise<void> {
  await fbSignOut(auth);
}

/**
 * Permanently delete the current user's account:
 *  - Removes the Firestore document /users/{uid}
 *  - Deletes the Firebase Auth user
 * After this, the user will be signed out and the local state should be reset.
 *
 * NOTE: Firebase requires a recent sign-in for `deleteUser`. If the call
 * throws "auth/requires-recent-login", the caller should re-authenticate
 * the user (sign in again) before retrying.
 */
export async function deleteAccount(): Promise<void> {
  const user = auth.currentUser;
  if (!user) throw new Error("Aucun utilisateur connecté");
  // 1. Delete Firestore data first (best-effort — if it fails the auth
  //    user remains so we don't end up with orphaned data).
  try {
    await deleteDoc(userDocRef(user.uid));
  } catch (e) {
    // Continue anyway — the auth user must still be deleted to comply
    // with Apple's account-deletion requirement.
  }
  // 2. Delete the auth user. If "requires-recent-login", let the caller
  //    handle re-auth.
  await deleteUser(user);
}

// ── User data types ──
export interface UserData {
  createdAt: any;
  lastSeen: any;
  /** Email if signed in with Google/Apple, null for anonymous */
  email?: string | null;
  /** 'google' | 'apple' | 'anonymous' */
  provider?: string;
  /** Display name from the OAuth provider, if any */
  displayName?: string | null;
  quizResults: QuizResult[];
  badges: Badge[];
}

function detectProvider(user: User): 'google' | 'apple' | 'anonymous' {
  if (user.providerData.some(p => p.providerId === 'google.com')) return 'google';
  if (user.providerData.some(p => p.providerId === 'apple.com')) return 'apple';
  return 'anonymous';
}

export interface QuizResult {
  mode: string;       // 'enfant' | 'ado' | 'adulte'
  topType: number;
  wingType: number | null;
  scores: Record<number, number>;
  completedAt: string; // ISO date
}

export interface Badge {
  level: string;      // 'debutant' | 'connaisseur' | 'expert'
  score: number;
  total: number;
  earnedAt: string;   // ISO date
}

// ── Firestore helpers ──
const userDocRef = (uid: string) => doc(db, 'users', uid);

export async function getUserData(uid: string): Promise<UserData | null> {
  const snap = await getDoc(userDocRef(uid));
  return snap.exists() ? (snap.data() as UserData) : null;
}

export async function createUserData(uid: string): Promise<void> {
  const user = auth.currentUser;
  await setDoc(userDocRef(uid), {
    createdAt: serverTimestamp(),
    lastSeen: serverTimestamp(),
    email: user?.email ?? null,
    displayName: user?.displayName ?? null,
    provider: user ? detectProvider(user) : 'anonymous',
    quizResults: [],
    badges: [],
  });
}

/**
 * Backfill email/provider/displayName on every login.
 * Existing user docs that predate this feature don't have those fields —
 * call this whenever you have a fresh `user` object after sign-in.
 */
export async function syncUserProfile(user: User): Promise<void> {
  try {
    await updateDoc(userDocRef(user.uid), {
      email: user.email ?? null,
      displayName: user.displayName ?? null,
      provider: detectProvider(user),
      lastSeen: serverTimestamp(),
    });
  } catch {
    // Doc may not exist yet — ignore. createUserData will populate it.
  }
}

export async function saveQuizResult(uid: string, result: QuizResult): Promise<void> {
  const data = await getUserData(uid);
  const results = data?.quizResults || [];
  results.push(result);
  await updateDoc(userDocRef(uid), {
    quizResults: results,
    lastSeen: serverTimestamp(),
  });
}

export async function saveBadge(uid: string, badge: Badge): Promise<void> {
  const data = await getUserData(uid);
  const badges = data?.badges || [];
  // Replace existing badge for same level if better score
  const existing = badges.findIndex(b => b.level === badge.level);
  if (existing >= 0) {
    if (badge.score > badges[existing].score) {
      badges[existing] = badge;
    }
  } else {
    badges.push(badge);
  }
  await updateDoc(userDocRef(uid), {
    badges,
    lastSeen: serverTimestamp(),
  });
}

export async function updateLastSeen(uid: string): Promise<void> {
  await updateDoc(userDocRef(uid), {
    lastSeen: serverTimestamp(),
  });
}

// ── Screen view tracking ──
// Each tab/screen calls trackScreen('quiz') when it gains focus.
// Increments /users/{uid}.screenViews.{name} and updates lastSeen.
// Best-effort: errors are swallowed (no throw to UI).
export type Screen =
  | 'home' | 'quiz' | 'profiles' | 'celebrities' | 'duo'
  | 'pilot' | 'journal' | 'account';

export async function trackScreen(screen: Screen): Promise<void> {
  const user = auth.currentUser;
  if (!user) return;
  try {
    await updateDoc(userDocRef(user.uid), {
      [`screenViews.${screen}`]: increment(1),
      lastSeen: serverTimestamp(),
    });
  } catch {
    // doc may not exist yet (e.g. just signed in, race condition) — ignore
  }
}

// ── Dossier progress ──

export interface DossierProgressData {
  completedCases: string[];
  unlockedFiches: string[];
  totalXP: number;
  dailyLastDate: string | null;
  dailyCompleted: boolean;
  streak: number;
}

export async function saveDossierProgress(uid: string, progress: DossierProgressData): Promise<void> {
  await updateDoc(userDocRef(uid), {
    dossierProgress: progress,
    lastSeen: serverTimestamp(),
  });
}

export async function loadDossierProgress(uid: string): Promise<DossierProgressData | null> {
  const data = await getUserData(uid);
  return (data as any)?.dossierProgress ?? null;
}

// ═══════════════════════════════════════════════════════════════
//  CHILD PROFILES — historique du quiz par enfant
// ═══════════════════════════════════════════════════════════════

export interface ChildProfileEntry {
  /** ISO date */
  date: string;
  mode: string; // 'enfant' | 'ado' | 'adulte'
  topType: number;
  topPercent: number;
  secondType: number;
  secondPercent: number;
  wingType: number | null;
  scores: Record<number, number>;
  /** Optional open-ended note from the parent */
  note?: string;
}

export interface ChildProfile {
  /** Stable id (uuid-like) */
  id: string;
  name: string;
  /** Optional age at the time the profile was created */
  age?: number;
  history: ChildProfileEntry[];
}

export async function loadChildProfiles(uid: string): Promise<ChildProfile[]> {
  const data = await getUserData(uid);
  return (data as any)?.childProfiles ?? [];
}

export async function saveChildProfiles(uid: string, profiles: ChildProfile[]): Promise<void> {
  await updateDoc(userDocRef(uid), {
    childProfiles: profiles,
    lastSeen: serverTimestamp(),
  });
}

// ═══════════════════════════════════════════════════════════════
//  ADMIN — list all users + launch subscribers
//  Requires Firestore rules that allow the admin email to read the
//  full /users and /launch_subscribers collections.
// ═══════════════════════════════════════════════════════════════

export interface AdminUserRow {
  uid: string;
  email: string | null;
  displayName: string | null;
  provider: string;
  createdAt: number | null;
  lastSeen: number | null;
  // Usage signals (computed from the user doc)
  quizCount: number;          // # quizzes completed
  childProfilesCount: number; // # saved child profiles
  sherlockXp: number;         // Total XP in the Dossiers / Testez-vous game
  unlockedFiches: number;     // Suspect files unlocked (Pokédex)
  completedCases: number;     // Sherlock cases completed
  badges: number;             // Achievement badges earned
  streak: number;             // Daily mission streak
  /** Aggregated engagement: 0 (none) → 100 (heavy user) */
  engagement: number;
  // Raw arrays — for the detail expand & for distribution stats
  quizResults: QuizResult[];
  childProfiles: ChildProfile[];
  // Screen views (incremented by trackScreen). May be undefined for legacy users.
  screenViews?: Partial<Record<Screen, number>>;
}

export interface AdminLaunchSubscriberRow {
  deviceId: string;
  email: string | null;
  pushGranted: boolean;
  pushToken: string | null;
  locale: string;
  platform: string;
  subscribedAt: number | null;
}

function tsToMillis(value: any): number | null {
  if (!value) return null;
  if (typeof value.toMillis === 'function') return value.toMillis();
  if (typeof value === 'number') return value;
  return null;
}

/**
 * Compute a 0–100 engagement score from raw signals.
 * Heuristic — tweak weights as you learn from real data.
 */
function computeEngagement(args: {
  quizCount: number;
  childProfiles: number;
  sherlockXp: number;
  unlockedFiches: number;
  badges: number;
}): number {
  const score =
    args.quizCount * 8 +           // each quiz = +8
    args.childProfiles * 12 +      // each saved profile = +12
    Math.min(args.sherlockXp / 50, 30) + // up to 30 pts from XP (1500 XP cap)
    args.unlockedFiches * 2 +      // each fiche = +2
    args.badges * 6;               // each badge = +6
  return Math.min(Math.round(score), 100);
}

/** Admin only — read all /users docs */
export async function listAllUsers(): Promise<AdminUserRow[]> {
  const snap = await getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc'), limit(500)));
  return snap.docs.map(d => {
    const data = d.data() as any;
    const dossier = data.dossierProgress || {};
    const quizResults: QuizResult[] = Array.isArray(data.quizResults) ? data.quizResults : [];
    const childProfiles: ChildProfile[] = Array.isArray(data.childProfiles) ? data.childProfiles : [];
    const sherlockXp = typeof dossier.totalXP === 'number' ? dossier.totalXP : 0;
    const unlockedFiches = Array.isArray(dossier.unlockedFiches) ? dossier.unlockedFiches.length : 0;
    const completedCases = Array.isArray(dossier.completedCases) ? dossier.completedCases.length : 0;
    const badgesArr = Array.isArray(data.badges) ? data.badges : [];
    const streak = typeof dossier.streak === 'number' ? dossier.streak : 0;
    const engagement = computeEngagement({
      quizCount: quizResults.length, childProfiles: childProfiles.length, sherlockXp,
      unlockedFiches, badges: badgesArr.length,
    });
    return {
      uid: d.id,
      email: data.email ?? null,
      displayName: data.displayName ?? null,
      provider: data.provider ?? 'unknown',
      createdAt: tsToMillis(data.createdAt),
      lastSeen: tsToMillis(data.lastSeen),
      quizCount: quizResults.length,
      childProfilesCount: childProfiles.length,
      sherlockXp,
      unlockedFiches,
      completedCases,
      badges: badgesArr.length,
      streak,
      engagement,
      quizResults,
      childProfiles,
      screenViews: data.screenViews && typeof data.screenViews === 'object' ? data.screenViews : {},
    };
  });
}

/**
 * Admin only — delete a user's /users/{uid} doc.
 * Used to clean up orphan docs left over after deleting the Auth user
 * from the Firebase console (Auth deletion doesn't cascade to Firestore).
 *
 * Requires Firestore rule:
 *   match /users/{uid} { allow delete: if isAdmin(); }
 */
export async function deleteUserDocAsAdmin(uid: string): Promise<void> {
  await deleteDoc(userDocRef(uid));
}

/** Admin only — read all /launch_subscribers docs */
export async function listAllLaunchSubscribers(): Promise<AdminLaunchSubscriberRow[]> {
  const snap = await getDocs(query(collection(db, 'launch_subscribers'), orderBy('subscribedAt', 'desc'), limit(500)));
  return snap.docs.map(d => {
    const data = d.data() as any;
    return {
      deviceId: d.id,
      email: data.email ?? null,
      pushGranted: !!data.pushGranted,
      pushToken: data.pushToken ?? null,
      locale: data.locale ?? 'unknown',
      platform: data.platform ?? 'unknown',
      subscribedAt: tsToMillis(data.subscribedAt),
    };
  });
}
