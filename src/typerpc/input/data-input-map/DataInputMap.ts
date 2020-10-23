import { mapArrayToObject } from "../../../common/array/mapArrayToObject";
import { WithMetaType } from "../../../common/MetaType";
import { Awaitable, Override } from "../../../common/typings";
import { DataRow } from "../../../data/DataRow";
import { DataParameter } from "../../parameter/DataParameter";
import { NoRpc } from "../../NoRpc";
import { RpcConfigOld } from "../../old/Old";
import { AnyRpc, RpcUnresolvedConfig } from "../../Rpc";
import { GenericConfig } from "../../GenericConfig";
import { RpcMap } from "../../RpcMap";
import { DataTable, DataTableOptions } from "../../widget/data-table/DataTable";
import { AnyRowType, Row, string } from "../../widget/Row";
import { WidgetElement } from "../../widget/Widget";
import {
  BaseDataInputConfig,
  DataInputRow,
  DataInputTable,
} from "../data-input/DataInput";
import { DataInputMapContext } from "./DataInputMapContext";
import {
  AnyInput,
  Input,
  InputValueData,
  InputError,
  InputValue,
  InputValueElement,
} from "../Input";

export type AnyDataInputMap = DataInputMap<TDataInputMap>;

export type TDataInputMap = {
  Target: AnyInput;
  Row: object;
  Data: any;
};
export type DataInputMap<
  T extends TDataInputMap,
  Target extends AnyInput = T["Target"],
  Row = T["Row"]
> = WithMetaType<{
  DataInputMapRow: Row;
}> &
  Input<{
    Commands: {};

    Target: Target;

    DataInput: Target;

    ValueData: Record<string, InputValueData<Target>>;

    Value: Record<string, InputValue<Target>>;

    ValueElement: {
      value: InputValueElement<Target>;
      row: DataInputRow & Row;
    }[];

    Props: {
      target: Target;
      table: DataInputTable<Row>;
    };

    Element: {
      children: {
        row: DataInputRow & Row;
        target: WidgetElement<Target>;
      }[];
    };

    Config: GenericConfig<
      <D>(
        config: DataInputMapConfig<Override<T, { Data: D }>>
      ) => DataInputMapConfig<T>
    >;

    Error:
      | { children: Record<string, InputError<Target>> }
      | {
          invalidKeys: string[];
        };

    Controller: RpcMap<{
      table: DataInputTable<Row>;
      row: DataParameter<Target>;
    }>;
  }>;

export type DataInputMapConfig<
  T extends TDataInputMap,
  Target extends AnyInput = T["Target"],
  Row = T["Row"],
  Data = T["Data"]
> = BaseDataInputConfig<
  T,
  {
    targetConfig: RpcUnresolvedConfig<Target>;
  },
  {
    getTargetValue: (
      row: DataRow<Data>
    ) => Awaitable<InputValue<InputValue<Target>>>;
  }
>;

export function DataInputMap<
  Target extends AnyInput,
  RowType extends AnyRowType = {
    label: typeof string;
  },
  RowController extends AnyRpc = NoRpc
>(
  target: Target,
  options?: { rowType?: RowType; rowController?: RowController }
): DataInputMap<{
  Target: Target;
  Row: Row<RowType>;
  Data: any;
}> {
  const controller = RpcMap({
    table: DataTable(options?.rowType || { label: string }),
    row: DataParameter(target),
  });
  return <any>Input<AnyDataInputMap>({
    props: {
      target,
      table: controller.props.items.table,
    },
    isGenericConfig: true,
    controller,
    context: DataInputMapContext,
    getValueData(values) {
      return mapArrayToObject(values, value => [
        value.row.$key,
        this.target.props.getValueData(value),
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
