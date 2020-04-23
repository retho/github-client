import React, {FC, Suspense} from 'react';
import {createRouteRender} from 'router/core';
import MainLayout from 'components/templates/MainLayout';

const DemoPage = React.lazy(() => import('components/pages/DemoPage'));
const HomePage = React.lazy(() => import('components/pages/HomePage'));
const IconPage = React.lazy(() => import('components/pages/IconsPage'));
const SearchPage = React.lazy(() => import('components/pages/SearchPage'));

const PageContentLoader: FC = () => <div>Loading...</div>;

export const rootRender = createRouteRender(() => (
  <MainLayout>
    <Suspense fallback={<PageContentLoader />}>
      <HomePage />
    </Suspense>
  </MainLayout>
));

type SearchQueryParams = 'q' | 'owners' | 'language';
export const searchRender = createRouteRender<null, SearchQueryParams>((_, filters) => (
  <Suspense fallback={<PageContentLoader />}>
    <SearchPage filters={filters} />
  </Suspense>
));
export const searchAdvancedRender = createRouteRender<null, SearchQueryParams>((_, filters) => (
  <Suspense fallback={<PageContentLoader />}>
    <SearchPage filters={filters} advanced />
  </Suspense>
));

export const iconsRender = createRouteRender(() => (
  <Suspense fallback={<PageContentLoader />}>
    <IconPage />
  </Suspense>
));
export const specificIconRender = createRouteRender<'iconType'>(({iconType}) => (
  <Suspense fallback={<PageContentLoader />}>
    <IconPage selectedIcon={iconType} />
  </Suspense>
));

export const demoRender = createRouteRender(() => (
  <Suspense fallback={<PageContentLoader />}>
    <DemoPage />
  </Suspense>
));
export const demoThemeRender = createRouteRender(() => (
  <Suspense fallback={<PageContentLoader />}>
    <DemoPage subject="theme" />
  </Suspense>
));
export const demoMediaRender = createRouteRender(() => (
  <Suspense fallback={<PageContentLoader />}>
    <DemoPage subject="media" />
  </Suspense>
));
export const demoFormRender = createRouteRender(() => (
  <Suspense fallback={<PageContentLoader />}>
    <DemoPage subject="form" />
  </Suspense>
));
export const demoThunkVsRxRender = createRouteRender(() => (
  <Suspense fallback={<PageContentLoader />}>
    <DemoPage subject="thunk-vs-rx" />
  </Suspense>
));
export const demoPureComponentRender = createRouteRender(() => (
  <Suspense fallback={<PageContentLoader />}>
    <DemoPage subject="pure-component" />
  </Suspense>
));
