export type Callable<T extends (...args) => any, U extends object> =
    T & U;

export function Callable<T extends (...args) => any, U extends object>(
    callback: T,
    props: U
): Callable<T, U> {
    return <any>Object.assign((...args) => {
        return callback(...args)
    }, props)
}
