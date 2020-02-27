import React from 'react';
import './style.scss';
import i18n from './i18n';
import { useLocale } from 'utils/useLocale';

export interface ISearchPageProps {}
const SearchPage: React.FC<ISearchPageProps> = () => {
  const locale = useLocale(i18n);

  return (
    <div className="SearchPage">
      <h1>{locale.resultsFound(128)}</h1>
    </div>
  );
};

export default SearchPage;
