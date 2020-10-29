export type DataKey = "$id";
DataKey.symbol = "$id" as const;

export type DataKeyInput<T = {}> = { $id: string } | string | number;

export function DataKey<T = {}>(value: DataKeyInput<T>): string;
export function DataKey(value) {
  if (value !== undefined)
    return typeof value == "object" ? value.$id : String(value);
}
