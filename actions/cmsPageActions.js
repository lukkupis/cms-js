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

export const SET_PAGE_SERVER = createAction('SET_PAGE_SERVER');
export const GET_PAGE = createActionThunk('GET_PAGE', id =>
  api.getPageAdmin(id)
);

export const SET_PAGE_AUTHOR = createAction('SET_PAGE_AUTHOR');

export const RESET_PAGE_FORM = createAction('RESET_PAGE_FORM');
export const RESET_STATUS_FORM = createAction('RESET_STATUS_FORM');

export const ADD_PAGE = createActionThunk('ADD_PAGE', values =>
  api.postPageAdmin(values)
);

export const EDIT_PAGE = createActionThunk('EDIT_PAGE', values =>
  api.putPageAdmin(values)
);

export const DELETE_PAGE = createActionThunk('DELETE_PAGE', id =>
  api.deletePageAdmin(id)
);

export const GET_PAGE_DATA = createActionThunk('GET_PAGE_DATA', slug =>
  api.getPageData(slug)
);
export const SET_PAGE_DATA_SERVER = createAction('SET_PAGE_DATA_SERVER');

export const RESET_PAGE_DATA = createAction('RESET_PAGE_DATA');
