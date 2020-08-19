import {Awaitable} from "../common/typings";
import {AnyFormField, checkFormFieldValue, FormField, FormFieldType, loadFormFieldValue} from "./FormField";


export type FormFieldCheck<Error, Target extends AnyFormField> = FormField<{
    Data: FormFieldType<Target>['Data'],
    Value: FormFieldType<Target>['Value'],
    Remote: FormFieldType<Target>['Remote'],
    Options: null,
    Config: {
        target: FormFieldType<Target>['Config'],
        check(value: FormFieldType<Target>['Value']): Awaitable<Error|undefined>;
    },
    Element: FormFieldType<Target>['Element'],
    Error: { by: "target", error: FormFieldType<Target>['Error'] }
    | { by: 'host', error: Error }
}>;

export function FormFieldCheck<Error>():
    <Target extends AnyFormField>(target: Target) => FormFieldCheck<Error, Target> {
    return (target) => {


        return FormField({
            remote: target,
            options: null,
            getRemoteConfig: config => config.target,
            getElement: config => target.handle(config)({type: "getElement"}),
            load: (config, data): Awaitable<any> => {
                return loadFormFieldValue(target.props, config, data);
            },
            check: async (config, value) => {
                const error = await checkFormFieldValue(target.props, config, value);
                if (error !== undefined)
                    return {by: "target", error}
                {
                    const error = await config.check(value);
                    if (error !== undefined)
                        return {by: "host", error}
                }
            }

        })
    }
}
