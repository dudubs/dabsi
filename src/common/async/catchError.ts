import { Constructor } from "@dabsi/common/typings2/Constructor";
import { isPromiseLike } from "@dabsi/common/async/isPromiseLike";

export default <
  {
    <E, T, U>(
      errorType: Constructor<E>,
      callback: () => Promise<T>,
      errorCallback: (error: E) => U
    ): Promise<T | U>;
    <E, T, U>(
      errorType: Constructor<E>,
      callback: () => T,
      errorCallback: (error: E) => U
    ): T | U;
  }
>function (errorType, callback, errorCallback) {
  let result;
  try {
    result = callback();
    if (!isPromiseLike(result)) {
      return result;
    }
  } catch (error) {
    if (error instanceof errorType) {
      return errorCallback(error);
    }
    throw error;
  }
  return Promise.resolve(result).catch(error => {
    if (error instanceof errorType) {
      return errorCallback(error);
    }
    throw error;
  });
};
