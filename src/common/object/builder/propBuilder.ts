import {Builder} from "@dabsi/common/object/buildObject";

export function propBuilder<T>(
    ...propBuilders: Builder<T>[]
): Builder<T> {
    return value => {
        for (let propBuilder of propBuilders) {
            value = propBuilder(value);
        }
        return value
    }
}
