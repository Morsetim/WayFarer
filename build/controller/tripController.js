"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _db = _interopRequireDefault(require("../model/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();
/**
 *
 *
 * @class TripController
 */


var TripController =
/*#__PURE__*/
function () {
  function TripController() {
    _classCallCheck(this, TripController);
  }

  _createClass(TripController, [{
    key: "createTrip",

    /**
     *
     *
     * @param {obj} req
     * @param {obj} res
     * @memberof TripController
     */
    value: function createTrip(req, res) {
      var _req$body = req.body,
          origin = _req$body.origin,
          destination = _req$body.destination,
          fare = _req$body.fare;
      var trip_date = new Date();
      var userId = req.decoded.user_id;
      var busId = parseInt(req.params.busId);

      _db["default"].query("SELECT id FROM bus WHERE id=".concat(busId)).then(function (bus) {
        var selectedBus = bus.rows.find(function (bus) {
          return bus.id === busId;
        });

        if (selectedBus.rowCount < 1) {
          return res.status(422).json({
            status: 'Failed',
            message: "Bus with ID ".concat(busId, " doest not exist")
          });
        }

        var sql = 'INSERT INTO trips(busId, userId, origin, destination, fare, trip_date) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
        var params = [busId, userId, origin, destination, fare, trip_date];

        _db["default"].query(sql, params).then(function (info) {
          return res.status(201).json({
            Status: 'success',
            Data: info.rows[0]
          });
        })["catch"](function (err) {
          return res.status(500).json({
            status: 'Failed',
            message: err.message
          });
        });
      })["catch"](function (err) {
        return res.status(500).json({
          status: 'Failed',
          message: err.message
        });
      });
    }
    /**
     *
     *
     * @param {obj} req
     * @param {obj} res
     * @memberof TripController
     */

  }, {
    key: "allTrips",
    value: function allTrips(req, res) {
      var sql = "SELECT * FROM trips";

      _db["default"].query(sql).then(function (info) {
        return res.status(201).json({
          Status: 'success',
          Data: info.rows
        });
      })["catch"](function (err) {
        return res.status(500).json({
          Status: 'Failed',
          Message: err.message
        });
      });
    }
    /**
     *
     *
     * @param {obj} req
     * @param {obj} res
     * @memberof TripController
     */

  }, {
    key: "createBus",
    value: function createBus(req, res) {
      var _req$body2 = req.body,
          number_plate = _req$body2.number_plate,
          manufacturer = _req$body2.manufacturer,
          model = _req$body2.model,
          year = _req$body2.year,
          capacity = _req$body2.capacity;
      var sql = 'INSERT INTO bus(number_plate, manufacturer, model, year, capacity) VALUES($1,$2,$3,$4,$5) RETURNING *';
      var params = [number_plate, manufacturer, model, year, capacity];

      _db["default"].query(sql, params).then(function (info) {
        return res.status(201).json({
          Status: 'success',
          data: info.rows[0]
        });
      })["catch"](function (err) {
        return res.status(500).json({
          Status: 'Failed',
          Message: err.message
        });
      });
    }
  }, {
    key: "updateTrip",
    value: function updateTrip(req, res) {
      var tripId = req.params.tripId;
      var userId = req.decoded.user_id;
      var sql = "UPDATE trips SET status='Cancelled' WHERE id=".concat(tripId, " AND userId=").concat(userId);

      _db["default"].query(sql).then(function () {
        return res.status(201).json({
          message: 'Trip cancelled successfully'
        });
      })["catch"](function (err) {
        return res.status(500).json({
          Status: 'Failed',
          Message: err.message
        });
      });
    }
  }, {
    key: "allBookings",
    value: function allBookings(req, res) {
      var sql = "SELECT * FROM bookings";

      _db["default"].query(sql).then(function (info) {
        console.log(info.rows);
        return res.status(201).json({
          status: 'Success',
          data: info.rows
        });
      })["catch"](function (err) {
        return res.status(500).json({
          Status: 'Failed',
          Message: err.message
        });
      });
    }
  }, {
    key: "usersBookings",
    value: function usersBookings(req, res) {
      var userId = req.decoded.user_id;
      var sql = "SELECT * FROM bookings WHERE userId = ".concat(userId);

      _db["default"].query(sql).then(function (info) {
        return res.status(201).json({
          status: 'Success',
          data: info.rows
        });
      })["catch"](function (err) {
        return res.status(500).json({
          Status: 'Failed',
          Message: err.message
        });
      });
    }
  }]);

  return TripController;
}();

var _default = new TripController();

exports["default"] = _default;
//# sourceMappingURL=tripController.js.map