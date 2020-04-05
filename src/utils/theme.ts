import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import { Theme, switchTheme } from 'store/slices/theme';

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const setTheme = useCallback((theme: Theme) => {
    dispatch(switchTheme(theme));
  }, []);
  return [theme, setTheme] as const;
};
