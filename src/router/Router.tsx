import React, {useMemo, FC} from 'react';
import routes from './routes';
import {useLocation} from 'react-router-dom';
import {useSelector} from 'utils/redux';
import GlobalMessagesWrapper from 'components/organisms/GlobalMessagesWrapper';
import AuthPage from 'components/pages/AuthPage';
import {useThemeProvider} from './hooks';
import {matchRoute} from 'utils/router';
import {Empty} from './core';

const notFoundRoute = <div>404 Route not found</div>;

interface IRouteContext {
  isAuthorized: boolean;
}
const getCurrentRoute = (context: IRouteContext, path: string, search: string) => {
  if (!context.isAuthorized) {
    return <AuthPage />;
  }
  for (const r of Object.values(routes)) {
    const matched = matchRoute<string | Empty, string | Empty>(r, path, search);

    if (matched) {
      const [params, query] = matched;
      return r.render(params, query);
    }
  }
  return null;
};

const Router: FC = () => {
  useThemeProvider();

  const location = useLocation();
  const isAuthorized = useSelector((state) => !!state.auth.token);

  const route = useMemo(() => getCurrentRoute({isAuthorized}, location.pathname, location.search), [
    location.pathname,
    location.search,
    isAuthorized,
  ]);

  return (
    <>
      {route || notFoundRoute}
      <GlobalMessagesWrapper />
    </>
  );
};

export default Router;
