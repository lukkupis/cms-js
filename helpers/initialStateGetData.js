function initialStateGetData(name) {
  const nameUpper = name.toUpperCase();

  return {
    [`GET_${nameUpper}_STARTED`]: false,
    [`GET_${nameUpper}_SUCCEEDED`]: false,
    [`GET_${nameUpper}_FAILED`]: false,
    [`GET_${nameUpper}_ENDED`]: false,
    [`GET_${nameUpper}_SUCCEEDED`]: false
  };
}

export default initialStateGetData;
