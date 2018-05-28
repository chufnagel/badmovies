var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
const axios = require('axios');
const chalk = require('chalk');

// Shell logging with chalk
const log = console.log;
const succ = chalk.bold.green.bgWhite;
const errc = chalk.bold.red.bgBlack;
const warc = chalk.underline.orange;
const infoc = chalk.blue.bgBlack;

// Import database
const db = require('./database.js');

// Check whether local or hosted/set key accordingly
let API_KEY;
try {
  API_KEY = require('./config.js').API_KEY;
} catch (err) {
  API_KEY = process.env.API_KEY;
}

app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));

app.get('/search', (req, res) => {
  const searchUri = 'https://api.themoviedb.org/3/discover/movie';
  const params = {
    api_key: API_KEY,
    sort_by: 'vote_average.asc',
    with_genres: req.query.genre,
  };
  axios.get(searchUri, {
    params: params,
  })
    .then((response) => {
      log(succ('Response received: ', response));
      res.send(response.data);
    })
    .catch((error) => {
      log(errc('Error! ', error));
      res.send(error);
    });
});

app.get('/genres', (req, res) => {
  const getGenresUri = 'https://api.themoviedb.org/3/genre/movie/list';
  const params = {
    api_key: API_KEY,
  };
  axios.get(getGenresUri, {
    params: params,
  })
    .then((response) => {
      log(succ('Response received: ', response));
      res.send(response.data);
    })
    .catch((error) => {
      log(errc('Error! ', error));
    });
});

// retrieve favorites
app.get('/faves', (req, res) => {
  db.getAllFavorites((error, results, data) => {
    if (error) {
      log(errc(error));
      res.send('The server has encountered an error');
    }
    res.send(results);
  });
});


app.post('/save', (req, res) => {
  const vals = [req.body.id, req.body.title, req.body.vote_average, req.body.vote_count, req.body.popularity, req.body.poster_path, req.body.backdrop_path, req.body.overview, req.body.release_date];
  log(infoc('Request body:', req));
  db.saveFavorite(vals, (error, results, data) => {
    if (error) {
      log(errc(error));
      res.send('The server has encountered an error');
    }
    res.send(results);
  });
});

app.post('/delete', (req, res) => {
  const param = [req.body.id];
  db.deleteFavorite(param, (error, results, data) => {
    if (error) {
      log(errc(error));
      res.send('The server has encountered an error'); 
    }
    res.sendStatus(200);
  });
});

app.listen(3000, () => {
  console.log(succ('listening on port 3000!'));
});
