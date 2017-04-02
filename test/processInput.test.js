const processInput = require('./../modules/processInput');

describe('when a valid town is input', () => {
   test('returns a object with bom page selector details', () => {
       expect(processInput("norah head")).toEqual({
         "finder": "#tSYDNEY",
         "index": 23,
         "town": "norah-head",
         "url": "http://www.bom.gov.au/nsw/observations/sydney.shtml"
     });
   });
});

describe('without an input', () => {
  test('returns an error', () => {
    expect(processInput()).toThrow(TypeError);
  });
});

describe('with a unknown input', () => {
  test('returns an error', () => {
    expect(processInput('foo')).toThrow(TypeError);
  });
})
