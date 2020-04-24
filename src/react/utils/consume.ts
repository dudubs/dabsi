import {Context, createElement, ReactElement, ReactNode} from "react";
import {Type} from "../../common/typings";
import {ContextOrType} from "./ContextOrType";

export function consume<T>(context: Type<T>,
                           callback: (value: T | undefined) => ReactNode): ReactElement
export function consume<T>(context: Context<T>,
                           callback: (value: T) => ReactNode): ReactElement
export function consume<T>(context: ContextOrType<T>,
                           callback: (value: T) => ReactNode): ReactElement {
    return createElement(ContextOrType(context).Consumer, {
        children: callback
    })
}
