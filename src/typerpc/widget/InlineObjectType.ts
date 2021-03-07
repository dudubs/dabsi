import { Expect } from "@dabsi/common/typings2/Expect";
import { Nullable } from "@dabsi/common/typings2/Nullable";

export function number(value: any): number {
  return Number(value);
}

export function nullable<T>(
  type: (value: any) => T
): InlineTypeFn<T | Nullable> {
  return value => {
    if (value != null) return type(value);
  };
}

export function string(value: any): string {
  if (value == null) return "";
  return String(value);
}

number.enum = function <T extends number>(): InlineTypeFn<T> {
  return <any>number;
};

export function boolean(value: any): boolean {
  return Boolean(value);
}

export type InlineTypeFn<T> = (value: any) => T;

export type AnyInlineTypeFn = InlineTypeFn<any>;

export type InlineObject = Record<string, AnyInlineTypeFn>;

export type InlineObjectType<T extends InlineObject> = {
  [K in keyof T]: ReturnType<T[K]>;
};
export type InlineType<T extends AnyInlineTypeFn> = ReturnType<T>;

export type AnyPrimitiveColumnType = Expect<
  AnyInlineTypeFn,
  typeof string | typeof number | typeof boolean
>;
