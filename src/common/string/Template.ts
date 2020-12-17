import {Callable} from "@dabsi/common/object/Callable";


export type Template<K extends PropertyKey> = Callable<(args: Record<K, any>) => string, { keys: K[] }>;

export function Template<K extends PropertyKey>(
    strings: TemplateStringsArray,
    ...keys: K[]
): Template<K> {
    return Callable((args) => {
        let text = '';
        for (const [index, string] of strings.entries()) {
            const key = keys[index];
            text += string + (key !== undefined ? args[key] : '')
        }
        return text;
    }, {keys})
}
