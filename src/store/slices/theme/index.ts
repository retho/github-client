import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {empty} from 'rxjs';
import {AppEpic} from 'store';
import {getSliceName} from 'utils/redux';
import {logout} from '../auth';

const sliceName = getSliceName('theme');

export enum Theme {
  light = 'light',
  dark = 'dark',
}
type State = {
  theme: Theme;
};

const defaultState: State = {
  theme: Theme.light,
};
const slice = createSlice({
  name: sliceName,
  initialState: defaultState,
  reducers: {
    switchTheme: (state, {payload}: PayloadAction<Theme>) => ({
      ...state,
      theme: payload,
    }),
  },
  extraReducers: {
    [logout.type]: () => defaultState,
  },
});
export const {switchTheme} = slice.actions;
export default slice.reducer;

export const epic: AppEpic = () => empty();
