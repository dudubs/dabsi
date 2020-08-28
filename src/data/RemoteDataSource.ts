import {AwaitableType} from "../common/typings";
import {Rpc} from "../rpc/Rpc";
import {DataCursor, EmptyDataCursor} from "./DataCursor";
import {DataBaseRow, DataRow} from "./DataRow";
import {DataSource, DataValues} from "./DataSource";
import {DataKeyOrKeys} from "./DataSource/DataSource";


const allowedMethods: Record<RemoteDataSourceMethod, true> = {
    has: true,
    count: true,
    items: true,

    insertKey: true,
    update: true,

    delete: true,
    remove: true,
    add: true,

    addAll: true,
    deleteAll: true,
    removeAll: true,
    updateAll: true,
};

export type RemoteDataSourceMethod = Extract<keyof DataSource<any>, keyof {
    has,
    count,
    items
    insertKey,

    update,
    delete,
    remove,
    add,

    addAll,
    deleteAll,
    removeAll,
    updateAll,

}>;


export type RemoteDataSourceActions<T> = Pick<DataSource<T>, RemoteDataSourceMethod>;


export type RemoteDataSourceCommandIn = {
    cursor: DataCursor,
    method: string,
    args: any[]
};

export type RemoteDataSourceData<T, Method extends RemoteDataSourceMethod> = {
    cursor: DataCursor,
    method: Method,
    args: Parameters<DataSource<T>[Method]>
};

export type RemoteDataSourceHandler<T> =
    <Method extends RemoteDataSourceMethod>(
        payload: RemoteDataSourceData<T, Method>
    ) =>
        Promise<AwaitableType<ReturnType<DataSource<T>[Method]>>>;

export type RemoteDataSource<T> = Rpc<{
    Handler: RemoteDataSourceHandler<T>,
    Connection: RemoteDataSourceConnection<T>,
    Config: DataSource<T>
}>;

export function RemoteDataSource<T>(): RemoteDataSource<T> {
    return {
        createRpcConnection: handler => {
            return new RemoteDataSourceConnection<T>(handler)
        },
        createRpcHandler: source => {
            return async ({method, cursor, args}) => {
                // TODO: more safety code.
                cursor = DataCursor.concat(source.cursor, cursor);
                if (!allowedMethods[method]) {
                    throw new Error(`"${method}" is not allowed method.`)
                }
                return await (<any>(source.withCursor(cursor)[method]))(...args);
            }
        }
    }
}


export class RemoteDataSourceConnection<T> extends DataSource<T> {

    constructor(
        public fetch: (data: RemoteDataSourceCommandIn) => Promise<any>,
        public cursor: DataCursor = EmptyDataCursor
    ) {
        super();
    }

    command<K extends keyof RemoteDataSourceActions<T>>(
        method: K,
        args: Parameters<DataSource<T>[K]>
    ) {
        return this.fetch({cursor: this.cursor, method, args})
    }

    items(): Promise<DataRow<T>[]> {
        return this.command('items', []).then(items => {
            const base = DataBaseRow(this);
            return items.map(item => {
                return Object.setPrototypeOf(item, base)
            })
        })
    }

    @Bridge
    updateAll(keys: string[], values: DataValues<T>): Promise<number> {
        throw new Error()
    }

    @Bridge
    addAll(keys: string[]): Promise<void> {
        throw new Error()
    }

    @Bridge
    count(): Promise<number> {
        throw new Error()
    }

    @Bridge
    deleteAll(keys: string[]): Promise<void> {
        throw new Error()
    }

    @Bridge
    has(): Promise<boolean> {
        throw new Error()
    }

    @Bridge
    insertKey(values: DataValues<T>): Promise<string> {
        throw new Error()
    }

    @Bridge
    removeAll(keys: string[]): Promise<void> {
        throw new Error()
    }

    withCursor<T>(cursor: DataCursor): DataSource<T> {
        return new RemoteDataSourceConnection<T>(this.fetch, cursor);
    }

}

function Bridge(target, propertyKey: RemoteDataSourceMethod, desc) {
    desc.value = function (this: RemoteDataSourceConnection<any>, ...args) {
        return this.command(propertyKey, <any>args)
    }
}

RemoteDataSourceConnection.prototype.update = function (...args) {
    if (args.length === 2) {
        const [keyOrKeys, values] = args;
        args = [DataKeyOrKeys(keyOrKeys), values];
    }
    return this.command('update', args)
}
