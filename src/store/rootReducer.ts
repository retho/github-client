import { combineReducers } from '@reduxjs/toolkit';

import i18n from './slices/i18n';

const rootReducer = combineReducers({
  i18n,
});

export default rootReducer;
