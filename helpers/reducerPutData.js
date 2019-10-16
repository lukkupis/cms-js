function reducerPutData(name, succeededCallback) {
  const nameUpper = name.toUpperCase();

  return {
    [`PUT_${nameUpper}_STARTED`]: (state, action) => {
      state[`PUT_${nameUpper}_STARTED`] = true;
    },
    [`PUT_${nameUpper}_SUCCEEDED`]: (state, action) => {
      state[`PUT_${nameUpper}_SUCCEEDED`] = true;
      state[`PUT_${nameUpper}_STARTED`] = false;
      succeededCallback(state, action);
    },
    [`PUT_${nameUpper}_FAILED`]: (state, action) => {
      state[`PUT_${nameUpper}_FAILED`] = true;
      state[`PUT_${nameUpper}_STARTED`] = false;
    },
    [`PUT_${nameUpper}_ENDED`]: (state, action) => {
      state[`PUT_${nameUpper}_ENDED`] = true;
      state[`PUT_${nameUpper}_STARTED`] = false;
    }
  };
}

export default reducerPutData;
