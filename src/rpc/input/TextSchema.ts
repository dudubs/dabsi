import {InputType} from "./Input";
import {TextInput} from "./TextInput";

export type TextSchema = {
    pattern?: RegExp,
    trim?: boolean
    minLength?: number
    maxLength?: number
};

export function checkTextSchema(
    value: string,
    schema: TextSchema
): InputType<TextInput<never>>['Error'] | undefined {
    if (schema.pattern && !schema.pattern.test(value)) {
        return "INVALID_PATTERN"
    }

    if (schema.maxLength && (value.length > schema.maxLength)) {
        return "TOO_LONG"
    }
    if (schema.minLength && (value.length < schema.minLength)) {
        return "TOO_SHORT"
    }
}
