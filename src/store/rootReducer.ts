import { combineReducers } from '@reduxjs/toolkit';

import i18n from './slices/i18n';
import theme from './slices/theme';
import search from './slices/search';
import auth from './slices/auth';
import globalMessages from './slices/globalMessages';

const rootReducer = combineReducers({
  i18n,
  theme,
  auth,
  search,
  globalMessages,
});

export default rootReducer;
