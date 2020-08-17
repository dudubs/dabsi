import {inspect} from "util";
import {Validator} from "./Validator";
import {Validation} from "./Validation";


export type NumberValidatorOptions = {
    max?: number,
    min?: number
};


export class NumberValidator extends Validator<number> {

    constructor(
        public options: NumberValidatorOptions
    ) {
        super();
    }

    validateNumber(value: number) {
        if ((typeof this.options.max === 'number') && (value > this.options.max)) {
            return () => `Expected less than ${this.options.max}`;
        }
        if ((typeof this.options.min === 'number') && (value < this.options.min)) {
            return () => `Expected greater than ${this.options.min}`;
        }
    }

    validate(value: any): Validation {
        if (typeof value !== "number")
            return () => `Expected to number.`
        return this.validateNumber(value)
    }

    inspect() {
        return `$number ${inspect(this.options)}`
    }
}


export function $number(options: NumberValidatorOptions = {}): NumberValidator {
    return new NumberValidator(options)
}


