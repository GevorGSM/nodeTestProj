import * as yargs from 'yargs';
import axios from 'axios';

import { getFormattedAddress, getLat, getLng, getMapUrl, getWeatherUrl } from './utils';

const argv = yargs
  .options({
    address: {
      demand: false,
      alias: 'a',
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

// ----------------------
const encodedAddress = encodeURIComponent(argv.address as any);
const geocodeUrl = getMapUrl(encodedAddress);

debugger;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }

  const lat = getLat(response.data);
  const lng = getLng(response.data);
  const weatherUrl = getWeatherUrl(lat, lng);
  console.log(getFormattedAddress(response.data), lat, lng);
  return axios.get(weatherUrl);
}).then((response) => {
  const temperature = response.data.currently.temperature;
  const apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers.');
  } else {
    console.log(e.message);
  }
});
