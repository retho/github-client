import React from 'react';
import { createRouteRender } from '../core';
import SearchPage from 'components/pages/SearchPage';

export type SearchQueryParams = 'q' | 'owners' | 'language';

type Params = null;
type QueryParams = SearchQueryParams;
export default createRouteRender<Params, QueryParams>((_, filters) => (
  <SearchPage filters={filters} />
));
