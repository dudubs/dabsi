import {ValidationError} from "./ValidationError";

export type Validation = undefined | (() => string);


export namespace Validation {


    export function format(
        result: Validation,
        formatter: (reason: string) => string
    ): Validation {
        return result && (() => formatter(result()));
    }

    export function assert(
        validation: Validation
    ) {
        if (validation)
            throw new ValidationError(validation)

    }

}
