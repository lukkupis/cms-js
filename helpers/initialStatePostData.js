function initialStatePostData(name) {
  const nameUpper = name.toUpperCase();

  return {
    [`POST_${nameUpper}_STARTED`]: false,
    [`POST_${nameUpper}_SUCCEEDED`]: false,
    [`POST_${nameUpper}_FAILED`]: false,
    [`POST_${nameUpper}_ENDED`]: false,
    [`POST_${nameUpper}_SUCCEEDED`]: false
  };
}

export default initialStatePostData;
