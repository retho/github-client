import {combineReducers} from '@reduxjs/toolkit';

import i18n from './slices/i18n';
import theme from './slices/theme';
import search from './slices/search';
import auth from './slices/auth';
import globalMessages from './slices/globalMessages';
import demoRx from './slices/demoRx';
import demoThunk from './slices/demoThunk';

const rootReducer = combineReducers({
  i18n,
  theme,
  auth,
  search,
  globalMessages,
  demoRx,
  demoThunk,
});

export default rootReducer;
