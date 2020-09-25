import { RpcConfig } from "../Rpc";
import { RpcMap } from "../RpcMap";
import { MapWidgets } from "../widget/WidgetMap";
import { AnyInput, Input, InputType, TInput } from "./Input";
import { InputMapContext } from "./InputMapContext";

// DataParameterConfig

export type AnyInputMap = Record<string, AnyInput>;

export type MapInputs<T extends AnyInputMap, P extends keyof TInput> = {
  [K in keyof T]: InputType<T[K]>[P];
};

export type InputMap<T extends AnyInputMap> = Input<{
  Items: T;

  Controller: RpcMap<T>;
  Props: {};
  Element: MapWidgets<T, "Element">;
  Config: RpcConfig<RpcMap<T>>;
  Error: MapInputs<T, "Error">;
  Data: MapInputs<T, "Data">;
  Value: MapInputs<T, "Value">;
  ValueElement: MapInputs<T, "ValueElement">;
}>;

//

export function InputMap<T extends AnyInputMap>(items: T): InputMap<T> {
  return <any>Input<InputMap<AnyInputMap>>({
    controller: RpcMap(items),
    context: InputMapContext,
  });
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
