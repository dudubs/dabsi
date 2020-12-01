import { useEffect, useState } from "react";
import { useReactor } from "./hooks";
import { Emittable, EmittableType, ReactorEvent } from "./Reactor";

export function useEmitted<T extends Emittable<any>>(
  emittable: T,
  callback?: (event: EmittableType<T>, emittable: T) => void
): T {
  const reactor = useReactor();
  const [state, setState] = useState(
    () => reactor.getLast(emittable) ?? emittable.init!
  );
  useEffect(() => {
    return reactor.listen(emittable, event => {
      if (event != state) {
        setState(event);
        callback?.(event, emittable);
      }
    });
  }, [reactor]);

  return state;
}
