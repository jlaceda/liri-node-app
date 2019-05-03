# liri-node-app
UW Coding Bootcamp Homework - LIRI BOT

## Purpose
LIRI will search Spotify for songs, Bands in Town for concerts, OMDB for movies, and Open Weather Map for weather.

## .env file 
To use this app you need a `.env` file that contains API keys for the different services.
For example:
```
SPOTIFY_ID= 
SPOTIFY_SECRET= 
BANDSINTOWN_KEY= 
OMBDAPI_KEY= 
OPENWEATHER_KEY= 
```

## Commands
### `node liri spotify-this-song <song title>`

[![spotify-this-song](http://img.youtube.com/vi/7bc0eThbvNk/0.jpg)](http://www.youtube.com/watch?v=7bc0eThbvNk)

### `node liri movie-this <movie title>`

[![movie-this](http://img.youtube.com/vi/VTmemW0uwSk/0.jpg)](http://www.youtube.com/watch?v=VTmemW0uwSk)

### `node liri concert-this <artist name>`

[![concert-this](http://img.youtube.com/vi/1iwaICmo36I/0.jpg)](http://www.youtube.com/watch?v=1iwaICmo36I)

### `node liri weather-here <city>`

[![weather-here](http://img.youtube.com/vi/lZYjZQZfWdk/0.jpg)](http://www.youtube.com/watch?v=lZYjZQZfWdk)

### `node liri do-what-it-says`

There needs to be a `random.txt` in the current directory with prewritten commands like this: `<command>,"<query>"`
For example:
```
spotify-this-song,"I Want it That Way"
movie-this,"The Matrix"
concert-this,"Rodrigo y Gabriella"
weather-here,"London"
```

[![do-what-it-says](http://img.youtube.com/vi/CUEyILzGlGs/0.jpg)](http://www.youtube.com/watch?v=CUEyILzGlGs)