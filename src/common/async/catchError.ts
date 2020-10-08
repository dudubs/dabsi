import { isPromiseLike } from "./isPromiseLike";

export function catchError<T>(
  filterOrType: Function | ((error: any) => boolean),
  resultOnError: T
): {
  <U>(callback: () => Promise<U>): Promise<T | U>;
  <U>(callback: () => U): T | U;
};

export function catchError(filterOrType, resultOnError) {
  const filter = filterOrType.prototype
    ? (obj) => obj instanceof filterOrType
    : filterOrType;

  return (callback) => {
    let result;
    try {
      result = callback();
    } catch (error) {
      if (filter(error)) {
        return resultOnError;
      }
      throw error;
    }
    if (isPromiseLike(result)) {
      return Promise.resolve(result).catch((error) => {
        if (filter(error)) {
          return resultOnError;
        }
        throw error;
      });
    } else {
      return result;
    }
  };
}
