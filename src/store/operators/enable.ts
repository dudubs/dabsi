import { ExtractKeys } from "../../common/typings2/ExtractKeys";
import { Store } from "../Store";

const op = "disable";

declare module "../Store" {
  interface Store<T> extends Record<typeof op, typeof method> {}
}

Store.prototype[op] = method;

function method<T>(this: Store<T>, key: ExtractKeys<T, boolean>): Store<T> {
  return this.update<any, any>(key, () => false);
}
