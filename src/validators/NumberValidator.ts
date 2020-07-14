import {inspect} from "util";
import {isEmptyObject} from "../common/object/isEmptyObject";
import {BaseValidator} from "./BaseValidator";
import {Validation} from "./Validation";
import {validator} from "./Validator";


export type NumberValidatorOptions = {
    max?: number,
    min?: number
};


export class NumberValidator extends BaseValidator<number> {

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


export function $number(options: NumberValidatorOptions): NumberValidator {
    return new NumberValidator(options)
}

$number[validator] = new NumberValidator({});
$number[inspect.custom] = () => `$number`


