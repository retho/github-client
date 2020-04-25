import React from 'react';
import './style.scss';
import {useSelector} from 'utils/redux';
import {useDispatch} from 'react-redux';
import {
  loadData as loadDataRx,
  cancelLoadingData as cancelLoadingDataRx,
} from 'store/slices/demoRx';
import {loadData as loadDataThunk} from 'store/slices/demoThunk';
import {
  loadData as loadDataSaga,
  asyncIncrement as asyncIncrementSaga,
} from 'store/slices/demoSaga';

export interface IDemoThunkVsRxProps {}
const DemoThunkVsRx: React.FC<IDemoThunkVsRxProps> = () => {
  const dispatch = useDispatch();

  const isLoadingRx = useSelector((state) => !!state.demoRx.fetching);
  const userLoginRx = useSelector((state) => state.demoRx.data);
  const loadingErrorRx = useSelector((state) => state.demoRx.error);

  const isLoadingThunk = useSelector((state) => !!state.demoThunk.fetching);
  const userLoginThunk = useSelector((state) => state.demoThunk.data);
  const loadingErrorThunk = useSelector((state) => state.demoThunk.error);

  const isLoadingSaga = useSelector((state) => !!state.demoSaga.fetching);
  const userLoginSaga = useSelector((state) => state.demoSaga.data);
  const loadingErrorSaga = useSelector((state) => state.demoSaga.error);

  const isLoadingCounterSaga = useSelector((state) => !!state.demoSaga.counterFetching);
  const counter = useSelector((state) => state.demoSaga.counter);

  return (
    <div className="DemoThunkVsRx">
      <h2>redux-thunk</h2>
      <div className="DemoThunkVsRx__thunk">
        <button onClick={() => dispatch(loadDataThunk())}>Say hello</button>
        &nbsp;&nbsp;
        {isLoadingThunk && '...'}
        {userLoginThunk && `Hello, ${userLoginThunk}!`}
        {loadingErrorThunk}
      </div>
      <h2>redux-observable</h2>
      <div className="DemoThunkVsRx__rx">
        {isLoadingRx ? (
          <button onClick={() => dispatch(cancelLoadingDataRx(null))}>Cancel</button>
        ) : (
          <button onClick={() => dispatch(loadDataRx(null))}>Say hello</button>
        )}
        &nbsp;&nbsp;
        {isLoadingRx && '...'}
        {userLoginRx && `Hello, ${userLoginRx}!`}
        {loadingErrorRx}
      </div>
      <h2>redux-saga</h2>
      <div className="DemoThunkVsRx__saga">
        <button onClick={() => dispatch(loadDataSaga(null))}>Say hello</button>
        &nbsp;&nbsp;
        {isLoadingSaga && '...'}
        {userLoginSaga && `Hello, ${userLoginSaga}!`}
        {loadingErrorSaga}
      </div>
      <div className="DemoThunkVsRx__saga">
        <button onClick={() => dispatch(asyncIncrementSaga({by: -1}))}>decrement</button>
        &nbsp;&nbsp;
        {isLoadingCounterSaga ? '...' : counter}
        &nbsp;&nbsp;
        <button onClick={() => dispatch(asyncIncrementSaga({by: 1}))}>increment</button>
      </div>
    </div>
  );
};

export default DemoThunkVsRx;
