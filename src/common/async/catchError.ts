import { Constructor } from "../typings2/Constructor";
import { isPromiseLike } from "./isPromiseLike";

export default <
  {
    <E, T>(errorType: Constructor<E>, callback: () => Promise<T>): Promise<
      [T, undefined] | [undefined, E]
    >;
    <E, T>(errorType: Constructor<E>, callback: () => T):
      | [T, undefined]
      | [undefined, E];
  }
>function (errorType, callback) {
  let result;
  try {
    result = callback();
    if (!isPromiseLike(result)) {
      return [result, undefined];
    }
  } catch (error) {
    if (error instanceof errorType) {
      return [undefined, error];
    }
    throw error;
  }
  return Promise.resolve(result)
    .then(result => [result, undefined])
    .catch(error => {
      if (error instanceof errorType) {
        return [undefined, error];
      }
      throw error;
    });
};
