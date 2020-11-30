import { testMetaType } from "../../common/MetaType";
import { Awaitable } from "../../common/typings2/Async";
import { If } from "../../common/typings2/boolean";
import { IsEmptyObject } from "../../common/typings2/boolean/IsEmptyObject";
import { OmitKeys } from "../../common/typings2/OmitKeys";
import { Override } from "../../common/typings2/Override";
import { PartialUndefinedKeys } from "../../common/typings2/PartialUndefinedKeys";
import { UndefinedIfIsUndefined } from "../../common/typings2/UndefinedIfIsUndefined";
import { DataRow } from "../../typedata/DataRow";
import { DataSource } from "../../typedata/DataSource";
import { ConfigFactory } from "../ConfigFactory";
import { GenericConfig } from "../GenericConfig";

import { AnyInput, InputValue, InputValueConfig } from "../input/Input";
import { NoRpc } from "../NoRpc";
import { AnyRpc, RpcConfig, RpcType, RpcUnresolvedConfig } from "../Rpc";
import { RpcFn } from "../rpc-fn/RpcFn";
import { RpcMap } from "../rpc-map/RpcMap";
import { AnyRpcParameter, RpcParameter } from "../rpc-parameter/RpcParameter";
import { RpcConfigHook } from "../RpcConfigHook";
import {
  AnyDataTable,
  DataTable,
  DataTableOptions,
} from "../widget/data-table/DataTable";
import { Form } from "../widget/form/Form";
import { InlineObject, InlineObjectType } from "../widget/InlineObjectType";
import { TabsWidget } from "../widget/tabs-widget/TabsWidget";
import { WidgetType } from "../widget/Widget";
import { AnyWidgetRecord } from "../widget/widget-map/WidgetMap";
import { WidgetExtra } from "../widget/WidgetExtra";
import { DataManagerHandler } from "./DataManagerHandler";

// Full<Type>Stack
export type TDataManager = {
  Data: any;

  TableRowController: AnyRpc;

  TableRow: any;

  EditInput: AnyInput;

  EditTabs: AnyWidgetRecord;

  EditError: any;

  AddInput: AnyInput;

  AddError: any;
};

export type DataManagerConfig<T extends TDataManager> = PartialUndefinedKeys<
  {
    getTabsConfigForRow:
      | ConfigFactory<_Types<T>["EditTabsConfig"], [DataRow<T["Data"]>]>
      | If<IsEmptyObject<T["EditTabs"]>, undefined>;

    addInputConfig: RpcUnresolvedConfig<T["AddInput"]>;

    editInputConfigForRow:
      | ConfigFactory<RpcUnresolvedConfig<T["EditInput"]>, [DataRow<T["Data"]>]>
      | UndefinedIfIsUndefined<RpcUnresolvedConfig<T["EditInput"]>>;

    tableColumnsConfig: _Types<T>["TableTypes"]["ColumnConfigMap"];
  },
  {
    source: DataSource<T["Data"]>;

    getTitleForRow: (row: DataRow<T["Data"]>) => string;

    editValueConfigForRow?: ConfigFactory<
      InputValueConfig<T["EditInput"]>,
      [row: DataRow<T["Data"]>]
    >;

    tableConfig?: _Types<T>["TableConfig"];

    addSubmit: RpcConfig<_Types<T>["AddForm"]>["submit"];

    editSubmit: (
      row: DataRow<T["Data"]>,
      value: InputValue<T["EditInput"]>
    ) => Awaitable;
  }
>;

export type AnyDataManager = DataManager<TDataManager>;

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

  EditForm: Form<{
    Value: null;
    Error: T["EditError"];
    Input: T["EditInput"];
  }>;

  AddForm: Form<{
    Value: string;
    Error: T["AddError"];
    Input: T["AddInput"];
  }>;

  EditTabsWithForm: T["EditTabs"] & {
    form: _Types<T>["EditForm"];
  };

  EditTabsWidget: TabsWidget<_Types<T>["EditTabsWithForm"]>;

  EditTabsConfig: {
    [K in keyof T["EditTabs"]]: RpcUnresolvedConfig<T["EditTabs"][K]>;
  };
};
export type DataManagerTypes<T extends TDataManager> = _Types<T>;
export type DataManagerType<
  T extends AnyDataManager
> = RpcType<T>["TConfigHook"]["TDataManager"];

export type DataManager<T extends TDataManager> = RpcConfigHook<{
  TDataManager: T;

  Props: {
    editInput: AnyInput;
    editTabs: AnyWidgetRecord;
  };

  Target: RpcMap<{
    delete: RpcFn<(key: string) => void>;

    table: _Types<T>["Table"];

    add: _Types<T>["AddForm"];

    edit: RpcParameter<{
      Data: string;
      Target: WidgetExtra<
        _Types<T>["EditTabsWidget"],
        {
          title: string;
        }
      >;
    }>;
  }>;
  Config: GenericConfig<
    <Data>(
      config: DataManagerConfig<Override<T, { Data: Data }>>
    ) => DataManagerConfig<T>
  >;
}>;

export function DataManager<
  TableRowType extends InlineObject,
  AddInput extends AnyInput,
  AddError = never,
  EditError = never,
  EditInput extends AnyInput = AddInput,
  TableRowController extends AnyRpc = NoRpc,
  EditTabs extends AnyWidgetRecord = {}
>(options: {
  addInput: AddInput;
  addError?: AddError;

  tableRowType: TableRowType;
  tableOptions?: DataTableOptions<TableRowController>;

  editError?: EditError;
  editInput?: EditInput;
  editTabs?: EditTabs;
}): DataManager<{
  Data: any;
  TableRowController: TableRowController;
  TableRow: InlineObjectType<TableRowType>;
  AddError: AddError;
  AddInput: AddInput;
  EditError: EditError;
  EditInput: EditInput;
  EditTabs: EditTabs;
}> {
  const editInput: AnyInput = options.editInput || options.addInput;
  const editTabs = {
    ...(options.editTabs as AnyWidgetRecord),
    form: Form({ input: editInput }),
  };
  return <any>RpcConfigHook<AnyDataManager>({
    props: {
      editInput,
      editTabs,
    },
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

      edit: RpcParameter(
        String,
        WidgetExtra(TabsWidget(editTabs), {
          title: String,
        })
      ),
    }),
  });
}
