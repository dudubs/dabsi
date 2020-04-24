export type LangMapValue = string | ((props) => string);

export function LangMap(
    ...args: (Record<string, LangMapValue> | Array<LangMapItem>)[]
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

export type LangMap = Record<string, LangMapValue>;
export type LangMapItem = [string, LangMapValue];
