export type BaseMap<K, V> = {
    get(key: K): V | undefined;
    set(set: K, value: V): BaseMap<K, V>;
    has(key: K): boolean;
    delete(key: K): void;
};
export type MapKey<T extends BaseMap<any, any>> =
    T extends BaseMap<infer U, any> ? U : never;

export type MapValue<T extends BaseMap<any, any>> =
    T extends BaseMap<any, infer U> ? U : never;


