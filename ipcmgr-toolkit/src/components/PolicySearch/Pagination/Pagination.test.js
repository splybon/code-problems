import { Pager as ReactPagination } from "@icg360/ui-toolkit";
import { shallow } from "enzyme";
import React from "react";
import Pagination from "./Pagination";

const props = {
  from: 0,
  size: 25,
  onFromChange: () => {},
  totalCount: 1000
};

test("renders one page if total items is 1", () => {
  const wrapper = shallow(<Pagination {...props} totalItems={1} />);
  const paginationItem = ReactPagination.Item;

  expect(wrapper.find(paginationItem)).toHaveLength(2);
});

test("renders without crashing", () => {
  const wrapper = shallow(<Pagination {...props} />);
  expect(wrapper).toMatchSnapshot();
});
