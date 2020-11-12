export function getNextPath(path: string): [string, string] {
    let start = 0;
    while (path.charAt(start) === '/') {
        start++;
    }
    const end = path.indexOf('/', start);
    if (0 > end) {
        return [path.slice(start), ""]
    }
    return [path.slice(start, end), path.slice(end)]
}
