import React from 'react';
import './style.scss';
import i18n from './i18n';
import {useLocale} from 'utils/i18n';
import {useDispatch} from 'react-redux';
import {throwSyntheticError} from 'store/epics';
import GraphqlExplorer from 'components/organisms/GraphqlExplorer';

const HomePage: React.FC = () => {
  const locale = useLocale(i18n);
  const dispatch = useDispatch();

  const throwSyntError = () => {
    dispatch(throwSyntheticError());
  };

  return (
    <div className="HomePage">
      <h1>{locale.title}</h1>
      <button onClick={throwSyntError}>throw unexpected error</button>
      <div className="HomePage__graphql-explorer">
        <GraphqlExplorer />
      </div>
    </div>
  );
};

export default HomePage;
