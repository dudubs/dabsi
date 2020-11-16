import { createElement, useMemo } from "react";
import { ReactorContext, Reactor, useReactor } from "./Reactor";

export function ReactorProvider({ children, onEvent }) {
  const prevReactor = useReactor();

  const nextReactor = useMemo(() => new Reactor(onEvent), [
    prevReactor,
    typeof onEvent,
  ]);

  return createElement(ReactorContext.Provider, {
    value: nextReactor,
    children,
  });
}
