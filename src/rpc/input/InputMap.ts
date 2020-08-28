import {entries} from "../../common/object/entries";
import {hasKeys} from "../../common/object/hasKeys";
import {MappedRpc} from "../MappedRpc";
import {AnyInput, Input, InputType, TInput} from "./Input";

//
export type AnyInputMap = Record<string, AnyInput>;

export type MapInputs<T extends AnyInputMap,
    P extends keyof TInput> =
    { [K in keyof T]: InputType<T[K]>[P] };


export type InputMap<T extends AnyInputMap> =
    Input<{
        Controller: MappedRpc<T>
        Static: { items: T }
        Element: MapInputs<T, 'Element'>
        Config: MapInputs<T, 'Config'>
        Error: MapInputs<T, 'Error'>
        Data: MapInputs<T, 'Data'>
        Value: MapInputs<T, 'Value'>
    }>;

//
export function InputMap<T extends AnyInputMap>(items: T):
    InputMap<T> {

    return Input({
        static: {items},
        controller: MappedRpc(items),
        createContext: config => ({
            getControllerConfig: () => config,
            loadAndCheck: async data => {
                const error: any = {};
                const value: any = {};
                for (const [key, field] of entries(items)) {
                    const result = await field
                        .getContext(config[key])
                        .loadAndCheck(data[key]);
                    if ('error' in result) {
                        error[key] = result.error;
                    } else {
                        value[key] = result.value;
                    }
                }
                return hasKeys(error) ? {error} : {value};
            },
            getElement: async () => {
                const element: any = {};
                for (const [key, input] of entries(items)) {
                    element[key] = await input.getContext(config[key]).getElement()
                }
                return element;
            }
        }),

    })
}


