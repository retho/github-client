import { createRoute } from 'router/core';
import rootRender from './routeRenders/root';
import searchRender from './routeRenders/search';
import authRender from './routeRenders/auth';
import iconsRender from './routeRenders/icons';
import specificIconRender from './routeRenders/specificIcon';

const routes = {
  root: createRoute('/', rootRender),
  search: createRoute('/search', searchRender),
  auth: createRoute('/auth', authRender),
  icons: createRoute('/icons', iconsRender),
  specificIcon: createRoute('/icons/:iconType', specificIconRender),
};

export default routes;
