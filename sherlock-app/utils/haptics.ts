// ═══════════════════════════════════════════════════════════════
//  HAPTICS — thin, safe wrappers around expo-haptics.
//  No-op on web; never throws into the UI (all calls are fire-and-forget).
// ═══════════════════════════════════════════════════════════════

import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

const enabled = Platform.OS === 'ios' || Platform.OS === 'android';

/** Light tick for discrete value changes (slider snap, stepper, selection). */
export function hapticSelection(): void {
  if (!enabled) return;
  Haptics.selectionAsync().catch(() => {});
}

/** Light impact for button taps that advance a flow. */
export function hapticLight(): void {
  if (!enabled) return;
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
}

/** Success notification (correct answer, completed mission). */
export function hapticSuccess(): void {
  if (!enabled) return;
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
}

/** Error notification (wrong answer). */
export function hapticError(): void {
  if (!enabled) return;
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
}
