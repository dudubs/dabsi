import { createElement } from "react";
import { MergeProps, mergeProps } from "./mergeProps";

export function mergeElement<P>(
  element: React.ReactElement<P> | undefined,
  props: MergeProps<P & { key; ref }>
) {
  return (
    element &&
    createElement(element.type, mergeProps(element.props, <any>props))
  );
}
