export function updateProp<T, K extends keyof T>(obj: T, key: K,
                                                 callback: (before: T[K]) => T[K]) {
    obj[key] = callback(obj[key]);
}
