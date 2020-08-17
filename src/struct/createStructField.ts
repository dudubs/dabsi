import {SymbolMap} from "../common/map/SymbolMap";
import {assertValidation} from "../validators/assertValidation";
import {ValidationError} from "../validators/ValidationError";
import {createStruct} from "./createStruct";
import {Default} from "./Default";
import {Field} from "./Field";
import {getFieldDesignOrForwardType, getFieldForwardType} from "./Forward";
import {hasFields} from "./hasFields";
import {Nullable} from "./Nullable";
import {Optional} from "./Optional";
import {validateField} from "./validateField";


export const fieldTypeFactories =
    SymbolMap<Function, (field: Field, value: any) => any>({
        bind: true,
        enumerable: false,
        configurable: true
    });


fieldTypeFactories.set(Function, function (field, value) {
    if (hasFields(this)) {
        return createStruct(this, value);
    }
});

fieldTypeFactories.set(Array, function (field, value: any[]) {
    const itemType = getFieldForwardType(field);

    if (!itemType)
        return value;
    if (hasFields(itemType)) {
        return value.map(item => createStruct(itemType, item))
    }
    return value
});


export function createStructField(
    field: Field, value: any,
) {
    const type = getFieldDesignOrForwardType(field);
    const isStruct = type && hasFields(type);

    if (value === null) {

        if (!Optional.get(field) && !Nullable.get(field)) {
            throw new ValidationError(() => `Is null`)
        }
        return null;
    }

    if (value === undefined) {
        const defaultValue = Default.get(field)?.(field);
        if (defaultValue !== undefined) {
            return assertValue(defaultValue)
        }
        if (isStruct) {
            if (!Optional.get(field))
                return;
            return createStruct(type)
        } else {
            if (!Optional.get(field)) {
                throw new ValidationError(() => `Is required`)
            }
        }
        return;
    }

    if (isStruct) {
        return createStruct(type, value);
    }

    const typeValue = fieldTypeFactories.get(type)?.(field, value);
    if (typeValue !== undefined)
        return typeValue;

    return assertValue(value);

    function assertValue(value) {
        assertValidation(validateField(field, value))
        return value;
    }
}
