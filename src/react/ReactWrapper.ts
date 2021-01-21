import { createElement, ReactElement } from "react";

export type ReactWrapper = (children: ReactElement) => ReactElement;

function ReactWrapperComponent({
  wrapper,
  children,
}: {
  wrapper: ReactWrapper;
  children: ReactElement;
}) {
  return wrapper(children);
}
export function ReactWrapper(wrapper: ReactWrapper): ReactWrapper {
  return children =>
    createElement(ReactWrapperComponent, { wrapper, children });
}

export namespace ReactWrapper {
  export function wrapAll(
    element: ReactElement,
    wrappers: ReactWrapper[]
  ): ReactElement {
    for (const wrapper of wrappers) {
      element = wrapper(element);
    }
    return element;
  }
}
