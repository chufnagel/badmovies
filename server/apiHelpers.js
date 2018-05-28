
// const request = require('request');
// const axios = require('axios');
// const chalk = require('chalk');

// const log = console.log;
// const succ = chalk.bold.green.bgWhite;
// const errc = chalk.bold.red.bgBlack;
// const warc = chalk.underline.orange;
// const infoc = chalk.blue.bgBlack;

// let API_KEY;
// try {
//   API_KEY = require('./config.js').API_KEY;
// } catch (err) {
//   API_KEY = process.env.API_KEY;
// }
// const language = 'en-US';


// // example request
// // https://api.themoviedb.org/3/movie/550?`${API_KEY}`

// // write out logic/functions required to query TheMovieDB.org

// // FOR REFERENCE:
// // https://www.themoviedb.org/account/signup
// // https://developers.themoviedb.org/3/discover/movie-discover

// // Don't forget to export your functions and require them within your server file

// const getGenres = () => {
//   const genreUri = 'https://api.themoviedb.org/3/genre/movie/list';
//   const genreQuery = { API_KEY, language };
//   return axios.get(genreUri, { params: genreQuery });
// };


// const searchMovies = queryObj => {
//   // configure the query object to get the results you want


// module.exports.getGenres = function() {};
// module.exports.searchMovies = function() {};
