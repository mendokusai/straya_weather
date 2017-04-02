const AREAS = require('./areas');
const CAPITALS = ['tas', 'act', 'nsw', 'vic', 'sa', 'qld', 'wa', 'nt'];

function parseAreas(input) {
  if (input) {
    const town = input.toLowerCase();
    for (let location of CAPITALS) {
      if (AREAS[location].includes(town)) {
        return {
          'area': location,                              // ACT
          'town': town,                                 // Cooma
          'mapPage': AREAS[location][0].toLowerCase(), // canberra
          'finder': AREAS[location][0].toUpperCase(), // CANBERRA
          'index': AREAS[location].indexOf(town) + 1 // 17
        };
      }
    }
  } else {
    return new Error('No input');
  }
}

module.exports = parseAreas;
