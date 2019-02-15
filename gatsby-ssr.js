"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onRenderBody = onRenderBody;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef {object} PluginOptions
 * @property {string} username the default gist user.
 * @property {boolean} includeDefaultCss a flag indicating the default css should be included
 */

/**
 * Adds a link to the Github Gist default css.
 * @param {{ setHeadComponents }} setHeadComponents adds components to <head>.
 * @param {PluginOptions} options the options of the plugin.
 * @returns {*} rendered body.
 */
function onRenderBody(_ref) {
  var setHeadComponents = _ref.setHeadComponents;
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (options.includeDefaultCss !== false) {
    return setHeadComponents([_react2.default.createElement("link", {
      key: "gist-embeded-b3b573358bfc66d89e1e95dbf8319c09",
      rel: "stylesheet",
      href: "https://github.githubassets.com/assets/gist-embed-b3b573358bfc66d89e1e95dbf8319c09.css"
    })]);
  }

  return null;
}