import {inspect} from "util";
import {IndexedSeq} from "../immutable2";
import {BaseValidator} from "./BaseValidator";
import {Validation} from "./Validation";

export class EnumValidator<T> extends BaseValidator<T> {
    constructor(public options: Set<string | number>) {
        super();
    }

    validate(value: any): Validation {
        if (!this.options.has(value))
            return () => `${inspect(value)} is not ${this.inspect()}`
    }

    inspect(): string {
        return IndexedSeq(this.options.values())
            .map(value => inspect(value))
            .join(" | ")
    }

}


export function $enum<U extends [
    (number | string)?,
    (number | string)?,
    (number | string)?,
    (number | string)?,
    (number | string)?,
    (number | string)?,
    (number | string)?,
]>(...values: U): EnumValidator<never
    | Extract<U[0], undefined>
    | Extract<U[1], undefined>
    | Extract<U[2], undefined>
    | Extract<U[3], undefined>
    | Extract<U[4], undefined>
    | Extract<U[5], undefined>
    | Extract<U[6], undefined>> {
    return new EnumValidator(new Set(<any>values))
}

