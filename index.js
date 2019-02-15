"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _querystring = require("querystring");

var _querystring2 = _interopRequireDefault(_querystring);

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

var _requestPromise = require("request-promise");

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _asyncUnistUtilVisit = require("async-unist-util-visit");

var _asyncUnistUtilVisit2 = _interopRequireDefault(_asyncUnistUtilVisit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref) {
    var markdownAST = _ref.markdownAST;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var baseUrl;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            baseUrl = "https://embed.runkit.com/oembed?url=";
            _context2.next = 3;
            return (0, _asyncUnistUtilVisit2.default)(markdownAST, function () {
              var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(node) {
                var url, body, runkitObj, $, oEmbed;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!(node.type !== "inlineCode" || !node.value.startsWith("https://runkit.com"))) {
                          _context.next = 2;
                          break;
                        }

                        return _context.abrupt("return");

                      case 2:
                        url = node.value;
                        _context.next = 5;
                        return (0, _requestPromise2.default)("" + url);

                      case 5:
                        body = _context.sent;
                        runkitObj = JSON.parse(body);
                        $ = _cheerio2.default.load(runkitObj.html);
                        oEmbed = $('iframe');

                        oEmbed.attr('style', '');
                        oEmbed.attr('scrolling', 'yes');
                        oEmbed.attr('width', '100%');
                        oEmbed.attr('height', runkitObj.height);

                        node.type = "html";
                        node.value = $.root().html();

                        return _context.abrupt("return", markdownAST);

                      case 16:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x3) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = exports.default;