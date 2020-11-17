import { Awaitable } from "../../common/typings2/Async";
import { If } from "../../common/typings2/boolean";
import { IsEmptyObject } from "../../common/typings2/boolean/IsEmptyObject";
import { OmitKeys } from "../../common/typings2/OmitKeys";
import { Override } from "../../common/typings2/Override";
import { PartialUndefinedKeys } from "../../common/typings2/PartialUndefinedKeys";
import { DataRow } from "../../typedata/DataRow";
import { DataSource } from "../../typedata/DataSource";
import { ConfigFactory } from "../ConfigFactory";
import { GenericConfig } from "../GenericConfig";

import { AnyInput, InputValue } from "../input/Input";
import { NoRpc } from "../NoRpc";
import { AnyRpc, RpcConfig, RpcType, RpcUnresolvedConfig } from "../Rpc";
import { RpcFn } from "../rpc-fn/RpcFn";
import { RpcMap } from "../rpc-map/RpcMap";
import { RpcParameter } from "../rpc-parameter/RpcParameter";
import { RpcConfigHook } from "../RpcConfigHook";
import { DataTable, DataTableOptions } from "../widget/data-table/DataTable";
import { Form, FormType } from "../widget/form/Form";
import { InlineWidget } from "../widget/inline-widget/InlineWidget";
import { AnyRowType, Row } from "../widget/Row";
import { TabsWidget } from "../widget/tabs-widget/TabsWidget";
import { WidgetType } from "../widget/Widget";
import { AnyWidgetRecord } from "../widget/widget-map/WidgetMap";
import { DataManagerHandler } from "./DataManagerHandler";

// Full<Type>Stack
export type TDataManager = {
  Data: any;

  TableRowController: AnyRpc;

  TableRow: any;

  EditInput: AnyInput;

  EditError: any;

  AddInput: AnyInput;

  AddError: any;

  EditTabs: AnyWidgetRecord;
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
        _Types<T>["TableTypes"]["OptionalConfig"] &
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

  EditTabsWithForm: Override<
    T["EditTabs"],
    {
      form: _Types<T>["EditForm"];
    }
  >;

  EditTabsWidget: TabsWidget<_Types<T>["EditTabsWithForm"]>;
};
export type DataManagerConfig<T extends TDataManager> = PartialUndefinedKeys<
  {
    getTabsConfig:
      | ConfigFactory<
          RpcUnresolvedConfig<_Types<T>["EditTabsWidget"]>,
          [DataRow<T["Data"]>]
        >
      | If<IsEmptyObject<T["EditTabs"]>, undefined>;

    addInputConfig: RpcUnresolvedConfig<T["AddInput"]>;

    editInputConfig: RpcUnresolvedConfig<T["EditInput"]>;
  },
  {
    getValueFromDataRow: (
      row: DataRow<T["Data"]>
    ) => InputValue<FormType<_Types<T>["EditForm"]>["Input"]>;

    source: DataSource<T["Data"]>;

    getTitle: (row: DataRow<T["Data"]>) => string;

    tableConfig: _Types<T>["TableConfig"];

    addSubmit: RpcConfig<_Types<T>["AddForm"]>["submit"];

    editSubmit: (
      row: DataRow<T["Data"]>,
      value: InputValue<FormType<_Types<T>["EditForm"]>["Input"]>
    ) => Awaitable;
  }
>;

export type AnyDataManager = DataManager<TDataManager>;

export type DataManagerTypes<T extends TDataManager> = _Types<T>;

export type DataManagerType<T extends AnyDataManager> = RpcType<
  T
>["TConfigHook"]["TDataManager"];
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
      Target: InlineWidget<{
        Target: _Types<T>["EditTabsWidget"];
        Controller: NoRpc;
        Element: { title: string };
      }>;
    }>;
  }>;
  Config: GenericConfig<
    <Data>(
      config: DataManagerConfig<Override<T, { Data: Data }>>
    ) => DataManagerConfig<T>
  >;
}>;

export function DataManager<
  TableRowType extends AnyRowType,
  AddError,
  EditError,
  AddInput extends AnyInput,
  EditInput extends AnyInput = AddInput,
  TableRowController extends AnyRpc = NoRpc,
  EditTabs extends AnyWidgetRecord = {}
>(options: {
  tableRowType: TableRowType;
  tableOptions?: DataTableOptions<TableRowController>;
  addError?: AddError;
  editError?: EditError;
  addInput: AddInput;
  editInput?: EditInput;
  editTabs?: EditTabs;
}): DataManager<{
  TableRowController: TableRowController;
  TableRow: Row<TableRowType>;
  Data: any;
  AddError: AddError;
  AddInput: AddInput;
  EditError: EditError;
  EditInput: EditInput;
  EditTabs: EditTabs;
}> {
  const editInput: AnyInput = options.editInput || options.addInput;
  const editTabs = {
    form: Form({ input: editInput }),
    ...(options.editTabs as {}),
  } as AnyWidgetRecord;
  return <any>RpcConfigHook<AnyDataManager>({
    props: {
      editInput,
      editTabs,
    },
    isGenericConfig: true,
    handler: DataManagerHandler,
    target: RpcMap({
      delete: RpcFn<(key: string) => void>(),

      table: DataTable(options.tableRowType, options.tableOptions),

      add: Form({
        input: options.addInput,
      }),

      edit: RpcParameter(
        String,
        InlineWidget({
          target: TabsWidget(editTabs),
        })
      ),
    }),
  });
}
