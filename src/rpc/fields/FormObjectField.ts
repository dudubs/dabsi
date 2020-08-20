import {entries} from "../../common/object/entries";
import {hasKeys} from "../../common/object/hasKeys";
import {AnyFormFields, FormField, MapFormFields} from "../FormField";
import {NoRpc} from "../NoRpc";


export type FormObjectField<Fields extends AnyFormFields> = FormField<{
    //
    // Handler
    //
    // Connection: {
    //     [K in keyof Fields]: RpcConnectionType<Fields[K]>
    // }
    //
    // Config: MapFormFields<Fields, 'Config'>
    Remote: NoRpc

    Data: MapFormFields<Fields, 'Data'>
    Value: MapFormFields<Fields, 'Value'>
    Options: null
    Element: MapFormFields<Fields, 'Element'>
    Config: MapFormFields<Fields, 'Config'>
    Error: MapFormFields<Fields, 'Error'>
}>;

//
export function FormObjectField<Fields extends AnyFormFields>(fields: Fields): FormObjectField<Fields> {

    return FormField({
        remote: NoRpc,

        getRemoteConfig: () => null,

        options: null,

        check: async (config, value) => {
            const errors: any = {};

            for (const [key, field] of entries(fields)) {
                const error = await field.checkValue(config[key], value);
                if (error != null) {
                    errors[key] = error;
                }
            }

            if (hasKeys(errors))
                return errors;
        },

        load: async (config, data) => {
            const value: any = {};
            for (let [key, field] of entries(fields)) {
                value[key] = await field.loadValue(config[key], data[key])
            }
            return value;
        },

        getElement: async config => {
            const element: any = {};
            for (const [key, field] of entries(fields)) {
                element[key] = await field.handle(config[key])("getElement")
            }
            return element;
        }
    })
}
