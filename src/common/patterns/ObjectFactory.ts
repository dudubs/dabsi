export type ObjectFactory<T = any, U extends any[] = any[]> =
    ((...args: U) => T) |
    (new(...args: U) => T);

export function ObjectFactory<T, U extends any[]>(factory: ObjectFactory<T, U>, ...args: U): T {
    if (!factory.prototype)
        return (<any>factory).apply(undefined, args);
    return new (<any>factory)(...args);
}


