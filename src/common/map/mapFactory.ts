
export function mapFactory<T extends (key:any)=>any>(
    map: {
        get(key: Parameters<T>[0]): ReturnType<T>;
        has(key: Parameters<T>[0]): boolean;
        set(key: Parameters<T>[0], value: ReturnType<T>): void;
    },
    create: T
): (key: Parameters<T>[0]) => ReturnType<T> {
    return key=> {
        let value = map.get(key);
        if (value || map.has(key)) {
            return value;
        }
        map.set(key, value = create(key));
        return value;
    }
}
