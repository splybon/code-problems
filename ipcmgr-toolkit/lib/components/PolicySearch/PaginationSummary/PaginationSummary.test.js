import React from "react";
import { shallow } from "enzyme";

import PaginationSummary from "./PaginationSummary";

test("renders without crashing", () => {
  const wrapper = shallow(
    <PaginationSummary start={25} end={50} totalItems={1000} />
  );
  expect(wrapper).toMatchSnapshot();
});
