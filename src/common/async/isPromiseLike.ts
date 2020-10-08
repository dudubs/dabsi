export function isPromiseLike<T>(obj): obj is PromiseLike<T> {
  return typeof obj?.["then"] === "function";
}
