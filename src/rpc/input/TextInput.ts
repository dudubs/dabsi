import {Awaitable} from "../../common/typings";

import {NoRpc} from "../NoRpc";
import {Input} from "./Input";
import {TextInputContext} from "./TextInputContext";
import {StringSchema, StringSchemaError} from "./StringSchema";
import {ValueOrAwaitableFn} from "./ValueOrAwaitableFn";

export type TextInput = Input<{

    Error: StringSchemaError ,

    Data: string,

    Value: string,

    Controller: NoRpc,

    Props: StringSchema,

    Config: null | {
        default?: ValueOrAwaitableFn<string|undefined>
    },

    Element: string | undefined,

}>
    ;

export function TextInput(
    options: StringSchema = {}
): TextInput {
    return Input<TextInput>({
        props: options,
        context: TextInputContext
    })
}

