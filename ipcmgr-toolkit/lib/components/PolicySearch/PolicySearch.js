"use strict";

exports.__esModule = true;

var _class, _temp2;

var _uiToolkit = require("@icg360/ui-toolkit");

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactApollo = require("@apollo/client");

var _withQS = require("../../hoc/withQS");

var _withQS2 = _interopRequireDefault(_withQS);

var _constants = require("./constants");

var _Pagination = require("./Pagination/Pagination");

var _Pagination2 = _interopRequireDefault(_Pagination);

var _ResultsGrid = require("./ResultsGrid");

var _ResultsGrid2 = _interopRequireDefault(_ResultsGrid);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var PolicySearch = ((_temp2 = _class = (function(_Component) {
  _inherits(PolicySearch, _Component);

  function PolicySearch() {
    var _temp, _this, _ret;

    _classCallCheck(this, PolicySearch);

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    return (
      (_ret = ((_temp = ((_this = _possibleConstructorReturn(
        this,
        _Component.call.apply(_Component, [this].concat(args))
      )),
      _this)),
      (_this.container = (0, _react.createRef)()),
      (_this.onFilterChange = function(_ref) {
        var _ref$target = _ref.target,
          checked = _ref$target.checked,
          name = _ref$target.name;
        var setQS = _this.props.setQS;

        setQS(function(_ref2) {
          var filter = _ref2.filter;
          return {
            filter: _constants.SEARCH_FILTER_LIST.filter(function(val) {
              return val === name ? checked : filter.includes(val);
            })
          };
        });
      }),
      (_this.onSortSelect = function(selectedField) {
        var setQS = _this.props.setQS;

        setQS(function(_ref3) {
          var sortField = _ref3.sortField,
            sortOrder = _ref3.sortOrder;
          return {
            sortField: selectedField,
            sortOrder:
              selectedField === sortField && sortOrder === _constants.SORT_DESC
                ? _constants.SORT_ASC
                : _constants.SORT_DESC
          };
        });
      }),
      (_this.onSizeChange = function(_ref4) {
        var value = _ref4.target.value;
        var setQS = _this.props.setQS;

        setQS({
          size: value
        });
      }),
      (_this.onFromChange = function(from) {
        var setQS = _this.props.setQS;

        setQS({ from: from });
      }),
      (_this.onPolicySelect = function(policy) {
        var _this$props = _this.props,
          history = _this$props.history,
          linkSuffix = _this$props.linkSuffix;

        history.push({
          pathname:
            _constants.MOD_BASEPATH +
            "/" +
            policy.identifiers.quoteNumber +
            linkSuffix,
          state: policy
        });
      }),
      (_this.renderBody = function(_ref5) {
        var loading = _ref5.loading,
          error = _ref5.error,
          results = _ref5.results;
        var _this$props$qsState = _this.props.qsState,
          sortField = _this$props$qsState.sortField,
          sortOrder = _this$props$qsState.sortOrder;

        if (error) {
          return _react2.default.createElement(
            _uiToolkit.Alert,
            {
              hasIcon: true,
              bsStyle: "danger",
              style: { margin: "10px 10px 20px" }
            },
            _react2.default.createElement(
              "p",
              null,
              _react2.default.createElement(
                "strong",
                null,
                "An error occured while searching policies."
              )
            ),
            _react2.default.createElement(
              "p",
              null,
              _react2.default.createElement("code", null, error.message)
            )
          );
        }
        if (results) {
          return _react2.default.createElement(_ResultsGrid2.default, {
            isLoading: loading,
            onPolicySelect: _this.onPolicySelect,
            onSortSelect: _this.onSortSelect,
            policies: results.policies,
            sortField: sortField,
            sortOrder: sortOrder
          });
        }
        if (loading) {
          return _react2.default.createElement(
            "div",
            { style: { padding: "20px", textAlign: "center" } },
            _react2.default.createElement(_uiToolkit.Preloader, null)
          );
        }
        return null;
      }),
      (_this.renderResults = function(_ref6) {
        var loading = _ref6.loading,
          error = _ref6.error,
          refetch = _ref6.refetch,
          _ref6$data = _ref6.data;
        _ref6$data = _ref6$data === undefined ? {} : _ref6$data;
        var results = _ref6$data.results;
        var _this$props2 = _this.props,
          showRefreshButton = _this$props2.showRefreshButton,
          _this$props2$qsState = _this$props2.qsState,
          from = _this$props2$qsState.from,
          size = _this$props2$qsState.size,
          filter = _this$props2$qsState.filter;

        return _react2.default.createElement(
          _uiToolkit.Grid,
          { fluid: true, className: "search__container" },
          _react2.default.createElement(
            "div",
            { ref: _this.container },
            _react2.default.createElement(
              "div",
              { className: "search__header" },
              _react2.default.createElement(
                "h2",
                null,
                "Search",
                " ",
                results &&
                  !loading &&
                  _react2.default.createElement(
                    "small",
                    null,
                    results.totalCount.toLocaleString(),
                    " result",
                    results.totalCount !== 1 ? "s" : ""
                  )
              ),
              _react2.default.createElement(
                "div",
                { className: "search__header__right" },
                results &&
                  loading &&
                  _react2.default.createElement(_uiToolkit.Preloader, null),
                showRefreshButton &&
                  _react2.default.createElement(
                    _uiToolkit.Button,
                    {
                      onClick: function onClick() {
                        return refetch();
                      }
                    },
                    "Refresh"
                  ),
                _react2.default.createElement(
                  _uiToolkit.Checkbox,
                  {
                    inline: true,
                    name: "Policies",
                    checked: filter.includes("Policies"),
                    onChange: _this.onFilterChange
                  },
                  "Policies"
                ),
                _react2.default.createElement(
                  _uiToolkit.Checkbox,
                  {
                    inline: true,
                    name: "Quotes",
                    checked: filter.includes("Quotes"),
                    onChange: _this.onFilterChange
                  },
                  "Quotes"
                )
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "search__body" },
              _this.renderBody({
                loading: loading,
                error: error,
                results: results
              })
            ),
            _react2.default.createElement(
              "div",
              { className: "search__footer" },
              results &&
                results.totalCount > 0 &&
                _react2.default.createElement(_Pagination2.default, {
                  size: parseInt(size, 10),
                  from: parseInt(from, 10),
                  totalCount: results.totalCount,
                  onFromChange: _this.onFromChange
                }),
              _react2.default.createElement(
                "div",
                { className: "result-count__per-page" },
                _react2.default.createElement(
                  "div",
                  { className: "result-count__select-wrapper" },
                  _react2.default.createElement(
                    "select",
                    {
                      className: "result-count__select form-control",
                      onChange: _this.onSizeChange,
                      value: size,
                      "data-bdd": "qp-pagination-result-count"
                    },
                    ["10", "20", "50", "100"].map(function(count) {
                      return _react2.default.createElement(
                        "option",
                        { key: count, value: count },
                        count,
                        " per page"
                      );
                    })
                  )
                )
              )
            )
          )
        );
      }),
      _temp)),
      _possibleConstructorReturn(_this, _ret)
    );
  }

  PolicySearch.prototype.componentDidUpdate = function componentDidUpdate(
    prevProps
  ) {
    var from = this.props.qsState.from;

    if (this.container.current && from !== prevProps.qsState.from) {
      this.container.current.scrollIntoView({
        block: "start",
        behavior: "smooth"
      });
    }
  };

  PolicySearch.prototype.render = function render() {
    var _props = this.props,
      _props$qsState = _props.qsState,
      query = _props$qsState.query,
      filter = _props$qsState.filter,
      sortField = _props$qsState.sortField,
      sortOrder = _props$qsState.sortOrder,
      from = _props$qsState.from,
      size = _props$qsState.size,
      requireQuery = _props.requireQuery,
      graphqlQuery = _props.graphqlQuery;

    return query || !requireQuery
      ? _react2.default.createElement(_reactApollo.Query, {
          query: graphqlQuery,
          variables: {
            searchText: query,
            quotes: filter.includes("Quotes"),
            policies: filter.includes("Policies"),
            sort: {
              fieldName: sortField,
              sortOrder: sortOrder
            },
            from: parseInt(from, 10),
            size: parseInt(size, 10)
          },
          children: this.renderResults,
          fetchPolicy: "cache-and-network"
        })
      : null;
  };

  return PolicySearch;
})(_react.Component)),
(_class.defaultProps = {
  linkSuffix: "",
  showRefreshButton: false
}),
_temp2);
PolicySearch.propTypes =
  process.env.NODE_ENV !== "production"
    ? {
        history: _propTypes2.default.object.isRequired,
        linkSuffix: _propTypes2.default.string,
        qsState: _propTypes2.default.shape({
          query: _propTypes2.default.string.isRequired,
          sortField: _propTypes2.default.string.isRequired,
          sortOrder: _propTypes2.default.oneOf([
            _constants.SORT_ASC,
            _constants.SORT_DESC
          ]),
          from: _propTypes2.default.string,
          size: _propTypes2.default.string
        }).isRequired,
        setQS: _propTypes2.default.func.isRequired,
        requireQuery: _propTypes2.default.bool.isRequired,
        showRefreshButton: _propTypes2.default.bool,
        graphqlQuery: _propTypes2.default.object.isRequired
      }
    : {};
exports.default = (0, _withQS2.default)(
  PolicySearch,
  _constants.POLICY_SEARCH_QS_DEFAULTS
);
module.exports = exports["default"];
