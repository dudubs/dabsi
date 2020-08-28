export function wrapIf<T, R>(
    condition: boolean,
    obj: T,
    wrapper: (obj: T) => R
): T | R {
    return condition ? wrapper(obj) : obj;
}
