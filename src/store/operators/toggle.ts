import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { Store } from "@dabsi/store/Store";

const op = "toggle";

declare module "../Store" {
  interface Store<T> extends Record<typeof op, typeof method> {}
}

Store.prototype[op] = method;

function method<T>(this: Store<T>, key: ExtractKeys<T, boolean>): Store<T>;
function method<T>(this: Store<Set<T>>, key: T): Store<Set<T>>;

function method(this: Store<any>, key) {
  return this.update<any, any>(key, state => {
    return !state;
  });
}
