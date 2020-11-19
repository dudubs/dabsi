import { createElement, ReactElement, ReactNode } from "react";
import { EmptyFragment } from "./utils/EmptyFragment";
import { reactNodeToElement } from "./utils/reactNodeToElement";

export function createRendererComponent<P>(
  renderer: (props: P) => ReactNode
): (props: P) => ReactElement {
  return props => reactNodeToElement(renderer(props));
}

export function renderWithHooks<P>(
  key: string,
  props: P,
  renderer: (props: P) => ReactNode
): ReactElement {
  return createElement(WithHooks, { key, props, renderer });
}
export function WithHooks({ renderer, props }) {
  return reactNodeToElement(renderer(props));
}
