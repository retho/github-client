import React from 'react';
import {createRouteRender} from 'router/core';

import MainLayout from 'components/templates/MainLayout';
import DemoPage from 'components/pages/DemoPage';
import HomePage from 'components/pages/HomePage';
import IconPage from 'components/pages/IconsPage';
import SearchPage from 'components/pages/SearchPage';

export const rootRender = createRouteRender(() => (
  <MainLayout>
    <HomePage />
  </MainLayout>
));

type SearchQueryParams = 'q' | 'owners' | 'language';
export const searchRender = createRouteRender<null, SearchQueryParams>((_, filters) => (
  <SearchPage filters={filters} />
));
export const searchAdvancedRender = createRouteRender<null, SearchQueryParams>((_, filters) => (
  <SearchPage filters={filters} advanced />
));

export const iconsRender = createRouteRender(() => <IconPage />);
export const specificIconRender = createRouteRender<'iconType'>(({iconType}) => (
  <IconPage selectedIcon={iconType} />
));

export const demoRender = createRouteRender(() => <DemoPage />);
export const demoThemeRender = createRouteRender(() => <DemoPage subject="theme" />);
export const demoMediaRender = createRouteRender(() => <DemoPage subject="media" />);
export const demoFormRender = createRouteRender(() => <DemoPage subject="form" />);
export const demoThunkVsRxRender = createRouteRender(() => <DemoPage subject="thunk-vs-rx" />);
export const demoPureComponentRender = createRouteRender(() => (
  <DemoPage subject="pure-component" />
));
