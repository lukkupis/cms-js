import { createAction } from 'redux-starter-kit';
import { createActionThunk } from 'redux-thunk-actions';
import * as api from 'helpers/api';

export const SET_USER = createAction('SET_USER');

export const SET_USERS_SERVER = createAction('SET_USERS_SERVER');
export const GET_USERS = createActionThunk('GET_USERS', () =>
  api.getUsersAdmin()
);

export const SET_PAGES_SERVER = createAction('SET_PAGES_SERVER');
export const GET_PAGES = createActionThunk('GET_PAGES', () =>
  api.getPagesAdmin()
);

export const ADD_PAGE = createActionThunk('ADD_PAGE', values =>
  api.postPageAdmin(values)
);

export const DELETE_PAGE = createActionThunk('DELETE_PAGE', id =>
  api.deletePageAdmin(id)
);
