import {ErrorOrValue} from "./Input";

export type StringSchema = {
    pattern?: RegExp,
    minLength?: number
    maxLength?: number
    trim?: boolean
};

export type StringSchemaError =
    "INVALID_PATTERN" | "TOO_LONG" | "TOO_SHORT"
    ;

export function loadAndCheckString(
    value: string,
    schema: StringSchema
): ErrorOrValue<StringSchemaError, string> {

    if (schema.trim)
        value = value.trim();

    if (schema.pattern && !schema.pattern.test(value)) {
        return {error: "INVALID_PATTERN"}
    }

    if (schema.maxLength && (value.length > schema.maxLength)) {
        return {error: "TOO_LONG"}
    }
    if (schema.minLength && (value.length < schema.minLength)) {
        return {error: "TOO_SHORT"}
    }

    return {value}
}
