import {inspect} from "util";
import {entries} from "../common/object/entries";
import {isEmptyObject} from "../common/object/isEmptyObject";
import {ExtractKeys, PartialKeys} from "../common/typings";
import {Validator} from "./Validator";
import {$const} from "./ConstValidator";
import {OptionalValidator} from "./OptionalValidator";

import {Validation} from "./Validation";
import {isValidator} from "./Validator";


type ConstValidator = number | string | boolean;


type KeyValidator = Validator<any> | ConstValidator;

export type KeyToValidator = Record<string, KeyValidator>;

export class ObjectValidator<T>
    extends Validator<T> {

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
        for (let [key, validator] of entries(this.keyToValidator)) {

            if (!isValidator(validator)) {
                validator = $const(validator)
            }

            const value = obj[key];
            const result = validator.validate(value);
            if (result)
                return () => `At "${key}": ${result()}`
        }
    }

    inspect() {
        return `$object${isEmptyObject(this.keyToValidator) ? '' : `(${inspect(this.keyToValidator)})`}`
    }
}

export function $object<T extends KeyToValidator = {}>(
    keyToValidator?: T): ObjectValidator<PartialKeys<{
    [K in keyof T]:
    T[K] extends Validator<infer U> ? U : T[K]
}, ExtractKeys<T, OptionalValidator<any>>>> {
    return new ObjectValidator(keyToValidator ?? {})
}

// $object[customValidator] = new ObjectValidator<{}>({});
// $object[inspect.custom] = () => `$object`
