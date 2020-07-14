import {AwaitableType, Type} from "../common/typings";
import {RPC} from "../rpc/RPC";
import {DataCursor, EmptyDataCursor} from "./DataCursor";
import {DataItem, DataKey, DataKeyInput} from "./DataItem";
import {DataSource, DataValues} from "./DataSource";


export type RemoteDataSourceMethod = Extract<keyof DataSource<any>, keyof {
    has,
    count,
    items
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
        payload: RemoteDataSourceData<T, Method>
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
                // TODO: more safety code.
                cursor = DataCursor.concat(source.cursor, cursor);
                return (<any>(source.withCursor(cursor)[method]))(...args);
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

    command<K extends keyof RemoteDataSourceActions<T>>(method: K,
                                                        args: Parameters<DataSource<T>[K]>) {
        return this.fetch({cursor: this.cursor, method, args})
    }

    items(): Promise<DataItem<T>[]> {
        return this.command('items', [])
    }

    addAll(keys: string[]): Promise<void> {
        return this.command("addAll", [keys])
    }

    count(): Promise<number> {
        return this.command("count", []);
    }


    deleteAll(keys: string[]): Promise<void> {
        return this.command("deleteAll", [keys]);
    }

    has(): Promise<boolean> {
        return this.command("has", []);
    }

    insert(values: DataValues<T>): Promise<string> {
        return this.command("insert", [values]);
    }


    removeAll(keys: string[]): Promise<void> {
        return this.command("removeAll", [keys]);
    }

    update(key: DataKeyInput<T>, values: DataValues<T>): Promise<void> {
        return this.command("update", [DataKey(key), values]);
    }

    withCursor<T>(cursor: DataCursor): DataSource<T> {
        return new RemoteDataSourceConnection<T>(this.fetch, cursor);
    }

}
