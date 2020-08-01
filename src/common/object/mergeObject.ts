import {Nullable} from "../typings";
import {entries} from "./entries";

export function mergeObject<T>(a: Record<string, T> | Nullable,
                               b: Record<string, T> | Nullable,
                               merger: (a: NonNullable<T>,
                                        b: NonNullable<T>,
                                        key:string) => T):
    Record<string, T> | Nullable {

    if (!(a && b))
        return a || b;

    const c = {...a};
    for (let [k, bv] of entries(b)) {
        const av = a[k];

        if((av!=null)&&(bv!=null)) {
            c[k] = merger(<any>av, <any>bv,k)
        } else {
            c[k] = bv??av;
        }
    }
    return c;
}
