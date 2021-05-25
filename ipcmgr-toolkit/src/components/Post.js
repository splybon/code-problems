import usePost from "../hooks/usePost";
import { propTypes, renderPropTypes } from "../utils/fetch-utils";

const Post = ({ render, ...props }) => render(...usePost(props));

Post.CACHE_TYPES = usePost.CACHE_TYPES;
Post.STATUSES = usePost.STATUSES;
Post.STATE_RESET = usePost.STATE_RESET;

Post.propTypes = {
  ...propTypes,
  ...renderPropTypes
};

export default Post;
