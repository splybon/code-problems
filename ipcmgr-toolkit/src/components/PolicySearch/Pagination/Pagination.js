import { Icon, Pager } from "@icg360/ui-toolkit";
import PropTypes from "prop-types";
import React, { Component } from "react";
import PaginationSummary from "../PaginationSummary/PaginationSummary";

class Pagination extends Component {
  static propTypes = {
    from: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    onFromChange: PropTypes.func.isRequired,
    totalCount: PropTypes.number.isRequired
  };

  handlePageSelect = dir => {
    const { from, size, onFromChange } = this.props;
    if (dir === "previous") {
      onFromChange(Math.max(from - size, 0));
    } else if (dir === "next") {
      onFromChange(from + size);
    }
  };

  render() {
    const { from, size, totalCount } = this.props;
    return (
      <div className="pagination__body">
        <div className="pagination__pages">
          <Pager bsClass="pagination" onSelect={this.handlePageSelect}>
            <Pager.Item eventKey="previous" disabled={from === 0}>
              <Icon name="chevron_left" />
            </Pager.Item>
            <Pager.Item eventKey="next" disabled={totalCount <= from + size}>
              <Icon name="chevron_right" />
            </Pager.Item>
          </Pager>
        </div>
        <div className="pagination__summary">
          <PaginationSummary
            start={from + 1}
            end={Math.min(from + size, totalCount)}
            totalItems={totalCount}
          />
        </div>
      </div>
    );
  }
}

export default Pagination;
