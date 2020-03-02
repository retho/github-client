import React, { useState } from 'react';
import cn from 'classnames';
import './style.scss';
import SvgIcon from 'components/atoms/SvgIcon';
import LangToggler from 'components/molecules/LangToggler';
import i18n from './i18n';
import { useLocale } from 'utils/useLocale';
import { Link, useHistory } from 'react-router-dom';
import { stringifyRoute } from 'utils/router';
import { routes } from 'router';

export interface IAppHeaderProps {
  className?: string;
}
const AppHeader: React.FC<IAppHeaderProps> = ({ className }) => {
  const locale = useLocale(i18n);

  const history = useHistory();

  const [search, setSearch] = useState('');
  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.which === 13) {
      // * enter pressed
      history.push(stringifyRoute(routes.search, null, { q: search }));
    }
  };

  return (
    <header className={cn('AppHeader', className)}>
      <Link
        className={cn('AppPage-header__link', 'AppPage-header__link--icon')}
        to={stringifyRoute(routes.root, null, null)}
      >
        <SvgIcon type="octicon-mark-github" className="AppPage-header__icon" />
      </Link>
      <input
        placeholder={locale.searchPlaceholder}
        className="AppPage-header__search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={handleInputKeyPress}
      />
      <Link
        className="AppPage-header__link"
        to={stringifyRoute(routes.icons, null, null)}
      >
        {locale.icons}
      </Link>
      <LangToggler className="AppPage-header__lang-toggler" />
    </header>
  );
};

export default AppHeader;
