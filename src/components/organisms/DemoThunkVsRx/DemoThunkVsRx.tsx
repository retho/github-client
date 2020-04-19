import React from 'react';
import './style.scss';
import {useSelector} from 'utils/redux';
import {useDispatch} from 'react-redux';
import {
  loadData as loadDataRx,
  cancelLoadingData as cancelLoadingDataRx,
} from 'store/slices/demoRx';
import {loadData as loadDataThunk} from 'store/slices/demoThunk';

export interface IDemoThunkVsRxProps {}
const DemoThunkVsRx: React.FC<IDemoThunkVsRxProps> = () => {
  const dispatch = useDispatch();

  const isLoadingRx = useSelector((state) => !!state.demoRx.fetching);
  const userLoginRx = useSelector((state) => state.demoRx.data);
  const loadingErrorRx = useSelector((state) => state.demoRx.error);

  const isLoadingThunk = useSelector((state) => !!state.demoThunk.fetching);
  const userLoginThunk = useSelector((state) => state.demoThunk.data);
  const loadingErrorThunk = useSelector((state) => state.demoThunk.error);

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
    </div>
  );
};

export default DemoThunkVsRx;
