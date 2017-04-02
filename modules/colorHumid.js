const colors = require('./../node_modules/colors');

function colorHumid(humidString) {
  const humidity = Number.parseFloat(humidString);
  switch (true) {
    case (humidity > 90):
      return humidString.bold.black.bgCyan;
    case (humidity > 80):
      return humidString.bold.blue;
    case (humidity > 75):
      return humidString.bold.blue;
    case (humidity > 70):
      return humidString.cyan;
    case (humidity > 50):
      return humidString.dim.cyan;
    case (humidity > 30):
      return humidString.white;
    default:
      return humidString.dim.white;
  }
}

module.exports = colorHumid;
