import {configureStore, Action, getDefaultMiddleware} from '@reduxjs/toolkit';
import {ThunkAction} from 'redux-thunk';
import {BehaviorSubject, from} from 'rxjs';
import {createEpicMiddleware, Epic} from 'redux-observable';
import {switchMap} from 'rxjs/operators';

import rootEpic from './rootEpic';
import rootReducer from './rootReducer';
import {genAjax} from 'utils/ajax';
import {Ajax, IAjaxRequest} from 'utils/ajax/ajax';

export interface IMiddlewareDeps {
  ajax: Ajax;
}

const thunkExtraArgument: IMiddlewareDeps = {
  ajax: null as any,
};
const rxDependencies = {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  ajax: (null as any) as typeof rxAjax,
};
const sagaContext: IMiddlewareDeps = {
  ajax: null as any,
};

const epicMiddleware = createEpicMiddleware({dependencies: rxDependencies});

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      thunk: {
        extraArgument: thunkExtraArgument,
      },
    }),
    epicMiddleware,
  ],
});

const bindedAjax = genAjax(store);
const rxAjax = <D>(params: IAjaxRequest<D>) => from(bindedAjax(params));

thunkExtraArgument.ajax = genAjax(store);
rxDependencies.ajax = rxAjax;
sagaContext.ajax = genAjax(store);

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
    // ! `window.location.reload()` is better option
    const nextRootEpic = require('./rootEpic').default;
    epic$.next(nextRootEpic);
  });
}

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, typeof thunkExtraArgument, Action<string>>;
export type AppEpicDeps = typeof rxDependencies;
export type AppSagaContext = typeof sagaContext;
export type AppEpic = Epic<Action, Action, RootState, AppEpicDeps>;

export default store;
