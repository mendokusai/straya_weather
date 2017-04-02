const colorHumid = require('./colorHumid');
const colorWind = require('./colorWind');
const colorTemp = require('./colorTemp');

function formatResponseObj(object) {
  const city = `${object['city']}:`.bold.white;
  const temp = colorTemp(`${object['temp']} C`);
  const time = `Recorded at ${object['time']}`.dim.white;
  const wind = colorWind(`🌬  ${object['wind']} ${object['wDir']}`);
  const humidity = colorHumid(`${object['humidity']} 💦 `);
  const space = '|'.gray;
  console.log(city, temp, space, wind, space, humidity, space, time);
}

module.exports = formatResponseObj;
