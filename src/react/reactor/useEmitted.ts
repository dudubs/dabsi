import { useReactor } from "@dabsi/react/reactor/hooks";
import { Emittable, EmittableType } from "@dabsi/react/reactor/Reactor";
import { useEffect, useState } from "react";

export function useEmitted<T extends Emittable<any>>(
  emittable: T,
  callback?: (event: EmittableType<T>, emittable: T) => void
): EmittableType<T> {
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
