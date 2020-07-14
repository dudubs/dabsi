import {BaseValidator} from "./BaseValidator";

export const validator = Symbol('validator');


export type Validator<T> = BaseValidator<T> | { [validator]: BaseValidator<T> };

export type ValidatorOf<T extends Validator<any>> =
    T extends Validator<infer U> ? U : never;

export function Validator<T>(
    value: Validator<T>
): BaseValidator<T> {
    return value[validator] ?? value
}

export function isValidator<T=any>(obj:object):obj is Validator<T> {
    return validator in obj || (obj instanceof BaseValidator)
}
