"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _hoistNonReactStatics = require("hoist-non-react-statics");

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (propsMapper,
// eslint-disable-next-line react/forbid-foreign-prop-types
_ref) {
  var _ref$displayName = _ref.displayName,
      displayName = _ref$displayName === undefined ? "wrapped" : _ref$displayName,
      propTypes = _ref.propTypes,
      defaultProps = _ref.defaultProps;
  return function (Component) {
    for (var _len = arguments.length, passedArgs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      passedArgs[_key - 1] = arguments[_key];
    }

    var NewComponent = _react2.default.forwardRef(function (props, ref) {
      return _react2.default.createElement(Component, _extends({}, propsMapper.apply(undefined, [props].concat(passedArgs)), { ref: ref }));
    });

    NewComponent.displayName = displayName + "(" + (Component.displayName || Component.name) + ")";
    NewComponent.WrappedComponent = Component;
    NewComponent.propTypes = propTypes;
    NewComponent.defaultProps = defaultProps;

    return (0, _hoistNonReactStatics2.default)(NewComponent, Component);
  };
};

module.exports = exports["default"];