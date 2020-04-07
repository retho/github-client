import React from 'react';
import { createRouteRender } from '../core';
import SearchPage from 'components/pages/SearchPage';
import { SearchQueryParams } from './search';

type Params = null;
type QueryParams = SearchQueryParams;
export default createRouteRender<Params, QueryParams>((_, filters) => (
  <SearchPage filters={filters} advanced />
));
