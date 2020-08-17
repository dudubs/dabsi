import {Validation} from "./Validation";
import {ValidationError} from "./ValidationError";

export function assertValidation(
    validation: Validation
) {
    if (validation)
        throw new ValidationError(validation)

}
