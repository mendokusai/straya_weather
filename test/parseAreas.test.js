const parseAreas = require('./../modules/parseAreas');

describe('when a valid value is input', () => {
  test('returns an array of data', () => {
    expect(parseAreas('norah head')).toEqual({
      "area": "nsw",
      "finder": "SYDNEY",
      "index": 23,
      "mapPage": "sydney",
      "town": "norah head"
    });
  });
});

describe('when an invalid value is input', () => {
  test('returns an error', () => {
    expect(parseAreas('foo')).toEqual();
  });
});

describe('when no input', () => {
  test('returns an error', () => {
    expect(parseAreas()).toThrow(TypeError)
  });
});
