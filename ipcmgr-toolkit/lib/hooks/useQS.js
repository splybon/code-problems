"use strict";

exports.__esModule = true;

var _lodash = require("lodash");

var _react = require("react");

exports.default = function (_ref) {
  var location = _ref.location,
      history = _ref.history,
      _ref$defaults = _ref.defaults,
      defaults = _ref$defaults === undefined ? {} : _ref$defaults;
  return (0, _react.useMemo)(function () {
    var searchParams = new URLSearchParams(location.search);
    var state = (0, _lodash.mapValues)(defaults, function (val, key) {
      if (Array.isArray(val)) {
        var _paramVal = searchParams.getAll(key);
        return _paramVal.length ? _paramVal : val;
      }
      var paramVal = searchParams.get(key);
      return paramVal === null ? val : paramVal;
    });

    var setter = function setter(updateState) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref2$action = _ref2.action,
          action = _ref2$action === undefined ? "push" : _ref2$action,
          pathname = _ref2.pathname,
          hash = _ref2.hash;

      var nextParams = typeof updateState === "function" ? updateState(state) : updateState;
      if (!nextParams) return;
      var update = !!pathname && pathname !== location.pathname;
      var base = update ? new URLSearchParams() : searchParams;
      (0, _lodash.forEach)(nextParams, function (anyVal, key) {
        var defaultVal = defaults[key];
        if (Array.isArray(defaultVal)) {
          var vals = anyVal.map(String);
          if ((0, _lodash.isEqual)(vals, state[key])) return;
          base.delete(key);
          if (!(0, _lodash.isEqual)(vals, defaultVal)) {
            if (vals.length) {
              vals.forEach(function (val) {
                base.append(key, val);
              });
            } else {
              base.set(key, "");
            }
          }
        } else {
          var val = String(anyVal);
          if (val === state[key]) return;
          if (val === defaultVal) {
            base.delete(key);
          } else {
            base.set(key, val);
          }
        }
        update = true;
      });
      if (update) {
        history[action]({
          pathname: pathname,
          hash: hash,
          search: base.toString()
        });
      }
    };

    return [(0, _lodash.mapValues)(state, function (val) {
      return (0, _lodash.isEqual)(val, [""]) ? [] : val;
    }), setter];
  }, [location]);
};

module.exports = exports["default"];