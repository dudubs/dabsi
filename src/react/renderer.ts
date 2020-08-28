import {ComponentType, createElement, ReactElement} from "react";
import {PartialKeys} from "../common/typings";

export type Renderer<P, U extends any[] = []> = (props: P & { key? }, ...args: U) => ReactElement;

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


