import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LocaleLang} from 'constants/locale';
import {empty} from 'rxjs';
import {AppEpic} from 'store';
import {getSliceName} from 'utils/redux';
import {logout} from '../auth';

const sliceName = getSliceName('counter');

type State = {
  lang: LocaleLang;
};

const defaultState: State = {
  lang: LocaleLang.en,
};
const slice = createSlice({
  name: sliceName,
  initialState: defaultState,
  reducers: {
    switchLang: (state, {payload}: PayloadAction<LocaleLang>) => ({
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
