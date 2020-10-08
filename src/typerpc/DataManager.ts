import { MetaType, WithMetaType } from "../common/MetaType";
import { FnRef } from "../common/patterns/FnRef";
import {
  AnyTyping,
  Awaitable,
  If,
  IsEmptyObject,
  OmitKeys,
  PartialUndefinedKeys,
  TypingType,
} from "../common/typings";
import { DataRow } from "../data/DataRow";
import { DataSource } from "../data/DataSource";
import { Command } from "./Command";
import { DataManagerHandler } from "./DataManagerHandler";
import { DataParameter } from "./DataParameter";
import { AnyInput, InputValue } from "./input/Input";
import { NoRpc } from "./NoRpc";
import { AnyRpc, RpcConfig } from "./Rpc";
import { RpcConfigurator, RpcGenericConfigurator } from "./RpcConfigurator";
import { RpcConfigFactory2 } from "./RpcGenericConfig";
import { RpcMap } from "./RpcMap";
import {
  DataTable,
  DataTableConfig,
  DataTableOptions,
} from "./widget/DataTable";
import { ElementWidget } from "./widget/ElementWidget";
import { Form, FormInput } from "./widget/Form";
import { AnyRowType, Row } from "./widget/Row";
import { TabsWidget } from "./widget/TabsWidget";
import { AnyWidgetMap } from "./widget/WidgetMap";

// Full<Type>Stack
export type TDataManager = {
  EditInput: AnyInput;

  EditError: any;

  AddInput: AnyInput;

  AddError: any;

  Tabs: AnyWidgetMap;

  TableRow: any;

  TableRowController: AnyRpc;
};

export type DataManagerConfig<
  T extends TDataManager,
  D,
  Types extends DataManagerTypes<T> = DataManagerTypes<T>
> = PartialUndefinedKeys<
  {
    getTabsConfig:
      | RpcConfigFactory2<DataRow<D>, TabsWidget<T["Tabs"]>>
      | If<IsEmptyObject<T["Tabs"]>, undefined>;

    addInputConfig: RpcConfig<FormInput<Types["AddForm"]>>;

    editInputConfig: RpcConfig<FormInput<Types["EditForm"]>>;
  },
  {
    getValueFromDataRow: (
      row: DataRow<D>
    ) => InputValue<FormInput<Types["EditForm"]>>;

    source: DataSource<D>;

    getTitle: (row: DataRow<D>) => string;

    tableConfig: OmitKeys<
      DataTableConfig<T["TableRow"], T["TableRowController"], D>,
      "source"
    >;

    addSubmit: RpcConfig<Types["AddForm"]>["submit"];

    editSubmit: (
      row: DataRow<D>,
      value: InputValue<FormInput<Types["EditForm"]>>
    ) => Awaitable;
  }
>;

export type AnyDataManager = DataManager<TDataManager>;

export type DataManagerType<T extends AnyDataManager> = MetaType<
  T
>["TDataManager"];

export type DataManagerTypes<T extends TDataManager> = {
  Table: DataTable<T["TableRow"], T["TableRowController"]>;

  EditForm: Form<null, T["EditError"], T["EditInput"]>;

  AddForm: Form<string, T["AddError"], T["AddInput"]>;

  TabsWidget: TabsWidget<
    {
      Form: DataManagerTypes<T>["EditForm"];
    } & T["Tabs"]
  >;
};

export type DataManager<
  T extends TDataManager,
  Types extends DataManagerTypes<T> = DataManagerTypes<T>
> = WithMetaType<{ TDataManager: T }> &
  RpcGenericConfigurator<
    RpcMap<
      {
        delete: Command<(key: string) => void>;

        Table: DataManagerTypes<T>["Table"];
        Add: DataManagerTypes<T>["AddForm"];
        Edit: DataParameter<
          ElementWidget<
            {
              title: string;
            },
            DataManagerTypes<T>["TabsWidget"]
          >
        >;
      },
      {
        editInput: T["EditInput"];
      }
    >,
    <D>(config: DataManagerConfig<T, D>) => DataManagerConfig<T, any, any>
  >;

export function DataManager<
  TableRowType extends AnyRowType,
  AddErrorType extends AnyTyping,
  EditErrorType extends AnyTyping,
  AddInput extends AnyInput,
  EditInput extends AnyInput = AddInput,
  TableRowController extends AnyRpc = NoRpc,
  Tabs extends AnyWidgetMap = {}
>(options: {
  tableRowType: TableRowType;
  tableOptions?: DataTableOptions<TableRowController>;
  addError?: AddErrorType;
  editError?: EditErrorType;
  addInput: AddInput;
  editInput?: EditInput;
  tabs?: Tabs;
}): DataManager<{
  TableRow: Row<TableRowType>;
  TableRowController: TableRowController;
  AddError: TypingType<AddErrorType>;
  AddInput: AddInput;
  EditError: TypingType<EditErrorType>;
  EditInput: EditInput;
  Tabs: Tabs;
}> {
  const editInput: AnyInput = options.editInput || options.addInput;

  return <any>RpcConfigurator<AnyDataManager>(
    RpcMap(
      {
        delete: Command<(key: string) => void>(),

        Table: DataTable(options.tableRowType, options.tableOptions),

        Add: Form<string>()(options.addInput as AnyInput),

        Edit: DataParameter(
          ElementWidget<{ title: string }>()(
            TabsWidget({
              Form: Form<null>()(editInput),
              ...(options.tabs as {}),
            })
          )
        ),
      },
      {
        editInput,
      }
    ),
    DataManagerHandler
  );
}
