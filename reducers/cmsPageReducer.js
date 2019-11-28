import { createReducer } from 'redux-starter-kit';

import * as cmsPageActions from '../actions/cmsPageActions';
import initialStateApiData from '../helpers/initialStateApiData';
import reducerApiData from '../helpers/reducerApiData';

const initialPageForm = {
  title: '',
  content: '',
  status: 'published',
  author: '',
  slug: ''
};

const initialState = {
  ...initialStateApiData('GET_PAGES'),
  pages: [],
  ...initialStateApiData('GET_PAGE'),
  ...initialStateApiData('ADD_PAGE'),
  ...initialStateApiData('EDIT_PAGE'),
  ...initialStateApiData('DELETE_PAGE'),
  pageSaveStatus: '',
  pageSaveMessage: '',
  pageForm: initialPageForm
};

export default createReducer(initialState, {
  [cmsPageActions.SET_PAGES_SERVER]: (state, action) => {
    state.pages = action.payload;
  },
  ...reducerApiData('GET_PAGES', (state, action) => {
    state.pages = action.payload;
  }),
  [cmsPageActions.SET_PAGE_SERVER]: (state, action) => {
    state.pageForm = action.payload;
  },
  ...reducerApiData('GET_PAGE', (state, action) => {
    state.pageForm = action.payload;
  }),
  [cmsPageActions.SET_PAGE_AUTHOR]: (state, action) => {
    state.pageForm.author = action.payload;
  },
  [cmsPageActions.SET_PAGE_CONTENT]: (state, action) => {
    state.pageForm.content = action.payload;
  },
  [cmsPageActions.RESET_PAGE_FORM]: (state, action) => {
    state.pageForm = initialPageForm;
    state.pageForm.author = action.payload;
  },
  [cmsPageActions.RESET_STATUS_FORM]: (state, action) => {
    state.pageSaveStatus = '';
    state.pageSaveMessage = '';
  },
  ...reducerApiData('ADD_PAGE', (state, action) => {
    const { name, message, newPage } = action.payload;

    if (name === 'published') {
      state.pages.unshift(newPage);
      state.pageSaveStatus = name;
      state.pageSaveMessage = message;
      state.pageForm = newPage;
    }
  }),
  ...reducerApiData('EDIT_PAGE', (state, action) => {
    const { name, message, newPage } = action.payload;

    if (name === 'edited') {
      const index = state.pages.map(page => page._id).indexOf(newPage._id);

      state.pages[index] = newPage;

      state.pageSaveStatus = name;
      state.pageSaveMessage = message;
      state.pageForm = newPage;
    }
  }),
  ...reducerApiData('DELETE_PAGE', (state, action) => {
    const { name, id } = action.payload;
    let { pages } = state;

    if (name === 'deleted') {
      pages.splice(pages.map(page => page._id).indexOf(id), 1);
    }
  })
});
