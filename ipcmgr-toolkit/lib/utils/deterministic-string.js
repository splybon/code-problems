"use strict";

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Turn any value type into a string consistently
var toString = function toString(anyValue) {
  if (typeof anyValue === "string") {
    return anyValue.replace(/[~,*{}[\]]/g, function (m) {
      return "~" + m;
    });
  }
  if (typeof anyValue === "undefined") {
    return "*u";
  }
  if (anyValue === null) {
    return "*n";
  }
  if (Array.isArray(anyValue)) {
    return "[" + anyValue.map(toString).join() + "]";
  }
  if ((typeof anyValue === "undefined" ? "undefined" : _typeof(anyValue)) === "object") {
    return "{" + Object.entries(anyValue).sort(function (_ref, _ref2) {
      var aKey = _ref[0];
      var bKey = _ref2[0];
      return bKey.localeCompare(aKey);
    }).reduce(function (acc, entry) {
      return [].concat(acc, entry);
    }, []).map(toString).join() + "}";
  }
  return "*" + String(anyValue);
};

exports.default = toString;
module.exports = exports["default"];