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


export type ExtractKeys<T, V> = Exclude<Union<{
    [K in keyof T]: T[K] extends V ? K : never
}>, never>;

export type ExcludeKeys<T, V> = Exclude<Union<{
    [K in keyof T]: T[K] extends V ? never : K
}>, never>;

export type PickByValue<T, V> = Pick<T, ExtractKeys<T, V>>;
export type OmitByValue<T, V> = Omit<T, ExtractKeys<T, V>>;

export type Pluck<T, K extends PropertyKey, U = never> =
    K extends keyof Required<T> ? T[K] : U;

export type PartialKeys<T, K extends PropertyKey> =
    Omit<T, K> &
    Partial<Pick<T, Extract<K,keyof T>>>;


export function Nullable<T>(value?: T): T | Nullable {
    return value;
}

export type Type<T> = Function & { prototype: T };

export type TypeType<T extends Type<any>> =
    T extends Type<infer U> ? U : never;

export function Type<T>(): Type<T> {
    if (this instanceof Type) {
        throw  new Error()
    }
    return Type
}


export type Assign<T, U> = Omit<T, keyof Required<U>> & U;


export type ArrayTypeOrObject<T> =
    T extends Array<infer U> ? U : Extract<T, object>;


export type UndefinedArgs<T> =
    T extends undefined ? [undefined?] : [T];

export type UndefinedProp<K extends string, T> = T extends undefined ?
    Partial<Record<K, T>> : Record<K, T>;

export type UndefinedIf<T, U> = T extends U ? undefined : T;

export type UndefinedObject<T extends object> =
    keyof OmitByValue<T, undefined> extends never ? undefined :
        OmitByValue<T, undefined> & Partial<PickByValue<T, undefined>>;

export type UndefinedIfNoKeys<T> = keyof T extends never ? undefined : T;

export type Common<L, R> = OmitByValue<{
    [K in keyof (L & R)]:
    K extends keyof L ?
        K extends keyof R ?
            Extract<L[K], R[K]> :
            never :
        never
}, never>;


export type RequiredKeys<T> = Union<{
    [K in keyof T]: T extends Record<K, any> ? K : never
}>;


export type OptionalKeys<T> = Union<{
    [K in keyof T]: T extends Record<K, any> ? never : K
}>;


export type OptionalOnly<T, K extends keyof T = never> = Omit<T, Exclude<RequiredKeys<T>, K>>;

export type RequiredOnly<T> = Pick<T, RequiredKeys<T>>;
export type Optional<T> = Pick<T, OptionalKeys<T>>;

export type Method = (...args: any[]) => any;


export type Pass<T, A = never, B = never, C = never, D = never> = T;
export type IsNever<T> = [T] extends [never] ? true : false;
export type IfNever<T, U, E = never> = IsNever<T> extends true ? U : E;
export type IfNotNever<T, U, E = never> = IfNever<T, E, U>;
export type If<T, U, S> = T extends U ? S : never;
