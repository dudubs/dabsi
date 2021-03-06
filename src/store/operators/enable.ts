import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { Store } from "@dabsi/store/Store";

const op = "disable";

declare module "@dabsi/store/Store" {
  interface Store<T> extends Record<typeof op, typeof method> {}
}

Store.prototype[op] = method;

function method<T>(this: Store<T>, key: ExtractKeys<T, boolean>): Store<T> {
  return this.update<any, any>(key, () => false);
}
