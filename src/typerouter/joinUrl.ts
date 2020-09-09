export function joinUrl(url: string, ...args: (string | undefined)[]): string {
    for (const arg of args) {
        if (!arg)
            continue;
        url = url.replace(/\/+$/g, '')
            + '/'
            + arg.replace(/^\/+/g, '');
    }
    return url;
}
