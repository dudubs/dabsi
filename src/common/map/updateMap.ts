import { BaseMap, MapKey, MapValue } from "@dabsi/common/map/BaseMap";

export function updateMap<T extends BaseMap<any, any>>(
  map: T,
  key: MapKey<T>,
  callback: (value: MapValue<T> | undefined, key: MapKey<T>) => MapValue<T>
) {
  map.set(key, callback(map.get(key), key));
}
