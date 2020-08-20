import {Awaitable} from "../../common/typings";
import {FormField, FormFieldType} from "../FormField";
import {NoRpc} from "../NoRpc";


export type FormTextField<Error> = FormField<{

    Error: "INVALID_PATTERN" | "TOO_LONG" | "TOO_SHORT" | Error,

    Data: string,
    Value: string,
    Remote: NoRpc,

    Options: undefined | FormTextFieldOptions,
    Config: null | {
        default?: string | undefined
        check?(text: string): Awaitable<Error | undefined>;
    },
    Element: string | undefined,

}>
    ;

export type FormTextFieldOptions = {
    pattern?: RegExp,
    trim?: boolean
    minLength?: number
    maxLength?: number
};

export function checkFormTextField(
    value: string,
    options: FormTextFieldOptions
): FormFieldType<FormTextField<never>>['Error'] | undefined {
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

export function FormTextField<Error>(
    options: FormTextFieldOptions = {}
): FormTextField<Error> {
    return FormField({
        remote: NoRpc,
        options,
        getRemoteConfig: () => null,
        getElement(config) {
            return config?.default
        },
        load: (config, data: string) => {
            data = String(data || "");
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
