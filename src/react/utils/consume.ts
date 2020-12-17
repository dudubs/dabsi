import {ReactNode} from "react";
import {defined} from "@dabsi/common/object/defined";
import {ContextOrType} from "@dabsi/react/utils/ContextOrType";
import {tryToConsume} from "@dabsi/react/utils/tryToConsume";

export function consume<T>(context: ContextOrType<T>, callback: (value: NonNullable<T>) => ReactNode) {
    return tryToConsume(context, value => callback(defined(value, () =>
        `No ${context['displayName'] ?? context['displayName']}`)))
}
