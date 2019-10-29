import { createReducer } from 'redux-starter-kit';

import * as cmsUserActions from '../actions/cmsUserActions';
import initialStateApiData from 'helpers/initialStateApiData';
import reducerApiData from 'helpers/reducerApiData';

const initialUserForm = {
  name: '',
  login: '',
  email: '',
  permissions: ''
};

const initialCurrentUserData = {
  name: '',
  login: '',
  email: '',
  permissions: '',
  registered: ''
};

const initialState = {
  userAdminName: '',
  userAdminId: '',
  ...initialStateApiData('GET_USERS'),
  users: [],
  ...initialStateApiData('GET_USER'),
  ...initialStateApiData('ADD_USER'),
  ...initialStateApiData('EDIT_USER'),
  ...initialStateApiData('DELETE_USER'),
  userSaveStatus: '',
  userSaveMessage: '',
  userForm: initialUserForm,
  currentuserData: initialCurrentUserData
};

export default createReducer(initialState, {
  [cmsUserActions.SET_USER]: (state, action) => {
    state.userAdminName = action.payload.name;
    state.userAdminId = action.payload.id;
  },
  [cmsUserActions.SET_USERS_SERVER]: (state, action) => {
    state.users = action.payload;
  },
  ...reducerApiData('GET_USERS', (state, action) => {
    state.users = action.payload;
  }),
  ...reducerApiData('GET_USER', (state, action) => {
    state.userForm = action.payload;
  }),
  [cmsUserActions.RESET_USER_FORM]: (state, action) => {
    state.userForm = initialUserForm;
  },
  [cmsUserActions.RESET_STATUS_FORM]: (state, action) => {
    state.userSaveStatus = '';
    state.userSaveMessage = '';
  }
  // ...reducerApiData('ADD_USER', (state, action) => {
  //   const { name, message, newPage } = action.payload;

  //   if (name === 'published') {
  //     state.pages.unshift(newPage);
  //     state.pageSaveStatus = name;
  //     state.pageSaveMessage = message;
  //     state.pageForm = newPage;
  //   }
  // }),
  // ...reducerApiData('EDIT_PAGE', (state, action) => {
  //   const { name, message, newPage } = action.payload;

  //   if (name === 'edited') {
  //     const index = state.pages.map(page => page._id).indexOf(newPage._id);

  //     state.pages[index] = newPage;

  //     state.pageSaveStatus = name;
  //     state.pageSaveMessage = message;
  //     state.pageForm = newPage;
  //   }
  // }),
  // ...reducerApiData('DELETE_PAGE', (state, action) => {
  //   const { name, id } = action.payload;
  //   let { pages } = state;

  //   if (name === 'deleted') {
  //     pages.splice(pages.map(page => page._id).indexOf(id), 1);
  //   }
  // }),
  // ...reducerApiData('GET_PAGE_DATA', (state, action) => {
  //   if (action.payload) {
  //     state.currentPageData = action.payload;
  //   }
  // }),
  // [cmsPageActions.RESET_PAGE_DATA]: (state, action) => {
  //   state.currentPageData = initialCurrentPageData;
  // },
  // [cmsPageActions.SET_PAGE_DATA_SERVER]: (state, action) => {
  //   if (action.payload) {
  //     state.currentPageData = action.payload;
  //   }
  // }
});
