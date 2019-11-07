import { createAction } from 'redux-starter-kit';
import { createActionThunk } from 'redux-thunk-actions';
import * as apiMenuCms from 'api/apiMenuCms';

export const SET_MENU_SERVER = createAction('SET_MENU_SERVER');
export const GET_MENU = createActionThunk('GET_MENU', id =>
  apiMenuCms.getMenuAdmin(id)
);

export const REFRESH_MENU = createAction('REFRESH_MENU');
export const SET_MENU = createActionThunk('SET_MENU', values =>
  apiMenuCms.postMenuAdmin(values)
);

export const REMOVE_MENU = createActionThunk('REMOVE_MENU', id =>
  apiMenuCms.deleteMenuAdmin(id)
);
