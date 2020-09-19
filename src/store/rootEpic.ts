import {combineEpics} from 'redux-observable';
import {epicSearchRepository} from './slices/search';
import {AppEpic} from 'store';
import {catchError} from 'rxjs/operators';
import freeEpics from './epics';
import {epicUserInfo} from './slices/auth';
import {from} from 'rxjs';
import {epicShowMessage, showMessage} from './slices/globalMessages';
import {setAppCrashed} from './slices/app';

const rootEpic: AppEpic = (action$, ...rest) =>
  combineEpics(
    freeEpics,
    epicSearchRepository,
    epicUserInfo,
    epicShowMessage
  )(action$, ...rest).pipe(
    catchError((err) => {
      console.error(err);

      return from([
        showMessage({
          hideIn: null,
          message: {
            type: 'error',
            title: 'Unexpected error occured',
            description: 'Application may not work properly. Please reload the page.',
          },
        }),
        setAppCrashed(),
      ]);
    })
  );

export default rootEpic;
