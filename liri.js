require('dotenv').config();
const processCommand = require('./processCommand');

const [ , , command, ...parameter ] = process.argv;

processCommand(command, parameter);
