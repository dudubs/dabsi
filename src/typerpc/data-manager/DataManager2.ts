import { OmitKeys } from "../../common/typings2/OmitKeys";
import { Override } from "../../common/typings2/Override";
import { PartialUndefinedKeys } from "../../common/typings2/PartialUndefinedKeys";
import { UndefinedIfIsUndefined } from "../../common/typings2/UndefinedIfIsUndefined";
import { DataRow } from "../../typedata/DataRow";
import { DataSource } from "../../typedata/DataSource";
import { GenericConfig } from "../GenericConfig";
import { AnyInput, InputValue } from "../input/Input";
import { NoRpc } from "../NoRpc";
import { AnyRpc, RpcConnection, RpcType, RpcUnresolvedConfig } from "../Rpc";
import { RpcFn } from "../rpc-fn/RpcFn";
import { RpcMap } from "../rpc-map/RpcMap";
import { RpcParameter } from "../rpc-parameter/RpcParameter";
import { RpcConfigHook } from "../RpcConfigHook";
import { DataTable, DataTableOptions } from "../widget/data-table/DataTable";
import { Form } from "../widget/form/Form";
import { InlineObject, InlineObjectType } from "../widget/InlineObjectType";
import { WidgetType } from "../widget/Widget";
import { ConfigFactory } from "./../ConfigFactory";
import { RpcConfig } from "./../Rpc";
import { DataManagerHandler2 } from "./DataManagerHandler2";
import { Rejectable } from "./Rejectable";

// Full<Type>Stack
export type TDataManager2 = {
  Data: any;

  TableRowController: AnyRpc;

  TableRow: any;

  Edit: AnyRpc;

  AddInput: AnyInput;

  AddError: any;
};

type _Types<T extends TDataManager2> = {
  Table: DataTable<{
    Row: T["TableRow"];
    RowController: T["TableRowController"];
    Data: T["Data"];
  }>;

  TableTypes: WidgetType<_Types<T>["Table"]>["Types"];

  TableConfig:
    | PartialUndefinedKeys<
        OmitKeys<_Types<T>["TableTypes"]["OptionalConfig"], "columns"> &
          OmitKeys<_Types<T>["TableTypes"]["RequiredConfig"], "source">
      >
    | undefined;

  AddForm: Form<{
    Error: T["AddError"];
    Value: string;
    Input: T["AddInput"];
  }>;
};
export type DataManagerConfig2<T extends TDataManager2> = PartialUndefinedKeys<
  {
    addInputConfig: RpcUnresolvedConfig<T["AddInput"]>;

    editConfigFactory: ConfigFactory<
      RpcUnresolvedConfig<T["Edit"]>,
      [row: DataRow<T["Data"]>]
    >;

    tableColumns: _Types<T>["TableTypes"]["ColumnConfigMap"];
  },
  {
    source: DataSource<T["Data"]>;

    test?(x: RpcConnection<T["Edit"]>);
    tableConfig?: _Types<T>["TableConfig"];

    addSubmit: Rejectable<InputValue<T["AddInput"]>, string, T["AddError"]>;
  }
>;

export type AnyDataManager2 = DataManager2<TDataManager2>;

export type DataManagerTypes2<T extends TDataManager2> = _Types<T>;
export type DataManagerType<
  T extends AnyDataManager2
> = RpcType<T>["TConfigHook"]["TDataManager"];

export type DataManager2<T extends TDataManager2> = RpcConfigHook<{
  TDataManager: T;

  Target: RpcMap<{
    delete: RpcFn<(key: string) => void>;

    table: _Types<T>["Table"];

    add: _Types<T>["AddForm"];

    edit: RpcParameter<{
      Data: string;
      Target: T["Edit"];
    }>;
  }>;
  Config: GenericConfig<
    <Data>(
      config: DataManagerConfig2<Override<T, { Data: Data }>>
    ) => DataManagerConfig2<T>
  >;
}>;

export function DataManager2<
  TableRowType extends InlineObject,
  AddInput extends AnyInput,
  AddError = never,
  Edit extends AnyRpc = NoRpc,
  TableRowController extends AnyRpc = NoRpc
>(options: {
  addInput: AddInput;
  addError?: AddError;

  tableRowType: TableRowType;
  tableOptions?: DataTableOptions<TableRowController>;

  edit?: Edit;
}): DataManager2<{
  Data: any;

  TableRowController: TableRowController;
  TableRow: InlineObjectType<TableRowType>;
  AddError: AddError;
  AddInput: AddInput;
  Edit: Edit;
}> {
  return <any>RpcConfigHook<AnyDataManager2>({
    isGenericConfig: true,
    handler: DataManagerHandler2,
    target: RpcMap({
      delete: RpcFn<(key: string) => void>(),

      table: DataTable(
        options.tableRowType as any,
        options.tableOptions as DataTableOptions<AnyRpc>
      ),

      add: Form({
        input: options.addInput,
      }),

      edit: RpcParameter(String, options.edit || NoRpc),
    }),
  });
}
