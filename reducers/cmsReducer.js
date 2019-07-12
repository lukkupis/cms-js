import { createReducer } from 'redux-starter-kit';

import * as cmsActions from '../actions/cmsActions';

const initialState = {
  test: 'test123'
};

export default createReducer(initialState, {
  [cmsActions.test]: (state, action) => {
    console.log('CMS_TEST');
    return state;
  }
});
