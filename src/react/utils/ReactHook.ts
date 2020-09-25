import { createElement, ReactElement } from "react";

export function ReactHook(props: {
  children: () => ReactElement;
}): ReactElement;
export function ReactHook(children: () => ReactElement): ReactElement;
export function ReactHook(propsOrChildren): any {
  if (typeof propsOrChildren === "function")
    return createElement(ReactHook, null, propsOrChildren);
  return propsOrChildren.children();
}
