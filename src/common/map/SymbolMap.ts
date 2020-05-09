import {BaseMap} from "./BaseMap";
import {PropertyMap} from "./PropertyMap";

export function SymbolMap<K extends object, V>(name?: string): BaseMap<K, V> {
    return PropertyMap(Symbol(name));
}
