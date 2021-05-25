export default (obj, keys = []) =>
  Object.entries(obj).reduce(
    ([included, excluded], [key, value]) =>
      keys.includes(key)
        ? [{ ...included, [key]: value }, excluded]
        : [included, { ...excluded, [key]: value }],
    [{}, {}]
  );
