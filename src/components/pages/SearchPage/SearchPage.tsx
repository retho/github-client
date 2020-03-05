import React, { useEffect } from 'react';
import './style.scss';
import i18n from './i18n';
import { useLocale } from 'utils/useLocale';
import { useDispatch, useSelector } from 'react-redux';
import { searchRepository } from 'store/slices/search';
import { RootState } from 'store';

export interface ISearchPageProps {
  q?: string;
}
const SearchPage: React.FC<ISearchPageProps> = ({ q }) => {
  const locale = useLocale(i18n);
  const dispatch = useDispatch();

  const resultsCount = useSelector(
    (state: RootState) => state.search.resultsCount
  );

  useEffect(() => {
    if (q) {
      dispatch(searchRepository({ q, first: 30 }));
    }
  }, [q]);

  return (
    <div className="SearchPage">
      <h1>{resultsCount ? locale.resultsFound(resultsCount) : '...'}</h1>
    </div>
  );
};

export default SearchPage;
