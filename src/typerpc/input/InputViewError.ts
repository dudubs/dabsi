// TODO: rename to InputError
import {AnyInput, InputError} from "./Input";

export class InputViewError<T extends AnyInput> extends Error {
    constructor(public error: InputError<T>) {
        super();
    }
}

