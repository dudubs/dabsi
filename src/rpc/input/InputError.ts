// TODO: rename to InputError
import {AnyInput, InputType} from "./Input";

export class InputError<T extends AnyInput> extends Error {
    constructor(public error: InputType<T>['Error']) {
        super();
    }
}
