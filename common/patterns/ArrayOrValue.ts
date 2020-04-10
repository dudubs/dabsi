export type ArrayOrValue<T> = T[] | T;

export function ArrayOrValue<T>(arrayOrValue: ArrayOrValue<T>): Array<T> {
    return Array.isArray(arrayOrValue) ? arrayOrValue : [arrayOrValue];
}
