import { createReducer } from 'redux-starter-kit';

import * as cmsActions from '../actions/cmsActions';

const initialState = {
  GET_PAGES_STARTED: false,
  GET_PAGES_SUCCEEDED: false,
  GET_PAGES_FAILED: false,
  GET_PAGES_ENDED: false,
  SET_PAGES_SUCCEEDED: false,
  pages: []
};

export default createReducer(initialState, {
  [cmsActions.SET_PAGES_SERVER]: (state, action) => {
    state.SET_PAGES_SUCCEEDED = true;
    state.pages = action.payload;
    return state;
  },
  GET_PAGES_STARTED: (state, action) => {
    state.GET_PAGES_STARTED = true;
    return state;
  },
  GET_PAGES_SUCCEEDED: (state, action) => {
    state.GET_PAGES_SUCCEEDED = true;
    state.GET_PAGES_STARTED = false;
    state.pages = action.payload;
    return state;
  },
  GET_PAGES_FAILED: (state, action) => {
    state.GET_PAGES_FAILED = true;
    state.GET_PAGES_STARTED = false;
    return state;
  },
  GET_PAGES_ENDED: (state, action) => {
    state.GET_PAGES_ENDED = true;
    state.GET_PAGES_STARTED = false;
    return state;
  }
});
