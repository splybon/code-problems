"use strict";

exports.__esModule = true;
exports.propTypes = exports.renderPropTypes = exports.CACHE_TYPES = exports.STATUSES = undefined;

var _propTypes = require("prop-types");

var STATUSES = exports.STATUSES = {
  INITIAL: "INITIAL",
  BUSY: "BUSY",
  DONE: "DONE",
  ERROR: "ERROR"
};
var CACHE_TYPES = exports.CACHE_TYPES = {
  NO_CACHE: "NO_CACHE",
  SINGLE: "SINGLE",
  MANUAL: "MANUAL"
};

var renderPropTypes = exports.renderPropTypes = {
  render: _propTypes.func.isRequired
};

var propTypes = exports.propTypes = {
  cacheAndNetwork: _propTypes.bool,
  cacheType: (0, _propTypes.oneOf)(Object.values(CACHE_TYPES)),
  request: _propTypes.func.isRequired,
  willUpdate: _propTypes.func,
  skipCall: _propTypes.bool,
  using: _propTypes.object
};