import { Expect, Nullable } from "../../common/typings";

export function number(value: any): number {
  return Number(value);
}

export function nullable<T>(type: (value: any) => T): ColumnType<T | Nullable> {
  return value => {
    if (value != null) return type(value);
  };
}

export function string(value: any): string {
  if (value == null) return "";
  return String(value);
}

number.enum = function <T extends number>(): ColumnType<T> {
  return <any>number;
};

export function boolean(value: any): boolean {
  return Boolean(value);
}

export type ColumnType<T> = (value: any) => T;
export type AnyColumnType = ColumnType<any>;

export type AnyRowType = Record<string, AnyColumnType>;

export type Row<T extends AnyRowType> = { [K in keyof T]: ReturnType<T[K]> };
export type Column<T extends AnyColumnType> = ReturnType<T>;

export type AnyPrimitiveColumnType = Expect<
  AnyColumnType,
  typeof string | typeof number | typeof boolean
>;
