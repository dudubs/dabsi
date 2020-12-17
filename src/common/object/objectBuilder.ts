import {_buildObject, ObjectBuilder, ValueOrBuilder} from "@dabsi/common/object/buildObject";

export function objectBuilder<T extends object>(
    ...builders: ObjectBuilder<T>[]
): ValueOrBuilder<T> {
    return obj => _buildObject(obj, builders)
}
