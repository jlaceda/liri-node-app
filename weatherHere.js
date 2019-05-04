const axios = require('axios');

const keys = require('./keys');
const log = require('./log.js');

/**
 * Implements weather-here command
 * @param {string} city default: 'seattle'
 */
function weatherHere({ city = 'seattle' }) {
	axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=${keys.openweather.apiKey}`)
		.then(response => {
			log(`The weather in ${response.data.name} is currently ${response.data.weather[0].description}.`)
		})
		.catch(error => {
			log(`Error getting weather.: ${error}`);
		});
}

module.exports = weatherHere;