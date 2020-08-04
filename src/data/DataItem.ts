import {DataRow} from "./DataRow";

export type DataKey = "$key";
DataKey.symbol = "$key" as const;

export type DataKeyInput<T = {}> = { $key: string } | string | number;

export function DataKey<T = {}>(value: DataKeyInput<T>): string {
    return typeof value == "object" ? value.$key : String(value)
}

export namespace DataKey {

    export const a = "";
}


export type DataItem<T> = DataRow<T>;

