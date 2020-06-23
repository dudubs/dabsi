import {AwaitableType} from "../common/typings";
import {JSONExp} from "../json-exp/JSONExp";
import {RPC} from "../rpc/RPC";
import {DataCursor} from "./DataCursor";
import {DataItem} from "./DataItem";
import {DataFindOptions, DataQuery, DataQueryResult} from "./DataQuery";
import {DataSource, DataValues} from "./DataSource";


export type RemoteDataSourceMethod = Extract<keyof DataSource<any>, keyof {
    has,
    count,
    query,
    insert,
    update,
    addAll,
    deleteAll,
    removeAll,
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
        data: RemoteDataSourceData<T, Method>
    ) =>
        Promise<AwaitableType<ReturnType<DataSource<T>[Method]>>>;

export type RemoteDataSource<T> = RPC<RemoteDataSourceHandler<T>,
    RemoteDataSourceConnection<T>,
    DataSource<T>>;

export function RemoteDataSource<T>(): RemoteDataSource<T> {
    return {
        connect: handler => {
            return new RemoteDataSourceConnection<T>(handler)
        },
        handle: source => {
            return ({method, cursor, args}) => {
                cursor = DataCursor.concat(source.cursor, cursor);
                return (<any>(source.withCursor(cursor)[method]))(...args);
            }
        }
    }
}

export class RemoteDataSourceConnection<T> extends DataSource<T> {

    constructor(
        public fetch: (data: RemoteDataSourceCommandIn) => Promise<any>,
        public cursor: DataCursor = DataCursor.create()
    ) {
        super();
    }

    command<K extends keyof RemoteDataSourceActions<T>>(method: K,
                                                        args: Parameters<DataSource<T>[K]>) {
        return this.fetch({cursor: this.cursor, method, args})
    }


    addAll(keys: string[]): Promise<void> {
        return this.command("addAll", [keys])
    }

    count(filter?: JSONExp<T>): Promise<number> {
        return this.command("count", [filter]);
    }


    deleteAll(keys: string[]): Promise<void> {
        return this.command("deleteAll", [keys]);
    }

    has(filter: JSONExp<T>): Promise<boolean> {
        return this.command("has", [filter]);
    }

    insert(values: DataValues<T>): Promise<string> {
        return this.command("insert", [values]);
    }

    async* find(options: DataFindOptions<T> = {}): AsyncIterableIterator<DataItem<T>> {
        yield* (await this.query({...options, count: false})).items
    }

    query(query?: DataQuery<T>): Promise<DataQueryResult<T>> {
        return this.command("query", [query]);
    }

    removeAll(keys: string[]): Promise<void> {
        return this.command("removeAll", [keys]);
    }

    update(key: string, values: DataValues<T>): Promise<void> {
        return this.command("update", [key, values]);
    }

    withCursor<T>(cursor: DataCursor): DataSource<T> {
        return new RemoteDataSourceConnection<T>(this.fetch, cursor);
    }

}
