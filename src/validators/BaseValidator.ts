import {Validation} from "./Validation";
import {ValidationError} from "./ValidationError";
import { inspect } from "util";


export abstract class BaseValidator<T> {

    abstract validate(value: any): Validation;

    $debug:T;

    assert(value: any): asserts value is T {
        const result = this.validate(value);
        if (result)
            throw new ValidationError(result);
    }

    is(value: any): value is T {
        return !!this.validate(value)
    }

    abstract inspect(): string;

    [inspect.custom](){
        return this.inspect()
    }


}

