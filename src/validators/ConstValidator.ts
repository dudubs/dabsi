import {inspect} from "util";
import {Validator} from "./Validator";
import {Validation} from "./Validation";

export class ConstValidator<T> extends Validator<T> {
    constructor(
        public value: T
    ) {
        super();
    }

    validate(value: any): Validation {
        if (value !== this.value)
            return () => `${inspect(value)} is not ${this.inspect()}.`
    }

    inspect(): string {
        return inspect(this.value)
    }

}

export function $const<T>(value: T): ConstValidator<T> {
    return new ConstValidator(value)
}
