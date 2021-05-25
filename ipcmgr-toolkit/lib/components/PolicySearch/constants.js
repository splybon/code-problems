"use strict";

exports.__esModule = true;
var MOD_BASEPATH = exports.MOD_BASEPATH = "/quotes-and-policies";
var SEARCH_FILTER_LIST = exports.SEARCH_FILTER_LIST = ["Quotes", "Policies"];
var SORT_ASC = exports.SORT_ASC = "ASC";
var SORT_DESC = exports.SORT_DESC = "DESC";
var POLICY_SEARCH_QS_DEFAULTS = exports.POLICY_SEARCH_QS_DEFAULTS = {
  query: "",
  sortField: "effectiveDate",
  sortOrder: SORT_DESC,
  from: "0",
  size: "20",
  filter: SEARCH_FILTER_LIST
};
var TABLE_HEADINGS = exports.TABLE_HEADINGS = [{
  label: "Quote ID",
  sortable: true,
  value: "identifiers.quoteNumber"
}, {
  label: "Policy #",
  sortable: true,
  value: "identifiers.policyNumber"
}, {
  label: "Carrier ID",
  sortable: false,
  value: "carrierId"
}, {
  label: "Product",
  sortable: false,
  value: "productType"
}, {
  label: "Name",
  sortable: true,
  value: "insuredName"
}, {
  label: "Address",
  sortable: false,
  value: "addresses.property.street1"
}, {
  label: "Status",
  sortable: true,
  value: "policyState"
}, {
  label: "Effective",
  sortable: true,
  value: "effectiveDate"
}];