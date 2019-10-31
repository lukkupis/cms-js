import { createReducer } from 'redux-starter-kit';

import * as cmsUserActions from '../actions/cmsUserActions';
import initialStateApiData from 'helpers/initialStateApiData';
import reducerApiData from 'helpers/reducerApiData';

const initialUserForm = {
  name: '',
  login: '',
  email: '',
  permissions: 'admin',
  password: '',
  confirmPassword: ''
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
  userForm: initialUserForm
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
  [cmsUserActions.SET_USER_SERVER]: (state, action) => {
    state.userForm = action.payload;
  },
  ...reducerApiData('GET_USER', (state, action) => {
    state.userForm = action.payload;
  }),
  [cmsUserActions.RESET_USER_FORM]: (state, action) => {
    state.userForm = initialUserForm;
  },
  [cmsUserActions.RESET_STATUS_FORM]: (state, action) => {
    state.userSaveStatus = '';
    state.userSaveMessage = '';
  },
  ...reducerApiData('ADD_USER', (state, action) => {
    const { name, message, newUser } = action.payload;

    if (name === 'published') {
      state.users.unshift(newUser);
      state.userSaveStatus = name;
      state.userSaveMessage = message;
      state.userForm = newUser;
    }
  }),
  ...reducerApiData('EDIT_USER', (state, action) => {
    const { name, message, newUser } = action.payload;

    if (name === 'edited') {
      const index = state.users.map(user => user._id).indexOf(newUser._id);

      state.users[index] = newUser;

      state.userSaveStatus = name;
      state.userSaveMessage = message;
      state.userForm = newUser;
    }
  }),
  ...reducerApiData('DELETE_USER', (state, action) => {
    const { name, id } = action.payload;
    let { users } = state;

    if (name === 'deleted') {
      users.splice(users.map(user => user._id).indexOf(id), 1);
    }
  })
});
