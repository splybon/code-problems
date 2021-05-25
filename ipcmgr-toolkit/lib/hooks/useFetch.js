"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require("react");

var _cancelablePromise = require("../utils/cancelable-promise");

var _cancelablePromise2 = _interopRequireDefault(_cancelablePromise);

var _deterministicString = require("../utils/deterministic-string");

var _deterministicString2 = _interopRequireDefault(_deterministicString);

var _fetchUtils = require("../utils/fetch-utils");

var _singlePromiseCache = require("../utils/single-promise-cache");

var singlePromiseCache = _interopRequireWildcard(_singlePromiseCache);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var retrieveCache = function retrieveCache(_ref) {
  var cacheType = _ref.cacheType,
      request = _ref.request,
      using = _ref.using;

  if (cacheType === _fetchUtils.CACHE_TYPES.SINGLE) {
    return singlePromiseCache.retrieve({
      request: request,
      using: using
    });
  }
  if (cacheType === _fetchUtils.CACHE_TYPES.MANUAL) {
    var cached = request(using, "cache-only");
    if (cached && cached.result instanceof Error) {
      return {
        error: cached.result
      };
    }
    return cached;
  }
  return undefined;
};
var storeCache = function storeCache(_ref2) {
  var cacheType = _ref2.cacheType,
      promise = _ref2.promise,
      request = _ref2.request,
      using = _ref2.using;

  if (cacheType === _fetchUtils.CACHE_TYPES.SINGLE) {
    singlePromiseCache.store({
      promise: promise,
      request: request,
      using: using
    });
  }
};
var fetchAndCache = function fetchAndCache(_ref3) {
  var cacheType = _ref3.cacheType,
      request = _ref3.request,
      using = _ref3.using;

  var promise = cacheType === _fetchUtils.CACHE_TYPES.MANUAL ? request(using, "network-only") : request(using);
  storeCache({ cacheType: cacheType, promise: promise, request: request, using: using });
  return promise;
};

var errorToString = function errorToString(e) {
  return (typeof e === "undefined" ? "undefined" : _typeof(e)) === "object" ? e.message || "" : e || "";
};

var wrapPromise = function wrapPromise(rawPromise, setState) {
  var _makeCancelable = (0, _cancelablePromise2.default)(rawPromise),
      promise = _makeCancelable.promise,
      cancel = _makeCancelable.cancel;

  promise.then(function (data) {
    setState({
      data: data,
      dataMatchesRequest: true,
      error: undefined,
      status: _fetchUtils.STATUSES.DONE
    });
  }).catch(function (e) {
    if ((typeof e === "undefined" ? "undefined" : _typeof(e)) === "object" && e.isCanceled) {
      return;
    }
    setState({
      data: undefined,
      dataMatchesRequest: false,
      error: errorToString(e),
      status: _fetchUtils.STATUSES.ERROR
    });
  });
  return cancel;
};

var defaultState = {
  status: _fetchUtils.STATUSES.INITIAL,
  dataMatchesRequest: false
};

var useFetch = function useFetch(_ref4) {
  var _ref4$cacheAndNetwork = _ref4.cacheAndNetwork,
      cacheAndNetwork = _ref4$cacheAndNetwork === undefined ? false : _ref4$cacheAndNetwork,
      _ref4$cacheType = _ref4.cacheType,
      cacheType = _ref4$cacheType === undefined ? _fetchUtils.CACHE_TYPES.NO_CACHE : _ref4$cacheType,
      _ref4$invalidatorTime = _ref4.invalidatorTime,
      invalidatorTime = _ref4$invalidatorTime === undefined ? null : _ref4$invalidatorTime,
      _ref4$request = _ref4.request,
      request = _ref4$request === undefined ? function () {
    return Promise.resolve();
  } : _ref4$request,
      _ref4$skipCall = _ref4.skipCall,
      skipCall = _ref4$skipCall === undefined ? false : _ref4$skipCall,
      _ref4$using = _ref4.using,
      using = _ref4$using === undefined ? {} : _ref4$using,
      _ref4$willUpdate = _ref4.willUpdate,
      willUpdate = _ref4$willUpdate === undefined ? function (i) {
    return i;
  } : _ref4$willUpdate;

  var _useState = (0, _react.useState)(defaultState),
      state = _useState[0],
      setState = _useState[1];

  var lastValidTime = (0, _react.useRef)(Date.now());

  var changeState = function changeState(nextState) {
    var returnedState = willUpdate(nextState);
    if (returnedState) {
      setState(returnedState);
    }
  };

  (0, _react.useEffect)(function () {
    var cacheIsValid = !invalidatorTime || lastValidTime.current > invalidatorTime;
    lastValidTime.current = Date.now();
    var networkAnyway = cacheAndNetwork || !cacheIsValid;
    if (skipCall) {
      if (state.status === _fetchUtils.STATUSES.BUSY) {
        changeState(_extends({}, state, defaultState));
      }
      return undefined;
    }
    if (state.status !== _fetchUtils.STATUSES.BUSY) {
      changeState(_extends({}, state, {
        status: _fetchUtils.STATUSES.BUSY,
        dataMatchesRequest: false
      }));
    }
    var fromCache = retrieveCache({ cacheType: cacheType, request: request, using: using });
    if (fromCache && fromCache.result) {
      changeState({
        data: fromCache.result,
        dataMatchesRequest: true,
        error: undefined,
        status: networkAnyway ? _fetchUtils.STATUSES.BUSY : _fetchUtils.STATUSES.DONE
      });
      return networkAnyway ? wrapPromise(fetchAndCache({ cacheType: cacheType, request: request, using: using }), changeState) : undefined;
    }
    if (fromCache && fromCache.error) {
      changeState({
        data: undefined,
        dataMatchesRequest: false,
        error: errorToString(fromCache.error),
        status: networkAnyway ? _fetchUtils.STATUSES.BUSY : _fetchUtils.STATUSES.ERROR
      });
      return networkAnyway ? wrapPromise(fetchAndCache({ cacheType: cacheType, request: request, using: using }), changeState) : undefined;
    }
    return wrapPromise(fromCache && cacheIsValid ? fromCache.promise : fetchAndCache({ cacheType: cacheType, request: request, using: using }), changeState);
  }, [skipCall, (0, _deterministicString2.default)(using), invalidatorTime]);
  return [state];
};

useFetch.STATUSES = _fetchUtils.STATUSES;
useFetch.CACHE_TYPES = _fetchUtils.CACHE_TYPES;
useFetch.STATE_RESET = _extends({}, defaultState, {
  data: undefined,
  error: undefined
});

exports.default = useFetch;
module.exports = exports["default"];