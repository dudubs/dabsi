import { mapObject } from "../../common/object/mapObject";
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
  Props: {
    items: T;
  };
  Element: {
    items: MapWidgets<T, "Element">;
  };
  Config: RpcConfig<RpcMap<T>>;
  Error: { items: MapInputs<T, "Error"> };
  Data: MapInputs<T, "Data">;
  Value: MapInputs<T, "Value">;
  ValueElement: MapInputs<T, "ValueElement">;
}>;

//

export function InputMap<T extends AnyInputMap>(items: T): InputMap<T> {
  return <any>Input<InputMap<AnyInputMap>>({
    props: {
      items,
    },
    controller: RpcMap(items),
    context: InputMapContext,
    getValueElementFromElement({ items }) {
      return mapObject(items, (itemElement, itemKey) =>
        this.items[itemKey].props.getValueElementFromElement(itemElement)
      );
    },
    getDataFromValueElement(keyToValue) {
      return mapObject(keyToValue, (itemValue, itemKey) => {
        return this.items[itemKey].props.getDataFromValueElement(itemValue);
      });
    },
  });
}
