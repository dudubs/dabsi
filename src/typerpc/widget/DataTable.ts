import {At, Awaitable, If, Is, PartialUndefinedKeys} from "../../common/typings";
import {DataExp} from "../../data/DataExp";
import {DataRow} from "../../data/DataRow";
import {DataSelection} from "../../data/DataSelection";
import {DataSelectionRow} from "../../data/DataSelectionRow";
import {DataSource} from "../../data/DataSource";
import {DataParameter} from "../DataParameter";
import {NoRpc} from "../NoRpc";
import {AnyRpc, RpcConfig} from "../Rpc";
import {RpcGenericConfigFn} from "../RpcGenericConfig";
import {RpcMapHandlerFn} from "../RpcMapHandler";
import {DataTableContext} from "./DataTableContext";
import {Widget, WidgetType, WithWidgetType} from "./Widget";


export type DataTableColumnContext<RowColumn, T, DataRow> = {
    field?: DataExp<T>
    load(row: DataRow): Awaitable<RowColumn>

};

export type DataTableColumnConfig<Column extends string, RowColumn, T, DataRow> =
    DataTableColumnContext<RowColumn, T, DataRow>
    | DataTableColumnContext<RowColumn, T, DataRow>['load']
    | If<Is<At<DataRow, Column>, RowColumn>, null>;


export type DataTableConfig<Row, RowController extends AnyRpc, D,
    DS extends DataSelection<D>> = PartialUndefinedKeys<{

    getRowConfig: ((row: DataRow<D>) => RpcConfig<RowController>)
        | If<Is<RowController, NoRpc>, undefined>

}, {


    pageSize?: number
    source: DataSource<D>,
    selection?: DS;

    columns: {
        [Column in string & keyof Required<Row>]:
        DataTableColumnConfig<Column, Row[Column], D,
            DataRow<DataSelectionRow<D, DS>>>

    }
    searchIn?: DataExp<D>[]
    maxRows?: number


}>;

export type DataTableOrder = {
    sort?: "ASC" | "DESC"
    nulls?: "FIRST" | "LAST"
};

export type DataTableQuery<Row> = {
    getCount?: boolean;
    order?: Record<keyof Row, DataTableOrder | "ASC" | "DESC">,
    text?: string
    skip?: number
    take?: number
};

export type DataTableQueryResult<Row> = {
    count: number,
    rows: ({ $key: string } & Row)[]
};

export type DataTableRow<T extends WithWidgetType<AnyDataTable>> =
    { $key: string } &
    WidgetType<T>['Row'];

export type AnyDataTable = DataTable<Record<string, any>, AnyRpc>;

export type DataTable<Row, RowController extends AnyRpc> = Widget<{

    Row: Row;

    RowController: RowController;

    Config: RpcGenericConfigFn<(
        <T, S extends DataSelection<T> = {}>(
            config: DataTableConfig<Row, RowController, T, S>
        ) =>
            DataTableConfig<Row, RowController, any, any>

        )>

    Handler: {
        getRows: RpcMapHandlerFn<DataTableQuery<Row>, DataTableQueryResult<Row>>
    }
    Connection: {
        getRows(query: DataTableQuery<Row>): Promise<DataTableQueryResult<Row>>
    }
    Element: {
        // TODO: move to Props
        searchable: boolean;
        columns: {
            [K in keyof Required<Row>]: {
                sortable: boolean
            }
        },
        count: number
        rows: DataTableRow<Row>[]
        pageSize?: number
    }
    Props: {}
    Context: {
        getRows(query: DataTableQuery<Row>):
            Promise<DataTableQueryResult<Row>>

        getRowFromDataRow(dataRow: any): Promise<{ $key: string } & Row>;

        columns: {
            [K in string & keyof Required<Row>]:
            DataTableColumnContext<Row[K], any, any>
        }
    }
    Controller: DataParameter<RowController>
}>;

export type DataTableOptions<RowController extends AnyRpc> = {

    controller?: RowController

    pageSize?: number


};


export function DataTable<Row extends Record<string, any>>() {
    return <RowController extends AnyRpc = NoRpc>(
        options: DataTableOptions<RowController> = {}
    ): DataTable<Row, RowController> => {
        return <any>Widget<DataTable<any, AnyRpc>>({
            isGenericConfig: true,
            props: {
                pageSize: options.pageSize ?? 10,
            },
            handler: {
                getRows: (context, query) =>
                    context.getRows(query)
            },
            controller: DataParameter(
                options.controller ?? NoRpc
            ),
            context: DataTableContext,
            connection: {
                getRows(query) {
                    return this.handler(['getRows', query])
                }
            },
        })
    }
}
