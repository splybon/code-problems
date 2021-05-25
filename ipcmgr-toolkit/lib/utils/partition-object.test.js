import partitionObject from "./partition-object";

describe("partitionObject", () => {
  it("creates two objects based on an array of keys", () => {
    const keys = ["foo", "bar"];
    const object = {
      foo: "foo",
      bar: "bar",
      baz: "baz"
    };
    expect(partitionObject(object, keys)).toEqual([
      { foo: "foo", bar: "bar" },
      { baz: "baz" }
    ]);
  });
});
