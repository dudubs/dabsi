export type Merger<T> = (...args: T[]) => T;

export function Merger<T>(merge: (left: T, right: T) => T) {
    return (left, ...args) => {
        for (let right of args) {
            left = merge(left, right);
        }
        return left;
    }
}

export type ObjectMerger<T> =
    <U extends T>(obj: U, ...args: (Partial<U> | undefined)[]) => U;

export function ObjectMerger<T>(
    callback: (
        mergeProp: <K extends keyof T>(
            key: K, merger: ObjectMerger<T[K]>
        ) => void
    ) => void): ObjectMerger<T> {
    return (defaultProps, ...args) => {

        const nextProps: any = {...defaultProps};
        for (const props of args) {
            if (!props) continue;
            Object.assign(nextProps, props);
            callback((key, merger) => {
                nextProps[key] = merger(defaultProps[key], (props as any)[key]);
            });
            defaultProps = nextProps;
        }

        return nextProps;
    }
}
