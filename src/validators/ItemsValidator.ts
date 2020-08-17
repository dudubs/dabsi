import {inspect} from "../logging";

import {ValidateReason, Validation} from "./Validation";
import {Validator} from "./Validator";

export class ItemsValidator extends Validator<any[]> {

    constructor(
        public validators: Validator<any>[]
    ) {
        super();
    }

    validate(items: any): Validation {
        if (!Array.isArray(items))
            return () => `Expected to array.`


        for (const validator of this.validators) {
            const reasons: ValidateReason[] = [];

            for (const item of items) {

                const result = validator.validate(item);
                if (!result) {
                    reasons.length = 0;
                    break;
                }
                reasons.push(result)
            }

            if (!reasons.length)
                continue;


            return () => `No have item ${reasons.toSeq()
                .map((r, i) => `At #${i} because ${r()}`).join('\n')}`
        }


        return undefined;
    }

    inspect(): string {
        return `$items([${this.validators.toSeq().map(v => inspect(v)).join(", ")}])`
    }
}


export function $items(validators: Validator<any>[]) {
    return new ItemsValidator(validators);
}


