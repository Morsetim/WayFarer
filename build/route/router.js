"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../controller/userController"));

var _tripController = _interopRequireDefault(require("../controller/tripController"));

var _bookSeatController = _interopRequireDefault(require("../controller/bookSeatController"));

var _userValidation = _interopRequireDefault(require("../middleware/userValidation"));

var _tripValidation = _interopRequireDefault(require("../middleware/tripValidation"));

var _tokenAuthentification = _interopRequireDefault(require("../middleware/tokenAuthentification"));

var _checkAdmin = _interopRequireDefault(require("../middleware/checkAdmin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); //User Route


router.route('/auth/signup').post(_userValidation["default"].signUp, _userController["default"].signUp);
router.route('/auth/signin').get(_userValidation["default"].signIn, _userController["default"].signIn); //Trip Route

router.route('/trips/:busId').post(_tokenAuthentification["default"], _checkAdmin["default"], _tripController["default"].createTrip);
router.route('/trips/:tripId').patch(_tokenAuthentification["default"], _tripController["default"].updateTrip);
router.route('/trips').get(_tokenAuthentification["default"], _checkAdmin["default"], _tripController["default"].allTrips); // Bus Route

router.route('/bus').post(_tokenAuthentification["default"], _checkAdmin["default"], _tripValidation["default"].createBus, _tripController["default"].createBus);
router.route('/bus/:busId').get(_tokenAuthentification["default"], _tripController["default"].createBus); // Bookings Route

router.route('/bookings/:tripId').post(_tokenAuthentification["default"], _bookSeatController["default"].seatBooking);
router.route('/bookings/:bookingId')["delete"](_tokenAuthentification["default"], _bookSeatController["default"].deleteBooking);
router.route('/bookings').get(_tokenAuthentification["default"], _checkAdmin["default"], _tripController["default"].allBookings);
router.route('/bookings/user').get(_tokenAuthentification["default"], _tripController["default"].usersBookings);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=router.js.map