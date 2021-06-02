import { Rejectable } from "@dabsi/common/async/Rejectable";
import { ExtractDefault } from "@dabsi/common/typings2/boolean/index";
import { Expect } from "@dabsi/common/typings2/Expect";
import { Override } from "@dabsi/common/typings2/Override";
import { DataRow } from "@dabsi/typedata/row";
import { DataSource } from "@dabsi/typedata/source";
import { ConfigFactory } from "@dabsi/old-typerpc/ConfigFactory";
import { DataManagerHandler } from "@dabsi/old-typerpc/data-manager/DataManagerHandler";
import { GenericConfig } from "@dabsi/old-typerpc/GenericConfig";
import { AnyInput, InputValue } from "@dabsi/old-typerpc/input/Input";
import { NoRpc } from "@dabsi/old-typerpc/NoRpc";
import { AnyRpc, RpcType, RpcUnresolvedConfig } from "@dabsi/old-typerpc/Rpc";
import { RpcFn } from "@dabsi/old-typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/old-typerpc/rpc-map/RpcMap";
import { RpcParameter } from "@dabsi/old-typerpc/rpc-parameter/rpc";
import { RpcConfigHook } from "@dabsi/old-typerpc/RpcConfigHook";
import { AnyDataTable } from "@dabsi/old-typerpc/data-table/rpc";
import { Form } from "@dabsi/old-typerpc/widget/form/rpc";
import { WidgetType } from "@dabsi/old-typerpc/widget/Widget";
import { PartialConfigKeys } from "@dabsi/old-typerpc/Config";
import { Old_DataTableOf } from "@dabsi/old-typerpc/data-table/rpc";

// Full<Type>Stack
export type TDataManager = {
  Data: any;

  Table: AnyDataTable;

  Edit: AnyRpc;

  AddInput: AnyInput;

  AddError: any;
};

interface _Types<T extends TDataManager> {
  Table: Old_DataTableOf<T["Table"], T["Data"]>;

  TableTypes: WidgetType<_Types<T>["Table"]>["Types"];

  TableConfig: PartialConfigKeys<_Types<T>["TableTypes"], "source">;

  AddForm: Form<{
    Error: T["AddError"];
    Value: string;
    Input: T["AddInput"];
  }>;

  OptionalConfig: {
    addInputConfig: RpcUnresolvedConfig<T["AddInput"]>;

    editConfigFactory: ConfigFactory<
      RpcUnresolvedConfig<T["Edit"]>,
      [row: DataRow<T["Data"]>]
    >;
  };
  RequiredConfig: {
    source: DataSource<T["Data"]>;

    tableConfig: _Types<T>["TableConfig"];

    addSubmit: Rejectable<InputValue<T["AddInput"]>, string, T["AddError"]>;
  };
}
export type DataManagerConfig2<T extends TDataManager> = PartialConfigKeys<
  _Types<T>
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

    table: T["Table"];

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
export type TDataManagerOptions = {
  addInput: AnyInput;
  addError?: any;
  table: AnyDataTable;
  edit?: AnyRpc;
};

export type DataManagerOptions<T extends TDataManagerOptions> = T;

export type TDataManagerFromOptions<T extends TDataManagerOptions> = Expect<
  TDataManager,
  {
    Data: any;

    AddInput: T["addInput"];

    AddError: Exclude<T["addError"], undefined>;

    Table: T["table"];

    Edit: ExtractDefault<T["edit"], AnyRpc, NoRpc>;
  }
>;

export function DataManager<T extends TDataManagerOptions>(
  options: DataManagerOptions<T>
): DataManager<TDataManagerFromOptions<T>> {
  const {
    edit = NoRpc,
    table,
    addInput,
  } = options as DataManagerOptions<TDataManagerOptions>;
  return <any>RpcConfigHook<AnyDataManager>({
    isGenericConfig: true,
    handler: DataManagerHandler,
    target: RpcMap({
      delete: RpcFn<(key: string) => void>(),
      table: table as AnyDataTable,
      add: Form({
        input: addInput as AnyInput,
      }),
      edit: RpcParameter(String, edit),
    }),
  });
}
