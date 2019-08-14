import { createReducer } from 'redux-starter-kit';

import * as cmsActions from '../actions/cmsActions';
import initialStateGetData from 'helpers/initialStateGetData';
import reducerGetData from 'helpers/reducerGetData';

import initialStateDeleteData from 'helpers/initialStateDeleteData';
import reducerDeleteData from 'helpers/reducerDeleteData';

const initialState = {
  userAdminName: '',
  userAdminId: '',
  ...initialStateGetData('users'),
  ...initialStateGetData('pages'),
  ...initialStateDeleteData('page')
};

export default createReducer(initialState, {
  [cmsActions.SET_USER]: (state, action) => {
    state.userAdminName = action.payload.name;
    state.userAdminId = action.payload.id;
    return state;
  },
  ...reducerGetData('users'),
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
  ...reducerDeleteData('page')
});
