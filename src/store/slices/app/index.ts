import {createSlice} from '@reduxjs/toolkit';
import {getSliceName} from 'utils/redux';

const sliceName = getSliceName('app');

type AppState = {
  crashed: boolean;
};
const defaultState: AppState = {
  crashed: false,
};

const resetReducer = (state: AppState): AppState => ({...defaultState, crashed: state.crashed});

const slice = createSlice({
  name: sliceName,
  initialState: defaultState,
  reducers: {
    reset: resetReducer,
    setAppCrashed: (state) => ({
      ...state,
      crashed: true,
    }),
  },
});

export const {reset, setAppCrashed} = slice.actions;
export default slice.reducer;
