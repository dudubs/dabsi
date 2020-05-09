export function baseObject<T extends object, K extends keyof T>(
    base: T, props: Pick<T, K> & ThisType<T>
): T {
    return Object.setPrototypeOf(props, base)
}
