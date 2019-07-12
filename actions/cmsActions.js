import { createAction } from 'redux-starter-kit';
import { createActionThunk } from 'redux-thunk-actions';

export const test = createAction('CMS_TEST');

export const GET_PAGES = createActionThunk('GET_PAGES', () => api.fetch());
