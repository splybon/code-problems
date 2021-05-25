# ipcmgr-toolkit

## Purpose

This package can be imported into any IPC Manager module or the parent app. This allows us to share components, utilities, styles and information about each module.

In many cases this is similar to the [UI-Toolkit](https://gitlab.icg360.net/eng/ui-toolkit) but the components here usually more opinionated for IPC Manager.

## Guidelines

- Please refrain from adding anything to this package that is module specific
- Do not use this to share state between modules.
- All components and utilities need to be tested.

## Exports

### Modules

Information in constants about each IPCM Module. Use this to link between modules.

### Flags

This is where default values of Launch Darkly flags are stored.

### Date Utils

Use this to keep date formatting consistant across modules.

- printDate
- printDateTime
- printLongDate
- printLongDateTime

### SafeHTML

This is a component to allow you to inject HTML into React safely. Instead of just using `dangerouslySetInnerHTML`, use this component to parse the HTML string and only include whitelisted elements and attributes.

```
<SafeHTML
  html="<h1>Heading</h1><p>paragraph</p>"
/>
```

#### Statics:

- **SafeHTML.SAFE_ELEMENTS**: Array of elements used as the default for the `safeElements` prop.
- **SafeHTML.SAFE_ATTRS**: Array of attributes used as the default for the `safeAttrs` prop.
- **SafeHTML.SKIP_ELEMENTS**: Array of elements used as the default for the `skipElements` prop.

#### Props:

- **html**: (_required_) This is the string consisting of HTML.
- **safeElements**: This is an array of elements that are allowed to be rendered.
- **safeAttributes**: This is an array of attributes on elements that are allowed to be used.
- **skipElements**: This is an array of elements and their children that are completely skipped by the parser.

### useFetch, usePost

These are React hooks that allow you to make asynchronous requests inside the component. These hooks are also available as render prop components (`Fetch` and `Post`) or as HOCs (`withFetch` and `withPost`). To use the `useFetch` hook, pass the following props as a single object parameter. `useFetch` will return the state as the first item in an array. `usePost` works similarly except that `skipCall` is ignored since it will always be true and instead of passing the `using` object to the hook, you will pass it when invoking the call. `usePost` returns the state as the first item in an array with a callback function as the second element of the array. The callback function is where you will pass `using`.

#### Simple example:

```javascript
const makeRequest = ({ url }) =>
  fetch(url).then(res => (res.ok ? res.json() : null));

const [state] = useFetch({
  request: makeRequest,
  using: { url: "foo" }
});

const [state, post] = usePost({
  request: makeRequest
});
post({ url: "foo" });
```

#### Props:

- **request**: (_required_) This is a function that returns a Promise. The Promise returns the `data` or `error` that are supplied in the state.
- **using\***: This is an object to contain all the parameters sent to the `request` function. `useFetch` will compare the values of the `using` object to invoke a request if it has changed.
- **willUpdate**: This is a function that is provided the state before updating the state. You can use this to make state changes in other components and prevent `useFetch` from updating it's own state by returning `undefined`. Otherwise, whatever is returned is saved as the next state in `useFetch`. By returning `useFetch.STATE_RESET`, you can reset `useFetch`'s state to the original defaults.
- **cacheAndNetwork**: A Boolean to force an invocation of `request` even if data was found in the cache after any change to `request` or `using`.
- **cacheType**: An enum from `useFetch.CACHE_TYPES`. The values can be `NO_CACHE` (_default_), `SINGLE` or `MANUAL`. `SINGLE` only holds the last result for a `request` function across `useFetch` and `usePost` components. If the `using` prop changes, the single cached value is replaced with a new result. The `MANUAL` option means the `request` function does it's own caching. However, the `request` function will now have to support a second parameter that indicates whether is returns the cache or makes a network request. More information on the [MANUAL Cache Type](#manual-cache-type) below.
- **skipCall**: Defaults to `false` with fetch but `true` with post. If set to `true`, it will not check the cache or make any network requests until this is changed. The usePost callback will automatically update this value to `false`.
- **invalidatorTime**: This is mostly an internal prop to allow a network request to be refreshed and bypass cache.

#### State:

- **status**: An enum from `Fetch.STATUSES`. The values can be `INITIAL`, `BUSY`, `DONE`, or `ERROR`.
- **data**: The result of the resolved Promise from the `request` prop.
- **error**: The error string from a rejected Promise.
- **dataMatchesRequest**: Whether the data argument contains data that matches the latest returned request. This is helpful when `useFetch` is busy requesting new data but the most current data is still fine to display.

#### The callback:

Only available for `usePost`, It is a function to invoke the `request`. Pass the `using` object here instead of as a prop to `usePost`.

#### Manual Cache Type

This feature is enabled by setting the `cacheType` prop to `useFetch.CACHE_TYPES.MANUAL`. Now the `request` function will manually control it's own caching but will also need to support a second parameter similar to [Apollo's fetchPolicy option](https://www.apollographql.com/docs/react/v2.5/api/react-apollo/#optionsfetchpolicy). However, only two possible values will ever come from `useFetch`: `"cache-only"` and `"network-only"`. To cache a rejected promise, store the `result` as an instance of `Error`.

For example:

```javascript
let cachedResult;
let cachedPromise;

const fetchAndCache = url => {
  const promise = fetch(url)
    .then(res => (res.ok ? res.json() : null))
    .then(result => {
      cachedPromise = undefined;
      cachedResult = result;
      return result;
    })
    .catch(err => {
      cachedPromise = undefined;
      cachedResult = err;
      throw err;
    });
  cachedPromise = promise;
  return promise;
};

const makeRequest = ({ url }, fetchPolicy) => {
  // useFetch will first ask for only the cached values
  // this will need sychronously return an object with
  // this shape: { result, promise }
  if (fetchPolicy === "cache-only") {
    return {
      result: cachedResult,
      promise: cachedPromise
    };
  }
  // useFetch will then ask for a network request if necessary
  // make sure to still cache the response
  if (fetchPolicy === "network-only") {
    return fetchAndCache(url);
  }
  // The rest of the function can still support calls
  // that may be made outside of a `useFetch`
  // below is an example of how a "cache-first" fetchPolicy
  // might look
  if (cachedResult) {
    return Promise.resolve(cachedResult);
  }
  if (cachedPromise) {
    return cachedPromise;
  }
  return fetchAndCache(url);
};

const [state] = useFetch({
  request: makeRequest,
  using: { url: "foo" },
  cacheType: useFetch.CACHE_TYPES.MANUAL
});
```

#### Fetch, Post

These are render prop components that accept all the same props as `useFetch` or `usePost` but also a `render` prop. This special prop is a function that is called by the component. It passes the state as the first argument. The `Post` component will pass the callback as the second argument.

```javascript
const makeRequest = ({ url }) =>
  fetch(url).then(res => (res.ok ? res.json() : null));

const FetchExample = () => {
  return (
    <Fetch
      request={makeRequest}
      using={{ url: "foo" }}
      render={state => <div>{state.data}</div>}
    />
  );
};

const PostExample = () => {
  return (
    <Post
      request={makeRequest}
      render={(state, post) => (
        <button type="button" onClick={() => post({ url: "foo" })}>
          Submit
        </button>
      )}
    />
  );
};
```

#### withFetch, withPost

These are higher-order components that wrap a component and return a new component. The resulting component accepts all the same props as `useFetch` or `usePost`. Any non `useFetch` or `usePost` props are passed on to the wrapped component. The wrapped component receives all the passed through props and all the values of `useFetch` and `usePost` state as props. The `withPost` wrapped component will also receive a prop named `post` which is the callback function. You can use a second parameter on `withFetch` or `withPost` to pass default prop values; this is ideal for props that you don't expect to change.

```javascript
const makeRequest = ({ url }) =>
  fetch(url).then(res => (res.ok ? res.json() : null));

const WrappedFetch = ({ status, data, passedProp }) => {
  if (status === withFetch.STATUSES.BUSY) return <LOADING />;
  return <div className={passedProp}>{data}</div>;
};
const FetchExample = withFetch(WrappedFetch, {
  request: makeRequest,
  cacheType: withFetch.CACHE_TYPES.SINGLE
});
const FetchUsage = () => <FetchExample passedProp="a" using={{ url: "foo" }} />;

const WrappedPost = ({ data, passedProp, post }) => {
  return (
    <button className={passedProp} onClick={() => post({ url: "foo" })}>
      {data}
    </button>
  );
};
const PostExample = withPost(WrappedPost, { request: makeRequest });
const PostUsage = <PostExample passedProp="b" />;
```

### useQS

This is a new React Hook that takes three named parameters: `history`, `location`, and `defaults`. [`history`](https://reacttraining.com/react-router/web/api/history) and [`location`](https://reacttraining.com/react-router/web/api/location) are exactly the same variables that come from `react-router`. `defaults` is the default query string state.

`useQS` will return an array. The first item being the query string state. This is an object containing the values stored in the QueryString merged with the `defaults`. The second value is the setter function. This function updates the query string when you call it. It works similar to `setState` as it will accept an object of the changes or a function that is passed the query string state as its only parameter.

Example:

```javascript
const ExampleComponent = props => {
  const [qsState, setQS] = useQS({
    location: props.location,
    history: props.history
    defaults: {
      q: "",
      page: "1"
    }
  });

  return (
    <ChildComponent
      query={qsState.q}
      page={qsState.page}
      update={setQS}
    />
  );
}
```

The state setter function will only `history.push` if there are differences from the previous state and next state after the setter has run. It is important to specify the `defaults` even if the default is an empty string so that defaults are never actually shown in the URL query string.

The state will only ever contain strings or an array of strings as values. The setter will attempt to convert any value to a string using `String()`. Items are treated as an array based on whether the default value was an array.

### withQS

This is a HOC to use `useQS` in a class component. Call it with the component you are wrapping as the first argument and with `defaults` as the second argument. Refer to `useQS` for more information on `defaults`. The resulting component accepts `history` and `location` as props and passes the wrapped component all the props plus `qsState` and `setQS` which is the same as the state object and setter function from `useQS`.

Example:

```javascript
class Search extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    qsState: PropTypes.object.isRequired,
    setQS: PropTypes.func.isRequired
  };

  render()
}

export default withQS(Search, {
  q: "",
  page: "1"
});
```

### singlePromiseCache

This allows you to tie directly into the same cache that `useFetch` and `usePost` use.

- `singlePromiseCache.retrieve()`: Takes `request` and `using` as named parameters (an object). Returns the cache object or `undefined`;
- `singlePromiseCache.store()`: Takes `request` and `using` as named parameters but also `promise` which is the result of `request(using)`.
- `singlePromiseCache.wrapRequest()`: Takes `request` and returns a function that accepts `using` like request would have. When used, this first looks in the cache and returns the cached promise or else calls request, stores the resulting promise and returns it.

## Test

```
yarn test
```
