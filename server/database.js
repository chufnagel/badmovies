const mysql = require('mysql');
const mysqlConfig = require('./config.js');
const sequelize = require('sequelize');

const connection = mysql.createConnection({
  host: mysqlConfig.host,
  user: mysqlConfig.user,
  password: mysqlConfig.password,
  database: mysqlConfig.database,
});

connection.connect();

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

const saveFavorite = function(params, callback) {
  let queryStr = 'insert into favorites(id, poster_path, title, overview, release_date, vote_average, vote_count)\
  values(?, ?, ?, ?, ?, ?, ?)'
  connection.query(queryStr, params, (err, results, fields) => {
    callback(err, results, fields);
  });
};

const deleteFavorite = (movieId, callback) => {
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
  connection: connection,
  getAllFavorites,
  saveFavorite,
  deleteFavorite,
};
