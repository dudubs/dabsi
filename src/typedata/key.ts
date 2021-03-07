export type DataKeySymbol = "$key";
export type WithDataKey = Record<DataKeySymbol, string>;

DataKey.symbol = "$key" as const;

export type DataKey<T = {}> = { $key: string } | string | number;

export function DataKey<T = {}>(value: DataKey<T>): string;

export function DataKey(value) {
  if (value !== undefined)
    return typeof value == "object" ? value.$key : String(value);
}
export type DataKeyOrKeys<T> = DataKey<T>[] | DataKey<T>;

export function DataKeyOrKeys<T>(keyOrKeys: DataKeyOrKeys<T>): string[] {
  if (Array.isArray(keyOrKeys)) return keyOrKeys.map(DataKey);
  return [DataKey(keyOrKeys)];
}
