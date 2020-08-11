import {Validation} from "../validators/Validation";
import {Field} from "./Field";
import {getFieldDesignOrForwardType} from "./Forward";
import {hasFields} from "./hasFields";
import {Nullable} from "./Nullable";
import {Optional} from "./Optional";
import {validateField} from "./validateField";
import {validateStruct} from "./validateStruct";

export function validateStructField(
    field: Field, value: any,
): Validation {

    if (value === null) {
        if (!Optional.get(field) && !Nullable.get(field))
            return () => `Is null.`
        return
    } else if (value === undefined) {
        if (!Optional.get(field))
            return () => `Is required.`
        return;
    }

    const validation = validateField(field, value);
    if (validation)
        return validation;

    const type = getFieldDesignOrForwardType(field);
    if (type && hasFields(type)) {
        const validation = validateStruct(type, value);
        if (validation)
            return validation;
    }

}
