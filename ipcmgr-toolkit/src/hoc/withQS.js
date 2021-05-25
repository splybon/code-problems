import PT from "prop-types";
import useQS from "../hooks/useQS";
import createHOC from "../utils/create-hoc";

export default createHOC(
  (props, defaults) => {
    const [qsState, setQS] = useQS({
      history: props.history,
      location: props.location,
      defaults
    });
    return {
      ...props,
      qsState,
      setQS
    };
  },
  {
    displayName: "withQS",
    propTypes: {
      location: PT.object,
      history: PT.object
    }
  }
);
