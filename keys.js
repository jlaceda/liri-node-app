console.log('keys.js is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

exports.bandsintown = {
  apiKey: process.env.BANDSINTOWN_KEY
};

exports.omdbapi = {
  apiKey: process.env.OMBDAPI_KEY
};
