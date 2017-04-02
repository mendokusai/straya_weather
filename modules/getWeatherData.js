const osmosis = require('./../node_modules/osmosis');
const formatResponseObj = require('./formatResponseObj');

function getWeatherData(obj) {
  osmosis
    .get(obj['url'])
    .set({
      'city':`${obj['finder']}-station-${obj['town']}`,
      'time':`${obj['finder']} > tbody > tr:nth-child(${obj['index']}) > td:nth-child(2)`,
      'temp':`${obj['finder']} > tbody > tr:nth-child(${obj['index']}) > td:nth-child(3)`,
      'wind':`${obj['finder']} > tbody > tr:nth-child(${obj['index']}) > td:nth-child(9)`,
      'wDir':`${obj['finder']} > tbody > tr:nth-child(${obj['index']}) > td:nth-child(8)`,
      'humidity':`${obj['finder']} > tbody > tr:nth-child(${obj['index']}) > td:nth-child(6)`
    })
    // .log(console.log) // Logs Osmosois request.
    .data(formatResponseObj)
    .error(console.error);
}

module.exports = getWeatherData;
