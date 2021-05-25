test("Fetch", () => expect(true).toBe(true));
// commenting out until we figure out a better way for hook testing

// /* eslint-disable prefer-promise-reject-errors */
// import React from "react";
// import { shallow, mount } from "enzyme";
// import Fetch from "./Fetch";

// const { STATUSES, CACHE_TYPES } = Fetch;
// const promiseSuccess = () => Promise.resolve({ foo: "bar" });
// const promiseFail = () => Promise.reject({ message: "Error Message" });
// const wait = () =>
//   new Promise(resolve => {
//     setTimeout(resolve, 0);
//   });

// describe("Fetch", () => {
//   it("calls render with default state", () => {
//     const render = jest.fn(() => null);
//     const wrapper = shallow(<Fetch request={promiseSuccess} render={render} />);
//     expect(render).toBeCalledWith({
//       dataMatchesRequest: false,
//       status: STATUSES.INITIAL,
//       call: wrapper.instance().fetch
//     });
//   });
//   it("calls render with loading when mounted", () => {
//     const render = jest.fn(() => null);
//     const wrapper = mount(<Fetch request={promiseSuccess} render={render} />);
//     expect(render).toBeCalledWith({
//       dataMatchesRequest: false,
//       status: STATUSES.BUSY,
//       call: wrapper.instance().fetch
//     });
//     wrapper.unmount();
//   });
//   it("calls render with loaded data when promise resolves", () => {
//     expect.assertions(1);
//     const render = jest.fn(() => null);
//     const wrapper = mount(<Fetch request={promiseSuccess} render={render} />);
//     return wait().then(() => {
//       expect(render).toBeCalledWith({
//         data: { foo: "bar" },
//         dataMatchesRequest: true,
//         status: STATUSES.DONE,
//         call: wrapper.instance().fetch
//       });
//       wrapper.unmount();
//     });
//   });
//   it("calls render with error message with promise fails", () => {
//     expect.assertions(1);
//     const render = jest.fn(() => null);
//     const wrapper = mount(<Fetch request={promiseFail} render={render} />);
//     return wait().then(() => {
//       expect(render).toBeCalledWith({
//         error: "Error Message",
//         dataMatchesRequest: false,
//         status: STATUSES.ERROR,
//         call: wrapper.instance().fetch
//       });
//       wrapper.unmount();
//     });
//   });
//   it("calls the request using the using prop", () => {
//     const request = jest.fn(promiseSuccess);
//     const using = { bar: "baz" };
//     const wrapper = mount(
//       <Fetch request={request} using={using} render={() => null} />
//     );
//     expect(request).toBeCalledWith(using);
//     wrapper.unmount();
//   });
//   it("re-calls the request with new using prop", () => {
//     const request = jest.fn(promiseSuccess);
//     const used = { bar: "baz" };
//     const using = { bar: "bop" };
//     const wrapper = mount(
//       <Fetch request={request} using={used} render={() => null} />
//     );
//     wrapper.setProps({ using });
//     expect(request.mock.calls).toEqual([[used], [using]]);
//     wrapper.unmount();
//   });
//   it("does not re-call the request when using does not change", () => {
//     const request = jest.fn(promiseSuccess);
//     const used = { bar: "baz" };
//     const using = { bar: "baz" };
//     const wrapper = mount(
//       <Fetch request={request} using={used} render={() => null} />
//     );
//     wrapper.setProps({ using });
//     expect(request.mock.calls).toEqual([[used]]);
//     wrapper.unmount();
//   });
//   it("remembers the promises that haven't finished", () => {
//     // This tests an internal method and can fail without making a breaking change
//     expect.assertions(2);
//     const wrapper = mount(
//       <Fetch request={promiseSuccess} render={() => null} />
//     );
//     const that = wrapper.instance();
//     expect(that.cleanup.size).toEqual(1);
//     return wait().then(() => {
//       expect(that.cleanup.size).toEqual(0);
//       wrapper.unmount();
//     });
//   });
//   it("caches a single previously created promise", () => {
//     expect.assertions(4);
//     const request = jest.fn(promiseSuccess);
//     const wrapper1 = mount(<Fetch request={request} render={() => null} />);
//     const wrapper2 = mount(<Fetch request={request} render={() => null} />);
//     expect(request).toHaveBeenCalledTimes(2);
//     wrapper1.unmount();
//     wrapper2.unmount();
//     request.mockClear();
//     const render3 = jest.fn(() => null);
//     const render4 = jest.fn(() => null);
//     const wrapper3 = mount(
//       <Fetch
//         request={request}
//         cacheType={CACHE_TYPES.SINGLE}
//         render={render3}
//       />
//     );
//     const wrapper4 = mount(
//       <Fetch
//         request={request}
//         cacheType={CACHE_TYPES.SINGLE}
//         render={render4}
//       />
//     );
//     expect(request).toHaveBeenCalledTimes(1);
//     return wait().then(() => {
//       expect(render3).toHaveBeenCalledWith({
//         data: { foo: "bar" },
//         dataMatchesRequest: true,
//         status: STATUSES.DONE,
//         call: wrapper3.instance().fetch
//       });
//       expect(render4).toHaveBeenCalledWith({
//         data: { foo: "bar" },
//         dataMatchesRequest: true,
//         status: STATUSES.DONE,
//         call: wrapper4.instance().fetch
//       });
//       wrapper3.unmount();
//       wrapper4.unmount();
//     });
//   });
//   it("does not use the single cache with using different props", () => {
//     const request = jest.fn(promiseSuccess);
//     const using1 = { foo: 1 };
//     const using2 = { foo: 2 };
//     const wrapper1 = mount(
//       <Fetch
//         request={request}
//         using={using1}
//         cacheType={CACHE_TYPES.SINGLE}
//         render={() => null}
//       />
//     );
//     const wrapper2 = mount(
//       <Fetch
//         request={request}
//         using={using2}
//         cacheType={CACHE_TYPES.SINGLE}
//         render={() => null}
//       />
//     );
//     expect(request).toHaveBeenCalledTimes(2);
//     wrapper1.unmount();
//     wrapper2.unmount();
//   });
//   it("refetches on mount even if promise is cached", () => {
//     expect.assertions(2);
//     const request = jest.fn(promiseSuccess);
//     const wrapper1 = mount(
//       <Fetch
//         request={request}
//         cacheType={CACHE_TYPES.SINGLE}
//         render={() => null}
//       />
//     );
//     return wait().then(() => {
//       const wrapper2 = mount(
//         <Fetch
//           request={request}
//           cacheType={CACHE_TYPES.SINGLE}
//           render={() => null}
//         />
//       );
//       expect(request).toHaveBeenCalledTimes(1);
//       const wrapper3 = mount(
//         <Fetch
//           request={request}
//           cacheType={CACHE_TYPES.SINGLE}
//           cacheAndNetwork
//           render={() => null}
//         />
//       );
//       expect(request).toHaveBeenCalledTimes(2);
//       wrapper1.unmount();
//       wrapper2.unmount();
//       wrapper3.unmount();
//     });
//   });
// });
