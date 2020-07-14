import {Validation} from "../validators/Validation";
import {Field} from "./Field";
import {FieldDecorator} from "./FieldDecorator";
import {getFieldValidators} from "./validateField";

export function FieldValidator<T>(
    validator: (value: T, field: Field) => Validation
): FieldDecorator<T> {
    return FieldDecorator<T>(field => {
        getFieldValidators(field).push(value => {
            return validator(value, field)
        })
    })
}
