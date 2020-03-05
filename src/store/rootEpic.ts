import { combineEpics } from 'redux-observable';
import { epicSearchRepository } from './slices/search';
import { AppEpic } from 'store';
import { catchError, concatAll } from 'rxjs/operators';
import { GithubApiError } from 'utils/ajax';
import freeEpics, { logout, logoutOperator } from './epics';
import { epicUserInfo } from './slices/auth';
import { from, of } from 'rxjs';

const rootEpic: AppEpic = (action$, ...rest) =>
  combineEpics(
    freeEpics,
    epicSearchRepository,
    epicUserInfo
  )(action$, ...rest).pipe(
    catchError((error, source) => {
      console.log('epic global error handler', error);
      if (error instanceof GithubApiError) {
        if (error.status === 401) {
          return from([of(logout()).pipe(logoutOperator()), source]).pipe(
            concatAll()
          );
        }
      }
      return source; // ! stateful epics may lose state in the restart
    })
  );

export default rootEpic;
