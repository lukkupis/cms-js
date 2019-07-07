import * as constants from '../store/constants';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.THEME_TEST:
      console.log('THEME_TEST');
      return state;
    default:
      return state;
  }
};
