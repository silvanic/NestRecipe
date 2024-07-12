CREATE DATABASE `kitchen`;
DROP TABLE IF EXISTS RECIPE;

CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT NULL,
    ingredients text[],
    instructions text[],
    tips TEXT NULL
);