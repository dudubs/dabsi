import {FieldConfigurator} from "./FieldConfigurator";
import {getFieldValidators} from "./validateField";

export const MaxLength = FieldConfigurator<number>()(
    length => field => {
        getFieldValidators(field).push(value => {
            if (value.length > length)
                return () => `Expected to max-length of ${length}, got: ${value.length}.`
        })
    }
)
