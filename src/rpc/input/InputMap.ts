import {MappedRpc} from "../MappedRpc";
import {AnyInput, Input, InputType, TInput} from "./Input";
import {InputMapContext} from "./InputMapContext";



export type AnyInputMap = Record<string, AnyInput>;

export type MapInputs<T extends AnyInputMap,
    P extends keyof TInput> =
    { [K in keyof T]: InputType<T[K]>[P] };


export type InputMap<T extends AnyInputMap> = Input<{
    Controller: MappedRpc<T>
    Props: { items: T }
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
        props: {items},
        controller: MappedRpc(items),
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
