import {hasKeys} from "../../common/object/hasKeys";
import {DataRow} from "../../data/DataRow";
import {DataSource} from "../../data/DataSource";
import {DataParameter} from "../DataParameter";
import {RpcConfigType} from "../Rpc";
import {RpcGenericConfig} from "../RpcGenericConfig";
import {AnyInput, Input, InputType} from "./Input";

export type DataInputMapConfig<I extends AnyInput, T = any> = {
    source: DataSource<T>
    getInputConfig: (row: DataRow<T>) => RpcConfigType<I>
};

const _ValueToError = new WeakMap();
export type DataInputMap<I extends AnyInput> = Input<{

    Data: Record<string, InputType<I>['Data']>
    Value: Record<string, InputType<I>['Value']>
    Static: {},
    Element: Record<string, {
        label: string
        input: InputType<I>['Element']
    }>
    Config:
        RpcGenericConfig<<T>(config: DataInputMapConfig<I, T>) =>
            DataInputMapConfig<I>>;
    Error: Record<string, InputType<I>['Error']>
    Controller: DataParameter<I>
}>;


export function DataInputMap<I extends AnyInput>(input: I): DataInputMap<I> {


    return Input({
        static: {},
        controller: DataParameter<I>(input),

        createContext: $ => RpcGenericConfig($, config => {
            return {
                getControllerConfig: () => {
                    return $ => $({
                        source: config.source,
                        getTargetConfig: row =>
                            config.getInputConfig(row)
                    })
                },
                loadAndCheck: async data => {
                    const value: any = {};
                    const error: any = {};
                    const keys = Object.keys(data);
                    for (const row of await config.source.filter({$is: keys}).items()) {

                        const result = await input
                            .getContext(config.getInputConfig(row))
                            .loadAndCheck(data[row.$key])

                        if ('error' in result) {
                            error[row.$key] = result.error;
                        } else {
                            value[row.$key] = result.value;
                        }
                    }
                    if (hasKeys(error))
                        _ValueToError.set(value, error);

                    return hasKeys(error) ? {error} : {value};
                },
                getElement: async () => {
                    const element: any = {};
                    for (const row of await config.source.items()) {
                        element[row.$key] = await input.getContext(
                            config.getInputConfig(row)
                        ).getElement()
                    }
                    return element;
                }
            }
        }),

    })
}
