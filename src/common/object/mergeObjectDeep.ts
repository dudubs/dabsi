import {isPlainObject} from "./isPlainObject";

export type MergedObject<T> = T extends any[] ? T :
    T extends object ? { [K in keyof T]?: MergedObject<T[K]> } : T;

export function mergeObjectDeep<T>(a: T, b: MergedObject<T>): T {
    if (isPlainObject(a) || isPlainObject(b)) {
        if (a && b) {
            a = {...a};
            for (const k in b) {
                // @ts-ignore
                a[k] = mergeObjectDeep<any>(a[k], b[k]);
            }
            return a;
        }
        // @ts-ignore
        return a ? a : b;
    }
    // @ts-ignore
    return b;
}
