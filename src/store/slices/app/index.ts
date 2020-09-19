import {createSlice} from '@reduxjs/toolkit';
import {empty} from 'rxjs';
import {AppEpic} from 'store';
import {getSliceName} from 'utils/redux';
import {logout} from '../auth';

const sliceName = getSliceName('app');

type State = {
  crashed: boolean;
};
const defaultState: State = {
  crashed: false,
};

const resetReducer = (state: State): State => ({...defaultState, crashed: state.crashed});

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
  extraReducers: {
    [logout.type]: resetReducer,
  },
});

export const {reset, setAppCrashed} = slice.actions;
export default slice.reducer;

export const epic: AppEpic = () => empty();
