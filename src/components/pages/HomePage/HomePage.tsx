import React, { useEffect } from 'react';
import './style.scss';
import i18n from './i18n';
import { useLocale } from 'utils/i18n';
import { useAjax } from 'utils/ajax';
import { queryUserData } from './gql';
import { useDispatch } from 'react-redux';
import { throwSyntheticError } from 'store/epics';

const HomePage: React.FC = () => {
  const locale = useLocale(i18n);
  const dispatch = useDispatch();

  const loadUserData = useAjax((ajax) => () => ajax(queryUserData()), []);

  useEffect(() => {
    loadUserData().then(console.log);
  }, []);

  const throwSyntError = () => {
    dispatch(throwSyntheticError());
  };

  return (
    <div className="HomePage">
      <h1>{locale.title}</h1>
      <button onClick={throwSyntError}>throw unexpected error</button>
    </div>
  );
};

export default HomePage;
