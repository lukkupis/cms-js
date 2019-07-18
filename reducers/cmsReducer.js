import { createReducer } from 'redux-starter-kit';

import * as cmsActions from '../actions/cmsActions';
import initialStateGetData from 'helpers/initialStateGetData';
import reducerGetData from 'helpers/reducerGetData';

const initialState = {
  userAdminName: '',
  ...initialStateGetData('pages'),
  ...initialStateGetData('users')
};

export default createReducer(initialState, {
  [cmsActions.SET_USER]: (state, action) => {
    state.userAdminName = action.payload;
    return state;
  },
  [cmsActions.SET_PAGES_SERVER]: (state, action) => {
    state.SET_PAGES_SUCCEEDED = true;
    state.pages = action.payload;
    return state;
  },
  ...reducerGetData('pages'),
  [cmsActions.SET_USERS_SERVER]: (state, action) => {
    state.SET_USERS_SUCCEEDED = true;
    state.users = action.payload;
    return state;
  },
  ...reducerGetData('users')
});
