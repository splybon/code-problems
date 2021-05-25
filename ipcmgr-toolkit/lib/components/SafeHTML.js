"use strict";

exports.__esModule = true;
exports.htmlTreeToString = exports.parseHtml = exports.SKIP_ELEMENTS = exports.SAFE_ATTRS = exports.SAFE_ELEMENTS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _htmlparser = require("htmlparser2");

var _htmlparser2 = _interopRequireDefault(_htmlparser);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _underscore = require("underscore");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* eslint-disable react/no-danger */


var SAFE_ELEMENTS = exports.SAFE_ELEMENTS = ["a", "b", "br", "caption", "code", "col", "colgroup", "div", "em", "h1", "h2", "h3", "h4", "h5", "h6", "hr", "i", "img", "li", "ol", "p", "small", "span", "strong", "table", "tbody", "td", "th", "thead", "tr", "u", "ul"];

var SAFE_ATTRS = exports.SAFE_ATTRS = ["align", "border", "cellspacing", "cellpadding", "colspan", "height", "href", "src", "style", "width"];

var SKIP_ELEMENTS = exports.SKIP_ELEMENTS = ["head", "script", "style"];

var SELF_CLOSING_TAGS = ["br", "col", "hr", "img"];

var parseHtml = exports.parseHtml = function parseHtml(html) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$safeElements = _ref.safeElements,
      safeElements = _ref$safeElements === undefined ? SAFE_ELEMENTS : _ref$safeElements,
      _ref$safeAttrs = _ref.safeAttrs,
      safeAttrs = _ref$safeAttrs === undefined ? SAFE_ATTRS : _ref$safeAttrs,
      _ref$skipElements = _ref.skipElements,
      skipElements = _ref$skipElements === undefined ? SKIP_ELEMENTS : _ref$skipElements;

  var root = {
    children: []
  };
  var state = {
    node: root,
    context: [root],
    skip: []
  };
  new _htmlparser2.default.Parser({
    onopentag: function onopentag(name, attrs) {
      if (skipElements.includes(name)) {
        state.skip.push(name);
        return;
      }
      if (state.skip.length || !safeElements.includes(name)) return;
      var pickedAttrs = _underscore.pick.apply(undefined, [attrs].concat(safeAttrs));
      state.node = (0, _underscore.isEmpty)(pickedAttrs) ? {
        name: name
      } : { name: name, attrs: pickedAttrs };
      var parent = (0, _underscore.last)(state.context);
      if (parent.children) {
        parent.children.push(state.node);
      } else {
        parent.children = [state.node];
      }
      state.context.push(state.node);
    },
    ontext: function ontext(rawText) {
      if (state.skip.length) return;
      var text = rawText.replace(/\s+/g, " ");
      if (!text) return;
      var appendTo = state.node || (0, _underscore.last)(state.context);
      if (appendTo) {
        if (appendTo.children) {
          appendTo.children.push(text);
        } else {
          appendTo.children = [text];
        }
      }
    },
    onclosetag: function onclosetag(name) {
      if (skipElements.includes(name)) {
        state.skip.pop();
        return;
      }
      if (state.skip.length || !safeElements.includes(name)) return;
      state.node = null;
      state.context.pop();
    }
  }, { decodeEntities: false, recognizeSelfClosing: true }).end(html);
  return root;
};

var htmlTreeToString = exports.htmlTreeToString = function htmlTreeToString(_ref2) {
  var name = _ref2.name,
      _ref2$attrs = _ref2.attrs,
      attrs = _ref2$attrs === undefined ? {} : _ref2$attrs,
      _ref2$children = _ref2.children,
      children = _ref2$children === undefined ? [] : _ref2$children;

  var selfClose = SELF_CLOSING_TAGS.includes(name) && !children.length;
  if (name === "img" && (!attrs.src || attrs.src.indexOf("cid:") === 0)) {
    return attrs.alt;
  }
  return [name && "<" + name, name && Object.entries(attrs).map(function (_ref3) {
    var key = _ref3[0],
        value = _ref3[1];
    return " " + key + "=\"" + value + "\"";
  }).join(""), name && !selfClose && ">", children.map(function (node) {
    return typeof node === "string" ? node : htmlTreeToString(node);
  }).filter(function (i) {
    return i;
  }).join(""), name && (selfClose ? "/>" : "</" + name + ">")].filter(function (i) {
    return i;
  }).join("");
};

var SafeHTML = (0, _react.memo)(function (_ref4) {
  var html = _ref4.html,
      safeElements = _ref4.safeElements,
      safeAttrs = _ref4.safeAttrs,
      skipElements = _ref4.skipElements,
      props = _objectWithoutProperties(_ref4, ["html", "safeElements", "safeAttrs", "skipElements"]);

  var ast = parseHtml(html, { safeElements: safeElements, safeAttrs: safeAttrs, skipElements: skipElements });
  return _react2.default.createElement("div", _extends({}, props, {
    dangerouslySetInnerHTML: { __html: htmlTreeToString(ast) }
  }));
});

SafeHTML.SAFE_ELEMENTS = SAFE_ELEMENTS;
SafeHTML.SAFE_ATTRS = SAFE_ATTRS;
SafeHTML.SKIP_ELEMENTS = SKIP_ELEMENTS;

SafeHTML.propTypes = process.env.NODE_ENV !== "production" ? {
  html: _propTypes2.default.string.isRequired,
  safeElements: _propTypes2.default.arrayOf(_propTypes2.default.string),
  safeAttrs: _propTypes2.default.arrayOf(_propTypes2.default.string),
  skipElements: _propTypes2.default.arrayOf(_propTypes2.default.string)
} : {};

SafeHTML.defaultProps = {
  safeElements: SAFE_ELEMENTS,
  safeAttrs: SAFE_ATTRS,
  skipElements: SKIP_ELEMENTS
};

exports.default = SafeHTML;