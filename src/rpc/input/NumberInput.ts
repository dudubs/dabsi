import {NoRpc} from "../NoRpc";
import {Input} from "./Input";
import {NullableInput, NullableInputOptions} from "./NullableInput";
import {NumberInputContext} from "./NumberInputContext";
import {NumberSchema, NumberSchemaError} from "./NumberSchema";

export type NumberInput<N extends boolean> = NullableInput<N, {
    Controller: NoRpc

    Data: number

    Value: number

    Props: NumberSchema

    Config: {
        default?: number
    }

    Element: number | undefined

    Error: NumberSchemaError
}>;


export function NumberInput<N extends boolean = true>(
    options:
        NullableInputOptions<N> &
        NumberSchema = {}): NumberInput<N> {
    return <any>Input<NumberInput<any>>({
        props: {
            ...options,
            nullable: options.nullable ?? true
        },
        context: NumberInputContext
    })
}


