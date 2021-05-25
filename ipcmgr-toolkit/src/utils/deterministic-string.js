// Turn any value type into a string consistently
const toString = anyValue => {
  if (typeof anyValue === "string") {
    return anyValue.replace(/[~,*{}[\]]/g, m => `~${m}`);
  }
  if (typeof anyValue === "undefined") {
    return `*u`;
  }
  if (anyValue === null) {
    return `*n`;
  }
  if (Array.isArray(anyValue)) {
    return `[${anyValue.map(toString).join()}]`;
  }
  if (typeof anyValue === "object") {
    return `{${Object.entries(anyValue)
      .sort(([aKey], [bKey]) => bKey.localeCompare(aKey))
      .reduce((acc, entry) => [...acc, ...entry], [])
      .map(toString)
      .join()}}`;
  }
  return `*${String(anyValue)}`;
};

export default toString;
