const mysql = require('mysql');
const mysqlConfig = require('./config.js');
const sequelize = require('sequelize');

const connection = mysql.createConnection(mysqlConfig);

const chalk = require('chalk');

const log = console.log;
const succ = chalk.bold.green.bgWhite;
const errc = chalk.bold.red.bgBlack;
const warc = chalk.underline.orange;
const infoc = chalk.blue.bgBlack;

const getAllFavorites = (callback) => {
  // get favorites from the database
  const myQuery = 'SELECT * FROM favorites';
  connection.query(myQuery, (error, data) => {
    if (error) {
      log(errc(error));
      callback(error, null);
    } else {
      log(infoc(data));
      callback(null, data);
    }
  });
};

const saveFavorite = (movie, callback) => {
  // save movie to favorites in the database
  let queryStr = `INSERT INTO movies VALUES ( ${id}, '${title}', ${vote_average}, ${vote_count}, ${popularity}, '${poster_path}', '${backdrop_path}', '${overview}', '${release_date}');`;
  connection.query(queryStr, (error, success) => {
    if (error) {
      log(errc(error));
      callback(error, null);
    } else {
      log(succ(success));
      callback(null, success);
    }
  });
};

const deleteFavorites = (movieId, callback) => {
  // delete a movie from favorites in the database
  const queryStr = `DELETE FROM favorites WHERE id = '${movieId}'`;
  connection.query(queryStr, (error, success) => {
    if (error) {
      log(errc(error));
      callback(error, null);
    } else {
      log(succ(success));
      callback(null, success);
    }
  });
};

module.exports = {
  getAllFavorites,
  saveFavorite,
  deleteFavorites,
};
