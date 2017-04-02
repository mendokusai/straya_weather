'use strict'

const processInput = require('./modules/processInput');
const getWeatherData = require('./modules/getWeatherData');

// Get dat weather
let promise_weather = new Promise(function(resolve, reject) {
  let locObj = processInput(process.argv[2])
  locObj ? resolve(locObj) : reject(console.log);
});

promise_weather.then(getWeatherData, console.log);
