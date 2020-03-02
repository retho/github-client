import React from 'react';
import { createRoute } from '../core';
import MainLayout from 'components/templates/MainLayout';
import SearchPage from 'components/pages/SearchPage';

type Params = null;
type QueryParams = 'q';
export default createRoute<Params, QueryParams>({
  pattern: '/search',
  render: (_, { q }) => (
    <MainLayout>
      <SearchPage q={q} />
    </MainLayout>
  ),
});
