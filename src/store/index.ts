import {configureStore, Action, getDefaultMiddleware} from '@reduxjs/toolkit';
import {ThunkAction} from 'redux-thunk';
import {BehaviorSubject} from 'rxjs';
import {createEpicMiddleware, Epic} from 'redux-observable';
import {switchMap} from 'rxjs/operators';

import rootEpic from './rootEpic';
import rootReducer from './rootReducer';
import {rxajax, ajaxCore, Ajax} from 'utils/ajax';
import rootSaga from './rootSaga';
import createSagaMiddleware, {SagaIterator} from 'redux-saga';

export interface IAppSagaContext {
  ajax: Ajax;
  aaa: number;
}

const thunkExtraArgument = {
  ajax: ajaxCore,
};
const rxDependencies = {
  ajax: rxajax,
};
const sagaContext: IAppSagaContext = {
  ajax: null as any,
  aaa: 1414,
};

const epicMiddleware = createEpicMiddleware({dependencies: rxDependencies});
const sagaMiddleware = createSagaMiddleware({context: sagaContext});

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      thunk: {
        extraArgument: thunkExtraArgument,
      },
    }),
    epicMiddleware,
    sagaMiddleware,
  ],
});
sagaContext.ajax = ajaxCore(store.getState);

const epic$ = new BehaviorSubject(rootEpic);
const hotReloadingEpic = (...args: any[]): any =>
  epic$.pipe(switchMap((epic: any) => epic(...args)));

epicMiddleware.run(hotReloadingEpic);
sagaMiddleware.run(rootSaga);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
  module.hot.accept('./rootEpic', () => {
    // ! `window.location.reload()` is better option
    const nextRootEpic = require('./rootEpic').default;
    epic$.next(nextRootEpic);
  });
  module.hot.accept('./rootSaga', () => {
    window.location.reload();
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, typeof thunkExtraArgument, Action<string>>;
export type AppEpicDeps = typeof rxDependencies;
export type AppEpic = Epic<Action, Action, RootState, AppEpicDeps>;
export type AppSagaIterator = SagaIterator;

export default store;
