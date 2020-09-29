import { mapObject } from "../../common/object/mapObject";
import { Awaitable } from "../../common/typings";
import { DataRow } from "../../data/DataRow";
import { DataSelection } from "../../data/DataSelection";
import { DataSelectionRow } from "../../data/DataSelectionRow";
import { DataParameter } from "../DataParameter";
import { RpcConfig } from "../Rpc";
import { RpcGenericConfigFn } from "../RpcGenericConfig";
import { RpcMap } from "../RpcMap";
import { DataTable } from "../widget/DataTable";
import { WidgetElement } from "../widget/Widget";
import { BaseDataInputConfig, DataInputRow, DataInputTable } from "./DataInput";
import { DataInputMapContext } from "./DataInputMapContext";
import {
  AnyInput,
  Input,
  InputData,
  InputError,
  InputValue,
  InputValueElement,
} from "./Input";

export type AnyDataInputMap = DataInputMap<AnyInput, any>;

export type DataInputMap<T extends AnyInput, R> = Input<{
  Target: T;

  DataInput: T;

  Data: Record<string, InputData<T>>;

  Value: Record<string, InputValue<T>>;

  ValueElement: {
    value: InputValueElement<T>;
    row: DataInputRow & R;
  }[];

  Props: {
    target: T;
    table: DataInputTable<R>;
  };

  Element: {
    children: {
      row: DataInputRow & R;
      target: WidgetElement<T>;
    }[];
  };

  Config: RpcGenericConfigFn<
    <D, DS extends DataSelection<D> = {}>(
      config: DataInputMapConfig<T, R, D, DS>
    ) => DataInputMapConfig<T, R, any, any>
  >;

  Error:
    | { children: Record<string, InputError<T>> }
    | {
        invalidKeys: string[];
      };

  Controller: RpcMap<{
    table: DataInputTable<R>;
    row: DataParameter<T>;
  }>;
}>;

export type DataInputMapConfig<
  T extends AnyInput,
  R,
  D,
  DS extends DataSelection<D>
> = BaseDataInputConfig<
  R,
  {
    targetConfig: RpcConfig<T>;
  },
  {
    getTargetValue: (
      row: DataRow<DataSelectionRow<D, DS>>
    ) => Awaitable<InputValue<InputValue<T>>>;
  },
  D,
  DS
>;

export function DataInputMap<R = {}>() {
  return <T extends AnyInput>(target: T): DataInputMap<T, R> => {
    const controller = RpcMap({
      table: DataTable()(),
      row: DataParameter(target),
    });
    return <any>Input<DataInputMap<AnyInput, any>>({
      props: {
        target,
        table: controller.props.items.table,
      },
      isGenericConfig: true,
      controller,
      context: DataInputMapContext,
      getDataFromValueElement(values) {
        return values.map((value) => value.row.$key);
      },
      getValueElementFromElement(element) {
        return element.children.map(({ row, target }) => {
          return {
            row,
            value: this.target.props.getValueElementFromElement(target),
          };
        });
      },
    });
  };
}
