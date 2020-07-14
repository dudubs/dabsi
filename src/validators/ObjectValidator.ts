import {inspect} from "util";
import {entries} from "../common/object/entries";
import {isEmptyObject} from "../common/object/isEmptyObject";
import {ExtractKeys, PartialKeys} from "../common/typings";
import {BaseValidator} from "./BaseValidator";
import {OptionalValidator} from "./OptionalValidator";

import {Validation} from "./Validation";
import {validator, Validator, ValidatorOf} from "./Validator";


export type KeyToValidator = Record<string, Validator<any>>;

export class ObjectValidator<T>
    extends BaseValidator<T> {

    constructor(
        public keyToValidator: KeyToValidator
    ) {
        super();
    }

    validate(obj: any): Validation {
        if (!obj)
            return () => `Is null.`
        if (typeof obj !== "object")
            return () => `Expected to object.`;
        for (const [key, validator] of entries<Validator<any>>(this.keyToValidator)) {
            const value = obj[key];
            const result = Validator(validator).validate(value);
            if (result)
                return () => `At "${key}": ${result()}`
        }
    }

    inspect() {
        return `$object${isEmptyObject(this.keyToValidator) ? '' : `(${inspect(this.keyToValidator)})`}`
    }
}

export function $object<T extends KeyToValidator>(
    keyToValidator: T
): ObjectValidator<PartialKeys<{ [K in keyof T]: ValidatorOf<T[K]> },ExtractKeys<T, OptionalValidator<any>>>> {
    return new ObjectValidator(keyToValidator)
}

$object[validator] = new ObjectValidator<{}>({});
$object[inspect.custom] = () => `$object`