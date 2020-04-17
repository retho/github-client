import {useEffect} from 'react';
import {useSelector} from 'utils/redux';

export const useThemeProvider = () => {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    document.body.classList.add('q-theme-provider');
    return () => document.body.classList.remove('q-theme-provider');
  }, []);
  useEffect(() => {
    document.body.classList.add(`q-theme-provider--${theme}`);
    return () => document.body.classList.remove(`q-theme-provider--${theme}`);
  }, [theme]);
};
