import { OneOrMany } from "@dabsi/common/array/OneOrMany";

export type WithDataKey = { $key: string };

export type DataKey<T = {}> = { $key: string } | string;

export function DataKey<T = {}>(value: DataKey<T>): string {
  return typeof value == "object" ? value.$key : String(value);
}

export type DataKeyOrKeys<T> = OneOrMany<DataKey<T>>;

export function DataKeyOrKeys(keyOrKeys: DataKeyOrKeys<any>): string[] {
  return OneOrMany(keyOrKeys).map(DataKey);
}
