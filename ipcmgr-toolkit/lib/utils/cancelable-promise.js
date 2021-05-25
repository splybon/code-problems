"use strict";

exports.__esModule = true;

// https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
/* eslint-disable prefer-promise-reject-errors */
exports.default = function (promise) {
  var hasCanceled = false;

  var wrappedPromise = new Promise(function (resolve, reject) {
    promise.then(function (val) {
      return hasCanceled ? reject({ isCanceled: true }) : resolve(val);
    }, function (error) {
      return hasCanceled ? reject({ isCanceled: true }) : reject(error);
    });
  });

  return {
    promise: wrappedPromise,
    cancel: function cancel() {
      hasCanceled = true;
    }
  };
};

module.exports = exports["default"];