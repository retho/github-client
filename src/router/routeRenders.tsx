import React, {FC, Suspense} from 'react';
import {createRouteRender, Empty} from 'router/core';
import {Redirect} from 'react-router-dom';
import {stringifyRoute} from 'utils/router';
import {routes} from './index';

const IconPage = React.lazy(() => import('components/pages/IconsPage'));
const SearchPage = React.lazy(() => import('components/pages/SearchPage'));

const PageContentLoader: FC = () => <div>Loading...</div>;

export const rootRender = createRouteRender(() => (
  <Redirect to={stringifyRoute(routes.search, null, {})} />
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
