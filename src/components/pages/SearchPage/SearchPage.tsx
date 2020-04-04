import React, { useEffect } from 'react';
import './style.scss';
import i18n from './i18n';
import { useLocale } from 'utils/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { searchRepository } from 'store/slices/search';
import { RootState } from 'store';
import { useFormik } from 'formik';
import { compact } from 'lodash-es';
import { stringifyRoute } from 'utils/router';
import { routes } from 'router';

interface ISearchFilters {
  search?: string;
  owners?: string;
  language?: string;
}

interface IFormikValues extends ISearchFilters {}

const filters2query = ({ search, owners, language }: ISearchFilters) =>
  compact([
    search,
    owners && `owners:${owners}`,
    language && `language:${language}`,
  ])
    .join('+')
    .toLowerCase();

export interface ISearchPageProps {
  filters: ISearchFilters;
}
const SearchPage: React.FC<ISearchPageProps> = ({ filters }) => {
  const locale = useLocale(i18n);
  const dispatch = useDispatch();
  const history = useHistory();

  const isFetching = useSelector((state: RootState) => !!state.search.fetching);
  const resultsCount = useSelector(
    (state: RootState) => state.search.resultsCount
  );

  useEffect(() => {
    if (filters.search) {
      dispatch(searchRepository({ q: filters2query(filters), first: 30 }));
    }
  }, [filters]);

  const formik = useFormik<IFormikValues>({
    initialValues: filters,
    onSubmit: (values) => {
      history.push(
        stringifyRoute(routes.search, null, {
          ...values,
          language: values.language === 'any' ? undefined : values.language,
        })
      );
    },
  });

  return (
    <div className="SearchPage">
      <form
        className="SearchPage-form SearchPage__form"
        onSubmit={formik.handleSubmit}
      >
        <div className="SearchPage-form__search">
          <label>Advanced search</label>
          <input
            name="search"
            placeholder="Search GitHub"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.search}
          />
          <button type="submit">Search</button>
        </div>
        <div>
          <div className="SearchPage-advanced-item SearchPage-form__advanced-item">
            <label>From these owners</label>
            <input
              placeholder="github, atom, electron, octokit"
              name="owners"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.owners}
            />
          </div>
          <div className="SearchPage-advanced-item SearchPage-form__advanced-item">
            <label>Written in this language</label>
            <select
              name="language"
              onChange={formik.handleChange}
              value={formik.values.language}
            >
              <option value="any">Any</option>
              <option value="c">C</option>
              <option value="haskell">Haskell</option>
            </select>
          </div>
        </div>
      </form>
      <div className="SearchPage-results SearchPage__results">
        <h1>{!isFetching ? locale.resultsFound(resultsCount) : '...'}</h1>
      </div>
    </div>
  );
};

export default SearchPage;
