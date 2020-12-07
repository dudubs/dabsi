import { useState } from "react";
import { isConstructor } from "../common/object/isConstructor";
import { getNextState, Store } from "../Store";

export function useStore2<T>(
  create: (() => T) | (new () => T),
  init?: (store: Store<T>) => void
): Store<T> {
  let state, setState;

  [state, setState] = useState(() => {
    let state: T = isConstructor(create) ? new create() : create();
    init &&
      init(
        new Store<T>(true, state, action => {
          state = getNextState(action, state);
        })
      );
    return state;
  });
  return new Store(false, state, setState);
}

export function useStore<T>(
  propsOrStore: { store?: Store<T> } | Store<T> | undefined,
  create: (() => T) | (new () => T),
  init?: (store: Store<T>) => void
): Store<T> {
  let state, setState;

  const store: Store<T> | undefined =
    (propsOrStore as any).store ||
    ((propsOrStore as any).setState ? propsOrStore : undefined);

  if (store?.constructor === Store) {
    return store;
  } else {
    [state, setState] = useState(() => {
      let state: T = isConstructor(create) ? new create() : create();
      init &&
        init(
          new Store<T>(true, state, action => {
            state = getNextState(action, state);
          })
        );
      return state;
    });
    return new Store(false, state, setState);
  }
}
