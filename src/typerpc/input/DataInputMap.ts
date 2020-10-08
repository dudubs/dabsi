import { mapArrayToObject } from "../../common/array/mapArrayToObject";
import { WithMetaType } from "../../common/MetaType";
import { Awaitable } from "../../common/typings";
import { DataRow } from "../../data/DataRow";
import { DataParameter } from "../DataParameter";
import { NoRpc } from "../NoRpc";
import { AnyRpc, RpcConfig } from "../Rpc";
import { RpcGenericConfigFn } from "../RpcGenericConfig";
import { RpcMap } from "../RpcMap";
import { DataTable, DataTableOptions } from "../widget/DataTable";
import { AnyRowType, Row, string } from "../widget/Row";
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

export type DataInputMap<T extends AnyInput, Row> = WithMetaType<{
  DataInputMapRow: Row;
}> &
  Input<{
    Target: T;

    DataInput: T;

    Data: Record<string, InputData<T>>;

    Value: Record<string, InputValue<T>>;

    ValueElement: {
      value: InputValueElement<T>;
      row: DataInputRow & Row;
    }[];

    Props: {
      target: T;
      table: DataInputTable<Row>;
    };

    Element: {
      children: {
        row: DataInputRow & Row;
        target: WidgetElement<T>;
      }[];
    };

    Config: RpcGenericConfigFn<
      <D>(
        config: DataInputMapConfig<T, Row, D>
      ) => DataInputMapConfig<T, Row, any>
    >;

    Error:
      | { children: Record<string, InputError<T>> }
      | {
          invalidKeys: string[];
        };

    Controller: RpcMap<{
      table: DataInputTable<Row>;
      row: DataParameter<T>;
    }>;
  }>;

export type DataInputMapConfig<T extends AnyInput, R, D> = BaseDataInputConfig<
  R,
  {
    targetConfig: RpcConfig<T>;
  },
  {
    getTargetValue: (row: DataRow<D>) => Awaitable<InputValue<InputValue<T>>>;
  },
  D
>;

export function DataInputMap<
  T extends AnyInput,
  RowType extends AnyRowType = {
    label: typeof string;
  },
  RowController extends AnyRpc = NoRpc
>(
  target: T,
  options?: { rowType?: RowType; rowController?: RowController }
): DataInputMap<T, Row<RowType>> {
  const controller = RpcMap({
    table: DataTable(options?.rowType || { label: string }),
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
      return mapArrayToObject(values, value => [
        value.row.$key,
        this.target.props.getDataFromValueElement(value),
      ]);
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
}
