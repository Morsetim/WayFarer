"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _router = _interopRequireDefault(require("./route/router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = parseInt(process.env.PORT, 10) || 5000;
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.get('/', function (req, res) {
  res.send({
    message: "Welcome to WayFarer Transportation App"
  });
});
app.use('/api/v1', _router["default"]);
app.use('*', function (req, res) {
  res.status(404);
  res.json({
    status: 'Failed',
    message: 'Page not found'
  });
});
app.listen(port, function () {
  console.log("Application listening at port ".concat(port));
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=app.js.map