// ═══════════════════════════════════════════════════════════════
//  I18N — Multilingue FR / EN
//
//  Detection auto au 1er lancement (device locale → fr ou en).
//  L'utilisateur peut basculer manuellement via le toggle dans
//  l'onglet Compte. Sauvegarde de la pref en AsyncStorage.
//
//  Usage :
//    import { useT } from '../i18n';
//    const { t, locale, setLocale } = useT();
//    <Text>{t('home.hero.title')}</Text>
// ═══════════════════════════════════════════════════════════════

import { createContext, useContext, useEffect, useState, ReactNode, createElement } from 'react';
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fr } from './locales/fr';
import { en } from './locales/en';

export type Locale = 'fr' | 'en';

const i18n = new I18n({ fr, en });
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

const STORAGE_KEY = 'app:locale';

function detectInitialLocale(): Locale {
  try {
    const locales = Localization.getLocales?.() ?? [];
    const code = locales[0]?.languageCode ?? 'en';
    return code === 'fr' ? 'fr' : 'en';
  } catch {
    return 'en';
  }
}

// ── Context ─────────────────────────────────────────────────────
interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => Promise<void>;
  ready: boolean;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'en',
  setLocale: async () => {},
  ready: false,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        const initial: Locale = stored === 'fr' || stored === 'en'
          ? (stored as Locale)
          : detectInitialLocale();
        i18n.locale = initial;
        setLocaleState(initial);
      } catch {
        const fallback = detectInitialLocale();
        i18n.locale = fallback;
        setLocaleState(fallback);
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const setLocale = async (l: Locale) => {
    i18n.locale = l;
    setLocaleState(l);
    try { await AsyncStorage.setItem(STORAGE_KEY, l); } catch {}
  };

  return createElement(LocaleContext.Provider, { value: { locale, setLocale, ready } }, children);
}

export function useT() {
  const { locale, setLocale, ready } = useContext(LocaleContext);
  const t = (key: string, params?: Record<string, any>) => i18n.t(key, params);
  return { t, locale, setLocale, ready };
}

/** Get text for a statement that has dual-language fields */
export function getStmtText(
  stmt: { txt?: string; txtEn?: string },
  locale: Locale,
): string {
  if (locale === 'en') return stmt.txtEn ?? stmt.txt ?? '';
  return stmt.txt ?? '';
}

/** Get type info text in current locale (with fallback) */
export function getTypeText(
  type: { name: string; nameEn?: string; nick: string; nickEn?: string;
          fear: string; fearEn?: string; motive: string; motiveEn?: string;
          compul: string; compulEn?: string },
  field: 'name' | 'nick' | 'fear' | 'motive' | 'compul',
  locale: Locale,
): string {
  if (locale === 'en') {
    const enField = `${field}En` as 'nameEn' | 'nickEn' | 'fearEn' | 'motiveEn' | 'compulEn';
    return type[enField] ?? type[field];
  }
  return type[field];
}
