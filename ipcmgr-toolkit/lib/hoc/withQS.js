"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _useQS2 = require("../hooks/useQS");

var _useQS3 = _interopRequireDefault(_useQS2);

var _createHoc = require("../utils/create-hoc");

var _createHoc2 = _interopRequireDefault(_createHoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createHoc2.default)(function (props, defaults) {
  var _useQS = (0, _useQS3.default)({
    history: props.history,
    location: props.location,
    defaults: defaults
  }),
      qsState = _useQS[0],
      setQS = _useQS[1];

  return _extends({}, props, {
    qsState: qsState,
    setQS: setQS
  });
}, {
  displayName: "withQS",
  propTypes: {
    location: _propTypes2.default.object,
    history: _propTypes2.default.object
  }
});
module.exports = exports["default"];