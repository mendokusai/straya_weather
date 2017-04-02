CITY_TRANSLATIONS = {
  "sydney" : "sydney-observatory-hill"
};

function handleSpecialNames(input) {
  const translation = CITY_TRANSLATIONS[input.toLowerCase()];
  if (translation) {
    return translation;
  } else {
    return input;
  }
}

module.exports = handleSpecialNames;
