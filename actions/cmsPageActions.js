import { createAction } from 'redux-starter-kit';
import { createActionThunk } from 'redux-thunk-actions';
import * as apiPagesCms from '../api/apiPagesCms';

export const SET_PAGES_SERVER = createAction('SET_PAGES_SERVER');
export const GET_PAGES = createActionThunk('GET_PAGES', () =>
  apiPagesCms.getPagesAdmin()
);

export const SET_PAGE_SERVER = createAction('SET_PAGE_SERVER');
export const GET_PAGE = createActionThunk('GET_PAGE', id =>
  apiPagesCms.getPageAdmin(id)
);

export const SET_PAGE_AUTHOR = createAction('SET_PAGE_AUTHOR');
export const SET_PAGE_CONTENT = createAction('SET_PAGE_CONTENT');

export const RESET_PAGE_FORM = createAction('RESET_PAGE_FORM');
export const RESET_STATUS_FORM = createAction('RESET_STATUS_FORM');

export const ADD_PAGE = createActionThunk('ADD_PAGE', values =>
  apiPagesCms.postPageAdmin(values)
);

export const EDIT_PAGE = createActionThunk('EDIT_PAGE', values =>
  apiPagesCms.putPageAdmin(values)
);

export const DELETE_PAGE = createActionThunk('DELETE_PAGE', id =>
  apiPagesCms.deletePageAdmin(id)
);
