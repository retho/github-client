import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const sliceName = 'counter';

export enum SupportedLang {
  en = 'en',
  ru = 'ru',
}
interface II18nState {
  lang: SupportedLang;
}

const defaultState: II18nState = {
  lang: SupportedLang.en,
};
const slice = createSlice({
  name: sliceName,
  initialState: defaultState,
  reducers: {
    switchLang: (state, { payload }: PayloadAction<SupportedLang>) => ({
      ...state,
      lang: payload,
    }),
  },
});
export const { switchLang } = slice.actions;
export default slice.reducer;
