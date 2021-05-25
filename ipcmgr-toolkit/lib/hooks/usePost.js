"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _deterministicString = require("../utils/deterministic-string");

var _deterministicString2 = _interopRequireDefault(_deterministicString);

var _useFetch2 = require("./useFetch");

var _useFetch3 = _interopRequireDefault(_useFetch2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var usePost = function usePost(_ref) {
  var cacheAndNetwork = _ref.cacheAndNetwork,
      cacheType = _ref.cacheType,
      invalidatorTime = _ref.invalidatorTime,
      request = _ref.request,
      _ref$skipCall = _ref.skipCall,
      skipCall = _ref$skipCall === undefined ? true : _ref$skipCall,
      using = _ref.using,
      willUpdate = _ref.willUpdate;

  var _useState = (0, _react.useState)({
    invalidatorTime: invalidatorTime,
    skipCall: skipCall,
    using: using
  }),
      state = _useState[0],
      setState = _useState[1];

  var _useFetch = (0, _useFetch3.default)(_extends({
    cacheAndNetwork: cacheAndNetwork,
    cacheType: cacheType,
    invalidatorTime: invalidatorTime,
    request: request,
    skipCall: skipCall,
    using: using,
    willUpdate: willUpdate
  }, state)),
      fetchState = _useFetch[0];

  (0, _react.useEffect)(function () {
    setState({
      invalidatorTime: invalidatorTime,
      skipCall: skipCall,
      using: using
    });
  }, [invalidatorTime, skipCall, (0, _deterministicString2.default)(using)]);

  return [fetchState, (0, _react.useCallback)(function (val) {
    setState({
      invalidatorTime: Date.now(),
      skipCall: false,
      using: val
    });
  }, [])];
};

usePost.STATUSES = _useFetch3.default.STATUSES;
usePost.CACHE_TYPES = _useFetch3.default.CACHE_TYPES;
usePost.STATE_RESET = _useFetch3.default.STATE_RESET;

exports.default = usePost;
module.exports = exports["default"];