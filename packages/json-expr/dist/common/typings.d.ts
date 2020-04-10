export declare type Union<T> = T[keyof T];
export declare type Nullable = undefined | null;
export declare type JSONResult = string | number | boolean | undefined | JSONResult[] | {
    [key: string]: JSONResult;
};
export declare type Awaitable<T = any> = Promise<T> | T;
export declare type AwaitableType<T extends Awaitable> = T extends Awaitable<infer U> ? U : never;
export declare type avoid = Promise<void>;
export declare type KeysByValue<T, V> = Exclude<Union<{
    [K in keyof T]: T[K] extends V ? K : never;
}>, never>;
export declare type PickByValue<T, V> = Pick<T, KeysByValue<T, V>>;
export declare type OmitByValue<T, V> = Omit<T, KeysByValue<T, V>>;
export declare type Pluck<T, K extends PropertyKey, U = never> = K extends keyof T ? T[K] : U;
export declare type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export declare function Nullable<T>(value?: T): T | Nullable;
export declare type Type<T> = {
    prototype: T;
    name: string;
} & Function;
export declare type Action<T> = Union<{
    [K in keyof T]: {
        type: K;
    } & T[K];
}>;
export declare type Merge<T, U> = Omit<T, keyof U> & {
    [K in keyof U]: K extends keyof T ? (T[K] & U[K]) : U[K];
};
export declare type Replace<T, U> = Omit<T, keyof U> & U;
