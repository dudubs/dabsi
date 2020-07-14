import {Type} from "../common/typings";
import {Validation} from "../validators/Validation";
import {getStructFields} from "./getStructFields";
import {validateStructField} from "./validateStructField";

export function validateStruct(structType: Type<any>, struct: object): Validation {
    for (const field of getStructFields(structType)) {
        const validation = validateStructField(field, struct[field.propertyKey]);
        if (validation)
            return () => `At ${field.propertyKey} (of ${field.target.name}): \n\t${validation()}`;
    }
}


