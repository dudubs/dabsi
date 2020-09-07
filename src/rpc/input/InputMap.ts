import {RpcMap} from "../RpcMap";
import {InputMapContext} from "./DataInputMapContext";
import {AnyInput, Input, InputType, TInput} from "./Input";


// DataParameterConfig

export type AnyInputMap = Record<string, AnyInput>;

export type MapInputs<T extends AnyInputMap,
    P extends keyof TInput> =
    { [K in keyof T]: InputType<T[K]>[P] };


export type InputMap<T extends AnyInputMap> = Input<{
    Controller: RpcMap<T>
    Props: {}
    Element: MapInputs<T, 'Element'>
    Config: MapInputs<T, 'Config'>
    Error: MapInputs<T, 'Error'>
    Data: MapInputs<T, 'Data'>
    Value: MapInputs<T, 'Value'>
}>;

//

export function InputMap<T extends AnyInputMap>(items: T):
    InputMap<T> {
    return <any>Input<InputMap<AnyInputMap>>({

        controller: RpcMap(items),
        getContextClass: () => InputMapContext,

    })
}


// DataParameterConfig({
//
//
// })
/*

    InputMap

    $ => $({
        x: $=>$()
    })

 */
