// ═══════════════════════════════════════════════════════════════
//  Launch subscription
//  Collects: push token (Expo) + optional email + locale
//  Stored in Firestore: /launch_subscribers/{deviceId}
//
//  When the book launches, run a server-side script that:
//   - reads all docs from /launch_subscribers
//   - sends Expo push notifications to all push tokens
//   - emails the email addresses
// ═══════════════════════════════════════════════════════════════

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from './firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const DEVICE_ID_KEY = 'launch:deviceId';
const SUBSCRIBED_KEY = 'launch:subscribed';

function generateDeviceId(): string {
  return `dev-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

async function getOrCreateDeviceId(): Promise<string> {
  let id = await AsyncStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = generateDeviceId();
    await AsyncStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
}

/** Returns true if the user has already subscribed on this device. */
export async function isAlreadySubscribed(): Promise<boolean> {
  const flag = await AsyncStorage.getItem(SUBSCRIBED_KEY);
  return flag === '1';
}

export interface SubscribeResult {
  ok: boolean;
  pushGranted: boolean;
  /** Set when the user denied push permission but we still saved the email */
  emailSavedOnly?: boolean;
  error?: string;
}

/** Request push permission and return the Expo push token (or null). */
async function requestPushToken(): Promise<{ granted: boolean; token: string | null }> {
  if (!Device.isDevice) {
    // iOS Simulator / Android emulator can't receive push.
    return { granted: false, token: null };
  }

  // On Android, ensure a notification channel exists
  if (Platform.OS === 'android') {
    try {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    } catch {}
  }

  let { status: existing } = await Notifications.getPermissionsAsync();
  let final = existing;
  if (existing !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    final = status;
  }
  if (final !== 'granted') {
    return { granted: false, token: null };
  }
  try {
    const tokenResult = await Notifications.getExpoPushTokenAsync();
    return { granted: true, token: tokenResult.data };
  } catch {
    return { granted: true, token: null };
  }
}

/**
 * Subscribe the user to the book launch notification.
 * - Requests push permission and gets the Expo push token
 * - Saves push token + email + locale to Firestore /launch_subscribers/{deviceId}
 * - Marks the device as subscribed in AsyncStorage so we don't re-prompt
 */
export async function subscribeToLaunch(args: {
  email?: string;
  locale: 'fr' | 'en';
}): Promise<SubscribeResult> {
  try {
    const deviceId = await getOrCreateDeviceId();
    const push = await requestPushToken();

    const payload: Record<string, unknown> = {
      deviceId,
      locale: args.locale,
      platform: Platform.OS,
      pushGranted: push.granted,
      pushToken: push.token,
      email: args.email?.trim() || null,
      subscribedAt: serverTimestamp(),
    };

    await setDoc(doc(db, 'launch_subscribers', deviceId), payload, { merge: true });
    await AsyncStorage.setItem(SUBSCRIBED_KEY, '1');

    return {
      ok: true,
      pushGranted: push.granted,
      emailSavedOnly: !push.granted && !!args.email,
    };
  } catch (e: any) {
    return {
      ok: false,
      pushGranted: false,
      error: e?.message || 'unknown_error',
    };
  }
}
