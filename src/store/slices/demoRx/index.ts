import {createSlice, PayloadAction, createAction} from '@reduxjs/toolkit';
import {getSliceName} from 'utils/redux';
import {AppEpic} from 'store';
import {filter, map, concatAll, take} from 'rxjs/operators';
import {from, of, race, timer} from 'rxjs';
import {queryLoadData} from './gql';

const sliceName = getSliceName('demoRx');

interface IState {
  fetching: number;
  data: null | string;
  error: null | string;
}

const defaultState: IState = {
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

export const loadData = createAction<null>(`${sliceName}/loadData`);
export const cancelLoadingData = createAction<null>(`${sliceName}/cancelLoadingData`);
export const epicDemoRxLoadData: AppEpic = (action$, state$, {ajax}) =>
  action$.pipe(
    filter(loadData.match),
    map(() =>
      from([
        of(fetchingUp()),
        of(setData(null)),
        of(setError(null)),
        race(
          action$.pipe(
            filter(cancelLoadingData.match),
            take(1),
            map(() => setError('Cancelled by user.'))
          ),
          timer(1500).pipe(
            map(() => ajax(queryLoadData({}))),
            concatAll(),
            map((reply) => {
              if (reply.kind === 'success') {
                return setData(reply.data.data.viewer.login);
              }
              return setError('Request error.');
            })
          )
        ),
        of(fetchingDown()),
      ]).pipe(concatAll())
    ),
    concatAll()
  );
