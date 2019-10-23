function reducerApiData(name, succeededCallback) {
  const nameUpper = name.toUpperCase();

  return {
    [`${nameUpper}_STARTED`]: (state, action) => {
      state[`${nameUpper}_STARTED`] = true;
    },
    [`${nameUpper}_SUCCEEDED`]: (state, action) => {
      state[`${nameUpper}_SUCCEEDED`] = true;
      state[`${nameUpper}_STARTED`] = false;
      succeededCallback(state, action);
    },
    [`${nameUpper}_FAILED`]: (state, action) => {
      state[`${nameUpper}_FAILED`] = true;
      state[`${nameUpper}_STARTED`] = false;
    },
    [`${nameUpper}_ENDED`]: (state, action) => {
      state[`${nameUpper}_ENDED`] = true;
      state[`${nameUpper}_STARTED`] = false;
    }
  };
}

export default reducerApiData;
