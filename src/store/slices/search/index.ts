import {createSlice, PayloadAction, createAction} from '@reduxjs/toolkit';
import {AppEpic} from 'store';
import {filter, map, concatAll} from 'rxjs/operators';
import {from, of, empty} from 'rxjs';
import {queryRepositorySearch, QuerySearchParams, RepositorySearchResultItem} from './gql';
import {getSliceName} from 'utils/redux';

const sliceName = getSliceName('search');

type SearchState = {
  fetching: number;
  resultsCount: number;
  list: RepositorySearchResultItem[];
};

const defaultState: SearchState = {
  fetching: 0,
  resultsCount: 0,
  list: [],
};
const slice = createSlice({
  name: sliceName,
  initialState: defaultState,
  reducers: {
    reset: () => defaultState,
    fetchingUp: (state) => ({
      ...state,
      fetching: state.fetching + 1,
    }),
    fetchingDown: (state) => ({
      ...state,
      fetching: state.fetching - 1,
    }),
    setResults: (
      state,
      {
        payload,
      }: PayloadAction<{
        resultsCount: number;
        list: RepositorySearchResultItem[];
      }>
    ) => ({
      ...state,
      resultsCount: payload.resultsCount,
      list: payload.list,
    }),
  },
});

const {fetchingUp, fetchingDown, setResults} = slice.actions;
export const {reset} = slice.actions;
export default slice.reducer;

export type SearchActionPayload = QuerySearchParams & {};
export const searchRepository = createAction<SearchActionPayload>(`${sliceName}/searchRepository`);
export const epicSearchRepository: AppEpic = (action$, state$, {ajax}) =>
  action$.pipe(
    filter(searchRepository.match),
    map((action) =>
      from([
        of(fetchingUp()),
        ajax(queryRepositorySearch(action.payload)).pipe(
          map((reply) => {
            if (reply.kind === 'success') {
              return of(
                setResults({
                  resultsCount: reply.data.data.search.repositoryCount,
                  list: reply.data.data.search.nodes,
                })
              );
            } else {
              return empty();
            }
          }),
          concatAll()
        ),
        of(fetchingDown()),
      ]).pipe(concatAll())
    ),
    concatAll()
  );
