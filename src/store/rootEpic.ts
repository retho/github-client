import {combineEpics} from 'redux-observable';
import {AppEpic} from 'store';
import {catchError} from 'rxjs/operators';
import {from} from 'rxjs';
import {showMessage} from './slices/globalMessages';
import {setAppCrashed} from './slices/app';
import {epic as epicApp} from './slices/app';
import {epic as epicAuth} from './slices/auth';
import {epic as epicGlobalMessages} from './slices/globalMessages';
import {epic as epicI18n} from './slices/i18n';
import {epic as epicSearch} from './slices/search';
import {epic as epicTheme} from './slices/theme';

const rootEpic: AppEpic = (action$, ...rest) =>
  combineEpics(
    epicApp,
    epicAuth,
    epicGlobalMessages,
    epicI18n,
    epicSearch,
    epicTheme
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
