export type LangMapValue = string | ((props: object) => string);

export type LangMap = Record<string, LangMapValue>;

export type LangMapEntry = [string, LangMapValue];

export function LangMap(
    ...args: (Record<string, LangMapValue> | Array<LangMapEntry>)[]
) {
    const items = {};
    for (let arg of args) {
        if (Array.isArray(arg)) {
            for (let [key, value] of arg) {
                items[key] = value;
            }
        } else {
            Object.assign(items, arg);
        }
    }
    return items;
}
