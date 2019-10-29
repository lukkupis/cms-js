import { combineReducers } from 'redux';

import cmsPageReducer from 'reducers/cmsPageReducer';
import cmsUserReducer from 'reducers/cmsUserReducer';
import themeReducer from 'reducers/themeReducer';

const rootReducer = combineReducers({
  cmsPageStore: cmsPageReducer,
  cmsUserStore: cmsUserReducer
  // themeStore: themeReducer
});

export default rootReducer;
