import {BaseMap} from "./BaseMap";
import {PropertyMap, PropertyMapOptions} from "./PropertyMap";

export function SymbolMap<K extends object, V>({name, ...options}: PropertyMapOptions & {
    name?: string
} = {}): BaseMap<K, V> {
    return PropertyMap(Symbol(name), options);
}
