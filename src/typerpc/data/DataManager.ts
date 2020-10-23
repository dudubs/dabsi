import { MetaType, WithMetaType } from "../../common/MetaType";
import {
  AnyTyping,
  Awaitable,
  If,
  IsEmptyObject,
  OmitKeys,
  Override,
  PartialUndefinedKeys,
  TypingType,
} from "../../common/typings";
import { DataRow } from "../../data/DataRow";
import { DataSource } from "../../data/DataSource";
import { RpcFn } from "../RpcFn";
import { AnyWidget } from "../widget/Widget";
import { DataManagerHandler } from "./DataManagerHandler";
import { DataParameter } from "../parameter/DataParameter";
import { AnyInput, InputValue } from "../input/Input";
import { NoRpc } from "../NoRpc";
import { RpcConfigOld } from "../old/Old";
import { AnyRpc, RpcConfig } from "../Rpc";
import {
  RpcConfigurator,
  RpcGenericConfigurator,
} from "../old/RpcConfigurator";
import { RpcConfigFactory2 } from "../GenericConfig";
import { RpcMap } from "../RpcMap";
import {
  DataTable,
  DataTableConfig,
  DataTableOptions,
  TDataTable,
} from "../widget/data-table/DataTable";
import { ElementWidget } from "../old/ElementWidget";
import { Form, FormInput } from "../widget/form/Form";
import { AnyRowType, Row } from "../widget/Row";
import { TabsWidget } from "../widget/tabs-widget/TabsWidget";

// Full<Type>Stack
export type TDataManager = {
  EditInput: AnyInput;

  EditError: any;

  AddInput: AnyInput;

  AddError: any;

  Tabs: AnyWidgetRecord;

  TTable: TDataTable;
};

export type DataManagerConfig<
  T extends TDataManager,
  Data,
  Types extends DataManagerTypes<T> = DataManagerTypes<T>
> = PartialUndefinedKeys<
  {
    getTabsConfig:
      | RpcConfigFactory2<DataRow<Data>, TabsWidget<T["Tabs"]>>
      | If<IsEmptyObject<T["Tabs"]>, undefined>;

    addInputConfig: RpcConfigOld<FormInput<Types["AddForm"]>>;

    editInputConfig: RpcConfigOld<FormInput<Types["EditForm"]>>;
  },
  {
    getValueFromDataRow: (
      row: DataRow<Data>
    ) => InputValue<FormInput<Types["EditForm"]>>;

    source: DataSource<Data>;

    getTitle: (row: DataRow<Data>) => string;

    tableConfig: OmitKeys<
      DataTableConfig<
        Override<
          T["TTable"],
          {
            Data: Data;
          }
        >
      >,
      "source"
    >;

    addSubmit: RpcConfig<Types["AddForm"]>["submit"];

    editSubmit: (
      row: DataRow<Data>,
      value: InputValue<FormInput<Types["EditForm"]>>
    ) => Awaitable;
  }
>;

export type AnyDataManager = DataManager<TDataManager>;

export type DataManagerType<T extends AnyDataManager> = MetaType<
  T
>["TDataManager"];

export type DataManagerTypes<T extends TDataManager> = {
  Table: DataTable<T["TTable"]>;

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
        delete: RpcFn<(key: string) => void>;

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
  Tabs extends AnyWidgetRecord = {}
>(options: {
  tableRowType: TableRowType;
  tableOptions?: DataTableOptions<TableRowController>;
  addError?: AddErrorType;
  editError?: EditErrorType;
  addInput: AddInput;
  editInput?: EditInput;
  tabs?: Tabs;
}): DataManager<{
  TTable: {
    Row: Row<TableRowType>;
    RowController: TableRowController;
    Data: any;
  };
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

        Table: DataTable<any, AnyRpc>(
          options.tableRowType,
          options.tableOptions
        ),

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
