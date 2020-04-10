export function truth<T>(value: T | "" | false | null | undefined | 0): T | undefined {
    return value || undefined;
}
