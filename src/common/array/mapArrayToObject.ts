export function mapArrayToObject<T,U>(array: T[], callback: (item:T, index:number) => [string, U]): Record<string, U> {
    const obj = {};
    for (let [index, item] of array.entries()) {
        const [key, value] = callback(item, index);
        obj[key] = value;
    }
    return obj;
}

