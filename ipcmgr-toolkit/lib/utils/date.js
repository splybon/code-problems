"use strict";

exports.__esModule = true;
exports.printLongDateTime = exports.printLongDate = exports.printDateTime = exports.printDate = exports.parseDate = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DATE_FORMAT = "MM/DD/YYYY";
var DATE_TIME_FORMAT = DATE_FORMAT + " hh:mma";
var LONG_DATE_FORMAT = "MMM D, YYYY";
var LONG_DATE_TIME_FORMAT = LONG_DATE_FORMAT + " [at] h:mma";

var tryParse = function tryParse(date, format, isUTC) {
  var m = isUTC ? _moment2.default.utc(date, format) : (0, _moment2.default)(date, format);
  return m.isValid() ? m : null;
};

var isISO = /^\d\d\d\d-\d\d-\d\d/;
var parseDate = exports.parseDate = function parseDate(date) {
  if (typeof date === "number") {
    return _moment2.default.utc(date);
  }
  if ((typeof date === "undefined" ? "undefined" : _typeof(date)) === "object" || isISO.test(date)) {
    return (0, _moment2.default)(date);
  }
  return tryParse(date, "MM/DD/YYYY") || tryParse(date, "MMMM, D YYYY HH:mm:ss", true) || (0, _moment2.default)(date);
};

var createPrintDate = function createPrintDate(format) {
  return function (arg) {
    return arg ? parseDate(arg).format(format) : "";
  };
};
var printDate = exports.printDate = createPrintDate(DATE_FORMAT);
var printDateTime = exports.printDateTime = createPrintDate(DATE_TIME_FORMAT);
var printLongDate = exports.printLongDate = createPrintDate(LONG_DATE_FORMAT);
var printLongDateTime = exports.printLongDateTime = createPrintDate(LONG_DATE_TIME_FORMAT);