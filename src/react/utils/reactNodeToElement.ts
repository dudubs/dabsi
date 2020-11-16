import {
  createElement,
  Fragment,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react";

export function reactNodeToElement(obj: ReactNode): ReactElement {
  if (isValidElement(obj)) {
    return obj;
  }
  return createElement(Fragment, null, obj);
}
