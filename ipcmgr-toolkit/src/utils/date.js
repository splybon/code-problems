import moment from "moment";

const DATE_FORMAT = "MM/DD/YYYY";
const DATE_TIME_FORMAT = `${DATE_FORMAT} hh:mma`;
const LONG_DATE_FORMAT = "MMM D, YYYY";
const LONG_DATE_TIME_FORMAT = `${LONG_DATE_FORMAT} [at] h:mma`;

const tryParse = (date, format, isUTC) => {
  const m = isUTC ? moment.utc(date, format) : moment(date, format);
  return m.isValid() ? m : null;
};

const isISO = /^\d\d\d\d-\d\d-\d\d/;
export const parseDate = date => {
  if (typeof date === "number") {
    return moment.utc(date);
  }
  if (typeof date === "object" || isISO.test(date)) {
    return moment(date);
  }
  return (
    tryParse(date, "MM/DD/YYYY") ||
    tryParse(date, "MMMM, D YYYY HH:mm:ss", true) ||
    moment(date)
  );
};

const createPrintDate = format => arg =>
  arg ? parseDate(arg).format(format) : "";
export const printDate = createPrintDate(DATE_FORMAT);
export const printDateTime = createPrintDate(DATE_TIME_FORMAT);
export const printLongDate = createPrintDate(LONG_DATE_FORMAT);
export const printLongDateTime = createPrintDate(LONG_DATE_TIME_FORMAT);
