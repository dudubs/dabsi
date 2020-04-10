import {createElement, Fragment, isValidElement, ReactElement, ReactNode} from "react";

export function toReactElement(children: ReactNode): ReactElement {
    if (isValidElement(children))
        return children;
    return createElement(Fragment, null, children)
}

