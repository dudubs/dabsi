import { useMemo, useState } from "react";
import { Store } from "../store";
import { Factory } from "./../common/patterns/Factory";

export function useStore<T>(stateFactory: Factory<T>): Store<T> {
  const [state] = useState(() => {
    return { current: Factory(stateFactory) };
  });
  const [_, setCounter] = useState(0);

  return useMemo(
    () =>
      new Store<T>(
        () => state.current,
        getNextState => {
          let nextState = getNextState(state.current);
          if ((nextState as any) === Store.deleteSymbol) {
            nextState = Factory(stateFactory);
          }
          if (nextState === state.current) return;
          state.current = nextState;
          setCounter(count => count + 1);
        }
      ),
    []
  );
}
