import {createRoute} from 'router/core';

import rootRender from './routeRenders/root';
import searchRender from './routeRenders/search';
import searchAdvancedRender from './routeRenders/searchAdvanced';
import authRender from './routeRenders/auth';
import iconsRender from './routeRenders/icons';
import specificIconRender from './routeRenders/specificIcon';
import demoRender from './routeRenders/demo';
import demoThemeRender from './routeRenders/demoTheme';
import demoMediaRender from './routeRenders/demoMedia';

const routes = {
  auth: createRoute('/auth', authRender),

  root: createRoute('/', rootRender),

  search: createRoute('/search', searchRender),
  searchAdvanced: createRoute('/search/advanced', searchAdvancedRender),

  icons: createRoute('/icons', iconsRender),
  specificIcon: createRoute('/icons/:iconType', specificIconRender),

  demo: createRoute('/demo', demoRender),
  demoTheme: createRoute('/demo/theme', demoThemeRender),
  demoMedia: createRoute('/demo/media', demoMediaRender),
};

export default routes;
