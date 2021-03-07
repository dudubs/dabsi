import { useEffect } from "react";
import { Store } from "@dabsi/store";

export function useStoreEffect<T>(
  store: Store<T>,
  callback: (state: T) => void
) {
  useEffect(() => {
    const { setState } = store;
    store.setState = function (getNextState) {
      setState.call(store, prevState => {
        const nextState = getNextState(prevState);
        if (nextState !== prevState) {
          callback(nextState);
        }
        return nextState;
      });
    };
  }, [store]);
}
