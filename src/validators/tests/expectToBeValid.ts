import {Validator} from "../Validator";

export function expectToBeValid<T>(
    value: any,
    validator: Validator<T>
): asserts value is T {
    const result = Validator(validator).validate(value);
    if (result)
        fail(result())
}
