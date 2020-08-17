import {Validator} from "./Validator";
import {Validation} from "./Validation";

export class AnyValidator extends Validator<any> {
    inspect(): string {
        return "$any";
    }

    validate(value: any): Validation {
        return undefined;
    }
}

export const $any = new AnyValidator();
