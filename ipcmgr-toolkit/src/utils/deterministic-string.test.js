import deterministicString from "./deterministic-string";

describe("deterministicString", () => {
  it("turns any value into a string", () => {
    expect(deterministicString("foo")).toBe("foo");
    expect(deterministicString(10)).toBe("*10");
    expect(deterministicString(undefined)).toBe("*u");
    expect(deterministicString(null)).toBe("*n");
    expect(deterministicString({})).toBe("{}");
    expect(deterministicString({ foo: "bar" })).toBe("{foo,bar}");
    expect(deterministicString([])).toBe("[]");
    expect(deterministicString(["foo"])).toBe("[foo]");
  });
  it("can handle nested values", () => {
    expect(
      deterministicString({
        foo: [
          "bar",
          {
            baz: undefined
          },
          5
        ]
      })
    ).toBe("{foo,[bar,{baz,*u},*5]}");
  });
  it("won't let you fake another value", () => {
    expect(deterministicString("[foo,bar]")).toBe("~[foo~,bar~]");
    expect(deterministicString("{*u,*10}")).toBe("~{~*u~,~*10~}");
    expect(deterministicString("~*10")).toBe("~~~*10");
  });
});
