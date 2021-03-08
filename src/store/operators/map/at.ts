import adapt from "@dabsi/store/adapt";
import { Store } from "@dabsi/store/Store";

declare module "@dabsi/store/Store" {
  interface Store<T> {
    at: {
      <T, K extends keyof T>(this: Store<T>, key: K): Store<T[K]>;
      <T, K extends keyof T>(
        this: Store<T>,
        key: K,
        callback: (store: Store<T[K]>) => void
      ): Store<T>;
      <K, V>(
        this: Store<Map<K, V>>,
        key: K,
        callback: (store: Store<V>) => void
      ): Store<Map<K, V>>;
      <K, V>(this: Store<Map<K, V>>, key: K): Store<V>;
    };
  }
}

Store.prototype.at = function (key, callback?) {
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
};
