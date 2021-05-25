export const MOD_BASEPATH = "/quotes-and-policies";
export const SEARCH_FILTER_LIST = ["Quotes", "Policies"];
export const SORT_ASC = "ASC";
export const SORT_DESC = "DESC";
export const POLICY_SEARCH_QS_DEFAULTS = {
  query: "",
  sortField: "effectiveDate",
  sortOrder: SORT_DESC,
  from: "0",
  size: "20",
  filter: SEARCH_FILTER_LIST
};
export const TABLE_HEADINGS = [
  {
    label: "Quote ID",
    sortable: true,
    value: "identifiers.quoteNumber"
  },
  {
    label: "Policy #",
    sortable: true,
    value: "identifiers.policyNumber"
  },
  {
    label: "Carrier ID",
    sortable: false,
    value: "carrierId"
  },
  {
    label: "Product",
    sortable: false,
    value: "productType"
  },
  {
    label: "Name",
    sortable: true,
    value: "insuredName"
  },
  {
    label: "Address",
    sortable: false,
    value: "addresses.property.street1"
  },
  {
    label: "Status",
    sortable: true,
    value: "policyState"
  },
  {
    label: "Effective",
    sortable: true,
    value: "effectiveDate"
  }
];
