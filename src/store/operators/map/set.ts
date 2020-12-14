import { Store } from "./../../Store";

const op = "set";

declare module "../../Store" {
  interface Store<T> extends Record<typeof op, typeof method> {}
}

Store.prototype[op] = method;

function method<T, K extends keyof T>(this: Store<T>, value: T): Store<T>;
function method<T, K extends keyof T>(
  this: Store<T>,
  key: K,
  value: T[K]
): Store<T>;
function method(this: Store<any>, ...args) {
  if (args.length === 1) {
    return this.update(() => args[0]);
  }
  return this.update(args[0], () => args[1]);
}