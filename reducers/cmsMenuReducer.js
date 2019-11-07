import { createReducer } from 'redux-starter-kit';

import * as cmsMenuActions from '../actions/cmsMenuActions';
import initialStateApiData from 'helpers/initialStateApiData';
import reducerApiData from 'helpers/reducerApiData';

const initialState = {
  ...initialStateApiData('GET_MENU'),
  pages: [],
  menu: []
};

export default createReducer(initialState, {
  [cmsMenuActions.SET_MENU_SERVER]: (state, action) => {
    state.pages = action.payload.pages;
    state.menu = action.payload.menu;
  },
  ...reducerApiData('GET_MENU', (state, action) => {
    state.pages = action.payload.pages;
    state.menu = action.payload.menu;
  }),
  [cmsMenuActions.REFRESH_MENU]: (state, action) => {
    state.menu = action.payload;
  },
  ...reducerApiData('SET_MENU', (state, action) => {
    state.menu = action.payload;
  })
});
