function reducerGetData(name, succeededCallback) {
  const nameUpper = name.toUpperCase();

  return {
    [`GET_${nameUpper}_STARTED`]: (state, action) => {
      state[`GET_${nameUpper}_STARTED`] = true;
    },
    [`GET_${nameUpper}_SUCCEEDED`]: (state, action) => {
      state[`GET_${nameUpper}_SUCCEEDED`] = true;
      state[`GET_${nameUpper}_STARTED`] = false;
      succeededCallback(state, action);
    },
    [`GET_${nameUpper}_FAILED`]: (state, action) => {
      state[`GET_${nameUpper}_FAILED`] = true;
      state[`GET_${nameUpper}_STARTED`] = false;
    },
    [`GET_${nameUpper}_ENDED`]: (state, action) => {
      state[`GET_${nameUpper}_ENDED`] = true;
      state[`GET_${nameUpper}_STARTED`] = false;
    }
  };
}

export default reducerGetData;
