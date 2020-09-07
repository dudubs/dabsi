import {Awaitable} from "../../common/typings";

import {NoRpc} from "../NoRpc";
import {Input} from "./Input";
import {TextInputContext} from "./TextInputContext";
import {TextSchema} from "./TextSchema";


export type TextInput<Error> = Input<{

    Error: "INVALID_PATTERN" | "TOO_LONG" | "TOO_SHORT" | Error,

    Data: string,

    Value: string,

    Controller: NoRpc,

    Props: TextSchema,

    Config: null | {
        default?: string | null
        check?(text: string): Awaitable<Error | undefined>;
    },

    Element: string | undefined,

}>
    ;

export function TextInput<Error>(
    options: TextSchema = {}
): TextInput<Error> {
    return Input<TextInput<Error>>({
        props: options,
        getContextClass: () => TextInputContext,

    })
}

export type BoolInput = any;
