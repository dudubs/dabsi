import {assert} from "@dabsi/common/assert";
import {BaseMap, MapKey, MapValue} from "@dabsi/common/map/BaseMap";

export type MapFactory<T extends BaseMap<any, any>> = {
    map: T;
    (key: MapKey<T>): NonNullable<MapValue<T>>;

};

 function mapFactory<K, V>(
    map: BaseMap<K, V>,
    factory: (key: K) => V
): MapFactory<BaseMap<K, V>> {
    touch.map = map;
    return touch

    function touch(key, callback?): any {

        if (callback) {
            return map.has(key) ? callback(map.get(key)) : undefined;
        }

        let value = map.get(key);
        if (value || (typeof value !== "undefined")) {
            return <V>value;
        }
        map.set(key, value = factory(key));
        assert(typeof value !== "undefined");
        return <V>value;
    }
}


export function WeakMapFactory<K extends object, V>(factory: (key: K) => V): MapFactory<WeakMap<K, V>> {
    return <any>mapFactory(new WeakMap(), factory)
}

export function MapFactory<K, V>(factory: (key: K) => V): MapFactory<Map<K, V>> {
    return <any>mapFactory(new Map(), factory)
}

export function BaseMapFactory<K, V>(map: BaseMap<K, V>, factory: (key: K) => V): MapFactory<BaseMap<K, V>> {
    return <any>mapFactory(map, factory)
}

