import {inspect} from "util";
import {BaseValidator} from "./BaseValidator";
import {Validation} from "./Validation";

export class ConstValidator<T> extends BaseValidator<T> {
    constructor(
        public value: T
    ) {
        super();
    }

    validate(value: any): Validation {
        if (value !== this.value)
            return () => `${inspect(value)} will be ${this.inspect()}.`
    }

    inspect(): string {
        return inspect(this.value)
    }

}

export function $const<T>(value: T): ConstValidator<T> {
    return new ConstValidator(value)
}
