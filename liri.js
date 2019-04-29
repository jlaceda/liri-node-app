require("dotenv").config();
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);

// first, process user input
// sample commands:
//     node liri.js concert-this '<artist/band name here>'
//     node liri.js spotify-this-song '<song name here>'
//     node liri.js movie-this '<movie name here>'
//     node liri.js do-what-it-says

const validCommands = [
  'concert-this',
  'spotify-this-song',
  'movie-this',
  'do-what-it-says'
];

const command = process.argv[2];

// when user gives a command not in the list.
if (validCommands.indexOf(command) === -1)
{
  console.error('invalid command');
  return;
}

// at this point we have a legit command
console.log(`command: ${command}`);

// if command is not do-what-it-says
// construct the parameter
let parameter;
if (command !== 'do-what-it-says')
{
  parameter = process.argv.slice(3).join(' ');
  console.log(`parameter: ${parameter}`);
}

function processCommand(command, parameter)
{
  switch (command)
  {
    case 'concert-this':
      concertThis(parameter);
      break;
    case 'spotify-this-song':
      spotifyThisSong(parameter);
      break;
    case 'movie-this':
      movieThis(parameter);
      break;
    case 'do-what-it-says':
      doWhatItSays();
      break;
    default:
      console.error('unable to interpret command');
      return;
  }
}

function concertThis(parameter)
{
}

function spotifyThisSong(parameter)
{
}

function movieThis(parameter)
{
}

function doWhatItSays()
{
  // for each line of random.txt:
  //     parse command and parameter
  //     run processCommand(command, parameter)
}
