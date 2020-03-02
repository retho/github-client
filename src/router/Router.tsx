import React, { useMemo } from 'react';
import routes from './routes';
import UrlPattern from 'url-pattern';
import { useLocation, Redirect } from 'react-router-dom';
import { stringifyRoute } from 'utils/router';
import { parse } from 'querystring';

const getCurrentRoute = (
  currentPath: string,
  queryParams: Record<string, string>
) => {
  for (const x of Object.values(routes)) {
    const params = new UrlPattern(x.pattern).match(currentPath);
    if (params) return x.render(params, queryParams);
  }
  return null;
};

const NotFoundRoute = <Redirect to={stringifyRoute(routes.root, null, null)} />;

const Router: React.FC = () => {
  const location = useLocation();
  const queryParams = useMemo(
    () => parse(location.search && location.search.slice(1)) as any,
    [location.search]
  );

  const route = useMemo(() => getCurrentRoute(location.pathname, queryParams), [
    location.pathname,
    queryParams,
  ]);

  return route || NotFoundRoute;
};

export default Router;
