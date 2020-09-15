import {MetaType, WithMetaType} from "../common/MetaType";
import {
    Awaitable,
    If,
    Is,
    IsEmptyObject,
    PartialUndefinedKeys,
    OmitKeys,
    UndefinedIfEmptyObject
} from "../common/typings";
import {DataRow} from "../data/DataRow";
import {DataSelection} from "../data/DataSelection";
import {DataSource} from "../data/DataSource";
import {DataParameter} from "./DataParameter";
import {AnyInput, InputValue} from "./input/Input";
import {NoRpc} from "./NoRpc";
import {AnyRpc, RpcConfig} from "./Rpc";
import {RpcGenericConfigurator} from "./RpcConfigurator";
import {RpcConfigFactory} from "./RpcGenericConfig";
import {RpcMap} from "./RpcMap";
import {DataTable, DataTableConfig, DataTableOptions} from "./widget/DataTable";
import {ElementWidget} from "./widget/ElementWidget";
import {Form, FormInput} from "./widget/Form";
import {TabsWidget} from "./widget/TabsWidget";
import {WidgetElement} from "./widget/Widget";
import {AnyWidgetMap} from "./widget/WidgetMap";

// Full<Type>Stack
export type TDataManager = {

    EditInput: AnyInput

    EditError: any

    AddInput: AnyInput

    AddError: any

    Tabs: AnyWidgetMap;

    TableRow: any

    TableRowController: AnyRpc


};
export type DataManagerConfig<T extends TDataManager,
    D, TableSelection extends DataSelection<D>,
    Types extends DataManagerTypes<T> = DataManagerTypes<T>> =
    PartialUndefinedKeys<{}, {

        getTabsConfig: RpcConfigFactory<DataRow<D>, TabsWidget<T['Tabs']>>
            | If<IsEmptyObject<T['Tabs']>, undefined>


        addInputConfig:
            UndefinedIfEmptyObject<RpcConfig<Types['AddForm']>>['input']

        editInputConfig: RpcConfigFactory<DataRow<D>,
                FormInput<Types['EditForm']>>
            | If<Is<RpcConfig<FormInput<Types['EditForm']>>, undefined>, undefined>

        source: DataSource<D>

        getTitle: (row: DataRow<D>) => string;

        tableConfig: OmitKeys<DataTableConfig<T['TableRow'],
            T['TableRowController'],
            D, TableSelection>,
            "source">


        addSubmit: RpcConfig<Types['AddForm']>['submit']

        editSubmit: (row: DataRow<D>, value: InputValue<FormInput<Types['EditForm']>>) => Awaitable


    }>;

export type AnyDataManager = DataManager<TDataManager>;

export type DataManagerType<T extends AnyDataManager> =
    MetaType<T>['TDataManager'];

export type DataManagerTypes<T extends TDataManager> = {


    Table: DataTable<T['TableRow'], T['TableRowController']>;

    EditForm: Form<null, T['EditError'], T['EditInput']>

    AddForm: Form<string, T['AddError'], T['AddInput']>

    TabsWidget: TabsWidget<{
        Form: DataManagerTypes<T>['EditForm']
    } & T['Tabs']>


};
export type DataManager<T extends TDataManager,
    Types extends DataManagerTypes<T> = DataManagerTypes<T>> =
    WithMetaType<{ TDataManager: T }> &
    RpcGenericConfigurator<RpcMap<{
        Table: DataManagerTypes<T>['Table']
        Add: DataManagerTypes<T>['AddForm']
        Edit: DataParameter<(
            ElementWidget<{
                title: string
            }, (
                DataManagerTypes<T>['TabsWidget']
                )>
            )>;
    }>, (

        <D, TableSelection extends DataSelection<D> = {}>(
            config: DataManagerConfig<T, D, TableSelection>
        ) => DataManagerConfig<T, any, any>

        )>;


export function DataManager<T extends {
    TableRow: TableRow

    TableRowController?: TableRowController

    AddError?: AddError

    EditError?: EditError


},
    AddError = never,
    EditError = AddError,
    TableRow = any,
    TableRowController extends AnyRpc = NoRpc>() {
    return <AddInput extends AnyInput,
        EditInput extends AnyInput = AddInput,
        Tabs extends AnyWidgetMap = {}>(options: {
        add: AddInput
        tabs?: Tabs
        edit?: EditInput
        tableOptions?: DataTableOptions<TableRowController>
    }): DataManager<{

        TableRow: TableRow

        TableRowController: TableRowController

        AddError: AddError

        AddInput: AddInput

        EditInput: EditInput

        EditError: EditError

        Tabs: Tabs


    }> => {


        return <any>RpcGenericConfigurator<DataManager<TDataManager>>(
            RpcMap({
                Table: DataTable()(options.tableOptions),

                Add: Form<string>()(options.add),

                Edit: DataParameter(
                    ElementWidget<{ title: string }>()(
                        TabsWidget({
                            Form: Form<null>()(
                                options.edit || options.add,
                            ),
                            ...options.tabs
                        })
                    )
                )
            }),
            config => {

                return ({
                    Table: $ => $({
                        ...config.tableConfig,
                        source: config.source,
                    }),
                    Add: {
                        input: config.addInputConfig,
                        submit: (value) => {
                            return config.addSubmit(value)
                        }
                    },
                    Edit: $ => $({
                        source: config.source,
                        getTargetConfig: ($, row) => $({
                            getElement() {
                                return {title: config.getTitle(row)}
                            },
                            targetConfig: {
                                Form: {
                                    input: RpcConfigFactory(config.editInputConfig, row),
                                    submit(value) {
                                        return config.editSubmit(row, value)
                                    }
                                },
                                ...config.getTabsConfig?.($ => ({$: $}), row).$
                            }
                        })
                    })
                });
            }
        );
    }
}

