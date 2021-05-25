import useFetch from "../hooks/useFetch";
import { propTypes, renderPropTypes } from "../utils/fetch-utils";

const Fetch = ({ render, ...props }) => render(...useFetch(props));

Fetch.CACHE_TYPES = useFetch.CACHE_TYPES;
Fetch.STATUSES = useFetch.STATUSES;
Fetch.STATE_RESET = useFetch.STATE_RESET;

Fetch.propTypes = {
  ...propTypes,
  ...renderPropTypes
};

export default Fetch;
