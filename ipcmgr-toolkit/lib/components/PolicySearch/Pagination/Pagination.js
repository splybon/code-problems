"use strict";

exports.__esModule = true;

var _uiToolkit = require("@icg360/ui-toolkit");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _PaginationSummary = require("../PaginationSummary/PaginationSummary");

var _PaginationSummary2 = _interopRequireDefault(_PaginationSummary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pagination = function (_Component) {
  _inherits(Pagination, _Component);

  function Pagination() {
    var _temp, _this, _ret;

    _classCallCheck(this, Pagination);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handlePageSelect = function (dir) {
      var _this$props = _this.props,
          from = _this$props.from,
          size = _this$props.size,
          onFromChange = _this$props.onFromChange;

      if (dir === "previous") {
        onFromChange(Math.max(from - size, 0));
      } else if (dir === "next") {
        onFromChange(from + size);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  Pagination.prototype.render = function render() {
    var _props = this.props,
        from = _props.from,
        size = _props.size,
        totalCount = _props.totalCount;

    return _react2.default.createElement(
      "div",
      { className: "pagination__body" },
      _react2.default.createElement(
        "div",
        { className: "pagination__pages" },
        _react2.default.createElement(
          _uiToolkit.Pager,
          { bsClass: "pagination", onSelect: this.handlePageSelect },
          _react2.default.createElement(
            _uiToolkit.Pager.Item,
            { eventKey: "previous", disabled: from === 0 },
            _react2.default.createElement(_uiToolkit.Icon, { name: "chevron_left" })
          ),
          _react2.default.createElement(
            _uiToolkit.Pager.Item,
            { eventKey: "next", disabled: totalCount <= from + size },
            _react2.default.createElement(_uiToolkit.Icon, { name: "chevron_right" })
          )
        )
      ),
      _react2.default.createElement(
        "div",
        { className: "pagination__summary" },
        _react2.default.createElement(_PaginationSummary2.default, {
          start: from + 1,
          end: Math.min(from + size, totalCount),
          totalItems: totalCount
        })
      )
    );
  };

  return Pagination;
}(_react.Component);

Pagination.propTypes = process.env.NODE_ENV !== "production" ? {
  from: _propTypes2.default.number.isRequired,
  size: _propTypes2.default.number.isRequired,
  onFromChange: _propTypes2.default.func.isRequired,
  totalCount: _propTypes2.default.number.isRequired
} : {};
exports.default = Pagination;
module.exports = exports["default"];