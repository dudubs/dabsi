import adapt from "@dabsi/store/adapt";
import { Store } from "@dabsi/store/Store";

const op: "at" = "at";

declare module "../../Store" {
  interface Store<T> extends Record<typeof op, typeof method> {}
}

Store.prototype[op] = method;

function method<T, K extends keyof T>(this: Store<T>, key: K): Store<T[K]>;
function method<T, K extends keyof T>(
  this: Store<T>,
  key: K,
  callback: (store: Store<T[K]>) => void
): Store<T>;
function method<K, V>(
  this: Store<Map<K, V>>,
  key: K,
  callback: (store: Store<V>) => void
): Store<Map<K, V>>;
function method<K, V>(this: Store<Map<K, V>>, key: K): Store<V>;
function method(this: Store<any>, key, callback?) {
  const store = new Store(
    () => adapt("getKey", this.state, key),
    getNextState => {
      this.update(key, getNextState);
    }
  );

  if (callback) {
    callback(store);
    return this;
  }
  return store;
}
