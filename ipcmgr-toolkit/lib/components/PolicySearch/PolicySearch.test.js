import { shallow } from "enzyme";
import React from "react";
import { MockedProvider } from "@apollo/react-testing";
import gql from "graphql-tag";
import { SORT_DESC } from "./constants";
import PolicySearchWrapped from "./PolicySearch";

const PolicySearch = PolicySearchWrapped.WrappedComponent;

const SEARCH_QUERY = gql`
  query Search(
    $searchText: String
    $quotes: Boolean
    $policies: Boolean
    $sort: Sort
    $from: Int
    $size: Int
  ) {
    results: searchPolicies(
      searchText: $searchText
      quotes: $quotes
      policies: $policies
      sort: $sort
      from: $from
      size: $size
    ) {
      totalCount
    }
  }
`;

const policy = {
  identifiers: {
    insightPolicyId: "3db9f65f7b1f419ca722bd32f1dd7600",
    quoteNumber: "CRU4Q-517003",
    policyNumber: "FNS123400"
  },
  insuredName: "TEST SMITH",
  policyState: "ACTIVEPOLICY",
  policyPrefix: "SCP",
  productLabel: "HO3",
  effectiveDate: "2019-02-08T00:00:00-04:00",
  expirationDate: "2020-02-08T00:00:00-04:00",
  addresses: {
    property: {
      street1: "5105 SEA CORAL WAY",
      city: "NORTH MYRTLE BEACH",
      state: "SC",
      zip: "29582"
    }
  }
};

const mocks = [
  {
    request: {
      query: SEARCH_QUERY,
      variables: {
        query: "smith",
        quotes: true,
        policies: true,
        sortField: "effectiveDate",
        sortOrder: SORT_DESC,
        from: "0",
        size: "3"
      }
    },
    results: {
      totalCount: "1000",
      sort: {
        fieldName: "effectiveDate",
        sortOrder: SORT_DESC
      },
      policies: [policy, policy, policy]
    }
  }
];

jest.mock("./constants", () => ({ SORT_DESC: "DESC" }));

const mockProps = {
  history: {},
  service: { url: "", basePath: "" },
  qsState: {
    query: "",
    filter: ["quotes", "policies"],
    sortField: "effectiveDate",
    sortOrder: SORT_DESC,
    from: "0",
    size: "20"
  },
  setQS: () => {},
  graphqlQuery: SEARCH_QUERY,
  requireQuery: false
};

it("renders with out crashing", () => {
  const wrapper = shallow(
    <MockedProvider mocks={mocks}>
      <PolicySearch {...mockProps} />
    </MockedProvider>
  );
  expect(wrapper.find("PolicySearch")).toMatchSnapshot();
});
