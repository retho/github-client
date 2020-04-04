import React from 'react';
import { createRouteRender } from '../core';
import MainLayout from 'components/templates/MainLayout';
import SearchPage from 'components/pages/SearchPage';

type Params = null;
type QueryParams = 'search' | 'owners' | 'language';
export default createRouteRender<Params, QueryParams>((_, filters) => (
  <MainLayout>
    <SearchPage filters={filters} />
  </MainLayout>
));
