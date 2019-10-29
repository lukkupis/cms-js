import { createReducer } from 'redux-starter-kit';

import * as cmsUserActions from '../actions/cmsUserActions';
import initialStateApiData from 'helpers/initialStateApiData';
import reducerApiData from 'helpers/reducerApiData';

const initialState = {
  userAdminName: '',
  userAdminId: ''
};

export default createReducer(initialState, {
  [cmsUserActions.SET_USER]: (state, action) => {
    state.userAdminName = action.payload.name;
    state.userAdminId = action.payload.id;
  },
  [cmsUserActions.SET_USERS_SERVER]: (state, action) => {
    state.users = action.payload;
  }
});
