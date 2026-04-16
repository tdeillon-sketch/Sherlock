import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
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
