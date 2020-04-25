import {AppSagaIterator} from 'store';
import {fork} from 'redux-saga/effects';
import {saga as demoSaga} from './slices/demoSaga';

function* rootSaga(): AppSagaIterator {
  yield fork(demoSaga);
}

export default rootSaga;
