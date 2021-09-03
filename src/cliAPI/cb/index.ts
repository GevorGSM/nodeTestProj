import * as yargs from 'yargs';

import { geocodeAddress, getWeather } from '../utils';

const argv = yargs
  .options({
    address: {
      demand: false,
      alias: 'address',
      describe: 'Address to fetch weather for',
    },
    latitude: {
      describe: 'Lat',
    },
    longitude: {
      describe: 'Lat',
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

console.log(2222222, argv);

// getWeather(argv.latitude, argv.longitude, (errorMessage, weatherResults) => {
//   if (errorMessage) {
//     console.log(errorMessage);
//   } else {
//     console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
//   }
// });
geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(1111111, results);
    console.log(results.address);
    getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
      }
    });
  }
});
