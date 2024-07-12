CREATE DATABASE `kitchen`;

DROP TABLE recipe;

DROP TABLE author;

CREATE TABLE author (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
	created_on TIMESTAMP,
    author_id INT,
    name VARCHAR(255),
    description TEXT NULL,
    ingredients text[],
    instructions text[],
    tips TEXT NULL,
	FOREIGN KEY(author_id) REFERENCES author(id)
);