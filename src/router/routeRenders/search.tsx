import React from 'react';
import { createRouteRender } from '../core';
import MainLayout from 'components/templates/MainLayout';
import SearchPage from 'components/pages/SearchPage';

type Params = null;
type QueryParams = 'q';
export default createRouteRender<Params, QueryParams>((_, { q }) => (
  <MainLayout>
    <SearchPage q={q} />
  </MainLayout>
));
