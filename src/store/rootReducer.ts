import { combineReducers } from '@reduxjs/toolkit';

import i18n from './slices/i18n';
import search from './slices/search';
import auth from './slices/auth';

const rootReducer = combineReducers({
  i18n,
  auth,
  search,
});

export default rootReducer;
