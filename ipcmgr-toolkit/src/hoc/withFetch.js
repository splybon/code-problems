import useFetch from "../hooks/useFetch";
import createHOC from "../utils/create-hoc";
import partitionObject from "../utils/partition-object";
import { propTypes } from "../utils/fetch-utils";

const fetchPropKeys = Object.keys(propTypes);

const withFetch = createHOC(
  (props, defaultProps) => {
    const [fetchProps, passProps] = partitionObject(props, fetchPropKeys);
    const [state] = useFetch({
      ...defaultProps,
      ...fetchProps
    });
    return {
      ...passProps,
      ...state
    };
  },
  {
    displayName: "withFetch",
    propTypes
  }
);

withFetch.STATUSES = useFetch.STATUSES;
withFetch.CACHE_TYPES = useFetch.CACHE_TYPES;
withFetch.STATE_RESET = useFetch.STATE_RESET;

export default withFetch;
