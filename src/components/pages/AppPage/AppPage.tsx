import React from 'react';
import cn from 'classnames';
import './style.scss';
import SvgIcon from 'components/atoms/SvgIcon';
import LangToggler from 'components/molecules/LangToggler';
import i18n from './i18n';
import { useLocale } from 'utils/useLocale';
import { Link } from 'react-router-dom';
import { stringifyRoute } from 'utils/router';
import { routes } from 'router';

const AppPage: React.FC = () => {
  const locale = useLocale(i18n);

  return (
    <div className="AppPage">
      <header className="AppPage-header">
        <Link
          className={cn('AppPage-header__link', 'AppPage-header__link--icon')}
          to={stringifyRoute(routes.root, null)}
        >
          <SvgIcon
            type="octicon-mark-github"
            className="AppPage-header__icon"
          />
        </Link>
        <input
          placeholder={locale.searchPlaceholder}
          className="AppPage-header__search-input"
        />
        <Link
          className="AppPage-header__link"
          to={stringifyRoute(routes.icons, null)}
        >
          Icons
        </Link>
        <LangToggler className="AppPage-header__lang-toggler" />
      </header>
      <div className="AppPage-body">
        <h1>{locale.searchCount(108)}</h1>
      </div>
    </div>
  );
};

export default AppPage;
