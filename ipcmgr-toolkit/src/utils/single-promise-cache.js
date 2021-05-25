import { isEqual } from "lodash";

// Cache only 1 value per request
const cache = new Map();

export const retrieve = ({ request, using }) => {
  const fromCache = cache.get(request);
  return fromCache && isEqual(fromCache.using, using) ? fromCache : undefined;
};

export const store = ({ promise, request, using }) => {
  cache.set(request, { using, promise });
  promise
    .then(result => {
      const fromCache = cache.get(request);
      if (fromCache.promise === promise) {
        cache.set(request, { using, result });
      }
    })
    .catch(error => {
      const fromCache = cache.get(request);
      if (fromCache.promise === promise) {
        cache.set(request, { using, error });
      }
    });
};

export const wrapRequest = request => using => {
  const { result, error, promise: cachedPromise } =
    retrieve({ request, using }) || {};
  if (result) return Promise.resolve(result);
  if (error) return Promise.reject(error);
  if (cachedPromise) return cachedPromise;
  const promise = request(using);
  store({ promise, request, using });
  return promise;
};

export default {
  retrieve,
  store,
  wrapRequest
};
