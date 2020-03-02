import React, { useEffect } from 'react';
import './style.scss';
import i18n from './i18n';
import { useLocale } from 'utils/useLocale';

export interface ISearchPageProps {
  q?: string;
}
const SearchPage: React.FC<ISearchPageProps> = ({ q }) => {
  const locale = useLocale(i18n);

  useEffect(() => {
    console.log(`Request for q=${q}`);
  }, [q]);

  return (
    <div className="SearchPage">
      <h1>{locale.resultsFound(128)}</h1>
    </div>
  );
};

export default SearchPage;
