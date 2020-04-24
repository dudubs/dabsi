export function clone<T, K extends keyof T>(obj: T, props?: Pick<T, K>): T {
    return Object.setPrototypeOf({...obj, ...props}, Object.getPrototypeOf(obj));
}


