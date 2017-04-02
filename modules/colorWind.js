const colors = require('./../node_modules/colors');

function colorWind(windString) {
  const wind = Number.parseFloat(windString);
  switch (true) {
    case (wind > 25):
      return windString.bold.white.bgBlue;
    case (wind > 20):
      return windString.bold.cyan;
    case (wind > 10):
      return windString.cyan;
    case (wind > 5):
      return windString.bold.white;
    default:
      return windString.white;
  }
}

module.exports = colorWind;
