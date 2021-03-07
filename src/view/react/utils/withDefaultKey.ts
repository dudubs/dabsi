import { cloneElement, createElement, Fragment, ReactElement } from "react";

export function withDefaultKey(key, element: ReactElement) {
  if (element.key) {
    return element;
  }

  return cloneElement(element, { ...element.props, key });
}
