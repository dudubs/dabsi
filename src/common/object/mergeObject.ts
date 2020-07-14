import {cloneObject} from "./cloneObject";
import {keys} from "./keys";


export function mergeObject<T, K extends keyof T>(
    obj: T,
    props: Pick<T, K>
): T {
    obj = cloneObject(obj);
    for (const key of keys(props)) {
        const prev = obj[key];
        if (typeof prev !== "object") {
            throw new Error(`Can't merge ${key} of ${typeof prev}`)
        }
        // @ts-ignore
        obj[key] = Array.isArray(prev) ? [...prev, ...props[key]] :
            cloneObject(prev, props[key])
    }
    return obj;
}
