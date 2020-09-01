import {Awaitable} from "../../common/typings";
import {NoRpc} from "../NoRpc";
import {WidgetContextClass} from "../Widget";
import {Input, InputType} from "./Input";
import {TextInputContext} from "./TextInputContext";


export type TextInput<Error> = Input<{

    Error: "INVALID_PATTERN" | "TOO_LONG" | "TOO_SHORT" | Error,

    Data: string,

    Value: string,

    Controller: NoRpc,

    Props: TextInputOptions,


    Config: null | {
        default?: string | null
        check?(text: string): Awaitable<Error | undefined>;
    },

    Element: string | undefined,

}>
    ;

export type TextInputOptions = {
    pattern?: RegExp,
    trim?: boolean
    minLength?: number
    maxLength?: number
};

export function checkTextInput(
    value: string,
    options: TextInputOptions
): InputType<TextInput<never>>['Error'] | undefined {
    if (options.pattern && !options.pattern.test(value)) {
        return "INVALID_PATTERN"
    }

    if (options.maxLength && (value.length > options.maxLength)) {
        return "TOO_LONG"
    }
    if (options.minLength && (value.length < options.minLength)) {
        return "TOO_SHORT"
    }
}

export function TextInput<Error>(
    options: TextInputOptions = {}
): TextInput<Error> {
    return Input<TextInput<Error>>({
        props: options,
        controller: NoRpc,
        getContextClass: () => TextInputContext,

    })
}

export type BoolInput = any;
