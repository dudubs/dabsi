export type Merger<T> = (...args: T[]) => T;

export function Merger<T>(merge: (left: T, right: T) => T) {
    return (left, ...args) => {
        for (let right of args) {
            left = merge(left, right);
        }
        return left;
    }
}
