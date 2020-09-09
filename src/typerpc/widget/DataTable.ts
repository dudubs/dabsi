import {At, Awaitable, If, Is, PartialUndefinedKeys, SyncFn} from "../../common/typings";
import {DataExp} from "../../data/DataExp";
import {DataRow} from "../../data/DataRow";
import {DataSelection} from "../../data/DataSelection";
import {DataSelectionRow} from "../../data/DataSelectionRow";
import {DataSource} from "../../data/DataSource";
import {DataParameter} from "../DataParameter";
import {NoRpc} from "../NoRpc";
import {AnyRpc, RpcConfig} from "../Rpc";
import {RpcGenericConfigFn} from "../RpcGenericConfig";
import {DataTableContext} from "./DataTableContext";
import {Widget} from "./Widget";


export type DataTableColumnContext<RowColumn, T, DataRow> = {
    field?: DataExp<T>
    load(row: DataRow): Awaitable<RowColumn>

};

export type DataTableColumnConfig<Column extends string, RowColumn, T, DataRow> =
    DataTableColumnContext<RowColumn, T, DataRow>
    | DataTableColumnContext<RowColumn, T, DataRow>['load']
    | If<Is<At<DataRow, Column>, RowColumn>, null>;


export type DataTableConfig<Row, RowController extends AnyRpc, T,
    S extends DataSelection<T>> = PartialUndefinedKeys<{

    getRowConfig: ((row: DataRow<T>) => RpcConfig<RowController>)
        | If<Is<RowController, NoRpc>, undefined>

},{


    source: DataSource<T>,
    selection?: S;

    columns: {
        [Column in string & keyof Required<Row>]:
        DataTableColumnConfig<Column, Row[Column], T,
            DataRow<DataSelectionRow<T, S>>>

    }
    searchIn?: DataExp<T>[]
    maxRows?: number


}>;

export type DataTableOrder = {
    sort?: "ASC" | "DESC"
    nulls?: "FIRST" | "LAST"
};

export type DataTableQuery = {
    getCount: boolean;
    order: Record<string, DataTableOrder>,
    text: string
    skip: number
    take: number
};

export type DataTableQueryResult<T> = {
    count: number,
    rows: [string, T][]
};

type GetRowsAsync<T> = (query: DataTableQuery) => Promise<DataTableQueryResult<T>>;

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
        getRows: SyncFn<GetRowsAsync<Row>>
    }
    Connection: {
        getRows: GetRowsAsync<Row>
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
        rows: [string, Row][]
    }
    Props: {
        pageSize: number
    }
    Context: {
        getRows: GetRowsAsync<Row>
        columns: {
            [K in string & keyof Required<Row>]:
            DataTableColumnConfig<K, Row[K], any, any>
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
