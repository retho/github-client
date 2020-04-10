import React, { useMemo } from 'react';
import routes from './routes';
import UrlPattern from 'url-pattern';
import { useLocation, Redirect } from 'react-router-dom';
import { stringifyRoute } from 'utils/router';
import { parse } from 'querystring';
import { useSelector } from 'utils/redux';
import GlobalMessagesWrapper from 'components/organisms/GlobalMessagesWrapper';

const notFoundRoute = <Redirect to={stringifyRoute(routes.root, null, null)} />;
const redirectToAuth = (
  <Redirect to={stringifyRoute(routes.auth, null, null)} />
);

interface IRouteContext {
  isAuthorized: boolean;
}
const getCurrentRoute = (
  context: IRouteContext,
  currentPath: string,
  queryParams: Record<string, string>
) => {
  if (
    !context.isAuthorized &&
    !new UrlPattern(routes.auth.pattern).match(currentPath)
  ) {
    return redirectToAuth;
  }
  for (const x of Object.values(routes)) {
    const params = new UrlPattern(x.pattern).match(currentPath);
    if (params) return x.render(params, queryParams);
  }
  return null;
};

const Router: React.FC = () => {
  const location = useLocation();
  const queryParams = useMemo(
    () => parse(location.search && location.search.slice(1)) as any,
    [location.search]
  );
  const isAuthorized = useSelector((state) => !!state.auth.token);

  const route = useMemo(
    () => getCurrentRoute({ isAuthorized }, location.pathname, queryParams),
    [location.pathname, queryParams, isAuthorized]
  );

  return (
    <>
      {route || notFoundRoute}
      <GlobalMessagesWrapper />
    </>
  );
};

export default Router;
