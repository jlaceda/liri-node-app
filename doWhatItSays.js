const fs = require('fs');
const rl = require('readline');

const processCommand = require('./processCommand.js');

/**
 * Implements the do-what-it-says command
 * - reads and parses each line of `random.txt`
 * - runs processCommand()
 */
function doWhatItSays() {
	const reader = rl.createInterface({
		input: fs.createReadStream('random.txt')
	});
	reader.on('line', line => {
		const lineArr = line.split(',');
		const [ command, parameterWithQuotes ] = lineArr;
		// take the quotes out of the parameters
		const parameter = parameterWithQuotes.slice(1, -1);
		processCommand(command, parameter);
	});
}

module.exports = doWhatItSays;