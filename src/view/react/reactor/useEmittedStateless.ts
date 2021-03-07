import { Defined } from "@dabsi/common/typings2/Defined";
import { useReactor } from "@dabsi/view/react/reactor/hooks";
import { Emittable, EmittableType } from "@dabsi/view/react/reactor/Reactor";
import { useEffect } from "react";

export function useEmittedStateless<T extends Emittable<any>>(
  emittable: T,
  callback?: (event: Defined<EmittableType<T>>, emittable: T) => void,
  deps: any[] = []
): void {
  const reactor = useReactor();
  useEffect(() => {
    return reactor.listen(emittable, event => {
      if (event !== undefined) callback?.(event, emittable);
    });
  }, [reactor, ...deps]);
}
