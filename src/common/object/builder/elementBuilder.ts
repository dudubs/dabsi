import {ReactElement} from "react";
import {_buildElement} from "../buildElement";
import {ObjectBuilder, ValueOrBuilder} from "../buildObject";

export function elementBuilder<P>(
    ...builders: ObjectBuilder<ReactElement<P, any>>[]
): ValueOrBuilder<ReactElement<P, any>> {
    return (element): any => _buildElement(element, builders)
}
