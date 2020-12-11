import adapt from "../../adapt";
import { Store } from "../../Store";

const op = "add" as const;

declare module "../../Store" {
  interface Store<T> extends Record<typeof op, typeof method> {}
}

Store.prototype[op] = method;

function method<T>(this: Store<Array<T>>, ...items: T[]): Store<Array<T>>;
function method<T>(this: Store<Set<T>>, ...items: T[]): Store<Set<T>>;
function method(this: Store<any>, ...items): Store<any> {
  return this.update(state => {
    items = items.filter(item => !adapt("hasItem", state, item));
    if (items.length) {
      state = adapt("clone", state);
      state = adapt("addItems", state, items);
    }
    return state;
  });
}
