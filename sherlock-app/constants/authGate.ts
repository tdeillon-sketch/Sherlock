// ═══════════════════════════════════════════════════════════════
//  Account gate. The app works without an account (anonymous session);
//  an Apple / Google account is asked only to SAVE things meant to last
//  (a profile in "Ma famille", journal answers). The action the user was
//  doing runs right after signing in.
// ═══════════════════════════════════════════════════════════════

import { router } from 'expo-router';
import { auth } from './firebase';

let pending: (() => void) | null = null;

/** Run `action` now if the user has an account, otherwise after sign-in. */
export function requireAccount(action: () => void): void {
  const user = auth.currentUser;
  if (user && !user.isAnonymous) { action(); return; }
  pending = action;
  router.push('/sign-in' as never);
}

/** Open the sign-in screen with nothing to resume (e.g. from Mon compte). */
export function openSignIn(): void {
  pending = null;
  router.push('/sign-in' as never);
}

/** Confirm the identity again (same Apple / Google account), then run
 *  `action`: Firebase requires a recent sign-in to delete an account, and
 *  revoking Sign in with Apple needs the code of a fresh Apple sheet. */
export function requireReauth(action: () => void): void {
  pending = action;
  router.push('/sign-in?mode=reauth' as never);
}

export function consumePendingAction(): (() => void) | null {
  const p = pending;
  pending = null;
  return p;
}

export function clearPendingAction(): void {
  pending = null;
}
