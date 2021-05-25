import { bool, func, object, oneOf } from "prop-types";

export const STATUSES = {
  INITIAL: "INITIAL",
  BUSY: "BUSY",
  DONE: "DONE",
  ERROR: "ERROR"
};
export const CACHE_TYPES = {
  NO_CACHE: "NO_CACHE",
  SINGLE: "SINGLE",
  MANUAL: "MANUAL"
};

export const renderPropTypes = {
  render: func.isRequired
};

export const propTypes = {
  cacheAndNetwork: bool,
  cacheType: oneOf(Object.values(CACHE_TYPES)),
  request: func.isRequired,
  willUpdate: func,
  skipCall: bool,
  using: object
};
