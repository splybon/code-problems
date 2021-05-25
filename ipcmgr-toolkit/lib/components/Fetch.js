"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _useFetch = require("../hooks/useFetch");

var _useFetch2 = _interopRequireDefault(_useFetch);

var _fetchUtils = require("../utils/fetch-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Fetch = function Fetch(_ref) {
  var render = _ref.render,
      props = _objectWithoutProperties(_ref, ["render"]);

  return render.apply(undefined, (0, _useFetch2.default)(props));
};

Fetch.CACHE_TYPES = _useFetch2.default.CACHE_TYPES;
Fetch.STATUSES = _useFetch2.default.STATUSES;
Fetch.STATE_RESET = _useFetch2.default.STATE_RESET;

Fetch.propTypes = _extends({}, _fetchUtils.propTypes, _fetchUtils.renderPropTypes);

exports.default = Fetch;
module.exports = exports["default"];