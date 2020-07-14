import {inspect} from "util";
import {isEmptyObject} from "../common/object/isEmptyObject";
import {BaseValidator} from "./BaseValidator";
import {NumberValidator, NumberValidatorOptions} from "./NumberValidator";
import {Validation} from "./Validation";
import {validator} from "./Validator";

export type StringValidatorOptions = {
    length?: NumberValidatorOptions,
    pattern?: RegExp
};

export function validatePattern(pattern: RegExp, value: string) {
    if (!pattern.test(value))
        return () => `Expected match to ${pattern}`
}

export class StringValidator extends BaseValidator<string> {

    lengthValidator = this.options.length && new NumberValidator(this.options.length);

    constructor(public options: StringValidatorOptions = {}) {
        super();
    }


    validateString(value: string) {
        return (this.options.pattern && validatePattern(this.options.pattern, value))
            ?? (this.lengthValidator && Validation.format(
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


export function $string(schema: StringValidatorOptions) {
    return new StringValidator(schema)
}

$string[validator] = new StringValidator({});
$string[inspect.custom] = () => `string`
