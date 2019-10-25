import { createReducer } from 'redux-starter-kit';

import * as cmsActions from '../actions/cmsActions';
import initialStateApiData from 'helpers/initialStateApiData';
import reducerApiData from 'helpers/reducerApiData';

const initialPageForm = {
  title: '',
  content: '',
  status: 'published',
  author: '',
  slug: ''
};

const initialState = {
  userAdminName: '',
  userAdminId: '',
  ...initialStateApiData('GET_PAGES'),
  pages: [],
  ...initialStateApiData('GET_PAGE'),
  ...initialStateApiData('ADD_PAGE'),
  ...initialStateApiData('EDIT_PAGE'),
  ...initialStateApiData('DELETE_PAGE'),
  pageSaveStatus: '',
  pageSaveMessage: '',
  pageForm: initialPageForm
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
  ...reducerApiData('GET_PAGES', (state, action) => {
    state.pages = action.payload;
  }),
  [cmsActions.SET_PAGE_SERVER]: (state, action) => {
    state.pageForm = action.payload;
  },
  ...reducerApiData('GET_PAGE', (state, action) => {
    state.pageForm = action.payload;
  }),
  [cmsActions.SET_PAGE_AUTHOR]: (state, action) => {
    state.pageForm.author = state.userAdminId;
  },
  [cmsActions.RESET_PAGE_FORM]: (state, action) => {
    state.pageForm = initialPageForm;
  },
  [cmsActions.RESET_STATUS_FORM]: (state, action) => {
    state.pageSaveStatus = '';
    state.pageSaveMessage = '';
  },
  ...reducerApiData('ADD_PAGE', (state, action) => {
    const { name, message, newPage } = action.payload;

    if (name === 'published') {
      state.pages.unshift(newPage);
      state.pageSaveStatus = name;
      state.pageSaveMessage = message;
      state.pageForm = newPage;
    }
  }),
  ...reducerApiData('EDIT_PAGE', (state, action) => {
    const { name, message, newPage } = action.payload;
    console.log(newPage);
    if (name === 'edited') {
      const index = parseInt(
        state.pages.map(page => page._id).indexOf(newPage._id)
      );

      state.pages[index] = newPage;

      state.pageSaveStatus = name;
      state.pageSaveMessage = message;
      state.pageForm = newPage;
    }
  }),
  ...reducerApiData('DELETE_PAGE', (state, action) => {
    const { name, id } = action.payload;
    let { pages } = state;

    if (name === 'deleted') {
      pages.splice(pages.map(page => page._id).indexOf(id), 1);
    }
  })
});
