
export function mapToObject<T, U=T>(
    iterable: Iterable<T>,
    getKey: (value: T, index: number) => (
        (PropertyKey | undefined)|
        [PropertyKey | undefined,U]
    ),
): Record<PropertyKey, T>

export function mapToObject(
    iterable,
    getKey,
): any {
    let obj = {};
    let index = 0;
    for (const item of iterable) {
        const keyOrEntry = getKey(item, ++index);
        if (typeof keyOrEntry === "object") {
            obj[keyOrEntry[0]] = keyOrEntry[1];
        } else {
            obj[keyOrEntry] = item;
        }
    }
    return obj;
}
