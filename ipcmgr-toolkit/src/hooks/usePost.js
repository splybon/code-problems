import { useCallback, useEffect, useState } from "react";
import deterministicString from "../utils/deterministic-string";
import useFetch from "./useFetch";

const usePost = ({
  cacheAndNetwork,
  cacheType,
  invalidatorTime,
  request,
  skipCall = true,
  using,
  willUpdate
}) => {
  const [state, setState] = useState({
    invalidatorTime,
    skipCall,
    using
  });

  const [fetchState] = useFetch({
    cacheAndNetwork,
    cacheType,
    invalidatorTime,
    request,
    skipCall,
    using,
    willUpdate,
    ...state
  });

  useEffect(
    () => {
      setState({
        invalidatorTime,
        skipCall,
        using
      });
    },
    [invalidatorTime, skipCall, deterministicString(using)]
  );

  return [
    fetchState,
    useCallback(val => {
      setState({
        invalidatorTime: Date.now(),
        skipCall: false,
        using: val
      });
    }, [])
  ];
};

usePost.STATUSES = useFetch.STATUSES;
usePost.CACHE_TYPES = useFetch.CACHE_TYPES;
usePost.STATE_RESET = useFetch.STATE_RESET;

export default usePost;
