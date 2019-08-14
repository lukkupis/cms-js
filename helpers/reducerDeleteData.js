function reducerDeleteData(name) {
  const nameUpper = name.toUpperCase();

  return {
    [`DELETE_${nameUpper}_STARTED`]: (state, action) => {
      state[`DELETE_${nameUpper}_STARTED`] = true;
      return state;
    },
    [`DELETE_${nameUpper}_SUCCEEDED`]: (state, action) => {
      state[`DELETE_${nameUpper}_SUCCEEDED`] = true;
      state[`DELETE_${nameUpper}_STARTED`] = false;
      return state;
    },
    [`DELETE_${nameUpper}_FAILED`]: (state, action) => {
      state[`DELETE_${nameUpper}_FAILED`] = true;
      state[`DELETE_${nameUpper}_STARTED`] = false;
      return state;
    },
    [`DELETE_${nameUpper}_ENDED`]: (state, action) => {
      state[`DELETE_${nameUpper}_ENDED`] = true;
      state[`DELETE_${nameUpper}_STARTED`] = false;
      return state;
    }
  };
}

export default reducerDeleteData;
