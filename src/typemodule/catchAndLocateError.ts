import { Awaitable } from "@dabsi/common/typings2/Async";
import { locateError } from "./locateError";

export function catchAndLocateError<T>(
  callback: () => T,
  getLocation: () => string
): T {
  try {
    return callback();
  } catch (error) {
    throw locateError(error, getLocation());
  }
}

catchAndLocateError.async = async function <T>(
  callback: () => Awaitable<T>,
  getLocation: () => string
): Promise<T> {
  try {
    return callback();
  } catch (error) {
    throw locateError(error, getLocation());
  }
};

export default catchAndLocateError;
