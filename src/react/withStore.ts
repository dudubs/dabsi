import { getNextState, Store } from "../Store";

export function withStore<T>(state: T, callback: (store: Store<T>) => void) {
  callback(
    new Store(true, state, action => {
      state = getNextState(action, state);
    })
  );
  return state;
}
