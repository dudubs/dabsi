import adapt from "@dabsi/store/adapt";
import { GetNextState, Store } from "@dabsi/store/Store";

export const deleteSymbol = Symbol();

const op = "update";

declare module "@dabsi/store/Store" {
  interface Store<T> extends Record<typeof op, typeof method> {}
  namespace Store {
    export { deleteSymbol };
  }
}

Store.prototype[op] = method;
Store.deleteSymbol = deleteSymbol;

function method<T>(this: Store<T>, getNextState: GetNextState<T>): Store<T>;
function method<T, K extends keyof T>(
  this: Store<T>,
  key: K,
  getNextState: GetNextState<T[K]>
): Store<T>;
function method<K, V>(
  this: Store<Map<K, V>>,
  key: K,
  getNextState: GetNextState<V>
): Store<Map<K, V>>;
function method<K, V>(
  this: Store<Map<K, V>>,
  key: K,
  getNextState: GetNextState<V>
): Store<Map<K, V>>;
function method(this: Store<any>, ...args) {
  if (args.length === 1) {
    const [getNextState] = args;
    this.setState(prevState => {
      const nextState = getNextState(prevState);
      if (prevState !== nextState) {
        return nextState;
      }
      return prevState;
    });
    return this;
  }
  const [key, getNextState] = args;

  return this.update(state => {
    const prevState = adapt("getKey", state, key);
    const nextState = getNextState(prevState);
    if (prevState !== nextState) {
      state = adapt("clone", state);
      if (nextState === deleteSymbol) {
        return adapt("handleDelete", state, [key]);
      }
      state = adapt("setKey", state, key, nextState);
    }
    return state;
  });
}
