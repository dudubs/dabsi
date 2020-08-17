import {inspect} from "util";
import {Validator} from "./Validator";
import {$const} from "./ConstValidator";
import {$object} from "./ObjectValidator";
import {Validation} from "./Validation";
import {ValidatorType} from "./Validator";


export class UnionValidator<T> extends Validator<T> {
    constructor(
        public validators: Validator<any>[]
    ) {
        super();
    }

    validate(value: any): Validation {
        for (const validator of this.validators) {
            const result = validator.validate(value)
            if (!result)
                return
        }
        return () => `Expected to ${inspect(this)}`
    }

    inspect() {
        return `${this.validators.map(validator => validator.inspect()).join(" | ")}`
    }
}

export function $union<T extends [Validator<any>?, Validator<any>?, Validator<any>?,
    Validator<any>?, Validator<any>?, Validator<any>?]>(
    ...validators: T
): UnionValidator<never
    | ValidatorType<Extract<T[0], Validator<any>>>
    | ValidatorType<Extract<T[1], Validator<any>>>
    | ValidatorType<Extract<T[2], Validator<any>>>
    | ValidatorType<Extract<T[3], Validator<any>>>
    | ValidatorType<Extract<T[4], Validator<any>>>
    | ValidatorType<Extract<T[5], Validator<any>>>> {
    return new UnionValidator<any>(<any>validators)
}


