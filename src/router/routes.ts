import {createRoute} from 'router/core';
import {
  rootRender,
  searchRender,
  searchAdvancedRender,
  iconsRender,
  specificIconRender,
} from './routeRenders';

const routes = {
  root: createRoute('/', rootRender),

  search: createRoute('/search', searchRender),
  searchAdvanced: createRoute('/search/advanced', searchAdvancedRender),

  icons: createRoute('/icons', iconsRender),
  specificIcon: createRoute('/icons/:iconType', specificIconRender),
};

export default routes;
