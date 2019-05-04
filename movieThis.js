const axios = require('axios');

const keys = require('./keys');
const log = require('./log.js');

/**
 * Implements movie-this command
 * @param {object} movie default: 'Mr. Nobody'
 */
function movieThis({ movie = 'Mr. Nobody' }) {
	axios
		.get(`http://www.omdbapi.com/?t=${encodeURI(movie)}&apikey=${keys.omdbapi.apiKey}`)
		.then(response => {
			const movie = response.data;
			log([
				`Title:       ${movie.Title}`,
				`Year:        ${movie.Year}`,
				`IMBD Rating: ${movie.Ratings.filter(r => r.Source === 'Internet Movie Database')[0].Value}`,
				`RT Rating:   ${movie.Ratings.filter(r => r.Source === 'Rotten Tomatoes')[0].Value}`,
				`Country:     ${movie.Country}`,
				`Language:    ${movie.Language}`,
				`Actors:      ${movie.Actors}`,
				`Plot:        ${movie.Plot}`
			].join('\n'));
		})
		.catch(error => {
			log(`Error getting movie info: ${error}`);
		});
}

module.exports = movieThis;