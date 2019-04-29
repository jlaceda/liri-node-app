require("dotenv").config();
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);

const commands = [
  'concert-this',
  'spotify-this-song',
  'movie-this',
  'do-what-it-says'
];

const userCommand = process.argv[2];

// when user gives a command not in the list.
if (commands.indexOf(userCommand) === -1)
{
  console.error('invalid command');
  return;
}

console.log(`user command: ${userCommand}`);

switch (userCommand)
{
  case 'concert-this':
    concertThis();
    break;
  case 'spotify-this-song':
    spotifyThisSong();
    break;
  case 'movie-this':
    movieThis();
    break;
  case 'do-what-it-says':
    doWhatItSays();
    break;
  default:
    console.error('unable to interpret command');
    return;
}

function concertThis()
{
}

function spotifyThisSong()
{
}

function movieThis()
{
}

function doWhatItSays()
{
}
