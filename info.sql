CREATE DATABASE CARS;

--  extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
SELECT uuid_generate_v4();

-- users
CREATE TABLE users(
            id VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
            username VARCHAR(64) UNIQUE NOT NULL,
            email VARCHAR(64) UNIQUE NOT NULL,
            role VARCHAR(16) NOT NULL,
            age INT NOT NULL,
            password VARCHAR(128) NOT NULL
          );
ALTER TABLE users ADD COLUMN image TEXT;
          
-- companies
CREATE TABLE companies(
            id VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
            title VARCHAR(64) NOT NULL,
            image TEXT UNIQUE NOT NULL,
            created_by VARCHAR(64) NOT NULL,
            CONSTRAINT fk_created_by
            FOREIGN KEY(created_by) 
	          REFERENCES users(id)
          );

CREATE TABLE cars(
            id VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
            title VARCHAR(32) NOT NULL,
            inside_image TEXT NOT NULL,
            outside_image TEXT NOT NULL,
            side_image TEXT NOT NULL,
            tinted VARCHAR(4) NOT NULL,
            motor VARCHAR(4) NOT NULL,
            year VARCHAR(8) NOT NULL,
            color VARCHAR(16) NOT NULL,
            distance VARCHAR(32) NOT NULL,
            gearbook VARCHAR(16) NOT NULL,
            price VARCHAR(32) NOT NULL,
            description TEXT NOT NULL,
            created_by_comp VARCHAR(64) NOT NULL,
            CONSTRAINT fk_created_by_comp
            FOREIGN KEY(created_by_comp) 
	          REFERENCES companies(id), 
            created_by VARCHAR(64) NOT NULL,
            CONSTRAINT fk_created_by
            FOREIGN KEY(created_by) 
	          REFERENCES users(id) 
);

CREATE TABLE buy(
            id VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
            car_id VARCHAR(64) NOT NULL,
            user_id VARCHAR(64) NOT NULL,
            CONSTRAINT created_by_car
            FOREIGN KEY(car_id) 
	          REFERENCES cars(id),
            CONSTRAINT created_by_user
            FOREIGN KEY(user_id) 
	          REFERENCES users(id)
);

CREATE TABLE liked(
            id VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
            car_id VARCHAR(64) NOT NULL,
            user_id VARCHAR(64) NOT NULL,
            CONSTRAINT created_by_car
            FOREIGN KEY(car_id) 
	          REFERENCES cars(id),
            CONSTRAINT created_by_user
            FOREIGN KEY(user_id) 
	          REFERENCES users(id)
);
