import { BaseMap } from "@dabsi/common/map/BaseMap";
import { PropertyMap, PropertyMapOptions } from "@dabsi/common/map/PropertyMap";

export function SymbolMap<K extends object, V>({
  name,
  ...options
}: PropertyMapOptions & {
  name?: string;
} = {}): BaseMap<K, V> {
  return PropertyMap(Symbol(name), options);
}
