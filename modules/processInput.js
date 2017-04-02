const parseAreas = require('./parseAreas');
const handleSpecialNames = require('./handleSpecialNames');

function processInput(input) {
  if (input) {
    const loc_data = parseAreas(input);
    if (loc_data) {
      const locObj = {
          url: `http://www.bom.gov.au/${loc_data['area']}/observations/${loc_data['mapPage']}.shtml`,
          finder: `#t${loc_data['finder']}`,
          town: handleSpecialNames(input).replace(' ', '-'),
          index: loc_data['index']
      };
      return locObj;
    } else {
      return new Error('City not found');
    }
  } else {
    return new Error('No city entered');
  }
}

module.exports = processInput;
