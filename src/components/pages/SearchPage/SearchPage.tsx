import React, {useEffect} from 'react';
import './style.scss';
import i18n from './i18n';
import {useLocale} from 'utils/i18n';
import {useDispatch} from 'react-redux';
import {useSelector} from 'utils/redux';
import {useHistory} from 'react-router';
import {searchRepository} from 'store/slices/search';
import {useFormik} from 'formik';
import {compact, identity, pickBy} from 'lodash-es';
import {stringifyRoute} from 'utils/router';
import {routes} from 'router';
import SvgIcon from 'components/atoms/SvgIcon';
import MainLayout from 'components/templates/MainLayout';
import {Link} from 'react-router-dom';

interface ISearchFilters {
  q?: string;
  owners?: string;
  language?: string;
}

interface IFormikValues extends ISearchFilters {}

const filters2query = ({q, owners, language}: ISearchFilters) =>
  compact([q, owners && `owners:${owners}`, language && `language:${language}`])
    .join('+')
    .toLowerCase();

export interface ISearchPageProps {
  filters: ISearchFilters;
  advanced?: boolean;
}
const SearchPage: React.FC<ISearchPageProps> = ({filters, advanced}) => {
  const locale = useLocale(i18n);
  const dispatch = useDispatch();
  const history = useHistory();

  const isFetching = useSelector((state) => !!state.search.fetching);
  const resultsCount = useSelector((state) => state.search.resultsCount);
  const foundRepos = useSelector((state) => state.search.list);

  useEffect(() => {
    if (filters.q) {
      dispatch(searchRepository({q: filters2query(filters), first: 10}));
    }
  }, [filters]);

  const formik = useFormik<IFormikValues>({
    initialValues: filters,
    onSubmit: (values) => {
      history.push(
        stringifyRoute(
          routes.search,
          null,
          pickBy(
            {
              ...values,
              language: values.language === 'any' ? undefined : values.language,
            },
            identity
          )
        )
      );
    },
  });

  return (
    <MainLayout>
      <div className="SearchPage">
        <form className="SearchPage-form SearchPage__form" onSubmit={formik.handleSubmit}>
          <div className="SearchPage-form__search">
            <label>
              {advanced ? (
                'Advanced search'
              ) : (
                <Link to={stringifyRoute(routes.searchAdvanced, null, filters)}>
                  Advanced search
                </Link>
              )}
            </label>
            <input
              name="q"
              placeholder="Search GitHub"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.q}
            />
            <button type="submit">Search</button>
          </div>
          {advanced && (
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
          )}
        </form>
        {!advanced && (
          <div className="SearchPage-results SearchPage__results">
            <h1>{!isFetching ? locale.resultsFound(resultsCount) : '...'}</h1>
            <div className="SearchPage-results__list">
              {foundRepos.map((x) => (
                <div key={x.id} className="SearchPage-result-item SearchPage-results__list-item">
                  <div className="SearchPage-result-item__icon">
                    <SvgIcon type="octicon-repo" />
                  </div>
                  <div>
                    <div className="SearchPage-result-item__title">
                      <a href={x.url} target="_blank" rel="noopener noreferrer">
                        {x.nameWithOwner}
                      </a>
                    </div>
                    <div className="SearchPage-result-item__description">{x.description}</div>
                    <div className="SearchPage-result-item__topics">
                      {x.repositoryTopics.nodes.map((y) => (
                        <a
                          key={y.url}
                          href={y.url}
                          className="SearchPage-topic-tag"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {y.topic.name}
                        </a>
                      ))}
                    </div>
                    <div className="SearchPage-result-item__meta-info">
                      <SvgIcon type="octicon-star" /> {x.stargazers.totalCount}
                      {x.primaryLanguage && (
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{x.primaryLanguage.name}</span>
                      )}
                      {x.licenseInfo && (
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{x.licenseInfo.name}</span>
                      )}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Updated at {x.updatedAt}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default SearchPage;
