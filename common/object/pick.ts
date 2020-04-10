export function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
    const out: any = {};
    for (const key of keys) {
        out[key] = obj[key];
    }
    return out;
}


