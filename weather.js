'use strict'

const osmosis = require('osmosis');
const colors = require('colors');

const CAPITALS = ['tas', 'act', 'nsw', 'vic', 'sa', 'qld', 'wa', 'nt'];
const AREAS = {
  'tas': [
    'hobart', 'hobart airport', 'bushy park', 'campania', 'cape bruny', 'dennes point',
    'dover', 'dunalley', 'grove', 'kunanyi', 'maria island', 'orford', 'tasman island'
  ],
  'act': [
    'canberra', 'braidwood', 'cabramurra', 'cooma', 'goulburn', 'montague island',
    'moruya', 'mount ginini', 'narooma', 'nowra', 'perisher valley', 'thredbo',
    'tuggeranong', 'ulladulla', 'yass'
  ],
  'nsw': [
    'sydney', 'sydney airport', 'sydney harbour', 'olympic park', 'badgerys creek', 'bankstown', 'bellambi',
    'camden', 'cambletown', 'canterbury', 'fort denison', 'gosford', 'holsworthy', 'horsley park',
    'katoomba', 'kurnell', 'lake macquarie cooranbong', 'little bay', 'lucas heights', 'mangrove mountain',
    'mount boyce', 'newcastle', 'norah head', 'north head', 'parramatta', 'penrith', 'prospect dam',
    'richmond', 'springwood', 'terrey hills', 'wattamolla', 'williamtown'
  ],
  'vic': [
    'melbourne', 'melbourne airport', 'avalon', 'bundoora', 'cerberus', 'coldstream', 'cranbourne',
    'essendon airport', 'fawkner beacon', 'ferny creek', 'frankston', 'geelong racecourse', 'laverton',
    'moorabbin airport', 'phillip island', 'point wilson', 'rhyll', 'scoresby', 'sheoaks',
    'south channel island', 'st kilda harbour rmys', 'viewbank'
  ],
  'sa': [
    'adelaide', 'adelaide airport', 'edinburgh', 'hindmarsh island', 'kuitpo', 'mount barker',
    'mount crawford', 'mount lofty', 'murray bridge', 'noarlunga', 'nuriootpa', 'outer harbor black pole',
    'pallamana', 'parafield', 'parawa west', 'roseworthy', 'sellicks hill', 'strathalbyn', 'turretfield', 'victor harbor'
  ],
  'qld': [
    'brisbane', 'brisbane airport', 'amberley', 'archerfield', 'banana bank', 'beerburrum', 'beaudesert aws',
    'cape moreton', 'coolangatta', 'double island point', 'gratton', 'gold coast seaway', 'gympie',
    'inner beacon', 'jimna', 'kingaroy', 'logan city', 'maroochydore', 'nambour', 'oakley', 'point lookout',
    'rainbow beach', 'redcliffe', 'redland alexandra hills', 'spitfire channel', 'tewantin', 'toowoomba',
    'warwick', 'wellcamp airport'
  ],
  'wa': [
    'perth', 'perth airport', 'bickley', 'garden island', 'gooseberry hill', 'gosnells', 'hillarys point boat harbour',
    'jandakot', 'mandurah', 'medina', 'melville water', 'ocean reef', 'pearce', 'rottnest island', 'swanbourne'
  ],
  'nt': [
    'darwin', 'darwin harbour', 'batchelor', 'black point', 'channel point', 'charles point', 'dum in mirrie',
    'middle point', 'noonamah', 'pirlangimpi', 'point fawcett', 'point stuart'
  ]
};

function parseAreas(input) {
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
}

function processInput(input) {
  if (input) {
    const loc_data = parseAreas(input);
    if (loc_data) {
      const locObj = {
          url: `http://www.bom.gov.au/${loc_data['area']}/observations/${loc_data['mapPage']}.shtml`,
          finder: `#t${loc_data['finder']}`,
          town: loc_data['town'].replace(' ', '-'),
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

function formatResponseObj(object) {
  const city = `${object['city']}:`.bold.white;
  const temp = colorTemp(`${object['temp']} C`);
  const time = `Recorded at ${object['time']}`.dim.white;
  const wind = colorWind(`🌬  ${object['wind']} ${object['wDir']}`);
  const humidity = colorHumid(`${object['humidity']} 💦 `);
  const space = '|'.gray;
  console.log(city, temp, space, wind, space, humidity, space, time);
}

function colorHumid(humidString) {
  const humidity = Number.parseFloat(humidString);
  switch (true) {
    case (humidity > 90):
      return humidString.bold.white.bgBlue;
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

// Get dat weather
let promise_weather = new Promise(function(resolve, reject) {
  let locObj = processInput(process.argv[2])
  locObj ? resolve(locObj) : reject(console.log);
});

promise_weather.then(getWeatherData, console.log);
