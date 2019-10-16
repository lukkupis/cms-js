function reducerPostData(name, succeededCallback) {
  const nameUpper = name.toUpperCase();

  return {
    [`POST_${nameUpper}_STARTED`]: (state, action) => {
      state[`POST_${nameUpper}_STARTED`] = true;
    },
    [`POST_${nameUpper}_SUCCEEDED`]: (state, action) => {
      state[`POST_${nameUpper}_SUCCEEDED`] = true;
      state[`POST_${nameUpper}_STARTED`] = false;
      succeededCallback(state, action);
    },
    [`POST_${nameUpper}_FAILED`]: (state, action) => {
      state[`POST_${nameUpper}_FAILED`] = true;
      state[`POST_${nameUpper}_STARTED`] = false;
    },
    [`POST_${nameUpper}_ENDED`]: (state, action) => {
      state[`POST_${nameUpper}_ENDED`] = true;
      state[`POST_${nameUpper}_STARTED`] = false;
    }
  };
}

export default reducerPostData;
