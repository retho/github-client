import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'utils/redux';
import { Theme, switchTheme } from 'store/slices/theme';

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const setTheme = useCallback((theme: Theme) => {
    dispatch(switchTheme(theme));
  }, []);
  return [theme, setTheme] as const;
};
