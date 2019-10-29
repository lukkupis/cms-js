import { createAction } from 'redux-starter-kit';
import { createActionThunk } from 'redux-thunk-actions';
import * as api from 'helpers/api';

export const SET_USER = createAction('SET_USER');
export const SET_USERS_SERVER = createAction('SET_USERS_SERVER');

export const GET_USERS = createActionThunk('GET_USERS', () =>
  api.getUsersAdmin()
);
