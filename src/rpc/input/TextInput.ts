import {Awaitable} from "../../common/typings";
import {NoRpc} from "../NoRpc";
import {Input, InputType} from "./Input";


export type TextInput<Error> = Input<{

    Error: "INVALID_PATTERN" | "TOO_LONG" | "TOO_SHORT" | Error,

    Data: string,

    Value: string,

    Controller: NoRpc,

    Static: TextInputOptions,


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
    return Input({
        static: options,
        controller: NoRpc,
        createContext: config => ({
            getControllerConfig: () => null,
            loadAndCheck: async data => {
                let value = String(data || "");
                if (options.trim) {
                    value = value.trim();
                }
                if (options.pattern && !options.pattern.test(value)) {
                    return {error: "INVALID_PATTERN"}
                }
                const error = await config?.check?.(value);
                if (error)
                    return {error};

                return {value}
            },
            getElement: () => config?.default || ""
        }),

    })
}

export type BoolInput = any;
