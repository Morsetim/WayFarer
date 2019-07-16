"use strict";

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _config = _interopRequireDefault(require("../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var env = process.env.NODE_ENV || 'development';
var config = _config["default"][env];
var connectionString = config.url;
console.log(env, '-----env------');
var client = new _pg.Client(connectionString);
client.connect();

var hashedPassword = _bcrypt["default"].hashSync('123456', 10);

var createTable = function createTable() {
  var createTableText = "\nDROP TABLE IF EXISTS users CASCADE;\n\nDROP TABLE IF EXISTS bus CASCADE;\n\nDROP TABLE IF EXISTS trips CASCADE;\n\nDROP TABLE IF EXISTS bookings CASCADE;\n\nCREATE TABLE IF NOT EXISTS users (\n  id SERIAL PRIMARY KEY,\n  firstname VARCHAR(155) NOT NULL,\n  lastname VARCHAR(155) NOT NULL,\n  email VARCHAR(155) NOT NULL,\n  password VARCHAR(155) NOT NULL,\n  isAdmin BOOLEAN DEFAULT false\n);\n\nCREATE TABLE IF NOT EXISTS bus(\n  id SERIAL PRIMARY KEY,\n  number_plate VARCHAR(155) NOT NULL,\n  manufacturer VARCHAR(155) NOT NULL,\n  model VARCHAR(155) NOT NULL,\n  year INTEGER NOT NULL,\n  capacity INTEGER NOT NULL\n);\n\nCREATE TABLE IF NOT EXISTS trips(\n  id SERIAL PRIMARY KEY,\n  busId int REFERENCES bus(id) ON DELETE CASCADE,\n  origin VARCHAR(155) NOT NULL,\n  destination VARCHAR(155) NOT NULL,\n  trip_date timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  fare INTEGER NOT NULL,\n  userId int REFERENCES users(id) ON DELETE CASCADE,\n  status VARCHAR(155) DEFAULT 'active'\n);\n\nCREATE TABLE IF NOT EXISTS bookings(\n  id SERIAL PRIMARY KEY,\n  tripid int REFERENCES trips(id) ON DELETE CASCADE,\n  userId int REFERENCES users(id) ON DELETE CASCADE,\n  seat_number INTEGER NOT NULL,\n  createdOn timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP\n  );\n  \n   INSERT INTO users(email, firstName, lastName, password, isAdmin)\n   VALUES('admin@test.com','Admin', 'Etim', '".concat(hashedPassword, "', true);\n  \n   INSERT INTO users(email, firstName, lastName, password)\n  VALUES('user@test.com','User', 'Etim', '").concat(hashedPassword, "');\n\n\n  INSERT INTO bus(number_plate, manufacturer, model, year, capacity)\n  VALUES('546ET6','Toyota','Corolla', 1998, 38);\n\n  INSERT INTO bus(number_plate, manufacturer, model, year, capacity)\n  VALUES('546ET7','Boyota','Borolla', 1999, 48);\n\n  INSERT INTO trips(busId, origin, destination, fare, trip_date,userId)\n  VALUES(1,'Yaba','Lago', 12, '2019-07-14T09:01:11.530Z',1)\n  ");
  client.query(createTableText, function (err) {
    if (err) {
      return err.message;
    }

    client.end();
  });
};

createTable();
//# sourceMappingURL=tableSchema.js.map