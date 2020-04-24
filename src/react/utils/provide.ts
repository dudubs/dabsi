import {Context, createElement, ReactElement, ReactNode} from "react";
import {ContextOrType} from "./ContextOrType";

export function provide<T>(
    context: ContextOrType<T>,
    value: T,
    children: ReactNode
) {
    const {Provider} =
        typeof context === "function" ?
            ContextOrType(context) :
            <Context<T | undefined>>context;
    return createElement(Provider, {
        value,
        children
    })
}

