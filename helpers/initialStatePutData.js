function initialStatePutData(name) {
  const nameUpper = name.toUpperCase();

  return {
    [`PUT_${nameUpper}_STARTED`]: false,
    [`PUT_${nameUpper}_SUCCEEDED`]: false,
    [`PUT_${nameUpper}_FAILED`]: false,
    [`PUT_${nameUpper}_ENDED`]: false,
    [`PUT_${nameUpper}_SUCCEEDED`]: false
  };
}

export default initialStatePutData;
