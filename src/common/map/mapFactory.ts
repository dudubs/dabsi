import { assert } from "@dabsi/common/assert";
import { BaseMap, MapKey, MapValue } from "@dabsi/common/map/BaseMap";
import { Defined } from "@dabsi/common/typings2/Defined";

export type MapFactory<T extends BaseMap<any, any>> = BaseMap<
  MapKey<T>,
  MapValue<T>
> & {
  map: T;
  (key: MapKey<T>): Defined<MapValue<T>>;
  (key: MapKey<T>, getOnly: true): Defined<MapValue<T>> | undefined;
};

function mapFactory<K, V>(
  map: BaseMap<K, V>,
  factory: (key: K) => V
): MapFactory<BaseMap<K, V>> {
  touch.map = map;
  touch.get = k => map.get(k);
  touch.set = (k, v) => map.set(k, v);
  touch.delete = k => map.delete(k);
  touch.has = k => map.has(k);
  return touch;

  function touch(key, getOnly?): any {
    if (getOnly) {
      return map.get(key);
    }

    let value = map.get(key);
    if (value || typeof value !== "undefined") {
      return <V>value;
    }
    map.set(key, (value = factory(key)));
    assert(typeof value !== "undefined");
    return <V>value;
  }
}

export function WeakMapFactory<K extends object, V>(
  factory: (key: K) => V
): MapFactory<WeakMap<K, V>> {
  return <any>mapFactory(new WeakMap(), factory);
}

export function MapFactory<K, V>(
  factory: (key: K) => V
): MapFactory<Map<K, V>> {
  return <any>mapFactory(new Map(), factory);
}
