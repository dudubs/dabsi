import {assert} from "../assert";
import {BaseMap} from "./BaseMap";

export function mapFactory<K, V>(
    map: BaseMap<K, V>,
    factory: (key: K) => V
): {
    map: BaseMap<K, V>,
    (key: K): NonNullable<V>
    <T>(key: K, callback: (value: NonNullable<V>) => T): T | undefined
} {
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
