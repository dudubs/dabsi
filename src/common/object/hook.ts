export function hook<T,
    K extends keyof T>(obj: T, key: K,
                       callback: (prev: T[K],
                                  args: Parameters<Extract<T[K], (...args) => any>>) =>
                           ReturnType<Extract<(...args) => any, T[K]>>) {
    const prev = obj[key];
    // @ts-ignore
    obj[key] = function (...args) {
        // @ts-ignore
        return callback(prev.bind(this), args)
    }
}
