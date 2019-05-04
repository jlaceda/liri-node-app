const Spotify = require('node-spotify-api');

const keys = require('./keys');
const spotify = new Spotify(keys.spotify);
const log = require('./log.js');

/**
 * Implements spotify-this-song command
 * @param {object} song default: 'The Sign Ace of Base'
 */
function spotifyThisSong({ song = 'The Sign Ace of Base' }) {
	spotify
		.search({ type: 'track', query: song })
		.then(response => {
			const [ firstTrack ] = response.tracks.items;
			log([
				`Artist:       ${firstTrack.artists[0].name}`,
				`Song Name:    ${firstTrack.name}`,
				`Preview Link: ${firstTrack.preview_url||firstTrack.external_urls.spotify}`,
				`Album:        ${firstTrack.album.name}`
			].join('\n'));
		})
		.catch(error => {
			log(`ERROR: while getting song info: ${error}`);
		});
}

module.exports = spotifyThisSong;