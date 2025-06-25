"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _mongodb = require("mongodb");
var _path = _interopRequireDefault(require("path"));
_dotenv["default"].config();
var uri = "mongodb+srv://valoraiko:".concat(process.env.DB_PASSWORD, "@cluster0.ke0dzuy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
function start() {
  return _start.apply(this, arguments);
}
function _start() {
  _start = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7() {
    var client, app, db, mapProducts, port;
    return _regenerator["default"].wrap(function (_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          client = new _mongodb.MongoClient(uri);
          app = (0, _express["default"])();
          app.use(_express["default"].json());
          app.use('/images', _express["default"]["static"](_path["default"].join(__dirname, '../assets')));
          app.use(_express["default"]["static"](_path["default"].resolve(__dirname, '../dist'), {
            maxAge: '1y',
            etag: false
          }));
          _context7.next = 1;
          return client.connect();
        case 1:
          db = client.db('fsv-db');
          mapProducts = /*#__PURE__*/function () {
            var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(ids) {
              return _regenerator["default"].wrap(function (_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    if (ids) {
                      _context.next = 1;
                      break;
                    }
                    return _context.abrupt("return", []);
                  case 1:
                    return _context.abrupt("return", Promise.all(ids.map(function (id) {
                      return db.collection('products').findOne({
                        id: id
                      });
                    })));
                  case 2:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function mapProducts(_x) {
              return _ref.apply(this, arguments);
            };
          }();
          app.get('/api/products', /*#__PURE__*/function () {
            var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
              var prodcuts;
              return _regenerator["default"].wrap(function (_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 1;
                    return db.collection('products').find({}).toArray();
                  case 1:
                    prodcuts = _context2.sent;
                    res.json(prodcuts);
                  case 2:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x2, _x3) {
              return _ref2.apply(this, arguments);
            };
          }());
          app.get('/api/products/:productId', /*#__PURE__*/function () {
            var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
              var product;
              return _regenerator["default"].wrap(function (_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 1;
                    return db.collection('products').findOne({
                      id: req.params.productId
                    });
                  case 1:
                    product = _context3.sent;
                    res.json(product);
                  case 2:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function (_x4, _x5) {
              return _ref3.apply(this, arguments);
            };
          }());
          app.get('/api/users/:userId/cart', /*#__PURE__*/function () {
            var _ref4 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
              var userId, user, _t, _t2;
              return _regenerator["default"].wrap(function (_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    userId = req.params.userId;
                    _context4.next = 1;
                    return db.collection('users').findOne({
                      id: userId
                    });
                  case 1:
                    user = _context4.sent;
                    _t = res;
                    _context4.next = 2;
                    return mapProducts(user === null || user === void 0 ? void 0 : user.cartItems);
                  case 2:
                    _t2 = _context4.sent;
                    _t.json.call(_t, _t2);
                  case 3:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return function (_x6, _x7) {
              return _ref4.apply(this, arguments);
            };
          }());
          app.post('/api/users/:userId/cart', /*#__PURE__*/function () {
            var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
              var userId, productId, user, _t3, _t4;
              return _regenerator["default"].wrap(function (_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    userId = req.params.userId;
                    productId = req.body.id;
                    _context5.next = 1;
                    return db.collection('users').updateOne({
                      id: userId
                    }, {
                      $addToSet: {
                        cartItems: productId
                      }
                    }, {
                      upsert: true
                    });
                  case 1:
                    _context5.next = 2;
                    return db.collection('users').findOne({
                      id: req.params.userId
                    });
                  case 2:
                    user = _context5.sent;
                    _t3 = res;
                    _context5.next = 3;
                    return mapProducts(user === null || user === void 0 ? void 0 : user.cartItems);
                  case 3:
                    _t4 = _context5.sent;
                    _t3.json.call(_t3, _t4);
                  case 4:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5);
            }));
            return function (_x8, _x9) {
              return _ref5.apply(this, arguments);
            };
          }());
          app["delete"]('/api/users/:userId/cart/:productId', /*#__PURE__*/function () {
            var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
              var userId, productId, user, _t5, _t6;
              return _regenerator["default"].wrap(function (_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    userId = req.params.userId;
                    productId = req.params.productId;
                    _context6.next = 1;
                    return db.collection('users').updateOne({
                      id: userId
                    }, {
                      $pull: {
                        cartItems: productId
                      }
                    });
                  case 1:
                    _context6.next = 2;
                    return db.collection('users').findOne({
                      id: userId
                    });
                  case 2:
                    user = _context6.sent;
                    _t5 = res;
                    _context6.next = 3;
                    return mapProducts(user === null || user === void 0 ? void 0 : user.cartItems);
                  case 3:
                    _t6 = _context6.sent;
                    _t5.json.call(_t5, _t6);
                  case 4:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6);
            }));
            return function (_x0, _x1) {
              return _ref6.apply(this, arguments);
            };
          }());
          app.get("\\*", function (req, res) {
            res.sendFile(_path["default"].join(__dirname, '../dist/index.html'));
          });
          port = process.env.PORT || 8000;
          app.listen(port, function () {
            console.log("Server is listening on ".concat(port));
          });
        case 2:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _start.apply(this, arguments);
}
start();