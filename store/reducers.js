import { combineReducers } from 'redux';

import cmsReducer from 'reducers/cmsReducer';
import themeReducer from 'reducers/themeReducer';

const rootReducer = combineReducers({
  cmsStore: cmsReducer,
  themeStore: themeReducer
});

export default rootReducer;
