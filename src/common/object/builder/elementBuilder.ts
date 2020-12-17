import {ReactElement} from "react";
import {_buildElement} from "@dabsi/common/object/buildElement";
import {ObjectBuilder, ValueOrBuilder} from "@dabsi/common/object/buildObject";

export function elementBuilder<P>(
    ...builders: ObjectBuilder<ReactElement<P, any>>[]
): ValueOrBuilder<ReactElement<P, any>> {
    return (element): any => _buildElement(element, builders)
}
