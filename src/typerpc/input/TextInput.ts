import {Awaitable} from "../../common/typings";

import {NoRpc} from "../NoRpc";
import {Input} from "./Input";
import {TextInputContext} from "./TextInputContext";
import {StringSchema, StringSchemaError} from "./StringSchema";
import {ValueOrAwaitableFn} from "./ValueOrAwaitableFn";

export type TextInput = Input<{

    Error: StringSchemaError,

    Data: string,

    Value: string,

    Controller: NoRpc,

    // Move to element
    Props: {},

    Config: undefined | StringSchema & {
        default?: ValueOrAwaitableFn<string | undefined>
    },

    Element: StringSchema&{
        default?:string
    },

}>
    ;

export function TextInput(): TextInput {
    return Input<TextInput>({
        props: {},
        context: TextInputContext
    })
}

