import {Awaitable} from "../../common/typings";
import {FormField} from "../FormField";
import {NoRpc} from "../NoRpc";


export type FormTextField<Error> = FormField<{

    Error: "INVALID_PATTERN" | Error,

    Data: string,
    Value: string,
    Remote: NoRpc,

    Options: undefined | FormTextFieldOptions,
    Config: null | {
        default?: string | undefined
        check?(text: string): Awaitable<Error|undefined>;
    },
    Element: string | undefined,

}>
    ;

export type FormTextFieldOptions = {
    pattern?: RegExp,
    trim?: boolean
};

export function FormTextField<Error>(
    options: FormTextFieldOptions = {}
): FormTextField<Error> {
    return FormField({
        remote: NoRpc,
        options,
        getElement(config) {
            return config?.default
        },
        async load(config, data: string) {
            data = String(data);
            if (options.trim) {
                data = data.trim();
            }
            return data
        },
        check: async (config, value) => {
            if (options.pattern && !options.pattern.test(value)) {
                return "INVALID_PATTERN"
            }
            return config?.check?.(value)
        }
    })
}
