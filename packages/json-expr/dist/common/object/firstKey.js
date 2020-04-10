export function firstKey(obj) {
    for (const key in obj) {
        if ((typeof key === "string") && obj.hasOwnProperty(key))
            return key;
    }
}
