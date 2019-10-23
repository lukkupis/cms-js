function initialStateApiData(name) {
  const nameUpper = name.toUpperCase();

  return {
    [`${nameUpper}_STARTED`]: false,
    [`${nameUpper}_SUCCEEDED`]: false,
    [`${nameUpper}_FAILED`]: false,
    [`${nameUpper}_ENDED`]: false
  };
}

export default initialStateApiData;
