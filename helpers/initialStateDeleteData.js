function initialStateDeleteData(name) {
  const nameUpper = name.toUpperCase();

  return {
    [`DELETE_${nameUpper}_STARTED`]: false,
    [`DELETE_${nameUpper}_SUCCEEDED`]: false,
    [`DELETE_${nameUpper}_FAILED`]: false,
    [`DELETE_${nameUpper}_ENDED`]: false
  };
}

export default initialStateDeleteData;
