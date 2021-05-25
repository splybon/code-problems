import useQS from "./useQS";

jest.mock("react", () => ({
  useMemo: f => f()
}));

const history = {
  push: jest.fn()
};

describe("useQS React Hook", () => {
  it("merges the URL query string with the defaults named parameter", () => {
    const location = {
      search: "q=foo"
    };
    const [state] = useQS({
      location,
      history,
      defaults: {
        q: "",
        page: "1"
      }
    });
    expect(state).toEqual({
      q: "foo",
      page: "1"
    });
  });

  it("will call history.push with new query string", () => {
    history.push.mockClear();
    const defaults = {
      q: "",
      page: "1"
    };
    const [state, set] = useQS({
      location: {},
      history,
      defaults
    });
    expect(state).toEqual(defaults);
    set({
      q: "foo"
    });
    expect(history.push).toBeCalledWith({
      search: "q=foo"
    });
  });

  it("will not call history.push if state does not change", () => {
    history.push.mockClear();
    const location = {
      search: "q=bar"
    };
    const defaults = {
      q: "",
      page: "1"
    };
    const [state, set] = useQS({
      location,
      history,
      defaults
    });
    expect(state).toEqual({
      q: "bar",
      page: "1"
    });
    set({
      q: "bar"
    });
    expect(history.push).not.toBeCalled();
  });

  it("will remove a query string parameter that matches the default", () => {
    history.push.mockClear();
    const location = {
      search: "q=bar&page=2"
    };
    const defaults = {
      q: "",
      page: "1"
    };
    const [state, set] = useQS({
      location,
      history,
      defaults
    });
    expect(state).toEqual({
      q: "bar",
      page: "2"
    });
    set({
      page: "1"
    });
    expect(history.push).toBeCalledWith({
      search: "q=bar"
    });
  });

  it("will return an array if default is an array", () => {
    history.push.mockClear();
    const defaults = {
      q: "",
      filter: ["foo", "bar"]
    };
    const [state, set] = useQS({
      location: {},
      history,
      defaults
    });
    expect(state).toEqual({
      q: "",
      filter: ["foo", "bar"]
    });
    set({
      filter: ["foo", "bar", "baz"]
    });
    expect(history.push).toBeCalledWith({
      search: "filter=foo&filter=bar&filter=baz"
    });
  });

  it("will use a blank string to represent an empty array", () => {
    history.push.mockClear();
    const defaults = {
      q: "",
      filter: ["foo", "bar"]
    };
    const [state, set] = useQS({
      location: {},
      history,
      defaults
    });
    expect(state).toEqual({
      q: "",
      filter: ["foo", "bar"]
    });
    set({
      filter: []
    });
    expect(history.push).toBeCalledWith({
      search: "filter="
    });
  });

  it("will not use a blank string to represent an empty array if the default is empty", () => {
    history.push.mockClear();
    const location = {
      search: "filter=foo&filter=bar"
    };
    const defaults = {
      q: "",
      filter: []
    };
    const [state, set] = useQS({
      location,
      history,
      defaults
    });
    expect(state).toEqual({
      q: "",
      filter: ["foo", "bar"]
    });
    set({
      filter: []
    });
    expect(history.push).toBeCalledWith({
      search: ""
    });
  });
});
