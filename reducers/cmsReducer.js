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
  users: [],
  ...initialStateGetData('pages'),
  pages: [],
  ...initialStateDeleteData('page')
};

export default createReducer(initialState, {
  [cmsActions.SET_USER]: (state, action) => {
    state.userAdminName = action.payload.name;
    state.userAdminId = action.payload.id;
  },
  ...reducerGetData('users'),
  GET_USERS_SUCCEEDED: (state, action) => {
    state.users = action.payload;
  },
  [cmsActions.SET_PAGES_SERVER]: (state, action) => {
    state.SET_PAGES_SUCCEEDED = true;
    state.pages = action.payload;
  },
  ...reducerGetData('pages'),
  GET_PAGES_SUCCEEDED: (state, action) => {
    state.pages = action.payload;
  },
  [cmsActions.SET_USERS_SERVER]: (state, action) => {
    state.SET_USERS_SUCCEEDED = true;
    state.users = action.payload;
  },
  ...reducerDeleteData('page'),
  DELETE_PAGE_SUCCEEDED: (state, action) => {
    const { name, id } = action.payload;
    let { pages } = state;

    if (name === 'deleted') {
      pages = pages.filter(page => page._id != id);
    }

    return {
      ...state,
      pages
    };
  }
});
