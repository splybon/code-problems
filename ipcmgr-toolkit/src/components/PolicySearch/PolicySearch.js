import { Alert, Checkbox, Grid, Preloader, Button } from "@icg360/ui-toolkit";
import PT from "prop-types";
import React, { Component, createRef } from "react";
import { Query } from "react-apollo";
import withQS from "../../hoc/withQS";
import {
  MOD_BASEPATH,
  SEARCH_FILTER_LIST,
  POLICY_SEARCH_QS_DEFAULTS,
  SORT_ASC,
  SORT_DESC
} from "./constants";
import Pagination from "./Pagination/Pagination";
import ResultsGrid from "./ResultsGrid";

class PolicySearch extends Component {
  static propTypes = {
    history: PT.object.isRequired,
    linkSuffix: PT.string,
    qsState: PT.shape({
      query: PT.string.isRequired,
      sortField: PT.string.isRequired,
      sortOrder: PT.oneOf([SORT_ASC, SORT_DESC]),
      from: PT.string,
      size: PT.string
    }).isRequired,
    setQS: PT.func.isRequired,
    requireQuery: PT.bool.isRequired,
    showRefreshButton: PT.bool,
    graphqlQuery: PT.object.isRequired,
    title: PT.string
  };

  static defaultProps = {
    title: "",
    linkSuffix: "",
    showRefreshButton: false
  };

  container = createRef();

  componentDidUpdate(prevProps) {
    const {
      qsState: { from }
    } = this.props;
    if (this.container.current && from !== prevProps.qsState.from) {
      this.container.current.scrollIntoView({
        block: "start",
        behavior: "smooth"
      });
    }
  }

  onFilterChange = ({ target: { checked, name } }) => {
    const { setQS } = this.props;
    setQS(({ filter }) => ({
      filter: SEARCH_FILTER_LIST.filter(val =>
        val === name ? checked : filter.includes(val)
      )
    }));
  };

  onSortSelect = selectedField => {
    const { setQS } = this.props;
    setQS(({ sortField, sortOrder }) => ({
      sortField: selectedField,
      sortOrder:
        selectedField === sortField && sortOrder === SORT_DESC
          ? SORT_ASC
          : SORT_DESC
    }));
  };

  onSizeChange = ({ target: { value } }) => {
    const { setQS } = this.props;
    setQS({
      size: value
    });
  };

  onFromChange = from => {
    const { setQS } = this.props;
    setQS({ from });
  };

  onPolicySelect = policy => {
    const { history, linkSuffix } = this.props;
    history.push({
      pathname: `${MOD_BASEPATH}/${
        policy.identifiers.quoteNumber
      }${linkSuffix}`,
      state: policy
    });
  };

  renderBody = ({ loading, error, results }) => {
    const {
      qsState: { sortField, sortOrder },
      requireQuery
    } = this.props;
    if (error) {
      return (
        <Alert hasIcon bsStyle="danger" style={{ margin: "10px 10px 20px" }}>
          <p>
            <strong>An error occured while searching policies.</strong>
          </p>
          <p>
            <code>{error.message}</code>
          </p>
        </Alert>
      );
    }
    if (results) {
      return (
        <ResultsGrid
          isLoading={loading}
          onPolicySelect={this.onPolicySelect}
          onSortSelect={this.onSortSelect}
          policies={results.policies}
          sortField={sortField}
          sortOrder={sortOrder}
          requireQuery={requireQuery}
        />
      );
    }
    if (loading) {
      return (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <Preloader />
        </div>
      );
    }
    return null;
  };

  renderResults = ({ loading, error, refetch, data: { results } = {} }) => {
    const {
      showRefreshButton,
      title,
      qsState: { from, size, filter }
    } = this.props;

    return (
      <Grid fluid className="search__container">
        <div ref={this.container}>
          <div className="search__header">
            <h2>
              {title}{" "}
              {results && !loading && (
                <small>
                  {results.totalCount.toLocaleString()} result
                  {results.totalCount !== 1 ? "s" : ""}
                </small>
              )}
            </h2>
            <div className="search__header__right">
              {results && loading && <Preloader />}
              {showRefreshButton && (
                <Button onClick={() => refetch()}>Refresh</Button>
              )}
              <Checkbox
                inline
                name="Policies"
                checked={filter.includes("Policies")}
                onChange={this.onFilterChange}
              >
                Policies
              </Checkbox>
              <Checkbox
                inline
                name="Quotes"
                checked={filter.includes("Quotes")}
                onChange={this.onFilterChange}
              >
                Quotes
              </Checkbox>
            </div>
          </div>
          <div className="search__body">
            {this.renderBody({ loading, error, results })}
          </div>
          <div className="search__footer">
            {results && results.totalCount > 0 && (
              <Pagination
                size={parseInt(size, 10)}
                from={parseInt(from, 10)}
                totalCount={results.totalCount}
                onFromChange={this.onFromChange}
              />
            )}
            <div className="result-count__per-page">
              <div className="result-count__select-wrapper">
                <select
                  className="result-count__select form-control"
                  onChange={this.onSizeChange}
                  value={size}
                  data-bdd="qp-pagination-result-count"
                >
                  {["10", "20", "50", "100"].map(count => (
                    <option key={count} value={count}>
                      {count} per page
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </Grid>
    );
  };

  render() {
    const {
      qsState: { query, filter, sortField, sortOrder, from, size },
      requireQuery,
      graphqlQuery
    } = this.props;
    return query || !requireQuery ? (
      <Query
        query={graphqlQuery}
        variables={{
          searchText: query,
          quotes: filter.includes("Quotes"),
          policies: filter.includes("Policies"),
          sort: {
            fieldName: sortField,
            sortOrder
          },
          from: parseInt(from, 10),
          size: parseInt(size, 10)
        }}
        children={this.renderResults}
        fetchPolicy="cache-and-network"
      />
    ) : null;
  }
}

export default withQS(PolicySearch, POLICY_SEARCH_QS_DEFAULTS);
