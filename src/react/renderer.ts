import {ComponentType, createElement, ReactElement} from "react";
import {PartialKeys} from "../common/typings";

export type Renderer<P> = (props: P) => ReactElement;

export function renderer<P, K extends keyof P>(
    component: ComponentType<P>,
    defaultProps?: Pick<P, K>
): Renderer<PartialKeys<P, K>>
export function renderer<P, K extends keyof P>(
    component: ComponentType<P>,
    defaultProps?: Pick<P, K>
): Renderer<PartialKeys<P, K>>
export function renderer(component, defaultProps?) {
    return props => createElement(component, !defaultProps ? props : {
        ...defaultProps,
        ...props
    })
}
