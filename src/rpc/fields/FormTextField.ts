import {Awaitable} from "../../common/typings";
import {FormField} from "../FormField";
import {NoRpc} from "../NoRpc";


export type FormTextField = FormField<string, string, NoRpc,
    undefined | FormTextFieldOptions, null | {
    check?(value: string): Awaitable<void>
    default?: string|undefined
}, string | undefined>;

export type FormTextFieldOptions = {
    pattern?: RegExp,
    trim?: boolean
};

export function FormTextField(
    options: FormTextFieldOptions = {}
): FormTextField {
    return FormField({
        remote: NoRpc,
        options,
        getElement(config) {
            return config?.default
        },
        async check(config, value): Promise<void> {
            await config?.check?.(value);
        },
        async load(config, data: string) {
            data = String(data);
            if (options.trim) {
                data = data.trim();
            }
            return data
        }
    })
}
