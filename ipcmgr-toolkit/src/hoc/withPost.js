import usePost from "../hooks/usePost";
import createHOC from "../utils/create-hoc";
import partitionObject from "../utils/partition-object";
import { propTypes } from "../utils/fetch-utils";

const postPropKeys = Object.keys(propTypes);

const withPost = createHOC(
  (props, defaultProps) => {
    const [postProps, passProps] = partitionObject(props, postPropKeys);
    const [state, post] = usePost({
      ...defaultProps,
      ...postProps
    });
    return {
      ...passProps,
      ...state,
      post
    };
  },
  {
    displayName: "withPost",
    propTypes
  }
);

withPost.STATUSES = usePost.STATUSES;
withPost.CACHE_TYPES = usePost.CACHE_TYPES;
withPost.STATE_RESET = usePost.STATE_RESET;

export default withPost;
