import {BaseValidator} from "./BaseValidator";
import {Validation} from "./Validation";
import {Validator} from "./Validator";

export class OptionalValidator<T> extends BaseValidator<T | undefined> {
    constructor(public validator: Validator<T>) {
        super();

    }

    validate(value: any): Validation {
        if (value !== undefined) {
            return Validator(this.validator).validate(value)
        }
    }

    inspect() {
        return `optional ${Validator(this.validator).inspect()}`
    }
}

export function $optional<T>(
    validator: Validator<T>
) {
    return new OptionalValidator(validator)
}
