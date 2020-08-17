import {Validation} from "./Validation";

export function formatValidation(
    validation: Validation,
    formatter: (reason: string) => string
): Validation {
    return validation && (() => formatter(validation()));
}
