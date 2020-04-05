import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSliceName } from 'utils/redux';

const sliceName = getSliceName('theme');

export enum Theme {
  light = 'light',
  dark = 'dark',
}
interface II18nState {
  theme: Theme;
}

const defaultState: II18nState = {
  theme: Theme.light,
};
const slice = createSlice({
  name: sliceName,
  initialState: defaultState,
  reducers: {
    switchTheme: (state, { payload }: PayloadAction<Theme>) => ({
      ...state,
      theme: payload,
    }),
  },
});
export const { switchTheme } = slice.actions;
export default slice.reducer;
