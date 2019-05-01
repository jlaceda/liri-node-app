require("dotenv").config();
const Spotify = require('node-spotify-api');
const axios = require('axios');
const moment = require('moment')
const keys = require("./keys.js");
const fs = require('fs');
const rl = require('readline');
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

// actually process the command
processCommand(command, parameter);

function concertThis(artist)
{
  console.log(`doing concertThis on ${artist}`);
  axios.get(`https://rest.bandsintown.com/artists/${encodeURI(artist)}/events?app_id=${keys.bandsintown.apiKey}`)
    .then((response) =>
    {
      response.data.forEach((concert) =>
      {
        console.log(`
Venue:   ${concert.venue.name}
City:    ${concert.venue.city}, ${concert.venue.region||concert.venue.country}
Date:    ${moment(concert.datetime).format('MM/DD/YYYY')}`);
      });
    })
    .catch((error) =>
    {
      console.error('error getting concerts', error);
    });
};

function spotifyThisSong(song)
{
  if (song.length === 0)
  {
    song = 'The Sign Ace of Base';
  }
  console.log(`doing spotifyThisSong on ${song}`);
  spotify
    .search({ type: 'track', query: song })
    .then((response) =>
    {
      const firstTrack = response.tracks.items[0];
      console.log(`
Artist:       ${firstTrack.artists[0].name}
Song Name:    ${firstTrack.name}
Preview Link: ${firstTrack.preview_url||firstTrack.external_urls.spotify}
Album:        ${firstTrack.album.name}`);
    })
    .catch((error) =>
    {
      console.log('error getting song info', error);
    });
}

function movieThis(movie)
{
  console.log(`doing movieThis on ${movie}`);
}

function doWhatItSays()
{
  // for each line of random.txt:
  //     parse command and parameter
  //     run processCommand(command, parameter)
  
  const reader = rl.createInterface({
    input: fs.createReadStream('random.txt')
  });

  reader.on('line', (line) => {
    let lineArr = line.split(`,`);
    const command = lineArr[0];
    // take the quotes out of the parameters
    const parameter = lineArr[1].slice(1,-1);
    processCommand(command, parameter);
  });
}
