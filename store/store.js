import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import cmsReducer from 'reducers/cmsReducer';

const initialState = {};

export function initializeStore(initialState = initialState) {
  return createStore(
    cmsReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
