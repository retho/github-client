import { createAction, Action } from '@reduxjs/toolkit';
import { AppEpic } from 'store';
import { filter, tap, concatAll, mapTo } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { combineEpics } from 'redux-observable';
import { reset as resetAuth } from 'store/slices/auth';
import { reset as resetSearch } from 'store/slices/search';

const logoutEffect = () => {
  localStorage.clear();
};
const logoutActions = () => [resetAuth(), resetSearch()];

export const logout = createAction<void>('logout');
export const logoutOperator = () => (x: Observable<Action<any>>) =>
  x.pipe(
    filter(logout.match),
    tap(logoutEffect),
    mapTo(from(logoutActions())),
    concatAll()
  );
export const epicLogout: AppEpic = (action$) => action$.pipe(logoutOperator());

export default combineEpics(epicLogout);
