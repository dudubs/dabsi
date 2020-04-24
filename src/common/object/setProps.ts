export function setProps<P extends object>(props: P): <T extends Partial<P>> (obj: T) => T {
    return obj => {
        Object.assign(obj, props);
        return obj;
    }
}
