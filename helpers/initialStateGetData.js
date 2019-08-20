function initialStateGetData(name) {
  const nameUpper = name.toUpperCase();
  const nameLower = name.toLowerCase();

  return {
    [`GET_${nameUpper}_STARTED`]: false,
    [`GET_${nameUpper}_SUCCEEDED`]: false,
    [`GET_${nameUpper}_FAILED`]: false,
    [`GET_${nameUpper}_ENDED`]: false,
    [`SET_${nameUpper}_SUCCEEDED`]: false,
    [nameLower]: []
  };
}

export default initialStateGetData;
