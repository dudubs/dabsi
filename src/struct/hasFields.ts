import {targetToPropertyKeyToField} from "./Field";

export function hasFields(target: Function) {
    return (targetToPropertyKeyToField.get(target)
        ?.size ?? 0)>0;
}

