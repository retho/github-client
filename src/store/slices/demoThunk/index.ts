import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getSliceName} from 'utils/redux';
import {AppThunk} from 'store';
import {queryLoadData} from './gql';
import {sleep} from 'utils/async';

const sliceName = getSliceName('demoThunk');

interface II18nState {
  fetching: number;
  data: null | string;
  error: null | string;
}

const defaultState: II18nState = {
  fetching: 0,
  data: null,
  error: null,
};
const slice = createSlice({
  name: sliceName,
  initialState: defaultState,
  reducers: {
    fetchingUp: (state) => ({...state, fetching: state.fetching + 1}),
    fetchingDown: (state) => ({...state, fetching: state.fetching - 1}),
    setData: (state, {payload}: PayloadAction<null | string>) => ({
      ...state,
      data: payload,
      error: null,
    }),
    setError: (state, {payload}: PayloadAction<null | string>) => ({
      ...state,
      data: null,
      error: payload,
    }),
  },
});
const {fetchingUp, fetchingDown, setData, setError} = slice.actions;
export default slice.reducer;

export const loadData = (): AppThunk => async (dispatch, getState, {ajax}) => {
  dispatch(fetchingUp());

  dispatch(setData(null));
  dispatch(setError(null));
  await sleep(1500);
  const reply = await ajax(queryLoadData({}));
  if (reply.kind === 'success') {
    dispatch(setData(reply.data.data.viewer.login));
  } else if (reply.kind === 'api-error') {
    dispatch(setError('Api error'));
  } else {
    dispatch(setError('Unknown error'));
  }

  dispatch(fetchingDown());
};
