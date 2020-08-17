import {inspect} from "../../logging";

import {ValidateReason} from "../Validation";
import {Validator} from "../Validator";

export function expectToBeValid<T>(
    value: any,
    validator: Validator<T>
): asserts value is T {
    const result = validator.validate( value);
    if (result)
        fail(result())
}


export function expectToValidItem(
    value: any[],
    validator: Validator<any>
) {
    const reasons: ValidateReason[] = [];
    for (let item of value) {
        const result = validator.validate(item);
        if (!result)
            return;
        reasons.push(result);
    }

    fail(`expected ${inspect(validator)} \n${reasons.toSeq().map((r, i) => `At #${i}: ${r()}`).join("\n")
    } `)
}
