import { createAction } from 'redux-starter-kit';
import { createActionThunk } from 'redux-thunk-actions';
import * as apiUsersCms from 'api/apiUsersCms';

export const SET_USER = createAction('SET_USER');

export const SET_USERS_SERVER = createAction('SET_USERS_SERVER');
export const GET_USERS = createActionThunk('GET_USERS', () =>
  apiUsersCms.getUsersAdmin()
);

export const SET_USER_SERVER = createAction('SET_USER_SERVER');
export const GET_USER = createActionThunk('GET_USER', id =>
  apiUsersCms.getUserAdmin(id)
);

export const RESET_USER_FORM = createAction('RESET_USER_FORM');
export const RESET_STATUS_FORM = createAction('RESET_STATUS_FORM');

export const ADD_USER = createActionThunk('ADD_USER', values =>
  apiUsersCms.postUserAdmin(values)
);

export const EDIT_USER = createActionThunk('EDIT_USER', values =>
  apiUsersCms.putUserAdmin(values)
);

export const DELETE_USER = createActionThunk('DELETE_USER', id =>
  apiUsersCms.deleteUserAdmin(id)
);

export const CLEAR_MODAL_MESSAGE = createAction('CLEAR_MODAL_MESSAGE');

export const SET_DEMO_MODE = createAction('SET_DEMO_MODE');
