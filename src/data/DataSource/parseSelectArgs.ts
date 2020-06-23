import {DataFields} from "../DataFields";

export function parseSelectArgs({keysOrFields, maybeFields}): {
    fields: DataFields<any>,
    keys: string[]
} {
    if (Array.isArray(keysOrFields)) {
        return {keys: keysOrFields, fields: maybeFields ?? {}}
    } else {
        return {keys: [], fields: keysOrFields}
    }
}
