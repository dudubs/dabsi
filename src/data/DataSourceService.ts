import {Command} from "../rpc/Command";
import {Service} from "../rpc/Service";


export type DataSourceService<T> = {
    delete: Command<string, void>;

    get: Command<string, T>;

    update: Command<{ key: string, values: Partial<T> }, void>;
};


export function DataSourceService<T>() {
    return Service({
        delete: Command()
    })
}

