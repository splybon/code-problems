import { shallow } from "enzyme";
import React from "react";
import ResultsGrid from "./ResultsGrid";

const mockProps = {
  policies: [
    {
      id: "exampleid",
      identifiers: { quoteNumber: "quotenum", policyNumber: "policynum" },
      carrerId: "carrier id",
      productLabel: "product label",
      insuredName: "insuredName",
      addresses: { property: { street1: "street1" } },
      policyState: "policyState",
      effectiveDate: "12/02/03"
    }
  ],
  isLoading: false,
  sortOrder: "DESC",
  sortField: "effectiveDate",
  onPolicySelect: () => {},
  onSortSelect: () => {}
};

it("renders with results", () => {
  const wrapper = shallow(<ResultsGrid {...mockProps} />);
  expect(wrapper).toMatchSnapshot();
});

it("renders with no results", () => {
  const wrapper = shallow(<ResultsGrid {...mockProps} policies={[]} />);
  expect(wrapper.exists(".search__results__zero-state")).toBeTruthy();
});
