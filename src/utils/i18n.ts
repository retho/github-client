import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { useMemo } from 'react';
import { SupportedLang } from 'store/slices/i18n';

type Vocabulary<V> = Record<SupportedLang, V>;

interface II18nConfig {
  [K: string]:
    | Vocabulary<string>
    | Vocabulary<(payload: any) => string>
    | Vocabulary<(payload: any) => JSX.Element>;
}

type Locale<I18n extends II18nConfig> = {
  [K in keyof I18n]: I18n[K] extends Vocabulary<infer J> ? J : never;
};

const getLocale = <I18n extends II18nConfig>(
  config: I18n,
  lang: SupportedLang
): Locale<I18n> => {
  const acc = {} as any;
  for (const key in config) {
    acc[key] = config[key][lang];
  }
  return acc;
};

export const useLocale = <I18n extends II18nConfig>(
  config: I18n
): Locale<I18n> => {
  const lang = useSelector((state: RootState) => state.i18n.lang);
  return useMemo(() => getLocale(config, lang), [config, lang]);
};
