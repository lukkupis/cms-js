import * as constants from '../store/constants';

const initialState = {
  test: 'test123'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.CMS_TEST:
      console.log('CMS_TEST');
      return state;
    default:
      return state;
  }
};
