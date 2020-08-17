import {inspect} from "util";
import {isEmptyObject} from "../common/object/isEmptyObject";
import {Validator} from "./Validator";
import {formatValidation} from "./formatValidation";
import {NumberValidator, NumberValidatorOptions} from "./NumberValidator";
import {Validation} from "./Validation";
import {customValidator} from "./Validator";

export type StringValidatorOptions = {
    length?: NumberValidatorOptions,
    pattern?: RegExp
};

export function validatePattern(pattern: RegExp, value: string) {
    if (!pattern.test(value))
        return () => `Expected match to ${pattern}`
}

export class StringValidator extends Validator<string> {

    lengthValidator = this.options.length && new NumberValidator(this.options.length);

    constructor(public options: StringValidatorOptions = {}) {
        super();
    }


    validateString(value: string) {
        return (this.options.pattern && validatePattern(this.options.pattern, value))
            ?? (this.lengthValidator && formatValidation(
                    this.lengthValidator.validate(value.length),
                    reason => `Invalid because length: ${reason}`)
            );
    }

    validate(value: any): Validation {
        if (typeof value !== "string")
            return () => `Expected to string.`;

        return this.validateString(value);
    }

    inspect() {
        return `string ${inspect(this.options)}`
    }
}


export function $string(schema: StringValidatorOptions={}) {
    return new StringValidator(schema)
}

