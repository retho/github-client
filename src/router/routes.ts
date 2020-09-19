import {createRoute} from 'router/core';
import {
  rootRender,
  searchRender,
  searchAdvancedRender,
  iconsRender,
  specificIconRender,
} from './routeRenders';

export const root = createRoute('/', rootRender);

export const search = createRoute('/search', searchRender);
export const searchAdvanced = createRoute('/search/advanced', searchAdvancedRender);

export const icons = createRoute('/icons', iconsRender);
export const specificIcon = createRoute('/icons/:iconType', specificIconRender);
