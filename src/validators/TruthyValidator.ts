import {Validator} from "./Validator";
import {Validation} from "./Validation";

export class TruthyValidator extends Validator<any> {

    inspect(): string {
        return "$truthy";
    }

    validate(value: any): Validation {
        if (!value)
            return () => `is not truthy.`
    }

}


export const $truthy = new TruthyValidator();
