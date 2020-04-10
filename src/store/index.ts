import {configureStore, Action, getDefaultMiddleware} from '@reduxjs/toolkit';
import {ThunkAction} from 'redux-thunk';
import {BehaviorSubject} from 'rxjs';
import {createEpicMiddleware, Epic} from 'redux-observable';
import {switchMap} from 'rxjs/operators';

import rootEpic from './rootEpic';
import rootReducer from './rootReducer';
import {rxajax} from 'utils/ajax';

const dependencies = {
  ajax: rxajax,
};
const epicMiddleware = createEpicMiddleware({dependencies});
const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), epicMiddleware],
});

const epic$ = new BehaviorSubject(rootEpic);
const hotReloadingEpic = (...args: any[]): any =>
  epic$.pipe(switchMap((epic: any) => epic(...args)));
epicMiddleware.run(hotReloadingEpic);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
  module.hot.accept('./rootEpic', () => {
    const nextRootEpic = require('./rootEpic').default;
    epic$.next(nextRootEpic);
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type AppEpicDeps = typeof dependencies;
export type AppEpic = Epic<Action, Action, RootState, AppEpicDeps>;

export default store;
