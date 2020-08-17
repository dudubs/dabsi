export type BaseType<T> = { $baseType: T };

export type WithBaseType<T> = T extends BaseType<infer U> ? BaseType<U> : BaseType<T>;
