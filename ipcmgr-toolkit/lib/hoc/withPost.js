"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _usePost2 = require("../hooks/usePost");

var _usePost3 = _interopRequireDefault(_usePost2);

var _createHoc = require("../utils/create-hoc");

var _createHoc2 = _interopRequireDefault(_createHoc);

var _partitionObject2 = require("../utils/partition-object");

var _partitionObject3 = _interopRequireDefault(_partitionObject2);

var _fetchUtils = require("../utils/fetch-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postPropKeys = Object.keys(_fetchUtils.propTypes);

var withPost = (0, _createHoc2.default)(function (props, defaultProps) {
  var _partitionObject = (0, _partitionObject3.default)(props, postPropKeys),
      postProps = _partitionObject[0],
      passProps = _partitionObject[1];

  var _usePost = (0, _usePost3.default)(_extends({}, defaultProps, postProps)),
      state = _usePost[0],
      post = _usePost[1];

  return _extends({}, passProps, state, {
    post: post
  });
}, {
  displayName: "withPost",
  propTypes: _fetchUtils.propTypes
});

withPost.STATUSES = _usePost3.default.STATUSES;
withPost.CACHE_TYPES = _usePost3.default.CACHE_TYPES;
withPost.STATE_RESET = _usePost3.default.STATE_RESET;

exports.default = withPost;
module.exports = exports["default"];