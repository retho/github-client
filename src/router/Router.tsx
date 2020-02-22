import React from 'react';
import routes from './routes';
import UrlPattern from 'url-pattern';
import { useLocation, Redirect } from 'react-router-dom';
import { stringifyRoute } from 'utils/router';

const getCurrentRoute = (currentPath: string) => {
  for (const x of Object.values(routes)) {
    const params = new UrlPattern(x.pattern).match(currentPath);
    if (params) return x.render(params as never);
  }
  return null;
};

const NotFoundRoute = <Redirect to={stringifyRoute(routes.root, null)} />;

const Router: React.FC = () => {
  const location = useLocation();
  const route = getCurrentRoute(location.pathname);

  return route || NotFoundRoute;
};

export default Router;
