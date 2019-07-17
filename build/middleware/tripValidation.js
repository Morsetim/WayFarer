"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _validator = _interopRequireDefault(require("validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var tripValidator =
/*#__PURE__*/
function () {
  function tripValidator() {
    _classCallCheck(this, tripValidator);
  }

  _createClass(tripValidator, [{
    key: "createTrip",
    value: function createTrip(req, res, next) {
      var _req$body = req.body,
          origin = _req$body.origin,
          destination = _req$body.destination,
          fare = _req$body.fare;
      var catchErrors = {};

      if (origin == undefined || destination == undefined || fare == undefined) {
        return res.status(422).json({
          status: 'Failed',
          message: 'All or some fields are empty'
        });
      }

      if (_validator["default"].isAlphanumeric(origin)) {
        if (_validator["default"].isEmpty(origin)) {
          catchErrors.origin = 'Field cannot be empty';
        }
      } else {
        catchErrors.origin = 'Fields should contain alphabets and numbers';
      }

      if (_validator["default"].isAlphanumeric(destination)) {
        if (_validator["default"].isEmpty(destination)) {
          catchErrors.destination = 'Field cannot be empty';
        }
      } else {
        catchErrors.destination = 'Fields should contain alphabets and numbers';
      }

      if (_validator["default"].isEmpty(fare)) {
        catchErrors.fare = 'Field cannot be empty';
      }

      if (_validator["default"].isAlpha(fare)) {
        catchErrors.fare = 'Field Should only contain numbers';
      }

      if (Object.keys(catchErrors).length != 0) {
        return res.status(400).json({
          catchErrors: catchErrors
        });
      }

      next();
    }
  }, {
    key: "createBus",
    value: function createBus(req, res, next) {
      var _req$body2 = req.body,
          number_plate = _req$body2.number_plate,
          manufacturer = _req$body2.manufacturer,
          model = _req$body2.model,
          year = _req$body2.year,
          capacity = _req$body2.capacity;
      var catchErrors = {};

      if (number_plate == undefined || manufacturer == undefined || model == undefined || year == undefined || capacity == undefined) {
        return res.status(422).json({
          status: 'Failed',
          message: 'All or some fields are empty'
        });
      }

      if (_validator["default"].isAlphanumeric(number_plate)) {
        if (_validator["default"].isEmpty(number_plate)) {
          catchErrors.number_plate = 'Field cannot be empty';
        }
      } else {
        catchErrors.number_plate = 'Fields should contain alphabets and numbers';
      }

      if (_validator["default"].isAlphanumeric(manufacturer)) {
        if (_validator["default"].isEmpty(manufacturer)) {
          catchErrors.manufacturer = 'Field cannot be empty';
        }
      } else {
        catchErrors.manufacturer = 'Fields should contain alphabets and numbers';
      }

      if (_validator["default"].isAlphanumeric(model)) {
        if (_validator["default"].isEmpty(model)) {
          catchErrors.model = 'Field cannot be empty';
        }
      } else {
        catchErrors.model = 'Fields should contain alphabets and numbers';
      }

      if (_validator["default"].isEmpty(year)) {
        catchErrors.year = 'Field cannot be empty';
      }

      if (_validator["default"].isAlpha(year)) {
        catchErrors.year = 'Field Should only contain numbers';
      }

      if (_validator["default"].isEmpty(capacity)) {
        catchErrors.capacity = 'Field cannot be empty';
      }

      if (_validator["default"].isAlpha(capacity)) {
        catchErrors.capacity = 'Field Should only contain numbers';
      }

      if (Object.keys(catchErrors).length != 0) {
        return res.status(400).json({
          catchErrors: catchErrors
        });
      }

      next();
    }
  }]);

  return tripValidator;
}();

var _default = new tripValidator();

exports["default"] = _default;
//# sourceMappingURL=tripValidation.js.map