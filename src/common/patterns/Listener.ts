import { Fn } from "@dabsi/common/typings2/Fn";

export type Listener<T extends any[] = []> = {
  invoke(...args: T): void;
  (callback: (...args: T) => void): () => void;
};
export function Listener<T extends any[] = []>(): Listener<T> {
  const callbacks = new Set<Fn>();
  listener.invoke = (...args) => {
    for (const callback of callbacks) {
      callback(...args);
    }
  };

  return listener;

  function listener(callback) {
    callbacks.add(callback);
    return () => {
      callbacks.delete(callback);
    };
  }
}
