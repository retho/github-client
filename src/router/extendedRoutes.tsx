import React from 'react';
import {extendRoute, IRouteWithRender} from './core';
import routes from './routes';

import MainLayout from 'components/templates/MainLayout';
import DemoPage from 'components/pages/DemoPage';
import HomePage from 'components/pages/HomePage';
import IconPage from 'components/pages/IconsPage';
import SearchPage from 'components/pages/SearchPage';

const root = extendRoute(routes.root, () => (
  <MainLayout>
    <HomePage />
  </MainLayout>
));

const search = extendRoute(routes.search, (_, filters) => <SearchPage filters={filters} />);
const searchAdvanced = extendRoute(routes.searchAdvanced, (_, filters) => (
  <SearchPage filters={filters} advanced />
));

const icons = extendRoute(routes.icons, () => <IconPage />);
const specificIcon = extendRoute(routes.specificIcon, ({iconType}) => (
  <IconPage selectedIcon={iconType} />
));

const demo = extendRoute(routes.demo, () => <DemoPage />);
const demoTheme = extendRoute(routes.demoTheme, () => <DemoPage subject="theme" />);
const demoMedia = extendRoute(routes.demoMedia, () => <DemoPage subject="media" />);
const demoForm = extendRoute(routes.demoForm, () => <DemoPage subject="form" />);
const demoThunkVsRx = extendRoute(routes.demoThunkVsRx, () => <DemoPage subject="thunk-vs-rx" />);

const extendedRoutes: Record<keyof typeof routes, IRouteWithRender<any, any>> = {
  root,
  search,
  searchAdvanced,
  icons,
  specificIcon,
  demo,
  demoTheme,
  demoMedia,
  demoForm,
  demoThunkVsRx,
};

export default extendedRoutes;
