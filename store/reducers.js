import { combineReducers } from 'redux';

import cmsPageReducer from 'reducers/cmsPageReducer';
import cmsUserReducer from 'reducers/cmsUserReducer';

const rootReducer = combineReducers({
  cmsPageStore: cmsPageReducer,
  cmsUserStore: cmsUserReducer
});

export default rootReducer;
