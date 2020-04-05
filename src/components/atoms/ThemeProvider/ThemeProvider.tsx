import { useEffect } from 'react';
import './style.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

export interface IThemeProviderProps {
  children: JSX.Element;
}
const ThemeProvider = ({ children }: IThemeProviderProps) => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    document.body.classList.add('ThemeProvider');
    return () => document.body.classList.remove('ThemeProvider');
  }, []);
  useEffect(() => {
    document.body.classList.add(`ThemeProvider--${theme}`);
    return () => document.body.classList.remove(`ThemeProvider--${theme}`);
  }, [theme]);

  return children;
};

export default ThemeProvider;
