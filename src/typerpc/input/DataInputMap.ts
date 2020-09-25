import { mapObject } from "../../common/object/mapObject";
import { Awaitable } from "../../common/typings";
import { DataRow } from "../../data/DataRow";
import { DataSource } from "../../data/DataSource";
import { DataParameter } from "../DataParameter";
import {
  ConfigFactory,
  RpcConfigFactory,
  RpcGenericConfigFn,
} from "../RpcGenericConfig";
import { WidgetElement } from "../widget/Widget";
import { DataInputMapContext } from "./DataInputMapContext";
import {
  AnyInput,
  Input,
  InputData,
  InputValueElement,
  InputError,
  InputValue,
} from "./Input";

export type DataInputMapConfig<I extends AnyInput, T = any> = {
  // TInputValue?: DataRow<T>

  source: DataSource<T>;

  getTargetConfig: RpcConfigFactory<DataRow<T> | undefined, I>;
};

export type DataInputMap<I extends AnyInput> = Input<{
  DataInput: I;

  Data: Record<string, InputData<I>>;

  ValueElement: Record<
    string,
    {
      value: InputValueElement<I>;
      item: { label: string; input: WidgetElement<I> };
    }
  >;

  Value: Record<string, InputValue<I>>;

  Props: {};

  Element: Record<
    string,
    {
      label: string;
      input: WidgetElement<I>;
    }
  >;

  Config: RpcGenericConfigFn<
    <T>(config: DataInputMapConfig<I, T>) => DataInputMapConfig<I>
  >;

  Error: Record<string, InputError<I>>;

  Controller: DataParameter<I>;
}>;

export function DataInputMap<I extends AnyInput>(input: I): DataInputMap<I> {
  return <any>Input<DataInputMap<AnyInput>>({
    isGenericConfig: true,
    controller: DataParameter(input),
    context: DataInputMapContext,
    getDataFromElement(element) {
      return mapObject(element, (item) =>
        this.controller.target.props.getDataFromElement(item.input)
      );
    },
    getValueElementFromElement(keyToItem) {
      return mapObject(keyToItem, (item) => {
        return {
          value: this.controller.target.props.getValueElementFromElement(
            item.input
          ),
          item,
        };
      });
    },
    getElementFromValueElement(element, keyToValue) {
      return mapObject(keyToValue, (value) => {
        return value.item;
      });
    },
  });
}
