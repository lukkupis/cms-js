import { createReducer } from 'redux-starter-kit';

import * as cmsActions from '../actions/cmsActions';
import initialStateGetData from 'helpers/initialStateGetData';
import initialStatePostData from 'helpers/initialStatePostData';
import initialStatePutData from 'helpers/initialStatePutData';
import initialStateDeleteData from 'helpers/initialStateDeleteData';
import reducerGetData from 'helpers/reducerGetData';
import reducerPostData from 'helpers/reducerPostData';
import reducerPutData from 'helpers/reducerPutData';
import reducerDeleteData from 'helpers/reducerDeleteData';

const initialState = {
  userAdminName: '',
  userAdminId: '',
  ...initialStateGetData('users'),
  users: [],
  ...initialStateGetData('pages'),
  pages: [],
  ...initialStateGetData('page'),
  ...initialStatePostData('page'),
  ...initialStatePutData('page'),
  ...initialStateDeleteData('page'),
  initialPageForm: {
    title: '',
    content: '',
    status: 'published',
    author: '',
    slug: ''
  }
};

export default createReducer(initialState, {
  [cmsActions.SET_USER]: (state, action) => {
    state.userAdminName = action.payload.name;
    state.userAdminId = action.payload.id;
  },
  [cmsActions.SET_PAGES_SERVER]: (state, action) => {
    state.pages = action.payload;
  },
  [cmsActions.SET_USERS_SERVER]: (state, action) => {
    state.users = action.payload;
  },
  ...reducerGetData('pages', (state, action) => {
    //GET_PAGES
    state.pages = action.payload;
  }),
  [cmsActions.SET_PAGE_SERVER]: (state, action) => {
    console.log(action.payload);
  },
  ...reducerGetData('page', (state, action) => {
    //GET_PAGE
  }),
  ...reducerPostData('page', (state, action) => {
    //ADD_PAGE
    const { name } = action.payload;
    const { newPage } = action.payload;

    if (name === 'published') {
      state.pages.unshift(newPage);
    }
  }),
  ...reducerPutData('page', (state, action) => {
    //EDIT_PAGE
    const { name } = action.payload;
    let { pages } = state;
    const { newPage } = action.payload;
    let editedPage;

    if (name === 'edited') {
    }
  }),
  ...reducerDeleteData('page', (state, action) => {
    //DELETE_PAGE
    const { name, id } = action.payload;
    let { pages } = state;

    if (name === 'deleted') {
      pages.splice(pages.map(page => page._id).indexOf(id), 1);
    }
  })
});
