"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _db = _interopRequireDefault(require("../model/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var Booking = /*#__PURE__*/function () {
  function Booking() {
    _classCallCheck(this, Booking);
  }

  _createClass(Booking, [{
    key: "seatBooking",
    value: function seatBooking(req, res) {
      var seat_number = req.body.seat_number;
      var createdOn = new Date();
      var _req$decoded = req.decoded,
          email = _req$decoded.email,
          firstName = _req$decoded.firstName,
          lastName = _req$decoded.lastName;
      var userId = req.decoded.user_id;
      var tripId = parseInt(req.params.tripId);

      _db["default"].query("SELECT id FROM trips WHERE id =".concat(tripId)).then(function (trip) {
        if (trip.rowCount < 1) {
          return res.status(422).json({
            status: 'Failed',
            message: "Trip with ID ".concat(tripId, " does not exist")
          });
        }

        var sql = 'INSERT INTO bookings(seat_number, createdOn,userId, tripId) VALUES($1, $2, $3,$4) RETURNING *';
        var params = [seat_number, createdOn, userId, tripId];

        _db["default"].query(sql, params).then(function (book) {
          return res.status(201).json({
            status: 'success',
            data: _objectSpread(_objectSpread({}, book.rows[0]), {}, {
              firstName: firstName,
              email: email,
              lastName: lastName
            })
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
     * @memberof Booking
     */

  }, {
    key: "deleteBooking",
    value: function deleteBooking(req, res) {
      var userId = req.decoded.user_id;
      var bookingId = req.params.bookingId;
      var sql = "DELETE FROM bookings WHERE id= ".concat(bookingId, " AND userId = ").concat(userId);

      _db["default"].query(sql).then(function () {
        return res.status(201).json({
          message: 'Booking deleted successfully'
        });
      })["catch"](function (e) {
        return console.log(e);
      });
    }
  }]);

  return Booking;
}();

var _default = new Booking();

exports["default"] = _default;
//# sourceMappingURL=bookSeatController.js.map