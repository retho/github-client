import {useSelector} from 'utils/redux';
import {useMemo} from 'react';
import {LocaleLang} from 'constants/locale';

type Vocabulary<V> = Record<LocaleLang, V>;
type I18nConfig<T> = Vocabulary<T>;

export const useLocale = <T>(config: I18nConfig<T>): T => {
  const lang = useSelector((state) => state.i18n.lang);
  return useMemo(() => config[lang], [config, lang]);
};
