/*
    wrap(function, args)(

    )
 */
import {ReactNode} from "react";

export type ReactWrapper<U extends any[] = []> = (children: ReactNode,
                                                  ...args: U) => ReactNode;

export function wrap<U extends any[], T extends ReactWrapper<U>>(
    wrapper: T | undefined,
    ...args: U
): (children: ReactNode) => ReactNode {
    return children => wrapper ? wrapper(children, ...args) : children;
}
