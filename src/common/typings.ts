export type Union<T> = T[keyof T];

export type Expression<T> = Union<{
    [K in keyof T]: Record<K, T[K]>
}>
export type Nullable = undefined | null;

export type Awaitable<T = any> = Promise<T> | T;

export type ToAwaitable<T> = Awaitable<AwaitableType<T>>;

export type Fn = (...args: any[]) => any;


export type PromiseType<T extends Promise<any>> =
    T extends Promise<infer U> ? U : never;


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

export type Pluck<T, K extends PropertyKey, E = never> =
    IsNever<T> extends true ? E :
        Required<T> extends Record<K, infer U> ? U : E;

export type PartialKeys<T, K extends keyof T> =
    Omit<T, K> &
    Partial<Pick<T, K>>;


export function Nullable<T>(value?: T): T | Nullable {
    return value;
}

export type Type<T> = Function & { prototype: T };

export function Type<T = any>(this: any): Type<T> {
    if (this instanceof Type) {
        throw  new Error()
    }
    return Type
}

export type Assign<T, U> =
    Omit<T, keyof Required<U>> & U;

export type AssignKeys<T, U> =
    HasKeys<T> extends false ? U :
        HasKeys<U> extends false ? T :
            Assign<T, U>;


export type ArrayTypeOrObject<T> =
    T extends Array<infer U> ? U : Extract<T, object>;


export type OptionalArg<T> = IsNever<T> extends true ? [] : [T];

export type NeverKeys<T> = Union<{
    [K in keyof T]: IsNever<T[K]> extends true ? K : never
}>;

export type OmitNeverKeys<T> = Omit<T, NeverKeys<T>>;

export type OptionalObjectArg<T> =
    IsNever<Union<T>> extends true ? [] : [
        Omit<T, NeverKeys<T>>
    ];


export type IfNever<T, U> = IsNever<T> extends true ? U : T;


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


export type OptionalOnly<T, K extends keyof T = never> =
    Omit<T, Exclude<RequiredKeys<T>, K>>;

export type RequiredOnly<T> = Pick<T, RequiredKeys<T>>;

export type Optional<T> = Pick<T, OptionalKeys<T>>;


export type IsNever<T> = [T] extends [never] ? true : false;
export type Is<T, U> = T extends U ? true : false;
export type IsNot<T, U> = T extends U ? false : true;

export type IsAny<T> =
    0 extends 1 & T ? true : false;

export type IsExtend<T, U> = T extends U ? true : false;

export type IsNull<T> = T extends (undefined | null) ? true : false;

export type HasKeys<T> =
    IsNever<T> extends true ? false :
        Not<IsNever<keyof T>>;

export type Not<T extends boolean> = T extends true ? false : true;

export type If<C extends boolean, T, E = never> = C extends true ? T : E;
export type IfNot<C extends boolean, T, E = never> = C extends false ? T : E;

export type Constructor<T> = { new(...args: any[]): T };


export type Merge<L, R, M> = HasKeys<L> extends false ? R :
    HasKeys<R> extends false ? L : AssignKeys<L, M>;

export type PartialUndefinedKeys<T> = PartialKeys<T, Union<{
    [K in keyof T]: undefined extends T[K] ? K : never
}>>;


export type IfNull<T, U> = T extends null ? U : never;

export type AsyncFn<T extends (...args: any[]) => any> =
    (...args: Parameters<T>) => Promise<ReturnType<T>>;

export type SyncFn<T extends (...args: any[]) => any> =
    (...args: Parameters<T>) => AwaitableType<ReturnType<T>>;


declare global {
    interface TypeRefs {

    }
}

export type TypeRef<K extends PropertyKey> =
    K extends keyof TypeRefs ? TypeRefs[K] : never;
