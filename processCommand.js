/**
 * Decides what function to run based on command
 * @param {string} command command to execute
 * @param {any} parameter parameter for the command (could be array or string)
 */
function processCommand(command, parameter) {
	const validCommands = [
		'concert-this',
		'spotify-this-song',
		'movie-this',
		'weather-here',
		'do-what-it-says'
	];
	if (validCommands.indexOf(command) === -1) {
		log('ERROR: invalid command');
		return;
	}
	if (Array.isArray(parameter)) {
		parameter = parameter.join(' ');
	}
	switch (command) {
		case 'concert-this':
			require('./concertThis')({ artist: parameter });
			break;
		case 'spotify-this-song':
			require('./spotifyThisSong')({ song: parameter });
			break;
		case 'movie-this':
			require('./movieThis')({ movie: parameter });
			break;
		case 'weather-here':
			require('./weatherHere')({ city: parameter });
			break;
		case 'do-what-it-says':
			require('./doWhatItSays')();
			break;
		default:
			require('./log')('ERROR: Unable to interpret command.');
			return;
	}
}

module.exports = processCommand;