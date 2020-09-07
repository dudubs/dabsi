import {Awaitable, SyncFn} from "../../common/typings";
import {DataExp} from "../../data/DataExp";
import {DataRow} from "../../data/DataRow";
import {DataSource} from "../../data/DataSource";
import {DataParameter} from "../DataParameter";
import {AnyRpc, RpcConfig} from "../Rpc";
import {RpcGenericConfigFn} from "../RpcGenericConfig";
import {DataTableContext} from "./DataTableContext";
import {Widget} from "./Widget";


type DataTableColumnContext<T, U, K extends keyof T> = {
    field?: DataExp<T>
    load(row: DataRow<U>): Awaitable<T[K]>
};

export type DataTableColumnConfig<T, U, K extends keyof T> =
    DataTableColumnContext<T, U, K> |
    DataTableColumnContext<T, U, K>['load'];

type DataTableConfig<T, U, R extends AnyRpc> = {
    source: DataSource<U>,
    getRowConfig(row: DataRow<U>): RpcConfig<R>

    searchIn?: DataExp<T>[]
    maxRows?: number

    columns: {
        [K in keyof T]: DataTableColumnConfig<T, U, K>
    }
}
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

export type AnyDataTable = DataTable<any, AnyRpc>;

export type DataTable<T, R extends AnyRpc> = Widget<{

    Row: T;
    RowController: R;

    Config: RpcGenericConfigFn<<U>(config: DataTableConfig<T, U, R>) =>
        DataTableConfig<T, any, R>>
    Handler: {
        getRows: SyncFn<GetRowsAsync<T>>
    }
    Connection: {
        getRows: GetRowsAsync<T>
    }
    Element: {
        searchable: boolean;
        columns: {
            [K in string&keyof T]: {
                sortable: boolean
            }
        },
        count: number
        rows: [string, T][]
    }
    Props: {
        pageSize: number
    }
    Context: {
        getRows: GetRowsAsync<T>
        columns: {
            [K in keyof T]: DataTableColumnConfig<T, any, K>
        }
    }
    Controller: DataParameter<R>
}>;

export function DataTable<T>(
    {pageSize = 10}: {
        pageSize?: number
    } = {}
) {
    return <R extends AnyRpc>(rowController: R): DataTable<T, R> => {
        return <DataTable<T, R>>Widget<DataTable<any, AnyRpc>>({
            isGenericConfig: true,
            props: {
                pageSize
            },
            handler: {
                getRows: (context, query) =>
                    context.getRows(query)
            },
            controller: DataParameter(
                rowController
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


(class {

}).prototype
