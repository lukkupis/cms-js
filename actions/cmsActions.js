import { createAction } from 'redux-starter-kit';
import { createActionThunk } from 'redux-thunk-actions';
import * as api from 'helpers/api';

export const SET_PAGES_SERVER = createAction('SET_PAGES_SERVER');

export const GET_PAGES = createActionThunk('GET_PAGES', () =>
  api.getPagesAdmin()
);

export const SET_USER_ADMIN = createAction('SET_USER_ADMIN');
