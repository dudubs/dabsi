export function mapArrayToObject<T, U>
(array: T[],
 callback: (item: T, index: number) => [string, U] | undefined): Record<string, U> {
    const obj = {};
    for (let [index, item] of array.entries()) {
        const entry = callback(item, index);
        if (entry)
            obj[entry[0]] = entry[1];
    }
    return obj;
}

