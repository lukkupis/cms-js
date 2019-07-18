function reducerApi(name) {
  const nameUpper = name.toUpperCase();
  const nameLower = name.toLowerCase();

  return {
    [`GET_${nameUpper}_STARTED`]: (state, action) => {
      state[`GET_${nameUpper}_STARTED`] = true;
      return state;
    },
    [`GET_${nameUpper}_SUCCEEDED`]: (state, action) => {
      state[`GET_${nameUpper}_SUCCEEDED`] = true;
      state[`GET_${nameUpper}_STARTED`] = false;
      state[nameLower] = action.payload;
      return state;
    },
    [`GET_${nameUpper}_FAILED`]: (state, action) => {
      state[`GET_${nameUpper}_FAILED`] = true;
      state[`GET_${nameUpper}_STARTED`] = false;
      return state;
    },
    [`GET_${nameUpper}_ENDED`]: (state, action) => {
      state[`GET_${nameUpper}_ENDED`] = true;
      state[`GET_${nameUpper}_STARTED`] = false;
      return state;
    }
  };
}

export default reducerApi;
