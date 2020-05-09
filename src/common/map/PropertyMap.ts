import {BaseMap} from "./BaseMap";


export function PropertyMap<K extends object, V = any>(
    key: PropertyKey = Symbol()
):BaseMap<K, V> {
    return {
        get(obj: K): V | undefined {
            return obj[key];
        },
        has(obj: K): boolean {
            return key in obj;
        },
        set(obj: K, value: V): BaseMap<K, V> {
            obj[key] = value;
            return this;
        },
        delete(obj: K) {
            delete obj[key];
        }
    }
}

