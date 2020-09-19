import {createRoute} from 'router/core';
import {
  rootRender,
  searchRender,
  searchAdvancedRender,
  iconsRender,
  specificIconRender,
} from './routeRenders';

const root = createRoute('/', rootRender);

const search = createRoute('/search', searchRender);
const searchAdvanced = createRoute('/search/advanced', searchAdvancedRender);

const icons = createRoute('/icons', iconsRender);
const specificIcon = createRoute('/icons/:iconType', specificIconRender);

const routes = {
  root,
  search,
  searchAdvanced,
  icons,
  specificIcon,
};

export default routes;
