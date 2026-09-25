// ═══════════════════════════════════════════════════════════════
//  FEEDBACK — "Écrire à Thomas"
//
//  Opens the user's mail app with a prefilled message to Thomas. The app
//  version and OS are appended at the bottom so bug reports are actionable.
//  If no mail app can open, falls back to an alert showing the address.
// ═══════════════════════════════════════════════════════════════

import { Alert, Linking, Platform } from 'react-native';
import Constants from 'expo-constants';

export const FEEDBACK_EMAIL = 'thomas.5sherlock@gmail.com';

type Translate = (key: string, params?: Record<string, any>) => string;

export async function openFeedbackEmail(t: Translate): Promise<void> {
  const version = Constants.expoConfig?.version ?? '';
  const os = Platform.OS === 'ios' ? 'iOS' : Platform.OS;
  const footer = `5herlock ${version} · ${os} ${Platform.Version}`;
  const body = `${t('feedback.bodyIntro')}\n\n\n\n${footer}`;
  const url =
    `mailto:${FEEDBACK_EMAIL}` +
    `?subject=${encodeURIComponent(t('feedback.subject'))}` +
    `&body=${encodeURIComponent(body)}`;
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert(t('feedback.errorTitle'), t('feedback.errorBody', { email: FEEDBACK_EMAIL }));
  }
}
