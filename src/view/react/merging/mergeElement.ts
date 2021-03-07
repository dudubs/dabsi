import { createElement } from "react";
import { MergeProps, mergeProps } from "./mergeProps";

export function mergeElement<P>(
  element: React.ReactElement<P>,
  props: MergeProps<P & { key; ref }>
) {
  return createElement(element.type, mergeProps(element.props, <any>props));
}
