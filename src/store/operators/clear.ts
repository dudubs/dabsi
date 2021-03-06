import adapt from "@dabsi/store/adapt";
import { Store } from "@dabsi/store/Store";

const op = "clear" as const;

function method<T extends any[] | Set<any> | Map<any, any> | Record<any, any>>(
  this: Store<T>
): Store<T> {
  return this.update(state => adapt("empty", state));
}

declare module "@dabsi/store/Store" {
  interface Store<T> extends Record<typeof op, typeof method> {}
}

Store.prototype[op] = method;
