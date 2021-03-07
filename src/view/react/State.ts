import { createContext, useContext } from "react";
import { touchObject } from "@dabsi/common/object/touchObject";

export class State<T> {
  protected listeners = new Set<(prevValue: T, nextValue: T) => void>();

  listen(callback: (prevValue: T, nextValue: T) => void): () => void {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  constructor(public value: T) {}

  set(nextValue: T) {
    if (this.value === nextValue) {
      return;
    }
    const prevValue = this.value;
    this.value = nextValue;
    this.listeners.forEach(callback => {
      callback(prevValue, nextValue);
    });
  }
}

const globalStateContext = createContext(new Map());

export function useGlobalState(stateClass) {
  const globalStateMap = useContext(globalStateContext);
  return touchObject(globalStateMap, stateClass, () => new stateClass());
}
