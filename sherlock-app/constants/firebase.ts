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
} from 'firebase/firestore';

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
  quizResults: QuizResult[];
  badges: Badge[];
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
  await setDoc(userDocRef(uid), {
    createdAt: serverTimestamp(),
    lastSeen: serverTimestamp(),
    quizResults: [],
    badges: [],
  });
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
