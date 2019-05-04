const fs = require('fs');

/**
 * Log a message to `log.txt` and stdout
 * @param {string} message
 */
function log(message) {
	const messageWithBorder = `\n==========\n${message}\n==========\n`;
	fs.appendFile('log.txt', messageWithBorder, err => {
		if (err) {
			console.log('ERROR: Failed to log message.');
			throw err;
		}
		console.log(messageWithBorder);
	});
}

module.exports = log;