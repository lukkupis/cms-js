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
  pageData: initialPageData
};

export default createReducer(initialState, {
  ...reducerApiData('GET_PAGE_DATA', (state, action) => {
    if (action.payload) {
      state.pageData = action.payload;
    }
  }),
  [pageActions.RESET_PAGE_DATA]: (state, action) => {
    state.pageData = initialPageData;
  },
  [pageActions.SET_PAGE_DATA_SERVER]: (state, action) => {
    if (action.payload) {
      state.pageData = action.payload;
    }
  }
});
