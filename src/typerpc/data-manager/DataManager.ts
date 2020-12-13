import { Expect } from "../../common/typings2/Expect";
import { OmitKeys } from "../../common/typings2/OmitKeys";
import { Override } from "../../common/typings2/Override";
import { PartialUndefinedKeys } from "../../common/typings2/PartialUndefinedKeys";
import { DataRow } from "../../typedata/DataRow";
import { DataSource } from "../../typedata/DataSource";
import { GenericConfig } from "../GenericConfig";
import { InputValue } from "../input/Input";
import { NoRpc } from "../NoRpc";
import { AnyRpc, RpcType, RpcUnresolvedConfig } from "../Rpc";
import { RpcFn } from "../rpc-fn/RpcFn";
import { RpcMap } from "../rpc-map/RpcMap";
import { RpcParameter } from "../rpc-parameter/RpcParameter";
import { RpcConfigHook } from "../RpcConfigHook";
import { DataTable, DataTableOptions } from "../widget/data-table/DataTable";
import { Form } from "../widget/form/Form";
import { WidgetType } from "../widget/Widget";
import { ExtractDefault } from "../../common/typings2/boolean/index";
import { TStruct } from "../../struct";
import { StructProps } from "../../struct/Struct";
import { ConfigFactory } from "../ConfigFactory";
import { AnyInput } from "../input/Input";
import { DataManagerHandler } from "./DataManagerHandler";
import { Rejectable } from "../../common/async/Rejectable";

// Full<Type>Stack
export type TDataManager = {
  Data: any;

  TableRowController: AnyRpc;

  TableRow: any;

  Edit: AnyRpc;

  AddInput: AnyInput;

  AddError: any;
};

type _Types<T extends TDataManager> = {
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
export type DataManagerConfig2<T extends TDataManager> = PartialUndefinedKeys<
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

    tableConfig?: _Types<T>["TableConfig"];

    addSubmit: Rejectable<InputValue<T["AddInput"]>, string, T["AddError"]>;
  }
>;

export type AnyDataManager = DataManager<TDataManager>;

export type DataManagerTypes2<T extends TDataManager> = _Types<T>;
export type DataManagerType<
  T extends AnyDataManager
> = RpcType<T>["TConfigHook"]["TDataManager"];

// TDataManagerFromOptions
export type DataManager<T extends TDataManager> = RpcConfigHook<{
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
export type DataManagerStructure = {
  addInput: AnyInput;
  addError?: any;
  tableRowType: TStruct;
  tableRowController?: AnyRpc;
  edit?: AnyRpc;
};

export type DataManagerOptions<T extends DataManagerStructure> = T & {
  tableOptions?: OmitKeys<DataTableOptions<NoRpc>, "rowController">;
};

export type TDataManagerFromStructure<S extends DataManagerStructure> = Expect<
  TDataManager,
  {
    Data: any;

    AddInput: S["addInput"];

    AddError: Exclude<S["addError"], undefined>;

    TableRowController: ExtractDefault<S["tableRowController"], AnyRpc, NoRpc>;

    TableRow: StructProps<S["tableRowType"]>;

    Edit: ExtractDefault<S["edit"], AnyRpc, NoRpc>;
  }
>;

export function DataManager<S extends DataManagerStructure>(
  options: DataManagerOptions<S>
): DataManager<TDataManagerFromStructure<S>> {
  return <any>RpcConfigHook<AnyDataManager>({
    isGenericConfig: true,
    handler: DataManagerHandler,
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
