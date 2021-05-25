"use strict";

exports.__esModule = true;

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaginationSummary = function PaginationSummary(_ref) {
  var end = _ref.end,
      start = _ref.start,
      totalItems = _ref.totalItems;
  return _react2.default.createElement(
    "div",
    { className: "pagination-summary" },
    _react2.default.createElement(
      "strong",
      null,
      start.toLocaleString(),
      " - ",
      end.toLocaleString()
    ),
    " of ",
    _react2.default.createElement(
      "strong",
      null,
      totalItems.toLocaleString()
    ),
    "\xA0 result",
    totalItems !== 1 && "s"
  );
};

PaginationSummary.propTypes = process.env.NODE_ENV !== "production" ? {
  start: _propTypes2.default.number.isRequired,
  end: _propTypes2.default.number.isRequired,
  totalItems: _propTypes2.default.number.isRequired
} : {};

exports.default = PaginationSummary;
module.exports = exports["default"];