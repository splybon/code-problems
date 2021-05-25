import { useEffect, useRef, useState } from "react";
import makeCancelable from "../utils/cancelable-promise";
import deterministicString from "../utils/deterministic-string";
import { CACHE_TYPES, STATUSES } from "../utils/fetch-utils";
import * as singlePromiseCache from "../utils/single-promise-cache";

const retrieveCache = ({ cacheType, request, using }) => {
  if (cacheType === CACHE_TYPES.SINGLE) {
    return singlePromiseCache.retrieve({
      request,
      using
    });
  }
  if (cacheType === CACHE_TYPES.MANUAL) {
    const cached = request(using, "cache-only");
    if (cached && cached.result instanceof Error) {
      return {
        error: cached.result
      };
    }
    return cached;
  }
  return undefined;
};
const storeCache = ({ cacheType, promise, request, using }) => {
  if (cacheType === CACHE_TYPES.SINGLE) {
    singlePromiseCache.store({
      promise,
      request,
      using
    });
  }
};
const fetchAndCache = ({ cacheType, request, using }) => {
  const promise =
    cacheType === CACHE_TYPES.MANUAL
      ? request(using, "network-only")
      : request(using);
  storeCache({ cacheType, promise, request, using });
  return promise;
};

const errorToString = e => (typeof e === "object" ? e.message || "" : e || "");

const wrapPromise = (rawPromise, setState) => {
  const { promise, cancel } = makeCancelable(rawPromise);
  promise
    .then(data => {
      setState({
        data,
        dataMatchesRequest: true,
        error: undefined,
        status: STATUSES.DONE
      });
    })
    .catch(e => {
      if (typeof e === "object" && e.isCanceled) {
        return;
      }
      setState({
        data: undefined,
        dataMatchesRequest: false,
        error: errorToString(e),
        status: STATUSES.ERROR
      });
    });
  return cancel;
};

const defaultState = {
  status: STATUSES.INITIAL,
  dataMatchesRequest: false
};

const useFetch = ({
  cacheAndNetwork = false,
  cacheType = CACHE_TYPES.NO_CACHE,
  invalidatorTime = null,
  request = () => Promise.resolve(),
  skipCall = false,
  using = {},
  willUpdate = i => i
}) => {
  const [state, setState] = useState(defaultState);
  const lastValidTime = useRef(Date.now());

  const changeState = nextState => {
    const returnedState = willUpdate(nextState);
    if (returnedState) {
      setState(returnedState);
    }
  };

  useEffect(
    () => {
      const cacheIsValid =
        !invalidatorTime || lastValidTime.current > invalidatorTime;
      lastValidTime.current = Date.now();
      const networkAnyway = cacheAndNetwork || !cacheIsValid;
      if (skipCall) {
        if (state.status === STATUSES.BUSY) {
          changeState({
            ...state,
            ...defaultState
          });
        }
        return undefined;
      }
      if (state.status !== STATUSES.BUSY) {
        changeState({
          ...state,
          status: STATUSES.BUSY,
          dataMatchesRequest: false
        });
      }
      const fromCache = retrieveCache({ cacheType, request, using });
      if (fromCache && fromCache.result) {
        changeState({
          data: fromCache.result,
          dataMatchesRequest: true,
          error: undefined,
          status: networkAnyway ? STATUSES.BUSY : STATUSES.DONE
        });
        return networkAnyway
          ? wrapPromise(
              fetchAndCache({ cacheType, request, using }),
              changeState
            )
          : undefined;
      }
      if (fromCache && fromCache.error) {
        changeState({
          data: undefined,
          dataMatchesRequest: false,
          error: errorToString(fromCache.error),
          status: networkAnyway ? STATUSES.BUSY : STATUSES.ERROR
        });
        return networkAnyway
          ? wrapPromise(
              fetchAndCache({ cacheType, request, using }),
              changeState
            )
          : undefined;
      }
      return wrapPromise(
        fromCache && cacheIsValid
          ? fromCache.promise
          : fetchAndCache({ cacheType, request, using }),
        changeState
      );
    },
    [skipCall, deterministicString(using), invalidatorTime]
  );
  return [state];
};

useFetch.STATUSES = STATUSES;
useFetch.CACHE_TYPES = CACHE_TYPES;
useFetch.STATE_RESET = {
  ...defaultState,
  data: undefined,
  error: undefined
};

export default useFetch;
