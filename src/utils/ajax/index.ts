import {genAjax} from './ajax';
import {useStore} from 'react-redux';
import {useMemo} from 'react';

export {rawQuery, jsonQuery, gqlQuery} from './queries';

export {genAjax};

export const useAjax = () => {
  const store = useStore();
  const ajax = useMemo(() => genAjax(store), []);
  return ajax;
};
