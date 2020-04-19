import {createSlice, PayloadAction, createAction} from '@reduxjs/toolkit';
import {getSliceName} from 'utils/redux';
import {AppEpic} from 'store';
import {filter, map, catchError, concatAll, take} from 'rxjs/operators';
import {from, of, throwError, race, timer} from 'rxjs';
import {queryLoadData} from './gql';
import {handleAjaxErrorRx, GithubApiError} from 'utils/ajax';

const sliceName = getSliceName('demoRx');

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
            map(() => ajax(state$)(queryLoadData({}))),
            concatAll(),
            map(([x]) => setData(x.data.viewer.login)),
            catchError((err) => {
              if (err instanceof GithubApiError) {
                return of(setError('Api error.')); // TODO need handle 401 Unauthorized
              }
              return throwError(err);
            }),
            catchError(handleAjaxErrorRx)
          )
        ),
        of(fetchingDown()),
      ]).pipe(concatAll())
    ),
    concatAll()
  );
