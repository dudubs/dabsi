import {inspect} from "util";
import {isEmptyObject} from "../common/object/isEmptyObject";
import {BaseValidator} from "./BaseValidator";
import {NumberValidatorOptions, NumberValidator} from "./NumberValidator";
import {Validation} from "./Validation";
import {isValidator, validator, Validator} from "./Validator";


export type ArrayValidatorOptions<T> = {
    length?: NumberValidatorOptions;

    of?: Validator<T>
};

export class ArrayValidator<T = any> extends BaseValidator<T[]> {

    constructor(
        public options: ArrayValidatorOptions<T>
    ) {
        super();
    }

    lengthValidator = this.options.length && new NumberValidator(this.options.length);

    validate(value: any): Validation {

        if (!Array.isArray(value)) {
            return () => `Expected to array`
        }

        const result = this.lengthValidator?.validate(value.length)
        if (result)
            return () => `Because length: ${result()}`;

        if (this.options.of) {
            const validator = Validator(this.options.of);
            for (const [index, item] of (<any[]>value).entries()) {
                const result = validator.validate(item)
                if (result)
                    return () => `At #${index}: ${result()}`
            }
        }
    }

    inspect() {
        return `$array${isEmptyObject(this.options) ? '' : `(${inspect(this.options)})`}`
    }
}


export function $array<T>(
    validatorOrOptions: Validator<T> | ArrayValidatorOptions<T>): ArrayValidator<T> {
    if (isValidator(validatorOrOptions)) {
        return $array({of: validatorOrOptions})
    }
    return new ArrayValidator(validatorOrOptions)
}

$array.validate = value => {
    if (!Array.isArray(value))
        return () => `Expected to array.`
}
$array.inspect = () => `Array<any>`
$array[validator] = new ArrayValidator({})
$array[inspect.custom] = () => "$array"
