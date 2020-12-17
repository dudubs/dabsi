import {createElement, ReactElement, ReactNode} from "react";
import {ContextOrType} from "@dabsi/react/utils/ContextOrType";

export function tryToConsume<T>(context: ContextOrType<T>,
                                callback: (value: T) => ReactNode): ReactElement {
    return createElement(ContextOrType(context).Consumer, {
        children: callback
    })
}

