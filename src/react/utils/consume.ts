import {ReactNode} from "react";
import {defined} from "../../common/object/defined";
import {ContextOrType} from "./ContextOrType";
import {tryToConsume} from "./tryToConsume";

export function consume<T>(context: ContextOrType<T>, callback: (value: NonNullable<T>) => ReactNode) {
    return tryToConsume(context, value => callback(defined(value, () =>
        `No ${context['displayName'] ?? context['displayName']}`)))
}
