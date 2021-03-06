import adapt from "@dabsi/store/adapt";
import { Store } from "@dabsi/store/Store";

const op = "remove" as const;

declare module "@dabsi/store/Store" {
  interface Store<T> extends Record<typeof op, typeof method> {}
}

Store.prototype[op] = method;

function method<T>(this: Store<Array<T>>, ...items: T[]): Store<Array<T>>;
function method<T>(this: Store<Set<T>>, ...items: T[]): Store<Set<T>>;
function method<K, V>(this: Store<Map<K, V>>, ...items: K[]): Store<Map<K, V>>;
function method<K extends PropertyKey, V>(
  this: Store<Record<K, V>>,
  ...items: K[]
): Store<Record<K, V>>;
function method(this: Store<any>, ...items): Store<any> {
  return this.update(state => {
    items = items.filter(item => adapt("hasItem", state, item));
    if (items.length) {
      state = adapt("clone", state);
      state = adapt("removeItems", state, items);
    }
    return state;
  });
}
