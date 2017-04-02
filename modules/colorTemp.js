const colors = require('./../node_modules/colors');

function colorTemp(tempString) {
  const temp = Number.parseFloat(tempString);
  switch (true) {
    case (temp > 50):
      return `${tempString} 🔥 `.bold.mageneta.bgYellow;
    case (temp > 40):
      return `${tempString} 😡 `.bold.red;
    case (temp > 30):
      return tempString.orange;
    case (temp > 25):
      return tempString.bgRed.yellow;
    case (temp > 15):
      return `${tempString} ☀️ `.rainbow;
    case (temp > 10):
      return tempString.bold.green;
    case (temp > 5):
      return tempString.cyan;
    case (temp < 0):
      return `${tempString} ⛄️ `.bold.cyan;
    default:
      return tempString.bold.white;
  }
}

module.exports = colorTemp;
