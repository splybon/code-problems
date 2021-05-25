"use strict";

exports.__esModule = true;
exports.wrapRequest = exports.store = exports.retrieve = undefined;

var _lodash = require("lodash");

// Cache only 1 value per request
var cache = new Map();

var retrieve = exports.retrieve = function retrieve(_ref) {
  var request = _ref.request,
      using = _ref.using;

  var fromCache = cache.get(request);
  return fromCache && (0, _lodash.isEqual)(fromCache.using, using) ? fromCache : undefined;
};

var store = exports.store = function store(_ref2) {
  var promise = _ref2.promise,
      request = _ref2.request,
      using = _ref2.using;

  cache.set(request, { using: using, promise: promise });
  promise.then(function (result) {
    var fromCache = cache.get(request);
    if (fromCache.promise === promise) {
      cache.set(request, { using: using, result: result });
    }
  }).catch(function (error) {
    var fromCache = cache.get(request);
    if (fromCache.promise === promise) {
      cache.set(request, { using: using, error: error });
    }
  });
};

var wrapRequest = exports.wrapRequest = function wrapRequest(request) {
  return function (using) {
    var _ref3 = retrieve({ request: request, using: using }) || {},
        result = _ref3.result,
        error = _ref3.error,
        cachedPromise = _ref3.promise;

    if (result) return Promise.resolve(result);
    if (error) return Promise.reject(error);
    if (cachedPromise) return cachedPromise;
    var promise = request(using);
    store({ promise: promise, request: request, using: using });
    return promise;
  };
};

exports.default = {
  retrieve: retrieve,
  store: store,
  wrapRequest: wrapRequest
};