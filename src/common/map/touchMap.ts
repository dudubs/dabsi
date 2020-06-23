import {BaseMap, MapKey, MapValue} from "./BaseMap";

export function touchMap<T extends BaseMap<any, any>>(
    map: T, key:
        MapKey<T>,
    callback: (key: MapKey<T>) => MapValue<T>): MapValue<T> {
    let value = map.get(key);
    if (value || map.has(key)) {
        return value;
    }
    map.set(key, value = callback(key));
    return value;
}

