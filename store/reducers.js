import { combineReducers } from 'redux';

import cmsPageReducer from 'reducers/cmsPageReducer';
import cmsUserReducer from 'reducers/cmsUserReducer';
import cmsMenuReducer from 'reducers/cmsMenuReducer';

const rootReducer = combineReducers({
  cmsPageStore: cmsPageReducer,
  cmsUserStore: cmsUserReducer,
  cmsMenuStore: cmsMenuReducer
});

export default rootReducer;
