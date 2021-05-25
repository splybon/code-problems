"use strict";

exports.__esModule = true;

var _uiToolkit = require("@icg360/ui-toolkit");

var _ipcmgrToolkit = require("@package/ipcmgr-toolkit");

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResultsGrid = function (_Component) {
  _inherits(ResultsGrid, _Component);

  function ResultsGrid() {
    _classCallCheck(this, ResultsGrid);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  ResultsGrid.prototype.render = function render() {
    var _props = this.props,
        isLoading = _props.isLoading,
        policies = _props.policies,
        onPolicySelect = _props.onPolicySelect,
        onSortSelect = _props.onSortSelect,
        sortField = _props.sortField,
        sortOrder = _props.sortOrder;

    return _react2.default.createElement(
      _uiToolkit.Table,
      {
        className: "search__results",
        hover: !!policies.length,
        "data-content-loading": isLoading
      },
      _react2.default.createElement(
        "thead",
        null,
        _react2.default.createElement(
          "tr",
          null,
          _constants.TABLE_HEADINGS.map(function (_ref) {
            var label = _ref.label,
                sortable = _ref.sortable,
                value = _ref.value;
            return _react2.default.createElement(
              "th",
              { key: label },
              !!policies.length && sortable ? _react2.default.createElement(
                "button",
                {
                  type: "button",
                  className: (0, _classnames2.default)("search__sort", "sortable", sortOrder === _constants.SORT_ASC && sortField === value && "sortable--asc", sortOrder === _constants.SORT_DESC && sortField === value && "sortable--desc"),
                  onClick: function onClick() {
                    return onSortSelect(value);
                  }
                },
                label
              ) : label
            );
          })
        )
      ),
      _react2.default.createElement(
        "tbody",
        null,
        policies.length ? policies.map(function (_ref2) {
          var id = _ref2.id,
              addresses = _ref2.addresses,
              carrierId = _ref2.carrierId,
              effectiveDate = _ref2.effectiveDate,
              _ref2$identifiers = _ref2.identifiers,
              policyNumber = _ref2$identifiers.policyNumber,
              quoteNumber = _ref2$identifiers.quoteNumber,
              insuredName = _ref2.insuredName,
              policyState = _ref2.policyState,
              productLabel = _ref2.productLabel;

          var street1 = addresses && addresses.property && addresses.property.street1;
          return _react2.default.createElement(
            "tr",
            {
              key: id,
              onClick: function onClick() {
                return onPolicySelect({
                  id: id,
                  identifiers: { policyNumber: policyNumber, quoteNumber: quoteNumber },
                  insuredName: insuredName
                });
              }
            },
            _react2.default.createElement(
              "td",
              null,
              quoteNumber
            ),
            _react2.default.createElement(
              "td",
              null,
              policyNumber
            ),
            _react2.default.createElement(
              "td",
              null,
              carrierId
            ),
            _react2.default.createElement(
              "td",
              null,
              productLabel
            ),
            _react2.default.createElement(
              "td",
              null,
              insuredName
            ),
            _react2.default.createElement(
              "td",
              null,
              street1
            ),
            _react2.default.createElement(
              "td",
              null,
              policyState
            ),
            _react2.default.createElement(
              "td",
              null,
              (0, _ipcmgrToolkit.printDate)(effectiveDate)
            )
          );
        }) : _react2.default.createElement(
          "tr",
          null,
          _react2.default.createElement(
            "td",
            { colSpan: "8" },
            _react2.default.createElement(
              "div",
              { className: "search__results__zero-state" },
              _react2.default.createElement(_uiToolkit.Icon, {
                name: "search",
                size: "large",
                style: { opacity: ".325" }
              }),
              _react2.default.createElement(
                "h3",
                null,
                "No results found"
              ),
              _react2.default.createElement(
                "p",
                null,
                "Use the search field above to find quotes and policies by ID, address, policyholder name, and more."
              )
            )
          )
        )
      )
    );
  };

  return ResultsGrid;
}(_react.Component);

ResultsGrid.propTypes = process.env.NODE_ENV !== "production" ? {
  isLoading: _propTypes2.default.bool.isRequired,
  policies: _propTypes2.default.array.isRequired,
  onPolicySelect: _propTypes2.default.func.isRequired,
  onSortSelect: _propTypes2.default.func.isRequired,
  sortField: _propTypes2.default.string.isRequired,
  sortOrder: _propTypes2.default.string.isRequired
} : {};
exports.default = ResultsGrid;
module.exports = exports["default"];