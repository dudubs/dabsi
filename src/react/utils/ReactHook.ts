import {
  Context,
  createElement,
  Fragment,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react";
import { reactNodeToElement } from "@dabsi/react/utils/reactNodeToElement";

export type ReactWrapper = (children: ReactElement) => ReactElement;
let wrappers: ReactWrapper[] | undefined = undefined;

export function useWrapper(wrapper: ReactWrapper) {
  (wrappers || (wrappers = [])).push(wrapper);
}

export function useProvider<T>(context: Context<T>, value: T) {
  useWrapper(children => createElement(context.Provider, { value, children }));
}
export function ReactHook(props: { children: () => ReactNode }): ReactElement;
export function ReactHook(children: () => ReactElement): ReactElement;
export function ReactHook(propsOrChildren): any {
  if (typeof propsOrChildren === "function")
    return createElement(ReactHook, null, propsOrChildren);

  return propsOrChildren.children();
}

ReactHook.Component = function <C extends (props?: object) => ReactElement>(
  component: C
): C {
  return <any>(props => {
    wrappers = undefined;
    let children = component(props);
    // @ts-ignore
    wrappers?.forEach(wrapper => {
      children = wrapper(children);
    });

    return reactNodeToElement(children);
  });
};
