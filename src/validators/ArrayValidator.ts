import {inspect} from "util";
import {isEmptyObject} from "../common/object/isEmptyObject";
import {Validator} from "./Validator";
import {NumberValidator, NumberValidatorOptions} from "./NumberValidator";
import {Validation} from "./Validation";
import {isValidator} from "./Validator";


export type ArrayValidatorOptions<T> = {
    length?: NumberValidatorOptions;

    of?: Validator<T>
};

export class ArrayValidator<T = any> extends Validator<T[]> {

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
            for (const [index, item] of (<any[]>value).entries()) {
                const result = this.options.of.validate(item)
                if (result)
                    return () => `At #${index}: ${result()}`
            }
        }
    }

    inspect() {
        return `$array${isEmptyObject(this.options) ? '' : `(${inspect(this.options)})`}`
    }
}


export function $array<T>(): ArrayValidator<any>
export function $array<T>(validatorOrOptions: Validator<T> | ArrayValidatorOptions<T>): ArrayValidator<T>
export function $array<T>(validatorOrOptions = {}) {
    if (isValidator(validatorOrOptions)) {
        return $array({of: validatorOrOptions})
    }
    return new ArrayValidator(validatorOrOptions)
}

