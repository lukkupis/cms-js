import * as constants from '../store/constants';

export const test = dispatch => {
  return dispatch({ type: constants.CMS_TEST });
};
