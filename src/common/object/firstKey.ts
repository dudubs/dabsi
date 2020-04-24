export function firstKey(obj: object): string | undefined {
    for (const key in obj) {
        if ((typeof key === "string") && obj.hasOwnProperty(key))
            return key;
    }
}

