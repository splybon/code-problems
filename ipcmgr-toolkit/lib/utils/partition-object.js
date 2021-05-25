"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (obj) {
  var keys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return Object.entries(obj).reduce(function (_ref, _ref2) {
    var _extends2, _extends3;

    var included = _ref[0],
        excluded = _ref[1];
    var key = _ref2[0],
        value = _ref2[1];
    return keys.includes(key) ? [_extends({}, included, (_extends2 = {}, _extends2[key] = value, _extends2)), excluded] : [included, _extends({}, excluded, (_extends3 = {}, _extends3[key] = value, _extends3))];
  }, [{}, {}]);
};

module.exports = exports["default"];