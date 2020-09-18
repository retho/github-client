import React, {FC, Suspense} from 'react';
import {createRouteRender, Empty} from 'router/core';
import MainLayout from 'components/templates/MainLayout';

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
export const searchRender = createRouteRender<Empty, SearchQueryParams>(
  (_, {q, owners, language}) => (
    <Suspense fallback={<PageContentLoader />}>
      <SearchPage filters={{q, owners, language}} />
    </Suspense>
  )
);
export const searchAdvancedRender = createRouteRender<Empty, SearchQueryParams>((_, filters) => (
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
