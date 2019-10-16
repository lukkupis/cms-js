import { createReducer } from 'redux-starter-kit';

import * as cmsActions from '../actions/cmsActions';
import initialStateGetData from 'helpers/initialStateGetData';
// import initialStatePostData from 'helpers/initialStatePostData';
import initialStatePutData from 'helpers/initialStatePutData';
import initialStateDeleteData from 'helpers/initialStateDeleteData';
import reducerGetData from 'helpers/reducerGetData';
// import reducerPostData from 'helpers/reducerPostData';
import reducerPutData from 'helpers/reducerPutData';
import reducerDeleteData from 'helpers/reducerDeleteData';

const initialState = {
  userAdminName: '',
  userAdminId: '',
  ...initialStateGetData('users'),
  ...initialStateGetData('pages'),
  ...initialStateGetData('page'),
  // ...initialStatePostData('page'),
  ...initialStatePutData('page'),
  ...initialStateDeleteData('page')
};

export default createReducer(initialState, {
  [cmsActions.SET_USER]: (state, action) => {
    state.userAdminName = action.payload.name;
    state.userAdminId = action.payload.id;
  },
  ...reducerGetData('users'),
  [cmsActions.SET_PAGES_SERVER]: (state, action) => {
    state.SET_PAGES_SUCCEEDED = true;
    state.pages = action.payload;
  },
  ...reducerGetData('pages'),
  [cmsActions.SET_USERS_SERVER]: (state, action) => {
    state.SET_USERS_SUCCEEDED = true;
    state.users = action.payload;
  },
  ...reducerGetData('page'),
  ['GET_PAGE_SUCCEEDED']: (state, action) => {
    const { name } = action.payload;
    const { newPage } = action.payload;

    if (name === '') {
    }
  },
  ['ADD_PAGE_SUCCEEDED']: (state, action) => {
    const { name } = action.payload;
    const { newPage } = action.payload;

    if (name === 'published') {
      state.pages.unshift(newPage);
    }
  },
  ...reducerPutData('page'),
  ['EDIT_PAGE_SUCCEEDED']: (state, action) => {
    const { name } = action.payload;
    let { pages } = state;
    const { newPage } = action.payload;
    let editedPage;

    if (name === 'edited') {
    }
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
