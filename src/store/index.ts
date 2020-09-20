import {configureStore, Action, getDefaultMiddleware} from '@reduxjs/toolkit';
import {ThunkAction} from 'redux-thunk';
import {from} from 'rxjs';
import {createEpicMiddleware, Epic} from 'redux-observable';

import rootEpic from './rootEpic';
import rootReducer from './rootReducer';
import {genAjax} from 'utils/ajax';
import {Ajax, AjaxRequest} from 'utils/ajax/ajax';

export type MiddlewareDeps = {
  ajax: Ajax;
};

const thunkExtraArgument: MiddlewareDeps = {
  ajax: (null as unknown) as Ajax,
};
const rxDependencies = {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  ajax: (null as unknown) as typeof rxAjax,
};

const epicMiddleware = createEpicMiddleware<Action<unknown>, Action<unknown>, RootState>({
  dependencies: rxDependencies,
});

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
const rxAjax = <D>(params: AjaxRequest<D>) => from(bindedAjax(params));

thunkExtraArgument.ajax = genAjax(store);
rxDependencies.ajax = rxAjax;

epicMiddleware.run(rootEpic);

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, typeof thunkExtraArgument, Action<string>>;
export type AppEpicDeps = typeof rxDependencies;
export type AppEpic = Epic<Action, Action, RootState, AppEpicDeps>;

export default store;
