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
  log('invalid command\n');
  return;
}

// at this point we have a legit command
log(`command: ${command}\n`);

// if command is not do-what-it-says
// construct the parameter
let parameter;
if (command !== 'do-what-it-says')
{
  parameter = process.argv.slice(3).join(' ');
  log(`parameter: ${parameter}\n`);
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
      log('unable to interpret command\n');
      return;
  }
}

// actually process the command
processCommand(command, parameter);

function concertThis(artist)
{
  log(`doing concertThis on ${artist}\n`);
  axios.get(`https://rest.bandsintown.com/artists/${encodeURI(artist)}/events?app_id=${keys.bandsintown.apiKey}`)
    .then((response) =>
    {
      response.data.forEach((concert) =>
      {
        log(`
Venue:   ${concert.venue.name}
City:    ${concert.venue.city}, ${concert.venue.region||concert.venue.country}
Date:    ${moment(concert.datetime).format('MM/DD/YYYY')}\n`);
      });
    })
    .catch((error) =>
    {
      log('error getting concerts', error, '\n');
    });
};

function spotifyThisSong(song)
{
  if (song.length === 0)
  {
    song = 'The Sign Ace of Base';
  }
  log(`doing spotifyThisSong on ${song}\n`);
  spotify
    .search({ type: 'track', query: song })
    .then((response) =>
    {
      const firstTrack = response.tracks.items[0];
      log(`
Artist:       ${firstTrack.artists[0].name}
Song Name:    ${firstTrack.name}
Preview Link: ${firstTrack.preview_url||firstTrack.external_urls.spotify}
Album:        ${firstTrack.album.name}\n`);
    })
    .catch((error) =>
    {
      log('error getting song info', error, '\n');
    });
}

function movieThis(movie)
{
  if (movie.length === 0)
  {
    movie = "Mr. Nobody"
  }
  log(`doing movieThis on ${movie}\n`);

  // * Title of the movie.
  // * Year the movie came out.
  // * IMDB Rating of the movie.
  // * Rotten Tomatoes Rating of the movie.
  // * Country where the movie was produced.
  // * Language of the movie.
  // * Plot of the movie.
  // * Actors in the movie.
  
  axios.get(`http://www.omdbapi.com/?t=${encodeURI(movie)}&apikey=${keys.omdbapi.apiKey}`)
    .then((response) =>
    {
      response.data
      log(`
Title:       ${response.data.Title}
Year:        ${response.data.Year}
IMBD Rating: ${response.data.Ratings.filter(r => r.Source === 'Internet Movie Database')[0].Value}
RT Rating:   ${response.data.Ratings.filter(r => r.Source === 'Rotten Tomatoes')[0].Value}
Country:     ${response.data.Country}
Language:    ${response.data.Language}
Actors:      ${response.data.Actors}
Plot:        ${response.data.Plot}\n`);
    })
    .catch((error) =>
    {
      log('error getting movie info', error, '\n');
    });

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

function log(message)
{
  fs.appendFile('log.txt', message, (err) => {
    if (err) throw err;
    console.log(message);
  });
}