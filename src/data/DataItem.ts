import {Relation} from "./Relation";

export type DataKey = "$key";
DataKey.symbol = "$key" as const;

export type DataKeyInput<T = {}> = T & { $key: string } | string | number;

export function DataKey<T = {}>(value: DataKeyInput<T>): string {
    return typeof value == "object" ? value.$key : String(value)
}

export namespace DataKey {

    export const a = "";
}


export type DataItem<T> = Record<DataKey, string> & {
    [K in keyof T]:
    T[K] extends object ?
        typeof Relation extends keyof Required<T[K]> ?
            DataItem<T[K]> : T[K] : T[K]
};

