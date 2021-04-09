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
