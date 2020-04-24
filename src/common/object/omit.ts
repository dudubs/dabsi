export function omit<T, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
    obj = {...obj};
    for (const key of keys) {
        delete obj[key];
    }
    return obj;
}
