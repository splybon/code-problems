import { Icon, Table } from "@icg360/ui-toolkit";
import { printDate } from "@package/ipcmgr-toolkit";
import classnames from "classnames";
import PT from "prop-types";
import React, { Component } from "react";
import { SORT_ASC, SORT_DESC, TABLE_HEADINGS } from "./constants";

class ResultsGrid extends Component {
  static propTypes = {
    isLoading: PT.bool.isRequired,
    policies: PT.array.isRequired,
    onPolicySelect: PT.func.isRequired,
    onSortSelect: PT.func.isRequired,
    sortField: PT.string.isRequired,
    sortOrder: PT.string.isRequired,
    requireQuery: PT.bool.isRequired
  };

  render() {
    const {
      isLoading,
      policies,
      onPolicySelect,
      onSortSelect,
      sortField,
      sortOrder,
      requireQuery
    } = this.props;
    return (
      <Table
        className="search__results"
        hover={!!policies.length}
        data-content-loading={isLoading}
      >
        <thead>
          {
            <tr>
              {TABLE_HEADINGS.map(({ label, sortable, value }) => (
                <th key={label}>
                  {!!policies.length && sortable ? (
                    <button
                      type="button"
                      className={classnames(
                        "search__sort",
                        "sortable",
                        sortOrder === SORT_ASC &&
                          sortField === value &&
                          "sortable--asc",
                        sortOrder === SORT_DESC &&
                          sortField === value &&
                          "sortable--desc"
                      )}
                      onClick={() => onSortSelect(value)}
                    >
                      {label}
                    </button>
                  ) : (
                    label
                  )}
                </th>
              ))}
            </tr>
          }
        </thead>
        <tbody>
          {policies.length ? (
            policies.map(
              ({
                id,
                addresses,
                carrierId,
                effectiveDate,
                identifiers: { policyNumber, quoteNumber },
                insuredName,
                policyState,
                productLabel
              }) => {
                const street1 =
                  addresses && addresses.property && addresses.property.street1;
                return (
                  <tr
                    key={id}
                    onClick={() =>
                      onPolicySelect({
                        id,
                        identifiers: { policyNumber, quoteNumber },
                        insuredName
                      })
                    }
                  >
                    <td>{quoteNumber}</td>
                    <td>{policyNumber}</td>
                    <td>{carrierId}</td>
                    <td>{productLabel}</td>
                    <td>{insuredName}</td>
                    <td>{street1}</td>
                    <td>{policyState}</td>
                    <td>{printDate(effectiveDate)}</td>
                  </tr>
                );
              }
            )
          ) : (
            <tr>
              <td colSpan="8">
                <div className="search__results__zero-state">
                  <Icon
                    name="search"
                    size="large"
                    style={{ opacity: ".325" }}
                  />
                  <h3>No results found</h3>
                  {requireQuery && (
                    <p>
                      Use the search field above to find quotes and policies by
                      ID, address, policyholder name, and more.
                    </p>
                  )}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }
}

export default ResultsGrid;
