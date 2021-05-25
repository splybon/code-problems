import hoistStatics from "hoist-non-react-statics";
import React from "react";

export default (
  propsMapper,
  // eslint-disable-next-line react/forbid-foreign-prop-types
  { displayName = "wrapped", propTypes, defaultProps }
) => (Component, ...passedArgs) => {
  const NewComponent = React.forwardRef((props, ref) => (
    <Component {...propsMapper(props, ...passedArgs)} ref={ref} />
  ));

  NewComponent.displayName = `${displayName}(${Component.displayName ||
    Component.name})`;
  NewComponent.WrappedComponent = Component;
  NewComponent.propTypes = propTypes;
  NewComponent.defaultProps = defaultProps;

  return hoistStatics(NewComponent, Component);
};
