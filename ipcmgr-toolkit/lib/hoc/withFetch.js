"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _useFetch2 = require("../hooks/useFetch");

var _useFetch3 = _interopRequireDefault(_useFetch2);

var _createHoc = require("../utils/create-hoc");

var _createHoc2 = _interopRequireDefault(_createHoc);

var _partitionObject2 = require("../utils/partition-object");

var _partitionObject3 = _interopRequireDefault(_partitionObject2);

var _fetchUtils = require("../utils/fetch-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchPropKeys = Object.keys(_fetchUtils.propTypes);

var withFetch = (0, _createHoc2.default)(function (props, defaultProps) {
  var _partitionObject = (0, _partitionObject3.default)(props, fetchPropKeys),
      fetchProps = _partitionObject[0],
      passProps = _partitionObject[1];

  var _useFetch = (0, _useFetch3.default)(_extends({}, defaultProps, fetchProps)),
      state = _useFetch[0];

  return _extends({}, passProps, state);
}, {
  displayName: "withFetch",
  propTypes: _fetchUtils.propTypes
});

withFetch.STATUSES = _useFetch3.default.STATUSES;
withFetch.CACHE_TYPES = _useFetch3.default.CACHE_TYPES;
withFetch.STATE_RESET = _useFetch3.default.STATE_RESET;

exports.default = withFetch;
module.exports = exports["default"];