import { createReducer } from 'redux-starter-kit';

import * as pageActions from '../actions/pageActions';
import initialStateApiData from 'helpers/initialStateApiData';
import reducerApiData from 'helpers/reducerApiData';

const initialPageData = {
  slug: '',
  template: '',
  title: '',
  author: '',
  content: '',
  status: '',
  created: ''
};

const initialState = {
  ...initialStateApiData('GET_PAGE_DATA'),
  pageData: initialPageData,
  ...initialStateApiData('GET_MENU_LIST'),
  menu: []
};

export default createReducer(initialState, {
  ...reducerApiData('GET_PAGE_DATA', (state, action) => {
    if (action.payload) {
      state.pageData = action.payload;
    }
  }),
  [pageActions.SET_PAGE_DATA_SERVER]: (state, action) => {
    if (action.payload) {
      state.pageData = action.payload;
    }
  },
  [pageActions.RESET_PAGE_DATA]: (state, action) => {
    state.pageData = initialPageData;
  },
  ...reducerApiData('GET_MENU_LIST', (state, action) => {
    if (action.payload) {
      state.menu = action.payload;
    }
  }),
  [pageActions.SET_MENU_LIST_SERVER]: (state, action) => {
    if (action.payload) {
      state.menu = action.payload;
    }
  }
});
