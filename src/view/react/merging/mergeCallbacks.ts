export function mergeCallbacks(prevCallback: Function, nextCallback: Function) {
  return function (this: any) {
    const prevResult = prevCallback.apply(this, arguments);
    return nextCallback.apply(this, arguments) ?? prevResult;
  };
}
