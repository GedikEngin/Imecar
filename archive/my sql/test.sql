-- CREATE DATABASE IF NOT EXISTS dog_app;
-- CREATE DATABASE IF NOT EXISTS slime_shop;
-- CREATE DATABASE IF NOT EXISTS soap_store;

-- SHOW DATABASES;

-- DROP DATABASE dog_app;
-- DROP DATABASE slime_shop;
-- DROP DATABASE soap_store;
DROP DATABASE animals;

-- USE dog_app;

-- SELECT DATABASE();



CREATE DATABASE IF NOT EXISTS animals;


-- SELECT DATABASE();

-- SELECT DATABASE(animals);

USE animals;
CREATE TABLE cats(
    name VARCHAR(50),
    breed VARCHAR(30),
    age INT
);

USE animals;
CREATE TABLE dogs(
    name VARCHAR(50),
    breed VARCHAR(30),
    age INT,
);

