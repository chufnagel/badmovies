-- SET UP SCHEMA HERE
DROP DATABASE IF EXISTS badmovies;

CREATE DATABASE badmovies;

USE badmovies;

CREATE TABLE favorites (
  id INT NOT NULL UNIQUE,
  title varchar(200) not null,
  vote_average INT(20) not null,
  vote_count INT(20),
  popularity INT(20),
  poster_path varchar(200),
  backdrop_path varchar(200),
  overview varchar(1000),
  release_date varchar(200),
  PRIMARY KEY (id)
);

/*
mysql -u root < server/schema.sql
*/
