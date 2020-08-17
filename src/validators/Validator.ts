import {Validation} from "./Validation";
import {ValidationError} from "./ValidationError";

export const customValidator = Symbol('customValidator');

export abstract class Validator<T> {

    abstract validate(value: any): Validation;

    assert(value: any): asserts value is T {
        const result = this.validate(value);
        if (result)
            throw new ValidationError(result);
    }

    is(value: any): value is T {
        return !!this.validate(value)
    }


    abstract inspect(): string ;


}



export type ValidatorType<T extends Validator<any>> =
    T extends Validator<infer U> ? U : never;


export function isValidator<T = any>(obj): obj is Validator<T> {
    if ((typeof obj !== "object") || !obj)
        return false;
    return customValidator in obj || (obj instanceof Validator)
}

