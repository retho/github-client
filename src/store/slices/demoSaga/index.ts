import {createSlice, PayloadAction, createAction} from '@reduxjs/toolkit';
import {getSliceName} from 'utils/redux';
import {AppSagaIterator, RootState, AppSagaContext} from 'store';
import {put, takeEvery, takeLatest, fork, select, getContext, call} from 'redux-saga/effects';
import {sleep} from 'utils/async';
import {queryLoadData} from './gql';
import {AjaxReply} from 'utils/ajax/ajax';

const sliceName = getSliceName('demoSaga');

interface IState {
  fetching: boolean;
  data: null | string;
  error: null | string;

  counterFetching: number;
  counter: number;
}

const defaultState: IState = {
  fetching: false,
  data: null,
  error: null,
  counterFetching: 0,
  counter: 0,
};
const slice = createSlice({
  name: sliceName,
  initialState: defaultState,
  reducers: {
    fetchingUp: (state) => ({...state, fetching: true}),
    fetchingDown: (state) => ({...state, fetching: false}),
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
    counterFetchingUp: (state) => ({...state, counterFetching: state.counterFetching + 1}),
    counterFetchingDown: (state) => ({...state, counterFetching: state.counterFetching - 1}),
    setCounter: (state, {payload}: PayloadAction<number>) => ({
      ...state,
      counter: payload,
    }),
  },
});
const {
  fetchingUp,
  fetchingDown,
  setData,
  setError,
  counterFetchingUp,
  counterFetchingDown,
  setCounter,
} = slice.actions;
export default slice.reducer;

export const loadData = createAction<null>(`${sliceName}/loadData`);
function* handleLoadData(): AppSagaIterator {
  const ajax: AppSagaContext['ajax'] = yield getContext('ajax');

  yield put(fetchingUp());
  yield put(setData(null));

  const reply: AjaxReply<any> = yield call(ajax, queryLoadData({}));
  if (reply.kind === 'success') {
    yield put(setData(reply.data.data.viewer.login));
  } else {
    yield put(setError('Request error'));
  }

  yield put(fetchingDown());
}
function* watchLoadData(): AppSagaIterator {
  yield takeLatest(loadData.match as any, handleLoadData);
}

export const asyncIncrement = createAction<{by: number}>(`${sliceName}/asyncIncrement`);
const countSelector = (state: RootState) => state.demoSaga.counter;
function* handleAsyncIncrement({payload}: ReturnType<typeof asyncIncrement>) {
  yield put(counterFetchingUp());
  yield sleep(1000);
  const currentCount: ReturnType<typeof countSelector> = yield select(countSelector);
  yield put(setCounter(currentCount + payload.by));
  yield put(counterFetchingDown());
}
function* watchAsyncIncrement(): AppSagaIterator {
  yield takeEvery(asyncIncrement.match as any, handleAsyncIncrement);
}

export function* saga(): AppSagaIterator {
  yield fork(watchLoadData);
  yield fork(watchAsyncIncrement);
}
