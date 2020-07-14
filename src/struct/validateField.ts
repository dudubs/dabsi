import {WeakMapFactory} from "../common/map/mapFactory";
import {SymbolMap} from "../common/map/SymbolMap";
import {Validation} from "../validators";
import {Field} from "./Field";
import {getFieldDesignOrForwardType} from "./Forward";
import {Nullable} from "./Nullable";

export const fieldTypeValidators =
    SymbolMap<Function, (field: Field, value: any) => Validation>({
        bind: true,
        configurable: true,
        enumerable: true
    })

for (const [type, typeName] of <[Function, string][]>[
    [String, "string"],
    [Number, "number"],
    [Boolean, "boolean"]]) {

    fieldTypeValidators.set(type, function (field, value) {
        if (typeof value !== typeName)
            return () => `Expected to ${typeName}, got: ${typeof value}.`

    })
}


export const getFieldValidators =
    WeakMapFactory((field: Field) => Array<(value: any) => Validation>());

export function validateField(field: Field, value: any): Validation {

    if (value === null) {
        if (!Nullable.get(value))
            return () => `Is non-nullable.`;
        return;
    }

    const type = getFieldDesignOrForwardType(field);
    const validation = fieldTypeValidators.get(type)?.(field, value);
    if (validation)
        return validation;

    for (let validator of (getFieldValidators.map.get(field) || [])) {
        const validation = validator(value);
        if (validation)
            return validation
    }
}

