import { combineEpics } from 'redux-observable';
import { epicSearchRepository } from './slices/search';
import { AppEpic } from 'store';
import { catchError, mergeAll } from 'rxjs/operators';
import freeEpics from './epics';
import { epicUserInfo } from './slices/auth';
import { from, of } from 'rxjs';
import { epicShowMessage, showMessage } from './slices/globalMessages';

const rootEpic: AppEpic = (action$, ...rest) =>
  combineEpics(
    freeEpics,
    epicSearchRepository,
    epicUserInfo,
    epicShowMessage
  )(action$, ...rest).pipe(
    catchError((
      _,
      source // ! stateful epics may lose state in the restart
    ) =>
      from([
        of(
          showMessage({
            hideIn: null,
            message: {
              type: 'error',
              title: 'Unexpected error',
              description:
                'Application may not work properly. Please reload the page.',
            },
          })
        ),
        source,
      ]).pipe(mergeAll())
    )
  );

export default rootEpic;
