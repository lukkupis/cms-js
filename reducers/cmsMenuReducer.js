import { createReducer } from 'redux-starter-kit';

import * as cmsMenuActions from '../actions/cmsMenuActions';
import initialStateApiData from 'helpers/initialStateApiData';
import reducerApiData from 'helpers/reducerApiData';

const initialState = {
  ...initialStateApiData('GET_MENU'),
  ...initialStateApiData('SET_MENU'),
  ...initialStateApiData('UPDATE_LINK_NAME'),
  ...initialStateApiData('REMOVE_MENU'),
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
    const { name, menu } = action.payload;

    if (name === 'inserted') {
      state.menu = menu;
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log(action.payload);
      }
    }
  }),
  ...reducerApiData('REMOVE_MENU', (state, action) => {
    const { id, name } = action.payload;

    if (name === 'deleted') {
      state.menu.splice(state.menu.map(menu => menu._id).indexOf(id), 1);
    } else {
      if (process.env.NODE_ENV === 'development') {
        console.log(action.payload);
      }
    }
  }),
  [cmsMenuActions.REFRESH_LINK_NAME]: (state, action) => {
    const { id, linkName } = action.payload;

    const index = state.menu.map(item => item._id).indexOf(id);

    state.menu[index].linkName = linkName;
  },
  ...reducerApiData('UPDATE_LINK_NAME', (state, action) => {
    const { id, linkName, name } = action.payload;

    if (name === 'updated') {
      const index = state.menu.map(item => item._id).indexOf(id);

      state.menu[index].linkName = linkName;
    }
  })
});
