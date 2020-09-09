import {DataRow} from "../../data/DataRow";
import {DataSource} from "../../data/DataSource";
import {DataParameter} from "../DataParameter";
import {RpcConfigFactory, RpcGenericConfigFn} from "../RpcGenericConfig";
import {WidgetElement} from "../widget/Widget";
import {DataInputMapContext} from "./DataInputMapContext";
import {AnyInput, Input, InputData, InputError, InputValue} from "./Input";

export type DataInputMapConfig<I extends AnyInput, T = any> = {
    // TInputValue?: DataRow<T>

    source: DataSource<T>

    getInputConfig: RpcConfigFactory<DataRow<T>, I>
};


export type DataInputMap<I extends AnyInput> = Input<{

    DataInput: I;


    Data: Record<string, InputData<I>>

    Value: Record<string, InputValue<I>>

    Props: { input: I },

    Element: Record<string, {
        label: string
        input: WidgetElement<I>
    }>

    Config: RpcGenericConfigFn<<T>(config: DataInputMapConfig<I, T>) =>
        DataInputMapConfig<I>>;

    Error: Record<string, InputError<I>>

    Controller: DataParameter<I>
}>;

export function DataInputMap<I extends AnyInput>(input: I): DataInputMap<I> {
    return <any>Input<DataInputMap<AnyInput>>({
        props: {input},
        isGenericConfig: true,
        controller: DataParameter(input),
        context: DataInputMapContext,

    })
}

