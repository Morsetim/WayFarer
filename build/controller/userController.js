"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _db = _interopRequireDefault(require("../model/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var UserController = /*#__PURE__*/function () {
  function UserController() {
    _classCallCheck(this, UserController);
  }

  _createClass(UserController, [{
    key: "signUp",
    value: function signUp(req, res) {
      var _req$body = req.body,
          email = _req$body.email,
          firstName = _req$body.firstName,
          lastName = _req$body.lastName,
          password = _req$body.password;

      var hashedPassword = _bcrypt["default"].hashSync(password, 10);

      _db["default"].query("SELECT id FROM users WHERE email = '".concat(email, "'")).then(function (userFound) {
        if (userFound.rows.length === 1) {
          return res.status(409).json({
            Status: 'Failed',
            Message: 'User Already Exist'
          });
        }

        var sql = 'INSERT INTO users(email, firstName, lastName, password) VALUES($1, $2, $3, $4) RETURNING *';
        var params = [email, firstName, lastName, hashedPassword];

        _db["default"].query(sql, params).then(function (user) {
          console.log(user);
          var payload = {
            UserId: user.rows[0].id,
            email: email,
            firstName: firstName,
            lastName: lastName
          };

          var token = _jsonwebtoken["default"].sign(payload, process.env.SECRET_KEY, {
            expiresIn: 60 * 60 * 10 // 10 hours

          });

          req.token = token;
          return res.status(201).json({
            Status: 'success',
            Data: {
              user_id: user.rows[0].id,
              is_admin: user.rows[0].isadmin,
              Message: 'Successfully created WayFarer account',
              Token: token
            }
          });
        })["catch"](function (err) {
          return res.status(500).json({
            Status: 'Failed',
            Message: err.message
          });
        });
      })["catch"](function (err) {
        return res.status(500).json({
          Status: 'Failed',
          Message: err.message
        });
      });
    }
  }, {
    key: "signIn",
    value: function signIn(req, res) {
      var _req$body2 = req.body,
          email = _req$body2.email,
          password = _req$body2.password;

      _db["default"].query("SELECT * FROM users WHERE email = '".concat(email, "'")).then(function (user) {
        if (user.rows.length === 1) {
          var hashedPassword = _bcrypt["default"].compareSync(password, user.rows[0].password);

          var comparePassword = hashedPassword;

          if (comparePassword) {
            var payload = {
              user_id: user.rows[0].id,
              email: email,
              first_name: user.rows[0].firstname,
              last_name: user.rows[0].lastname,
              is_admin: user.rows[0].isadmin
            };

            var token = _jsonwebtoken["default"].sign(payload, process.env.SECRET_KEY, {
              expiresIn: 60 * 60 * 10
            }); // Expires in 10 hours


            req.token = token;
            return res.status(201).json({
              status: 'success',
              data: {
                user_id: user.rows[0].id,
                is_admin: user.rows[0].isadmin,
                Token: token,
                message: 'You are now logged in'
              }
            });
          }
        }

        return res.status(422).json({
          status: 'Failed',
          message: 'Invalid Email or Password'
        });
      })["catch"](function (err) {
        return res.status(500).json({
          Status: 'Failed',
          Message: err.message
        });
      });
    }
  }]);

  return UserController;
}();

var _default = new UserController();

exports["default"] = _default;
//# sourceMappingURL=userController.js.map