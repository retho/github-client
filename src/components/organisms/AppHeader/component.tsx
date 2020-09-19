import React, {useState, useEffect} from 'react';
import cn from 'classnames';
import './style.scss';
import SvgIcon from 'components/atoms/SvgIcon';
import LangToggler from 'components/molecules/LangToggler';
import i18n from './i18n';
import {useLocale} from 'utils/i18n';
import {Link, useHistory} from 'react-router-dom';
import {stringifyRoute} from 'utils/router';
import {routes} from 'router';
import {useDispatch} from 'react-redux';
import {useSelector} from 'utils/redux';
import {logout} from 'store/epics';
import {getUserInfo} from 'store/slices/auth';
import ExternalLink from 'components/atoms/ExternalLink';

export type AppHeaderProps = {
  className?: string;
};
const AppHeader: React.FC<AppHeaderProps> = (props) => {
  const locale = useLocale(i18n);

  const history = useHistory();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth.userInfo);

  const [search, setSearch] = useState('');
  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.which === 13) {
      // * enter
      history.push(stringifyRoute(routes.search, null, {q: search}));
    }
  };

  const handleSignout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <header className={cn('AppHeader', props.className)}>
      <Link
        className={cn('AppHeader__link', 'AppHeader__link--icon')}
        to={stringifyRoute(routes.root, null, null)}
      >
        <SvgIcon type="octicon-mark-github" className="AppHeader__icon" />
      </Link>
      <input
        placeholder={locale.searchPlaceholder}
        className="AppHeader__search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={handleInputKeyPress}
      />
      <ExternalLink className="AppHeader__link" href="https://developer.github.com/v4/explorer/">
        GraphQL Explorer
      </ExternalLink>
      <Link className="AppHeader__link" to={stringifyRoute(routes.icons, null, null)}>
        {locale.icons}
      </Link>
      <div className="AppHeader__right-panel">
        <div className="AppHeader__login">{userInfo?.login}</div>
        <LangToggler className="AppHeader__lang-toggler" />
        <SvgIcon
          className="AppHeader__icon AppHeader__icon--logout"
          type="octicon-sign-out"
          onClick={handleSignout}
        />
      </div>
    </header>
  );
};

export default AppHeader;