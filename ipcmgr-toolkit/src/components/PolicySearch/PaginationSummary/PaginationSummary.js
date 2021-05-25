import PropTypes from "prop-types";
import React from "react";

const PaginationSummary = ({ end, start, totalItems }) => (
  <div className="pagination-summary">
    <strong>
      {start.toLocaleString()} - {end.toLocaleString()}
    </strong>
    {" of "}
    <strong>{totalItems.toLocaleString()}</strong>
    &nbsp; result{totalItems !== 1 && "s"}
  </div>
);

PaginationSummary.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired
};

export default PaginationSummary;
