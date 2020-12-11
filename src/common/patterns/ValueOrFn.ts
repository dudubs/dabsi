export type ValueOrFn<T> = T | (() => T);
export function ValueOrFn<T>(valueOrFn: ValueOrFn<T>): T {
  if (typeof valueOrFn === "function") {
    return (valueOrFn as () => T)();
  }
  return valueOrFn;
}
