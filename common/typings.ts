export type Union<T> = T[keyof T];

export type Expression<T> = Union<{
    [K in keyof T]: Record<K, T[K]>
}>
export type Nullable = undefined | null;

export type JSONResult = string | number | boolean | undefined |
    JSONResult[] | {
    [key: string]: JSONResult
};
export type Awaitable<T = any> = Promise<T> | T;

export type AwaitableType<T extends Awaitable> =
    T extends Awaitable<infer U> ? U : never;

export type avoid = Promise<void>;

export type KeysByValue<T, V> = Exclude<Union<{
    [K in keyof T]: T[K] extends V ? K : never
}>, never>;

export type PickByValue<T, V> = Pick<T, KeysByValue<T, V>>;
export type OmitByValue<T, V> = Omit<T, KeysByValue<T, V>>;

export type Pluck<T, K extends PropertyKey, U = never> =
    K extends keyof T ? T[K] : U;

export type PartialKeys<T, K extends keyof T> =
    Omit<T, K> &
    Partial<Pick<T, K>>;


export function Nullable<T>(value?: T): T | Nullable {
    return value;
}

export type Type<T> = { prototype: T, name: string } & Function;

export type Action<T> = Union<{
    [K in keyof T]: { type: K } & T[K]
}>


export type Merge<T, U> = Omit<T, keyof U> & {
    [K in keyof U]: K extends keyof T ? (T[K] & U[K]) : U[K]
};

export type Replace<T, U> = Omit<T, keyof U> & U;



export type ArrayTypeOrObject<T> = T extends Array<infer U> ? U : Extract<T, object>;

export type ArrayType<T extends any[]> = T extends Array<infer U> ? U : never;
