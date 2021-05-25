"use strict";

exports.__esModule = true;

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactApollo = require("@apollo/client");

var _reactRouterDom = require("react-router-dom");

var _ipcmgrGraphqlClient = require("@package/ipcmgr-graphql-client");

var _ipcmgrGraphqlClient2 = _interopRequireDefault(_ipcmgrGraphqlClient);

require("@icg360/ui-toolkit/css/sagesure.css");

require("@icg360/ui-toolkit/react-day-picker/lib/style.css");

require("../css/styles.css");

require("../css/variables.css");

require("../css/modals.css");

require("../css/utility.css");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}

/*
This function allows individual modules to be run.
Pass in the module and necessary configuration and the package can be run standalone
*/
exports.default = function(_ref) {
  var Module = _ref.Module,
    _ref$config = _ref.config,
    config = _ref$config === undefined ? {} : _ref$config,
    _ref$graphqlEndpoints = _ref.graphqlEndpoints,
    graphqlEndpoints =
      _ref$graphqlEndpoints === undefined ? [] : _ref$graphqlEndpoints,
    _ref$path = _ref.path,
    path = _ref$path === undefined ? "" : _ref$path,
    _ref$user = _ref.user,
    user = _ref$user === undefined ? {} : _ref$user,
    _ref$flags = _ref.flags,
    flags = _ref$flags === undefined ? {} : _ref$flags,
    props = _objectWithoutProperties(_ref, [
      "Module",
      "config",
      "graphqlEndpoints",
      "path",
      "user",
      "flags"
    ]);

  return (0, _ipcmgrGraphqlClient2.default)(graphqlEndpoints, config).then(
    function(client) {
      (0, _reactDom.render)(
        _react2.default.createElement(
          _reactApollo.ApolloProvider,
          { client: client },
          _react2.default.createElement(
            _reactRouterDom.BrowserRouter,
            null,
            _react2.default.createElement(
              _reactRouterDom.Switch,
              null,
              _react2.default.createElement(_reactRouterDom.Route, {
                path: path,
                render: function render() {
                  return _react2.default.createElement(
                    "div",
                    { className: "mod-demo" },
                    _react2.default.createElement("link", {
                      href:
                        "https://fonts.googleapis.com/css?family=Fira+Sans:400,400i,500,500i,700,700i|Material+Icons",
                      rel: "stylesheet"
                    }),
                    _react2.default.createElement(
                      Module,
                      _extends(
                        {
                          config: config,
                          user: user,
                          flags: flags
                        },
                        props
                      )
                    )
                  );
                }
              }),
              _react2.default.createElement(_reactRouterDom.Redirect, {
                to: path
              })
            )
          )
        ),
        document.querySelector("#demo")
      );
    }
  );
};

module.exports = exports["default"];
