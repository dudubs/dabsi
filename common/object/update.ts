export const update = Object.assign.bind(Object) as
    <T, K extends keyof T>(obj: T, props: Pick<T, K>) => T;
