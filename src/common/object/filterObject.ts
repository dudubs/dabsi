import {entries} from "@dabsi/common/object/entries";

export function filterObject(obj, callback: (value, key) => boolean) {
    const result = {};
    for (const [key, value] of entries(obj)) {
        if (callback(value,key))
            result[key] = value;
    }
    return result;
}
