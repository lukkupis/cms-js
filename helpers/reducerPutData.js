function reducerPutData(name) {
  const nameUpper = name.toUpperCase();
  const nameLower = name.toLowerCase();

  return {
    [`PUT_${nameUpper}_STARTED`]: (state, action) => {
      state[`PUT_${nameUpper}_STARTED`] = true;
    },
    [`PUT_${nameUpper}_SUCCEEDED`]: (state, action) => {
      state[`PUT_${nameUpper}_SUCCEEDED`] = true;
      state[`PUT_${nameUpper}_STARTED`] = false;
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
