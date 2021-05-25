"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _usePost = require("../hooks/usePost");

var _usePost2 = _interopRequireDefault(_usePost);

var _fetchUtils = require("../utils/fetch-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Post = function Post(_ref) {
  var render = _ref.render,
      props = _objectWithoutProperties(_ref, ["render"]);

  return render.apply(undefined, (0, _usePost2.default)(props));
};

Post.CACHE_TYPES = _usePost2.default.CACHE_TYPES;
Post.STATUSES = _usePost2.default.STATUSES;
Post.STATE_RESET = _usePost2.default.STATE_RESET;

Post.propTypes = _extends({}, _fetchUtils.propTypes, _fetchUtils.renderPropTypes);

exports.default = Post;
module.exports = exports["default"];