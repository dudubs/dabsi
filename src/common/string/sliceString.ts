export function sliceString(
    text: string,
    sep: string
): [string, string] {
    const pos = text.indexOf(sep)
    return [text.slice(0, pos), text.slice(pos + 1)]
}
