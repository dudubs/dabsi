export function setDefinedValue<T, K extends keyof T>(
    obj: T,
    key: K,
    value: T[K] | undefined
) {
    if (value !== undefined)
        obj[key] = value;
}
