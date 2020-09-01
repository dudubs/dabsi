import {entries} from "../common/object/entries";
import {mapObject} from "../common/object/mapObject";
import {Awaitable, SyncFn} from "../common/typings";
import {DataExp} from "../data/DataExp";
import {DataOrder} from "../data/DataOrder";
import {DataRow} from "../data/DataRow";
import {DataSource} from "../data/DataSource";
import {ContextualRpcFn, ContextualRpcType} from "./ContextualRpc";
import {DataTableContext} from "./DataTableContext";
import {Parameter} from "./Parameter";
import {AnyRpc, RpcConfig, RpcError} from "./Rpc";
import {RpcGenericConfig, RpcGenericConfigFn} from "./RpcGenericConfig";
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

export type DataTable<T, R extends AnyRpc> = Widget<{
    Config: RpcGenericConfigFn<<U>(config: DataTableConfig<T, U, R>) => DataTableConfig<T, any, R>>
    Handler: {
        getRows: SyncFn<GetRowsAsync<T>>
    }
    Connection: {
        getRows: GetRowsAsync<T>
    }
    Element: {
        searchable: boolean;
        columns: {
            [K in keyof T]: {
                sortable: boolean
            }
        },
        count: number
        rows: [string, T][]
    }
    Props: {
        loadOnElement: boolean
    }
    Context: {
        getRows: GetRowsAsync<T>
        columns: {
            [K in keyof T]: DataTableColumnConfig<T, any, K>
        }
    }
    Controller: Parameter<string, DataRow<any>, R>
}>;

export function DataTable<T>(
    {loadOnElement = false}: {
        loadOnElement?: boolean
    } = {}
) {
    return <R extends AnyRpc>(rowController: R): DataTable<T, R> => {
        return <DataTable<T, R>>Widget<DataTable<any, R>>({
            props: {
                loadOnElement
            },
            handler: {
                getRows: (context, query) =>
                    context.getRows(query)
            },
            controller: Parameter<string, DataRow<any>, R>(
                rowController
            ),
            getContextClass: () => DataTableContext,
            createConnection: props => ({
                getRows: query => props.handler(['getRows', query])
            })
        })
    }
}

/*

DataTable<{
    fullName:string
}>(

    MappedRpc({ delete: Command() })
)
.handle($ => $({
    source: Users.addFields({fullName...}),

    rowController: row=> {

    }

    columns:{
        fullName: {sortable:true}
        lastName: {sortable:false},
        fullName: {exp:}
    },
    getRow: row => ({
        return {firstName:row.firstNa}
    })
}))
 */


