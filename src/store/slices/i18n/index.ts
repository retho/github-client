import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {empty} from 'rxjs';
import {AppEpic} from 'store';
import {getSliceName} from 'utils/redux';
import {logout} from '../auth';

const sliceName = getSliceName('counter');

export enum SupportedLang {
  en = 'en',
  ru = 'ru',
}
type State = {
  lang: SupportedLang;
};

const defaultState: State = {
  lang: SupportedLang.en,
};
const slice = createSlice({
  name: sliceName,
  initialState: defaultState,
  reducers: {
    switchLang: (state, {payload}: PayloadAction<SupportedLang>) => ({
      ...state,
      lang: payload,
    }),
  },
  extraReducers: {
    [logout.type]: () => defaultState,
  },
});
export const {switchLang} = slice.actions;
export default slice.reducer;

export const epic: AppEpic = () => empty();
