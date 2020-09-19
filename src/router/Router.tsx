import React, {useMemo, FC, useCallback} from 'react';
import {routes} from './index';
import {useLocation} from 'react-router-dom';
import {useSelector} from 'utils/redux';
import GlobalMessagesWrapper from 'components/organisms/GlobalMessagesWrapper';
import AuthPage from 'components/pages/AuthPage';
import {useThemeProvider} from './hooks';
import {matchRoute} from 'utils/router';
import {Empty} from './core';
import {useDispatch} from 'react-redux';
import {setAppCrashed} from 'store/slices/app';
import ErrorWrapper from './ErrorWrapper';

const notFoundRoute = <div>404 Route not found</div>;

type RouteContext = {
  isAuthorized: boolean;
};
const getCurrentRoute = (context: RouteContext, path: string, search: string) => {
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
  const dispatch = useDispatch();

  useThemeProvider();

  const location = useLocation();
  const isAuthorized = useSelector((state) => !!state.auth.token);

  const route = useMemo(() => getCurrentRoute({isAuthorized}, location.pathname, location.search), [
    location.pathname,
    location.search,
    isAuthorized,
  ]);

  const appCrashed = useSelector((state) => state.app.crashed);

  const handleError = useCallback(() => dispatch(setAppCrashed()), []);
  if (appCrashed) return <div>Неожиданная ошибка. Пожалуйста, обновите страницу</div>;

  return (
    <ErrorWrapper onError={handleError}>
      {route || notFoundRoute}
      <GlobalMessagesWrapper />
    </ErrorWrapper>
  );
};

export default Router;
