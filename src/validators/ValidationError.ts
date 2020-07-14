import {Validation} from "./Validation";

export class ValidationError {
    constructor(
        public validation: NonNullable<Validation>
    ) {

    }

    toString() {
        return this.validation()
    }
}
