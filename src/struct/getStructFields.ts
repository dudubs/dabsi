import {WeakMapFactory} from "../common/map/mapFactory";
import {Field, targetToPropertyKeyToField} from "./Field";
import {hasFields} from "./hasFields";
import {getBaseFunction} from "./tests/getBaseFunction";


export const getStructFields = WeakMapFactory((target: Function): Field[] => {
    if (target === Function.prototype)
        return []
    if (!hasFields(target))
        throw new Error(`No fields for ${target.name}`);
    const base = getBaseFunction(target);

    return [
        ...((base && getStructFields(base)) || []),
        ...targetToPropertyKeyToField.get(target)?.values() || []
    ];
});

