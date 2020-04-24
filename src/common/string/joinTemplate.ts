export function joinTemplate<T>(strings: ReadonlyArray<string>, args: T[],
                                callback: (arg: T) => string) {
    let text = '';
    for (let [index, string] of strings.entries()) {
        text += string;
        if (args.length > index) {
            text += callback(args[index])
        }
    }
    return text;
}
