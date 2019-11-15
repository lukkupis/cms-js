import { combineReducers } from 'redux';

import cmsPageReducer from '../reducers/cmsPageReducer';
import cmsUserReducer from '../reducers/cmsUserReducer';
import cmsMenuReducer from '../reducers/cmsMenuReducer';
import pageReducer from '../reducers/pageReducer';

const rootReducer = combineReducers({
  cmsPageStore: cmsPageReducer,
  cmsUserStore: cmsUserReducer,
  cmsMenuStore: cmsMenuReducer,
  pageStore: pageReducer
});

export default rootReducer;
