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
      label: string;
    }
  >;

  Value: Record<string, InputValue<I>>;

  Props: {
    readonly target: I;
  };

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

  Error: { items: Record<string, InputError<I>> };

  Controller: DataParameter<I>;
}>;

export function DataInputMap<I extends AnyInput>(target: I): DataInputMap<I> {
  return <any>Input<DataInputMap<AnyInput>>({
    props: {
      target,
    },
    isGenericConfig: true,
    controller: DataParameter(target),
    context: DataInputMapContext,
    getDataFromValueElement(keyToValue) {
      return mapObject(keyToValue, (value) =>
        this.target.props.getDataFromValueElement(value.value)
      );
    },
    getValueElementFromElement(keyToItem) {
      return mapObject(keyToItem, (item) => {
        return {
          label: item.label,
          value: this.controller.target.props.getValueElementFromElement(
            item.input
          ),
        };
      });
    },
  });
}
