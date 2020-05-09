import {Context, createElement, ReactElement, ReactNode} from "react";
import {pipe} from "rxjs";
import {ContextOrType} from "./ContextOrType";

export function provide<T>(
    context: ContextOrType<T>,
    value: T
): (children: ReactNode) => ReactElement
export function provide<T>(
    context: ContextOrType<T>,
    value: T,
    children: ReactNode
): ReactElement
export function provide(context, value, ...args): any {

    if (args.length === 1) {
        const [children] = args;

        const {Provider} =
            typeof context === "function" ?
                ContextOrType(context) :
               context;
        return createElement(Provider, {
            value,
            children
        })
    } else {
        return children => provide(context, value, children)
    }
}
