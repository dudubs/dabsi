import {Validator} from "./Validator";
import {Validation} from "./Validation";

export class FalsyValidator extends Validator<any> {
    inspect(): string {
        return "$falsy";
    }

    validate(value: any): Validation {
        if (value)
            return () => `is not falsy.`
    }

}

export const $falsy = new FalsyValidator();
