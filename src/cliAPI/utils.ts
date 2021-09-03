import * as request from 'request';
import * as fs from 'fs';

interface IConfig {
  API_KEY: string;
  APP_ID: string;
  PORT: number;
}

let envConfig: IConfig;

const getEnvCongif = (env) => {
  if (envConfig) {
    return envConfig;
  }

  try {
    const config: any = fs.readFileSync(`${process.cwd()}/env.${env}.json`);
    envConfig = JSON.parse(config);
  } catch (e) {
    envConfig = null;
  }

  return envConfig;
};

const config = getEnvCongif(process.env.NODE_ENV);

console.log('CONFIG___>', config);
const API_KEY = config.API_KEY;
const APP_ID = config.APP_ID;

const getMapUrl = (text) => `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${text}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${API_KEY}`
//
const getWeatherUrl = (lat, lng) => `https://samples.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${APP_ID}`;

const getLat = (data) => data.candidates[0].geometry.location.lat;
const getLng = (data) => data.candidates[0].geometry.location.lng;
const getFormattedAddress = (data) => data.candidates[0].formatted_address;

const getWeather = (lat, lng, callback) => {
  request({
    url: getWeatherUrl(lat, lng),
    json: true
  }, (error, response, body) => {
    console.log('Body------>', error, body);
    if (error) {
      callback('Unable to connect to Forecast.io server.');
    } else if (response.statusCode === 400) {
      callback('Unable to fetch weather.');
    } else if (response.statusCode === 200) {
      callback(undefined, {
        temperature: body.main.temp,
        apparentTemperature: body.main.pressure
      });
    }
  });
};

const geocodeAddress = (address, callback) => {
  console.log('-----', address);
  const encodedAddress = encodeURIComponent(address);
  console.log('-----ENCODED', encodedAddress);
  request({
    url: getMapUrl(encodedAddress),
    json: true
  }, (error, response, body) => {
    console.log(3333333, error, body);
    if (error) {
      callback('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address.');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: getFormattedAddress(body),
        latitude: getLat(body),
        longitude: getLng(body),
      });
    } else {
      console.log(body.error_message || 'Something went wrong');
    }
  });
};

export {
  getFormattedAddress,
  geocodeAddress,
  getWeatherUrl,
  getWeather,
  getMapUrl,
  getLat,
  getLng,
}
