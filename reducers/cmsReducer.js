import * as constants from '../store/constants';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.CMS_TEST:
      return state;
    default:
      return state;
  }
};
