import * as constants from '../store/constants';

export const Test = dispatch => {
  return dispatch({ type: constants.THEME_TEST });
};
