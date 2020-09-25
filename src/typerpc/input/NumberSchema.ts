import {ErrorOrValue} from "./Input";

export type NumberSchemaError =
    "TOO_SMALL" | "TOO_BIG";

export type NumberSchema = {
    max?: number
    min?: number
    step?: number

};

export function loadAndCheckNumber(value: number, schema: NumberSchema):
    ErrorOrValue<NumberSchemaError, number> {

    if (schema.step) {
        value = (value / schema.step) * schema.step;
    }

    if ((typeof schema.max === "number") && (value > schema.max)) {
        return {error: "TOO_BIG", value}
    }

    if ((typeof schema.min === "number") && (value < schema.min)) {
        return {error: "TOO_SMALL", value}
    }

    return {value}
}
