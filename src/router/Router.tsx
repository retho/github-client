import React, {useMemo} from 'react';
import routes from './routes';
import UrlPattern from 'url-pattern';
import {useLocation, Redirect} from 'react-router-dom';
import {stringifyRoute} from 'utils/router';
import {parse} from 'querystring';
import {useSelector} from 'utils/redux';
import GlobalMessagesWrapper from 'components/organisms/GlobalMessagesWrapper';
import AuthPage from 'components/pages/AuthPage';
import {useThemeProvider} from './hooks';

const useCoreHooks = () => {
  useThemeProvider();
};

const notFoundRoute = <Redirect to={stringifyRoute(routes.root, null, null)} />;

interface IRouteContext {
  isAuthorized: boolean;
}
const getCurrentRoute = (
  context: IRouteContext,
  currentPath: string,
  queryParams: Record<string, string>
) => {
  if (!context.isAuthorized) {
    return <AuthPage />;
  }
  for (const x of Object.values(routes)) {
    const params = new UrlPattern(x.pattern).match(currentPath);
    if (params) return x.render(params, queryParams);
  }
  return null;
};

const Router: React.FC = () => {
  useCoreHooks();

  const location = useLocation(); // ! использование `useLocation` в других компонентах не приветствуется
  const queryParams = useMemo(() => parse(location.search && location.search.slice(1)) as any, [
    location.search,
  ]);
  const isAuthorized = useSelector((state) => !!state.auth.token);

  const route = useMemo(() => getCurrentRoute({isAuthorized}, location.pathname, queryParams), [
    location.pathname,
    queryParams,
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
