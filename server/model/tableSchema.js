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

DROP TABLE IF EXISTS trips CASCADE;

DROP TABLE IF EXISTS bookings CASCADE;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(155) NOT NULL,
  lastname VARCHAR(155) NOT NULL,
  email VARCHAR(155) NOT NULL,
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

CREATE TABLE IF NOT EXISTS trips(
  id SERIAL PRIMARY KEY,
  busId int REFERENCES bus(id) ON DELETE CASCADE,
  origin VARCHAR(155) NOT NULL,
  destination VARCHAR(155) NOT NULL,
  trip_date timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fare INTEGER NOT NULL,
  userId int REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(155) DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS bookings(
  id SERIAL PRIMARY KEY,
  tripid int REFERENCES trips(id) ON DELETE CASCADE,
  userId int REFERENCES users(id) ON DELETE CASCADE,
  seat_number INTEGER NOT NULL,
  createdOn timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  
  INSERT INTO users(email, firstName, lastName, password, isAdmin)
  VALUES('mors@test.com','Moris', 'Etim', 123456, true);
  
  INSERT INTO users(email, firstName, lastName, password)
  VALUES('user@test.com','User', 'Etim', 123456);

  INSERT INTO bus(number_plate, manufacturer, model, year, capacity)
  VALUES('546ET6','Toyota','Corolla', 1998, 38);

  INSERT INTO bus(number_plate, manufacturer, model, year, capacity)
  VALUES('546ET7','Boyota','Borolla', 1999, 48);

  INSERT INTO trips(busId, origin, destination, fare, trip_date,userId)
  VALUES(1,'Yaba','Lago', 12, '2019-07-14T09:01:11.530Z',1)
  `;


client.query(createTableText, (err) => {
  if (err) {
    return err.message;
  }
  client.end();
});

}
createTable();


