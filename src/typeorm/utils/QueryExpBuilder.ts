import {entries} from "@dabsi/common/object/entries";
import {keys} from "@dabsi/common/object/keys";

export function isDeepEqual(a, b) {
    if (a === b)
        return true;
    if (typeof a !== typeof b) return false;
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length)
            return false;
        for (const [index, av] of a.entries()) {
            if (!isDeepEqual(av, b[index])) {
                return false
            }
        }
        return true;
    }


    for (const [ak, av] of entries(a)) {
        if (!isDeepEqual(av, b[ak])) {
            return false;
        }
    }
    for (const bk of keys(b)) {
        if (!(bk in a)) {
            return false;
        }
    }

    return true;


}
