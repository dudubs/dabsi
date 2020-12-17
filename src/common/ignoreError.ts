import { Awaitable } from "@dabsi/common/typings2/Async";
import { Type } from "@dabsi/common/typings2/Type";

export const IgnoredError = Symbol();

export function ignoreError<T, E>(
  errorType: Type<T>,
  callback: () => T
): T | typeof IgnoredError {
  try {
    return callback();
  } catch (error) {
    if (error instanceof errorType) {
      return IgnoredError;
    }
    throw error;
  }
}

ignoreError.async = async function <T, E>(
  errorType: Type<T>,
  callback: () => Awaitable<T>
): Promise<T | typeof IgnoredError> {
  try {
    return await callback();
  } catch (error) {
    if (error instanceof errorType) {
      return IgnoredError;
    }
    throw error;
  }
};
