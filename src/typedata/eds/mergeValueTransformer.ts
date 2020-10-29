import {ValueTransformer} from "typeorm";

export function mergeValueTransformer(transformers: ValueTransformer[]): ValueTransformer {
    return {
        from(value) {
            for (let transformer of transformers) {
                value = transformer.from(value)
            }
            return value;
        },
        to(value) {
            for (let transformer of transformers) {
                value = transformer.to(value)
            }
            return value;
        }
    }
}
