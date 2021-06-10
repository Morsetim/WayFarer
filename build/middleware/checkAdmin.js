"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var checkAdmin = function checkAdmin(req, res, next) {
  req.decoded.is_admin ? next() : res.status(200).send({
    Message: 'You are not permitted'
  });
};

var _default = checkAdmin;
exports["default"] = _default;
//# sourceMappingURL=checkAdmin.js.map