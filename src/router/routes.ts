import {createRoute} from 'router/core';
import {
  rootRender,
  searchRender,
  searchAdvancedRender,
  iconsRender,
  specificIconRender,
  demoRender,
  demoMediaRender,
  demoFormRender,
  demoThunkVsRxRender,
  demoThemeRender,
  demoPureComponentRender,
  demoSvgRender,
  demoEmptyRender,
  demoRxJsRender,
} from './routeRenders';

const routes = {
  root: createRoute('/', rootRender),

  search: createRoute('/search', searchRender),
  searchAdvanced: createRoute('/search/advanced', searchAdvancedRender),

  icons: createRoute('/icons', iconsRender),
  specificIcon: createRoute('/icons/:iconType', specificIconRender),

  demo: createRoute('/demo', demoRender),
  demoEmpty: createRoute('/demo/empty', demoEmptyRender),
  demoTheme: createRoute('/demo/theme', demoThemeRender),
  demoMedia: createRoute('/demo/media', demoMediaRender),
  demoForm: createRoute('/demo/form', demoFormRender),
  demoThunkVsRx: createRoute('/demo/thunk-vs-rx', demoThunkVsRxRender),
  demoPureComponent: createRoute('/demo/pure-component', demoPureComponentRender),
  demoSvgMap: createRoute('/demo/svg-map', demoSvgRender),
  demoRxJs: createRoute('/demo/rxjs', demoRxJsRender),
};

export default routes;
