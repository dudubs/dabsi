export type BaseTypeKey = "$baseType";

export type BaseType<T> = Record<BaseTypeKey, T>;

export type WithBaseType<T> = T extends BaseType<infer U>
  ? BaseType<U>
  : BaseType<T>;

export type BasedType<T> = T | BaseType<T>;

export type GetBaseType<T> = BaseTypeKey extends keyof T ? T[BaseTypeKey] : T;
