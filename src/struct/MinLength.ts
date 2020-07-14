import {FieldConfigurator} from "./FieldConfigurator";
import {getFieldValidators} from "./validateField";


export const MinLength = FieldConfigurator<number>()(
    length => field => {

        getFieldValidators(field).push(value => {
            if (length > value.length)
                return () => `Expected to min-length of ${length}, got: ${value.length}.`
        })
    }
)



