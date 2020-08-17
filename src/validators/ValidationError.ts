import {ValidateReason} from "./Validation";

export class ValidationError {
    constructor(
        public reason: ValidateReason
    ) {

    }

    toString() {
        return this.reason()
    }
}
