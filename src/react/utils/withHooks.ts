import {createElement, ReactElement, ReactNode} from "react";
import {toReactElement} from "./toReactElement";

export function withHooks<P>(
    renderer: (props: P) => ReactNode
): (props: P) => ReactElement {
    const component = props => toReactElement(renderer(props));
    return props => createElement(component,props)
}
