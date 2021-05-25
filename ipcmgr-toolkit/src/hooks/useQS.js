import { forEach, isEqual, mapValues } from "lodash";
import { useMemo } from "react";

export default ({ location, history, defaults = {} }) =>
  useMemo(
    () => {
      const searchParams = new URLSearchParams(location.search);
      const state = mapValues(defaults, (val, key) => {
        if (Array.isArray(val)) {
          const paramVal = searchParams.getAll(key);
          return paramVal.length ? paramVal : val;
        }
        const paramVal = searchParams.get(key);
        return paramVal === null ? val : paramVal;
      });

      const setter = (
        updateState,
        { action = "push", pathname, hash } = {}
      ) => {
        const nextParams =
          typeof updateState === "function" ? updateState(state) : updateState;
        if (!nextParams) return;
        let update = !!pathname && pathname !== location.pathname;
        const base = update ? new URLSearchParams() : searchParams;
        forEach(nextParams, (anyVal, key) => {
          const defaultVal = defaults[key];
          if (Array.isArray(defaultVal)) {
            const vals = anyVal.map(String);
            if (isEqual(vals, state[key])) return;
            base.delete(key);
            if (!isEqual(vals, defaultVal)) {
              if (vals.length) {
                vals.forEach(val => {
                  base.append(key, val);
                });
              } else {
                base.set(key, "");
              }
            }
          } else {
            const val = String(anyVal);
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
            pathname,
            hash,
            search: base.toString()
          });
        }
      };

      return [mapValues(state, val => (isEqual(val, [""]) ? [] : val)), setter];
    },
    [location]
  );
