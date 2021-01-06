import { createElement, ReactElement } from "react";

export type ReactWrapper = (children: ReactElement) => ReactElement;

export function ReactWrapper(
  component: (props: { children: ReactElement }) => ReactElement
): ReactWrapper {
  return children => createElement(component, { children });
}
