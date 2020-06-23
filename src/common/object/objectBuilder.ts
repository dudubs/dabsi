import {_buildObject, ObjectBuilder, ValueOrBuilder} from "./buildObject";

export function objectBuilder<T extends object>(
    ...builders: ObjectBuilder<T>[]
): ValueOrBuilder<T> {
    return obj => _buildObject(obj, builders)
}
