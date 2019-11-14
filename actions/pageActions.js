import { createAction } from 'redux-starter-kit';
import { createActionThunk } from 'redux-thunk-actions';
import * as apiPage from 'api/apiPage';

export const GET_PAGE_DATA = createActionThunk('GET_PAGE_DATA', slug =>
  apiPage.getPageData(slug)
);
export const SET_PAGE_DATA_SERVER = createAction('SET_PAGE_DATA_SERVER');

export const RESET_PAGE_DATA = createAction('RESET_PAGE_DATA');
