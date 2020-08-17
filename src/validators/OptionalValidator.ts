import {inspect} from "../logging";
import {Validation} from "./Validation";
import {Validator} from "./Validator";

export class OptionalValidator<T> extends Validator<T | undefined> {
    constructor(public validator: Validator<T>) {
        super();

    }

    validate(value: any): Validation {
        if (value !== undefined) {
            return this.validator.validate(value)
        }
    }

    inspect() {
        return `optional ${inspect(this.validator)}`
    }
}

export function $optional<T>(
    validator: Validator<T>
) {
    return new OptionalValidator(validator)
}
