import adapt from "../../adapt";
import { Store } from "../../Store";
import { deleteSymbol } from "./update";

export function _delete(): Store<undefined>;
export function _delete<K, V>(
  this: Store<Map<K, V>>,
  ...key: K[]
): Store<Map<K, V>>;
export function _delete<K extends PropertyKey, V>(
  this: Store<Record<K, V>>,
  ...key: K[]
): Store<Record<K, V>>;
export function _delete<T>(this: Store<T[]>, ...key: number[]): Store<T[]>;
export function _delete(this: Store<any>, ...keys) {
  if (keys.length === 0) return this.update(() => deleteSymbol);
  return this.update(state => {
    keys = keys.filter(key => adapt("hasKey", state, key));
    if (keys.length) {
      state = adapt("clone", state);
      state = adapt("deleteKeys", state, keys);
    }
    return state;
  });
}

declare module "../../Store" {
  interface Store<T> {
    delete: typeof _delete;
  }
}
Store.prototype.delete = _delete;
