export type DataKey = "$key";
export type WithDataKey = Record<DataKey, string>;

DataKey.symbol = "$key" as const;

export type DataKeyInput<T = {}> = { $key: string } | string | number;

export function DataKey<T = {}>(value: DataKeyInput<T>): string;
export function DataKey(value) {
  if (value !== undefined)
    return typeof value == "object" ? value.$key : String(value);
}
