import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DEV_URL;
const client = new Client(connectionString);
client.connect();

const createTable = () => {

const createTableText =`
DROP TABLE IF EXISTS users CASCADE;

DROP TABLE IF EXISTS bus CASCADE;

DROP TABLE IF EXISTS trip CASCADE;

DROP TABLE IF EXISTS booking CASCADE;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(155) UNIQUE NOT NULL,
  lastname VARCHAR(155) UNIQUE NOT NULL,
  email VARCHAR(155) UNIQUE NOT NULL,
  password VARCHAR(155) NOT NULL,
  isAdmin BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS bus(
  id SERIAL PRIMARY KEY,
  number_plate VARCHAR(155) NOT NULL,
  manufacturer VARCHAR(155) NOT NULL,
  model VARCHAR(155) NOT NULL,
  year INTEGER NOT NULL,
  capacity INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS trip(
  id SERIAL PRIMARY KEY,
  busId int REFERENCES bus(id) ON DELETE CASCADE,
  origin VARCHAR(155) NOT NULL,
  destination VARCHAR(155) NOT NULL,
  trip_date timestamptz UNIQUE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fare INTEGER NOT NULL,
  status VARCHAR(155) DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS booking(
  id SERIAL PRIMARY KEY,
  tripId int REFERENCES trip(id) ON DELETE CASCADE,
  userId int REFERENCES users(id) ON DELETE CASCADE,
  createdOn timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
 	seat_number INTEGER NOT NULL,
 	bus_id int REFERENCES bus(id) ON DELETE CASCADE,
	tripsDate timestamptz REFERENCES trip(trip_date) ON DELETE CASCADE,
	first_name VARCHAR(155) REFERENCES users(firstname) ON DELETE CASCADE,
	last_name VARCHAR(155) REFERENCES users(lastname) ON DELETE CASCADE,
	email VARCHAR(155) REFERENCES users(email) ON DELETE CASCADE
  )`;



client.query(createTableText, (err) => {
  if (err) {
    return err.message;
  }
  client.end();
});

}
createTable();


