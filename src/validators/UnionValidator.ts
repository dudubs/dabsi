import {inspect} from "util";
import {BaseValidator} from "./BaseValidator";
import {Validation} from "./Validation";
import {Validator, ValidatorOf} from "./Validator";


export class UnionValidator<T> extends BaseValidator<T> {
    constructor(
        public validators: Validator<any>[]
    ) {
        super();
    }

    validate(value: any): Validation {
        for (const validator of this.validators) {
            const result = Validator(validator).validate(value)
        }
        return () => `Expected to ${inspect(this)}`
    }

    inspect() {
        return `${this.validators.map(validator => Validator(validator)
            .inspect()).join(" | ")}`
    }
}

export function $union<T extends [Validator<any>?, Validator<any>?, Validator<any>?,
    Validator<any>?, Validator<any>?, Validator<any>?]>(
    ...validators: T
): UnionValidator<never
    | ValidatorOf<Extract<T[0], Validator<any>>>
    | ValidatorOf<Extract<T[1], Validator<any>>>
    | ValidatorOf<Extract<T[2], Validator<any>>>
    | ValidatorOf<Extract<T[3], Validator<any>>>
    | ValidatorOf<Extract<T[4], Validator<any>>>
    | ValidatorOf<Extract<T[5], Validator<any>>>> {
    return new UnionValidator<any>(<any>validators)
}


