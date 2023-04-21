/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import { Middleware, SWRHook } from 'swr';

export const logOnBrowser = (message: string) => {
  if (process.env.NODE_ENV === 'production') return;
  console.log(message);
};

export const swrLogger: Middleware = (useSWRNext: SWRHook) => (key, fetcher, config) => {
  if (!fetcher) {
    return useSWRNext(key, fetcher, config);
  }

  const extendedFetcher = (...args: any[]) => {
    logOnBrowser(`SWR Request: ${key}`);
    return fetcher(...args);
  };
  return useSWRNext(key, extendedFetcher, config);
};
