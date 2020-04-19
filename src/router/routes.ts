import {createRoute} from 'router/core';

type SearchQueryParams = 'q' | 'owners' | 'language';

const routes = {
  root: createRoute<null, null>('/'),

  search: createRoute<null, SearchQueryParams>('search'),
  searchAdvanced: createRoute<null, SearchQueryParams>('/search/advanced'),

  icons: createRoute<null, null>('/icons'),
  specificIcon: createRoute<'iconType', null>('/icons/:iconType'),

  demo: createRoute<null, null>('/demo'),
  demoTheme: createRoute<null, null>('/demo/theme'),
  demoMedia: createRoute<null, null>('/demo/media'),
  demoForm: createRoute<null, null>('/demo/form'),
  demoThunkVsRx: createRoute<null, null>('/demo/thunk-vs-rx'),
};

export default routes;
