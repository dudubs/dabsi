import {ErrorOrValue} from "./Input";

export type StringSchema = {
    pattern?: RegExp,
    minLength?: number
    maxLength?: number
    trim?: boolean
    required?: boolean;
};

export type StringSchemaError =
    "INVALID_PATTERN" | "TOO_LONG" | "TOO_SHORT" | "REQUIRED"
    ;

export function loadAndCheckString(
    value: string,
    schema: StringSchema
): ErrorOrValue<StringSchemaError, string> {

    if (schema.trim)
        value = value.trim();

    if (!value) {
        if (schema.required)
            return {error: "REQUIRED", value: undefined}
        return {value: ""}
    }

    if (schema.pattern && !schema.pattern.test(value)) {
        return {error: "INVALID_PATTERN", value}
    }

    if (schema.maxLength && (value.length > schema.maxLength)) {
        return {error: "TOO_LONG", value}
    }
    if (schema.minLength && (value.length < schema.minLength)) {
        return {error: "TOO_SHORT", value}
    }

    return {value}
}
