import {createAction} from '@reduxjs/toolkit';
import {AppEpic} from 'store';
import {filter, tap, concatAll, mapTo, map, mergeAll} from 'rxjs/operators';
import {from, throwError} from 'rxjs';
import {combineEpics} from 'redux-observable';
import {reset as resetAuth} from 'store/slices/auth';
import {reset as resetSearch} from 'store/slices/search';

export const logout = createAction<void>('logout');
export const epicLogout: AppEpic = (action$) =>
  action$.pipe(
    filter(logout.match),
    tap(() => {
      localStorage.clear();
    }),
    mapTo(from([resetAuth(), resetSearch()])),
    concatAll()
  );

export const throwSyntheticError = createAction<void>('throwSyntheticError');
export const epicSyntheticError: AppEpic = (action$) =>
  action$.pipe(
    filter(throwSyntheticError.match),
    map(() => throwError(new Error('synthetic-error epic'))),
    mergeAll()
  );

export default combineEpics(epicLogout, epicSyntheticError);
