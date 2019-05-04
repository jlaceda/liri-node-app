const axios = require('axios');
const moment = require('moment');

const keys = require('./keys');
const log = require('./log');

/**
 * Implements concert-this command
 * @param {Object} artist default: 'Muse'
 */
function concertThis({ artist = 'Muse' }) {
	axios
		.get(`https://rest.bandsintown.com/artists/${encodeURI(artist)}/events?app_id=${keys.bandsintown.apiKey}`)
		.then(response => {
			// look at only the first concert
			const [ { lineup, venue, datetime } ] = response.data;
			const { name, city, region, country } = venue;
			log([
				`Artist: ${lineup[0]}`,
				`Venue:  ${name}`,
				`City:   ${city}, ${region||country}`,
				`Date:   ${moment(datetime).format('MM/DD/YYYY')}`
			].join('\n'));
		})
		.catch(error => {
			log('ERROR: while getting concert info', error);
		});
};

module.exports = concertThis;