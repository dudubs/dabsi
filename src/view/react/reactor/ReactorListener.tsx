import { createElement, ReactNode, useMemo } from "react";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { Defined } from "@dabsi/common/typings2/Defined";
import { ReactorContext, useReactor } from "@dabsi/view/react/reactor/hooks";
import {
  Emittable,
  EmittableType,
  Reactor,
} from "@dabsi/view/react/reactor/Reactor";

export function ReactorListener<T extends Emittable<any>>({
  emittable: { id: emittableId },
  children,
  onEvent,
}: {
  emittable: T;
  children: ReactNode;
  onEvent(event: Defined<EmittableType<T>>, emittable: T): void;
}) {
  const reactor = useReactor();

  return createElement(ReactorContext.Provider, {
    value: useMemo(() => {
      return new Reactor((event, emittable) => {
        if (emittable.id === emittableId) {
          onEvent(event, emittable as T);
          return false;
        } else {
          reactor.emit(emittable, event);
        }
      });
    }, [reactor]),
    children,
  });
}
