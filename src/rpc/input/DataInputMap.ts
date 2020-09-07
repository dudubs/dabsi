import {DataRow} from "../../data/DataRow";
import {DataSource} from "../../data/DataSource";
import {DataParameter} from "../DataParameter";
import {RpcConfig} from "../Rpc";
import {RpcGenericConfigFn} from "../RpcGenericConfig";
import {DataInputMapContext} from "./DataInputMapContext";
import {AnyInput, Input, InputType} from "./Input";

export type DataInputMapConfig<I extends AnyInput, T = any> = {
    // TInputValue?: DataRow<T>

    source: DataSource<T>

    getInputConfig: (row: DataRow<T>) => RpcConfig<I>
};


export type DataInputMap<I extends AnyInput> = Input<{

    Data: Record<string, InputType<I>['Data']>

    Value: Record<string, InputType<I>['Value']>

    Props: { input: I },

    Element: Record<string, {
        label: string
        input: InputType<I>['Element']
    }>

    Config: RpcGenericConfigFn<<T>(config: DataInputMapConfig<I, T>) =>
        DataInputMapConfig<I>>;

    Error: Record<string, InputType<I>['Error']>

    Controller: DataParameter<I>
}>;

export function DataInputMap<I extends AnyInput>(input: I): DataInputMap<I> {
    return <any>Input<DataInputMap<AnyInput>>({
        props: {input},
        isGenericConfig: true,
        controller: DataParameter(input),
        getContextClass: () => DataInputMapContext,

    })
}

